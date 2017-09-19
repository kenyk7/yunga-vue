<template>
  <section class="pag-home">
    <transition-group name="list" tag="div" class="columns is-multiline is-tablet">
      <div class="column is-one-third" v-for="(item, index) in items" :key="item.src">
        <div class="card">
          <div class="card-image">
            <figure class="image is-16by9">
              <img :src="item.src" alt="Image" @click="$photoswipe.open(index, items)" class="preview-img-item">
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
    </transition-group>
  </section>
</template>
<script>
import api from '../api'
const refPhotos = api.child('photos').orderByKey().limitToLast(12)

export default {
  name: 'home',

  computed: {
    photos () {
      return this.$store.state.photos
    },
    items () {
      return this.photos.map((obj) => {
        return {
          w: 2000,
          h: 1500,
          src: obj.photoUrl
        }
      }).reverse()
    }
  },
  created () {
    this.$store.dispatch('setPhotosRef', refPhotos)
  }
}
</script>

<style>
.pag-home{
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
