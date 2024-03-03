<script>
  import mapboxgl from "mapbox-gl";
  import { onMount } from "svelte";
  import * as d3 from 'd3'; // Import D3 library
  import earthquakePoints from './assets/earthquakes.json';
  
  export let index;
  export let geoJsonToFit;

  mapboxgl.accessToken =
    "pk.eyJ1Ijoia2F0ZWx5bndvbmciLCJhIjoiY2xzZ3d1b3JlMHhkaTJ2cjJ5bHc5ZHc2cyJ9.1gcsw89CYByE5i-0jUmK8g";

  const sliderTimeScale = d3
    .scaleTime()
    .domain([0, 1440])
    .range([new Date("1900-01-01 00:00"), new Date("2023-01-01 00:00")]);

  let container;
  let map;
  let previousIndex = 0;
  let filterDate = sliderTimeScale(720); // Initial date for filtering earthquakes

  onMount(() => {
    map = new mapboxgl.Map({
      container,
      style: "mapbox://styles/mapbox/light-v10",
      center: [0, 0],
      zoom: 1,
      attributionControl: true,
    });

    map.on("load", () => {
      // Convert JSON data from earthquakePoints to GeoJSON-like objects
      const features = earthquakePoints.map(earthquake => ({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [parseFloat(earthquake.Longitude), parseFloat(earthquake.Latitude)]
        },
        properties: {
          magnitude: parseFloat(earthquake.Mag),
          date: new Date(earthquake.Time) // Convert date string to Date object
        }
      }));

      // Add GeoJSON source
      map.addSource('earthquakePoints', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: features
        }
      });

      // Add layer for plotting points
      map.addLayer({
        id: 'earthquakePoints',
        type: 'circle',
        source: 'earthquakePoints',
        paint: {
          'circle-radius': 4,
          'circle-color': '#cd5c5c',
          'circle-opacity': 0.4
        }
      });

      // Hide label layers
      hideLabelLayers();
      // Update bounds
      updateBounds();
    });

  map.on("load", () => {
    hideLabelLayers();
    updateBounds();
    map.on("zoom", updateBounds);
    map.on("drag", updateBounds);
    map.on("move", updateBounds);
    });
  });

  function hideLabelLayers() {
    const labelLayerIds = map
      .getStyle()
      .layers.filter(
        (layer) =>
          layer.type === "symbol" && /label|text|place/.test(layer.id)
      )
      .map((layer) => layer.id);

    for (const layerId of labelLayerIds) {
      map.setLayoutProperty(layerId, "visibility", "none");
    }
  }

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

  $: isVisible = index === 9 || index === 10;
  $: {
    if (index === 10 && previousIndex === 9) {
      map.panTo([-100, 0], { duration: 2000 }); // Sliding animation to [-100, 0]
    } else if (index === 9 && previousIndex === 10) {
      map.panTo([0, 0], { duration: 2000 }); // Sliding animation to [0, 0]
    }
    previousIndex = index;
  }
</script>

<svelte:head>
  <link
    rel="stylesheet"
    href="https://api.mapbox.com/mapbox-gl-js/v2.14.0/mapbox-gl.css"
  />
</svelte:head>

<div class="map" class:visible={isVisible} bind:this={container}></div>

{#if index >= 9 && index <= 10}
    <input type="range" min="0" max="1440" step="1" bind:value={filterDate} />
    <p class="slider-text">Adjust the slider to select a date</p>
{/if}

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

    .slider-text {
        position: absolute;
        bottom: 40px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 1000;
    }

    input[type="range"] {
        position: absolute;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 1000;
    }
</style>
