<template lang="html">
  <div id="app">
    <TopHeader></TopHeader>
    <div class="placeholder"></div>
    <div class="body">
      123
    </div>
  </div>
</template>

<script>
import TopHeader from './components/TopHeader'

export default {
  name: 'App',
  components: { TopHeader },
}
</script>

<style lang="css" scoped>
  #app{
    position: relative;
  }
  .placeholder {
    width: 100%;
    height: 50px;
  }
  .body {
  }
</style>
<style lang="css">
  body{
    background-color: #FFFFFF;
    min-height: 100vh;
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
