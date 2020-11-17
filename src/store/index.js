import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    sourceUbikeInfo: {},
    selectedDistrict: null,
    showAvailableOnly: false,
    showActiveOnly: false,
  },
  mutations: {
    setUbikeInfo(state, data) {
      state.sourceUbikeInfo = data;
    },
    setSelectedDistrict(state, district) {
      state.selectedDistrict = district;
    },
    setShowAvailableOnly(state, value) {
      state.showAvailableOnly = value;
    },
    setShowActiveOnly(state, value) {
      state.showActiveOnly = value;
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
      const {
        sourceUbikeInfo, selectedDistrict, showAvailableOnly, showActiveOnly,
      } = state;

      return Object.values(sourceUbikeInfo)
        .filter((info) => (!selectedDistrict ? true : selectedDistrict === info.sarea))
        .filter((info) => (showAvailableOnly ? info.sbi > 0 : true))
        .filter((info) => (showActiveOnly ? info.act === '1' : true));
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
