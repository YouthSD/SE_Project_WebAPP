<template>
  <view class="container">
    
    <!-- 调整导航栏：标题居中、返回按钮右移 -->
    <view class="header" :style="{backgroundColor: primaryColor}">
      <back-icon iconSize="50" @click="goBack" class="back-icon"></back-icon>
      <text class="page-title">我的评论</text>
    </view>
    
    <!-- 调整列表间距，更宽松 -->
    <scroll-view scroll-y class="comment-list">
      <view v-if="comments.length === 0" class="no-comment">
        <text>您还没有发表过任何评论</text>
      </view>
      
      <view v-for="comment in comments" :key="comment.id" class="comment-item">
        <view class="comment-header">
          <text class="comment-post-title">评论帖子: 《{{ comment.postTitle }}》</text>
          <text class="comment-date">{{ comment.date }}</text>
        </view>
        
        <text class="comment-content">{{ comment.content }}</text>
        
        <view class="comment-actions">
          <text class="action-btn" @click="goToPost(comment.postId)">查看原帖</text>
          <text class="action-btn delete-btn" @click="confirmDelete(comment)">删除</text>
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
      comments: [
        { id: 1, postId: 101, postTitle: '春天种的植物发芽了', content: '写得太好了！照片也很漂亮！', date: '2025-12-09 10:30' },
        { id: 2, postId: 102, postTitle: '今日份美食分享', content: '看起来好好吃，求做法！', date: '2025-12-08 15:20' },
        { id: 3, postId: 103, postTitle: '关于uni-app的一些心得', content: '学到了，感谢分享！', date: '2025-12-07 09:00' },
      ]
    };
  },
  onLoad() {
    this.fetchUserComments();
  },
  methods: {
    goBack() {
      uni.navigateBack();
    },
    fetchUserComments() {},
    goToPost(postId) {
      uni.navigateTo({ url: `postDetail?id=${postId}` });
    },
    confirmDelete(comment) {
      uni.showModal({
        title: '删除确认',
        content: '你确定要删除这条评论吗？',
        confirmText: '确认删除',
        confirmColor: '#FF3B30',
        success: (res) => {
          if (res.confirm) this.deleteComment(comment);
        }
      });
    },
    deleteComment(comment) {
      uni.showToast({ title: '评论删除成功', icon: 'success' });
      this.comments = this.comments.filter(c => c.id !== comment.id);
    }
  }
}
</script>

<style scoped>
.container {
  height: 100vh;
  background-color: #f7fff7;
}

/* 导航栏：标题居中 + 返回按钮右移 */
.header {
  height: 90rpx;
  display: flex;
  justify-content: center; /* 标题居中 */
  align-items: center;
  position: relative; /* 给返回按钮做绝对定位 */
  color: #ffffff;
  font-weight: bold;
  padding-top: var(--status-bar-height);
  background-color: v-bind(primaryColor);
}

/* 返回按钮右移（从原来20rpx左距改成30rpx） */
.back-icon {
  position: absolute;
  left: 30rpx;
  font-size: 40rpx;
  cursor: pointer;
}

.page-title {
  font-size: 36rpx; /* 标题放大一点 */
  font-weight: bold;
}

/* 评论列表：增大内边距，去掉挤的负margin */
.comment-list {
  flex: 1;
  padding: 30rpx 30rpx 30rpx 7rpx; /* 比原来更宽松 */
}

.no-comment {
  text-align: center;
  padding: 50rpx;
  color: #999;
}

/* 评论项：增大内边距和间距，不拥挤 */
.comment-item {
  background-color: #ffffff;
  padding: 30rpx; /* 比原来大5rpx */
  margin-bottom: 25rpx; /* 比原来大5rpx */
  border-radius: 10rpx;
  box-shadow: 0 2rpx 5rpx rgba(0, 0, 0, 0.05);
}

.comment-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10rpx;
  padding-bottom: 10rpx;
  border-bottom: 1rpx dashed #eee;
  /* 新增：给整个header加左内边距，让帖子标题整体左移 */
  padding-left: 0rpx;
}

/* 核心调整：帖子标题左移 - 增加左内边距/减少右外边距 */
.comment-post-title {
  font-size: 32rpx; /* 帖子标题放大一点 */
  font-weight: bold;
  color: v-bind(primaryColor);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
  padding-left: 0rpx; /* 标题左移核心：增加左内边距（可调整数值） */
  margin-right: 10rpx; /* 减少和日期的间距，让标题更靠左 */
}

.comment-date {
  font-size: 24rpx;
  color: #999;
  margin-left: 5rpx; /* 减少左边距，配合标题左移 */
}

.comment-content {
  font-size: 34rpx; /* 内容字体放大一点 */
  color: #555;
  line-height: 1.6; /* 行高更舒展 */
  margin-bottom: 20rpx;
  display: block;
  /* 内容也轻微左移，保持整体对齐 */
  padding-left: 0rpx;
}
.comment-content-wrap {
    padding-left: -20rpx; /* 确保内容左对齐 */
    padding-right: 0; 
}
.comment-actions {
  display: flex;
  justify-content: flex-end;
  /* 按钮区轻微左移，保持协调 */
  padding-left: 0rpx;
}

.action-btn {
  font-size: 28rpx;
  color: #666;
  padding: 5rpx 15rpx;
  border: 1rpx solid #ccc;
  border-radius: 20rpx;
  margin-left: 15rpx;
}

.delete-btn {
  color: #FF3B30;
  border-color: #FF3B30;
}
</style>