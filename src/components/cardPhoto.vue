<template>
  <div class="card-photo">
    <a href="#" @click.prevent="" class="card-photo__user">
      <img :src="photo.data.author.profile_picture" :alt="photo.data.author.username" width="35" height="35">
      <h5>{{photo.data.author.username}}</h5>
    </a>
    <div class="card-photo__img image">
      <slot></slot>
    </div>
    <div class="card-photo__actions">
      <div left>
        <a class="button" @click.prevent="onStarClicked()">
          <b-icon icon="heart" :class="{'is-danger': isStarMe(photo.stars.users)}"></b-icon>
          <span>{{photo.stars.count}}</span>
        </a>
        <span>&nbsp;</span>
        <b-dropdown hoverable position="is-top-right" class="is-hidden">
          <button class="button" slot="trigger">
            <b-icon icon="share-alt"></b-icon>
          </button>
          <b-dropdown-item>
            <b-icon icon="facebook"></b-icon> Facebook
          </b-dropdown-item>
          <b-dropdown-item>
            <b-icon icon="twitter"></b-icon> Twitter
          </b-dropdown-item>
          <b-dropdown-item>
            <b-icon icon="whatsapp"></b-icon> Whatsapp
          </b-dropdown-item>
        </b-dropdown>
      </div>
      <div right>
        <a class="button is-hidden" :href="photo.data.src" target="_blank">
          <b-icon icon="external-link"></b-icon>
        </a>
        <span>&nbsp;</span>
        <a class="button" :href="photo.data.src" target="_blank">
          <b-icon icon="download"></b-icon>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../api'
const photosRef = api.child('photos')
const usersRef = api.child('users')
const myPhotosRef = api.child('user-photos')
export default {
  props: {
    photo: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  computed: {
    auth () {
      return this.$store.state.auth
    }
  },
  methods: {
    isStarMe (users) {
      return users ? hasOwnProperty.call(users, this.auth.uid) : false
    },
    onStarClicked () {
      const _self = this
      const key = this.photo['.key']
      const uid = this.photo.data.uid
      this.toggleStar(photosRef.child(key), this.auth.uid)
      this.toggleStar(myPhotosRef.child(uid + '/photos/' + key), this.auth.uid)
      if (!this.auth.isAnonymous) {
        _self.toggleLikeUser(_self.auth.uid, key)
      }
    },
    toggleStar (photoRef, uid) {
      photoRef.child('stars').transaction(function (item) {
        if (item) {
          if (item.users && item.users[uid]) {
            item.count--
            item.users[uid] = null
          } else {
            item.count++
            if (!item.users) {
              item.users = {}
            }
            item.users[uid] = true
          }
        }
        return item
      })
    },
    toggleLikeUser () {
      const _self = this
      const uid = this.auth.uid
      const keyPhoto = this.photo['.key']
      usersRef.child(uid).child('likes').transaction(function (item) {
        if (item) {
          if (item.photos && item.photos[keyPhoto]) {
            item.count--
            item.photos[keyPhoto] = null
          } else {
            item.count++
            if (!item.photos) {
              item.photos = {}
            }
            item.photos[keyPhoto] = {
              thumbnail: _self.photo.data.src
            }
          }
        }
        return item
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.card-photo{
  position: relative;
  box-shadow: 0 3px 5px rgba(#000, 0.2);
  &:hover{
    .card-photo__user{
      opacity: 1;
    }
    .card-photo__actions{
      opacity: 0.95;
    }
  }
  .button{
    border: 0;
    height: 2rem;
  }
  &__user{
    color: #fff;
    padding: 10px 15px;
    display: flex;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 8;
    opacity: 0;
    transition: all 0.5s;
    img{
      border-radius: 50%;
      margin-right: 10px;
    }
  }
  &__img{
    cursor: zoom-in;
    background: #000000;
    min-height: 120px;
  }
  &__actions{
    padding: 15px;
    background-image: linear-gradient(rgba(#000, 0), rgba(#000, 1));
    display: flex;
    justify-content: space-between;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 9;
    opacity: 0;
    transition: all 0.4s;
  }
  @media (min-width: 600px) {
    &:hover{
      .card-photo__img .preview-img-item{
        &:before{
          opacity: 1;
        }
      }
    }
    &__img .preview-img-item{
      position: relative;
      &:before{
        content: "";
        height: 55px;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        z-index: 5;
        background-image: linear-gradient(rgba(#000, 1), rgba(#000, 0));
        opacity: 0;
        transition: all 0.4s;
      }
    }
  }
  @media (max-width: 600px) {
    &__user{
      opacity: 1;
      color: #888;
      position: static;
      text-decoration: underline;
    }
    &__actions{
      opacity: 0.95;
    }
  }
}
</style>

