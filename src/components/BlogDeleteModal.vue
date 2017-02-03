<template lang="html">
  <div class="m-blogDeleteModal depth-1" v-show="isShow">
    <div class="header">
      是否删除博文？
    </div>
    <div class="body">
      注意：该操作将导致博文不可恢复！
    </div>
    <div class="footer">
      <div class="placeholder"></div>
      <button type="button" name="button" style="margin-right: 14px;" class="btn" v-on:click="hide">取消</button>
      <button type="button" name="button" class="btn btn-danger btn btn-delete" v-on:click="handleDelete">删除</button>
    </div>
  </div>
</template>

<script>
import fetch2 from 'fetch2'
import notify from 'notify'

export default {
  name: 'BlogDeleteModal',
  data() {
    return {
      isShow: false,
      blogId: '',
    }
  },
  methods: {
    show(blogId, cb) {
      this.isShow = true
      this.blogId = blogId
      this.cb = cb
    },
    hide() {
      this.isShow = false
      this.blogId = ''
    },
    handleDelete() {
      fetch2('/blog', {
        method: 'delete',
        query: {
          blogId: this.blogId,
        },
      }).then(res => res.json())
      .then(({ success, desc }) => {
        if (success) {
          notify.success(desc)
          if (this.cb) {
            this.cb()
          } else {
            this.$router.push('/blog')
          }
          this.hide()
        } else {
          notify.error(desc)
        }
      })
    },
  },
}
</script>

<style lang="css" scoped>
  .m-blogDeleteModal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 360px;
  }
  .header {
    font-size: 24px;
    font-weight: bold;
    padding: 20px 20px 10px;
  }
  .body {
    padding: 8px 20px;
  }
  .placeholder {
    flex: 1;
    height: 100%;
  }
  .footer {
    display: flex;
    padding: 15px 20px;
  }
</style>
