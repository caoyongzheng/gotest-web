<template lang="html">
  <div class="layer" v-on:click="handleLayerClick" :class="{ hide: modalStatus === 0 }">
    <div class="container depth-4">
      <div class="header">
        <div class="item" :class="{ active: modalStatus === 1 }" v-on:click="$store.commit('setSignModal', 1)">
          登录
        </div>
        <div class="item" :class="{ active: modalStatus === 2 }" v-on:click="$store.commit('setSignModal', 2)">
          注册
        </div>
      </div>
      <div class="body" v-if="modalStatus === 1">
        <div class="form-item">
          <input type="text" name="username" v-model="username" placeholder="用户名/手机/邮箱">
        </div>
        <div class="form-item">
          <input type="password" name="password" v-model="password" placeholder="密码">
        </div>
        <button :class="{ active: active1 }" v-on:click="handleLogin" :disabled="active1">
          <span>登录</span>
          <span v-if="active1">...</span>
        </button>
      </div>
      <div class="body" v-if="modalStatus === 2">
        <div class="form-item">
          <input type="text" name="username" v-model="zUsername" placeholder="用户名/手机/邮箱">
        </div>
        <div class="form-item">
          <input type="password" name="password" v-model="zPassword" placeholder="密码">
        </div>
        <div class="form-item">
          <input type="password" name="password" v-model="zPassword2" placeholder="确认密码">
        </div>
        <button :class="{ active: active2 }" v-on:click="active2 = !active2" :disabled="active2">
          <span>登录</span>
          <span v-if="active2">...</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import notify from 'notify'
import fetch2 from 'fetch2'

export default {
  name: 'LoginModal',
  data() {
    return {
      username: '',
      password: '',
      zUsername: '',
      zPassword: '',
      zPassword2: '',
      active1: false,
      active2: false,
    }
  },
  methods: {
    handleLogin() {
      if (this.checkLoginData()) {
        this.active1 = true
        fetch2('/api/user/signin', {
          method: 'POST',
          body: JSON.stringify({ username: this.username, password: this.password }),
        })
        .then((response) => {
          this.active1 = false
          return response
        })
        .then(response => response.json())
        .then((data) => {
          if (data.success) {
            localStorage.setItem('token', data.token)
            this.$store.dispatch('getUser')
            this.$store.commit('setSignModal', 0)
          } else {
            notify.error(data.desc)
          }
        })
      }
    },
    checkLoginData() {
      if (!this.username) {
        notify.error('用户名不能为空')
        return false
      }
      if (!this.password) {
        notify.error('密码不能为空')
        return false
      }
      return true
    },
    handleLayerClick(e) {
      if (e.target === e.currentTarget) {
        this.$store.commit('setSignModal', 0)
      }
    },
  },
  computed: {
    modalStatus() {
      return this.$store.state.signStatus
    },
  },
}
</script>

<style lang="less" scoped>
  .layer {
    position: fixed;
    z-index: 9999;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.3);
    text-align: center;
    &.hide {
      display: none;
    }
    .container {
      text-align: left;
      position: relative;
      width: 320px;
      margin-left: auto;
      margin-right: auto;
      margin-top: 150px;
      background-color: #fff;
      min-height: 200px;
      padding: 10px 20px;
      .header {
        position: relative;
        font-size: 18px;
        font-weight: 700;
        border-bottom: solid 2px #eee;
        .item {
          cursor: pointer;
          padding: 10px;
          margin-bottom: -2px;
          display: inline-block;
          &.active, &:hover {
            border-bottom: solid 2px rgb(0, 188, 212);
          }
        }
      }
      .body {
        padding-top: 20px;
        .form-item {
          position: relative;
          width: 100%;
          margin-bottom: 20px;
          input {
            width: 100%;
            padding: 10px 6px;
            border: solid 1px #ddd;
            outline: none;
            box-sizing: border-box;
            border-radius: 0;
            &:focus {
              border: solid 1px rgb(0, 188, 212);
            }
          }
        }
      }
      button {
        margin-bottom: 20px;
        width: 100%;
        cursor: pointer;
        width: 100%;
        height: 45px;
        background-color: rgb(0, 188, 212);
        border: 0;
        outline: 0;
        &:hover {
          background-color: rgba(0, 188, 212, 0.8);
        }
        &.active {
          cursor: not-allowed;
          background-color: rgba(0, 188, 212, 0.6);
        }
      }
    }
  }
</style>
