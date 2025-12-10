"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      primaryColor: "#00CC99",
      searchKeyword: "",
      startDate: null,
      endDate: null,
      showDatePicker: false,
      // 模拟用户动态数据
      posts: [
        { id: 1, title: "空悲切", rating: 4.8, date: "2023-12-09", images: ["/static/img1.jpg"] },
        { id: 2, title: "今日份美食分享", rating: 4.5, date: "2025-12-08", images: ["/static/food1.jpg"] },
        { id: 3, title: "关于uni-app的一些心得", rating: 3.9, date: "2025-12-07", images: [] }
      ]
    };
  },
  computed: {
    dateRangeText() {
      if (this.startDate && this.endDate) {
        return `${this.startDate} 至 ${this.endDate}`;
      }
      return "选择日期范围";
    }
  },
  onLoad() {
    this.fetchUserPosts();
  },
  methods: {
    goBack() {
      common_vendor.index.navigateBack();
    },
    // 模拟日期选择器确认 (需要实际组件支持)
    handleDateConfirm(e) {
      this.startDate = e.range[0];
      this.endDate = e.range[1];
      this.showDatePicker = false;
    },
    // 模拟获取用户帖子列表
    fetchUserPosts() {
      common_vendor.index.showToast({ title: "开始检索/筛选", icon: "none" });
    },
    // 跳转到帖子详情/修改页
    goToDetail(postId) {
      common_vendor.index.navigateTo({
        url: `postDetail?id=${postId}&edit=true`
      });
    },
    // 二次确认删除
    confirmDelete(post) {
      common_vendor.index.showModal({
        title: "删除确认",
        content: `你确定要删除帖子《${post.title}》吗？`,
        confirmText: "确认删除",
        confirmColor: "#FF3B30",
        success: (res) => {
          if (res.confirm) {
            this.deletePost(post);
          }
        }
      });
    },
    // 执行删除操作
    deletePost(post) {
      common_vendor.index.showToast({ title: "删除成功", icon: "success" });
      this.posts = this.posts.filter((p) => p.id !== post.id);
    }
  }
};
const __injectCSSVars__ = () => {
  common_vendor.useCssVars((_ctx) => ({
    "5ace2ddc": _ctx.primaryColor
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
      iconSize: "50"
    }),
    c: $data.primaryColor,
    d: common_vendor.o((...args) => $options.fetchUserPosts && $options.fetchUserPosts(...args)),
    e: $data.searchKeyword,
    f: common_vendor.o(($event) => $data.searchKeyword = $event.detail.value),
    g: common_vendor.t($options.dateRangeText),
    h: common_vendor.o(($event) => $data.showDatePicker = true),
    i: $data.primaryColor,
    j: common_vendor.o((...args) => $options.fetchUserPosts && $options.fetchUserPosts(...args)),
    k: $data.posts.length === 0
  }, $data.posts.length === 0 ? {} : {}, {
    l: common_vendor.f($data.posts, (post, k0, i0) => {
      return common_vendor.e({
        a: common_vendor.t(post.title),
        b: common_vendor.t(post.rating.toFixed(1)),
        c: common_vendor.o(($event) => $options.goToDetail(post.id), post.id),
        d: common_vendor.o(($event) => $options.confirmDelete(post), post.id),
        e: post.images.length > 0
      }, post.images.length > 0 ? {
        f: common_vendor.t(post.date)
      } : {
        g: common_vendor.t(post.date)
      }, {
        h: common_vendor.o(($event) => $options.goToDetail(post.id), post.id),
        i: post.id
      });
    }),
    m: common_vendor.s(_ctx.__cssVars())
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-0aa305fc"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/profile/settings/userPosts.js.map
