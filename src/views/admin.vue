<template>
  <section class="pag-admin">
    <transition-group name="list" tag="div" class="masonry">
      <div class="masonry__item" v-for="(item, index) in photos" :key="item.data.src">
        <div class="card">
          <div class="card-image">
            <figure class="image">
              <img :src="item.data.thumbnail" alt="Image" @click="$photoswipe.open(index, photosSwipe)" class="preview-img-item">
            </figure>
          </div>
          <footer class="card-footer">
            <div class="card-footer-item">
              <b-dropdown v-model="navigation" hoverable position="is-top-right">
                <a slot="trigger">
                  <b-icon icon="edit"></b-icon>
                </a>
                <b-dropdown-item v-model="navigation" custom paddingless>
                  <div class="modal-card" style="width: 275px;">
                    <div class="modal-card-body">
                      <div class="field">
                        <label class="label">¿Qué hay en esta foto?</label>
                        <div class="control">
                          <input class="input" :value="item.data.tags" type="text"
                          placeholder="catarata, cueva, lajas" required
                          @input="updateTags(item, $event.target.value)">
                        </div>
                      </div>
                      <div>
                        <span v-for="(tag, index) in getTags(item.data.tags)" :key="tag" v-if="tag"
                        class="tag is-info" style="margin-right: 3px">
                          {{tag}}
                        </span>
                      </div>
                    </div>
                  </div>
                </b-dropdown-item>
              </b-dropdown>
            </div>
            <a class="card-footer-item">
              <b-icon icon="heart"></b-icon>
              <span>{{item.data.starCount}}</span>
            </a>
            <a class="card-footer-item" @click="toggleApprovedPhoto(item)" title="Toggle approved">
              <b-icon v-if="!item.approved" icon="check"></b-icon>
              <b-icon v-if="item.approved" icon="close"></b-icon>
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
const lastPhotos = photosRef.limitToLast(16)

export default {
  name: 'gallery',
  data () {
    return {
      navigation: 'home'
    }
  },
  computed: {
    photos () {
      return this.$store.state.photos
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
    const _self = this
    setTimeout(function () {
      if (!_self.$store.state.user.admin) {
        const uid = _self.$store.state.auth.uid
        _self.$store.dispatch('setPhotosRef', lastPhotos.orderByChild('data/uid').equalTo(uid))
      } else {
        _self.$store.dispatch('setPhotosRef', lastPhotos)
      }
    }, 1500)
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
          photosRef.child(item['.key']).remove().then(function () {
            const desertRef = storageRef.child('uploads/photos/' + item['.key'])
            const desertRefThumb = storageRef.child('uploads/photos/thumbs/' + item['.key'])
            // delete photo
            desertRef.delete().then(function () {
              _self.$toast.open('Foto eliminada')
            }).catch(function (error) {
              console.log('delete error', error)
            })
            // delete photo thumb
            desertRefThumb.delete().then(function () {
              _self.$toast.open('Foto eliminada: thumb')
            }).catch(function (error) {
              console.log('delete error', error)
            })
          }).catch(function (error) {
            _self.$toast.open({
              message: error + '!',
              type: 'is-danger'
            })
          })
        }
      })
    },
    updateTags (item, val) {
      photosRef.child(item['.key']).child('data/tags').set(val)
    },
    toggleApprovedPhoto (item) {
      photosRef.child(item['.key']).transaction(function (child) {
        console.log('toggle', child)
        if (child) {
          if (child.approved) {
            child.approved = false
          } else {
            child.approved = true
          }
        }
        return child
      })
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
