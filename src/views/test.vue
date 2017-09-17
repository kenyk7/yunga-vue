<template>
  <main>
    <div class="preview-img-list">
      <img class="preview-img-item" width="200" v-for="(item, index) in items"
      :src="item.src" @click="$photoswipe.open(index, items)">
    </div>
  </main>
</template>
<script>
export default {
  name: 'test',
  data () {
    return {
      items: [{
        src: 'https://unsplash.it/2000/1500',
        w: 2000,
        h: 1500
      }, {
        src: 'https://unsplash.it/2000/1500',
        w: 2000,
        h: 1500
      }, {
        src: 'https://unsplash.it/2000/1500',
        w: 2000,
        h: 1500
      }]
    }
  }
}
</script>

<style>

main {
  text-align: center;
}

.preview-img-list {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}
.preview-img-item {
  margin: 5px;
  max-width: 300px;
  max-height: 300px;
}
</style>
