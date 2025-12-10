"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      primaryColor: "#00CC99",
      username: "",
      password: "",
      usernameError: "",
      passwordError: ""
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
      common_vendor.index.navigateBack({
        delta: 1
        // 返回上一页
      }).catch(() => {
        common_vendor.index.redirectTo({
          url: "/pages/index/index"
        });
      });
    },
    // 跳转到注册页
    goToRegister() {
      common_vendor.index.navigateTo({
        url: "/pages/register/register"
      });
    },
    // --- 前端校验逻辑 ---
    validateUsername() {
      this.usernameError = "";
      if (this.username.includes(" ")) {
        this.usernameError = "用户名不能包含空格";
      } else if (this.username.length > 20) {
        this.usernameError = "用户名长度不能超过20";
      }
    },
    validatePassword() {
      this.passwordError = "";
      if (this.password.length < 6 || this.password.length > 20) {
        this.passwordError = "密码长度必须在6-20位之间";
      }
    },
    // --- 登录处理 ---
    handleLogin() {
      this.validateUsername();
      this.validatePassword();
      if (!this.isFormValid) {
        common_vendor.index.showToast({
          title: "请检查输入项",
          icon: "none",
          duration: 2e3
        });
        return;
      }
      if (this.username === "admin" && this.password === "123456") {
        common_vendor.index.showToast({ title: "登录成功", icon: "success" });
        common_vendor.index.switchTab({
          url: "/pages/home/home"
        });
      } else {
        common_vendor.index.showModal({
          title: "登录失败",
          content: "用户名或密码错误",
          showCancel: false
        });
        this.passwordError = "用户名或密码错误";
        this.password = "";
      }
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o((...args) => $options.goBack && $options.goBack(...args)),
    b: common_vendor.o([($event) => $data.username = $event.detail.value, (...args) => $options.validateUsername && $options.validateUsername(...args)]),
    c: $data.username,
    d: $data.usernameError
  }, $data.usernameError ? {
    e: common_vendor.t($data.usernameError)
  } : {}, {
    f: common_vendor.o([($event) => $data.password = $event.detail.value, (...args) => $options.validatePassword && $options.validatePassword(...args)]),
    g: $data.password,
    h: $data.passwordError
  }, $data.passwordError ? {
    i: common_vendor.t($data.passwordError)
  } : {}, {
    j: $data.primaryColor,
    k: !$options.isFormValid,
    l: common_vendor.o((...args) => $options.handleLogin && $options.handleLogin(...args)),
    m: $data.primaryColor,
    n: common_vendor.o((...args) => $options.goToRegister && $options.goToRegister(...args))
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-e4e4508d"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/login/login.js.map
