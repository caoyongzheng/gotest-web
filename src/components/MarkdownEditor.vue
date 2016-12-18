<template lang="html">
  <div ref="container" class="container">
  </div>
</template>

<script>
import 'codemirror/lib/codemirror.css'
import CodeMirror from 'codemirror/lib/codemirror'
import 'codemirror/mode/markdown/markdown'

export default {
  name: 'MarkdownEditor',
  mounted() {
    this.editor = CodeMirror(this.$refs.container, {
      mode: 'markdown',
      addModeClass: true,
    })
    this.$refs.container.lastChild.style.height = '100%'
  },
}
</script>

<style lang="css" scoped>
  .container {
    position: relative;
    border: solid 1px #ddd;
    height: 300px;
  }
</style>
