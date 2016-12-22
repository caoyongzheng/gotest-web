<template lang="html">
  <div class="container">
    <top-header></top-header>
    <div class="form">
      <input class="form-title" type="text" v-model="title" placeholder="标题">
      <markdown-editor ref="editorCom"></markdown-editor>
      <button type="button" class="add" :disabled="active" v-on:click="addBlog">新增</button>
    </div>
  </div>
</template>

<script>
import fetch2 from 'fetch2'
import MarkdownEditor from '../components/MarkdownEditor'

export default {
  name: 'BlogNew',
  mounted() {
  },
  data() {
    return {
      title: '',
      active: false,
    }
  },
  methods: {
    addBlog() {
      const postData = {
        title: this.title,
        content: this.$refs.editorCom.getValue(),
      }
      if (!this.verifyPostData(postData)) {
        return
      }
      if (this.active) {
        return
      }
      fetch2('/blog', {
        methods: 'POST',
        body: JSON.stringify({ title: this.title, content: this.$refs.editorCom.getValue() })
      }).then((response) => {
        this.active = false
        return response
      })
    },
    verifyPostData({ title, content }) {
      if (!title) {
        notify.error('标题不能为空！')
        return false
      }
      if (!content) {
        notify.error('内容不能为空！')
        return false
      }
      return true
    },
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
