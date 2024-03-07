<script>
  import mapboxgl from "mapbox-gl";
  import { onMount } from "svelte";
  import * as d3 from 'd3'; // Import D3 library
  import earthquakePoints from './assets/earthquakes.json';
  
  export let geoJsonToFit;

  mapboxgl.accessToken =
    "pk.eyJ1Ijoia2F0ZWx5bndvbmciLCJhIjoiY2xzZ3d1b3JlMHhkaTJ2cjJ5bHc5ZHc2cyJ9.1gcsw89CYByE5i-0jUmK8g";


  let container;
  let map;

  let slider_time = "Slide For Decade";
	let slider_label = "";

  onMount(() => {
    map = new mapboxgl.Map({
      container,
      style: "mapbox://styles/mapbox/light-v10",
      center: [180, 0],
      zoom: 0.8,
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
          date: new Date(earthquake.Time), // Convert date string to Date object
          year: Math.floor(new Date(earthquake.Time).getUTCFullYear() / 10) * 10
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
          'circle-radius': [
            'interpolate',
            ['exponential', 4],
            ['get', 'magnitude'],
            0,0.5,9,20
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

  function filterBy(year) {
    map.setFilter('earthquakePoints', ['==', 'year', year]);
  }

  $: {
    if (slider_time != "Slide For Decade") {
      filterBy(slider_time)
    }
  }
</script>

<main>
  <div class="overlay">
		<label>{slider_label}</label>
		<input
			id="slider"
			type="range"
			min="1900"
			max="2020"
      step="10"
			bind:value={slider_time}
		/>
    <p class="slider-text">{slider_time}</p>
	</div>
</main>

<svelte:head>
  <link
    rel="stylesheet"
    href="https://api.mapbox.com/mapbox-gl-js/v2.14.0/mapbox-gl.css"
  />
</svelte:head>

<div class="map" class:visible={true} bind:this={container}></div>

<style>
  .map {
    width: 70%;
    height: 80vh;
    left: 15%;
    right: 15%;
    position: relative;
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
    position: relative;
  }
</style>
