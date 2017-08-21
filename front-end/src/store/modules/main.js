const state = {
  popUp: false,
  popMsg: '',
  userMes: {
    userEmail: '',
    userPass: '',
    comName: '',
    comCode: '',
    comCapital: '',
    comTime: '',
    comPerson: '',
    comEmail: '',
    comPhone: '',
    comManager: '',
    comRegistAddresss: '',
    comWorkAddresss: '',
    comField: '',
    comProduct: '',
    comIntro: '',
    contactName: '',
    contactJob: '',
    contactMobile: '',
    contactEmail: '',
    contactQQ: '',
    contactPhone: ''
  }
};

const getters = {
  getUserMes (state) {
    return state.userMes;
  }
};

const actions = {};

const mutations = {
  info (state, msg) {
    state.popUp = true;
    state.popMsg = msg;
    setTimeout(() => {
      state.popUp = false;
      state.popMsg = '';
    }, 2000);
  },
  user (state, msg) {
    for (var key in state.userMes) {
      state.userMes[key] = msg[key];
    }
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
