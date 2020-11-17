<template>
  <b-card class="floated-card" no-body>
    <template #header>
      <div class="d-flex align-items-center justify-content-between">
        <h5 class="mb-0">站點顯示選項</h5>
        <b-button
          class="p-0 ml-4"
          v-b-toggle.collapse-1
          variant="outline-info-transparent"
        >
          <b-icon-caret-up-fill v-if="isCollapsed"></b-icon-caret-up-fill>
          <b-icon-caret-down-fill v-else></b-icon-caret-down-fill>
        </b-button>
      </div>
    </template>
    <b-collapse id="collapse-1" v-model="isCollapsed">
      <div class="card-content">
        <b-form-select v-model="selectedDistrict" :options="districtList">
          <template #first>
            <b-form-select-option :value="null" disabled
              >請選擇行政區</b-form-select-option
            >
            <b-form-select-option :value="0">全部</b-form-select-option>
          </template>
        </b-form-select>
        <b-form-checkbox class="mt-2" v-model="showAvailableOnly" switch
          >只顯示尚有車輛的站點
        </b-form-checkbox>
        <b-form-checkbox class="mt-2" v-model="showActiveOnly" switch
          >只顯示運作中的站點
        </b-form-checkbox>
      </div>
    </b-collapse>
  </b-card>
</template>

<script>
import {
  BCard,
  BFormSelect,
  BFormSelectOption,
  BFormCheckbox,
  BButton,
  BCollapse,
  VBToggle,
  BIconCaretUpFill,
  BIconCaretDownFill,
} from 'bootstrap-vue';
import { computed, ref } from '@vue/composition-api';

export default {
  name: 'FloatedCard',
  components: {
    BCard,
    BFormSelect,
    BFormSelectOption,
    BFormCheckbox,
    BButton,
    BCollapse,
    BIconCaretUpFill,
    BIconCaretDownFill,
  },
  directives: {
    'b-toggle': VBToggle,
  },
  setup(props, context) {
    const store = context.root.$store;
    const districtList = computed(() => store.getters.districtList);
    const selectedDistrict = computed({
      get: () => store.state.selectedDistrict,
      set: (district) => {
        store.commit('setSelectedDistrict', district);
      },
    });
    const showAvailableOnly = computed({
      get: () => store.state.showAvailableOnly,
      set: (value) => {
        store.commit('setShowAvailableOnly', value);
      },
    });
    const showActiveOnly = computed({
      get: () => store.state.showActiveOnly,
      set: (value) => {
        store.commit('setShowActiveOnly', value);
      },
    });
    const isCollapsed = ref(true);

    return {
      districtList,
      selectedDistrict,
      showAvailableOnly,
      showActiveOnly,
      isCollapsed,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '~@/styles/custom-vars.scss';
@import '~bootstrap/scss/bootstrap';
@import '~bootstrap-vue/src/index.scss';

.floated-card {
  position: fixed;
  top: 10%;
  right: 4%;
  z-index: 10000;
  box-shadow: $card-box-shadow;
  width: 250px;

  .btn {
    color: $dark;
  }

  .card-content {
    padding: 0.75rem 1.25rem;
  }
}
</style>
