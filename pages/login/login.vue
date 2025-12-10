<template>
  <view class="container">
    <view class="header">
      <text class="back-btn" @click="goBack">返回</text>
      <text class="page-title">账号登录</text>
    </view>

    <view class="form-area">
      <view class="input-group">
        <text class="label">用户名</text>
        <input 
          class="input-field" 
          type="text" 
          placeholder="请输入用户名 (<=20字符，无空格)" 
          v-model="username"
          @input="validateUsername"
        />
        <text v-if="usernameError" class="error-tip">{{ usernameError }}</text>
      </view>

      <view class="input-group">
        <text class="label">密码</text>
        <input 
          class="input-field" 
          type="password" 
          placeholder="请输入密码 (6-20位)" 
          v-model="password"
          @input="validatePassword"
        />
        <text v-if="passwordError" class="error-tip">{{ passwordError }}</text>
      </view>

      <button 
        class="login-btn" 
        :style="{backgroundColor: primaryColor}"
        :disabled="!isFormValid"
        @click="handleLogin"
      >
        登 录
      </button>
    </view>

    <view class="footer-link">
      <text class="text">没有账户？</text>
      <text class="register-link" :style="{color: primaryColor}" @click="goToRegister">点击注册</text>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      primaryColor: '#00CC99',
      username: '',
      password: '',
      usernameError: '',
      passwordError: '',
    };
  },
  computed: {
    // 判断表单是否合法，启用登录按钮
    isFormValid() {
      return this.username.length > 0 && this.password.length > 0 && !this.usernameError && !this.passwordError;
    }
  },
  methods: {
    // 返回到程序开始页
    goBack() {
      uni.navigateBack({
        delta: 1 // 返回上一页
      }).catch(() => {
        // 如果当前是第一页，则直接重定向到 index
        uni.redirectTo({
          url: '/pages/index/index'
        });
      });
    },
    // 跳转到注册页
    goToRegister() {
      uni.navigateTo({
        url: '/pages/register/register'
      });
    },
    
    // --- 前端校验逻辑 ---
    validateUsername() {
      this.usernameError = '';
      if (this.username.includes(' ')) {
        this.usernameError = '用户名不能包含空格';
      } else if (this.username.length > 20) {
        this.usernameError = '用户名长度不能超过20';
      }
    },
    validatePassword() {
      this.passwordError = '';
      if (this.password.length < 6 || this.password.length > 20) {
        this.passwordError = '密码长度必须在6-20位之间';
      }
    },

    // --- 登录处理 ---
    handleLogin() {
      // 最终校验（防止绕过@input校验）
      this.validateUsername();
      this.validatePassword();

      if (!this.isFormValid) {
        uni.showToast({
          title: '请检查输入项',
          icon: 'none',
          duration: 2000
        });
        return;
      }

      // ** 模拟接口调用 **
      // 模拟调用：/api/login
      // 接口参数：{ username: this.username, password: this.password }
      /*
      uni.request({
        url: '/api/login', // 替换为您的实际接口地址
        method: 'POST',
        data: {
          username: this.username,
          password: this.password
        },
        success: (res) => {
          if (res.data.code === 0) { // 假设 code=0 为成功
            uni.showToast({ title: '登录成功', icon: 'success' });
            uni.redirectTo({ url: 'home' }); // 跳转到程序首页
          } else {
            uni.showModal({
              title: '登录失败',
              content: res.data.message || '用户名或密码错误',
              showCancel: false
            });
            this.passwordError = '用户名或密码错误';
            this.password = ''; // 清空密码
          }
        },
        fail: () => {
          uni.showModal({
            title: '登录失败',
            content: '网络错误，请稍后再试',
            showCancel: false
          });
        }
      });
      */
      
      // ** 前端逻辑判断 (临时) **
      // 约定: 假设测试账号 'admin' 和密码 '123456' 登录成功
      if (this.username === 'admin' && this.password === '123456') {
        uni.showToast({ title: '登录成功', icon: 'success' });
        // ** 跳转到程序首页 (这里假设首页为 home.vue) **
        uni.switchTab({
          url: '/pages/home/home' 
        });
      } else {
        uni.showModal({
          title: '登录失败',
          content: '用户名或密码错误',
          showCancel: false
        });
        this.passwordError = '用户名或密码错误';
        this.password = ''; // 清空密码
      }
    }
  }
}
</script>

<style scoped>
.container {
  padding: 40rpx;
  background-color: #ffffff;
  min-height: 100vh;
}

/* --- 头部和返回按钮 --- */
.header {
  display: flex;
  align-items: center;
  position: relative;
  margin-bottom: 80rpx;
}

.back-btn {
  position: absolute;
  left: 0;
  color: #666;
  font-size: 32rpx;
}

.page-title {
  flex: 1;
  text-align: center;
  font-size: 40rpx;
  font-weight: bold;
  color: #333;
}

/* --- 表单区域 --- */
.form-area {
  margin-top: 100rpx;
}

.input-group {
  margin-bottom: 40rpx;
}

.label {
  display: block;
  font-size: 30rpx;
  color: #333;
  margin-bottom: 10rpx;
}

.input-field {
  width: 100%;
  height: 90rpx;
  padding: 0 20rpx;
  border: 1rpx solid #e0e0e0;
  border-radius: 15rpx;
  font-size: 32rpx;
  background-color: #f9f9f9;
}

.error-tip {
  display: block;
  color: #ff4d4f; /* 红色错误提示 */
  font-size: 24rpx;
  margin-top: 5rpx;
}

.login-btn {
  width: 100%;
  height: 100rpx;
  line-height: 100rpx;
  font-size: 36rpx;
  color: #ffffff;
  border-radius: 50rpx;
  margin-top: 60rpx;
  box-shadow: 0 5rpx 15rpx rgba(0, 204, 153, 0.4);
}

.login-btn[disabled] {
  opacity: 0.6;
}

/* --- 底部链接 --- */
.footer-link {
  text-align: center;
  margin-top: 50rpx;
  font-size: 28rpx;
}

.text {
  color: #999;
  margin-right: 10rpx;
}

.register-link {
  font-weight: bold;
}
</style>