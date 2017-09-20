<template>
  <section class="pag-home">
    <transition-group name="list" tag="div" class="masonry">
      <div class="masonry__item" v-for="(item, index) in photos" :key="item.src">
        <card-photo :photo="item">
          <figure @click="$photoswipe.open(index, photos)" class="preview-img-item">
            <img :src="item.src" :alt="item.tags">
          </figure>
        </card-photo>
      </div>
    </transition-group>
  </section>
</template>
<script>
import api from '../api'
const refPhotos = api.child('photos').orderByKey().limitToLast(16)
import cardPhoto from '@/components/cardPhoto'

export default {
  name: 'home',
  components: {
    cardPhoto
  },
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

<style lang="scss" scope>
.pag-home{
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
