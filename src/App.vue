<template lang="html">
  <div class="shell">
    <top-header></top-header>
    <div class="main">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import TopHeader from './components/TopHeader'

export default {
  name: 'App',
  components: { 'top-header': TopHeader },
}
</script>

<style lang="css" scoped>
  .shell {

  }
  .main {
    display: inline-block;
    width: 100%;
  }
</style>
