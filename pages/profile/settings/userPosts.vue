<template>
  <view class="container">
    <view class="header" :style="{backgroundColor: primaryColor}">
      <back-icon icon-size="50" @click="goBack" class="back-icon"></back-icon>
      <text class="page-title">我的动态</text>
    </view>

    <view class="filter-bar">
      <input 
        class="search-input" 
        placeholder="搜索标题或标签" 
        v-model="searchKeyword"
        @confirm="fetchUserPosts"
      />
      
      <view class="picker-container">
        <uni-datetime-picker
          type="daterange"
          v-model="rangeValues"
          @change="onDateChange"
          :border="false"
          :clear-icon="false"
          class="custom-picker"
        >
          <view class="date-picker-box">
            <text class="date-text">{{ dateRangeText }}</text>
            <text class="date-icon">📅</text>
          </view>
        </uni-datetime-picker>
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
            
            <view class="tags-box">
              <view v-for="(tag, index) in post.tags" :key="index" class="tag-item">
                {{ tag }}
              </view>
            </view>

            <view class="footer-right">
              <view class="post-actions">
                <text class="action-btn" @click.stop="goToDetail(post.id)">查看原帖</text> 
                <text class="action-btn delete-btn" @click.stop="confirmDelete(post)">删除</text>
              </view>
              
              <text v-if="post.images.length > 0" class="post-date">{{ post.date }}</text>
              <text v-else class="post-date-full">{{ post.date }}</text>
            </view>

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
      
      // 日期相关数据
      rangeValues: [], // 绑定给 picker 的数组，例如 ['2023-01-01', '2023-01-02']
      startDate: null, // 发送给后端的开始日期
      endDate: null,   // 发送给后端的结束日期
      
      // 模拟用户动态数据
      posts: [
        { id: 1, title: '春天种的植物发芽了', rating: 4.8, date: '2025-12-09', images: ['/static/img1.jpg'], tags: ['植物', '生活', '记录'] },
        { id: 3, title: '空悲切', rating: 3.9, date: '2023-04-09', images: [''], tags: ['心情', '随笔'] },
      ]
    };
  },
  computed: {
    // 动态显示选择的日期范围文字
    dateRangeText() {
      // 检查 rangeValues 是否有值
      if (this.rangeValues && this.rangeValues.length === 2) {
        return `${this.rangeValues[0]} 至 ${this.rangeValues[1]}`;
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
    
    // 日期选择器回调
    onDateChange(e) {
      console.log('选择的日期:', e);
      // e 是一个数组 ['YYYY-MM-DD', 'YYYY-MM-DD']
      if (e && e.length > 0) {
        this.rangeValues = e; // 确保视图同步
        this.startDate = e[0];
        this.endDate = e[1];
      } else {
        // 用户清空了日期 (如果开启了 clear-icon)
        this.rangeValues = [];
        this.startDate = null;
        this.endDate = null;
      }
      // 可选：选择完日期后自动触发检索
      // this.fetchUserPosts(); 
    },
    
    // 获取用户帖子列表
    fetchUserPosts() {
      console.log('检索条件:', {
        keyword: this.searchKeyword,
        start: this.startDate,
        end: this.endDate
      });

      uni.showToast({ title: '检索中...', icon: 'none' });

      // ** 模拟接口筛选逻辑 (仅供演示) **
      // 实际开发中请删除下方逻辑，直接使用 uni.request
      /*
      uni.request({
         url: '/api/user/posts',
         data: {
             keyword: this.searchKeyword,
             startDate: this.startDate,
             endDate: this.endDate
         },
         success: (res) => { ... }
      });
      */
    },
    
    goToDetail(postId) {
      uni.navigateTo({
        url: `/pages/home/postDetail?id=${postId}&edit=true`
      });
    },
    
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
    
    deletePost(post) {
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

/* --- 顶部导航栏 --- */
.header {
  height: 120rpx;
  line-height: 120rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  color: #ffffff;
  font-weight: bold;
  padding-top: var(--status-bar-height);
  background-color: v-bind(primaryColor);
}

.back-icon {
  position: absolute;
  left: 30rpx;
  top: 55rpx;
  font-size: 40rpx;
  cursor: pointer;
}

.page-title {
  font-size: 38rpx;
  font-weight: bold;
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

/* === 修改：Picker 容器样式 === */
.picker-container {
  flex: 1.8; 
  margin-right: 20rpx;
  position: relative; 
}

/* 让 uni-datetime-picker 填满容器 */
.custom-picker {
    width: 100%;
}

.date-picker-box {
  width: 100%; 
  height: 70rpx;
  line-height: 70rpx;
  background-color: #f7f7f7;
  border-radius: 35rpx;
  padding: 0 20rpx;
  font-size: 24rpx; 
  color: #666;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* 确保文字不换行 */
  white-space: nowrap;
  overflow: hidden;
}

.date-text {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
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
    padding: 20rpx; 
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
    margin-bottom: 15rpx; 
}

.post-title {
    font-size: 32rpx;
    font-weight: bold;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    flex: 1;
    margin-right: 15rpx;
}

.post-rating {
    font-size: 28rpx;
    color: #FF9900;
    font-weight: bold;
}

/* --- 底部布局 --- */
.post-footer {
    display: flex;
    justify-content: space-between;
    align-items: flex-end; 
    margin-top: 10rpx;
}

/* 左侧：标签区域 */
.tags-box {
    display: flex;
    flex-wrap: wrap;
    flex: 1; 
    margin-right: 20rpx;
}

.tag-item {
    font-size: 20rpx;
    color: #00CC99; 
    background-color: #e6f9f2; 
    padding: 4rpx 12rpx;
    border-radius: 8rpx;
    margin-right: 10rpx;
    margin-bottom: 5rpx; 
}

/* 右侧：操作和日期 */
.footer-right {
    display: flex;
    flex-direction: column; 
    align-items: flex-end; 
    flex-shrink: 0; 
}

.post-actions {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 10rpx;
}

.action-btn {
    font-size: 24rpx; 
    color: #666;
    padding: 4rpx 16rpx;
    border: 1rpx solid #ccc;
    border-radius: 20rpx;
    margin-left: 15rpx;
}

.delete-btn {
    color: #FF3B30;
    border-color: #FF3B30;
}

.post-date, .post-date-full {
    font-size: 22rpx;
    color: #999;
}
</style>