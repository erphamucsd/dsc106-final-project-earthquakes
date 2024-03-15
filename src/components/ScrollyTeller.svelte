<script>
  import Scroller from "@sveltejs/svelte-scroller";
  import EarthquakeMap from "./EarthquakeMap.svelte";
  import StaticMap from "./StaticMap.svelte";
  import FaultMap from "./FaultMap.svelte";
  import { geoMercator } from "d3-geo";
  import Graph from "./Graph.svelte";
  import * as d3 from 'd3'; // Import D3 library

  let count, index, offset, progress;
  let width, height;

  let geoJsonToFit = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [1, 0],
        },
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [0, 1],
        },
      },
    ],
  };
</script>

<main>
<Scroller
  top={0.0}
  bottom={1}
  threshold={0.5}
  bind:count
  bind:index
  bind:offset
  bind:progress
>

  <div 
      class="background" 
      slot="background"
      bind:clientWidth={width}
      bind:clientHeight={height}
    >
    <EarthquakeMap bind:geoJsonToFit {index}/>
    <FaultMap bind:geoJsonToFit {index}/>
    <Graph {index} {width} {height} />

    <div class="progress-bars">
      <p>current section: <strong>{index + 1}/{count}</strong></p>
      <progress value={count ? (index + 1) / count : 0} />
      <p></p>
      <progress value={offset || 0} />
    
    </div>
  </div>

  <div class="foreground" slot="foreground">
    <section></section>
    <section></section>
    <section></section>
    <section></section>
    <section></section>
    <section></section>
    <section></section>
    <section></section>
    <section></section>
    <section></section>
    <section></section>
    <section></section>
    <section></section>
    <section></section>
    <section></section>
    <section></section>
    <section></section>
    <section></section>
  </div>

</Scroller>
  <h1>Earthquake Interactive</h1>
  <StaticMap bind:geoJsonToFit/>
  <div>
  <h1>Demo Video</h1>
    <iframe class="video"
      title="YouTube Video"
      width="560"
      height="315"
      src="https://www.youtube.com/embed/0DTqqdwqN4g"
      frameborder="0"
      allowfullscreen
      style="position: relative; bottom: 0; left: 50%; transform: translateX(-50%); z-index: 999;"
    ></iframe>
</div>
</main>


<style>
  .background {
    width: 100%;
    height: 100vh;
    position: relative;
  }

  .foreground {
    width: 50%;
    margin: 0 auto;
    height: auto;
    position: relative;
  }

  .progress-bars progress {
    background-color: orange !important;
  }

  .progress-bars {
    position: absolute;
    background: rgba(153, 153, 153, 0.2) /*  40% opaque */;
    visibility: visible;

  }

  section {
    height: 80vh;
    text-align: center;
    padding: 1em;
    margin: 0 0 2em 0;
  }

  .video {
    width: 70%; /* Fixed width for standard YouTube embed */
    height: 70vh; /* Fixed height for standard YouTube embed */
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1;
}


</style>