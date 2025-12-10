"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      primaryColor: "#00CC99",
      // 模拟好友请求数据
      requests: [
        { id: 301, userId: 201, nickname: "测试用户", avatar: "/static/avatar4.jpg", message: "Hi，很高兴认识你！", status: "pending" },
        { id: 302, userId: 202, nickname: "老朋友B", avatar: "/static/avatar5.jpg", message: "我是B，以前的同学", status: "pending" },
        { id: 303, userId: 203, nickname: "已处理C", avatar: "/static/avatar6.jpg", message: "请求已过期", status: "accepted" }
      ]
    };
  },
  onLoad() {
    this.fetchRequests();
  },
  methods: {
    goBack() {
      common_vendor.index.navigateBack();
    },
    // 模拟获取好友请求
    fetchRequests() {
    },
    // 确认接受好友请求
    confirmAccept(request) {
      common_vendor.index.showModal({
        title: "确认添加",
        content: `确认添加 ${request.nickname} 为你的好友吗？`,
        confirmText: "确认",
        success: (res) => {
          if (res.confirm) {
            this.handleAccept(request);
          }
        }
      });
    },
    // 处理接受请求
    handleAccept(request) {
      common_vendor.index.showToast({ title: `已添加 ${request.nickname}`, icon: "success" });
      request.status = "accepted";
    }
  }
};
const __injectCSSVars__ = () => {
  common_vendor.useCssVars((_ctx) => ({
    "3fc30417": _ctx.primaryColor
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
    c: common_vendor.t($data.requests.length),
    d: $data.primaryColor,
    e: $data.requests.length === 0
  }, $data.requests.length === 0 ? {} : {}, {
    f: common_vendor.f($data.requests, (request, k0, i0) => {
      return common_vendor.e({
        a: request.avatar,
        b: common_vendor.t(request.nickname),
        c: common_vendor.t(request.message || "请求添加你为好友"),
        d: request.status === "pending"
      }, request.status === "pending" ? {
        e: $data.primaryColor,
        f: common_vendor.o(($event) => $options.confirmAccept(request), request.id)
      } : {}, {
        g: request.id
      });
    }),
    g: common_vendor.s(_ctx.__cssVars())
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-b59a1e0a"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/message/friends/friendRequests.js.map
