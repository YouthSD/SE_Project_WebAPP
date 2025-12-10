<template>
  <view class="container">
    
    <view class="header" :style="{backgroundColor: primaryColor}">
      <text class="page-title">我的</text>
      </view>
    
    <view class="user-card">
      
      <view class="user-info-main">
        <image 
          :src="userInfo.avatar" 
          class="avatar" 
          mode="aspectFill"
          @click="quickEdit('avatar')" 
        />
        <view class="text-info">
          <text class="username">@{{ userInfo.username }}</text>
          
          <view class="nickname-box" @click="quickEdit('nickname')">
            <text class="nickname">{{ userInfo.nickname }}</text>
            <text class="edit-icon">✏️</text>
          </view>
        </view>
      </view>
      
      <view class="stats-bar">
        <view class="stat-item">
          <text class="stat-number">{{ userInfo.postCount }}</text>
          <text class="stat-label">动态</text>
        </view>
        <view class="stat-item">
          <text class="stat-number">{{ userInfo.commentCount }}</text>
          <text class="stat-label">评论</text>
        </view>
        <view class="stat-item" @click="goToPage('friendList')">
          <text class="stat-number">{{ userInfo.friendCount }}</text>
          <text class="stat-label">好友</text>
        </view>
      </view>
    </view>
    
    <view class="feature-list">
      <view class="feature-item" @click="goToPage('userPosts')">
        <text class="icon">📝</text>
        <text class="name">我的动态</text>
        <text class="arrow">></text>
      </view>
      <view class="feature-item" @click="goToPage('userComments')">
        <text class="icon">💬</text>
        <text class="name">我的评论</text>
        <text class="arrow">></text>
      </view>
      
      <view class="feature-item" @click="goToPage('settings')"> 
        <text class="icon">⚙️</text>
        <text class="name">设置</text>
        <text class="arrow">></text>
      </view>
      
    </view>

    <uni-popup ref="editModal" type="dialog">
      <uni-popup-dialog 
        mode="input" 
        :title="modalTitle" 
        :value="modalValue" 
        placeholder="请输入新内容"
        @confirm="handleQuickEditConfirm"
      ></uni-popup-dialog>
    </uni-popup>
    
  </view>
</template>

<script>
// 导入 uni-ui 组件库中的 uni-popup-dialog，确保您的项目已安装 uni-ui
//import { uniPopupDialog } from '@dcloudio/uni-ui'

export default {
 // components: { uniPopupDialog },
  data() {
    return {
      primaryColor: '#00CC99', 
      accentColor: '#FFD700',
      tabs: [],
	  
      // 模拟用户数据
      userInfo: {
        avatar: '/static/major.jpg', // 默认使用上传的 logo 图片
        username: 'dank1ng',
        nickname: '空悲切',
        friendCount: 15,
        postCount: 5,
        commentCount: 22,
      },
      
      // 快捷修改模态框状态
      editingField: '',
      modalTitle: '',
      modalValue: '',
      
    };
  },
  onShow() {
    this.fetchUserInfo(); // 每次进入页面刷新数据
  },
  methods: {
    // 模拟获取用户信息
    fetchUserInfo() {
      // ** 模拟接口调用：获取用户信息 **
      /* uni.request({...}); */
    },
    
    // 快捷修改入口
    quickEdit(field) {
      if (field === 'avatar') {
        // 快捷修改头像直接跳转到详细设置页面
        this.goToPage('profileSettings');
        return;
      }
      
      this.editingField = field;
      if (field === 'nickname') {
        this.modalTitle = '修改昵称';
        this.modalValue = this.userInfo.nickname;
      }
      this.$refs.editModal.open();
    },
    
    // 处理快捷修改确认
    handleQuickEditConfirm(value) {
      if (value.trim() === this.userInfo[this.editingField]) {
        this.$refs.editModal.close();
        return;
      }
      
      if (this.editingField === 'nickname') {
        this.updateProfile({ nickname: value.trim() });
      }
      
      this.$refs.editModal.close();
    },
    
    // 实际更新个人资料的逻辑
    updateProfile(data) {
      // ** 临时成功模拟 **
      if (data.nickname) {
        this.userInfo.nickname = data.nickname;
        uni.showToast({ title: '昵称修改成功', icon: 'success' });
      }
    },
    
	goBack() {
	    uni.navigateBack();
	},
    
    // 路由跳转逻辑 (保持不变，以解决路径拼接问题)
    goToPage(pageName) {
        let path = '';
            
        // 根据 pageName 构造路径 (相对路径或绝对路径)
		if (pageName === 'profileSettings') {
			path = 'profileSettings'; 
		} else if (pageName === 'settings') {
            path = 'settings';
        } else if (pageName === 'userPosts') {
            path = 'userPosts';
        } else if (pageName === 'userComments') {
            path = 'userComments';
        }  else if (pageName === 'friendList') {
            // 友情提示：friendList 在 message 分包下
            path = '/pages/message/friends/friendList'; 
        }
            
        if (path) {
            // 拼接逻辑：如果是绝对路径（以 / 开头），则直接使用；否则拼接 Profile 分包路径
            uni.navigateTo({
                url: path.startsWith('/') ? path : `/pages/profile/settings/${path}`
            });
        }
		const targetUrl = path.startsWith('/') ? path : `/pages/profile/settings/${path}`;
		console.log('跳转路径：', targetUrl); // 打印路径确认是否为 /pages/profile/settings/profileSettings
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #ffffff;
  font-weight: bold;
  padding: 0 30rpx;
  padding-top: var(--status-bar-height);
  z-index: 10;
}

.page-title {
  font-size: 38rpx;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.setting-btn {
  font-size: 45rpx;
}

/* --- 用户核心信息卡片 --- */
.user-card {
  background-color: #ffffff;
  padding: 40rpx 30rpx;
  margin-bottom: 20rpx;
}

.user-info-main {
  display: flex;
  align-items: center;
  margin-bottom: 30rpx;
}

.avatar {
  width: 150rpx;
  height: 150rpx;
  border-radius: 50%;
  margin-right: 30rpx;
  border: 4rpx solid #eee;
}

.text-info {
  display: flex;
  flex-direction: column;
}

.username {
  font-size: 28rpx;
  color: #999;
  margin-bottom: 5rpx;
}

.nickname-box {
  display: flex;
  align-items: center;
}

.nickname {
  font-size: 44rpx;
  font-weight: bold;
  color: #333;
  margin-right: 15rpx;
}

.edit-icon {
  font-size: 30rpx;
  color: v-bind(primaryColor);
}

.stats-bar {
  display: flex;
  justify-content: space-around;
  padding-top: 20rpx;
  border-top: 1rpx solid #eee;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 10rpx;
}

.stat-number {
  font-size: 38rpx;
  font-weight: bold;
  color: v-bind(primaryColor);
  line-height: 1.2;
}

.stat-label {
  font-size: 26rpx;
  color: #666;
  margin-top: 5rpx;
}

/* --- 功能入口列表 --- */
.feature-list {
  background-color: #ffffff;
  margin-bottom: 20rpx;
}

.feature-item {
  display: flex;
  align-items: center;
  padding: 25rpx 30rpx;
  border-bottom: 1rpx solid #f0f0f0;
}

.feature-item:last-child {
  border-bottom: none;
}

.icon {
  font-size: 40rpx;
  margin-right: 20rpx;
  width: 50rpx;
  text-align: center;
}

.name {
  flex: 1;
  font-size: 32rpx;
  color: #333;
}

.arrow {
  font-size: 30rpx;
  color: #ccc;
}
</style>