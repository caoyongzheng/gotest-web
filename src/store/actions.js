import fetch2 from 'fetch2'

export default {
  login(context, token = localStorage.getItem('token')) {
    return fetch2('/tokenUser', { headers: { token } })
    .then(response => response.json())
    .then((user) => {
      localStorage.setItem('token', token)
      context.commit('setUser', user || {})
      return user
    })
  },
  logout(context) {
    localStorage.removeItem('token')
    context.commit('setUser', {})
  },
}
