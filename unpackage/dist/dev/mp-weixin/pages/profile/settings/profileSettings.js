"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      primaryColor: "#00CC99",
      // 假设从接口获取的当前用户资料
      currentProfile: {
        avatar: "/static/major.jpg",
        nickname: "空悲切",
        username: "dank1ng"
      },
      // 临时修改的数据
      tempProfile: {
        nickname: "小绿书用户"
      },
      tempAvatar: null
      // 临时本地头像路径
    };
  },
  onLoad() {
    this.tempProfile.nickname = this.currentProfile.nickname;
  },
  methods: {
    goBack() {
      common_vendor.index.navigateBack();
    },
    // 选择头像并上传
    chooseAvatar() {
      common_vendor.index.chooseImage({
        count: 1,
        sizeType: ["compressed"],
        sourceType: ["album", "camera"],
        success: (res) => {
          this.tempAvatar = res.tempFilePaths[0];
          this.uploadAvatar(this.tempAvatar);
        }
      });
    },
    uploadAvatar(filePath) {
      common_vendor.index.showLoading({ title: "头像上传中..." });
      setTimeout(() => {
        common_vendor.index.hideLoading();
        this.currentProfile.avatar = this.tempAvatar;
        this.tempAvatar = null;
        common_vendor.index.showToast({ title: "头像上传并替换成功", icon: "success" });
      }, 1500);
    },
    // 保存修改
    handleSave() {
      const newNickname = this.tempProfile.nickname.trim();
      if (newNickname.length === 0) {
        common_vendor.index.showToast({ title: "昵称不能为空", icon: "none" });
        return;
      }
      if (newNickname === this.currentProfile.nickname) {
        common_vendor.index.showToast({ title: "资料未做修改", icon: "none" });
        return;
      }
      this.currentProfile.nickname = newNickname;
      common_vendor.index.showToast({ title: "个人信息修改成功", icon: "success" });
      this.goBack();
    }
  }
};
const __injectCSSVars__ = () => {
  common_vendor.useCssVars((_ctx) => ({
    "438fa08e": _ctx.primaryColor
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
  return {
    a: common_vendor.o($options.goBack),
    b: common_vendor.p({
      iconSize: "50"
    }),
    c: $data.primaryColor,
    d: common_vendor.o((...args) => $options.handleSave && $options.handleSave(...args)),
    e: $data.primaryColor,
    f: $data.tempAvatar || $data.currentProfile.avatar,
    g: common_vendor.o((...args) => $options.chooseAvatar && $options.chooseAvatar(...args)),
    h: $data.tempProfile.nickname,
    i: common_vendor.o(($event) => $data.tempProfile.nickname = $event.detail.value),
    j: common_vendor.t($data.currentProfile.username),
    k: common_vendor.s(_ctx.__cssVars())
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-d955d4b4"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/profile/settings/profileSettings.js.map
