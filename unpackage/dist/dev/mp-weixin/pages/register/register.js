"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      primaryColor: "#00CC99",
      username: "",
      nickname: "",
      password: "",
      confirmPassword: "",
      usernameError: "",
      nicknameError: "",
      passwordError: "",
      confirmPasswordError: ""
    };
  },
  computed: {
    // 计算密码强度分数
    passwordScore() {
      let score = 0;
      const pwd = this.password;
      if (pwd.length >= 8)
        score += 1;
      if (/[a-z]/.test(pwd))
        score += 1;
      if (/[A-Z]/.test(pwd))
        score += 1;
      if (/\d/.test(pwd))
        score += 1;
      if (/[^A-Za-z0-9]/.test(pwd))
        score += 1;
      return score;
    },
    // 根据分数显示密码强度文字
    passwordStrength() {
      const score = this.passwordScore;
      if (score <= 2)
        return "弱";
      if (score <= 4)
        return "中等";
      return "强";
    },
    // 根据强度显示颜色
    strengthColor() {
      const score = this.passwordScore;
      if (score <= 2)
        return "#ff4d4f";
      if (score <= 4)
        return "#ff9900";
      return "#00CC99";
    },
    // 判断表单是否合法，启用注册按钮
    isFormValid() {
      return this.username.length > 0 && this.nickname.length > 0 && this.password.length > 0 && this.confirmPassword.length > 0 && !this.usernameError && !this.nicknameError && !this.passwordError && !this.confirmPasswordError;
    }
  },
  methods: {
    // 返回到程序开始页
    goBack() {
      common_vendor.index.navigateBack({
        delta: 1
      }).catch(() => {
        common_vendor.index.redirectTo({
          url: "/pages/index/index"
        });
      });
    },
    // --- 前端校验逻辑 ---
    validateUsername() {
      this.usernameError = "";
      const val = this.username.trim();
      this.username = val;
      if (val.includes(" ")) {
        this.usernameError = "用户名不能包含空格";
      } else if (val.length === 0) {
        this.usernameError = "用户名不能为空";
      } else if (val.length > 20) {
        this.usernameError = "用户名长度不能超过20";
      }
    },
    validateNickname() {
      this.nicknameError = "";
      if (this.nickname.length === 0) {
        this.nicknameError = "昵称不能为空";
      }
    },
    validatePassword() {
      this.passwordError = "";
      if (this.password.length < 6 || this.password.length > 20) {
        this.passwordError = "密码长度必须在6-20位之间";
      }
      this.validateConfirmPassword();
    },
    validateConfirmPassword() {
      this.confirmPasswordError = "";
      if (this.confirmPassword.length === 0)
        ;
      else if (this.confirmPassword !== this.password) {
        this.confirmPasswordError = "两次密码不一致";
      }
    },
    // 清空并提示错误
    showError(inputName, msg) {
      this[`${inputName}Error`] = msg;
      this[inputName] = "";
      common_vendor.index.showModal({
        title: "注册错误",
        content: msg,
        showCancel: false
      });
    },
    // --- 注册处理 ---
    handleRegister() {
      this.validateUsername();
      this.validateNickname();
      this.validatePassword();
      this.validateConfirmPassword();
      if (!this.isFormValid) {
        common_vendor.index.showToast({
          title: "请检查输入项",
          icon: "none",
          duration: 2e3
        });
        return;
      }
      common_vendor.index.showToast({ title: "注册成功", icon: "success" });
      common_vendor.index.switchTab({
        url: "/pages/home/home"
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o([($event) => $data.username = $event.detail.value, (...args) => $options.validateUsername && $options.validateUsername(...args)]),
    b: $data.username,
    c: $data.usernameError
  }, $data.usernameError ? {
    d: common_vendor.t($data.usernameError)
  } : {}, {
    e: common_vendor.o([($event) => $data.nickname = $event.detail.value, (...args) => $options.validateNickname && $options.validateNickname(...args)]),
    f: $data.nickname,
    g: $data.nicknameError
  }, $data.nicknameError ? {
    h: common_vendor.t($data.nicknameError)
  } : {}, {
    i: common_vendor.o([($event) => $data.password = $event.detail.value, (...args) => $options.validatePassword && $options.validatePassword(...args)]),
    j: $data.password,
    k: $data.passwordError
  }, $data.passwordError ? {
    l: common_vendor.t($data.passwordError)
  } : {}, {
    m: common_vendor.t($options.passwordStrength),
    n: $options.strengthColor,
    o: common_vendor.o([($event) => $data.confirmPassword = $event.detail.value, (...args) => $options.validateConfirmPassword && $options.validateConfirmPassword(...args)]),
    p: $data.confirmPassword,
    q: $data.confirmPasswordError
  }, $data.confirmPasswordError ? {
    r: common_vendor.t($data.confirmPasswordError)
  } : {}, {
    s: $data.primaryColor,
    t: !$options.isFormValid,
    v: common_vendor.o((...args) => $options.handleRegister && $options.handleRegister(...args))
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-bac4a35d"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/register/register.js.map
