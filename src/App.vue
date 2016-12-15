<template lang="html">
  <div id="app">
    <TopHeader></TopHeader>
    <div class="body">
      <router-view></router-view>
    </div>
    <SignModal></SignModal>
  </div>
</template>

<script>
import TopHeader from './components/TopHeader'
import SignModal from './components/SignModal'

export default {
  name: 'App',
  components: { TopHeader, SignModal },
}
</script>

<style lang="css" scoped>
  #app{
    position: relative;
  }
  .body {
  }
</style>
