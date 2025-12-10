"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      primaryColor: "#00CC99",
      accentColor: "#FFD700",
      tabs: [],
      postTitle: "",
      postContent: "",
      tags: [],
      currentTag: "",
      suggestedTags: ["日常", "技术分享", "美食探店", "旅行攻略", "学习心得", "搞笑段子", "穿搭"],
      postType: 0,
      // 0=纯文, 1=图文, 2=视频
      // 图片相关
      imageList: [],
      // 本地图片路径列表
      // 视频相关
      videoPath: "",
      // 本地视频路径
      uploading: false,
      uploadProgress: 0,
      uploadTask: null
      // uni.uploadFile 任务对象
    };
  },
  computed: {
    // 判断是否可以点击发布按钮
    isReadyToPublish() {
      return this.postContent.trim().length > 0 || this.imageList.length > 0 || this.videoPath;
    }
  },
  methods: {
    // --- 顶部导航栏操作 ---
    handleCancel() {
      if (this.uploading && this.uploadTask) {
        this.uploadTask.abort();
      }
      common_vendor.index.showModal({
        title: "提示",
        content: "确定要清空所有内容并返回吗？",
        success: (res) => {
          if (res.confirm) {
            this.resetForm();
            this.switchTab("/pages/home/home");
          }
        }
      });
    },
    resetForm() {
      this.postTitle = "";
      this.postContent = "";
      this.tags = [];
      this.currentTag = "";
      this.postType = 0;
      this.imageList = [];
      this.videoPath = "";
      this.uploading = false;
      this.uploadProgress = 0;
      this.uploadTask = null;
    },
    // --- 标签处理 ---
    addTag() {
      const tag = this.currentTag.trim();
      if (tag && !this.tags.includes(tag)) {
        this.tags.push(tag);
      }
      this.currentTag = "";
    },
    removeTag(index) {
      this.tags.splice(index, 1);
    },
    selectSuggestedTag(tag) {
      const trimmedTag = tag.trim();
      if (trimmedTag && !this.tags.includes(trimmedTag)) {
        this.tags.push(trimmedTag);
      }
      common_vendor.index.showToast({ title: `已添加标签 #${trimmedTag}`, icon: "none" });
    },
    // --- 图片/视频选择 ---
    chooseImage() {
      if (this.postType === 2) {
        common_vendor.index.showToast({ title: "已选择视频，请先删除视频", icon: "none" });
        return;
      }
      let count = 9 - this.imageList.length;
      if (count <= 0) {
        common_vendor.index.showToast({ title: "最多只能上传9张图片", icon: "none" });
        return;
      }
      common_vendor.index.chooseImage({
        count,
        sizeType: ["original", "compressed"],
        sourceType: ["album", "camera"],
        success: (res) => {
          this.postType = 1;
          this.imageList = [...this.imageList, ...res.tempFilePaths];
          common_vendor.index.showToast({ title: "图片已添加", icon: "none" });
        }
      });
    },
    chooseVideo() {
      if (this.postType === 1) {
        common_vendor.index.showToast({ title: "已选择图片，请先删除图片", icon: "none" });
        return;
      }
      if (this.videoPath) {
        common_vendor.index.showToast({ title: "只能上传一个视频，请先删除", icon: "none" });
        return;
      }
      common_vendor.index.chooseVideo({
        sourceType: ["album", "camera"],
        maxDuration: 60,
        camera: "back",
        success: (res) => {
          this.postType = 2;
          this.videoPath = res.tempFilePath;
          this.uploading = true;
          this.uploadProgress = 0;
          this.uploadMedia(res.tempFilePath, "video");
        }
      });
    },
    deleteMedia(index, type) {
      if (type === "image") {
        this.imageList.splice(index, 1);
        if (this.imageList.length === 0 && this.postContent.trim().length === 0) {
          this.postType = 0;
        }
      } else if (type === "video") {
        if (this.uploading && this.uploadTask) {
          this.uploadTask.abort();
        }
        this.videoPath = "";
        this.uploading = false;
        this.uploadProgress = 0;
        if (this.postContent.trim().length === 0) {
          this.postType = 0;
        }
      }
    },
    previewImage(index) {
      common_vendor.index.previewImage({
        current: this.imageList[index],
        urls: this.imageList
      });
    },
    // --- 媒体文件上传（模拟） ---
    uploadMedia(filePath, fileType) {
      this.uploading = true;
      this.uploadProgress = 0;
      let interval = setInterval(() => {
        if (this.uploadProgress < 95) {
          this.uploadProgress += Math.random() * 5;
        } else {
          clearInterval(interval);
          this.uploadProgress = 100;
          this.uploading = false;
          common_vendor.index.showToast({ title: `${fileType === "video" ? "视频" : "文件"}上传成功`, icon: "success" });
        }
      }, 300);
    },
    // --- 发布处理 ---
    handlePublish() {
      if (!this.isReadyToPublish) {
        common_vendor.index.showToast({ title: "请输入内容或添加媒体文件", icon: "none" });
        return;
      }
      if (this.postType === 2 && this.uploading) {
        common_vendor.index.showToast({ title: "视频正在上传中，请稍候", icon: "none" });
        return;
      }
      let mediaIds = [];
      if (this.postType === 1) {
        mediaIds = this.imageList.map((_, i) => `img_id_${i}`);
      } else if (this.postType === 2) {
        mediaIds = ["video_id_001"];
      }
      ({
        post_type: this.postType,
        post_title: this.postTitle.trim(),
        post_content: this.postContent.trim(),
        media_ids: mediaIds,
        tags: this.tags
        // ... 其他信息，如用户ID
      });
      common_vendor.index.showToast({ title: "发布成功", icon: "success" });
      this.resetForm();
      setTimeout(() => {
        this.switchTab("/pages/home/home");
      }, 1500);
    },
    // --- 底部导航切换 (与 home.vue 保持一致) ---
    switchTab(path) {
      common_vendor.index.switchTab({ url: path });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o((...args) => $options.handleCancel && $options.handleCancel(...args)),
    b: $options.isReadyToPublish ? $data.primaryColor : "#ccc",
    c: !$options.isReadyToPublish,
    d: common_vendor.o((...args) => $options.handlePublish && $options.handlePublish(...args)),
    e: $data.postTitle,
    f: common_vendor.o(($event) => $data.postTitle = $event.detail.value),
    g: $data.postContent,
    h: common_vendor.o(($event) => $data.postContent = $event.detail.value),
    i: $data.postType === 1
  }, $data.postType === 1 ? common_vendor.e({
    j: common_vendor.f($data.imageList, (url, index, i0) => {
      return {
        a: url,
        b: common_vendor.o(($event) => $options.previewImage(index), index),
        c: common_vendor.o(($event) => $options.deleteMedia(index, "image"), index),
        d: index
      };
    }),
    k: $data.imageList.length < 9
  }, $data.imageList.length < 9 ? {
    l: common_vendor.o((...args) => $options.chooseImage && $options.chooseImage(...args)),
    m: $data.primaryColor
  } : {}) : $data.postType === 2 ? common_vendor.e({
    o: $data.videoPath,
    p: common_vendor.o(($event) => $options.deleteMedia(0, "video")),
    q: $data.uploading && $data.uploadProgress < 100
  }, $data.uploading && $data.uploadProgress < 100 ? {
    r: $data.uploadProgress + "%",
    s: $data.primaryColor,
    t: common_vendor.t($data.uploadProgress.toFixed(0))
  } : {}) : {}, {
    n: $data.postType === 2,
    v: common_vendor.o((...args) => $options.addTag && $options.addTag(...args)),
    w: $data.currentTag,
    x: common_vendor.o(($event) => $data.currentTag = $event.detail.value),
    y: common_vendor.f($data.tags, (tag, index, i0) => {
      return {
        a: common_vendor.t(tag),
        b: common_vendor.o(($event) => $options.removeTag(index), index),
        c: index
      };
    }),
    z: $data.primaryColor,
    A: $data.primaryColor,
    B: common_vendor.f($data.suggestedTags, (tag, index, i0) => {
      return {
        a: common_vendor.t(tag),
        b: "suggest-" + index,
        c: common_vendor.o(($event) => $options.selectSuggestedTag(tag), "suggest-" + index)
      };
    }),
    C: $data.primaryColor,
    D: $data.primaryColor,
    E: $data.postType === 2 ? 1 : "",
    F: common_vendor.o((...args) => $options.chooseImage && $options.chooseImage(...args)),
    G: $data.postType === 1 ? 1 : "",
    H: common_vendor.o((...args) => $options.chooseVideo && $options.chooseVideo(...args)),
    I: common_vendor.f($data.tabs, (tab, k0, i0) => {
      return {
        a: common_vendor.t(tab.icon),
        b: tab.path === "publish" ? 1 : "",
        c: common_vendor.t(tab.name),
        d: tab.path === "publish" ? $data.primaryColor : "#888",
        e: tab.name,
        f: common_vendor.o(($event) => $options.switchTab(tab.path), tab.name)
      };
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-bfce3555"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/publish/publish.js.map
