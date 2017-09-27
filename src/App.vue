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
      if (user) {
        console.log('new user data', user)
        this.$store.dispatch('setUser', usersRef.child(user.uid))
        this.$store.commit('setAuth', user)
        // We ignore token refresh events.
        setTimeout(() => {
          // exist user
          if (this.$store.state.user.email) {
            return
          }
          const username = user.email.split('@')[0]
          usersRef.child(user.uid).set({
            username: user.displayName || username,
            email: user.email,
            profile_picture: user.photoURL || 'https://via.placeholder.com/250x250?text=' + username
          })
        }, 1500)
      }
    }
  }
}
</script>
