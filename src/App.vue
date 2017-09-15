<template>
  <div class="main-app">
    <tpl-default>
      <router-view></router-view>
    </tpl-default>
  </div>
</template>

<script>
import tplDefault from './layout/default'
export default {
  name: 'app',
  components: {
    tplDefault
  }
}
</script>
