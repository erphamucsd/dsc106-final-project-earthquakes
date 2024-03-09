<script>
  import { fly } from "svelte/transition";
  import { tweened } from "svelte/motion";
  import { cubicOut } from "svelte/easing";
  import earthquakeClipart from './assets/earthquake_image.jpg';
  
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

  // Create tweened variables for background story
  const tweenedbackgroundIntroOpacity = tweened(0);
  const tweenedStory1Opacity = tweened(0);
  const tweenedStory1Y = tweened(0);
  tweenedStory1Y.set(height*1.5)

  const tweenedStory2Opacity = tweened(0);
  const tweenedStory2Y = tweened(0);
  tweenedStory1Y.set(height*1.5)
  const tweenedStory3Opacity = tweened(0);
  const tweenedStory3Y = tweened(0);
  const tweenedStory4Opacity = tweened(0);
  const tweenedStory4Y = tweened(0);
  const tweenedStory5Opacity = tweened(0);
  const tweenedStory5Y = tweened(0);
  const tweenedStory6Opacity = tweened(0);
  const tweenedStory6Y = tweened(0);
  const tweenedStory7Opacity = tweened(0);
  const tweenedStory7Y = tweened(0);
  const tweenedStory8Opacity = tweened(0);
  const tweenedStory8Y = tweened(0);
  const tweenedStory9Opacity = tweened(0);
  const tweenedStory9Y = tweened(0);
  const tweenedStory10Opacity = tweened(0);
  const tweenedStory10Y = tweened(0);

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
      tweenedStory2Y.set(height*1.5)
    } else {
      tweenedStory1Opacity.set(0)
    }
    if (index === 6) {
      tweenedStory2Opacity.set(1)
      tweenedStory1Y.set(-20)
      tweenedStory2Y.set(height/2)
      tweenedStory3Y.set(height*1.5)
    } else {
      tweenedStory2Opacity.set(0)
    }
    if (index === 7) {
      tweenedStory3Opacity.set(1)
      tweenedStory2Y.set(-20)
      tweenedStory3Y.set(height/2)
      tweenedStory4Y.set(height/2)
    } else {
      tweenedStory3Opacity.set(0)
    }
    if (index === 8) {
      tweenedStory4Opacity.set(1)
      tweenedStory3Y.set(-20)
      tweenedStory5Y.set(height/2)
    } else {
      tweenedStory4Opacity.set(0)
    }
    if (index === 9) {
      tweenedStory5Opacity.set(1)
      tweenedStory6Y.set(height/2)
    } else {
      tweenedStory5Opacity.set(0)
    }
    if (index === 10) {
      tweenedStory6Opacity.set(1)
      tweenedStory8Y.set(-20)
    } else {
      tweenedStory6Opacity.set(0)
    }
    if (index === 11) {
      tweenedStory7Opacity.set(1)
      tweenedStory7Y.set(height/2)
    } else {
      tweenedStory7Opacity.set(0)
    }
    if (index === 12) {
      tweenedStory8Opacity.set(1)
      tweenedStory7Y.set(-20)
      tweenedStory8Y.set(height/2)
    } else {
      tweenedStory8Opacity.set(0)
    }
    if (index === 13) {
      tweenedStory9Opacity.set(1)
      tweenedStory8Y.set(-20)
      tweenedStory9Y.set(height/2)
    } else {
      tweenedStory9Opacity.set(0)
    }
    if (index === 14) {
      tweenedStory10Opacity.set(1)
      tweenedStory9Y.set(-20)
      tweenedStory10Y.set(height/2)
    } else {
      tweenedStory10Opacity.set(0)
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
      text-anchor="middle"
      opacity={$tweenedStory1Opacity}
      in:fly={{ y: -300, duration: 1000 }}
      out:fly={{ y: -300, duration: 1000 }}
    >
      <tspan x="22%" dy="-4em">an extreme earthquake measuring 7.9 on the</tspan>
      <tspan x="22%" dy="1.8em">moment magnitude scale struck the Northern </tspan>
      <tspan x="22%" dy="1.8em">coast of California. This earthquake devastated </tspan>
      <tspan x="22%" dy="1.8em">areas ranging from San Francisco to Eureka, </tspan>
      <tspan x="22%" dy="1.8em">causing thousands to die and devastating fires</tspan>
      <tspan x="22%" dy="1.8em">in San Francisco.</tspan>
    </text>


    <text class = 'backgroundStory2'
      x="10%"
      y={$tweenedStory2Y}
      text-anchor="middle"
      opacity={$tweenedStory2Opacity}
      in:fly={{ y: -300, duration: 1000 }}
      out:fly={{ y: -300, duration: 1000 }}
    >      
      <tspan x="22%" dy="-4em">In the aftermath of this earthquake, workers</tspan>
      <tspan x="22%" dy="1.8em">found that more than 3,000 died, over 225,000</tspan>
      <tspan x="22%" dy="1.8em">people became homeless, and over $400 million</tspan>
      <tspan x="22%" dy="1.8em">was lost in property damages. With most of</tspan>
      <tspan x="22%" dy="1.8em">San Francicsco and other parts of the bay</tspan>
      <tspan x="22%" dy="1.8em">destroyed, this fateful event is remembered as</tspan>
      <tspan x="22%" dy="1.8em">the deadliest earthquake in US history.</tspan>
    </text>
    
    <text class = 'impactStory1'
      x="90%"
      y={$tweenedStory3Y}
      text-anchor="middle"
      opacity={$tweenedStory3Opacity}
      in:fly={{ y: -300, duration: 1000 }}
      out:fly={{ y: -300, duration: 1000 }}
    >
      <tspan x="78%" dy="-4em">Earthquakes are often labeled as one of the most</tspan>
      <tspan x="78%" dy="1.8em">devastating natural disasters. Not only are they </tspan>
      <tspan x="78%" dy="1.8em">difficult to predict and prepare for compared to</tspan>
      <tspan x="78%" dy="1.8em">other types of natural disasters, earthquakes can</tspan>
      <tspan x="78%" dy="1.8em">also trigger other catestrofic events like tsunamis</tspan>
      <tspan x="78%" dy="1.8em">and fires.</tspan>
    </text>

    <text class = 'impactStory2'
      x="90%"
      y={$tweenedStory4Y}
      text-anchor="middle"
      opacity={$tweenedStory4Opacity}
      in:fly={{ y: -300, duration: 1000 }}
      out:fly={{ y: -300, duration: 1000 }}
    >
      <tspan x="78%" dy="-4em">Although the earthquake itself may last for just a few</tspan>
      <tspan x="78%" dy="1.8em">minutes, the aftermath of an earthquake can be felt</tspan>
      <tspan x="78%" dy="1.8em">for weeks to years. Earthquakes can displace people from</tspan>
      <tspan x="78%" dy="1.8em">their homes and destroy livelihoods in an instant, ultimately</tspan>
      <tspan x="78%" dy="1.8em">impacting society, the economy, and climate. For example,</tspan>
      <tspan x="78%" dy="1.8em">he Great East Japan Earthquake in 2011 caused an economic</tspan>
      <tspan x="78%" dy="1.8em">loss of $360 billion alone. As such, repairing damages</tspan>
      <tspan x="78%" dy="1.8em">caused by earthquakes can be extremely costly.</tspan>
    </text>

    <text class = 'faultStory1'
      x="10%"
      y={$tweenedStory5Y}
      text-anchor="middle"
      opacity={$tweenedStory5Opacity}
      in:fly={{ y: -300, duration: 1000 }}
      out:fly={{ y: -300, duration: 1000 }}
    >
      <tspan x="22%" dy="-4em">How are these disastrous earthquakes formed?</tspan>
      <tspan x="22%" dy="1.8em">Earth’s crust consists of 7 major tectonic plates,</tspan>
      <tspan x="22%" dy="1.8em">each varying in size and location. When these plates</tspan>
      <tspan x="22%" dy="1.8em">move, the borders of the tectonic plates, also known</tspan>
      <tspan x="22%" dy="1.8em">as fault lines, occasionally touch each other, and</tspan>
      <tspan x="22%" dy="1.8em">these brief moments of interaction are what cause</tspan>
      <tspan x="22%" dy="1.8em">earthquakes. The friction from the plates touching</tspan>
      <tspan x="22%" dy="1.8em">creates energy, which is released as waves to Earth's</tspan>
      <tspan x="22%" dy="1.8em">surface. The amount of pressure that’s produced from</tspan>
      <tspan x="22%" dy="1.8em">the friction determines how strong the earthquake is.</tspan>
    </text>

    <text class = 'faultStory2'
      x="10%"
      y={$tweenedStory6Y}
      text-anchor="middle"
      opacity={$tweenedStory6Opacity}
      in:fly={{ y: -300, duration: 1000 }}
      out:fly={{ y: -300, duration: 1000 }}
    >
      <tspan x="22%" dy="-4em">Since earthquakes happen when tectonic plates touch,</tspan>
      <tspan x="22%" dy="1.8em">almost all earthquakes occur at fault lines. This</tspan>
      <tspan x="22%" dy="1.8em">map shows each earthquake as a circle on the map, and</tspan>
      <tspan x="22%" dy="1.8em">we can see that these earthquakes happen on Earth’s</tspan>
      <tspan x="22%" dy="1.8em">fault lines. A majority of earthquakes are so small</tspan>
      <tspan x="22%" dy="1.8em">that they go by undetected, but there are some powerful</tspan>
      <tspan x="22%" dy="1.8em">earthquakes, and these are represented by the red circles.</tspan>
    </text>

    <text class = 'ringFireStory'
      x="90%"
      y={$tweenedStory7Y}
      text-anchor="middle"
      opacity={$tweenedStory7Opacity}
      in:fly={{ y: -300, duration: 1000 }}
      out:fly={{ y: -300, duration: 1000 }}
    >
      <tspan x="78%" dy="-4em">Most of the earthquakes occur in a horseshoe-shaped</tspan>
      <tspan x="78%" dy="1.8em">path along the Pacific Ocean, and this region is referred</tspan>
      <tspan x="78%" dy="1.8em">to as the Ring of Fire. Due to high tectonic activity</tspan>
      <tspan x="78%" dy="1.8em">in this area, the Ring of Fire is where 90% of earthquakes</tspan>
      <tspan x="78%" dy="1.8em">and 75% of active volcanoes are located. Many major</tspan>
      <tspan x="78%" dy="1.8em">earthquakes that have shook our world to its core have</tspan>
      <tspan x="78%" dy="1.8em">happened along this seismically active region.</tspan>
    </text>

    <rect 
    width="550" 
    height="340" 
    x="0%" 
    y={$tweenedStory8Y - 110} 
    rx="20" 
    ry="20" 
    fill="white" 
    opacity={$tweenedStory8Opacity / 2}
    />

    <text class = 'earthquakeExample1'
      x="10%"
      y={$tweenedStory8Y}
      text-anchor="middle"
      background-color='aqua'
      opacity={$tweenedStory8Opacity}
      in:fly={{ y: -300, duration: 1000 }}
      out:fly={{ y: -300, duration: 1000 }}
    >
      <tspan x="22%" dy="-4em">In the 1960, Valdivia, Chile was rocked by the most powerful</tspan>
      <tspan x="22%" dy="1.8em">earthquake ever recorded. With an astonishing magnitude of 9.5,</tspan>
      <tspan x="22%" dy="1.8em">this earthquake is a testament of what the Ring of Fire is</tspan>
      <tspan x="22%" dy="1.8em">capable of creating. This earthquake was so powerful that it</tspan>
      <tspan x="22%" dy="1.8em">created a deadly tsunami that propagated out into the Pacific.</tspan>
      <tspan x="22%" dy="1.8em">The tsunami killed 1655 people, killing people as far away as</tspan>
      <tspan x="22%" dy="1.8em">Hawaii, Japan, and the Philippines. At the end, this quake</tspan>
      <tspan x="22%" dy="1.8em">injured 3000 people and caused $550 million in damages</tspan>
      <tspan x="22%" dy="1.8em">in southern Chile alone.</tspan>
    </text>

    <text class = 'earthquakeExample2'
      x="10%"
      y={$tweenedStory9Y}
      text-anchor="middle"
      opacity={$tweenedStory9Opacity}
      in:fly={{ y: -300, duration: 1000 }}
      out:fly={{ y: -300, duration: 1000 }}
    >
      <tspan x="22%" dy="-4em">Japan 2011</tspan>
    </text>

    <text class = 'earthquakeExample3'
      x="10%"
      y={$tweenedStory10Y}
      text-anchor="middle"
      opacity={$tweenedStory10Opacity}
      in:fly={{ y: -300, duration: 1000 }}
      out:fly={{ y: -300, duration: 1000 }}
    >
      <tspan x="22%" dy="-4em">SF earthquake</tspan>
    </text>
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
    font-size: 20px;
  }

  .backgroundStory1 {
    white-space: pre-wrap;
  }

  .graph {
    width: 100%;
    height: 100%;
    position: absolute;
  }
</style>
