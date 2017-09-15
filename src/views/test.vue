<template>
  <div id="app">
    <main>
      <img src="@assets/logo.png" alt="Vue.js PWA">
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
    <b-modal :active.sync="isImageModalActive" :width="960">
      <p class="image is-16by9">
        <img src="https://unsplash.it/1500/800">
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
        src: 'https://unsplash.it/2000/1500',
        w: 2000,
        h: 1500
      }, {
        src: 'https://unsplash.it/2000/1500',
        w: 2000,
        h: 1500
      }, {
        src: 'https://unsplash.it/2000/1500',
        w: 2000,
        h: 1500
      }]
    }
  }
}
</script>

<style>

main {
  text-align: center;
  margin-top: 20px;
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
