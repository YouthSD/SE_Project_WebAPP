"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      primaryColor: "#00CC99"
    };
  },
  methods: {
    goBack() {
      common_vendor.index.navigateBack();
    },
    goToPage(pageName) {
      const url = pageName.startsWith("/") ? pageName : `/pages/profile/settings/${pageName}`;
      common_vendor.index.navigateTo({ url });
    },
    // 注销账号逻辑
    handleLogout() {
      common_vendor.index.showModal({
        title: "警告",
        content: "注销账号将清除您的本地数据，确定要继续吗？",
        confirmText: "确定注销",
        confirmColor: "#FF3B30",
        success: (res) => {
          if (res.confirm) {
            common_vendor.index.showToast({ title: "注销成功", icon: "success" });
            this.goBack();
          }
        }
      });
    },
    // 切换账号逻辑
    handleSwitchAccount() {
      common_vendor.index.showModal({
        title: "切换账号",
        content: "确定要切换账号吗？您将被导向登录页。",
        success: (res) => {
          if (res.confirm) {
            common_vendor.index.showToast({ title: "准备切换", icon: "none" });
            this.goBack();
          }
        }
      });
    }
  }
};
const __injectCSSVars__ = () => {
  common_vendor.useCssVars((_ctx) => ({
    "615f6000": _ctx.primaryColor
  }));
};
const __setup__ = _sfc_main.setup;
_sfc_main.setup = __setup__ ? (props, ctx) => {
  __injectCSSVars__();
  return __setup__(props, ctx);
} : __injectCSSVars__;
if (!Array) {
  const _easycom_back_icon2 = common_vendor.resolveComponent("back-icon");
  _easycom_back_icon2();
}
const _easycom_back_icon = () => "../../../components/back-icon/back-icon.js";
if (!Math) {
  _easycom_back_icon();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o($options.goBack),
    b: common_vendor.p({
      ["icon-size"]: "50"
    }),
    c: $data.primaryColor,
    d: common_vendor.o(($event) => $options.goToPage("profileSettings")),
    e: common_vendor.o((...args) => $options.handleLogout && $options.handleLogout(...args)),
    f: common_vendor.o((...args) => $options.handleSwitchAccount && $options.handleSwitchAccount(...args)),
    g: common_vendor.s(_ctx.__cssVars())
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-dc2f9b9f"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/profile/settings/settings.js.map
