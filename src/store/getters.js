export default {
  isLogin(state) {
    return state.user && state.user.userId
  },
}
