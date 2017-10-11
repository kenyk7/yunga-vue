<template>
  <main>
    <form @submit.prevent="submitData()" class="block-uploader">
      <canvas class="is-hidden"></canvas>
      <b-field>
        <picture-input
          ref="pictureInput"
          @change="onChangePicture"
          @remove="onRemoved"
          width="350"
          height="300"
          :zIndex="9"
          accept="image/jpeg,image/png"
          size="10"
          buttonClass="button is-small"
          :removable="true"
          removeButtonClass="button is-danger is-small"
          :customStrings="customPicture">
        </picture-input>
      </b-field>
      <div class="has-text-left">
        <div class="field">
          <label class="label">¿Qué hay en esta foto?</label>
          <div class="control">
            <input v-model.trim="photo.tags" class="input" type="text" placeholder="catarata, cueva, lajas">
          </div>
        </div>
        <div class="field" v-if="photo.tags != ''">
          <div class="control">
            <span v-for="(tag, index) in getTags(photo.tags)" :key="tag"
            class="tag is-info" style="margin-right: 3px">
              {{tag}}
            </span>
          </div>
        </div>
        <div class="field">
          <div class="control has-text-right">
            <button type="submit" class="button is-primary" :class="{'is-loading': loading}" :disabled="!isValid || loading">
              <span class="icon is-small">
                <i class="fa fa-send"></i>
              </span>
              <span>Enviar</span>
            </button>
          </div>
        </div>
      </div>
    </form>
  </main>
</template>
<script>
import Firebase from 'firebase'
import api from '../api'
const usersRef = api.child('users')
const refPhotos = api.child('photos')
const refMyPhotos = api.child('user-photos')
const storageRef = Firebase.storage().ref()
import PictureInput from 'vue-picture-input'

export default {
  name: 'submit',
  components: {
    PictureInput
  },
  data () {
    return {
      loading: false,
      customPicture: {
        drag: 'Haz clic aquí para seleccionar una foto',
        tap: 'Toque aquí para seleccionar una foto de su galería',
        change: 'Eligir otra foto',
        remove: 'Eliminar foto'
      },
      photo: {
        tags: '',
        src: '',
        thumbnail: '',
        w: null,
        h: null
      },
      image: '',
      imgBlobThumbnail: ''
    }
  },
  computed: {
    uid () {
      return this.$store.state.auth.uid
    },
    author () {
      return {
        username: this.$store.state.user.username || this.$store.state.user.email,
        profile_picture: this.$store.state.user.profile_picture
      }
    },
    isValid () {
      return this.image && this.photo.tags && this.photo.w && this.imgBlobThumbnail
    }
  },
  methods: {
    getTags (tags) {
      return tags.split(', ')
    },
    onChangePicture () {
      if (this.$refs.pictureInput.image) {
        this.image = this.$refs.pictureInput.file
        this.createReader(this.image, (w, h) => {
          this.photo.w = w
          this.photo.h = h
        })
      } else {
        console.log('FileReader API not supported!')
      }
    },
    onRemoved () {
      this.image = ''
    },
    submitData (event) {
      const _self = this
      _self.loading = true
      const file = _self.image
      const metadata = {
        'contentType': file.type
      }
      const key = refPhotos.push().key
      storageRef.child('uploads/photos/' + key).put(file, metadata).then((snapshot) => {
        _self.photo.src = snapshot.downloadURL
        storageRef.child('uploads/photos/thumbs/' + key).put(_self.imgBlobThumbnail, {'contentType': 'image/jpeg'}).then((snapshotThumb) => {
          _self.photo.thumbnail = snapshotThumb.downloadURL
          _self.photo.uid = _self.uid
          _self.photo.author = _self.author
          const stars = {
            count: 1,
            users: {}
          }
          stars.users[_self.uid] = true
          const photo = {
            data: _self.photo,
            stars
          }
          refPhotos.child(key).update(photo)
          refMyPhotos.child(_self.uid + '/photos/' + key).update(photo)
          _self.addCountMyPhotos(refMyPhotos.child(_self.uid))
          _self.toggleLikeUser(key, photo.data.thumbnail)
          _self.loading = false
          // reset data
          _self.image = ''
          _self.photo.tags = ''
          _self.photo.src = ''
          _self.photo.thumbnail = ''
          _self.photo.w = ''
          _self.photo.h = ''

          _self.$refs.pictureInput.removeImage()
          // noti
          _self.$toast.open({
            message: 'Foto enviada correctamente',
            type: 'is-success'
          })
        })
      }).catch((error) => {
        _self.$toast.open({
          message: 'Upload failed' + error,
          type: 'is-danger'
        })
        _self.loading = false
      })
    },
    addCountMyPhotos (ref) {
      ref.transaction(function (item) {
        if (item) {
          if (!item.count) {
            item.count = 0
          }
          item.count++
        }
        return item
      })
    },
    toggleLikeUser (keyPhoto, thumbnail) {
      usersRef.child(this.uid).child('likes').transaction(function (item) {
        if (item) {
          if (item.photos && item.photos[keyPhoto]) {
            item.count--
            item.photos[keyPhoto] = null
          } else {
            item.count++
            if (!item.photos) {
              item.photos = {}
            }
            item.photos[keyPhoto] = {thumbnail}
          }
        }
        return item
      })
    },
    createReader (file, whenReady) {
      const _self = this
      let reader = new FileReader()
      reader.onload = function (event) {
        let image = new Image()
        image.onload = function () {
          const width = this.width
          const height = this.height
          if (whenReady) {
            whenReady(width, height)
            image.width = width
            image.height = height
          }
        }
        image.src = event.target.result
        _self.resizeImg(image)
      }
      reader.readAsDataURL(file)
    },
    resizeImg (img) {
      const _self = this
      const canvas = this.$el.querySelector('canvas')
      var MAX_WIDTH = 750
      var MAX_HEIGHT = 1300
      var width = img.width
      var height = img.height

      if (width > height) {
        if (width > MAX_WIDTH) {
          height *= MAX_WIDTH / width
          width = MAX_WIDTH
        }
      } else {
        if (height > MAX_HEIGHT) {
          width *= MAX_HEIGHT / height
          height = MAX_HEIGHT
        }
      }
      canvas.width = width
      canvas.height = height
      let ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0, width, height)
      canvas.toBlob(function (blob) {
        _self.imgBlobThumbnail = blob
      }, 'image/jpeg', 0.9)
    }
  }
}
</script>
<style lang="scss">
.block-uploader{
  max-width: 370px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  background: #fff;
  padding: 20px;
  border-radius: 3px;
  margin-top: 10px;
  margin-bottom: 10px;
  box-shadow: 0 3px 7px rgba(#000, 0.15);
  > canvas {
    width: 100%;
  }
}
.tags{
  justify-content: center;
}
</style>

