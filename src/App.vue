<template>
  <div id="app">
    <Map></Map>
  </div>
</template>

<script>
import Map from './components/Map.vue';

export default {
  name: 'App',
  components: {
    Map,
  },
  setup(props, context) {
    const store = context.root.$store;
    store.dispatch('getUbikeInfo');
  },
};
</script>

<style lang="scss">
html,
body {
  width: 100%;
  height: 100%;
}

#app {
  width: 100%;
  height: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
