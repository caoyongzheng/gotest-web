<template lang="html">
  <div id="app">
    <TopHeader></TopHeader>
    <div class="body">
      123
    </div>
    <SignModal></SignModal>
  </div>
</template>

<script>
import TopHeader from './TopHeader'
import SignModal from './SignModal'

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
<style lang="css">
  body{
    background-color: #FFFFFF;
    min-height: 100vh;
    -webkit-transform-style: preserve-3d;
    -webkit-backface-visibility: hidden;
  }
  html, body, form, fieldset, p, div, h1, h2, h3, h4, h5, h6 {
    -webkit-text-size-adjust:none;
  }
  input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0px 1000px white inset;
  }
  input{
    -webkit-appearance:none;
  }
  * {
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }
  .depth-1,
  .depth-2,
  .depth-3,
  .depth-4,
  .depth-5 {
      display: inline-block;
      color: black;
      background-color: #fff;
      border-radius: 2px;
  }

  .depth-1 {
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.12), 0 1px 4px rgba(0, 0, 0, 0.12);
  }

  .depth-2 {
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.16), 0 3px 10px rgba(0, 0, 0, 0.23);
  }

  .depth-3 {
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.19), 0 6px 10px rgba(0, 0, 0, 0.23);
  }

  .depth-4 {
    box-shadow: 0 14px 45px rgba(0, 0, 0, 0.25), 0 10px 18px rgba(0, 0, 0, 0.22);
  }

  .depth-5 {
    box-shadow: 0 19px 60px rgba(0, 0, 0, 0.30), 0 15px 20px rgba(0, 0, 0, 0.22);
  }
</style>
