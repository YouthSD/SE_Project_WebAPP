<template>
  <view class="container">
    <view class="header" :style="{backgroundColor: primaryColor}">
      <back-icon iconSize="50" @click="goBack" class="back-icon"></back-icon>
      <text class="page-title">我的动态</text>
    </view>
    
    <view class="filter-bar">
      <input 
        class="search-input" 
        placeholder="搜索标题或标签" 
        v-model="searchKeyword"
        @confirm="fetchUserPosts"
      />
      
      <view class="date-picker-box" @click="showDatePicker = true">
        <text class="date-text">{{ dateRangeText }}</text>
        <text class="date-icon">📅</text>
      </view>
      <button class="search-btn" :style="{backgroundColor: primaryColor}" @click="fetchUserPosts">检索</button>
    </view>
    
    <scroll-view scroll-y class="post-list">
      <view v-if="posts.length === 0" class="no-post">
        <text>暂无动态内容</text>
      </view>
	  
	  <view v-for="post in posts" :key="post.id" class="post-item">
		  <view class="post-info-box" @click="goToDetail(post.id)">
			  <view class="post-header">
				  <text class="post-title">{{ post.title }}</text>
				  <text class="post-rating">★ {{ post.rating.toFixed(1) }}</text>
			  </view>
                  
		      <view class="post-footer">
				  <view class="post-actions">
					  <text class="action-btn" @click.stop="goToDetail(post.id)">查看原帖</text> 
					  <text class="action-btn delete-btn" @click.stop="confirmDelete(post)">删除</text>
				  </view>
				  
				  <text v-if="post.images.length > 0" class="post-date">{{ post.date }}</text>
				  <text v-else class="post-date-full">{{ post.date }}</text>
			  </view>
           </view>
		</view>   
    </scroll-view>  
  </view>
</template>

<script>
export default {
  data() {
    return {
      primaryColor: '#00CC99',
      searchKeyword: '',
      startDate: null,
      endDate: null,
      showDatePicker: false,
      
      // 模拟用户动态数据
      posts: [
        { id: 1, title: '空悲切', rating: 4.8, date: '2023-12-09', images: ['/static/img1.jpg'] },
        { id: 2, title: '今日份美食分享', rating: 4.5, date: '2025-12-08', images: ['/static/food1.jpg'] },
        { id: 3, title: '关于uni-app的一些心得', rating: 3.9, date: '2025-12-07', images: [] },
      ]
    };
  },
  computed: {
    dateRangeText() {
      if (this.startDate && this.endDate) {
        return `${this.startDate} 至 ${this.endDate}`;
      }
      return '选择日期范围';
    }
  },
  onLoad() {
    this.fetchUserPosts();
  },
  methods: {
    goBack() {
      uni.navigateBack();
    },
    
    // 模拟日期选择器确认 (需要实际组件支持)
    handleDateConfirm(e) {
      // 假设 e.range 包含了起始日期和结束日期
      this.startDate = e.range[0];
      this.endDate = e.range[1];
      this.showDatePicker = false;
    },
    
    // 模拟获取用户帖子列表
    fetchUserPosts() {
      // ** 模拟接口调用：获取用户动态 **
      // 接口：/api/user/posts
      // 参数：{ keyword: this.searchKeyword, startDate: this.startDate, endDate: this.endDate }
      /*
      uni.request({ url: '/api/user/posts', data: {...}, success: (res) => {
        this.posts = res.data.data;
      }});
      */
      uni.showToast({ title: '开始检索/筛选', icon: 'none' });
    },
    
    // 跳转到帖子详情/修改页
    goToDetail(postId) {
      // 假设帖子详情页支持编辑
      uni.navigateTo({
        url: `postDetail?id=${postId}&edit=true`
      });
    },
    
    // 二次确认删除
    confirmDelete(post) {
      uni.showModal({
        title: '删除确认',
        content: `你确定要删除帖子《${post.title}》吗？`,
        confirmText: '确认删除',
        confirmColor: '#FF3B30',
        success: (res) => {
          if (res.confirm) {
            this.deletePost(post);
          }
        }
      });
    },
    
    // 执行删除操作
    deletePost(post) {
      // ** 模拟接口调用：删除帖子 **
      // 接口：/api/post/delete
      // 参数：{ postId: post.id }
      /*
      uni.request({ url: '/api/post/delete', method: 'POST', data: { postId: post.id }, success: (res) => {
        if (res.data.code === 0) {
          uni.showToast({ title: '删除成功', icon: 'success' });
          this.posts = this.posts.filter(p => p.id !== post.id); // 移除
        }
      }});
      */
      
      // ** 临时成功模拟 **
      uni.showToast({ title: '删除成功', icon: 'success' });
      this.posts = this.posts.filter(p => p.id !== post.id);
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
  margin-right: 60rpx;
}

/* --- 搜索和筛选区 --- */
.filter-bar {
  padding: 20rpx 30rpx;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  border-bottom: 1rpx solid #eee;
}

.search-input {
  flex: 2;
  height: 70rpx;
  background-color: #f7f7f7;
  border-radius: 35rpx;
  padding: 0 30rpx;
  font-size: 30rpx;
  margin-right: 20rpx;
}

.date-picker-box {
  flex: 1.5;
  height: 70rpx;
  line-height: 70rpx;
  background-color: #f7f7f7;
  border-radius: 35rpx;
  padding: 0 15rpx;
  font-size: 26rpx;
  color: #666;
  margin-right: 20rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.search-btn {
  flex: 1;
  height: 70rpx;
  line-height: 70rpx;
  font-size: 30rpx;
  color: #fff;
  padding: 0;
  border-radius: 35rpx;
}

/* --- 动态列表区 --- */
.post-list {
    flex: 1;
    padding: 20rpx 30rpx 20rpx 7rpx; 
}

.no-post {
  text-align: center;
  padding: 50rpx;
  color: #999;
}

.post-item {
    display: block; 
    padding: 20rpx; /* 统一左右 padding */
    border-bottom: 1rpx solid #eee;
    background-color: #fff;
    margin-bottom: 15rpx;
    border-radius: 10rpx;
}

.post-info-box {
    padding: 0;
}

.post-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 5rpx; /* 减少底部间距 */
}

.post-title {
    font-size: 32rpx;
    font-weight: bold;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    flex: 1;
    margin-right: 15rpx; /* 与评分保持距离 */
}

/* 评分：移到标题行右侧 */
.post-rating {
    font-size: 28rpx;
    color: #FF9900; /* 评分颜色突出 */
    font-weight: bold;
    /* 保持右侧定位 */
}

/* --- 底部操作和日期区域 --- */
.post-footer {
    /* 确保操作和日期在标题下方 */
    display: block; 
}

/* 新增：操作按钮区域 */
.post-actions {
    display: flex;
    justify-content: flex-end; /* 右对齐按钮 */
    margin-top: 15rpx;
    margin-bottom: 15rpx; /* 按钮和日期之间留出空间 */
}

.action-btn {
    font-size: 28rpx;
    color: #666;
    padding: 5rpx 15rpx;
    border: 1rpx solid #ccc;
    border-radius: 20rpx;
    margin-left: 15rpx; /* 按钮之间间距 */
}

.delete-btn {
    color: #FF3B30;
    border-color: #FF3B30;
}

/* 日期样式统一，并确保靠右 */
.post-date, .post-date-full {
    font-size: 24rpx;
    color: #999;
    display: block;
    text-align: right; /* 日期靠右显示 */
    margin-top: 10rpx;
}

/* 移除不必要的样式 */
.image-preview {
    /* 移除这里的 flex 布局，让图片和日期显示在不同行 */
    display: block;
    margin-bottom: 10rpx;
}
.preview-img {
    width: 120rpx;
    height: 120rpx;
    border-radius: 10rpx;
    /* 确保图片靠左 */
    display: block;
    margin-right: 0; 
    margin-bottom: 10rpx;
}
</style>