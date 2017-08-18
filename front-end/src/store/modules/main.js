const state = {
  popUp: false,
  popMsg: '',
  openid: ''
};

const getters = {};

const actions = {};

const mutations = {
  info (state, msg) {
    state.popUp = true;
    state.popMsg = msg;
    setTimeout(() => {
      state.popUp = false;
      state.popMsg = '';
    }, 2000);
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
