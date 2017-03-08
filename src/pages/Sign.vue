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
    padding-top: 100px;
    margin: auto;
    display: flex;
    justify-content: center;
  }
</style>
