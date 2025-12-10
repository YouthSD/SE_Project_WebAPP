<template>
  <view class="container">
    <view class="header">
      <text class="back-btn" @click="goBack">返回</text>
      <text class="page-title">用户注册</text>
    </view>

    <view class="form-area">
      <view class="input-group">
        <text class="label">用户名</text>
        <input 
          class="input-field" 
          type="text" 
          placeholder="请输入用户名 (<=20字符，无空格，唯一)" 
          v-model="username"
          @input="validateUsername"
        />
        <text v-if="usernameError" class="error-tip">{{ usernameError }}</text>
      </view>

      <view class="input-group">
        <text class="label">昵称</text>
        <input 
          class="input-field" 
          type="text" 
          placeholder="请输入昵称" 
          v-model="nickname"
          @input="validateNickname"
        />
        <text v-if="nicknameError" class="error-tip">{{ nicknameError }}</text>
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
        <view class="password-status">
          <text v-if="passwordError" class="error-tip">{{ passwordError }}</text>
          <text :style="{color: strengthColor}" class="strength-tip">强度: {{ passwordStrength }}</text>
        </view>
      </view>

      <view class="input-group">
        <text class="label">确认密码</text>
        <input 
          class="input-field" 
          type="password" 
          placeholder="请再次输入密码" 
          v-model="confirmPassword"
          @input="validateConfirmPassword"
        />
        <text v-if="confirmPasswordError" class="error-tip">{{ confirmPasswordError }}</text>
      </view>

      <button 
        class="register-btn" 
        :style="{backgroundColor: primaryColor}"
        :disabled="!isFormValid"
        @click="handleRegister"
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
      primaryColor: '#00CC99',
      username: '',
      nickname: '',
      password: '',
      confirmPassword: '',
      usernameError: '',
      nicknameError: '',
      passwordError: '',
      confirmPasswordError: '',
    };
  },
  computed: {
    // 计算密码强度分数
    passwordScore() {
      let score = 0;
      const pwd = this.password;
      
      if (pwd.length >= 8) score += 1;
      if (/[a-z]/.test(pwd)) score += 1; // 包含小写字母
      if (/[A-Z]/.test(pwd)) score += 1; // 包含大写字母
      if (/\d/.test(pwd)) score += 1; // 包含数字
      if (/[^A-Za-z0-9]/.test(pwd)) score += 1; // 包含特殊字符
      
      return score;
    },
    // 根据分数显示密码强度文字
    passwordStrength() {
      const score = this.passwordScore;
      if (score <= 2) return '弱';
      if (score <= 4) return '中等';
      return '强';
    },
    // 根据强度显示颜色
    strengthColor() {
      const score = this.passwordScore;
      if (score <= 2) return '#ff4d4f'; // 红色
      if (score <= 4) return '#ff9900'; // 橙色
      return '#00CC99'; // 绿色
    },
    // 判断表单是否合法，启用注册按钮
    isFormValid() {
      return (
        this.username.length > 0 &&
        this.nickname.length > 0 &&
        this.password.length > 0 &&
        this.confirmPassword.length > 0 &&
        !this.usernameError &&
        !this.nicknameError &&
        !this.passwordError &&
        !this.confirmPasswordError
      );
    }
  },
  methods: {
    // 返回到程序开始页
    goBack() {
      uni.navigateBack({
        delta: 1
      }).catch(() => {
        uni.redirectTo({
          url: '/pages/index/index'
        });
      });
    },

    // --- 前端校验逻辑 ---
    validateUsername() {
      this.usernameError = '';
      const val = this.username.trim();
      this.username = val; // 移除首尾空格，但内部空格仍会触发错误
      if (val.includes(' ')) {
        this.usernameError = '用户名不能包含空格';
      } else if (val.length === 0) {
        this.usernameError = '用户名不能为空';
      } else if (val.length > 20) {
        this.usernameError = '用户名长度不能超过20';
      }
    },
    validateNickname() {
      this.nicknameError = '';
      if (this.nickname.length === 0) {
         this.nicknameError = '昵称不能为空';
      }
      // 可以根据需要添加其他昵称校验，例如长度限制
    },
    validatePassword() {
      this.passwordError = '';
      if (this.password.length < 6 || this.password.length > 20) {
        this.passwordError = '密码长度必须在6-20位之间';
      }
      this.validateConfirmPassword(); // 密码变化时同时校验确认密码
    },
    validateConfirmPassword() {
      this.confirmPasswordError = '';
      if (this.confirmPassword.length === 0) {
        // 不做提示，以免干扰
      } else if (this.confirmPassword !== this.password) {
        this.confirmPasswordError = '两次密码不一致';
      }
    },

    // 清空并提示错误
    showError(inputName, msg) {
      this[`${inputName}Error`] = msg;
      this[inputName] = '';
      uni.showModal({
        title: '注册错误',
        content: msg,
        showCancel: false
      });
    },

    // --- 注册处理 ---
    handleRegister() {
      // 最终校验
      this.validateUsername();
      this.validateNickname();
      this.validatePassword();
      this.validateConfirmPassword();

      if (!this.isFormValid) {
        uni.showToast({
          title: '请检查输入项',
          icon: 'none',
          duration: 2000
        });
        return;
      }

      // ** 模拟接口调用 **
      // 模拟调用：/api/register
      // 接口参数：{ username: this.username, nickname: this.nickname, password: this.password }
      /*
      uni.request({
        url: '/api/register', // 替换为您的实际接口地址
        method: 'POST',
        data: {
          username: this.username,
          nickname: this.nickname,
          password: this.password
        },
        success: (res) => {
          if (res.data.code === 0) { // 假设 code=0 为成功
            uni.showToast({ title: '注册成功', icon: 'success' });
            uni.redirectTo({ url: 'home' }); // 跳转到程序首页
          } else {
            // 如果接口返回用户名已被占用等错误
            uni.showModal({
              title: '注册失败',
              content: res.data.message || '注册失败，请稍后再试',
              showCancel: false
            });
            // 假设后端返回具体错误信息，例如:
            // if (res.data.field === 'username') this.showError('username', res.data.message);
          }
        },
        fail: () => {
          uni.showModal({
            title: '注册失败',
            content: '网络错误，请稍后再试',
            showCancel: false
          });
        }
      });
      */
      
      // ** 前端逻辑判断 (临时) **
      uni.showToast({ title: '注册成功', icon: 'success' });
      // ** 跳转到程序首页 (这里假设首页为 home.vue) **
      uni.switchTab({
        url: '/pages/home/home' 
      });
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
  margin-top: 50rpx;
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

.password-status {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 5rpx;
}

.error-tip {
  color: #ff4d4f; /* 红色错误提示 */
  font-size: 24rpx;
}

.strength-tip {
  font-size: 24rpx;
  font-weight: bold;
}

.register-btn {
  width: 100%;
  height: 100rpx;
  line-height: 100rpx;
  font-size: 36rpx;
  color: #ffffff;
  border-radius: 50rpx;
  margin-top: 60rpx;
  box-shadow: 0 5rpx 15rpx rgba(0, 204, 153, 0.4);
}

.register-btn[disabled] {
  opacity: 0.6;
}
</style>