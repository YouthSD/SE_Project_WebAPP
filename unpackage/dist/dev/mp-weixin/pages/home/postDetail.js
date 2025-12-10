"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      primaryColor: "#00CC99",
      accentColor: "#FFD700",
      postId: null,
      scrollIntoView: "",
      activeSection: "content",
      // 初始状态：正文
      contentTop: 0,
      // 正文在scroll-view内的顶部位置
      commentsTop: 0,
      // 评论在scroll-view内的顶部位置
      scrollViewHeight: 0,
      // 滚动视图的可视高度（新增）
      scrollTimer: null,
      // 帖子数据
      post: {
        id: 1,
        title: "春天种的植物发芽了",
        content: "这是帖子的详细正文内容，这里可以有很多文字来介绍我的植物，它长得非常好，每天都给我带来好心情。",
        rating: 4.8,
        tags: ["植物", "园艺", "生活"],
        date: "2025-12-09",
        images: ["/static/img1.jpg", "/static/img2.jpg", "/static/img3.jpg", "/static/img4.jpg"],
        video: null,
        totalRatings: 120
      },
      userRate: 0,
      // 评论数据
      totalComments: 55,
      currentPage: 1,
      pageSize: 10,
      totalPages: 6,
      comments: [
        {
          id: 101,
          user: "小绿",
          content: "写得太好了！照片也很漂亮！",
          rating: 5,
          date: "1分钟前",
          showCount: 3,
          replies: [
            { id: 1001, user: "作者A", content: "谢谢支持！", target: "小绿" },
            { id: 1002, user: "用户B", content: "请问这是什么品种呀?", target: "小绿" },
            { id: 1003, user: "用户C", content: "B，这是XX品种。", target: "用户B" },
            { id: 1004, user: "用户D", content: "羡慕呀！", target: "小绿" }
          ]
        },
        { id: 102, user: "用户E", content: "评分给高了，感觉一般般。", rating: 3.5, date: "30分钟前", showCount: 0, replies: [] }
      ],
      newCommentText: "",
      replyingTo: null
    };
  },
  onLoad(options) {
    this.postId = options.id;
    this.fetchComments(1);
  },
  onReady() {
    this.getSectionPositions();
  },
  methods: {
    goBack() {
      common_vendor.index.navigateBack({ delta: 1 });
    },
    fetchPostDetail(id) {
    },
    fetchComments(page) {
      this.currentPage = page;
    },
    handleRate(score) {
      this.userRate = score;
      common_vendor.index.showToast({ title: `您评了 ${score} 星`, icon: "none" });
    },
    showCommentModal() {
      this.replyingTo = null;
      this.$refs.commentModal.open();
    },
    submitComment() {
      if (!this.newCommentText.trim()) {
        common_vendor.index.showToast({ title: "评论内容不能为空", icon: "none" });
        return;
      }
      this.$refs.commentModal.close();
      this.newCommentText = "";
    },
    handleReply(commentOrReply, parentComment = null) {
      this.replyingTo = commentOrReply;
      this.newCommentText = `回复 @${commentOrReply.user}: `;
      this.$refs.commentModal.open();
    },
    expandReplies(comment) {
      comment.showCount += 3;
    },
    changePage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.fetchComments(page);
      }
    },
    previewImage(index) {
      common_vendor.index.previewImage({
        current: this.post.images[index],
        urls: this.post.images
      });
    },
    // 【关键优化】动态获取：滚动视图高度 + 正文/评论区域位置
    getSectionPositions() {
      const query = common_vendor.index.createSelectorQuery().in(this);
      query.select(".detail-scroll").boundingClientRect((rect) => {
        this.scrollViewHeight = rect ? rect.height : 0;
      });
      query.select(".detail-scroll #content").boundingClientRect((rect) => {
        this.contentTop = rect ? rect.top : 0;
      });
      query.select(".detail-scroll #comments").boundingClientRect((rect) => {
        this.commentsTop = rect ? rect.top : 0;
      });
      query.exec();
    },
    scrollToSection(sectionId) {
      this.activeSection = sectionId;
      const query = common_vendor.index.createSelectorQuery().in(this);
      query.select(`.detail-scroll #${sectionId}`).boundingClientRect((rect) => {
        if (rect) {
          common_vendor.index.pageScrollTo({
            scrollTop: rect.top - common_vendor.index.upx2px(80) - common_vendor.index.getSystemInfoSync().statusBarHeight,
            duration: 300
          });
        }
      }).exec();
    },
    // 【核心修复】滚动时实时判断内容区域，更新按钮状态
    onScroll(e) {
      const scrollTop = e.detail.scrollTop;
      clearTimeout(this.scrollTimer);
      this.scrollTimer = setTimeout(() => {
        this.getSectionPositions();
        const commentShowThreshold = this.commentsTop - this.scrollViewHeight / 2;
        if (scrollTop >= commentShowThreshold) {
          this.activeSection = "comments";
        } else {
          this.activeSection = "content";
        }
      }, 50);
    }
  }
};
if (!Array) {
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  _easycom_uni_popup2();
}
const _easycom_uni_popup = () => "../../node-modules/@dcloudio/uni-ui/lib/uni-popup/uni-popup.js";
if (!Math) {
  _easycom_uni_popup();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.activeSection === "content" ? 1 : "",
    b: $data.activeSection === "content" ? $data.accentColor : "#fff",
    c: $data.activeSection === "content" ? $data.accentColor : "transparent",
    d: common_vendor.o(($event) => $options.scrollToSection("content")),
    e: $data.activeSection === "comments" ? 1 : "",
    f: $data.activeSection === "comments" ? $data.accentColor : "#fff",
    g: $data.activeSection === "comments" ? $data.accentColor : "transparent",
    h: common_vendor.o(($event) => $options.scrollToSection("comments")),
    i: $data.primaryColor,
    j: common_vendor.t($data.post.title),
    k: common_vendor.t($data.post.content),
    l: $data.post.images && $data.post.images.length
  }, $data.post.images && $data.post.images.length ? {
    m: common_vendor.f($data.post.images, (img, index, i0) => {
      return {
        a: index,
        b: img,
        c: common_vendor.o(($event) => $options.previewImage(index), index)
      };
    })
  } : {}, {
    n: $data.post.video
  }, $data.post.video ? {
    o: $data.post.video
  } : {}, {
    p: common_vendor.t($data.post.rating.toFixed(1)),
    q: $data.primaryColor,
    r: common_vendor.f(5, (i, k0, i0) => {
      return {
        a: i,
        b: i <= $data.userRate ? 1 : "",
        c: common_vendor.o(($event) => $options.handleRate(i), i),
        d: i <= $data.userRate ? $data.accentColor : "#ccc"
      };
    }),
    s: common_vendor.t($data.post.tags.join(", ")),
    t: common_vendor.t($data.post.date),
    v: common_vendor.t($data.totalComments),
    w: $data.primaryColor,
    x: common_vendor.f($data.comments, (comment, k0, i0) => {
      return common_vendor.e({
        a: common_vendor.t(comment.user),
        b: common_vendor.t(comment.rating.toFixed(1)),
        c: common_vendor.t(comment.content),
        d: common_vendor.o(($event) => $options.handleReply(comment), comment.id),
        e: common_vendor.t(comment.date),
        f: comment.replies.length > 0
      }, comment.replies.length > 0 ? common_vendor.e({
        g: common_vendor.f(comment.replies.slice(0, comment.showCount), (reply, index, i1) => {
          return {
            a: common_vendor.t(reply.user),
            b: common_vendor.t(reply.content),
            c: reply.id,
            d: common_vendor.o(($event) => $options.handleReply(reply, comment), reply.id)
          };
        }),
        h: comment.replies.length > comment.showCount
      }, comment.replies.length > comment.showCount ? {
        i: common_vendor.t(comment.replies.length - comment.showCount),
        j: $data.primaryColor,
        k: common_vendor.o(($event) => $options.expandReplies(comment), comment.id)
      } : {}) : {}, {
        l: comment.id
      });
    }),
    y: $data.primaryColor,
    z: $data.totalPages > 1
  }, $data.totalPages > 1 ? {
    A: $data.currentPage === 1 ? 1 : "",
    B: common_vendor.o(($event) => $options.changePage($data.currentPage - 1)),
    C: common_vendor.t($data.currentPage),
    D: common_vendor.t($data.totalPages),
    E: $data.currentPage === $data.totalPages ? 1 : "",
    F: common_vendor.o(($event) => $options.changePage($data.currentPage + 1))
  } : {}, {
    G: $data.scrollIntoView,
    H: common_vendor.o((...args) => $options.onScroll && $options.onScroll(...args)),
    I: $data.primaryColor,
    J: common_vendor.o((...args) => $options.showCommentModal && $options.showCommentModal(...args)),
    K: $data.newCommentText,
    L: common_vendor.o(($event) => $data.newCommentText = $event.detail.value),
    M: $data.primaryColor,
    N: common_vendor.o((...args) => $options.submitComment && $options.submitComment(...args)),
    O: common_vendor.sr("commentModal", "548d058b-0"),
    P: common_vendor.p({
      type: "bottom",
      ["mask-click"]: true
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-548d058b"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/home/postDetail.js.map
