"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      primaryColor: "#00CC99",
      accentColor: "#FFD700",
      requestCount: 3,
      // 模拟未处理的好友请求数量
      tabs: [],
      // 模拟消息列表数据
      messages: [
        { id: 1, friendId: 101, friendName: "小绿", avatar: "/static/avatar1.jpg", lastMessage: "你上次发的帖子太棒了！", time: "10:30" },
        { id: 2, friendId: 102, friendName: "程序猿", avatar: "/static/avatar2.jpg", lastMessage: "[图片] 看看我新写的代码", time: "昨天" },
        { id: 3, friendId: 103, friendName: "老吃家", avatar: "/static/avatar3.jpg", lastMessage: "好的，明天见", time: "周一" }
      ]
    };
  },
  onShow() {
    this.fetchMessages();
    this.fetchRequestCount();
  },
  methods: {
    // 模拟获取消息列表
    fetchMessages() {
    },
    // 模拟获取好友请求数量
    fetchRequestCount() {
    },
    // 跳转到聊天页面
    goToChat(friendId, friendName) {
      common_vendor.index.navigateTo({
        url: `chat?id=${friendId}&name=${friendName}`
      });
    },
    // 跳转到功能页面
    goToPage(pageName) {
      let path = "";
      if (pageName === "friendList") {
        path = "/pages/message/friends/friendList";
      } else if (pageName === "friendRequests") {
        path = "/pages/message/friends/friendRequests";
      } else if (pageName === "addFriend") {
        path = "/pages/message/friends/addFriend";
      }
      if (path) {
        common_vendor.index.navigateTo({
          url: path
        });
      }
    },
    showFeatureNotImplemented() {
      common_vendor.index.showToast({
        title: "该功能暂未实现",
        icon: "none"
      });
    },
    // 底部导航切换
    switchTab(path) {
      common_vendor.index.switchTab({ url: path });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.primaryColor,
    b: common_vendor.o(($event) => $options.goToPage("friendList")),
    c: common_vendor.o(($event) => $options.goToPage("addFriend")),
    d: $data.requestCount > 0
  }, $data.requestCount > 0 ? {
    e: common_vendor.t($data.requestCount),
    f: $data.accentColor
  } : {}, {
    g: common_vendor.o(($event) => $options.goToPage("friendRequests")),
    h: common_vendor.o((...args) => $options.showFeatureNotImplemented && $options.showFeatureNotImplemented(...args)),
    i: $data.messages.length === 0
  }, $data.messages.length === 0 ? {} : {}, {
    j: common_vendor.f($data.messages, (msg, k0, i0) => {
      return {
        a: msg.avatar,
        b: common_vendor.t(msg.friendName),
        c: common_vendor.t(msg.time),
        d: common_vendor.t(msg.lastMessage),
        e: msg.id,
        f: common_vendor.o(($event) => $options.goToChat(msg.friendId, msg.friendName), msg.id)
      };
    }),
    k: common_vendor.f($data.tabs, (tab, k0, i0) => {
      return {
        a: common_vendor.t(tab.icon),
        b: tab.path === "message" ? 1 : "",
        c: common_vendor.t(tab.name),
        d: tab.path === "message" ? $data.primaryColor : "#888",
        e: tab.name,
        f: common_vendor.o(($event) => $options.switchTab(tab.path), tab.name)
      };
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-4c1b26cf"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/message/message.js.map
