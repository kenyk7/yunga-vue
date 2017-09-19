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
          zIndex="9" 
          accept="image/jpeg,image/png" 
          size="10" 
          buttonClass="button is-small"
          :removable="true"
          removeButtonClass="button is-danger is-small"
          :customStrings="customPicture">
        </picture-input>  
      </b-field>
      <div class="field has-text-left">
        <label class="label">¿Qué hay en esta foto?</label>
        <div class="control">
          <input v-model.trim="photo.tags" class="input" type="text" placeholder="catarata, cueva, lajas">
        </div>
      </div>
      <p class="control has-text-right">
        <button @click="submitData" class="button is-primary" :class="{'is-loading': loading}" :disabled="!isValid || loading">
          <span class="icon is-small">
            <i class="fa fa-send"></i>
          </span>
          <span>Enviar</span>
        </button>
      </p>
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
        photoUrl: ''
      },
      image: ''
    }
  },
  computed: {
    isValid () {
      return this.image && this.photo.tags
    }
  },
  methods: {
    onChange () {
      console.log('New picture selected!')
      if (this.$refs.pictureInput.image) {
        this.image = this.$refs.pictureInput.file
        console.log('Picture loaded.')
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
        this.photo.photoUrl = snapshot.downloadURL
        refPhotos.child(key).update(this.photo)
        // reset data
        this.loading = false
        this.image = ''
        this.photo = {
          tags: '',
          photoUrl: ''
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

