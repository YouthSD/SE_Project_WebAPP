"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      primaryColor: "#00CC99",
      comments: [
        { id: 1, postId: 101, postTitle: "春天种的植物发芽了", content: "写得太好了！照片也很漂亮！", date: "2025-12-09 10:30" },
        { id: 3, postId: 103, postTitle: "关于uni-app的一些心得", content: "学到了，感谢分享！", date: "2025-12-07 09:00" }
      ]
    };
  },
  onLoad() {
    this.fetchUserComments();
  },
  methods: {
    goBack() {
      common_vendor.index.navigateBack();
    },
    fetchUserComments() {
    },
    goToPost(postId) {
      common_vendor.index.navigateTo({ url: `/pages/home/postDetail?id=${postId}` });
    },
    confirmDelete(comment) {
      common_vendor.index.showModal({
        title: "删除确认",
        content: "你确定要删除这条评论吗？",
        confirmText: "确认删除",
        confirmColor: "#FF3B30",
        success: (res) => {
          if (res.confirm)
            this.deleteComment(comment);
        }
      });
    },
    deleteComment(comment) {
      common_vendor.index.showToast({ title: "评论删除成功", icon: "success" });
      this.comments = this.comments.filter((c) => c.id !== comment.id);
    }
  }
};
const __injectCSSVars__ = () => {
  common_vendor.useCssVars((_ctx) => ({
    "2ea2e108": _ctx.primaryColor
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
    d: $data.comments.length === 0
  }, $data.comments.length === 0 ? {} : {}, {
    e: common_vendor.f($data.comments, (comment, k0, i0) => {
      return {
        a: common_vendor.t(comment.postTitle),
        b: common_vendor.t(comment.date),
        c: common_vendor.t(comment.content),
        d: common_vendor.o(($event) => $options.goToPost(comment.postId), comment.id),
        e: common_vendor.o(($event) => $options.confirmDelete(comment), comment.id),
        f: comment.id
      };
    }),
    f: common_vendor.s(_ctx.__cssVars())
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-729a9704"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/profile/settings/userComments.js.map
