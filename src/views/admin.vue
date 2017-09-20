<template>
  <section class="pag-admin">
    <transition-group name="list" tag="div" class="masonry">
      <div class="masonry__item" v-for="(item, index) in photos" :key="item.src">
        <div class="card">
          <div class="card-image">
            <figure class="image">
              <img :src="item.src" alt="Image" @click="$photoswipe.open(index, photos)" class="preview-img-item">
            </figure>
          </div>
          <footer class="card-footer">
            <div class="card-footer-item" >
              <b-dropdown v-model="navigation" hoverable position="is-top-right">
                <a slot="trigger">
                  <b-icon icon="edit"></b-icon>
                </a>
                <b-dropdown-item v-model="navigation" custom paddingless>
                  <form action="">
                    <div class="modal-card" style="width: 275px;">
                      <div class="modal-card-body">
                        <div class="field">
                          <label class="label">¿Qué hay en esta foto?</label>
                          <div class="control">
                            <input class="input" :value="item.tags" type="text"
                            placeholder="catarata, cueva, lajas" required
                            @input="updateTags(item, $event.target.value)">
                          </div>
                        </div>
                        <div>
                          <span v-for="(tag, index) in getTags(item.tags)" :key="tag" v-if="tag"
                          class="tag is-info" style="margin-right: 3px">
                            {{tag}}
                          </span>
                        </div>
                      </div>
                    </div>
                  </form>
                </b-dropdown-item>
              </b-dropdown>
            </div>
            <a class="card-footer-item">
              12
            </a>
            <a class="card-footer-item" @click="deletePhoto(item)">
              <b-icon icon="trash"></b-icon>
            </a>
          </footer>
        </div>
      </div>
    </transition-group>
  </section>
</template>
<script>
import Firebase from 'firebase'
import api from '../api'
const photosRef = api.child('photos')
const storageRef = Firebase.storage().ref()
const lastPhotos = photosRef.orderByKey().limitToLast(16)

export default {
  name: 'admin',
  data () {
    return {
      navigation: 'home'
    }
  },
  computed: {
    photos () {
      return this.$store.state.photos
    }
  },
  created () {
    this.$store.dispatch('setPhotosRef', lastPhotos)
  },
  methods: {
    getTags (tags) {
      return tags.split(', ')
    },
    deletePhoto (item) {
      const _self = this
      this.$dialog.confirm({
        message: '¿Estás seguro que deseas eliminar?',
        onConfirm: () => {
          const desertRef = storageRef.child('uploads/photos/' + item['.key'])
          desertRef.delete().then(function () {
            photosRef.child(item['.key']).remove()
            _self.$toast.open('Foto eliminada')
          }).catch(function (error) {
            // Uh-oh, an error occurred!
            console.log('delete error', error)
          })
        }
      })
    },
    updateTags (item, val) {
      photosRef.child(item['.key']).child('tags').set(val)
    }
  }
}
</script>

<style lang="scss">
.pag-admin{
  margin-top: 10px;
  margin-bottom: 10px;
}
.card-footer-item{
  .dropdown-content{
    margin-top: 0;
    padding-bottom: 0;
  }
}
</style>
