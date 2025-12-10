"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      primaryColor: "#00CC99",
      searchKeyword: "",
      totalFriends: 32,
      // 模拟总好友数
      currentPage: 1,
      pageSize: 10,
      totalPages: 4,
      // 模拟 32/10 = 4页
      // 模拟好友数据 (当前页10条)
      friends: [
        { id: 101, username: "xiaolv01", nickname: "小绿", avatar: "/static/avatar1.jpg" },
        { id: 102, username: "coder_A", nickname: "程序猿", avatar: "/static/avatar2.jpg" },
        { id: 103, username: "foodie_A", nickname: "美食家A", avatar: "/static/avatar3.jpg" }
        // ... 7 more friends
      ]
    };
  },
  onLoad() {
    this.fetchFriends(1);
  },
  methods: {
    goBack() {
      common_vendor.index.navigateBack();
    },
    // 模拟获取好友列表
    fetchFriends(page) {
      this.currentPage = page;
    },
    // 搜索好友
    searchFriends() {
      this.fetchFriends(1);
    },
    // 切换分页
    changePage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.fetchFriends(page);
      }
    },
    // 跳转到聊天页面
    goToChat(friendId, friendName) {
      common_vendor.index.navigateTo({
        url: `chat?id=${friendId}&name=${friendName}`
      });
    }
  }
};
const __injectCSSVars__ = () => {
  common_vendor.useCssVars((_ctx) => ({
    "58edffd4": _ctx.primaryColor
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
    c: common_vendor.t($data.totalFriends),
    d: $data.primaryColor,
    e: common_vendor.o((...args) => $options.searchFriends && $options.searchFriends(...args)),
    f: $data.searchKeyword,
    g: common_vendor.o(($event) => $data.searchKeyword = $event.detail.value),
    h: common_vendor.o((...args) => $options.searchFriends && $options.searchFriends(...args)),
    i: $data.friends.length === 0
  }, $data.friends.length === 0 ? {} : {}, {
    j: common_vendor.f($data.friends, (friend, k0, i0) => {
      return {
        a: friend.avatar,
        b: common_vendor.t(friend.nickname),
        c: common_vendor.t(friend.username),
        d: friend.id,
        e: common_vendor.o(($event) => $options.goToChat(friend.id, friend.name), friend.id)
      };
    }),
    k: $data.totalPages > 1
  }, $data.totalPages > 1 ? {
    l: $data.currentPage === 1 ? 1 : "",
    m: common_vendor.o(($event) => $options.changePage($data.currentPage - 1)),
    n: common_vendor.t($data.currentPage),
    o: common_vendor.t($data.totalPages),
    p: $data.currentPage === $data.totalPages ? 1 : "",
    q: common_vendor.o(($event) => $options.changePage($data.currentPage + 1))
  } : {}, {
    r: common_vendor.s(_ctx.__cssVars())
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-4d00fae9"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/message/friends/friendList.js.map
