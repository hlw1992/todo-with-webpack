import Vue from 'vue'
import App from "./app.vue"

import './assets/styles/global.styl'

//测试用
// import './assets/styles/test.css'
import './assets/styles/test-stylus.styl'
// import './assets/images/bg.jpg'

//插入节点
const root=document.createElement('div')
document.body.appendChild(root)

//挂载到 新创建的节点
new Vue({
    render:(h)=>h(App)
}).$mount(root)