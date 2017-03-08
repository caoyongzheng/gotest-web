<template lang="html">
  <div ref="container" class="container">
    <div class="header">
      <i type="file" class="icon imageIcon">
        <input type="file" accept="image/gif,image/jpeg,image/png" v-on:change="onFileChange" />
      </i>
      <i class="icon" :class="toggleClass" v-on:click="toggle" />
    </div>
    <div class="previewPanel markdown-body" :class="{ hide: isEdit }" v-html="html">
    </div>
  </div>
</template>

<script>
import 'codemirror/lib/codemirror.css'
import CodeMirror from 'codemirror/lib/codemirror'
import 'codemirror/mode/markdown/markdown'
import marked2 from 'marked2'
import notify from 'notify'

export default {
  name: 'MarkdownEditor',
  mounted() {
    this.editor = CodeMirror(this.$refs.container, {
      mode: 'markdown',
      addModeClass: true,
      lineNumbers: true,
    })
    const container = this.$refs.container
    this.codemirrorEl = container.querySelector('.CodeMirror')
    Object.keys(container.attributes).forEach((i) => {
      const name = container.attributes[i].name
      if (name.startsWith('data-v')) {
        this.codemirrorEl.setAttribute(name, '')
      }
    })
    this.editor.on('drop', (editor, e) => {
      this.imageUpload(e.dataTransfer.files)
    })
  },
  data() {
    return {
      isEdit: true,
      uploading: false,
      html: '',
    }
  },
  methods: {
    toggle() {
      if (this.isEdit) {
        this.html = marked2(this.getValue())
        this.isEdit = false
        this.codemirrorEl.classList.add('hide')
      } else {
        this.isEdit = true
        this.codemirrorEl.classList.remove('hide')
        this.editor.focus()
        this.editor.setCursor(this.editor.lineCount(), 0)
      }
    },
    onFileChange(e) {
      this.imageUpload(e.target.files)
    },
    imageUpload(files) {
      const file = files[0]
      if (file) {
        // check file type
        if (file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'iamge/gif') {
          const form = new FormData()
          form.append('image', file)
          this.uploading = true
          fetch('http://image.caoyongzheng.com', {
            method: 'post',
            body: form,
          }).then((res) => {
            this.uploading = false
            return res.json()
          }).then(({ success, name, error }) => {
            if (success) {
              this.setValue(`${this.getValue()}![描述](http://image.caoyongzheng.com?n=${name})`)
            } else {
              notify.error(error)
            }
          })
        } else {
          notify.warn(`not support type ${file.type}`)
        }
      }
    },
    getValue() {
      return this.editor.getValue()
    },
    setValue(value) {
      return this.editor.setValue(value)
    },
  },
  computed: {
    toggleClass() {
      return this.isEdit ? 'previewIcon' : 'editIcon'
    },
  },
}
</script>

<style lang="css" scoped>
  .container {
    position: relative;
    height: auto;
  }
  .header {
    width: 100%;
    height: 40px;
    line-height: 40px;
    text-align: right;
  }
  .icon {
    display: inline-block;
    cursor: pointer;
    width: 25px;
    height: 25px;
    vertical-align: middle;
    background-position: center;
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
  .imageIcon {
    overflow: hidden;
    position: relative;
    background-image: url('../imgs/imageIcon.png');
  }
  .imageIcon input {
    cursor: pointer;
    opacity: 0;
    display: block;
  }
  .editIcon {
    background-image: url('../imgs/edit.png');
  }
  .previewIcon {
    background-image: url('../imgs/preview.png');
  }
  .previewPanel {
    min-height: 300px;
  }
  .CodeMirror {
    height: 300px;
  }
  .CodeMirror {
    border: solid 1px #ddd;
  }
  .CodeMirror-focused {
    border-color: rgb(0, 188, 212);
  }
  .hide {
    display: none;
  }
</style>
