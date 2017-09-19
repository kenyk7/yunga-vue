<template>
  <section class="pag-home">
    <transition-group name="list" tag="div" class="masonry">
      <div class="masonry__item" v-for="(item, index) in photos" :key="item.src">
        <div class="card">
          <div class="card-image">
            <figure class="image">
              <img :src="item.src" alt="Image" @click="$photoswipe.open(index, photos)" class="preview-img-item">
            </figure>
          </div>
          <footer class="card-footer is-hidden-touch">
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
      return this.$store.getters.photos
    }
  },
  created () {
    this.$store.dispatch('setPhotosRef', refPhotos)
  }
}
</script>

<style lang="scss">
.pag-home{
  margin-top: 10px;
  margin-bottom: 10px;
}
@media screen and (max-width: 575px) {
    .masonry{
      column-gap: 0.5em;
      &__item{
        margin-bottom: 0em;
        // margin-top: -10px;
      }
    }
  }
</style>
