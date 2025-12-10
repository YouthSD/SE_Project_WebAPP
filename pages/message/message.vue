<template>
  <view class="container">
    
    <view class="header" :style="{backgroundColor: primaryColor}">
      <text class="page-title">消息</text>
    </view>
    
    <view class="feature-buttons">
      <view class="button-item" @click="goToPage('friendList')">
        <text class="icon">👥</text>
        <text class="text">好友列表</text>
      </view>
      <view class="button-item" @click="goToPage('addFriend')">
        <text class="icon">➕</text>
        <text class="text">添加好友</text>
      </view>
      <view class="button-item request-item" @click="goToPage('friendRequests')">
        <text class="icon">✉️</text>
        <text class="text">好友请求</text>
        <view v-if="requestCount > 0" class="badge" :style="{backgroundColor: accentColor}">{{ requestCount }}</view>
      </view>
      <view class="button-item" @click="showFeatureNotImplemented">
        <text class="icon">ℹ️</text>
        <text class="text">关于我的</text>
      </view>
    </view>
    
    <scroll-view scroll-y class="message-list">
      <view v-if="messages.length === 0" class="no-message">
        <text>暂无新消息</text>
      </view>
      
      <view 
        v-for="msg in messages" 
        :key="msg.id" 
        class="message-item" 
        @click="goToChat(msg.friendId, msg.friendName)"
      >
        <image :src="msg.avatar" class="avatar" mode="aspectFill"></image>
        <view class="message-content">
          <view class="info-line">
            <text class="friend-name">{{ msg.friendName }}</text>
            <text class="timestamp">{{ msg.time }}</text>
          </view>
          <text class="last-message">{{ msg.lastMessage }}</text>
        </view>
      </view>
      
    </scroll-view>
    
    <view class="tab-bar">
      <view v-for="tab in tabs" :key="tab.name" class="tab-item" @click="switchTab(tab.path)">
        <text class="tab-icon" :class="{'active': tab.path === 'message'}">{{ tab.icon }}</text>
        <text 
          class="tab-text" 
          :style="{color: tab.path === 'message' ? primaryColor : '#888'}"
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
      requestCount: 3, // 模拟未处理的好友请求数量
	  tabs: [],
      
      // 模拟消息列表数据
      messages: [
        { id: 1, friendId: 101, friendName: '小绿', avatar: '/static/avatar1.jpg', lastMessage: '你上次发的帖子太棒了！', time: '10:30' },
        { id: 2, friendId: 102, friendName: '程序猿', avatar: '/static/avatar2.jpg', lastMessage: '[图片] 看看我新写的代码', time: '昨天' },
        { id: 3, friendId: 103, friendName: '老吃家', avatar: '/static/avatar3.jpg', lastMessage: '好的，明天见', time: '周一' },
      ],
    };
  },
  onShow() {
    this.fetchMessages();
    this.fetchRequestCount();
  },
  methods: {
    // 模拟获取消息列表
    fetchMessages() {
      // ** 模拟接口调用：获取消息列表 **
      // 接口：/api/messages/list
      /*
      uni.request({ url: '/api/messages/list', success: (res) => {
        this.messages = res.data.data;
      }});
      */
    },
    
    // 模拟获取好友请求数量
    fetchRequestCount() {
      // ** 模拟接口调用：获取好友请求数量 **
      // 接口：/api/friends/requests/count
      /*
      uni.request({ url: '/api/friends/requests/count', success: (res) => {
        this.requestCount = res.data.data.count;
      }});
      */
    },
    
    // 跳转到聊天页面
    goToChat(friendId, friendName) {
      // 假设聊天页面为 chat.vue
      uni.navigateTo({
        url: `chat?id=${friendId}&name=${friendName}`
      });
    },
    
    // 跳转到功能页面
    goToPage(pageName) {
      // 假设这些页面都在当前 Tab 的子目录下，或者已经配置了全局路由
      let path = '';
          
      // 根据 pageName 构造完整的绝对路径
      if (pageName === 'friendList') {
      	path = '/pages/message/friends/friendList'; 
      } else if (pageName === 'friendRequests') {
          path = '/pages/message/friends/friendRequests';
      } else if (pageName === 'addFriend') {
         path = '/pages/message/friends/addFriend';
      }
          
      if (path) {
          uni.navigateTo({
              url: path
          });
      }
    },
    
    showFeatureNotImplemented() {
      uni.showToast({
        title: '该功能暂未实现',
        icon: 'none'
      });
    },
    
    // 底部导航切换
    switchTab(path) {
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
  background-color: #f0f8f0;
}

/* --- 顶部导航栏 --- */
.header {
  height: 90rpx;
  line-height: 90rpx;
  text-align: center;
  color: #ffffff;
  font-size: 38rpx;
  font-weight: bold;
  padding-top: var(--status-bar-height);
  z-index: 10;
}

/* --- 核心功能按钮区 --- */
.feature-buttons {
  display: flex;
  justify-content: space-around;
  padding: 30rpx 0;
  background-color: #ffffff;
  border-bottom: 1rpx solid #eee;
}

.button-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 25%;
  position: relative;
}

.button-item .icon {
  font-size: 50rpx;
  margin-bottom: 10rpx;
}

.button-item .text {
  font-size: 26rpx;
  color: #333;
}

.badge {
  position: absolute;
  top: 0;
  right: 15rpx;
  min-width: 30rpx;
  height: 30rpx;
  line-height: 30rpx;
  border-radius: 15rpx;
  color: #333;
  font-size: 20rpx;
  text-align: center;
  padding: 0 5rpx;
}

/* --- 消息列表区 --- */
.message-list {
  flex: 1;
}

.no-message {
  text-align: center;
  padding: 50rpx;
  color: #999;
}

.message-item {
  display: flex;
  padding: 20rpx 30rpx;
  background-color: #ffffff;
  border-bottom: 1rpx solid #eee;
  align-items: center;
}

.avatar {
  width: 90rpx;
  height: 90rpx;
  border-radius: 50%;
  margin-right: 20rpx;
}

.message-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.info-line {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5rpx;
}

.friend-name {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
}

.timestamp {
  font-size: 24rpx;
  color: #999;
}

.last-message {
  font-size: 28rpx;
  color: #666;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>