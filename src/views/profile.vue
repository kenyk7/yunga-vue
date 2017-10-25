<template>
  <div class="pag-profile">
    <div class="user-caption">
      <div class="user-caption__img">
        <img :src="user.profile_picture" :alt="user.username" class="img-circle" width="160">
      </div>
      <h3 class="title is-3">{{user.username}}</h3>
    </div>
    <div class="pag-profile__tags">
      <b-field grouped group-multiline>
        <div class="control">
          <b-taglist attached>
            <b-tag type="is-dark">
              <b-icon icon="picture-o"></b-icon>
              Fotos
            </b-tag>
            <b-tag type="is-success">{{user.photos.count}}</b-tag>
          </b-taglist>
        </div>
        <div class="control">
          <b-taglist attached>
            <b-tag type="is-dark">
              <b-icon icon="heart"></b-icon>
              Likes
            </b-tag>
            <b-tag type="is-success">{{user.likes.count}}</b-tag>
          </b-taglist>
        </div>
      </b-field>
    </div>
    <hr>
    <h5 class="title is-5 has-text-centered">Fotos que me gustaron</h5>
    <transition-group name="list" tag="div" class="masonry">
      <div class="masonry__item" v-for="(item, index) in plikes" :key="item.thumbnail" v-if="index < 21">
        <a href="#" class="pag-profile__photo">
          <img :src="item.thumbnail" :alt="user.username">
        </a>
      </div>
    </transition-group>
  </div>
</template>
<script>
export default {
  computed: {
    user () {
      return this.$store.getters.user
    },
    plikes () {
      const obj = this.user.likes.photos
      return Object.keys(obj).map(key => obj[key])
    }
  }
}
</script>}
<style lang="scss" scoped>
.pag-profile{
  text-align: center;
  margin-bottom: 1rem;
  margin-top: -65px;
  &__tags{
    .field{
      justify-content: center;
    }
  }
  .masonry{
    &__item{
      margin-bottom: 0;
    }
  }
}
.user-caption{
  margin-top: 1rem;
  margin-bottom: 1rem;
  &__img{
    img{
      border: 2px solid #fff;
      border-radius: 50%;
      box-shadow: 0 2px 4px rgba(#000, 0.2);
    }
  }
}
</style>

