<script>
  import mapboxgl from "mapbox-gl";
  import { onMount } from "svelte";
  import * as d3 from 'd3'; // Import D3 library
  import earthquakePoints from './assets/earthquakes.json';
  
  export let index;
  export let geoJsonToFit;
  export let selectedDate;

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

// Katelyn's testing attempts to filter data
    // console.log(features)
      
    // let parsedFeatures;
    // function updateFeatures(features, selectedDate) {
    //   return features.filter(point => {
    //     // const pointDate = new Date(point.Time);
    //     return (
    //       point.properties.date.getDate() === selectedDate.getDate() &&
    //       point.properties.date.getMonth() === selectedDate.getMonth() &&
    //       point.properties.date.getFullYear() === selectedDate.getFullYear()
    //     );
    //   });
    // }

    // console.log(updateFeatures(features, new Date("2000-12-30")))
    // // parsedFeatures = updateFeatures(features,selectedDate)

  function filterBy(year) {
    map.setFilter('earthquakePoints', ['==', 'year', year]);
  }

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

  // adjusting visibility of map for only index 10 and 11
  $: isVisible = index === 10 || index === 11;
  $: { // sliding animation between index 9 and 10
    if (index === 11 && previousIndex === 10) {
      map.panTo([-100, 0], { duration: 2000 }); // Sliding animation to [-100, 0]
    } else if (index === 10 && previousIndex === 11) {
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
