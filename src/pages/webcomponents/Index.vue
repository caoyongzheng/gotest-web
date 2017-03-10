<template lang="html">
  <conatiner>
    <div class="web-components">
      <ul class="list depth-1">
        <router-link tag="li" to="/webcomponents/progressbar" class="link">进度条</router-link>
      </ul>
      <div class="router-view">
        <router-view></router-view>
      </div>
    </div>
  </conatiner>
</template>

<script>
import conatiner from '../../components/Container'

export default {
  name: 'web-components',
  components: { conatiner },
}
</script>

<style lang="css" scoped>
  .web-components {
    position: absolute;
    left: 0;
    bottom: 0;
    top: 50px;
    right: 0;
    display: flex;
  }
  .list {
    margin: 0;
    padding: 10px 0;
    width: 256px;
    position: inline-block;
    position: relative;
  }
  .link {
    cursor: pointer;
    list-style: none;
    height: 48px;
    line-height: 48px;
    padding: 0 16px;
    width: 100%;
  }
  .link:hover {
    background-color: rgba(0, 0, 0, 0.08);
  }
  .router-view {
    flex: 1;
  }
  .router-link-active {
    background-color: rgba(0, 0, 0, 0.15);
  }
</style>
