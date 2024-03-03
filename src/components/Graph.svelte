<script>
  import { fly } from "svelte/transition";
  import { tweened } from "svelte/motion";
  import { cubicOut } from "svelte/easing";
  import earthquakeClipart from './assets/earthquake_image.jpg';
  import earthquakePoints from './assets/earthquakes.json';


  export let index, width, height;

  // Define transition options
  const tweenOptions = {
    delay: 0,
    duration: 800,
    easing: cubicOut,
  };

  // Define the intro block
  const titleText = 'Title';
  const subtitleText = 'Description/authors';
  const titleImage = earthquakeClipart;

  // Create tweened variables for intro block
  const tweenedTitleY = tweened(0);
  const tweenedSubtitleY = tweened(0);
  const tweenedTitleImageOpacity = tweened(1);

  // Intro block animations
  $: {
    if (index === 0) { // reset positions when we are at top
      tweenedTitleY.set(-20);
      tweenedSubtitleY.set(-20);
    } if (index >= 1) { // Title and title image come in
      tweenedTitleY.set(height / 2);
      tweenedTitleImageOpacity.set(1);
    } if (index >= 2) { // Subtitle comes in
      tweenedSubtitleY.set(height / 2 + 30);
    } if (index >= 3) { // Title, subtitle and image leave
      tweenedTitleY.set(-20);
      tweenedSubtitleY.set(-20);
      tweenedTitleImageOpacity.set(0);
    }
  }

  // Define background story
  const backgroundIntro = 'Background text...';
  const backgroundStory1 = 'earthquake story'
  const backgroundStory2 = 'earthquake story cont.'
  const backgroundStory3 = 'relating earthquake story to main idea'

  // Create tweened variables for background story
  const tweenedbackgroundIntroOpacity = tweened(0);
  const tweenedStory1Opacity = tweened(0);
  const tweenedStory2Opacity = tweened(0);
  const tweenedStory3Opacity = tweened(0);

  $: { // background story animations
    if (index === 4) {
      tweenedbackgroundIntroOpacity.set(1)
    } else {
      tweenedbackgroundIntroOpacity.set(0)
    }
    if (index === 5) {
      tweenedStory1Opacity.set(1)
    } else {
      tweenedStory1Opacity.set(0)
    }
    if (index === 6) {
      tweenedStory2Opacity.set(1)
    } else {
      tweenedStory2Opacity.set(0)
    }
    if (index === 7) {
      tweenedStory3Opacity.set(1)
    } else {
      tweenedStory3Opacity.set(0)
    }
  }

  // Visualization 1
  const visualization1description = 'Visual that shows where earthquakes have been happening throughout time';

  // Visualization 1 markings

  // Create tweened variables for visualization1 description
  const tweenedvisualization1descriptionOpacity = tweened(0);
  const tweenedvisualization1descriptionY = tweened(0);
  tweenedvisualization1descriptionY.set(height / 2)
  tweenedvisualization1descriptionOpacity.set(0); //initialize opacity to be 0

  $: { // Define animations based on index
   if (index === 8) {
      tweenedvisualization1descriptionY.set(height / 2);
      tweenedvisualization1descriptionOpacity.set(1);
    } else if (index === 9 || index === 10) {
      tweenedvisualization1descriptionY.set((6 / 7) * height);
      tweenedvisualization1descriptionOpacity.set(1);
    } else {
      tweenedvisualization1descriptionOpacity.set(0);
    }
  }

  // Visualization 2
   const visualization2description = 'These earthquakes correspond to the same location as Earth fault lines';

  // Visualization 2 markings

  // Create tweened variables for visualization1 description
  const tweenedvisualization2descriptionOpacity = tweened(0);
  tweenedvisualization2descriptionOpacity.set(0); //initialize opacity to be 0

$: { // Define animations based on index
 if (index === 11) {
    tweenedvisualization2descriptionOpacity.set(1);
  } else if (index === 11 || index === 12) {
    tweenedvisualization2descriptionOpacity.set(1);
  } else {
    tweenedvisualization2descriptionOpacity.set(0);
  }
}
</script>

<svg class="graph">
  <!-- Title image layer with fly transition -->
  <image
    x="0" y="0" width="100%" height="100%"
    xlink:href={titleImage}
    opacity={$tweenedTitleImageOpacity}
    in:fly={{ opacity: 1, duration: 1000 }}
    out:fly={{ opacity: 0, duration: 1000 }}
    preserveAspectRatio="xMidYMid slice"
  />

  <!-- Text layers -->
  {#if index > 0}
  <!-- intro text -->
    <text
      x={width / 2}
      y={$tweenedTitleY}
      in:fly={{ y: -300, duration: 1000 }}
      out:fly={{ y: -300, duration: 1000 }}
    >{titleText}</text>
    <text
      x={width / 2}
      y={$tweenedSubtitleY}
      in:fly={{ y: -300, duration: 1000 }}
      out:fly={{ y: -300, duration: 1000 }}
    >{subtitleText}</text>
    <!-- background text -->
    <text
      x={width / 2}
      y={height / 2}
      opacity={$tweenedbackgroundIntroOpacity}
      in:fly={{ y: -300, duration: 1000 }}
      out:fly={{ y: -300, duration: 1000 }}
    >{backgroundIntro}</text>
    <text
      x={width / 2}
      y={height / 2}
      opacity={$tweenedStory1Opacity}
      in:fly={{ y: -300, duration: 1000 }}
      out:fly={{ y: -300, duration: 1000 }}
    >{backgroundStory1}</text>
    <text
      x={width / 2}
      y={height / 2}
      opacity={$tweenedStory2Opacity}
      in:fly={{ y: -300, duration: 1000 }}
      out:fly={{ y: -300, duration: 1000 }}
    >{backgroundStory2}</text>
      <text
      x={width / 2}
      y={height / 2}
      opacity={$tweenedStory3Opacity}
      in:fly={{ y: -300, duration: 1000 }}
      out:fly={{ y: -300, duration: 1000 }}
    >{backgroundStory3}</text>
    <!-- visualization1 -->
    <text
      x={width * 2/3}
      y={$tweenedvisualization1descriptionY}
      opacity={$tweenedvisualization1descriptionOpacity}
      in:fly={{ y: -300, duration: 1000 }}
      out:fly={{ y: -300, duration: 1000 }}
    >{visualization1description}</text>
    <!-- visualization2 -->
    <text
    x={width * 2/3}
    y={height * 6/7}
    opacity={$tweenedvisualization2descriptionOpacity}
    in:fly={{ y: -300, duration: 1000 }}
    out:fly={{ y: -300, duration: 1000 }}
  >{visualization2description}</text>
  {/if}
</svg>

<style>
  .graph {
    width: 100%;
    height: 100vh;
    position: absolute;
    outline: red solid 7px;
  }
</style>
