<script>
  import mapboxgl from "mapbox-gl";
  import { onMount } from "svelte";
  export let index;
  export let geoJsonToFit;

  mapboxgl.accessToken =
    "pk.eyJ1Ijoia2F0ZWx5bndvbmciLCJhIjoiY2xzZ3d1b3JlMHhkaTJ2cjJ5bHc5ZHc2cyJ9.1gcsw89CYByE5i-0jUmK8g";

  let container;
  let map;

  let previousIndex = 0;

  onMount(() => {
    map = new mapboxgl.Map({
      container,
      style: "mapbox://styles/mapbox/light-v10",
      center: [0, 0],
      zoom: 1,
      attributionControl: true,
    });

    map.on("load", () => {
      hideLabelLayers();
      updateBounds();
      map.on("zoom", updateBounds);
      map.on("drag", updateBounds);
      map.on("move", updateBounds);
    });
  });

  function updateBounds() {
    const bounds = map.getBounds();
    geoJsonToFit.features[0].geometry.coordinates = [
      bounds._ne.lng,
      bounds._ne.lat,
    ];
    geoJsonToFit.features[1].geometry.coordinates = [
      bounds._sw.lng,
      bounds._sw.lat,
    ];
  }

  let isVisible = false;

  $: isVisible = index === 8;
  
</script>

<svelte:head>
  <link
    rel="stylesheet"
    href="https://api.mapbox.com/mapbox-gl-js/v2.14.0/mapbox-gl.css"
  />
</svelte:head>

<div class="map" class:visible={isVisible} bind:this={container} />

<style>
  .map {
    width: 100%;
    height: 100vh;
    position: absolute;
    opacity: 0;
    visibility: hidden;
    transition: opacity 2s, visibility 2s;
    outline: blue solid 3px;
  }

  .map.visible {
    opacity: 1;
    visibility: visible;
  }
</style>
