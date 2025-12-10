"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  // components: { uniPopupDialog },
  data() {
    return {
      primaryColor: "#00CC99",
      accentColor: "#FFD700",
      tabs: [],
      // 模拟用户数据
      userInfo: {
        avatar: "/static/major.jpg",
        // 默认使用上传的 logo 图片
        username: "dank1ng",
        nickname: "吕郑豪",
        friendCount: 15,
        postCount: 2,
        commentCount: 2
      },
      // 快捷修改模态框状态
      editingField: "",
      modalTitle: "",
      modalValue: ""
    };
  },
  onShow() {
    this.fetchUserInfo();
  },
  methods: {
    // 模拟获取用户信息
    fetchUserInfo() {
    },
    // 快捷修改入口
    quickEdit(field) {
      if (field === "avatar") {
        this.goToPage("profileSettings");
        return;
      }
      this.editingField = field;
      if (field === "nickname") {
        this.modalTitle = "修改昵称";
        this.modalValue = this.userInfo.nickname;
      }
      this.$refs.editModal.open();
    },
    // 处理快捷修改确认
    handleQuickEditConfirm(value) {
      if (value.trim() === this.userInfo[this.editingField]) {
        this.$refs.editModal.close();
        return;
      }
      if (this.editingField === "nickname") {
        this.updateProfile({ nickname: value.trim() });
      }
      this.$refs.editModal.close();
    },
    // 实际更新个人资料的逻辑
    updateProfile(data) {
      if (data.nickname) {
        this.userInfo.nickname = data.nickname;
        common_vendor.index.showToast({ title: "昵称修改成功", icon: "success" });
      }
    },
    goBack() {
      common_vendor.index.navigateBack();
    },
    // 路由跳转逻辑 (保持不变，以解决路径拼接问题)
    goToPage(pageName) {
      let path = "";
      if (pageName === "profileSettings") {
        path = "profileSettings";
      } else if (pageName === "settings") {
        path = "settings";
      } else if (pageName === "userPosts") {
        path = "userPosts";
      } else if (pageName === "userComments") {
        path = "userComments";
      } else if (pageName === "friendList") {
        path = "/pages/message/friends/friendList";
      }
      if (path) {
        common_vendor.index.navigateTo({
          url: path.startsWith("/") ? path : `/pages/profile/settings/${path}`
        });
      }
    },
    // 底部导航切换
    switchTab(path) {
      common_vendor.index.switchTab({ url: path });
    }
  }
};
const __injectCSSVars__ = () => {
  common_vendor.useCssVars((_ctx) => ({
    "68fdd546": _ctx.primaryColor
  }));
};
const __setup__ = _sfc_main.setup;
_sfc_main.setup = __setup__ ? (props, ctx) => {
  __injectCSSVars__();
  return __setup__(props, ctx);
} : __injectCSSVars__;
if (!Array) {
  const _easycom_uni_popup_dialog2 = common_vendor.resolveComponent("uni-popup-dialog");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_popup_dialog2 + _easycom_uni_popup2)();
}
const _easycom_uni_popup_dialog = () => "../../node-modules/@dcloudio/uni-ui/lib/uni-popup-dialog/uni-popup-dialog.js";
const _easycom_uni_popup = () => "../../node-modules/@dcloudio/uni-ui/lib/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_popup_dialog + _easycom_uni_popup)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.primaryColor,
    b: $data.userInfo.avatar,
    c: common_vendor.o(($event) => $options.quickEdit("avatar")),
    d: common_vendor.t($data.userInfo.username),
    e: common_vendor.t($data.userInfo.nickname),
    f: common_vendor.o(($event) => $options.quickEdit("nickname")),
    g: common_vendor.t($data.userInfo.postCount),
    h: common_vendor.o(($event) => $options.goToPage("userPosts")),
    i: common_vendor.t($data.userInfo.commentCount),
    j: common_vendor.o(($event) => $options.goToPage("userComments")),
    k: common_vendor.t($data.userInfo.friendCount),
    l: common_vendor.o(($event) => $options.goToPage("friendList")),
    m: common_vendor.o(($event) => $options.goToPage("userPosts")),
    n: common_vendor.o(($event) => $options.goToPage("userComments")),
    o: common_vendor.o(($event) => $options.goToPage("settings")),
    p: common_vendor.o($options.handleQuickEditConfirm),
    q: common_vendor.p({
      mode: "input",
      title: $data.modalTitle,
      value: $data.modalValue,
      placeholder: "请输入新内容"
    }),
    r: common_vendor.sr("editModal", "dd383ca2-0"),
    s: common_vendor.p({
      type: "dialog"
    }),
    t: common_vendor.s(_ctx.__cssVars())
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-dd383ca2"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/profile/profile.js.map
