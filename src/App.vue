<template>
  <div id="app">
    <b-container fluid>
      <b-row no-gutters>
        <b-col>
          <Map></Map>
        </b-col>
      </b-row>
    </b-container>
    <FloatedCard />
  </div>
</template>

<script>
import Map from './components/Map.vue';
import FloatedCard from './components/FloatedCard.vue';

export default {
  name: 'App',
  components: {
    Map,
    FloatedCard,
  },
  setup(props, context) {
    const store = context.root.$store;
    store.dispatch('getUbikeInfo');
  },
};
</script>

<style lang="scss">
@import '~@/styles/custom-vars.scss';
@import '~bootstrap/scss/bootstrap';
@import '~bootstrap-vue/src/index.scss';
@import '~@/styles/override.scss';
@import '~leaflet/dist/leaflet.css';

#app {
  width: 100%;
  height: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $dark;
}

.vue2leaflet-map {
  height: 100vh !important;
}
</style>
