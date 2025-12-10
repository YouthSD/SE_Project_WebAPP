"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
if (!Math) {
  "./pages/index/index.js";
  "./pages/login/login.js";
  "./pages/register/register.js";
  "./pages/home/home.js";
  "./pages/publish/publish.js";
  "./pages/message/message.js";
  "./pages/profile/profile.js";
  "./pages/home/postDetail.js";
  "./pages/message/friends/friendList.js";
  "./pages/message/friends/addFriend.js";
  "./pages/message/friends/friendRequests.js";
  "./pages/profile/settings/settings.js";
  "./pages/profile/settings/profileSettings.js";
  "./pages/profile/settings/userPosts.js";
  "./pages/profile/settings/userComments.js";
}
const _sfc_main = {
  onLaunch: function() {
    common_vendor.index.__f__("log", "at App.vue:4", "App Launch");
  },
  onShow: function() {
    common_vendor.index.__f__("log", "at App.vue:7", "App Show");
  },
  onHide: function() {
    common_vendor.index.__f__("log", "at App.vue:10", "App Hide");
  }
};
function createApp() {
  const app = common_vendor.createSSRApp(_sfc_main);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
//# sourceMappingURL=../.sourcemap/mp-weixin/app.js.map
