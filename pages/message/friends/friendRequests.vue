<template>
  <view class="container">
    
    <view class="header" :style="{backgroundColor: primaryColor}">
      <back-icon iconSize="50" @click="goBack" class="back-icon"></back-icon>
      <text class="page-title">好友请求 ({{ requests.length }})</text>
    </view>
    
    <scroll-view scroll-y class="request-list">
      <view v-if="requests.length === 0" class="no-request">
        <text>暂无新的好友请求</text>
      </view>
      
      <view v-for="request in requests" :key="request.id" class="request-item">
        <image :src="request.avatar" class="avatar" mode="aspectFill"></image>
        <view class="request-info">
          <text class="request-user-nickname">{{ request.nickname }}</text>
          <text class="request-message">{{ request.message || '请求添加你为好友' }}</text>
        </view>
        <view class="action-box">
          <button 
            v-if="request.status === 'pending'"
            class="action-btn accept-btn" 
            :style="{backgroundColor: primaryColor}"
            @click="confirmAccept(request)"
          >
            接受
          </button>
          <text v-else class="status-text accepted-text">已接受</text>
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
      
      // 模拟好友请求数据
      requests: [
        { id: 301, userId: 201, nickname: '测试用户', avatar: '/static/avatar4.jpg', message: 'Hi，很高兴认识你！', status: 'pending' },
        { id: 302, userId: 202, nickname: '老朋友B', avatar: '/static/avatar5.jpg', message: '我是B，以前的同学', status: 'pending' },
        { id: 303, userId: 203, nickname: '已处理C', avatar: '/static/avatar6.jpg', message: '请求已过期', status: 'accepted' },
      ]
    };
  },
  onLoad() {
    this.fetchRequests();
  },
  methods: {
    goBack() {
      uni.navigateBack();
    },
    
    // 模拟获取好友请求
    fetchRequests() {
      // ** 模拟接口调用：获取好友请求 **
      // 接口：/api/friends/requests/list
      /*
      uni.request({ 
        url: '/api/friends/requests/list', 
        success: (res) => {
          this.requests = res.data.data;
        }
      });
      */
    },
    
    // 确认接受好友请求
    confirmAccept(request) {
      uni.showModal({
        title: '确认添加',
        content: `确认添加 ${request.nickname} 为你的好友吗？`,
        confirmText: '确认',
        success: (res) => {
          if (res.confirm) {
            this.handleAccept(request);
          }
        }
      });
    },
    
    // 处理接受请求
    handleAccept(request) {
      // ** 模拟接口调用：接受好友请求 **
      // 接口：/api/friends/accept
      // 参数：{ requestId: request.id, requestingUserId: request.userId }
      /*
      uni.request({ 
        url: '/api/friends/accept', 
        method: 'POST', 
        data: { requestId: request.id },
        success: (res) => {
          if (res.data.code === 0) {
            uni.showToast({ title: `已添加 ${request.nickname}`, icon: 'success' });
            request.status = 'accepted'; // 更新状态
          } else {
            uni.showToast({ title: res.data.message || '接受失败', icon: 'none' });
          }
        }
      });
      */
      
      // ** 临时成功模拟 **
      uni.showToast({ title: `已添加 ${request.nickname}`, icon: 'success' });
      request.status = 'accepted'; 
      // 刷新列表 (在实际中，可能需要重新获取或从列表中移除已处理项)
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

/* --- 顶部导航栏 (与 friendList 样式保持一致) --- */
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

/* --- 请求列表区 --- */
.request-list {
  flex: 1;
  background-color: #ffffff;
}

.no-request {
  text-align: center;
  padding: 50rpx;
  color: #999;
}

.request-item {
  display: flex;
  padding: 20rpx 30rpx;
  border-bottom: 1rpx solid #f0f0f0;
  align-items: center;
}

.avatar {
  width: 100rpx;
  height: 100rpx;
  border-radius: 50%;
  margin-right: 20rpx;
}

.request-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.request-user-nickname {
  font-size: 34rpx;
  font-weight: bold;
  color: #333;
}

.request-message {
  font-size: 26rpx;
  color: #999;
  margin-top: 5rpx;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.action-box {
  width: 150rpx;
  text-align: right;
}

.action-btn {
  height: 60rpx;
  line-height: 60rpx;
  font-size: 28rpx;
  color: #fff;
  padding: 0 10rpx;
  border-radius: 30rpx;
  margin: 0;
}

.status-text {
  font-size: 28rpx;
  color: #ccc;
}

.accepted-text {
  color: v-bind(primaryColor);
}
</style>