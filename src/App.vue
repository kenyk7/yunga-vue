<template>
  <div id="app">
    <header>
      <span>Yunga</span>
    </header>
    <main>
      <img src="./assets/logo.png" alt="Vue.js PWA">
      <router-view></router-view>
    </main>
    <div class="preview-img-list">
      <img class="preview-img-item" width="200" v-for="(item, index) in items"
      :src="item.src" @click="$photoswipe.open(index, items)">
    </div>
    <p>
      <button class="button is-primary"
        @click="isImageModalActive = true">
        Launch image modal
      </button>
    </p>
    <b-modal :active.sync="isImageModalActive">
      <p class="image is-4by3">
          <img src="https://unsplash.it/1000/1000">
      </p>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      isImageModalActive: false,
      items: [{
        src: 'https://unsplash.it/1000/1000',
        w: 1024,
        h: 768
      }, {
        src: 'https://unsplash.it/1000/1000',
        w: 1024,
        h: 768
      }, {
        src: 'https://unsplash.it/1000/1000',
        w: 1024,
        h: 768
      }]
    }
  }
}
</script>

<style>
body {
  margin: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

main {
  text-align: center;
  margin-top: 40px;
}

header {
  margin: 0;
  height: 56px;
  padding: 0 16px 0 24px;
  background-color: #35495E;
  color: #ffffff;
}

header span {
  display: block;
  position: relative;
  font-size: 20px;
  line-height: 1;
  letter-spacing: .02em;
  font-weight: 400;
  box-sizing: border-box;
  padding-top: 16px;
}

p{
  text-align: center;
}

.preview-img-list {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}
.preview-img-item {
  margin: 5px;
  max-width: 100px;
  max-height: 100px;
}
</style>
