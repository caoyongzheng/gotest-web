<template lang="html">
  <div class="container">
    <top-header></top-header>
    <div class="body">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import TopHeader from './TopHeader'

export default {
  name: 'container',
  components: { 'top-header': TopHeader },
}
</script>

<style lang="css" scoped>
  .container {
    display: flex;
    flex-direction: column;
  }
  .body {
    flex: 1;
    overflow: auto;
  }
</style>
