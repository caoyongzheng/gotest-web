<template lang="html">
  <div class="container">
    <SignForm />
  </div>
</template>

<script>
import SignForm from '../components/SignForm'

export default {
  name: 'SignIn',
  components: { SignForm },
}
</script>

<style lang="css" scoped>
  .container {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
