"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      primaryColor: "#00CC99",
      searchKeyword: "",
      // 日期相关数据
      rangeValues: [],
      // 绑定给 picker 的数组，例如 ['2023-01-01', '2023-01-02']
      startDate: null,
      // 发送给后端的开始日期
      endDate: null,
      // 发送给后端的结束日期
      // 模拟用户动态数据
      posts: [
        { id: 1, title: "春天种的植物发芽了", rating: 4.8, date: "2025-12-09", images: ["/static/img1.jpg"], tags: ["植物", "生活", "记录"] },
        { id: 3, title: "空悲切", rating: 3.9, date: "2023-04-09", images: [""], tags: ["心情", "随笔"] }
      ]
    };
  },
  computed: {
    // 动态显示选择的日期范围文字
    dateRangeText() {
      if (this.rangeValues && this.rangeValues.length === 2) {
        return `${this.rangeValues[0]} 至 ${this.rangeValues[1]}`;
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
    // 日期选择器回调
    onDateChange(e) {
      common_vendor.index.__f__("log", "at pages/profile/settings/userPosts.vue:112", "选择的日期:", e);
      if (e && e.length > 0) {
        this.rangeValues = e;
        this.startDate = e[0];
        this.endDate = e[1];
      } else {
        this.rangeValues = [];
        this.startDate = null;
        this.endDate = null;
      }
    },
    // 获取用户帖子列表
    fetchUserPosts() {
      common_vendor.index.__f__("log", "at pages/profile/settings/userPosts.vue:130", "检索条件:", {
        keyword: this.searchKeyword,
        start: this.startDate,
        end: this.endDate
      });
      common_vendor.index.showToast({ title: "检索中...", icon: "none" });
    },
    goToDetail(postId) {
      common_vendor.index.navigateTo({
        url: `/pages/home/postDetail?id=${postId}&edit=true`
      });
    },
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
  const _easycom_uni_datetime_picker2 = common_vendor.resolveComponent("uni-datetime-picker");
  (_easycom_back_icon2 + _easycom_uni_datetime_picker2)();
}
const _easycom_back_icon = () => "../../../components/back-icon/back-icon.js";
const _easycom_uni_datetime_picker = () => "../../../node-modules/@dcloudio/uni-ui/lib/uni-datetime-picker/uni-datetime-picker.js";
if (!Math) {
  (_easycom_back_icon + _easycom_uni_datetime_picker)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o($options.goBack),
    b: common_vendor.p({
      ["icon-size"]: "50"
    }),
    c: $data.primaryColor,
    d: common_vendor.o((...args) => $options.fetchUserPosts && $options.fetchUserPosts(...args)),
    e: $data.searchKeyword,
    f: common_vendor.o(($event) => $data.searchKeyword = $event.detail.value),
    g: common_vendor.t($options.dateRangeText),
    h: common_vendor.o($options.onDateChange),
    i: common_vendor.o(($event) => $data.rangeValues = $event),
    j: common_vendor.p({
      type: "daterange",
      border: false,
      ["clear-icon"]: false,
      modelValue: $data.rangeValues
    }),
    k: $data.primaryColor,
    l: common_vendor.o((...args) => $options.fetchUserPosts && $options.fetchUserPosts(...args)),
    m: $data.posts.length === 0
  }, $data.posts.length === 0 ? {} : {}, {
    n: common_vendor.f($data.posts, (post, k0, i0) => {
      return common_vendor.e({
        a: common_vendor.t(post.title),
        b: common_vendor.t(post.rating.toFixed(1)),
        c: common_vendor.f(post.tags, (tag, index, i1) => {
          return {
            a: common_vendor.t(tag),
            b: index
          };
        }),
        d: common_vendor.o(($event) => $options.goToDetail(post.id), post.id),
        e: common_vendor.o(($event) => $options.confirmDelete(post), post.id),
        f: post.images.length > 0
      }, post.images.length > 0 ? {
        g: common_vendor.t(post.date)
      } : {
        h: common_vendor.t(post.date)
      }, {
        i: common_vendor.o(($event) => $options.goToDetail(post.id), post.id),
        j: post.id
      });
    }),
    o: common_vendor.s(_ctx.__cssVars())
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-0aa305fc"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/profile/settings/userPosts.js.map
