<template>
  <view class="container">
    <view class="header" :style="{ backgroundColor: primaryColor }">
      <back-icon iconSize="50" @click="goBack" class="back-icon"></back-icon>
      <text class="page-title">设置</text>
    </view>

    <view class="settings-list">
      <view class="setting-item" @click="goToPage('profileSettings')">
        <text class="name">设置个人资料</text>
      </view>

      <view class="setting-item danger" @click="handleLogout">
        <text class="name">注销账号</text>
      </view>

      <view class="setting-item" @click="handleSwitchAccount">
        <text class="name">切换账号</text>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      primaryColor: "#00CC99",
    };
  },
  methods: {
    goBack() {
      uni.navigateBack();
    },
    goToPage(pageName) {
      // 如果传入的是绝对路径（以 / 开头），直接使用；
	  // 否则拼接到分包根目录 `pages/profile/settings` 下，避免重复或错误的路径。
	  const url = pageName.startsWith("/")
	  ? pageName
	  : `/pages/profile/settings/${pageName}`;
	  uni.navigateTo({ url });
    },

    // 注销账号逻辑
    handleLogout() {
      uni.showModal({
        title: "警告",
        content: "注销账号将清除您的本地数据，确定要继续吗？",
        confirmText: "确定注销",
        confirmColor: "#FF3B30",
        success: (res) => {
          if (res.confirm) {
            // ** 模拟接口调用：执行注销 **
            // 接口：/api/user/logout
            /*
            uni.request({ url: '/api/user/logout', success: () => {
              // 清除本地存储
              uni.clearStorageSync();
              uni.reLaunch({ url: 'pages/login' }); // 跳转到登录页
            }});
            */
            uni.showToast({ title: "注销成功", icon: "success" });
            // 实际操作应该是跳转到登录页，这里我们简单返回我的页面
            this.goBack();
          }
        },
      });
    },

    // 切换账号逻辑
    handleSwitchAccount() {
      uni.showModal({
        title: "切换账号",
        content: "确定要切换账号吗？您将被导向登录页。",
        success: (res) => {
          if (res.confirm) {
            // 假设：跳转到登录页，并允许用户重新登录
            uni.showToast({ title: "准备切换", icon: "none" });
            // uni.reLaunch({ url: 'pages/login' });
            this.goBack();
          }
        },
      });
    },
  },
};
</script>

<style scoped>
.container {
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

/* --- 设置列表 --- */
.settings-list {
  background-color: #ffffff;
  margin-top: 20rpx;
}

.setting-item {
  display: flex;
  align-items: center;
  padding: 25rpx 30rpx;
  border-bottom: 1rpx solid #f0f0f0;
}

.setting-item:last-child {
  border-bottom: none;
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

.setting-item.danger .name {
  color: #ff3b30; /* 危险操作使用红色 */
}
</style>
