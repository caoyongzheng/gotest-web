import 'whatwg-fetch'
import notify from 'notify'

const production = process.env.NODE_ENV === 'production'

const Host = production ? 'http://www.caoyongzheng.com' : 'http://localhost:3000'

function queryParams(params) {
  return Object.keys(params)
    .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
    .join('&')
}

function isUrlRelative(url) {
  if (url.substr(0, 4) === 'http') {
    return false
  }
  return true
}

function fetch2(url, options = {}) {
  const urlParse = document.createElement('a')
  if (isUrlRelative(url)) {
    urlParse.href = `${Host}${url}`
  } else {
    urlParse.href = url
  }
  const { headers, qp, ...others } = options
  const computedOptions = {
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      token: localStorage.getItem('token'),
      ...(headers || {}),
    },
    ...others,
  }
  if (qp) {
    urlParse.search += `${urlParse.search ? '&' : ''}${queryParams(qp)}`
  }
  return fetch(urlParse.href, computedOptions)
  .then((response) => {
    if (response.status >= 200 && response.status < 300) {
      return response
    }
    const error = new Error(response.statusText)
    error.response = response
    throw error
  })
  .catch((error) => {
    if (error.response) {
      notify.error(`${error.response.status}:${error.message}`)
    } else {
      notify.error(error.message)
    }
  })
}

export default fetch2
