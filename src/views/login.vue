<template>
  <div class="page-auth">
    <form class="form-auth" @submit.prevent="login">
      <h2 class="title is-4 has-text-centered">Login</h2>
      <div class="field">
        <div class="control has-icons-left">
          <span class="icon is-small is-left">
            <i class="fa fa-envelope"></i>
          </span>
          <input class="input" v-model="auth.email" type="email" placeholder="Email">
        </div>
      </div>
      <div class="field">
        <div class="control has-icons-left">
          <span class="icon is-small is-left">
            <i class="fa fa-lock"></i>
          </span>
          <input class="input" v-model="auth.password" type="password" placeholder="Contraseña">
        </div>
      </div>
      <div class="field">
        <div class="has-text-right">
          <a href="#">
            <small>¿Olvidé mi contraseña?</small>
          </a>
        </div>
      </div>
      <p class="has-text-right group-btn">
        <button class="button is-success" type="button" @click="register">
          <span class="icon is-small">
            <i class="fa fa-plus"></i>
          </span>
          <span>Registrarse</span>
        </button>
        <button class="button is-primary" type="submit">
          <span class="icon is-small">
            <i class="fa fa-sign-in"></i>
          </span>
          <span>Login</span>
        </button>
      </p>
      <div class="social-login">
        <p class="group-btn">
          <a class="button is-info" @click.prevent="loginWithGoogle">
            <span class="icon is-small">
              <i class="fa fa-google"></i>
            </span>
            <span>Google</span>
          </a>
          <a class="button is-facebook">
            <span class="icon is-small">
              <i class="fa fa-facebook"></i>
            </span>
            <span>Facebook</span>
          </a>
        </p>
      </div>
    </form>
  </div>
</template>
<script>
import Firebase from 'firebase'

const auth = Firebase.auth()
const provider = new Firebase.auth.GoogleAuthProvider()

export default {
  name: 'login',
  data () {
    return {
      auth: {
        email: '',
        password: ''
      }
    }
  },
  created () {
    const _self = this
    auth.onAuthStateChanged((user) => {
      if (user) {
        setTimeout(function () {
          _self.$router.push({name: 'Home'})
        }, 500)
      }
    })
  },
  methods: {
    // register
    register () {
      const _self = this
      auth.createUserWithEmailAndPassword(this.auth.email, this.auth.password).catch(function (error) {
        _self.$toast.open({
          message: 'Register failed' + error,
          type: 'is-danger'
        })
      })
    },
    // auth
    login () {
      const _self = this
      auth.signInWithEmailAndPassword(this.auth.email, this.auth.password).then((res) => {
        this.$store.commit('setAuth', Firebase.auth().currentUser)
      }).catch(function (error) {
        _self.$toast.open({
          duration: 10000,
          message: 'Login failed' + error,
          type: 'is-danger'
        })
      })
    },
    loginWithGoogle () {
      const _self = this
      auth.signInWithPopup(provider).catch(function (error) {
        _self.$toast.open({
          message: 'Login failed' + error,
          type: 'is-danger'
        })
      })
    }
  }
}
</script>
<style lang="scss">
.form-auth{
  max-width: 420px;
  margin-left: auto;
  margin-right: auto;
  padding: 30px;
  padding-top: 20px;
  background: #f9f9f9;
  border-radius: 5px;
  margin-bottom: 20px;
  margin-top: 20px;
  border: 1px solid #ddd;
  box-shadow: 0 2px 3px rgba(#000, 0.15);
}
.group-btn{
  display: flex;
  justify-content: space-between;
  .button{
    width: 47%;
  }
}
.social-login{
  background: #e5e5e5;
  padding: 15px 20px;
  margin-top: 20px;
  margin-bottom: -30px;
  border-radius: 15px 15px 0 0;
}
</style>
