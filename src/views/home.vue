<template>
  <main>
    <div class="preview-img-list">
      <img class="preview-img-item" width="200" v-for="(item, index) in items"
      :src="item.src" @click="$photoswipe.open(index, items)">
    </div>
    <!-- <transition-group name="list" tag="div" class="columns is-multiline is-tablet">
      <div class="column is-one-third" v-for="item in items" :key="item">
        <div class="card">
          <div class="card-image">
            <figure class="image is-16by9">
              <img :src="item.src" alt="Image">
            </figure>
          </div>
          <footer class="card-footer">
            <a class="card-footer-item">
              3 <b-icon icon="star"></b-icon>
            </a>
            <a class="card-footer-item">
              <b-dropdown>
                <b-icon icon="share" slot="trigger"></b-icon>
                <b-dropdown-item>Facebook</b-dropdown-item>
                <b-dropdown-item>Twitter</b-dropdown-item>
                <b-dropdown-item>Whatsapp</b-dropdown-item>
              </b-dropdown>
            </a>
          </footer>
        </div>
      </div>
    </transition-group> -->
    <pre>{{photos}}</pre>
  </main>
</template>
<script>
import api from '../api'
const refPhotos = api.child('photos')

export default {
  name: 'home',
  data () {
    return {
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
  },
  computed: {
    photos () {
      return this.$store.state.photos
    }
  },
  created () {
    this.$store.dispatch('setPhotosRef', refPhotos)
  }
}
</script>

<style>
.preview-img-list {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}
.preview-img-item {
  margin: 5px;
  max-width: 300px;
  max-height: 300px;
}
</style>
