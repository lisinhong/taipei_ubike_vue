<template>
  <l-map ref="myMap" :options="{ zoomControl: false }">
    <l-tile-layer :url="url" />
    <l-control-zoom position="bottomleft"></l-control-zoom>
    <l-marker-cluster>
      <l-marker
        v-for="ubike in ubikeInfo"
        :key="`marker-${ubike.sno}`"
        :lat-lng="formatLatLng(ubike)"
      >
        <l-tooltip class="tooltip-wrapper">
          <b-list-group>
            <b-list-group-item>地點：{{ ubike.sna }}</b-list-group-item>
            <b-list-group-item
              >uBike 數量：{{ ubike.sbi }} / {{ ubike.tot }}</b-list-group-item
            >
            <b-list-group-item
              >更新時間：{{ formatDate(ubike.mday) }}</b-list-group-item
            >
          </b-list-group>
        </l-tooltip></l-marker
      >
    </l-marker-cluster>
  </l-map>
</template>

<script>
import { ref, computed, watch } from '@vue/composition-api';
import {
  LMap,
  LTileLayer,
  LMarker,
  LTooltip,
  LControlZoom,
} from 'vue2-leaflet';
import Vue2LeafletMarkerCluster from 'vue2-leaflet-markercluster';
import { BListGroup, BListGroupItem } from 'bootstrap-vue';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import useFormat from '../utils/useFormat';

export default {
  name: 'Map',
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LTooltip,
    LControlZoom,
    LMarkerCluster: Vue2LeafletMarkerCluster,
    BListGroup,
    BListGroupItem,
  },
  setup(props, context) {
    const store = context.root.$store;
    const url = ref('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
    const ubikeInfo = computed(() => store.getters.ubikeInfo);
    const { formatDate, formatLatLng } = useFormat();

    watch(
      () => ubikeInfo.value,
      (info) => {
        const bounds = info.map((element) => formatLatLng(element));
        context.refs.myMap.mapObject.fitBounds(bounds, {
          animate: true,
          duration: 1,
        });
      },
    );

    return {
      url,
      ubikeInfo,
      formatLatLng,
      formatDate,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>
