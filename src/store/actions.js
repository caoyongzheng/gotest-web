import fetch2 from 'fetch2'

export default {
  getUser(context) {
    return fetch2('/api/user/sessionuser')
    .then(response => response.json())
    .then((user) => {
      context.commit('setUser', user || {})
      return user
    })
  },
  login() {

  },
  logout() {

  },
}
