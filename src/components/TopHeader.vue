<template lang="html">
  <div class="wrap">
    <nav class="top-header depth-1 theme-bgcolor-primary">
      <div class="left">
      </div>
      <div class="right">
        <router-link class="item" v-if="!isLogin" to="/sign#in">
          登录
        </router-link>
        <router-link class="item" v-if="!isLogin" to="/sign#up">
          注册
        </router-link>
        <div class="item user" v-if="isLogin">
          <div>{{ $store.state.user.username }}</div>
          <ul class="depth-2">
            <li v-on:click="logout">注销</li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>

export default {
  name: 'TopHeader',
  methods: {
    logout() {
      this.$store.dispatch('logout')
    },
  },
  computed: {
    isLogin() {
      return this.$store.getters.isLogin
    },
  },
}

</script>

<style lang="css" scoped>
  .wrap {
    position: relative;
    height: 50px;
    width: 100%;
  }
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
    position: relative;
    cursor: pointer;
    margin: 0 5px;
    display: inline-block;
  }
  .user div {
    max-width: 100px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow-x: hidden;
  }
  .user ul {
    display: none;
    text-align: center;
    margin: 0;
    padding: 0;
    overflow: hidden;
    position: absolute;
    list-style: none;
    right: 0;
    width: 100px;
  }
  .user ul li {
    height: 45px;
    line-height: 45px;
  }
  .user:hover ul {
    display: block;
  }
</style>
