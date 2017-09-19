<template>
  <header>
    <nav class="navbar has-shadow">
      <div class="container">
        <div class="navbar-brand">
          <router-link to="/" class="nav-item navbar-logo">
            <img src="static/img/Logomakr_8lInv7.png" alt="Yunga">
          </router-link>
          <a class="navbar-burger" @click="isMobileMenu = !isMobileMenu">
            <span></span>
            <span></span>
            <span></span>
          </a>
        </div>
        <div class="navbar-menu" :class="{'is-active': isMobileMenu}">
          <div class="navbar-end">
            <b-dropdown v-if="auth" position="is-bottom-left">
              <a class="navbar-item" slot="trigger">
                <span>{{auth.email}}</span>
                <span class="icon">
                  <i class="fa fa-user"></i>
                </span>
              </a>
              <b-dropdown-item @click="logout">
                <span class="icon">
                  <i class="fa fa-sign-out"></i>
                </span>
                <span>Logout</span>
              </b-dropdown-item>
            </b-dropdown>
            <router-link v-if="!auth" to="/login" class="navbar-item">
              Login / Registro
            </router-link>
            <div class="navbar-item">
              <router-link to="/submit" class="button is-primary">
                <span class="icon">
                  <i class="fa fa-camera"></i>
                </span>
                <span>Enviar Foto</span>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <div class="hero-body" style="background-image: url('./static/img/yunga-header.jpg');">
      <div class="container has-text-centered">
        <br>
        <h1 class="title is-1">
          Santa Rosa - Yunga
        </h1>
        <h2 class="subtitle is-6">
          Sitio web sobre fotografía para el distrito Santa Rosa
        </h2>
        <div class="center-search">
          <div class="field has-addons">
            <div class="control">
              <input class="input" type="text" placeholder="Catarata, cueva, lajas, etc">
            </div>
            <div class="control">
              <a class="button is-info">
                <span>Buscar</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
<script>
import Firebase from 'firebase'
export default {
  data () {
    return {
      isMobileMenu: false
    }
  },
  computed: {
    auth () {
      return this.$store.state.auth
    }
  },
  methods: {
    logout () {
      Firebase.auth().signOut().then(function () {
        console.log('logout')
        location.reload()
      }, function (error) {
        console.log(error)
      })
    }
  }
}
</script>
<style  lang="scss" scoped>
.navbar{
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 999;
}
@media screen and (min-width: 1024px) {
  .navbar{
    height: 3.8rem;
  }
  .navbar-logo img{
    max-height: 2.2rem;
  }
}
.hero-body{
  margin-top: 3rem;
  background-size: cover;
  background-position: center;
  .title,
  .subtitle{
    color: #fff
  }
}
.center-search{
  display: flex;
  justify-content: center
}

@media screen and (max-width: 575px) {
  .title.is-1{
    font-size: 2rem;
  }
  .subtitle.is-6{
    font-size: 0.8rem;
  }
}

</style>
