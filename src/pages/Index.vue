<template lang="html">
  <Container>
    <section class="body">
      <div class="links">
        <router-link to="blog" class="link depth-1">博文</router-link>
        <router-link to="webcomponents" class="link depth-1">组件</router-link>
      </div>
    </section>
  </Container>
</template>

<script>
import Container from '../components/Container'

export default {
  name: 'Index',
  components: { Container },
}
</script>

<style lang="css" scoped>
  .body {
    position: relative;
    width: 100%;
    text-align: center;
  }
  .links {
    margin: auto;
    display: flex;
    padding: 40px 72px;
    width: 500px;
    max-width: 80%;
    align-items: center;
    justify-content: space-between;
  }
  .link {
    width: 120px;
    height: 120px;
    line-height: 120px;
    font-size: 30px;
  }
  .link:hover {
    background-color: rgba(0, 0, 0, 0.08);
  }
</style>
