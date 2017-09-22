import Vue from 'vue'
import Vuex from 'vuex'
import { firebaseMutations, firebaseAction } from 'vuexfire'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: false,
  state: {
    user: null,
    auth: null,
    itemsPerPage: 16,
    photos: []
  },
  getters: {
    photos: state => state.photos.reverse()
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
    setUser: firebaseAction(({bindFirebaseRef}, ref) => {
      bindFirebaseRef('user', ref)
    })
  }
})
