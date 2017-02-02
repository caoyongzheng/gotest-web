<template lang="html">
  <div class="container">
    <top-header></top-header>
    <div class="body">
      <div v-if="!!blog.id" class="blog depth-1">
        <router-link tag="img" :to="formatEditUrl(blog.id)" :src="editIcon" class="imgIcon" v-if="blog.author.id === $store.getters.userId"></router-link>
        <router-link tag="img" :to="formatEditUrl(blog.id)" :src="deleteIcon" class="imgIcon" v-if="blog.author.id === $store.getters.userId"></router-link>
        <div class="blog-header">
          {{ blog.title }}
        </div>
        <div class="blog-body markdown-body" v-html="getContent(blog.content)">
        </div>
        <div class="blog-footer">
          <img :src="(blog.author.headerIcon) || headerIcon" class="avatar" alt="作者头像">
          <p>{{ blog.author.username }}</p>
          <p>浏览 <span>{{ blog.views }}</span></p>
          <p>更新时间 <span>{{ getUpdate(blog.update) }}</span></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import fetch2 from 'fetch2'
import marked from 'marked2'
import 'github-markdown-css'
import headerIcon from '../imgs/header.png'
import editIcon from '../imgs/edit.png'
import deleteIcon from '../imgs/delete.png'

export default {
  name: 'BlogView',
  created() {
    this.fetchBlog()
  },
  data() {
    return {
      headerIcon,
      deleteIcon,
      editIcon,
      blog: {},
    }
  },
  methods: {
    fetchBlog() {
      const { blogId } = this.$route.params
      fetch2(`/blog/${blogId}`)
      .then(res => res.json())
      .then(({ success, data }) => {
        if (success) {
          this.blog = data
          this.updateViews()
        } else {
          this.$router.replace('/NotFound')
        }
      })
    },
    updateViews() {
      const { blogId } = this.$route.params
      fetch2(`/blog/${blogId}/viewtimes`, {
        method: 'PUT',
      })
    },
    getContent(content = '') {
      return marked(content)
    },
    getUpdate(update) {
      const date = new Date(update)
      const now = new Date()
      let year = ''
      if (now.getYear() > date.getYear()) {
        year = `${now.getYear()}年`
      }
      return `${year}${date.getMonth() + 1}月${date.getDate()}日`
    },
    formatEditUrl(blogId) {
      return `/blog/${blogId}/edit`
    },
  },
}
</script>

<style lang="css" scoped>
  .container, .body {
    width: 100%;
  }
  .blog {
    position: relative;
    width: 900px;
    max-width: 90%;
    margin: 40px auto 20px;
  }
  .imgIcon {
    cursor: pointer;
    position: absolute;
    top: 10px;
    right: 10px;
    width: 25px;
    height: 25px;
  }
  .blog .imgIcon:nth-child(2) {
    right: 40px;
    width: 25px;
    height: 25px;
  }
  .blog-header {
    padding: 25px 40px 20px;
    font-size: 24px;
  }
  .blog-body {
    overflow: auto;
    padding: 0px 40px 15px;
  }
  .blog-footer {
    position: relative;
    padding: 0 40px;
    line-height: 60px;
    background: #f3f6f7;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }
  .blog-footer p {
    margin: 0;
    margin-right: 20px;
  }
  .blog-footer .avatar {
    border-radius: 50%;
    width: 30px;
    height: 30px;
    margin-right: 7px;
  }
</style>
