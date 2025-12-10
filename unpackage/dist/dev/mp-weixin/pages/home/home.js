"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      primaryColor: "#00CC99",
      // 主题绿色
      accentColor: "#FFD700",
      // 主题黄色
      currentPage: "home",
      // 当前页面标识，用于底部导航高亮
      todayDate: (/* @__PURE__ */ new Date()).toLocaleDateString(),
      // 显示当前日期
      // 模拟帖子数据
      posts: [
        {
          id: 1,
          title: "春天种的植物发芽了",
          content: "...",
          rating: 4.8,
          tags: ["植物", "园艺", "生活"],
          images: ["/static/img1.jpg", "/static/img2.jpg", "/static/img3.jpg", "/static/img4.jpg"],
          type: "image"
        },
        { id: 2, title: "今日份美食分享", content: "...", rating: 4.5, tags: ["美食", "烹饪"], images: ["/static/food1.jpg"], type: "image" },
        { id: 3, title: "关于uni-app的一些心得", content: "...", rating: 3.9, tags: ["技术", "编程"], images: [], type: "text" },
        { id: 4, title: "户外徒步Vlog", content: "...", rating: 4.2, tags: ["户外", "Vlog"], images: ["/static/video_cover.jpg"], type: "video" }
      ],
      tabs: []
    };
  },
  onLoad() {
    this.fetchDailyPosts();
  },
  methods: {
    // 模拟获取当天发布的帖子列表
    fetchDailyPosts() {
    },
    // 跳转到帖子详情页
    goToDetail(postId) {
      common_vendor.index.navigateTo({
        url: `postDetail?id=${postId}`
      });
    },
    // 底部导航切换
    switchTab(path) {
      if (path === this.currentPage)
        return;
      if (path === "home") {
        common_vendor.index.switchTab({ url: `/${path}` });
      } else {
        common_vendor.index.navigateTo({ url: path });
      }
      this.currentPage = path;
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.primaryColor,
    b: common_vendor.t($data.todayDate),
    c: common_vendor.f($data.posts, (post, k0, i0) => {
      return common_vendor.e({
        a: common_vendor.t(post.title),
        b: common_vendor.t(post.rating.toFixed(1)),
        c: post.images && post.images.length > 0
      }, post.images && post.images.length > 0 ? {
        d: common_vendor.f(post.images.slice(0, 3), (img, index, i1) => {
          return {
            a: index,
            b: img
          };
        })
      } : {}, {
        e: common_vendor.f(post.tags, (tag, index, i1) => {
          return {
            a: common_vendor.t(tag),
            b: index
          };
        }),
        f: post.id,
        g: common_vendor.o(($event) => $options.goToDetail(post.id), post.id)
      });
    }),
    d: $data.accentColor,
    e: $data.primaryColor,
    f: $data.primaryColor,
    g: $data.posts.length === 0
  }, $data.posts.length === 0 ? {} : {}, {
    h: common_vendor.f($data.tabs, (tab, k0, i0) => {
      return {
        a: common_vendor.t(tab.icon),
        b: tab.path === $data.currentPage ? 1 : "",
        c: common_vendor.t(tab.name),
        d: tab.path === $data.currentPage ? $data.primaryColor : "#888",
        e: tab.name,
        f: common_vendor.o(($event) => $options.switchTab(tab.path), tab.name)
      };
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-07e72d3c"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/home/home.js.map
