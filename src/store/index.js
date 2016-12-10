import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'

Vue.use(Vuex)

const state = {
  user: {},
  signStatus: 0,  // 0: Closed, 1: SignIn, 2: SignUp, other: Closed
}

export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters,
})
