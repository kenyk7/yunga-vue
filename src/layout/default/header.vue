<template>
  <header>
    <nav class="nav has-shadow">
      <div class="container">
        <div class="nav-left">
          <router-link to="/" class="nav-item">
            <img src="static/img/Logomakr_8lInv7.png" alt="Yunga">
          </router-link>
        </div>
        <span class="nav-toggle" :class="{'is-active': isMobileMenu}"
        @click="isMobileMenu = !isMobileMenu">
          <span></span>
          <span></span>
          <span></span>
        </span>
        <ul class="nav-right nav-menu" :class="{'is-active': isMobileMenu}">
          <!-- <li class="nav-item">
            <router-link to="/test" class="nav-link">
              Test
            </router-link>
          </li> -->
          <li class="nav-item">
            <a href="#" @click.prevent="logout" class="nav-link">
              Logout
            </a>
          </li>
          <li class="nav-item">
            <router-link to="/login" class="nav-link">
              Login / Registro
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/submit" class="nav-link button is-primary">
              <span class="icon">
                <i class="fa fa-camera"></i>
              </span>
              <span>Enviar Foto</span>
            </router-link>
          </li>
        </ul>
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
.nav{
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
}
@media screen and (min-width: 1024px) {
  .nav{
    height: 4rem;
  }
  .nav-item img{
    max-height: 2.2rem;
  }
  .nav-left{
    margin-left: -1rem;
  }
  .nav-right{
    margin-right: -1rem;
  }
}

.hero-body{
  margin-top: 3rem;
  // padding: 6rem 1.5rem;
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
