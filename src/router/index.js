import Vue from 'vue'
import Firebase from 'firebase'
import Router from 'vue-router'

import Home from '@/views/home'
import Submit from '@/views/submit'
import Test from '@/views/test'
import Login from '@/views/login'

Vue.use(Router)

const router = new Router({
  linkActiveClass: 'is-active',
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/test',
      name: 'Test',
      component: Test
    },
    {
      path: '/submit',
      name: 'Submit',
      component: Submit,
      meta: {
        auth: true
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      beforeEnter: (to, from, next) => {
        if (Firebase.auth().currentUser) {
          next({name: 'Home'})
        }
        next()
      }
    }
  ]
})

// http://router.vuejs.org/en/advanced/meta.html
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.auth)) {
    if (!Firebase.auth().currentUser) {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
