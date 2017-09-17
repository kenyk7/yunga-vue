<template>
  <main>
    <div class="block-uploader">
      <b-field>
        <b-upload v-model="files" @input="submitFile($event)">
          <a class="button is-primary">
            <span class="icon is-small">
              <i class="fa fa-upload"></i>
            </span>
            <span>Click to upload</span>
          </a>
        </b-upload>
      </b-field>
      <div class="tags">
        <span v-for="(file, index) in files"
          :key="index"
          class="tag is-primary" >
          {{file.name}}
          <button class="delete is-small"
            type="button"
            @click="deleteDropFile(index)">
          </button>
        </span>
      </div>
    </div>
  </main>
</template>
<script>
import Firebase from 'firebase'
// import apiRef from '../api'
const storageRef = Firebase.storage().ref()

export default {
  name: 'submit',
  data () {
    return {
      photo: {
        tags: null,
        photoUrl: null
      },
      files: []
    }
  },
  methods: {
    deleteDropFile (index) {
      this.files.splice(index, 1)
    },
    submitFile (event) {
      console.log(event, this.files)
      const _self = this
      const file = _self.files[0]
      const metadata = {
        'contentType': file.type
      }
      storageRef.child('uploads/photos/' + file.name).put(file, metadata).then((snapshot) => {
        _self.photoUrl.photoUrl = snapshot.downloadURL
      }).catch((error) => {
        console.error('Upload failed:', error)
      })
    }
  }
}
</script>
<style>
.block-uploader{
  text-align: center;
}
.tags{
  justify-content: center;
}
</style>

