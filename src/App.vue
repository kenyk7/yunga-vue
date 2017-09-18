<template>
  <div class="main-app">
    <tpl-default>
      <router-view></router-view>
    </tpl-default>
  </div>
</template>

<script>
import Firebase from 'firebase'
import tplDefault from './layout/default'

export default {
  name: 'app',
  components: {
    tplDefault
  },
  data () {
    return {
      user: null,
      currentUID: null
    }
  },
  created () {
    Firebase.auth().onAuthStateChanged(this.onAuthStateChanged)
  },
  methods: {
    onAuthStateChanged (user) {
      // We ignore token refresh events.
      if (user && this.currentUID === user.uid) return
      const userFire = Firebase.auth().currentUser
      if (user) {
        this.user = userFire
        this.currentUID = user.uid
      } else {
        this.user = null
      }
    }
  }
}
</script>
