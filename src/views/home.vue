<template>
  <section class="pag-home">
    <transition-group name="list" tag="div" class="masonry">
      <div class="masonry__item" v-for="(item, index) in photos" :key="item['.key']">
        <card-photo :photo="item">
          <figure @click="$photoswipe.open(index, photosSwipe)" class="preview-img-item">
            <img :src="item.data.thumbnail" :alt="item.tags">
          </figure>
        </card-photo>
      </div>
    </transition-group>
  </section>
</template>
<script>
import api from '../api'
const refPhotos = api.child('photos').limitToLast(21).orderByChild('approved').equalTo(true)
import cardPhoto from '@/components/cardPhoto'

export default {
  name: 'home',
  components: {
    cardPhoto
  },
  computed: {
    photos () {
      return this.$store.getters.photos
    },
    photosSwipe () {
      return this.photos.map(function (item) {
        return {
          src: item.data.src,
          w: item.data.w,
          h: item.data.h
        }
      })
    }
  },
  created () {
    this.$store.dispatch('setPhotosRef', refPhotos)
  }
}
</script>

<style lang="scss" scope>
.pag-home{
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
