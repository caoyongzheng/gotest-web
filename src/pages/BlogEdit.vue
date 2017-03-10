<template lang="html">
  <Container>
    <div class="form">
      <input class="form-title" type="text" v-model="title" placeholder="标题">
      <markdown-editor :value="value" v-on:requestValueChange="onValue"></markdown-editor>
      <button type="button" class="btn btn-primary btn-fullwidth submit" :disabled="active" v-on:click="editBlog">修改</button>
    </div>
  </Container>
</template>

<script>
import fetch2 from 'fetch2'
import notify from 'notify'
import Container from '../components/Container'

const MarkdownEditor = () => import('../components/MarkdownEditor')

export default {
  name: 'BlogEdit',
  mounted() {
    this.getBlog()
  },
  data() {
    return {
      title: '',
      active: false,
      value: '',
    }
  },
  methods: {
    getBlog() {
      const { blogId } = this.$route.params
      fetch2(`/blog/${blogId}`)
      .then(res => res.json())
      .then(({ success, data }) => {
        if (success) {
          this.title = data.title
          this.value = data.content
        } else {
          this.$router.replace('/NotFound')
        }
      })
    },
    editBlog() {
      const postData = {
        title: this.title,
        content: this.value,
      }
      if (!this.verifyPostData(postData)) {
        return
      }
      if (this.active) {
        return
      }
      const { blogId } = this.$route.params
      fetch2(`/blog/${blogId}`, {
        method: 'PUT',
        body: JSON.stringify({
          id: blogId,
          ...postData,
        }),
      }).then((response) => {
        this.active = false
        return response
      })
      .then(response => response.json())
      .then(({ success, msg }) => {
        if (success) {
          this.$router.push(`/blog/${blogId}`)
        } else {
          notify.error(msg)
        }
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
    onValue(v) {
      this.value = v
    },
  },
  components: { 'markdown-editor': MarkdownEditor, Container },
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
  .submit {
    margin-top: 20px;
  }
</style>
