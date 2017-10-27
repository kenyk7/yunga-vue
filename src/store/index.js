import Vue from 'vue'
import Vuex from 'vuex'
import { firebaseMutations, firebaseAction } from 'vuexfire'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: false,
  state: {
    user: null,
    auth: null,
    itemsPerPage: 21,
    isMoreItems: true,
    photos: [],
    photosAll: [],
    myPhotos: []
  },
  getters: {
    user: state => state.user,
    auth: state => state.auth,
    photos: state => state.photos,
    myPhotos: state => state.myPhotos
  },
  mutations: {
    ...firebaseMutations,
    setAuth (state, payload) {
      state.auth = payload
    },
    pushPhotos (state) {
      const ln = state.photos.length - 1
      const lastKey = state.photos[ln]['.key']
      const indexLastKey = state.photosAll.findIndex((item) => item['.key'] === lastKey)
      const tmpPhotos = state.photosAll.slice(indexLastKey - (state.itemsPerPage * 2 - 1), indexLastKey - (state.itemsPerPage - 1))
      if (tmpPhotos.length > 0) {
        state.photos = state.photos.concat(tmpPhotos)
      } else {
        state.isMoreItems = false
      }
    }
  },
  actions: {
    setPhotosRef: firebaseAction(({bindFirebaseRef}, ref) => {
      bindFirebaseRef('photos', ref)
    }),
    setPhotosAllRef: firebaseAction((context, ref) => {
      context.bindFirebaseRef('photosAll', ref, {readyCallback: function (res) {
        context.commit('pushPhotos')
      }})
    }),
    setMyPhotosRef: firebaseAction(({bindFirebaseRef}, ref) => {
      bindFirebaseRef('myPhotos', ref)
    }),
    setUser: firebaseAction(({bindFirebaseRef}, ref) => {
      bindFirebaseRef('user', ref)
    })
  }
})
