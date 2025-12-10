"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      primaryColor: "#00CC99",
      searchKeyword: "",
      searchStatus: "idle",
      // 'idle', 'searching', 'empty', 'found'
      searchedUser: null
      // 搜索到的用户对象
    };
  },
  methods: {
    goBack() {
      common_vendor.index.navigateBack();
    },
    getButtonText(user) {
      if (user.isFriend)
        return "已是好友";
      if (user.hasSentRequest)
        return "已发送请求";
      return "添加好友";
    },
    // 搜索用户
    searchUser() {
      const keyword = this.searchKeyword.trim();
      if (!keyword) {
        common_vendor.index.showToast({ title: "请输入搜索关键词", icon: "none" });
        return;
      }
      this.searchStatus = "searching";
      this.searchedUser = null;
      setTimeout(() => {
        if (keyword === "test") {
          this.searchedUser = {
            id: 201,
            username: "tester",
            nickname: "测试用户",
            avatar: "/static/avatar4.jpg",
            isFriend: false,
            hasSentRequest: false
          };
          this.searchStatus = "found";
        } else {
          this.searchedUser = null;
          this.searchStatus = "empty";
        }
      }, 500);
    },
    // 发送好友请求
    sendRequest(user) {
      common_vendor.index.showModal({
        title: "添加好友",
        content: `确定要向 ${user.nickname} 发送好友请求吗？`,
        confirmText: "发送",
        success: (res) => {
          if (res.confirm) {
            common_vendor.index.showToast({ title: "请求已发送", icon: "success" });
            user.hasSentRequest = true;
          }
        }
      });
    }
  }
};
const __injectCSSVars__ = () => {
  common_vendor.useCssVars((_ctx) => ({
    "ff637402": _ctx.primaryColor
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
  return common_vendor.e({
    a: common_vendor.o($options.goBack),
    b: common_vendor.p({
      ["icon-size"]: "50"
    }),
    c: $data.primaryColor,
    d: common_vendor.o((...args) => $options.searchUser && $options.searchUser(...args)),
    e: $data.searchKeyword,
    f: common_vendor.o(($event) => $data.searchKeyword = $event.detail.value),
    g: $data.primaryColor,
    h: common_vendor.o((...args) => $options.searchUser && $options.searchUser(...args)),
    i: $data.searchStatus === "searching"
  }, $data.searchStatus === "searching" ? {} : $data.searchStatus === "empty" ? {
    k: common_vendor.t($data.searchKeyword)
  } : {}, {
    j: $data.searchStatus === "empty",
    l: $data.searchedUser
  }, $data.searchedUser ? {
    m: $data.searchedUser.avatar,
    n: common_vendor.t($data.searchedUser.nickname),
    o: common_vendor.t($data.searchedUser.username),
    p: common_vendor.t($options.getButtonText($data.searchedUser)),
    q: $data.primaryColor,
    r: common_vendor.o(($event) => $options.sendRequest($data.searchedUser)),
    s: $data.searchedUser.isFriend || $data.searchedUser.hasSentRequest
  } : {}, {
    t: common_vendor.s(_ctx.__cssVars())
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-dc2a5c7c"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/message/friends/addFriend.js.map
