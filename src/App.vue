<template>
  <div class="main-app">
    <tpl-default>
      <router-view></router-view>
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
            profile_picture: user.photoURL || 'https://via.placeholder.com/250x250?text=' + username
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
