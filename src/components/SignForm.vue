<template lang="html">
  <section class="form depth-1">
    <section class="header">
      <div class="header-tabs">
        <router-link class="header-tab" to="#in" replace>
          登录
          <div class="cursor" :class="{ first: isSignIn }"></div>
        </router-link>
        <router-link class="header-tab" to="#up" replace>
          注册
        </router-link>
      </div>
    </section>
    <section class="body in" :class="{ hide: !isSignIn }">
      <div class="form-item">
        <input type="text" name="username" v-model="signin.username" placeholder="用户名">
      </div>
      <div class="form-item">
        <input type="text" name="password" v-model="signin.password" placeholder="密码">
      </div>
    </section>
    <section class="body up" :class="{ hide: isSignIn }">
      <div class="form-item">
        <input type="text" name="username" v-model="signup.username" placeholder="用户名">
      </div>
      <div class="form-item">
        <input type="text" name="password" v-model="signup.password" placeholder="密码">
      </div>
      <div class="form-item">
        <input type="text" name="password" v-model="signup.password2" placeholder="确认密码">
      </div>
    </section>
    <section class="footer">
      <button type="button" v-if="isSignIn" v-on:click="handleSignIn" :disabled="signin.active">登录</button>
      <button type="button" v-if="!isSignIn" v-on:click="handleSignUp" :disabled="signup.active">注册</button>
    </section>
  </section>
</template>

<script>
import notify from 'notify'
import fetch2 from 'fetch2'

export default {
  name: 'SignForm',
  data() {
    return {
      signin: {
        username: '',
        password: '',
        active: false,
      },
      signup: {
        username: '',
        password: '',
        password2: '',
        active: false,
      },
    }
  },
  methods: {
    handleSignIn() {
      if (this.checkSignInData()) {
        this.signin.active = true
        fetch2('/api/user/signin', {
          method: 'POST',
          body: JSON.stringify({ username: this.signin.username, password: this.signin.password }),
        })
        .then((response) => {
          this.signin.active = false
          return response
        })
        .then(response => response.json())
        .then((data) => {
          if (data.success) {
            this.$store.dispatch('login', data.token)
            .then(() => {
              if (history.length <= 2) {
                this.$router.replace('/')
              } else {
                this.$router.go(-1)
              }
            })
          } else {
            notify.error(data.desc)
          }
        })
      }
    },
    checkSignInData() {
      if (!this.signin.username) {
        notify.error('用户名不能为空')
        return false
      }
      if (!this.signin.password) {
        notify.error('密码不能为空')
        return false
      }
      return true
    },
    handleSignUp() {
      if (this.checkSignUpData()) {
        this.signup.active = true
        fetch2('/api/user/signup', {
          method: 'POST',
          body: JSON.stringify({ username: this.signup.username, password: this.signup.password }),
        })
        .then((response) => {
          this.signup.active = false
          return response
        })
        .then(response => response.json())
        .then((data) => {
          if (data.success) {
            this.$store.dispatch('login')
            .then(() => {
              if (history.length <= 2) {
                this.$router.replace('/')
              } else {
                this.$router.go(-1)
              }
            })
          } else {
            notify.error(data.desc)
          }
        })
      }
    },
    checkSignUpData() {
      if (!this.signup.username) {
        notify.error('用户名不能为空')
        return false
      }
      if (!this.signup.password) {
        notify.error('密码不能为空')
        return false
      }
      if (this.signup.password2 !== this.signup.password) {
        notify.error('确认密码与密码不一致')
        return false
      }
      return true
    },
  },
  computed: {
    isSignIn() {
      return this.$route.hash === '#in'
    },
  },
}
</script>

<style lang="css" scoped>
  .form {
    position: relative;
    width: 350px;
    max-width: 90%;
    padding-bottom: 15px;
  }
  .header {
    padding: 8px 0;
    position: relative;
    text-align: center;
  }
  .header-tabs {
    position: relative;
    display: inline-block;
  }
  .header-tab {
    position: relative;
    display: inline-block;
    height: 40px;
    line-height: 40px;
    font-size: 20px;
    padding: 0 8px;
    margin: 0 12px;
  }
  .cursor {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 2px;
    width: 100%;
    background-color: rgb(0, 188, 212);
    transition: transform 100ms ease-in-out;
    transform: translateX(84px);
  }
  .cursor.first {
    transform: translateX(0);
  }
  .body, .footer {
    margin: 15px 20px;
  }
  .form-item {
    margin: 10px 0;
  }
  @media (max-width: 400px) {
    .body, .footer {
      margin: 10px 15px;
    }
  }
</style>
