<template lang="html">
  <div class="conatiner">
    <div class="placeholder"></div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Conatiner'
}
</script>

<style lang="css" scoped>
  .placeholder {
    height: 50px;
    width: 100%;
  }
</style>
