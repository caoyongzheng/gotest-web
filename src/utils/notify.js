import './notify.css'

class Notify {
  constructor() {
    this.container = document.createElement('div')
    this.container.classList.add('notify-container')
    document.body.appendChild(this.container)
    this.targets = []
  }
  success = (msg, duration) => this.show('success', msg, duration)
  info = (msg, duration) => this.show('info', msg, duration)
  warn = (msg, duration) => this.show('warn', msg, duration)
  error = (msg, duration) => this.show('error', msg, duration)
  show = (type = 'success', msg = '', duration) => {
    const target = document.createElement('div')
    let index = -1
    const len = this.targets.length
    for (let i = 0; i < len; i += 1) {
      if (!this.targets[i]) {
        index = i
        break
      }
    }
    if (index === -1) {
      index = this.targets.length
    }
    target.appendChild(document.createTextNode(msg))
    target.classList.add('notify-target')
    target.classList.add(type)
    target.style.top = `${((index + 1) * 55) - 45}px`
    this.container.appendChild(target)
    this.targets[index] = true
    this.remove(target, index, duration)
    return target
  }
  remove = (target, index, duration = 3000) => {
    setTimeout(() => {
      target.classList.add('hide')
      setTimeout(() => {
        this.container.removeChild(target)
        this.targets[index] = false
      }, 500)
    }, duration)
  }
}

export default new Notify()
