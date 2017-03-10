<template lang="html">
  <div class="progressbar">
    <div class="progress-inner" :style="innerStyle"></div>
  </div>
</template>

<script>

export default {
  name: 'progressbar',
  props: {
    progress: {
      type: Number,
      default: 0,
      validator: v => (v >= 0 && v <= 100)
    },
    color: {
      type: String,
      default: '#5cb85c',
    }
  },
  computed: {
    innerStyle() {
      return {
        width: `${this.progress}%`,
        backgroundColor: this.color,
      }
    }
  }
}
</script>

<style lang="css">
 .progressbar {
   position: relative;
   display: inline-block;
   width: 100%;
   height: 20px;
   background-color: #ddd;
   border-radius: 2px;
   overflow: hidden;
 }
 .progress-inner {
   width: 0;
   height: 100%;
   background-image: linear-gradient(45deg,rgba(255,255,255, 0.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255, 0.15) 50%,rgba(255,255,255, 0.15) 75%,transparent 75%,transparent);
   background-size: 40px 40px;
   background-position: 0;
   animation-name: bgposition;
   animation-duration: 25000ms;
   animation-timing-function: linear;
   animation-iteration-count: infinite;
 }
 @keyframes bgposition {
   0% {
     background-position: 0px;
   }
   100% {
     background-position: 800px;
   }
 }
</style>
