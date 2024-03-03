<script>
  import Scroller from "@sveltejs/svelte-scroller";
  import MapPlain from "./MapPlain.svelte";
  import EarthquakeMap from "./EarthquakeMap.svelte";
  import StaticMap from "./StaticMap.svelte";
  import FaultMap from "./FaultMap.svelte";
  import { geoMercator } from "d3-geo";
  import Graph from "./Graph.svelte";
  import earthquakePoints from './assets/earthquakes.json';

  let count, index, offset, progress;
  let width, height;

  let hovered = -1;
  let recorded_mouse_position = {
		x: 0, y: 0
	};

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

  $: projection = geoMercator().fitSize([width, height], geoJsonToFit);

  function handleMouseover(e,d) {
      console.log(d)
    }
</script>

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
    <MapPlain bind:geoJsonToFit {index}/>
    <EarthquakeMap bind:geoJsonToFit {index}/>
    <FaultMap bind:geoJsonToFit {index}/>
    <Graph {index} {width} {height} {projection} />

    <div class="progress-bars">
      <p>current section: <strong>{index + 1}/{count}</strong></p>
      <progress value={count ? (index + 1) / count : 0} />

      <p>offset in current section</p>
      <progress value={offset || 0} />

      <p>total progress</p>
      <progress value={progress || 0} />
    </div>
  </div>

  <div class="foreground" slot="foreground">
    <section>Index 0</section>
    <section>Index 1</section>
    <section>Index 2</section>
    <section>Index 3</section>
    <section>Index 4</section>
    <section>Index 5</section>
    <section>Index 6</section>
    <section>Index 7</section>
    <section>Index 8</section>
    <section>Index 9</section>
    <section>Index 10</section>
    <section>Index 11</section>
    <section>Index 12</section>
    <section>Index 13</section>
    <section>Index 14</section>
    <section>Index 15</section>
    <section>Index 16</section>
    <section>Index 17</section>
    <section>Index 18</section>
  </div>
</Scroller>

<main>
  <h1>TESTING</h1>
  <StaticMap bind:geoJsonToFit/>
</main>

<style>
  .background {
    width: 100%;
    height: 100vh;
    position: relative;
    outline: green solid 3px;
  }

  .foreground {
    width: 50%;
    margin: 0 auto;
    height: auto;
    position: relative;
    outline: red solid 3px;
  }

  .progress-bars {
    position: absolute;
    background: rgba(170, 51, 120, 0.2) /*  40% opaque */;
    visibility: visible;
  }

  section {
    height: 80vh;
    background-color: rgba(0, 0, 0, 0.2); /* 20% opaque */
    /* color: white; */
    outline: magenta solid 3px;
    text-align: center;
    max-width: 750px; /* adjust at will */
    color: black;
    padding: 1em;
    margin: 0 0 2em 0;
  }

</style>
