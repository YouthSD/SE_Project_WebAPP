<template>
  <view class="container">  
    <!-- 顶部按钮栏（状态随内容实时切换） -->
    <view class="fixed-tabs" :style="{backgroundColor: primaryColor}">
      <view class="tab-item" @click="scrollToSection('content')">
        <text 
          class="tab-text" 
          :class="{'active': activeSection === 'content'}"
          :style="{color: activeSection === 'content' ? accentColor : '#fff', borderBottomColor: activeSection === 'content' ? accentColor : 'transparent'}"
        >
          正文
        </text>
      </view>
      <view class="tab-item" @click="scrollToSection('comments')">
        <text 
          class="tab-text" 
          :class="{'active': activeSection === 'comments'}"
          :style="{color: activeSection === 'comments' ? accentColor : '#fff', borderBottomColor: activeSection === 'comments' ? accentColor : 'transparent'}"
        >
          评论
        </text>
      </view>
    </view>
    
    <!-- 滚动视图：动态获取可视高度 -->
    <scroll-view 
      scroll-y 
      class="detail-scroll" 
      :scroll-into-view="scrollIntoView"
      @scroll="onScroll"
      scroll-with-animation
      enable-back-to-top
      :style="{paddingBottom: '80rpx'}"
    >
      <!-- 正文区 -->
      <view id="content" class="post-content-section">
        <text class="post-title">{{ post.title }}</text>
        
        <view class="post-body">
          <text class="post-text">{{ post.content }}</text>
          
          <!-- 图片区域 -->
          <view v-if="post.images && post.images.length" class="post-media">
            <image 
              v-for="(img, index) in post.images" 
              :key="index" 
              :src="img" 
              mode="widthFix" 
              class="content-img" 
              @click="previewImage(index)"
            ></image>
          </view>
          
          <!-- 视频区域 -->
          <video v-if="post.video" :src="post.video" controls class="content-video"></video>
        </view>
        
        <view class="rating-box">
          <text class="rating-label">当前评分</text>
          <text class="rating-value" :style="{color: primaryColor}">{{ post.rating.toFixed(1) }}</text>
          <view class="rate-stars">
            <text class="rate-prompt">我要评分：</text>
            <text 
              v-for="i in 5" 
              :key="i" 
              class="star-icon" 
              :class="{'rated': i <= userRate}"
              @click="handleRate(i)"
              :style="{color: i <= userRate ? accentColor : '#ccc'}"
            >
              ★
            </text>
          </view>
        </view>
        
        <view class="divider"></view>
        
        <view class="post-meta">
          <text class="meta-item">标签: {{ post.tags.join(', ') }}</text>
          <text class="meta-item">发布于: {{ post.date }}</text>
        </view>
      </view>
      
      <!-- 评论区 -->
      <view id="comments" class="comments-section">
        <text class="section-title" :style="{color: primaryColor}">全部评论 ({{ totalComments }})</text>
        
        <view v-for="comment in comments" :key="comment.id" class="comment-item">
          <view class="comment-header">
            <text class="user-name">{{ comment.user }}</text>
            <text class="comment-rating" :style="{backgroundColor: primaryColor}">
              TA的评分: {{ comment.rating.toFixed(1) }}
            </text>
          </view>
          <text class="comment-text" @click="handleReply(comment)">{{ comment.content }}</text>
          <text class="comment-date">{{ comment.date }}</text>
          
          <view v-if="comment.replies.length > 0" class="replies-box">
            <view 
              v-for="(reply, index) in comment.replies.slice(0, comment.showCount)" 
              :key="reply.id" 
              class="reply-item"
              @click="handleReply(reply, comment)"
            >
              <text class="reply-content">
                <text class="reply-user">{{ reply.user }}: </text>
                {{ reply.content }}
              </text>
            </view>
            
            <text 
              v-if="comment.replies.length > comment.showCount" 
              class="expand-btn" 
              :style="{color: primaryColor}"
              @click="expandReplies(comment)"
            >
              展开回复 ({{ comment.replies.length - comment.showCount }}条)
            </text>
          </view>
        </view>
        
        <view class="pagination" v-if="totalPages > 1">
          <text 
            class="page-btn" 
            :class="{'disabled': currentPage === 1}"
            @click="changePage(currentPage - 1)"
          >
            上一页
          </text>
          <text class="page-info">第 {{ currentPage }} / {{ totalPages }} 页</text>
          <text 
            class="page-btn" 
            :class="{'disabled': currentPage === totalPages}"
            @click="changePage(currentPage + 1)"
          >
            下一页
          </text>
        </view>
      </view>
    </scroll-view>
    
    <!-- 底部评论输入区 -->
    <view class="comment-input-area" @click="showCommentModal">
      <text class="input-placeholder">点击输入评论或回复...</text>
      <text class="send-icon" :style="{color: primaryColor}">💬</text>
    </view>
    
    <!-- 评论模态框 -->
    <uni-popup ref="commentModal" type="bottom" :mask-click="true">
      <view class="modal-content">
        <textarea 
          class="comment-textarea" 
          placeholder="请输入您的评论..." 
          v-model="newCommentText"
          maxlength="200"
        ></textarea>
        <button class="send-btn" :style="{backgroundColor: primaryColor}" @click="submitComment">发表</button>
      </view>
    </uni-popup>
  </view>
</template>

<script>
export default {
  data() {
    return {
      primaryColor: '#00CC99',
      accentColor: '#FFD700',
      postId: null,
      scrollIntoView: '',
      activeSection: 'content', // 初始状态：正文
      contentTop: 0, // 正文在scroll-view内的顶部位置
      commentsTop: 0, // 评论在scroll-view内的顶部位置
      scrollViewHeight: 0, // 滚动视图的可视高度（新增）
      scrollTimer: null,
      
      // 帖子数据
      post: {
        id: 1, 
        title: '春天种的植物发芽了', 
        content: '这是帖子的详细正文内容，这里可以有很多文字来介绍我的植物，它长得非常好，每天都给我带来好心情。', 
        rating: 4.8, 
        tags: ['植物', '园艺', '生活'], 
        date: '2025-12-09',
        images: ['/static/img1.jpg', '/static/img2.jpg', '/static/img3.jpg', '/static/img4.jpg'], 
        video: null, 
        totalRatings: 120 
      },
      userRate: 0,
      
      // 评论数据
      totalComments: 55,
      currentPage: 1,
      pageSize: 10,
      totalPages: 6,
      comments: [
        { id: 101, user: '小绿', content: '写得太好了！照片也很漂亮！', rating: 5.0, date: '1分钟前', showCount: 3,
          replies: [
            { id: 1001, user: '作者A', content: '谢谢支持！', target: '小绿' },
            { id: 1002, user: '用户B', content: '请问这是什么品种呀?', target: '小绿' },
            { id: 1003, user: '用户C', content: 'B，这是XX品种。', target: '用户B' },
            { id: 1004, user: '用户D', content: '羡慕呀！', target: '小绿' },
          ]
        },
        { id: 102, user: '用户E', content: '评分给高了，感觉一般般。', rating: 3.5, date: '30分钟前', showCount: 0, replies: [] },
      ],
      newCommentText: '',
      replyingTo: null,
    };
  },
  onLoad(options) {
    this.postId = options.id;
    this.fetchComments(1);
  },
  onReady() {
    this.getSectionPositions(); // 初始化区域位置+滚动视图高度
  },
  methods: {
    goBack() {
      uni.navigateBack({ delta: 1 });
    },
    
    fetchPostDetail(id) {
      /* 接口逻辑 */
    },
    
    fetchComments(page) {
      this.currentPage = page;
      /* 接口逻辑 */
    },
    
    handleRate(score) {
      this.userRate = score;
      uni.showToast({ title: `您评了 ${score} 星`, icon: 'none' });
      /* 接口逻辑 */
    },
    
    showCommentModal() {
      this.replyingTo = null;
      this.$refs.commentModal.open();
    },
    
    submitComment() {
      if (!this.newCommentText.trim()) {
        uni.showToast({ title: '评论内容不能为空', icon: 'none' });
        return;
      }
      this.$refs.commentModal.close();
      this.newCommentText = '';
    },
    
    handleReply(commentOrReply, parentComment = null) {
      this.replyingTo = commentOrReply;
      this.newCommentText = `回复 @${commentOrReply.user}: `;
      this.$refs.commentModal.open();
    },
    
    expandReplies(comment) {
      comment.showCount += 3;
    },
    
    changePage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.fetchComments(page);
      }
    },
    
    previewImage(index) {
      uni.previewImage({
        current: this.post.images[index],
        urls: this.post.images
      });
    },

    // 【关键优化】动态获取：滚动视图高度 + 正文/评论区域位置
    getSectionPositions() {
      const query = uni.createSelectorQuery().in(this);
      // 1. 获取滚动视图的可视高度
      query.select('.detail-scroll').boundingClientRect(rect => {
        this.scrollViewHeight = rect ? rect.height : 0;
      });
      // 2. 获取正文在滚动视图内的顶部位置
      query.select('.detail-scroll #content').boundingClientRect(rect => {
        this.contentTop = rect ? rect.top : 0;
      });
      // 3. 获取评论在滚动视图内的顶部位置
      query.select('.detail-scroll #comments').boundingClientRect(rect => {
        this.commentsTop = rect ? rect.top : 0;
      });
      // 执行查询
      query.exec();
    },

    scrollToSection(sectionId) {
      this.activeSection = sectionId;
      const query = uni.createSelectorQuery().in(this);
      query.select(`.detail-scroll #${sectionId}`).boundingClientRect(rect => {
        if (rect) {
          uni.pageScrollTo({
            scrollTop: rect.top - uni.upx2px(80) - uni.getSystemInfoSync().statusBarHeight,
            duration: 300
          });
        }
      }).exec();
    },

    // 【核心修复】滚动时实时判断内容区域，更新按钮状态
    onScroll(e) {
      const scrollTop = e.detail.scrollTop; // 滚动视图内部的滚动距离
      
      // 节流（保证性能+实时性）
      clearTimeout(this.scrollTimer);
      this.scrollTimer = setTimeout(() => {
        this.getSectionPositions(); // 实时更新区域位置+滚动视图高度
        
        // 逻辑：当评论区进入滚动视图的「半屏区域」时，切换到“评论”状态
        const commentShowThreshold = this.commentsTop - this.scrollViewHeight / 2;
        if (scrollTop >= commentShowThreshold) {
          this.activeSection = 'comments';
        } else {
          this.activeSection = 'content';
        }
      }, 50);
    }
  }
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f0f8f0;
  padding: 0;
  margin: 0;
}

.fixed-tabs {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 80rpx;
  display: flex;
  align-items: center;
  z-index: 100;
  box-shadow: 0 2rpx 5rpx rgba(0, 0, 0, 0.1);
  padding-top: var(--status-bar-height);
  padding: 0;
}

.tab-item {
  flex: 1;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  margin: 0;
  padding: 0;
}

.tab-text {
  font-size: 32rpx;
  font-weight: bold;
  transition: all 0.2s;
  padding: 10rpx 0;
  border-bottom: 3rpx solid transparent;
  line-height: 1.2;
}

.detail-scroll {
  flex: 1;
  box-sizing: border-box;
  margin-top: calc(80rpx + var(--status-bar-height));
  padding: 0;
}

.post-content-section {
  padding: 20rpx 20rpx;
  background-color: #fff;
  margin-bottom: 10rpx;
  margin-top: 0;
}

.post-title {
  font-size: 48rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 20rpx;
  display: block;
}

.post-body {
  margin-bottom: 20rpx;
}

.post-text {
  font-size: 32rpx;
  color: #555;
  line-height: 1.6;
  white-space: pre-wrap;
  display: block;
  margin-bottom: 20rpx;
}

.post-media {
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
}

.content-img {
  width: 100%;
  border-radius: 10rpx;
  margin-bottom: 15rpx;
}

.content-video {
  width: 100%;
  height: 400rpx;
  border-radius: 10rpx;
  margin: 0;
}

.post-meta {
  padding: 15rpx 0;
  border-top: 1rpx solid #eee;
  color: #999;
  font-size: 26rpx;
}

.meta-item {
  margin-right: 20rpx;
}

.rating-box {
  padding: 20rpx 0;
  text-align: center;
  background-color: #f9fff9;
  border-radius: 10rpx;
  margin: 20rpx 0;
}

.rating-label {
  font-size: 30rpx;
  color: #666;
  display: block;
  margin-bottom: 5rpx;
}

.rating-value {
  font-size: 60rpx;
  font-weight: bold;
  display: block;
  margin-bottom: 15rpx;
}

.rate-prompt {
  font-size: 28rpx;
  color: #666;
  margin-right: 15rpx;
}

.star-icon {
  font-size: 45rpx;
  margin: 0 5rpx;
  transition: color 0.1s;
}

.comments-section {
  padding: 20rpx 20rpx;
  background-color: #fff;
  margin: 0;
}

.section-title {
  font-size: 38rpx;
  font-weight: bold;
  margin-bottom: 20rpx;
  display: block;
}

.comment-item {
  padding: 15rpx 0;
  border-bottom: 1rpx solid #eee;
  margin-bottom: 15rpx;
}

.comment-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8rpx;
}

.user-name {
  font-size: 30rpx;
  font-weight: bold;
  color: #333;
}

.comment-rating {
  font-size: 24rpx;
  color: #fff;
  padding: 5rpx 10rpx;
  border-radius: 15rpx;
}

.comment-text {
  font-size: 30rpx;
  color: #555;
  line-height: 1.5;
  margin-bottom: 8rpx;
  display: block;
}

.comment-date {
  font-size: 24rpx;
  color: #999;
}

.replies-box {
  background-color: #f7fff7;
  padding: 10rpx 15rpx;
  margin-top: 10rpx;
  border-radius: 10rpx;
}

.reply-item {
  padding: 5rpx 0;
  font-size: 28rpx;
  line-height: 1.5;
}

.reply-user {
  font-weight: bold;
  color: #00CC99;
  margin-right: 5rpx;
}

.expand-btn {
  font-size: 28rpx;
  margin-top: 8rpx;
  display: block;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20rpx 0;
}

.page-btn {
  font-size: 30rpx;
  color: #fff;
  background-color: #00CC99;
  padding: 8rpx 20rpx;
  border-radius: 30rpx;
  margin: 0 15rpx;
}

.page-btn.disabled {
  background-color: #ccc;
}

.page-info {
  font-size: 28rpx;
  color: #666;
}

.comment-input-area {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 90rpx;
  display: flex;
  align-items: center;
  padding: 0 20rpx;
  background-color: #fff;
  border-top: 1rpx solid #eee;
  z-index: 99;
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
}

.input-placeholder {
  flex: 1;
  height: 60rpx;
  line-height: 60rpx;
  background-color: #f7f7f7;
  border-radius: 30rpx;
  padding-left: 20rpx;
  font-size: 30rpx;
  color: #999;
  margin-right: 15rpx;
}

.send-icon {
  font-size: 36rpx;
}

.modal-content {
  background-color: #fff;
  padding: 20rpx;
  border-top-left-radius: 20rpx;
  border-top-right-radius: 20rpx;
}

.comment-textarea {
  width: 100%;
  min-height: 180rpx;
  padding: 15rpx;
  box-sizing: border-box;
  border: 1rpx solid #eee;
  border-radius: 10rpx;
  font-size: 32rpx;
  margin-bottom: 15rpx;
}

.send-btn {
  height: 70rpx;
  line-height: 70rpx;
  font-size: 32rpx;
  color: #fff;
  border-radius: 35rpx;
}
</style>