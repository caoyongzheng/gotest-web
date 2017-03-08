<template lang="html">
  <Container>
    <div class="container">
      <SignForm />
    </div>
  </Container>
</template>

<script>
import SignForm from '../components/SignForm'
import Container from '../components/Container'

export default {
  name: 'SignIn',
  components: { SignForm, Container },
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
