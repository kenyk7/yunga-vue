<template>
  <main>
    <div class="block-uploader">
      <b-field>
        <picture-input
          ref="pictureInput"
          @change="onChange"
          @remove="onRemoved"
          width="350"
          height="250"
          :zIndex="9"
          accept="image/jpeg,image/png"
          size="'0"
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
            <button @click="submitData" class="button is-primary" :class="{'is-loading': loading}" :disabled="!isValid || loading">
              <span class="icon is-small">
                <i class="fa fa-send"></i>
              </span>
              <span>Enviar</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<script>
import Firebase from 'firebase'
import api from '../api'
const refPhotos = api.child('photos')
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
        drag: 'Arrastre o haga clic aquí para seleccionar una foto',
        tap: 'Toque aquí para seleccionar una foto de su galería',
        change: 'Eligir otra foto',
        remove: 'Eliminar foto'
      },
      photo: {
        tags: '',
        src: '',
        w: null,
        h: null
      },
      image: ''
    }
  },
  computed: {
    isValid () {
      return this.image && this.photo.tags && this.photo.w
    }
  },
  methods: {
    getTags (tags) {
      return tags.split(', ')
    },
    createReader (file, whenReady) {
      let reader = new FileReader()
      reader.onload = function (evt) {
        let image = new Image()
        image.onload = function (evt) {
          const width = this.width
          const height = this.height
          if (whenReady) whenReady(width, height)
        }
        image.src = evt.target.result
      }
      reader.readAsDataURL(file)
    },
    onChange () {
      if (this.$refs.pictureInput.image) {
        this.image = this.$refs.pictureInput.file
        this.createReader(this.image, (w, h) => {
          this.photo.w = w
          this.photo.h = h
        })
      } else {
        console.log('FileReader API not supported: use the <form>, Luke!')
      }
    },
    onRemoved () {
      this.image = ''
    },
    submitData (event) {
      this.loading = true
      const file = this.image
      const metadata = {
        'contentType': file.type
      }
      const key = refPhotos.push().key
      storageRef.child('uploads/photos/' + key).put(file, metadata).then((snapshot) => {
        this.photo.src = snapshot.downloadURL
        refPhotos.child(key).update(this.photo)
        // reset data
        this.loading = false
        this.image = ''
        this.photo = {
          tags: '',
          photoUrl: '',
          w: null,
          h: null
        }
        this.$refs.pictureInput.removeImage()
        // noti
        this.$toast.open({
          message: 'Foto enviada correctamente',
          type: 'is-success'
        })
      }).catch((error) => {
        this.$toast.open({
          message: 'Upload failed' + error,
          type: 'is-danger'
        })
        this.loading = false
      })
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
}
.tags{
  justify-content: center;
}
</style>

