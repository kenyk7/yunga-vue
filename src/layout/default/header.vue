<template>
  <header>
    <nav class="nav has-shadow">
      <div class="container">
        <div class="nav-left">
          <a class="nav-item" href="/">
            <img src="static/img/logo.png" alt="Yunga">
          </a>
        </div>
        <span class="nav-toggle" :class="{'is-active': isMobileMenu}" @click="isMobileMenu = !isMobileMenu">
          <span></span>
          <span></span>
          <span></span>
        </span>
        <div class="nav-right nav-menu" :class="{'is-active': isMobileMenu}">
          <a href="/test" class="nav-item">
            test
          </a>
          <div class="nav-item">
            <div class="field is-grouped">
              <p class="control">
                <a href="https://twitter.com/kenyk7" class="button is-info">
                  <span class="icon">
                    <i class="fa fa-google"></i>
                  </span>
                  <span>Google</span>
                </a>
              </p>
              <p class="control">
                <a href="https://github.com/kenyk7" class="button is-facebook">
                  <span class="icon">
                    <i class="fa fa-facebook"></i>
                  </span>
                  <span>Facebook</span>
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <div class="hero-body" style="background-image: url('./static/img/yunga-header.jpg');">
      <div class="container has-text-centered">
        <h1 class="title is-2">
          Yunga
        </h1>
        <h2 class="subtitle is-5">
          Sitio web sobre fotografía para el distrito Santa Rosa
        </h2>
        <div class="center-search">
          <div class="field has-addons">
            <div class="control">
              <input class="input" type="text" placeholder="Catarata, cueva, lajas, etc">
            </div>
            <div class="control">
              <a class="button is-info">
                Buscar
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
<script>
export default {
  data () {
    return {
      isMobileMenu: false
    }
  }
}
</script>
<style  lang="scss" scoped>
.is-facebook{
  color: #fff;
  background: #3b5998;
  border-color: #3b5998;
  &:hover,
  &:focus{
    color: #fff;
    border-color: #3b5998;
    background: darken(#3b5998, 5%);
  }
}
.field.is-grouped{
  width: 100%;
  justify-content: space-around;
}
@media screen and (min-width: 1024px) {
  .nav-left{
    margin-left: -1rem;
  }
  .nav-right{
    margin-right: -1rem;
  }
}

.hero-body{
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
</style>
