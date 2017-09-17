import { createAPI } from './client'

const config = {
  apiKey: 'AIzaSyD3na-HXhj5IaKVFj7jnqBzVSGs9G8zAnw',
  authDomain: 'yunga-sr.firebaseapp.com',
  databaseURL: 'https://yunga-sr.firebaseio.com',
  projectId: 'yunga-sr',
  storageBucket: 'yunga-sr.appspot.com',
  messagingSenderId: '565491736404'
}

const api = createAPI({
  version: '/v0',
  config: config
})

export default api
