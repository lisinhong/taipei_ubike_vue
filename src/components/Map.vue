<template>
  <l-map :center="center" :zoom="zoom">
    <l-tile-layer :url="url" />
    <l-marker :lat-lng="center"></l-marker>
  </l-map>
</template>

<script>
import { ref } from '@vue/composition-api';
import L, { latLng } from 'leaflet';
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet';

export default {
  name: 'Map',
  components: {
    LMap,
    LTileLayer,
    LMarker,
  },
  setup() {
    const url = ref('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
    const center = ref(latLng(25.0140071, 121.4648195));
    const zoom = ref(16);

    return {
      url,
      center,
      zoom,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>
