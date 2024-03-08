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
      tweenedTitleY.set(height * 1 / 6);
      tweenedTitleImageOpacity.set(1);
    } if (index >= 2) { // Subtitle comes in
      tweenedSubtitleY.set(height * 1 / 4);
    } if (index >= 3) { // Title, subtitle and image leave
      tweenedTitleY.set(-20);
      tweenedSubtitleY.set(-20);
      tweenedTitleImageOpacity.set(0);
    }
  }

  // Define background story
  const backgroundStory2 = 'earthquake story cont.'
  const backgroundStory3 = 'relating earthquake story to main idea'

  // Create tweened variables for background story
  const tweenedbackgroundIntroOpacity = tweened(0);
  const tweenedStory1Opacity = tweened(0);
  const tweenedStory1Y = tweened(0);
  tweenedStory1Y.set(height*1.5)
  const tweenedStory2Opacity = tweened(0);
  const tweenedStory3Opacity = tweened(0);

  $: { // background story animations
    if (index === 4) {
      tweenedbackgroundIntroOpacity.set(1)
      tweenedStory1Y.set(height*1.5)
     } else {
      tweenedbackgroundIntroOpacity.set(0)
    }
    if (index === 5) {
      tweenedStory1Opacity.set(1)
      tweenedStory1Y.set(height/2)
    } else {
      tweenedStory1Opacity.set(0)
    }
    if (index === 6) {
      tweenedStory2Opacity.set(1)
      tweenedStory1Y.set(-20)
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
  const tweenedvisualization1descriptionX = tweened(0);

  tweenedvisualization1descriptionY.set(height / 2)
  tweenedvisualization1descriptionX.set(width / 2)
  tweenedvisualization1descriptionOpacity.set(0); //initialize opacity to be 0

  $: { // Define animations based on index
   if (index === 8) {
      tweenedvisualization1descriptionY.set(height / 2);
      tweenedvisualization1descriptionX.set(height / 2);
      tweenedvisualization1descriptionOpacity.set(1);
    } else if (index === 9 || index === 10) {
      tweenedvisualization1descriptionY.set((6 / 7) * height);
      tweenedvisualization1descriptionX.set((2 / 3) * width);
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

<svg class="graph" width="100%" height="100%">
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
    <text class='title'
      x={30}
      y={$tweenedTitleY}
      in:fly={{ y: -300, duration: 1000 }}
      out:fly={{ y: -300, duration: 1000 }}
    >{"Shifting Ground: Exploring the Fascinating World of Earthquakes"}</text>
    <text class='subtitle'
      x={30}
      y={$tweenedSubtitleY}
      in:fly={{ y: -300, duration: 1000 }}
      out:fly={{ y: -300, duration: 1000 }}
    >{"By Eric Pham, Katelyn Wong, Vanessa Hu"}</text>
    <!-- background text -->
    <text class="backgroundIntro"
      x="50%"
      y="50%"
      text-anchor="middle"
      opacity={$tweenedbackgroundIntroOpacity}
      in:fly={{ y: -300, duration: 1000 }}
      out:fly={{ y: -300, duration: 1000 }}
    >
      <tspan x="50%" dy="-0.6em">On April 18, 1906</tspan>
      <tspan x="50%" dy="1.8em">at 5:12am in the morning...</tspan>
    </text>
    <text class="backgroundStory1"
      x="10%"
      y={$tweenedStory1Y}
      text-anchor="left"
      opacity={$tweenedStory1Opacity}
      in:fly={{ y: -300, duration: 1000 }}
      out:fly={{ y: -300, duration: 1000 }}
    >
      <tspan x="10%" dy="-4em">an extreme earthquake measuring 7.9 on the</tspan>
      <tspan x="10%" dy="1.8em">moment magnitude scale struck the Northern </tspan>
      <tspan x="10%" dy="1.8em">coast of California. This earthquake devastated </tspan>
      <tspan x="10%" dy="1.8em">areas ranging from San Francisco to Eureka, </tspan>
      <tspan x="10%" dy="1.8em">causing millions to die and devastating fires</tspan>
      <tspan x="10%" dy="1.8em">in San Francisco.</tspan>
    </text>


    <text class = 'backgroundStory2'
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
      x={$tweenedvisualization1descriptionX}
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
  @import url('https://fonts.google.com/share?query=playfair');
  svg {
    font-family: 'Playfair Display';
    font-size: 20px;
  }
  .title {
    font-size: 40px;
    font-weight: 500;
  }
  .subtitle {
    font-size: 21px;
  }
  .backgroundStory1 {
    white-space: pre-wrap;
  }
  .graph {
    width: 100%;
    height: 100%;
    position: absolute;
    outline: red solid 7px;
  }
</style>
