<template lang="html">
  <div class="container">
    <top-header></top-header>
    <div class="form">
      <input class="form-title" type="text" name="" value="" placeholder="标题">
      <markdown-editor ref="editorCom"></markdown-editor>
      <button type="button" class="add" :disabled="active">新增</button>
    </div>
  </div>
</template>

<script>
import MarkdownEditor from '../components/MarkdownEditor'

export default {
  name: 'BlogNew',
  mounted() {
  },
  data() {
    return {
      active: false,
    }
  },
  components: { 'markdown-editor': MarkdownEditor },
}
</script>

<style lang="css" scoped>
  .form {
    margin: 40px auto;
    width: 900px;
    max-width: 96%;
  }
  .form-title {
    margin-bottom:25px;
  }
  .add {
    margin-top: 20px;
  }
</style>
