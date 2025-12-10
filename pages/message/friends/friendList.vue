<template>
  <view class="container">
    
    <view class="header" :style="{backgroundColor: primaryColor}">
      <back-icon icon-size="50" @click="goBack" class="back-icon"></back-icon>
      <text class="page-title">我的好友 ({{ totalFriends }})</text>
    </view>
    
    <view class="search-box">
      <input 
        class="search-input" 
        placeholder="搜索好友昵称或用户名" 
        v-model="searchKeyword"
        @confirm="searchFriends"
      />
      <text class="search-icon" @click="searchFriends">🔍</text>
    </view>
    
    <scroll-view scroll-y class="friend-list">
      <view v-if="friends.length === 0" class="no-friend">
        <text>暂无好友或搜索结果为空</text>
      </view>
      
      <view 
        v-for="friend in friends" 
        :key="friend.id" 
        class="friend-item" 
        @click="goToChat(friend.id, friend.name)"
      >
        <image :src="friend.avatar" class="avatar" mode="aspectFill"></image>
        <view class="friend-info">
          <text class="friend-nickname">{{ friend.nickname }}</text>
          <text class="friend-username">@{{ friend.username }}</text>
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
    </scroll-view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      primaryColor: '#00CC99',
      searchKeyword: '',
      
      totalFriends: 32, // 模拟总好友数
      currentPage: 1,
      pageSize: 10,
      totalPages: 4, // 模拟 32/10 = 4页
      
      // 模拟好友数据 (当前页10条)
      friends: [
        { id: 101, username: 'xiaolv01', nickname: '小绿', avatar: '/static/avatar1.jpg' },
        { id: 102, username: 'coder_A', nickname: '程序猿', avatar: '/static/avatar2.jpg' },
        { id: 103, username: 'foodie_A', nickname: '美食家A', avatar: '/static/avatar3.jpg' },
        // ... 7 more friends
      ]
    };
  },
  onLoad() {
    this.fetchFriends(1);
  },
  methods: {
    goBack() {
      uni.navigateBack();
    },
    
    // 模拟获取好友列表
    fetchFriends(page) {
      this.currentPage = page;
      // ** 模拟接口调用：获取好友列表 **
      // 接口：/api/friends/list
      // 参数：{ page: page, pageSize: this.pageSize, keyword: this.searchKeyword }
      /*
      uni.request({ 
        url: '/api/friends/list', 
        data: { page: page, pageSize: this.pageSize, keyword: this.searchKeyword },
        success: (res) => {
          this.friends = res.data.data.list;
          this.totalFriends = res.data.data.total;
          this.totalPages = Math.ceil(this.totalFriends / this.pageSize);
        }
      });
      */
    },
    
    // 搜索好友
    searchFriends() {
      this.fetchFriends(1); // 搜索时从第一页开始
    },
    
    // 切换分页
    changePage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.fetchFriends(page);
      }
    },
    
    // 跳转到聊天页面
    goToChat(friendId, friendName) {
      uni.navigateTo({
        url: `chat?id=${friendId}&name=${friendName}`
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

/* --- 顶部导航栏 --- */
.header {
  height: 90rpx;
  display: flex;
  align-items: center;
  position: relative;
  color: #ffffff;
  font-weight: bold;
  padding-top: var(--status-bar-height);
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

.search-icon {
  font-size: 40rpx;
  color: #999;
}

/* --- 好友列表 --- */
.friend-list {
  flex: 1;
  background-color: #ffffff;
}

.no-friend {
  text-align: center;
  padding: 50rpx;
  color: #999;
}

.friend-item {
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

.friend-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.friend-nickname {
  font-size: 34rpx;
  font-weight: bold;
  color: #333;
}

.friend-username {
  font-size: 26rpx;
  color: #999;
  margin-top: 5rpx;
}

/* --- 分页器 (与 postDetail 样式保持一致) --- */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30rpx 0;
}

.page-btn {
  font-size: 30rpx;
  color: #fff;
  background-color: v-bind(primaryColor);
  padding: 10rpx 25rpx;
  border-radius: 30rpx;
  margin: 0 20rpx;
}

.page-btn.disabled {
  background-color: #ccc;
}

.page-info {
  font-size: 28rpx;
  color: #666;
}
</style>