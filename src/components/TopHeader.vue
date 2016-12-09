<template lang="html">
  <nav class="top-header depth-1">
    <div class="left">

    </div>
    <div class="right">
      <div class="item" v-if="!isLogin">
        登录
      </div>
      <div class="item" v-if="!isLogin">
        注册
      </div>
      <div class="item user" v-if="isLogin">
        
      </div>
    </div>
  </nav>
</template>

<script>

export default {
  name: 'TopHeader',
  computed: {
    isLogin() {
      return this.$store.getters.isLogin
    },
  },
}

</script>

<style lang="css" scoped>
  .top-header {
    position: fixed;
    z-index: 999;
    top: 0;
    left: 0;
    right: 0;
    height: 50px;
    line-height: 50px;
    width: 100%;
    background-color: rgb(0, 188, 212);
  }
  .left {
    float: left;
    margin-left: 16px;
  }
  .right {
    float: right;
    margin-right: 24px;
  }
  .item {
    margin: 0 5px;
    display: inline-block;
  }
</style>
