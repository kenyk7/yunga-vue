<template>
  <section class="pag-home">
    <div class="simple-loading" v-if="photos.length < 1">
      Loading...
    </div>
    <div v-else>
      <transition-group  name="list" tag="div" class="masonry">
        <div class="masonry__item" v-for="(item, index) in photos" :key="item['.key']">
          <card-photo :photo="item">
            <figure @click="$photoswipe.open(index, photosSwipe)" class="preview-img-item">
              <img :src="item.data.thumbnail" :alt="item.tags">
            </figure>
          </card-photo>
        </div>
      </transition-group>
    </div>
  </section>
</template>
<script>
import api from '../api'
const refPhotos = api.child('photos')
import cardPhoto from '@/components/cardPhoto'

export default {
  name: 'home',
  components: {
    cardPhoto
  },
  computed: {
    itemsPerPage () {
      return this.$store.state.itemsPerPage
    },
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
    const refLastPhotos = refPhotos.limitToLast(this.itemsPerPage).orderByChild('approved').equalTo(true)
    this.$store.dispatch('setPhotosRef', refLastPhotos)
  }
}
</script>

<style lang="scss" scope>
.pag-home{
  margin-top: 10px;
  margin-bottom: 10px;
}
.simple-loading{
  display: flex;
  align-items: center;
  justify-content: center;
  height: 260px;
}
</style>
