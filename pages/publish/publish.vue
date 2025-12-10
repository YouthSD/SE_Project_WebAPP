<template>
  <view class="container">
    
    <view class="header">
      <text class="cancel-btn" @click="handleCancel">取消</text>
      <text class="page-title">发布新内容</text>
      <button 
        class="publish-btn" 
        :style="{backgroundColor: isReadyToPublish ? primaryColor : '#ccc'}"
        :disabled="!isReadyToPublish"
        @click="handlePublish"
      >
        发布
      </button>
    </view>
    
    <scroll-view scroll-y class="content-scroll">
      
      <input 
        class="title-input" 
        placeholder="请输入标题 (可选)" 
        v-model="postTitle"
        maxlength="50"
      />
      
      <textarea 
        class="text-textarea" 
        placeholder="写下你的想法、感受或故事..." 
        v-model="postContent"
        maxlength="2000"
      />
      
      <view class="media-preview-area">
        
        <view v-if="postType === 1" class="image-preview">
          <view v-for="(url, index) in imageList" :key="index" class="image-item">
            <image :src="url" mode="aspectFill" class="uploaded-img" @click="previewImage(index)" />
            <text class="delete-icon" @click="deleteMedia(index, 'image')">×</text>
          </view>
          
          <view v-if="imageList.length < 9" class="add-media-btn" @click="chooseImage" :style="{borderColor: primaryColor}">
            <text class="add-icon">+</text>
            <text class="add-text">相册</text>
          </view>
        </view>
        
        <view v-else-if="postType === 2" class="video-preview">
          <video :src="videoPath" controls class="uploaded-video"></video>
          <text class="delete-icon" @click="deleteMedia(0, 'video')">×</text>
          
          <view v-if="uploading && uploadProgress < 100" class="progress-bar-container">
            <view class="progress-bar" :style="{width: uploadProgress + '%', backgroundColor: primaryColor}"></view>
            <text class="progress-text">上传中: {{ uploadProgress.toFixed(0) }}%</text>
          </view>
        </view>
        
      </view>
      
      <view class="tag-input-area">
        <input class="tag-input" placeholder="#添加标签 (如：生活、技术)" v-model="currentTag" @confirm="addTag"/>
        <view class="tag-list">
          <text v-for="(tag, index) in tags" :key="index" class="tag-item" :style="{borderColor: primaryColor, color: primaryColor}">
            #{{ tag }} <text class="tag-delete" @click="removeTag(index)">×</text>
          </text>
        </view>
      </view>
      
    </scroll-view>
    
    <view class="media-action-bar">
      <view class="action-btn" :class="{'disabled': postType === 2}" @click="chooseImage">
        <text class="icon">🖼️</text>
        <text class="text">相册</text>
      </view>
      <view class="action-btn" :class="{'disabled': postType === 1}" @click="chooseVideo">
        <text class="icon">🎥</text>
        <text class="text">视频</text>
      </view>
    </view>
    
    <view class="tab-bar">
      <view v-for="tab in tabs" :key="tab.name" class="tab-item" @click="switchTab(tab.path)">
        <text class="tab-icon" :class="{'active': tab.path === 'publish'}">{{ tab.icon }}</text>
        <text 
          class="tab-text" 
          :style="{color: tab.path === 'publish' ? primaryColor : '#888'}"
        >
          {{ tab.name }}
        </text>
      </view>
    </view>
    
  </view>
</template>

<script>
export default {
  data() {
    return {
      primaryColor: '#00CC99', 
      accentColor: '#FFD700',
	  tabs: [],
      
      postTitle: '',
      postContent: '',
      tags: [],
      currentTag: '',
      
      postType: 0, // 0=纯文, 1=图文, 2=视频
      
      // 图片相关
      imageList: [], // 本地图片路径列表
      
      // 视频相关
      videoPath: '', // 本地视频路径
      uploading: false,
      uploadProgress: 0,
      uploadTask: null, // uni.uploadFile 任务对象
    };
  },
  computed: {
    // 判断是否可以点击发布按钮
    isReadyToPublish() {
      // 至少有文本或媒体文件
      return this.postContent.trim().length > 0 || this.imageList.length > 0 || this.videoPath;
    }
  },
  methods: {
    // --- 顶部导航栏操作 ---
    handleCancel() {
      if (this.uploading && this.uploadTask) {
        this.uploadTask.abort();
      }
      uni.showModal({
        title: '提示',
        content: '确定要清空所有内容并返回吗？',
        success: (res) => {
          if (res.confirm) {
            this.resetForm();
            // 返回首页
            this.switchTab('home'); 
          }
        }
      });
    },
    
    resetForm() {
      this.postTitle = '';
      this.postContent = '';
      this.tags = [];
      this.currentTag = '';
      this.postType = 0;
      this.imageList = [];
      this.videoPath = '';
      this.uploading = false;
      this.uploadProgress = 0;
      this.uploadTask = null;
    },
    
    // --- 标签处理 ---
    addTag() {
      const tag = this.currentTag.trim();
      if (tag && !this.tags.includes(tag)) {
        this.tags.push(tag);
      }
      this.currentTag = '';
    },
    removeTag(index) {
      this.tags.splice(index, 1);
    },
    
    // --- 图片/视频选择 ---
    chooseImage() {
      if (this.postType === 2) {
        uni.showToast({ title: '已选择视频，请先删除视频', icon: 'none' });
        return;
      }
      
      let count = 9 - this.imageList.length;
      if (count <= 0) {
        uni.showToast({ title: '最多只能上传9张图片', icon: 'none' });
        return;
      }
      
      uni.chooseImage({
        count: count,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success: (res) => {
          this.postType = 1;
          this.imageList = [...this.imageList, ...res.tempFilePaths];
          uni.showToast({ title: '图片已添加', icon: 'none' });
        }
      });
    },
    
    chooseVideo() {
      if (this.postType === 1) {
        uni.showToast({ title: '已选择图片，请先删除图片', icon: 'none' });
        return;
      }
      if (this.videoPath) {
        uni.showToast({ title: '只能上传一个视频，请先删除', icon: 'none' });
        return;
      }
      
      uni.chooseVideo({
        sourceType: ['album', 'camera'],
        maxDuration: 60,
        camera: 'back',
        success: (res) => {
          this.postType = 2;
          this.videoPath = res.tempFilePath;
          this.uploading = true;
          this.uploadProgress = 0;
          this.uploadMedia(res.tempFilePath, 'video'); // 自动开始模拟上传
        }
      });
    },
    
    deleteMedia(index, type) {
      if (type === 'image') {
        this.imageList.splice(index, 1);
        if (this.imageList.length === 0 && this.postContent.trim().length === 0) {
          this.postType = 0;
        }
      } else if (type === 'video') {
        if (this.uploading && this.uploadTask) {
          this.uploadTask.abort();
        }
        this.videoPath = '';
        this.uploading = false;
        this.uploadProgress = 0;
        if (this.postContent.trim().length === 0) {
          this.postType = 0;
        }
      }
    },
    
    previewImage(index) {
      uni.previewImage({
        current: this.imageList[index],
        urls: this.imageList
      });
    },
    
    // --- 媒体文件上传（模拟） ---
    uploadMedia(filePath, fileType) {
      // ** 模拟接口调用：文件上传 **
      // 假设：/api/uploadmedia 接口接收文件，并返回文件 media_id
      
      // ** 仅模拟进度条和成功状态，不实际上传 **
      this.uploading = true;
      this.uploadProgress = 0;
      
      let interval = setInterval(() => {
        if (this.uploadProgress < 95) {
          this.uploadProgress += Math.random() * 5; // 模拟进度增长
        } else {
          clearInterval(interval);
          this.uploadProgress = 100;
          this.uploading = false;
          uni.showToast({ title: `${fileType === 'video' ? '视频' : '文件'}上传成功`, icon: 'success' });
          // 假设这里获得了 media_id，并保存在一个数组中
          // this.mediaIds.push('mock_media_id_123');
        }
      }, 300);

      /*
      this.uploadTask = uni.uploadFile({
        url: 'YOUR_UPLOAD_API_URL', // 替换为您的实际上传接口
        filePath: filePath,
        name: 'file', // 后台接收文件的字段名
        formData: {
          'type': fileType
        },
        success: (res) => {
          this.uploading = false;
          const data = JSON.parse(res.data);
          if (data.code === 0) {
            // 成功：将获取到的 media_id 添加到列表
            // this.mediaIds.push(data.media_id); 
          } else {
            uni.showToast({ title: '上传失败', icon: 'error' });
          }
        },
        fail: () => {
          this.uploading = false;
          uni.showToast({ title: '网络错误，上传失败', icon: 'error' });
        }
      });

      this.uploadTask.onProgressUpdate((res) => {
        this.uploadProgress = res.progress;
      });
      */
    },
    
    // --- 发布处理 ---
    handlePublish() {
      if (!this.isReadyToPublish) {
        uni.showToast({ title: '请输入内容或添加媒体文件', icon: 'none' });
        return;
      }
      
      if (this.postType === 2 && this.uploading) {
         uni.showToast({ title: '视频正在上传中，请稍候', icon: 'none' });
         return;
      }
      
      // 1. 整理 media_ids (在实际项目中，图片需要先上传，这里仅为前端模拟)
      let mediaIds = [];
      if (this.postType === 1) {
        // 假设所有图片都已上传并获得 id
        mediaIds = this.imageList.map((_, i) => `img_id_${i}`);
      } else if (this.postType === 2) {
        // 假设视频已上传并获得 id
        mediaIds = ['video_id_001']; 
      }
      
      // 2. 构造发布数据
      const postData = {
        post_type: this.postType,
        post_title: this.postTitle.trim(),
        post_content: this.postContent.trim(),
        media_ids: mediaIds,
        tags: this.tags,
        // ... 其他信息，如用户ID
      };

      // ** 模拟接口调用：发布帖子 **
      // 模拟调用：/api/post/create
      /*
      uni.request({
        url: '/api/post/create', // 替换为您的实际接口地址
        method: 'POST',
        data: postData,
        success: (res) => {
          if (res.data.code === 0) {
            uni.showToast({ title: '发布成功', icon: 'success' });
            this.resetForm();
            uni.redirectTo({ url: 'home' }); // 跳转到程序首页
          } else {
            uni.showModal({
              title: '发布失败',
              content: res.data.message || '发布内容失败',
              showCancel: false
            });
          }
        },
        fail: () => {
          uni.showModal({
            title: '发布失败',
            content: '网络错误，请稍后再试',
            showCancel: false
          });
        }
      });
      */
      
      // ** 临时成功跳转 **
      uni.showToast({ title: '发布成功', icon: 'success' });
      this.resetForm();
      this.switchTab('home');
    },
    
    // --- 底部导航切换 (与 home.vue 保持一致) ---
    switchTab(path) {
      // 假设 home 是 TabBar 页面，其他是普通页面跳转。
      // 注意：在 uni-app 中，如果 publish 也是 TabBar 页面，跳转时需要用 uni.switchTab。
      // 为了布局统一性，我们假设它们都已配置为 TabBar 页面。
      uni.switchTab({ url: path });
    }
  }
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f7fff7;
}

/* --- 顶部导航栏 --- */
.header {
  height: 90rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30rpx;
  background-color: #ffffff;
  border-bottom: 1rpx solid #eee;
  padding-top: var(--status-bar-height); /* 适配刘海屏 */
}

.cancel-btn {
  font-size: 32rpx;
  color: #888;
}

.page-title {
  font-size: 36rpx;
  font-weight: bold;
  color: #333;
}

.publish-btn {
  font-size: 28rpx;
  color: #ffffff;
  padding: 0 25rpx;
  height: 60rpx;
  line-height: 60rpx;
  border-radius: 30rpx;
  margin: 0;
  white-space: nowrap;
}

.publish-btn[disabled] {
  background-color: #ccc !important;
}

/* --- 内容滚动区 --- */
.content-scroll {
  flex: 1;
  padding: 30rpx;
  box-sizing: border-box;
}

.title-input {
  width: 100%;
  height: 80rpx;
  font-size: 36rpx;
  font-weight: bold;
  border-bottom: 1rpx solid #eee;
  margin-bottom: 20rpx;
  padding-bottom: 10rpx;
}

.text-textarea {
  width: 100%;
  height: 300rpx;
  font-size: 32rpx;
  padding: 10rpx 0;
  margin-bottom: 30rpx;
}

/* --- 媒体预览区 --- */
.media-preview-area {
  margin-bottom: 30rpx;
}

.image-preview {
  display: flex;
  flex-wrap: wrap;
  gap: 20rpx;
}

.image-item, .add-media-btn {
  width: calc((100% - 40rpx) / 3); /* 每行3个，中间2个20rpx的间隙 */
  height: 200rpx;
  position: relative;
  border-radius: 10rpx;
  overflow: hidden;
}

.uploaded-img, .uploaded-video {
  width: 100%;
  height: 100%;
  display: block;
}

.video-preview {
  width: 100%;
  height: 400rpx;
  position: relative;
  border-radius: 10rpx;
  overflow: hidden;
  margin-bottom: 10rpx;
}

.delete-icon {
  position: absolute;
  top: 10rpx;
  right: 10rpx;
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
  width: 40rpx;
  height: 40rpx;
  line-height: 36rpx;
  text-align: center;
  border-radius: 50%;
  font-size: 30rpx;
  z-index: 10;
}

.add-media-btn {
  border: 2rpx dashed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #999;
}

.add-icon {
  font-size: 60rpx;
  line-height: 1;
}
.add-text {
  font-size: 24rpx;
  margin-top: 5rpx;
}

/* 进度条 */
.progress-bar-container {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 40rpx;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
}

.progress-bar {
  height: 100%;
  transition: width 0.3s;
  position: absolute;
  opacity: 0.8;
}

.progress-text {
  font-size: 24rpx;
  color: #fff;
  z-index: 5;
  margin-left: 10rpx;
}

/* --- 标签输入区 --- */
.tag-input-area {
  padding: 20rpx 0;
}

.tag-input {
  width: 100%;
  height: 70rpx;
  font-size: 30rpx;
  border-bottom: 1rpx solid #eee;
  margin-bottom: 20rpx;
}

.tag-list {
  display: flex;
  flex-wrap: wrap;
}

.tag-item {
  font-size: 26rpx;
  padding: 8rpx 15rpx;
  border: 1px solid;
  border-radius: 20rpx;
  margin-right: 15rpx;
  margin-bottom: 10rpx;
  display: flex;
  align-items: center;
}

.tag-delete {
  font-size: 24rpx;
  margin-left: 10rpx;
  font-weight: bold;
}


/* --- 底部功能栏 (媒体选择) --- */
.media-action-bar {
  display: flex;
  border-top: 1rpx solid #eee;
  background-color: #fff;
  padding: 10rpx 0;
}

.action-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10rpx 0;
}

.action-btn.disabled {
  opacity: 0.5;
}

.action-btn .icon {
  font-size: 40rpx;
  margin-right: 10rpx;
}

.action-btn .text {
  font-size: 30rpx;
  color: #333;
}
</style>