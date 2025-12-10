"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  name: "back-icon",
  props: {
    iconSize: {
      type: Number,
      default: 60
      // 默认放大到60rpx
    }
  },
  methods: {
    handleClick() {
      this.$emit("click");
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_assets._imports_0$1,
    b: common_vendor.o((...args) => $options.handleClick && $options.handleClick(...args)),
    c: $props.iconSize + "rpx",
    d: $props.iconSize + "rpx"
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-0753b758"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/back-icon/back-icon.js.map
