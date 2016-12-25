<template lang="html">
  <div ref="container" class="container">
    <div class="header">
      <img :src="getIcon()" alt="icon" class="icon" v-on:click="toggle">
    </div>
    <div class="previewPanel markdown-body" :class="{ hide: isEdit }" v-html="html">
    </div>
  </div>
</template>

<script>
import 'codemirror/lib/codemirror.css'
import CodeMirror from 'codemirror/lib/codemirror'
import 'codemirror/mode/markdown/markdown'
import marked from 'marked'
import 'github-markdown-css'
import editIcon from '../imgs/edit.png'
import previewIcon from '../imgs/preview.png'

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
  },
  data() {
    return {
      isEdit: true,
      html: '',
    }
  },
  methods: {
    toggle() {
      if (this.isEdit) {
        this.html = marked(this.getValue() || '')
        this.isEdit = false
        this.codemirrorEl.classList.add('hide')
      } else {
        this.isEdit = true
        this.codemirrorEl.classList.remove('hide')
        this.editor.focus()
        this.editor.setCursor(this.editor.lineCount(), 0)
      }
    },
    getIcon() {
      return this.isEdit ? previewIcon : editIcon
    },
    getValue() {
      return this.editor.getValue()
    },
    setValue(value) {
      return this.editor.setValue(value)
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
    cursor: pointer;
    width: 25px;
    height: 25px;
    vertical-align: middle;
  }
  .previewPanel {
    min-height: 300px;
  }
  .CodeMirror {
    height: 300px;
  }
  .CodeMirror, .previewPanel {
    border: solid 1px #ddd;
  }
  .CodeMirror-focused {
    border-color: rgb(0, 188, 212);
  }
  .hide {
    display: none;
  }
</style>
