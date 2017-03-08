<template lang="html">
  <nav class="top-header depth-1 theme-bgcolor-primary">
    <div class="m-wrap">
      <div class="left">
        <router-link class="item" to="/">
          首页
        </router-link>
        <router-link class="item" to="/blog">
          博文
        </router-link>
      </div>
      <div class="right">
        <router-link class="item" v-if="!isLogin" to="/sign#in">
          登录
        </router-link>
        <router-link class="item" v-if="!isLogin" to="/sign#up">
          注册
        </router-link>
        <div class="item" v-if="isLogin">
          <div class="avatar" v-bind:style="avatarStyle">
            <input type="file" v-on:change="uploadAvatar">
          </div>
        </div>
        <div class="item user" v-if="isLogin">
          <div>
            <span>{{ $store.state.user.username }}</span>
          </div>
          <ul class="depth-1">
            <router-link to="/blog/new" tag="li">新建博文</router-link>
            <li v-on:click="logout">注销</li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import fetch2 from 'fetch2'
import notify from 'notify'

export default {
  name: 'TopHeader',
  methods: {
    logout() {
      this.$store.dispatch('logout')
    },
    uploadAvatar(e) {
      const file = e.target.files[0]
      if (file) {
        // check file type
        if (file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'iamge/gif') {
          const form = new FormData()
          form.append('image', file)
          this.uploading = true
          fetch('https://image.caoyongzheng.com', {
            method: 'post',
            body: form,
          }).then((res) => {
            this.uploading = false
            return res.json()
          }).then(({ success, name, error }) => {
            if (success) {
              this.setUserHeaderIcon(`https://image.caoyongzheng.com?n=${name}`)
            } else {
              notify.error(error)
            }
          })
        } else {
          notify.warn(`not support type ${file.type}`)
        }
      }
    },
    setUserHeaderIcon(url) {
      fetch2('/user/headerIcon', {
        method: 'PUT',
        body: JSON.stringify({ headerIcon: url }),
      })
      .then(res => res.json())
      .then(({ success }) => {
        if (success) {
          this.$store.commit('setHeaderIcon', url)
        }
      })
    },
  },
  computed: {
    isLogin() {
      return this.$store.getters.isLogin
    },
    avatarStyle() {
      const { headerIcon } = this.$store.state.user
      if (headerIcon) {
        if (headerIcon.startsWith('https://')) {
          return { backgroundImage: `url(${headerIcon})` }
        }
        return { backgroundImage: `url(${headerIcon.replace('http://', 'https://')})` }
      }
      return { color: 'red' }
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
    background-color: rgb(0, 188, 212);
  }
  .m-wrap {
    position: relative;
    margin: auto;
    max-width: 900px;
    height: 100%;
  }
  .left,.right {
    height: 50px;
  }
  .left {
    float: left;
  }
  .right {
    float: right;
  }
  .left > .item {
    margin-right: 10px;
  }
  .right > .item {
    margin-left: 10px;
  }
  .item {
    line-height: 50px;
    height: 100%;
    width: auto;
    position: relative;
    cursor: pointer;
    display: inline-block;
  }
  .user div {
    height: 100%;
    max-width: 100px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow-x: hidden;
  }
  .item .avatar {
    position: relative;
    margin-top: 7px;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background-position: center;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-image: url('../imgs/header.png');
  }
  .avatar input {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    opacity: 0;
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
    width: 110px;
  }
  .item.user {
    margin-left: 2px;
  }
  .user ul li {
    height: 45px;
    line-height: 45px;
  }
  .user ul li:hover {
    background-color: rgba(0, 0, 0, 0.06);
  }
  .user:hover ul {
    display: block;
  }
</style>
