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
  data () {
    return {
      uid: null
    }
  },
  created () {
    Firebase.auth().onAuthStateChanged(this.onAuthStateChanged)
  },
  methods: {
    onAuthStateChanged (user) {
      if (user) {
        this.$store.dispatch('setUid', usersRef.child(user.uid))
        this.$store.commit('setAuth', user)
        // We ignore token refresh events.
        setTimeout(() => {
          console.log('user:', this.$store.state.uid.email)
          if (this.$store.state.uid.email) {
            console.log('exits user')
            return
          }
          console.log('write user')
          // this.uid = user.uid
          usersRef.child(user.uid).set({
            username: user.displayName,
            email: user.email,
            profile_picture: user.photoURL
          })
        }, 1000)
      } else {
        // Set currentUID to null.
        this.uid = null
      }
    }
  }
}
</script>
