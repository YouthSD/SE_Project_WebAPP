<template>
  <view class="container">
    
    <view class="header" :style="{backgroundColor: primaryColor}">
      <back-icon icon-size="50" @click="goBack" class="back-icon"></back-icon>
      <text class="page-title">添加好友</text>
    </view>
    
    <view class="search-box">
      <input 
        class="search-input" 
        placeholder="输入昵称或用户名搜索" 
        v-model="searchKeyword"
        @confirm="searchUser"
      />
      <button class="search-btn" :style="{backgroundColor: primaryColor}" @click="searchUser">搜索</button>
    </view>
    
    <scroll-view scroll-y class="result-list">
      <view v-if="searchStatus === 'searching'" class="status-msg">
        <text>正在搜索...</text>
      </view>
      <view v-else-if="searchStatus === 'empty'" class="status-msg">
        <text>未找到用户 "{{ searchKeyword }}"</text>
      </view>
      
      <view v-if="searchedUser" class="user-item">
        <image :src="searchedUser.avatar" class="avatar" mode="aspectFill"></image>
        <view class="user-info">
          <text class="user-nickname">{{ searchedUser.nickname }}</text>
          <text class="user-username">@{{ searchedUser.username }}</text>
        </view>
        <button 
          class="add-btn" 
          :style="{backgroundColor: primaryColor}" 
          @click="sendRequest(searchedUser)"
          :disabled="searchedUser.isFriend || searchedUser.hasSentRequest"
        >
          {{ getButtonText(searchedUser) }}
        </button>
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
      searchStatus: 'idle', // 'idle', 'searching', 'empty', 'found'
      searchedUser: null, // 搜索到的用户对象
    };
  },
  methods: {
    goBack() {
      uni.navigateBack();
    },
    
    getButtonText(user) {
      if (user.isFriend) return '已是好友';
      if (user.hasSentRequest) return '已发送请求';
      return '添加好友';
    },
    
    // 搜索用户
    searchUser() {
      const keyword = this.searchKeyword.trim();
      if (!keyword) {
        uni.showToast({ title: '请输入搜索关键词', icon: 'none' });
        return;
      }
      
      this.searchStatus = 'searching';
      this.searchedUser = null;

      // ** 模拟接口调用：搜索用户 **
      // 接口：/api/users/search
      // 参数：{ keyword: keyword }
      /*
      uni.request({ 
        url: '/api/users/search', 
        data: { keyword: keyword },
        success: (res) => {
          this.searchStatus = res.data.data ? 'found' : 'empty';
          this.searchedUser = res.data.data; // 假设返回 {id, username, nickname, avatar, isFriend, hasSentRequest}
        },
        fail: () => {
          this.searchStatus = 'idle';
          uni.showToast({ title: '搜索失败', icon: 'none' });
        }
      });
      */
      
      // ** 前端临时模拟 **
      setTimeout(() => {
        if (keyword === 'test') {
          this.searchedUser = { 
            id: 201, 
            username: 'tester', 
            nickname: '测试用户', 
            avatar: '/static/avatar4.jpg', 
            isFriend: false, 
            hasSentRequest: false 
          };
          this.searchStatus = 'found';
        } else {
          this.searchedUser = null;
          this.searchStatus = 'empty';
        }
      }, 500);
    },
    
    // 发送好友请求
    sendRequest(user) {
      uni.showModal({
        title: '添加好友',
        content: `确定要向 ${user.nickname} 发送好友请求吗？`,
        confirmText: '发送',
        success: (res) => {
          if (res.confirm) {
            // ** 模拟接口调用：发送好友请求 **
            // 接口：/api/friends/sendRequest
            // 参数：{ targetUserId: user.id }
            /*
            uni.request({ 
              url: '/api/friends/sendRequest', 
              method: 'POST', 
              data: { targetUserId: user.id },
              success: (res) => {
                if (res.data.code === 0) {
                  uni.showToast({ title: '请求已发送', icon: 'success' });
                  user.hasSentRequest = true; // 立即更新按钮状态
                } else {
                  uni.showToast({ title: res.data.message || '发送失败', icon: 'none' });
                }
              }
            });
            */
            // ** 临时成功模拟 **
            uni.showToast({ title: '请求已发送', icon: 'success' });
            user.hasSentRequest = true;
          }
        }
      });
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

/* --- 搜索框 --- */
.search-box {
  padding: 20rpx 30rpx;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  border-bottom: 1rpx solid #eee;
}

.search-input {
  flex: 1;
  height: 70rpx;
  background-color: #f7f7f7;
  border-radius: 35rpx;
  padding: 0 30rpx;
  font-size: 30rpx;
  margin-right: 20rpx;
}

.search-btn {
  height: 70rpx;
  line-height: 70rpx;
  font-size: 30rpx;
  color: #fff;
  padding: 0 30rpx;
  border-radius: 35rpx;
  white-space: nowrap;
}

/* --- 搜索结果区 --- */
.result-list {
  flex: 1;
  padding: 20rpx 30rpx;
}

.status-msg {
  text-align: center;
  padding: 50rpx;
  color: #999;
}

.user-item {
  display: flex;
  align-items: center;
  padding: 20rpx 0;
  border-bottom: 1rpx solid #f0f0f0;
}

.avatar {
  width: 100rpx;
  height: 100rpx;
  border-radius: 50%;
  margin-right: 20rpx;
}

.user-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.user-nickname {
  font-size: 34rpx;
  font-weight: bold;
  color: #333;
}

.user-username {
  font-size: 26rpx;
  color: #999;
  margin-top: 5rpx;
}

.add-btn {
  height: 70rpx;
  line-height: 70rpx;
  font-size: 30rpx;
  color: #fff;
  padding: 0 20rpx;
  border-radius: 35rpx;
}

.add-btn[disabled] {
  background-color: #ccc !important;
}
</style>