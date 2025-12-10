<template>
  <!-- 自定义返回箭头组件（圆形放大版） -->
  <view 
    class="back-icon" 
    @click="handleClick"
    :style="{ 
      width: iconSize + 'rpx', 
      height: iconSize + 'rpx' 
    }"
  >
    <!-- 移除 :style 中的 // 注释，修复标签闭合 -->
    <image 
      class="back-img"
      src="/static/back.png"  
      mode="aspectFit"
      :style="{ 
        width: '80%', 
        height: '80%' 
      }"
    ></image> <!-- 确保标签正确闭合 -->
  </view>
</template>

<script>
export default {
  name: "back-icon",
  props: {
    iconSize: {
      type: Number,
      default: 60 // 默认放大到60rpx
    }
  },
  methods: {
    handleClick() {
      this.$emit("click");
    }
  }
};
</script>

<style scoped>
.back-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%; /* 圆形容器 */
  cursor: pointer;
  /* 可选背景和阴影 */
  background-color: rgba(255, 255, 255, 0.9);
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
}

.back-img {
  display: block;
  background: none;
  object-fit: contain;
}
</style>