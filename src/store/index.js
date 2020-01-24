import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isMenuVisible: false,
    user: {
      name: 'user mock',
      email: 'email@mock.com',
    },
  },
  mutations: {
    setIsMenuVisible(state, isVisible) {
      if (isVisible === undefined) state.isMenuVisible = !state.isMenuVisible;
      else state.isMenuVisible = isVisible;
    },
  },
  actions: {
    toggleMenu({ commit }, isVisible) {
      commit('setIsMenuVisible', isVisible);
    },
  },
  modules: {
  },
});
