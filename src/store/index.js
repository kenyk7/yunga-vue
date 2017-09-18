import Vue from 'vue'
import Vuex from 'vuex'
import { firebaseMutations, firebaseAction } from 'vuexfire'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: false,
  state: {
    itemsPerPage: 20,
    photos: []
  },
  mutations: {
    ...firebaseMutations,
    otro () {
      console.log('hello otro')
    }
  },
  getters: {
    photos: state => state.photos
  },
  actions: {
    setPhotosRef: firebaseAction(({bindFirebaseRef}, ref) => {
      bindFirebaseRef('photos', ref)
    })
  },
  modules: {
    auth: {
      state: {
        user: null
      }
    }
  }
})
