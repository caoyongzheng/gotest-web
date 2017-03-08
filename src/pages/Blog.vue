<template lang="html">
  <Container>
    <div class="blog-list">
      <div v-for="b in blogs" class="blog depth-1">
        <router-link :to="formatEditUrl(b.id)" class="imgIcon editIcon" v-if="b.author.id === $store.getters.userId"></router-link>
        <span
          class="imgIcon deleteIcon"
          v-if="b.author.id === $store.getters.userId"
          v-on:click="delBlog(b.id)"
        />
        <router-link :to="b.id" append class="header">
          {{ b.title }}
        </router-link>
        <div class="body">
          {{ formatContent(b.content) }}
        </div>
        <div class="footer">
          <img class="avatar" :src="formatHeaderIcon(b.author.headerIcon) || headerIcon" alt="头像">
          <p>{{ b.author.username }}</p>
          <p>浏览 <span>{{ b.views }}</span></p>
          <p>更新时间 <span>{{ formatUpdate(b.update) }}</span></p>
        </div>
      </div>
    </div>
    <BlogDeleteModal ref="blogDeleteModal" />
  </Container>
</template>

<script>
import fetch2 from 'fetch2'
import notify from 'notify'
import headerIcon from '../imgs/header.png'
import editIcon from '../imgs/edit.png'
import deleteIcon from '../imgs/delete.png'
import BlogDeleteModal from '../components/BlogDeleteModal'
import Container from '../components/Container'

export default {
  name: 'Blog',
  components: { BlogDeleteModal, Container },
  mounted() {
    this.getBlogs()
  },
  data() {
    const { offset } = this.$route.query
    return {
      headerIcon,
      editIcon,
      deleteIcon,
      total: 0,
      blogs: [],
      offset: offset || 0,
    }
  },
  methods: {
    getBlogs() {
      fetch2('/blog/', {
        query: this.$route.query,
      })
      .then(res => res.json())
      .then(({ success, data, desc }) => {
        if (success) {
          this.total = data.total
          this.blogs = data.blogs
        } else {
          notify.error(desc)
        }
      })
    },
    formatContent(content) {
      return content.length > 150 ? `${content.substr(0, 150)}...` : content
    },
    formatUpdate(update) {
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
    formatHeaderIcon(icon) {
      if (icon && icon.startsWith('http://')) {
        return icon.replace('http://', 'https://')
      }
      return icon
    },
    delBlog(id) {
      this.$refs.blogDeleteModal.show(id, () => {
        this.getBlogs()
      })
    },
  },
}
</script>

<style lang="css" scoped>
  .blog-list {
    position: relative;
    margin: auto;
    width: 900px;
    max-width: 92%;
    margin-top: 40px;
  }
  .blog-list .blog {
    position: relative;
    text-align: left;
    box-sizing: border-box;
    margin-bottom: 24px;
    padding: 20px 40px;
    width: 100%;
  }
  .blog .imgIcon {
    display: inline-block;
    cursor: pointer;
    position: absolute;
    top: 10px;
    right: 10px;
    width: 25px;
    height: 25px;
    background-size: 100% 100%;
  }
  .imgIcon.editIcon {
    background-image: url('../imgs/edit.png');
  }
  .imgIcon.deleteIcon {
    background-image: url('../imgs/delete.png');
  }
  .blog .imgIcon:nth-child(2) {
    right: 40px;
    width: 25px;
    height: 25px;
  }
  .blog-list .blog .header {
    display: block;
    color: #0078c9;
    font-size: 24px;
    margin-top: 5px;
    margin-bottom: 15px;
  }
  .blog-list .blog .body {
    color: #777;
    line-height: 1.42;
  }
  .blog-list .blog .body:hover {
    color: #000;
  }
  .blog-list .blog .footer {
    margin-top: 15px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    color: #777;
  }
  .footer .avatar {
    border-radius: 50%;
    width: 30px;
    height: 30px;
    margin-right: 8px;
  }
  .footer p {
    margin: 0;
    margin-right: 15px;
    line-height: 2;
  }
  @media (max-width: 600px) {
    .blog-list .blog {
      margin-bottom: 16px;
      padding: 8px 14px;
    }
    .blog-list .blog .header {
      font-size: 20px;
    }
  }
</style>
