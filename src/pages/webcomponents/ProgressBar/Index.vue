<template lang="html">
  <div class="progressbar-demo">
    <div class='wrap'>
      <progressbar :progress="90"></progressbar>
    </div>
    <div class='wrap'>
      <progressbar :progress="60" color="#5bc0de"></progressbar>
    </div>
    <div class='wrap'>
      <progressbar :progress="70" color="#f0ad4e"></progressbar>
    </div>
    <div class='wrap'>
      <progressbar :progress="80" color="#d9534f"></progressbar>
    </div>
  </div>
</template>

<script>
import ProgressBar from './ProgressBar'

export default {
  name: 'progressbar-page',
  components: { progressbar: ProgressBar }
}
</script>

<style lang="css" scoped>
  .wrap {
    margin: 40px auto;
    width: 200px;
  }
</style>
