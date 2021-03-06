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
    photos: [],
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
    }
  },
  actions: {
    setPhotosRef: firebaseAction(({bindFirebaseRef}, ref) => {
      bindFirebaseRef('photos', ref)
    }),
    setPhotosAllRef: firebaseAction((context, ref) => {
      context.bindFirebaseRef('photos', ref, {readyCallback: function (res) {
        console.log('load end')
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
