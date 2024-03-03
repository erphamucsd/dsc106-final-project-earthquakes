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

  let hovered = -1;
  let recorded_mouse_position = {
		x: 0, y: 0
	};
  let slider_time = 720;

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
  function handleMouseover(e,d) {
      console.log(d)
    }
</script>

<svelte:head>
  <link
    rel="stylesheet"
    href="https://api.mapbox.com/mapbox-gl-js/v2.14.0/mapbox-gl.css"
  />
</svelte:head>

<div class="map" class:visible={true} bind:this={container}></div>

<div class="visualization" role="tooltip">
  {#each earthquakePoints as data, index}
    handleMouseover(data,index);
				on:mouseover={
				(event) => { handleMouseover(data,index);
					hovered = index; 
					recorded_mouse_position = {
							x: event.pageX,
							y: event.pageY
						}
				}}
				on:mouseout={(event) => { hovered = -1; }}
        on:focus={"blue"} 
        on:blur={"blue"} 
			{/each}

	<div
		class={hovered === -1 ? "tooltip-hidden": "tooltip-visible"}	
		style="left: {recorded_mouse_position.x + 40}px; top: {recorded_mouse_position.y + 40}px"
	>
		{#if hovered !== -1}
		Magnitude: {earthquakePoints[hovered].Mag}
		{/if}
	</div>
</div>


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

  .tooltip-hidden {
		visibility: hidden;
		font-family: "Nunito", sans-serif;
		width: 200px;
		position: absolute;
	}

	.tooltip-visible {
		font: 18px sans-serif;
		font-family: "Nunito", sans-serif;
		visibility: visible;
		background-color: #F5F5F4;
		border-radius: 10px;
		width: 50px;
		color: black;
		position: absolute;
		padding: 10px;
    border: 2px solid #2A2826;
  }
</style>
