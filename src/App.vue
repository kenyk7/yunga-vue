<template>
  <div class="main-app">
    <tpl-default>
      <transition name="fade" appear mode="out-in">
        <router-view></router-view>
      </transition>
    </tpl-default>
  </div>
</template>

<script>
import Firebase from 'firebase'
import api from './api'
const usersRef = api.child('users')
import tplDefault from './layout/default'

export default {
  name: 'app',
  components: {
    tplDefault
  },
  created () {
    Firebase.auth().onAuthStateChanged(this.onAuthStateChanged)
  },
  methods: {
    onAuthStateChanged (user) {
      const _self = this
      if (user && !user.isAnonymous) {
        _self.$store.dispatch('setUser', usersRef.child(user.uid))
        _self.$store.commit('setAuth', user)
        // We ignore token refresh events.
        setTimeout(() => {
          // exist user
          if (_self.$store.state.user.email) {
            return
          }
          const username = user.email.split('@')[0]
          usersRef.child(user.uid).set({
            username: user.displayName || username,
            email: user.email,
            profile_picture: user.photoURL || 'https://via.placeholder.com/250x250?text=' + username,
            likes: {count: 0},
            photos: {count: 0}
          })
        }, 1500)
      } else {
        Firebase.auth().signInAnonymously()
        _self.$store.commit('setAuth', user)
      }
    }
  }
}
</script>

<style lang="scss">
.fade-enter-active, .fade-leave-active {
  transition: all .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
.loading-overlay .loading-background{
  background: rgba(#111, 0.9);
}
</style>
