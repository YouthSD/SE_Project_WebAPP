import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
Vue.config.productionTip = false
Vue.prototype.$goBack = function() {
  uni.navigateBack({
    delta: 1, // 返回上一页（可自定义逻辑）
    fail: () => {
      // 若没有上一页，跳回首页
      uni.switchTab({ url: '/pages/home/home' });
    }
  });
};
App.mpType = 'app'
const app = new Vue({
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif
