<script>
  import mapboxgl from "mapbox-gl";
  import { onMount } from "svelte";
  import earthquakePoints from './assets/earthquakes.json';
  
  export let index;

  mapboxgl.accessToken =
    "pk.eyJ1Ijoia2F0ZWx5bndvbmciLCJhIjoiY2xzZ3d1b3JlMHhkaTJ2cjJ5bHc5ZHc2cyJ9.1gcsw89CYByE5i-0jUmK8g";

  let container;
  let QuakeMap;
  let previousIndex = 0;

  onMount(() => {
    QuakeMap = new mapboxgl.Map({
      container,
      style: "mapbox://styles/mapbox/light-v10",
      center: [0, 0],
      zoom: 1,
      attributionControl: true,
    });

    QuakeMap.on("load", () => {
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
    QuakeMap.addSource('earthquakePoints', {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: features
      }
    });

    // Add layer for plotting points
    QuakeMap.addLayer({
      id: 'earthquakePoints',
      type: 'circle',
      source: 'earthquakePoints',
      paint: {
        'circle-radius': [
          'interpolate',
          ['exponential', 4],
          ['get', 'magnitude'],
          0.5,1.5,9,30
          ],
          'circle-color': [
            'interpolate',
            ['exponential', 4],
            ['get', 'magnitude'],
            0.5,'#fec311',
            9,'#990000'
            ],
          'circle-opacity': 0.6
      }
    });

    // Hide label layers
    hideLabelLayers();
  });

  QuakeMap.on("load", () => {
    hideLabelLayers();
    });
  });

  function hideLabelLayers() {
    const labelLayerIds = QuakeMap
      .getStyle()
      .layers.filter(
        (layer) =>
        layer.type === "symbol" && /label|text|place/.test(layer.id)
      )
      .map((layer) => layer.id);

      for (const layerId of labelLayerIds) {
        QuakeMap.setLayoutProperty(layerId, "visibility", "none");
      }
    }

  let isVisible = false;

  // adjusting visibility of map after index 10
  $: isVisible = index >= 10;
  $: { // sliding animation between index 10 and 11
    // Ring of Fire flyTo
    if (index === 11 && previousIndex === 10) {
      QuakeMap.flyTo({center: [180, 0], zoom: 1.5, duration: 2000})
    } else if (index === 10 && previousIndex === 11) {
      QuakeMap.flyTo({center: [0, 0], zoom: 1, duration: 2000})
    } 
    
    // Valdivia flyTo
    else if (index === 12 && previousIndex === 11) {
      QuakeMap.flyTo({center: [-75, -40], zoom: 4, duration: 2000})
    } else if (index === 11 && previousIndex === 12) {
      QuakeMap.flyTo({center: [180, 0], zoom: 1.5, duration: 2000})
    }

    // Japan flyTo
    else if (index === 13 && previousIndex === 12) {
      QuakeMap.flyTo({center: [140, 40], zoom: 4, duration: 2000})
    } else if (index === 12 && previousIndex === 13) {
      QuakeMap.flyTo({center: [-75, -40], zoom: 4, duration: 2000})
    }
    
    // Banda Ache flyTo
    else if (index === 14 && previousIndex === 13) {
      QuakeMap.flyTo({center: [95, 5], zoom: 4, duration: 2000})
    } else if (index === 13 && previousIndex === 14) {
      QuakeMap.flyTo({center: [140, 40], zoom: 4, duration: 2000})
    }

    // California flyTo
    else if (index === 15 && previousIndex === 14) {
      QuakeMap.flyTo({center: [-120, 35], zoom: 4, duration: 2000})
    } else if (index === 14 && previousIndex === 15) {
      QuakeMap.flyTo({center: [95, 5], zoom: 4, duration: 2000})
    }

    // Socal flyTo
    else if (index === 17 && previousIndex === 16) {
      QuakeMap.flyTo({center: [-118, 34], zoom: 7, duration: 2000})
    } else if (index === 16 && previousIndex === 17) {
      QuakeMap.flyTo({center: [-120, 35], zoom: 4, duration: 2000})
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

<style>
  .map {
    width: 100%;
    height: 100vh;
    position: absolute;
    opacity: 0;
    visibility: hidden;
    transition: opacity 2s, visibility 2s;
    outline: rgb(142, 142, 142) solid 3px;
  }

  .map.visible {
    opacity: 1;
    visibility: visible;
  }


</style>
