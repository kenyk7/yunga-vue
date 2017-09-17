<template>
  <div class="page-auth">
    <form class="form-auth">
      <h2 class="title is-4 has-text-centered">Login</h2>
      <div class="field">
        <div class="control has-icons-left">
          <span class="icon is-small is-left">
            <i class="fa fa-envelope"></i>
          </span>
          <input class="input" v-model="auth.email" type="email" placeholder="Username">
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
        <button class="button is-primary" type="button" @click="login">
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

const provider = new Firebase.auth.GoogleAuthProvider()

export default {
  name: 'login',
  data () {
    return {
      auth: {
        email: 'kenykalin@gmail.com',
        password: 'secret123'
      }
    }
  },
  created () {
    const _self = this
    Firebase.auth().onAuthStateChanged((user) => {
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
      Firebase.auth().createUserWithEmailAndPassword(this.auth.email, this.auth.password).catch(function (error) {
        console.log(error)
      })
    },
    // auth
    login () {
      const _self = this
      Firebase.auth().signInWithEmailAndPassword(this.auth.email, this.auth.password).then((res) => {
        const redirect = _self.$route.query.redirect
        _self.$router.push({path: redirect})
      }).catch(function (error) {
        console.log(error)
      })
    },
    loginWithGoogle () {
      Firebase.auth().signInWithPopup(provider).then(function (res) {
        console.log(res)
      }).catch(function (error) {
        console.log(error)
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
  background: #fff;
  border-radius: 5px;
  margin-bottom: 10px;
  margin-top: 10px;
  box-shadow: 0 3px 7px rgba(#000, 0.15);
}
.group-btn{
  display: flex;
  justify-content: space-between;
  .button{
    width: 47%;
  }
}
.social-login{
  background: #f0f0f0;
  padding: 15px 20px;
  margin-top: 20px;
  margin-bottom: -30px;
  border-radius: 15px 15px 0 0;
}
</style>
