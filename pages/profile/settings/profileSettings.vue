<template>
  <view class="container">
    
    <view class="header" :style="{backgroundColor: primaryColor}">
      <back-icon iconSize="50" @click="goBack" class="back-icon"></back-icon>
      <text class="page-title">设置个人资料</text>
      <button class="save-btn" :style="{backgroundColor: primaryColor}" @click="handleSave">保存</button>
    </view>
    
    <view class="form-section">
      
      <view class="form-item avatar-item" @click="chooseAvatar">
        <text class="label">头像</text>
        <image :src="tempAvatar || currentProfile.avatar" class="avatar-preview" mode="aspectFill"></image>
      </view>
      
      <view class="form-item">
        <text class="label">昵称</text>
        <input class="input-field" v-model="tempProfile.nickname" placeholder="请输入昵称" />
        <text class="arrow">✏️</text>
      </view>
      
      <view class="form-item">
        <text class="label">用户名</text>
        <text class="input-field disabled-field">@{{ currentProfile.username }}</text>
      </view>
      
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      primaryColor: '#00CC99',
      // 假设从接口获取的当前用户资料
      currentProfile: {
        avatar: '/static/major.jpg', 
        nickname: '空悲切',
        username: 'dank1ng',
      },
      // 临时修改的数据
      tempProfile: {
        nickname: '小绿书用户',
      },
      tempAvatar: null, // 临时本地头像路径
    };
  },
  onLoad() {
    // 假设加载当前数据到 tempProfile
    this.tempProfile.nickname = this.currentProfile.nickname;
  },
  methods: {
    goBack() {
      uni.navigateBack();
    },
    
    // 选择头像并上传
    chooseAvatar() {
      uni.chooseImage({
        count: 1,
        sizeType: ['compressed'],
        sourceType: ['album', 'camera'],
        success: (res) => {
          this.tempAvatar = res.tempFilePaths[0];
          this.uploadAvatar(this.tempAvatar); // 自动开始上传
        }
      });
    },
    
    uploadAvatar(filePath) {
      // ** 模拟接口调用：头像上传 **
      // 接口：/api/user/uploadAvatar
      
      uni.showLoading({ title: '头像上传中...' });
      
      /*
      uni.uploadFile({
        url: 'YOUR_AVATAR_UPLOAD_API', 
        filePath: filePath,
        name: 'avatar',
        success: (res) => {
          uni.hideLoading();
          const data = JSON.parse(res.data);
          if (data.code === 0) {
            // 成功替换：用新的 URL 更新 currentProfile.avatar
            this.currentProfile.avatar = data.newAvatarUrl; 
            this.tempAvatar = null;
            uni.showToast({ title: '头像上传并替换成功', icon: 'success' });
          } else {
            uni.showToast({ title: data.message || '上传失败', icon: 'none' });
          }
        },
        fail: () => {
          uni.hideLoading();
          uni.showToast({ title: '网络错误，上传失败', icon: 'none' });
        }
      });
      */
      
      // ** 临时成功模拟 **
      setTimeout(() => {
        uni.hideLoading();
        // 假设上传成功，并获得了新的头像URL (这里继续使用本地路径模拟)
        this.currentProfile.avatar = this.tempAvatar; 
        this.tempAvatar = null;
        uni.showToast({ title: '头像上传并替换成功', icon: 'success' });
      }, 1500);
    },
    
    // 保存修改
    handleSave() {
      const newNickname = this.tempProfile.nickname.trim();
      
      if (newNickname.length === 0) {
        uni.showToast({ title: '昵称不能为空', icon: 'none' });
        return;
      }
      
      if (newNickname === this.currentProfile.nickname) {
        uni.showToast({ title: '资料未做修改', icon: 'none' });
        return;
      }
      
      // ** 模拟接口调用：保存资料 **
      // 接口：/api/user/update
      /*
      uni.request({ 
        url: '/api/user/update', 
        method: 'POST', 
        data: { nickname: newNickname },
        success: (res) => {
          if (res.data.code === 0) {
            this.currentProfile.nickname = newNickname;
            uni.showToast({ title: '个人信息修改成功', icon: 'success' }); // 给予提示
            this.goBack();
            // 昵称同步更新到内容和评论中的逻辑由后端处理
          } else {
            uni.showToast({ title: res.data.message || '保存失败', icon: 'none' });
          }
        }
      });
      */
      
      // ** 临时成功模拟 **
      this.currentProfile.nickname = newNickname;
      uni.showToast({ title: '个人信息修改成功', icon: 'success' }); 
      this.goBack();
    }
  }
}
</script>

<style scoped>
.container {
  height: 100vh;
  background-color: #f7fff7;
}

/* --- 顶部导航栏 (与 settings 样式保持一致) --- */
.header {
  height: 90rpx;
  display: flex;
  align-items: center;
  position: relative;
  color: #ffffff;
  font-weight: bold;
  padding-top: var(--status-bar-height);
  background-color: v-bind(primaryColor);
}

.back-icon {
  position: absolute;
  left: 30rpx;
  font-size: 40rpx;
  cursor: pointer;
}

.page-title {
  flex: 1;
  text-align: center;
  font-size: 38rpx;
  margin-left: 60rpx; /* 留出返回按钮的空间 */
}

.save-btn {
  height: 60rpx;
  line-height: 60rpx;
  font-size: 30rpx;
  color: #fff;
  padding: 0 25rpx;
  border-radius: 30rpx;
  margin-right: 20rpx;
}

/* --- 表单区 --- */
.form-section {
  background-color: #ffffff;
  margin-top: 20rpx;
}

.form-item {
  display: flex;
  align-items: center;
  padding: 25rpx 30rpx;
  border-bottom: 1rpx solid #f0f0f0;
}

.label {
  width: 150rpx;
  font-size: 32rpx;
  color: #333;
}

.input-field {
  flex: 1;
  font-size: 32rpx;
  text-align: right;
  height: 50rpx;
  line-height: 50rpx;
}

.disabled-field {
  color: #999;
}

.arrow {
  font-size: 30rpx;
  color: #ccc;
  margin-left: 15rpx;
}

.avatar-item {
  height: 150rpx;
}

.avatar-preview {
  width: 100rpx;
  height: 100rpx;
  border-radius: 50%;
  margin-right: 15rpx;
  border: 1rpx solid #eee;
}
</style>