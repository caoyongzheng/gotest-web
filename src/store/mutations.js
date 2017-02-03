export default {
  setUser(state, user) {
    state.user = user
  },
  setSignModal(state, signStatus) {
    state.signStatus = signStatus
  },
  setHeaderIcon(state, headerIcon) {
    state.user.headerIcon = headerIcon
  },
}
