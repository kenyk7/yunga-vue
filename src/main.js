// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Firebase from 'firebase'
import Buefy from 'buefy'
import VuePhotoSwipe from './plugins/PhotoSwipe'

import App from './App'
import router from './router'
import store from './store'

import './assets/scss/style.scss'
import 'font-awesome/css/font-awesome.css'

Vue.use(Buefy, {defaultIconPack: 'fa'})
Vue.use(VuePhotoSwipe)

Vue.config.productionTip = false

const unsubscribe = Firebase.auth().onAuthStateChanged(() => {
  /* eslint-disable no-new */
  new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
  })
  unsubscribe()
})
