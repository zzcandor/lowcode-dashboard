import Vue from 'vue'
import VueDraggableResizable from 'vue-draggable-resizable'
import VueDragResize from 'vue-drag-resize'
import 'vue-draggable-resizable/dist/VueDraggableResizable.css'
import VCharts from 'v-charts'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import './assets/font/iconfont.css';
import dayjs from 'dayjs'
import VueRulerTool from 'vue-ruler-tool'
import App from './App.vue'
import router from './router'
import store from './store'
import http from './http'
import numberInput from '@/components/numberInput'
import monacoEditor from '@/components/monacoEditor'
import vueJsonEditor from 'vue-json-editor'
// import initMock from '../mock';

// 需要 mock 数据时请打开注释
// initMock();
Vue.config.productionTip = false
Vue.prototype.$http = http
Vue.prototype.$dayjs = dayjs
Vue.use(VCharts)
Vue.use(ElementUI)
Vue.component('numberInput', numberInput)
Vue.component('monacoEditor', monacoEditor)
Vue.component('vueJsonEditor', vueJsonEditor)
Vue.component('VueRulerTool', VueRulerTool)
Vue.use(dayjs)
Vue.component('vue-draggable-resizable', VueDraggableResizable)
Vue.component('vue-drag-resize', VueDragResize)

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')
