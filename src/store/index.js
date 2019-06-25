import Vue from 'vue'
import Vuex from 'vuex'
import appStore from './appStore'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

const actions = {}
const state = {}
const getters = {}
const mutations = {}

export default new Vuex.Store({
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
  modules: {
    appStore
  },
  plugins: [createPersistedState()]
})
