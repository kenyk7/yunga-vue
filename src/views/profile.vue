<template>
  <div class="pag-profile">
    <div class="user-caption">
      <div class="user-caption__img">
        <img :src="user.profile_picture" :alt="user.username" class="img-circle" width="160">
      </div>
      <h2 class="title is-2">{{user.username}}</h2>
    </div>
    <div class="pag-profile__tags is-hidden">
      <b-field grouped group-multiline>
        <div class="control">
          <b-taglist attached>
            <b-tag type="is-dark">
              <b-icon icon="picture-o"></b-icon>
              Fotos
            </b-tag>
            <b-tag type="is-success">12</b-tag>
          </b-taglist>
        </div>
        <div class="control">
          <b-taglist attached>
            <b-tag type="is-dark">
              <b-icon icon="heart"></b-icon>
              Likes
            </b-tag>
            <b-tag type="is-success">11</b-tag>
          </b-taglist>
        </div>
      </b-field>
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    user () {
      return this.$store.getters.user
    }
  }
}
</script>}
<style lang="scss" scoped>
.pag-profile{
  text-align: center;
  margin-bottom: 1rem;
  &__tags{
    .field{
      justify-content: center;
    }
  }
}
.user-caption{
  margin-top: 1rem;
  margin-bottom: 1rem;
  &__img{
    img{
      border-radius: 50%;
    }
  }
}
</style>

