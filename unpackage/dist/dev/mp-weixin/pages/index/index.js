"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  data() {
    return {
      primaryColor: "#00CC99",
      // 主题绿色
      accentColor: "#FFD700"
      // 主题黄色
    };
  },
  methods: {
    // 跳转到登录页
    goToLogin() {
      common_vendor.index.navigateTo({
        url: "/pages/login/login"
      });
    },
    // 跳转到注册页
    goToRegister() {
      common_vendor.index.navigateTo({
        url: "/pages/register/register"
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_assets._imports_0,
    b: $data.primaryColor,
    c: $data.primaryColor,
    d: common_vendor.o((...args) => $options.goToLogin && $options.goToLogin(...args)),
    e: $data.primaryColor,
    f: $data.primaryColor,
    g: common_vendor.o((...args) => $options.goToRegister && $options.goToRegister(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
