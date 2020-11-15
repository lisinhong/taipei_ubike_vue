<template>
  <l-map :center="center" :zoom="zoom">
    <l-tile-layer :url="url" />
    <l-marker-cluster>
      <l-marker
        v-for="ubike in ubikeInfo"
        :key="`marker-${ubike.sno}`"
        :lat-lng="formatLatLng(ubike)"
      >
        <l-tooltip class="tooltip-wrapper">
          <ul>
            <li>地點：{{ ubike.sna }}</li>
            <li>uBike 數量：{{ ubike.sbi }} / {{ ubike.tot }}</li>
            <li>更新時間：{{ formatDate(ubike.mday) }}</li>
          </ul>
        </l-tooltip></l-marker
      >
    </l-marker-cluster>
  </l-map>
</template>

<script>
import { ref, computed } from '@vue/composition-api';
import { latLng } from 'leaflet';
import {
  LMap, LTileLayer, LMarker, LTooltip,
} from 'vue2-leaflet';
import Vue2LeafletMarkerCluster from 'vue2-leaflet-markercluster';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';

export default {
  name: 'Map',
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LTooltip,
    LMarkerCluster: Vue2LeafletMarkerCluster,
  },
  setup(props, context) {
    const store = context.root.$store;
    const url = ref('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
    const center = ref(latLng(25.0339808, 121.5623502));
    const zoom = ref(12);
    const ubikeInfo = computed(() => store.getters.ubikeInfo);
    const formatLatLng = (info) => [info.lat, info.lng];
    const formatDate = (date) => {
      const YYYY = date.substring(0, 4);
      const MM = date.substring(4, 6);
      const DD = date.substring(6, 8);
      const HH = date.substring(8, 10);
      const mm = date.substring(10, 12);

      return `${YYYY}/${MM}/${DD} ${HH}:${mm}`;
    };

    return {
      url,
      center,
      zoom,
      ubikeInfo,
      formatLatLng,
      formatDate,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>
