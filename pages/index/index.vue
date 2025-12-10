<template>
  <view class="container">
    <view class="logo-area">
      <image src="/static/logo.jpg" mode="aspectFit" class="main-logo"></image>
      <text class="app-title" :style="{color: primaryColor}">小绿书</text>
    </view>

    <view class="button-area">
      <button 
        class="login-btn" 
        :style="{backgroundColor: primaryColor}"
        @click="goToLogin"
      >
        登 录
      </button>

      <button 
        class="register-btn" 
        :style="{borderColor: primaryColor, color: primaryColor}"
        @click="goToRegister"
      >
        注 册
      </button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      primaryColor: '#00CC99', // 主题绿色
      accentColor: '#FFD700'  // 主题黄色
    };
  },
  methods: {
    // 跳转到登录页
    goToLogin() {
      uni.navigateTo({
        url: '/pages/login/login'
      });
    },
    // 跳转到注册页
    goToRegister() {
      uni.navigateTo({
        url: '/pages/register/register'
      });
    }
  }
}
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 50rpx 40rpx; 
  background-color: #f7fff7; /* 轻微的主题色背景 */
}

/* --- Logo 区域 --- */
.logo-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 150rpx;
  margin-bottom: 80rpx;
}

.main-logo {
  width: 400rpx;
  height: 400rpx;
  border-radius: 20rpx;
  margin-bottom: 20rpx;
  box-shadow: 0 10rpx 20rpx rgba(0, 0, 0, 0.1);
}

.app-title {
  font-size: 60rpx;
  font-weight: bold;
  letter-spacing: 5rpx;
}

/* --- 按钮区域 --- */
.button-area {
  width: 100%;
  margin-bottom: 0rpx;
}

.login-btn {
  width: 100%;
  height: 90rpx;
  line-height: 90rpx;
  font-size: 36rpx;
  color: #ffffff;
  border-radius: 45rpx;
  margin-bottom: 30rpx;
  box-shadow: 0 5rpx 15rpx rgba(0, 204, 153, 0.4);
}

.register-btn {
  width: 100%;
  height: 90rpx;
  line-height: 90rpx;
  font-size: 36rpx;
  background-color: transparent;
  border: 2rpx solid;
  border-radius: 45rpx;
}
</style>