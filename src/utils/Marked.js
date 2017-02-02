import marked from 'marked'

marked.setOptions({
  highlight(code) {
    require('../../node_modules/highlight.js/styles/default.css')
    return require('highlight.js').highlightAuto(code).value
  },
})

export default marked
