<template>
  <div class="tpl-default">
    <app-header></app-header>
    <main class="main-body">
      <div class="container">
        <slot></slot>
      </div>
    </main>
    <app-footer></app-footer>
  </div>
</template>

<script>
import appHeader from './default/header'
import appFooter from './default/footer'

export default {
  components: {
    appHeader,
    appFooter
  }
}
</script>

<style>
.main-body{
  padding: 1rem;
}
</style>
