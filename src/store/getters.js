export default {
  isLogin(state) {
    return state.user && state.user.length > 0
  },
}
