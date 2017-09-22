<template>
  <div class="card-photo">
    <a href="#" @click.prevent="" class="card-photo__user">
      <img src="https://avatars.io/twitter/kenyk7" alt="Kenyk7" width="35" height="35">
      <h5>Kenyk7</h5>
    </a>
    <div class="card-photo__img image">
      <slot></slot>
    </div>
    <div class="card-photo__actions">
      <div left>
        <a class="button">
          <b-icon icon="heart" class="is-danger"></b-icon>
          <span>9</span>
        </a>
        <span>&nbsp;</span>
        <b-dropdown hoverable position="is-top-right">
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
        <a class="button" :href="photo.src" target="_blank">
          <b-icon icon="external-link"></b-icon>
        </a>
        <span>&nbsp;</span>
        <a class="button" :href="photo.src" target="_blank">
          <b-icon icon="download"></b-icon>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    photo: {
      type: Object,
      default () {
        return {}
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.card-photo{
  position: relative;
  &:hover{
    .card-photo__user{
      opacity: 1;
    }
    .card-photo__actions{
      opacity: 0.9;
    }
  }
  .button{
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
    padding: 10px 15px;
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

