<template>
  <header>
    <nav class="navbar has-shadow">
      <div class="container">
        <div class="navbar-brand">
          <router-link to="/" class="nav-item navbar-logo">
            <img src="static/img/yunga.png" alt="Yunga">
          </router-link>
          <div class="navbar-item navbar-mobile is-hidden-desktop">
            <router-link to="/submit" class="button is-primary is-small">
              <b-icon icon="camera"></b-icon>
              <span>Enviar</span>
            </router-link>
          </div>
          <router-link v-if="!auth" to="/login" class="navbar-item is-active is-hidden-desktop">
            <b-icon icon="sign-in"></b-icon>
          </router-link>
          <b-dropdown v-if="auth" hoverable position="is-bottom-left" class="is-hidden-desktop">
            <a class="navbar-item is-active" slot="trigger">
              <b-icon icon="user"></b-icon>
            </a>
            <b-dropdown-item has-link>
              <router-link to="/profile" >
                <b-icon icon="user-circle-o"></b-icon>
                Perfil
              </router-link>
            </b-dropdown-item>
            <b-dropdown-item has-link>
              <router-link to="/gallery" >
                <b-icon icon="picture-o"></b-icon>
                Mis fotos
              </router-link>
            </b-dropdown-item>
            <b-dropdown-item has-link v-if="auth.admin">
                <router-link to="/admin" >
                  <b-icon icon="cog"></b-icon>
                  Admin
                </router-link>
              </b-dropdown-item>
            <b-dropdown-item @click="logout">
              <b-icon icon="sign-out"></b-icon>
              <span>Logout</span>
            </b-dropdown-item>
          </b-dropdown>
        </div>
        <div class="navbar-menu" :class="{'is-active': isMobileMenu}">
          <div class="navbar-end">
            <b-dropdown v-if="auth" hoverable position="is-bottom-left">
              <a class="navbar-item" slot="trigger">
                <span>{{auth.username}}</span>
                <b-icon icon="user"></b-icon>
              </a>
              <b-dropdown-item has-link>
                <router-link to="/profile" >
                  <b-icon icon="user-circle-o"></b-icon>
                  Perfil
                </router-link>
              </b-dropdown-item>
              <b-dropdown-item has-link>
                <router-link to="/gallery" >
                  <b-icon icon="picture-o"></b-icon>
                  Mis fotos
                </router-link>
              </b-dropdown-item>
              <b-dropdown-item has-link v-if="auth.admin">
                <router-link to="/admin" >
                  <b-icon icon="cog"></b-icon>
                  Admin
                </router-link>
              </b-dropdown-item>
              <b-dropdown-item @click="logout">
                <b-icon icon="sign-out"></b-icon>
                <span>Logout</span>
              </b-dropdown-item>
            </b-dropdown>
            <router-link v-if="!auth" to="/login" class="navbar-item">
              <b-icon icon="user"></b-icon>
              <span>Login / Registro</span>
            </router-link>
            <div class="navbar-item">
              <router-link to="/submit" class="button is-primary">
                <b-icon icon="camera"></b-icon>
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
          Santa Rosa - Jaén
        </h1>
        <h2 class="subtitle is-6">
          Fotos del distrito Santa Rosa, Jaén - Cajamarca
        </h2>
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
      return this.$store.state.user
    }
  },
  methods: {
    logout () {
      Firebase.auth().signOut().then(function () {
        console.log('logout')
        location.reload()
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
.navbar-mobile{
  margin-left: auto;
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

@media screen and (min-width: 1024px) {
  .navbar{
    height: 3.8rem;
  }
  .navbar-logo img{
    max-height: 2.2rem;
  }
  .hero-body{
    padding: 5rem 2rem;
  }
}

@media screen and (max-width: 575px) {
  .title.is-1{
    font-size: 2rem;
  }
  .subtitle.is-6{
    font-size: 0.9rem;
  }
}

</style>
