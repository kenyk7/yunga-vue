<template>
  <section class="pag-admin">
    <div v-if="myPhotos.length > 0">
      <b-loading :active.sync="isLoading"></b-loading>
      <transition-group name="list" tag="div" class="masonry">
        <div class="masonry__item" v-for="(item, index) in myPhotos" :key="item.data.src">
          <div class="card">
            <div class="card-image">
              <figure class="image">
                <img :src="item.data.thumbnail" alt="Image" @click="$photoswipe.open(index, photosSwipe)" class="preview-img-item">
              </figure>
            </div>
            <footer class="card-footer">
              <div class="card-footer-item">
                <b-dropdown hoverable position="is-top-right">
                  <a slot="trigger">
                    <b-icon icon="edit"></b-icon>
                  </a>
                  <b-dropdown-item custom paddingless>
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
                <b-icon icon="heart" :class="{'is-danger': isStarMe(item.stars.users)}"></b-icon>
                <span>{{item.stars.count}}</span>
              </a>
              <a v-if="user.admin" class="card-footer-item" @click="onToggleApproved(item)" title="Toggle approved">
                <b-icon v-if="!item.approved" icon="check"></b-icon>
                <b-icon v-else icon="close"></b-icon>
              </a>
              <a v-else class="card-footer-item" title="Aprobación">
                <b-icon v-if="item.approved" icon="check"></b-icon>
                <b-icon v-else icon="close"></b-icon>
              </a>
              <a v-if="user.admin" class="card-footer-item" @click="deletePhoto(item)">
                <b-icon icon="trash"></b-icon>
              </a>
            </footer>
          </div>
        </div>
      </transition-group>
      <nav class="y-pagination">
        <a class="button is-primary is-outlined" v-if="page.current > 1"
        @click="prevPage()">
          <b-icon icon="angle-left"></b-icon>
          <span>Anterior</span>
        </a>
        <a class="button is-primary is-outlined" v-if="isNext"
        @click="nextPage()">
          <span>Siguiente</span>
          <b-icon icon="angle-right"></b-icon>
        </a>
      </nav>
    </div>
    <div class="has-text-centered" v-else>
      <h2 class="title is-2">Sin resultados</h2>
      <p>Sube tus fotos para poder visualizarlas aquí</p>
    </div>
  </section>
</template>
<script>
import Firebase from 'firebase'
import api from '../api'
import { mapGetters } from 'vuex'

const photosRef = api.child('photos')
const myPhotosRef = api.child('user-photos')

const storageRef = Firebase.storage().ref()
const lastPhotos = photosRef.orderByKey()
const lastMyPhotos = myPhotosRef

export default {
  name: 'gallery',
  data () {
    return {
      isLoading: false,
      page: {
        current: 1
      }
    }
  },
  computed: {
    ...mapGetters(['user', 'auth', 'myPhotos']),
    itemsPerPage () {
      return this.$store.state.itemsPerPage
    },
    isNext () {
      if ((this.myPhotos.length + 1) < this.itemsPerPage) return false
      return true
    },
    photosSwipe () {
      return this.myPhotos.map(function (item) {
        return {
          src: item.data.src,
          w: item.data.w,
          h: item.data.h
        }
      })
    }
  },
  created () {
    this.loadData()
  },
  methods: {
    scrollTop () {
      window.scroll({top: 260, left: 0, behavior: 'smooth'})
    },
    loadData () {
      const _self = this
      this.isLoading = true
      setTimeout(function () {
        let lastKey = null
        if (_self.page.current > 1) {
          lastKey = _self.myPhotos[0]['.key']
        }

        if (_self.$route.name === 'Admin') {
          if (lastKey) {
            _self.loadDataType(lastPhotos.endAt(lastKey))
          } else {
            _self.loadDataType(lastPhotos)
          }
        } else {
          if (lastKey) {
            _self.loadDataType(lastMyPhotos.child(_self.auth.uid).orderByKey().endAt(lastKey))
          } else {
            _self.loadDataType(lastMyPhotos.child(_self.auth.uid).orderByKey())
          }
        }
        _self.isLoading = false
      }, 1000)
    },
    loadDataType (ref) {
      this.$store.dispatch('setMyPhotosRef', ref.limitToLast(this.itemsPerPage))
    },
    prevPage () {
      this.page.current--
      this.scrollTop()
      this.loadData()
    },
    nextPage () {
      this.page.current++
      this.scrollTop()
      this.loadData()
    },
    getTags (tags) {
      return tags.split(', ')
    },
    isStarMe (users) {
      return users ? hasOwnProperty.call(users, this.auth.uid) : false
    },
    deletePhoto (item) {
      const _self = this
      this.$dialog.confirm({
        message: '¿Estás seguro que deseas eliminar?',
        onConfirm: () => {
          photosRef.child(item['.key']).remove().then(function () {
            // remove photo of user
            myPhotosRef.child(item.data.uid).child(item['.key']).remove()
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
    onToggleApproved (item) {
      const key = item['.key']
      this.toggleApprovedPhoto(photosRef.child(key))
      this.toggleApprovedPhoto(myPhotosRef.child(item.data.uid).child(key))
    },
    toggleApprovedPhoto (photoRef) {
      photoRef.transaction(function (child) {
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
.y-pagination{
  display: flex;
  justify-content: center;
  background: #fff;
  position: relative;
  top: -5px;
  a{
    margin: 0 10px;
  }
}
</style>
