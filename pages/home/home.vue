<template>
  <view class="container">
    <view class="header" :style="{backgroundColor: primaryColor}">
      <text class="title">小绿书 - 今日精选</text>
    </view>

    <scroll-view scroll-y class="content-list">
      <view class="date-header">
        <text class="date-text">📆 {{ todayDate }} 发布的帖子</text>
      </view>
      
      <view v-for="post in posts" :key="post.id" class="post-card" @click="goToDetail(post.id)">
        <view class="post-info">
          <view class="post-header">
            <text class="post-title">{{ post.title }}</text>
            <view class="post-rating" :style="{backgroundColor: accentColor}">
              <text class="rating-score">★ {{ post.rating.toFixed(1) }}</text>
            </view>
          </view>
          
          <view v-if="post.images && post.images.length > 0" class="image-preview">
            <image 
              v-for="(img, index) in post.images.slice(0, 3)" 
              :key="index" 
              :src="img" 
              mode="aspectFill" 
              class="preview-img"
            />
          </view>

          <view class="post-tags">
            <text v-for="(tag, index) in post.tags" :key="index" class="tag-item" :style="{borderColor: primaryColor, color: primaryColor}">
              #{{ tag }}
            </text>
          </view>
        </view>
      </view>
      <view v-if="posts.length === 0" class="no-content">
        <text>今天还没有新内容发布哦~</text>
      </view>
    </scroll-view>

    <view class="tab-bar">
      <view 
        v-for="tab in tabs" 
        :key="tab.name" 
        class="tab-item" 
        @click="switchTab(tab.path)"
      >
        <text class="tab-icon" :class="{'active': tab.path === currentPage}">{{ tab.icon }}</text>
        <text 
          class="tab-text" 
          :style="{color: tab.path === currentPage ? primaryColor : '#888'}"
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
      primaryColor: '#00CC99', // 主题绿色
      accentColor: '#FFD700',  // 主题黄色
      currentPage: 'home', // 当前页面标识，用于底部导航高亮
      todayDate: new Date().toLocaleDateString(), // 显示当前日期
      // 模拟帖子数据
      posts: [
        { id: 1, title: '春天种的植物发芽了', content: '...', rating: 4.8, tags: ['植物', '园艺', '生活'], 
          images: ['/static/img1.jpg', '/static/img2.jpg', '/static/img3.jpg', '/static/img4.jpg'], type: 'image' },
        { id: 2, title: '今日份美食分享', content: '...', rating: 4.5, tags: ['美食', '烹饪'], images: ['/static/food1.jpg'], type: 'image' },
        { id: 3, title: '关于uni-app的一些心得', content: '...', rating: 3.9, tags: ['技术', '编程'], images: [], type: 'text' },
        { id: 4, title: '户外徒步Vlog', content: '...', rating: 4.2, tags: ['户外', 'Vlog'], images: ['/static/video_cover.jpg'], type: 'video' },
      ],
	  tabs:[],
    };
  },
  onLoad() {
    this.fetchDailyPosts();
  },
  methods: {
    // 模拟获取当天发布的帖子列表
    fetchDailyPosts() {
      // ** 模拟接口调用 **
      // 模拟调用：/api/posts/daily
      // 接口参数：{ date: this.todayDate }
      /*
      uni.request({
        url: '/api/posts/daily', 
        method: 'GET',
        data: { date: this.todayDate },
        success: (res) => {
          if (res.data.code === 0) {
            this.posts = res.data.data;
          }
        }
      });
      */
    },
    
    // 跳转到帖子详情页
    goToDetail(postId) {
      uni.navigateTo({
        url: `postDetail?id=${postId}`
      });
    },
    
    // 底部导航切换
    switchTab(path) {
      if (path === this.currentPage) return;
      
      // 这里的跳转逻辑需要根据您的实际路由设置进行调整。
      // 如果这些是Tab页面，需要使用 uni.switchTab。如果是非Tab页面，使用 uni.navigateTo。
      // 假设 home 是 TabBar 页面，其他是普通页面跳转。
      if (path === 'home') {
        uni.switchTab({ url: `/${path}` });
      } else {
        uni.navigateTo({ url: path });
      }
      this.currentPage = path;
    }
  }
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f7fff7; /* 轻微的主题色背景 */
}

/* --- 顶部标题 --- */
.header {
  height: 90rpx;
  line-height: 90rpx;
  text-align: center;
  color: #ffffff;
  font-size: 38rpx;
  font-weight: bold;
  padding-top: var(--status-bar-height); /* 适配刘海屏 */
  z-index: 10;
}

/* --- 帖子列表区 --- */
.content-list {
  flex: 1;
  padding: 20rpx 0;
  box-sizing: border-box;
}

.date-header {
  padding: 0 30rpx 20rpx;
}

.date-text {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
}

/* 帖子卡片样式 */
.post-card {
  margin: 0 30rpx 30rpx;
  padding: 20rpx;
  background-color: #ffffff;
  border-radius: 15rpx;
  box-shadow: 0 4rpx 10rpx rgba(0, 0, 0, 0.05);
  display: flex;
}

.post-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.post-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10rpx;
}

.post-title {
  font-size: 36rpx;
  font-weight: bold;
  color: #333;
  flex: 1;
  margin-right: 20rpx;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.post-rating {
  padding: 5rpx 15rpx;
  border-radius: 20rpx;
}

.rating-score {
  font-size: 28rpx;
  font-weight: bold;
  color: #333; /* 配合黄色背景，黑色文字更清晰 */
}

/* 图片预览 */
.image-preview {
  display: flex;
  overflow: hidden;
  margin: 15rpx 0;
}

.preview-img {
  width: calc(33.33% - 10rpx); /* 三张图片等宽，留间距 */
  height: 180rpx;
  border-radius: 10rpx;
  margin-right: 15rpx;
}
.preview-img:last-child {
  margin-right: 0;
}


/* 标签样式 */
.post-tags {
  display: flex;
  flex-wrap: wrap;
  margin-top: 10rpx;
}

.tag-item {
  font-size: 24rpx;
  padding: 5rpx 15rpx;
  border: 1px solid;
  border-radius: 20rpx;
  margin-right: 15rpx;
  margin-bottom: 10rpx;
}

.no-content {
  text-align: center;
  padding: 50rpx;
  color: #999;
}
</style>