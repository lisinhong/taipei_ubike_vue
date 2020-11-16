import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    sourceUbikeInfo: {},
  },
  mutations: {
    setUbikeInfo(state, data) {
      state.sourceUbikeInfo = data;
    },
  },
  actions: {
    getUbikeInfo(context) {
      axios.get('https://tcgbusfs.blob.core.windows.net/blobyoubike/YouBikeTP.json')
        .then((res) => { context.commit('setUbikeInfo', res.data.retVal); });
    },
  },
  getters: {
    ubikeInfo(state) {
      return state.sourceUbikeInfo;
    },
    districtList(state) {
      const ubikeInfo = state.sourceUbikeInfo;
      const allDistrictList = Object.values(ubikeInfo).map((info) => info.sarea);

      return allDistrictList.filter((district, index, self) => self.indexOf(district) === index);
    },
  },
  modules: {
  },
});
