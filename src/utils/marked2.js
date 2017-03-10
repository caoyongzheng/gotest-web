import 'github-markdown-css'
import 'highlight.js/styles/default.css'
import marked from 'marked'

marked.setOptions({
  highlight(code) {
    return require('highlight.js').highlightAuto(code).value
  }
})

export default marked
