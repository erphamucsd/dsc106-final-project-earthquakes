<script>
  import { fly } from "svelte/transition";
  import { crossfade } from 'svelte/transition';
  import { tweened } from "svelte/motion";
  import { cubicOut } from "svelte/easing";
  import earthquakeClipart from './assets/earthquake_image.jpg';
  import sfEarthquake from './assets/sf_earthquake.png';
  import tsunamiImage from './assets/tsunami.jpg';
  import cloudImage from './assets/clouds.png';
  import japanEarthquake from './assets/japanEarthquake.jpg';
  export let index, width, height;

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
    } if (0 < index <= 2) { // Title and title image come in
      tweenedTitleY.set(height * 1 / 6);
      tweenedTitleImageOpacity.set(1);
    } if (index <= 3) { // Subtitle comes in
      tweenedSubtitleY.set(height * 1 / 4);
    } else { // Title, subtitle and image leave
      tweenedTitleY.set(-20);
      tweenedSubtitleY.set(-20);
      tweenedTitleImageOpacity.set(0);
    }
  }

  // Create tweened variables for background story
  const tweenedCloudOpacity = tweened(0)
  const tweenedCloudY = tweened(0)
  const tweenedbackgroundIntroOpacity = tweened(0);
  const tweenedStory1Opacity = tweened(0);
  const tweenedStory1Y = tweened(0);
  tweenedStory1Y.set(height*1.5)
  const introImageOpacity = tweened(0)
  introImageOpacity.set(0)
  const tweenedRectOpacity = tweened(0)
  tweenedRectOpacity.set(0)
  
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
  const tweenedjapanEarthquakeOpacity = tweened(0)
  const tweenedStory9Opacity = tweened(0);
  const tweenedStory9Y = tweened(0);
  const tweenedStory10Opacity = tweened(0);
  const tweenedStory10Y = tweened(0);
  const tweenedStory11Y = tweened(0);
  const tweenedStory11Opacity = tweened(0);
  const tweenedStory12Y = tweened(0);
  const tweenedStory12Opacity = tweened(0);
  const tweenedStory13Y = tweened(0);
  const tweenedStory13Opacity = tweened(0);

  $: { // background story animations
    if (index === 2) {
      tweenedRectOpacity.set(0)
    }
    if (index === 3) {
      tweenedRectOpacity.set(.5)
      tweenedCloudOpacity.set(0)
      tweenedCloudY.set(height*1.5)
    }
    if (index === 4) {
      tweenedbackgroundIntroOpacity.set(1)
      tweenedStory1Y.set(height*1.5)
      introImageOpacity.set(0)
      tweenedRectOpacity.set(1)
      tweenedCloudOpacity.set(.3)
      tweenedCloudY.set(-height/3)

     } else {
      tweenedbackgroundIntroOpacity.set(0)
    }
    if (index === 5) {
      tweenedStory1Opacity.set(1)
      tweenedStory1Y.set(height/2)
      tweenedStory2Y.set(height*1.5)
      introImageOpacity.set(1)
      tweenedRectOpacity.set(.5)
      tweenedCloudOpacity.set(0)
      tweenedCloudY.set(-height)

    } else {
      tweenedStory1Opacity.set(0)
    }
    if (index === 6) {
      tweenedStory2Opacity.set(1)
      tweenedStory1Y.set(-20)
      tweenedStory2Y.set(height/2)
      tweenedStory3Y.set(height*1.5)
      introImageOpacity.set(1)
      tweenedRectOpacity.set(.5)
    } else {
      tweenedStory2Opacity.set(0)
    }
    if (index === 7) {
      tweenedStory3Opacity.set(1)
      tweenedStory2Y.set(-20)
      tweenedStory3Y.set(height/2)
      tweenedStory4Y.set(height/2)
      introImageOpacity.set(0)
      tweenedRectOpacity.set(0)
      tweenedjapanEarthquakeOpacity.set(0)
    } else {
      tweenedStory3Opacity.set(0)
    }
    if (index === 8) {
      tweenedStory4Opacity.set(1)
      tweenedStory3Y.set(-20)
      tweenedStory5Y.set(height/2)
      tweenedjapanEarthquakeOpacity.set(.75)

    } else {
      tweenedStory4Opacity.set(0)
    }
    if (index === 9) {
      tweenedStory5Opacity.set(1)
      tweenedStory6Y.set(height/2)
      tweenedjapanEarthquakeOpacity.set(0)
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
    if (index === 15) {
      tweenedStory11Opacity.set(1)
      tweenedStory10Y.set(-20)
      tweenedStory11Y.set(height/2)
    } else {
      tweenedStory11Opacity.set(0)
    }
    if (index === 16) {
      tweenedStory12Opacity.set(1)
      tweenedStory11Y.set(-20)
      tweenedStory12Y.set(height/2)
    } else {
      tweenedStory12Opacity.set(0)
    }
    if (index === 17) {
      tweenedStory13Opacity.set(1)
      tweenedStory12Y.set(-20)
      tweenedStory13Y.set(height/2)
    } else {
      tweenedStory13Opacity.set(0)
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
   
    <rect class="grey-rectangle"
    width="100%"  
    height="100%" 
    x="0"
    y="0"
    fill="grey"
    opacity={$tweenedRectOpacity}
    in:crossfade={{ duration: 1000 }}
    out:crossfade={{ duration: 1000 }}
  />

    <image class="clouds"
    x={-width/4} y={-height*5/12} width="150%" height="150%"
    xlink:href={cloudImage}
      opacity={$tweenedCloudOpacity}
      in:crossfade={{ duration: 1000 }}
      out:crossfade={{ duration: 1000 }}
    />


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

    <image class="introImage"
    x={width * 0.45} y="0" width={width * 0.55} height="100%"
    xlink:href={sfEarthquake}
      opacity={$introImageOpacity}
      in:crossfade={{ duration: 1000 }}
      out:crossfade={{ duration: 1000 }}
    />

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
    
    <image class="tsunamiImage"
    x={-width*5/12} y="0" width="100%" height="100%"
    xlink:href={tsunamiImage}
      opacity={$tweenedStory3Opacity}
      in:crossfade={{ duration: 1000 }}
      out:crossfade={{ duration: 1000 }}
    />
   
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

    <image class="japanEarthquake"
    x="{-width*1/12}" y="0" width="115%" height="115%"
    xlink:href={japanEarthquake}
      opacity={$tweenedjapanEarthquakeOpacity}
      in:crossfade={{ duration: 1000 }}
      out:crossfade={{ duration: 1000 }}
    />
   
    <rect 
      width="520" 
      height="320" 
      x="4%" 
      y={$tweenedStory4Y - 120} 
      rx="20" 
      ry="20" 
      fill="white" 
      opacity={$tweenedStory4Opacity *3/4}
    />

    <text class = 'impactStory2'
      x="5%"
      y={$tweenedStory4Y}
      text-anchor="middle"
      opacity={$tweenedStory4Opacity}
      in:fly={{ y: -300, duration: 1000 }}
      out:fly={{ y: -300, duration: 1000 }}
    >
      <tspan x="26%" dy="-4em">Although the earthquake itself may last for just a few</tspan>
      <tspan x="26%" dy="1.8em">minutes, the aftermath of an earthquake can be felt for</tspan>
      <tspan x="26%" dy="1.8em">weeks to years globally. Earthquakes can displace people from</tspan>
      <tspan x="26%" dy="1.8em">their homes and destroy livelihoods in an instant, ultimately</tspan>
      <tspan x="26%" dy="1.8em">impacting society, the economy, and climate. For example,</tspan>
      <tspan x="26%" dy="1.8em">the Great East Japan Earthquake in 2011 caused an economic</tspan>
      <tspan x="26%" dy="1.8em">loss of $360 billion alone. As such, repairing damages</tspan>
      <tspan x="26%" dy="1.8em">caused by earthquakes can be extremely costly.</tspan>
    </text>

    <rect 
      width="460" 
      height="390" 
      x="59%" 
      y={$tweenedStory5Y - 120} 
      rx="20" 
      ry="20" 
      fill="white" 
      opacity={$tweenedStory5Opacity *6/7}
    />

    <text class = 'faultStory1'
      x="5%"
      y={$tweenedStory5Y}
      text-anchor="middle"
      opacity={$tweenedStory5Opacity}
      in:fly={{ y: -300, duration: 1000 }}
      out:fly={{ y: -300, duration: 1000 }}
    >
      <tspan x="78%" dy="-4em">How are these disastrous earthquakes formed?</tspan>
      <tspan x="78%" dy="1.8em">Earth’s crust consists of 7 major tectonic plates,</tspan>
      <tspan x="78%" dy="1.8em">each varying in size and location. When these plates</tspan>
      <tspan x="78%" dy="1.8em">move, the borders of the tectonic plates, also known</tspan>
      <tspan x="78%" dy="1.8em">as fault lines, occasionally touch each other, and</tspan>
      <tspan x="78%" dy="1.8em">these brief moments of interaction are what cause</tspan>
      <tspan x="78%" dy="1.8em">earthquakes. The friction from the plates touching</tspan>
      <tspan x="78%" dy="1.8em">creates energy, which is released as waves to Earth's</tspan>
      <tspan x="78%" dy="1.8em">surface. The amount of pressure that’s produced from</tspan>
      <tspan x="78%" dy="1.8em">the friction determines how strong the earthquake is.</tspan>
    </text>

    <rect 
      width="480" 
      height="290" 
      x="2%" 
      y={$tweenedStory6Y - 120} 
      rx="20" 
      ry="20" 
      fill="white" 
      opacity={$tweenedStory6Opacity *6/7}
    />

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

    <rect 
      width="480" 
      height="290" 
      x="58%" 
      y={$tweenedStory7Y - 120} 
      rx="20" 
      ry="20" 
      fill="white" 
      opacity={$tweenedStory7Opacity *2/3}
    />

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
      <tspan x="78%" dy="1.8em">to as the Ring of Fire. Due to high tectonic activity in</tspan>
      <tspan x="78%" dy="1.8em">this area, the Ring of Fire is where 90% of earthquakes</tspan>
      <tspan x="78%" dy="1.8em">and 75% of active volcanoes are located. Many major</tspan>
      <tspan x="78%" dy="1.8em">earthquakes that have shook our world to its core have</tspan>
      <tspan x="78%" dy="1.8em">happened along this seismically active region.</tspan>
    </text>

    <rect 
    width="550" 
    height="340" 
    x="1%" 
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
      opacity={$tweenedStory8Opacity}
      in:fly={{ y: -300, duration: 1000 }}
      out:fly={{ y: -300, duration: 1000 }}
    >
      <tspan x="24%" dy="-4em">In the 1960, Valdivia, Chile was rocked by the most powerful</tspan>
      <tspan x="24%" dy="1.8em">earthquake ever recorded. With an astonishing magnitude of 9.5,</tspan>
      <tspan x="24%" dy="1.8em">this earthquake is a testament of what the Ring of Fire is</tspan>
      <tspan x="24%" dy="1.8em">capable of creating. This earthquake was so powerful that it</tspan>
      <tspan x="24%" dy="1.8em">created a deadly tsunami that propagated out into the Pacific.</tspan>
      <tspan x="24%" dy="1.8em">The tsunami killed 1655 people, killing people as far away as</tspan>
      <tspan x="24%" dy="1.8em">Hawaii, Japan, and the Philippines. At the end, this quake</tspan>
      <tspan x="24%" dy="1.8em">injured 3000 people and caused $550 million in damages</tspan>
      <tspan x="24%" dy="1.8em">in southern Chile alone.</tspan>
    </text>

    <rect 
    width="590" 
    height="370" 
    x="57%" 
    y={$tweenedStory9Y - 110} 
    rx="20" 
    ry="20" 
    fill="white" 
    opacity={$tweenedStory9Opacity / 2}
    />

    <text class = 'earthquakeExample2'
      x="10%"
      y={$tweenedStory9Y}
      text-anchor="middle"
      opacity={$tweenedStory9Opacity}
      in:fly={{ y: -300, duration: 1000 }}
      out:fly={{ y: -300, duration: 1000 }}
    >
      <tspan x="78%" dy="-4em">On March 11, 2011, Japan experienced the costliest earthquake</tspan>
      <tspan x="78%" dy="1.8em">in history. Japan experiences the most earthquakes per year due</tspan>
      <tspan x="78%" dy="1.8em">to its proximity to several tectonic plates, but this 9.1-magnitude</tspan>
      <tspan x="78%" dy="1.8em">earthquake was particularly significant due to the extensive damage</tspan>
      <tspan x="78%" dy="1.8em">it caused. The earthquake created a massive tsunami with waves up to</tspan>
      <tspan x="78%" dy="1.8em">132 feet, which wiped out homes, businesses, and streets in northeastern</tspan>
      <tspan x="78%" dy="1.8em">Japan. The tsunami also destroyed the Fukushima nuclear power plant</tspan>
      <tspan x="78%" dy="1.8em">and caused a radiation leak, which created an exclusion zone around</tspan>
      <tspan x="78%" dy="1.8em">that area that’s still in effect to this day. All of this resulted in over</tspan>
      <tspan x="78%" dy="1.8em">18,000 deaths and $235 billion in damages.</tspan>
    </text>

    <rect 
    width="585" 
    height="360" 
    x="3%" 
    y={$tweenedStory10Y - 110} 
    rx="20" 
    ry="20" 
    fill="white" 
    opacity={$tweenedStory10Opacity / 2}
    />

    <text class = 'earthquakeExample3'
      x="10%"
      y={$tweenedStory10Y}
      text-anchor="middle"
      opacity={$tweenedStory10Opacity}
      in:fly={{ y: -300, duration: 1000 }}
      out:fly={{ y: -300, duration: 1000 }}
    >
      <tspan x="24%" dy="-4em">Although the death toll for the 2011 Japan earthquake was high,</tspan>
      <tspan x="24%" dy="1.8em">the record for the deadliest natural disaster in the 21st century</tspan>
      <tspan x="24%" dy="1.8em">belongs to the 2004 Indian Ocean earthquake. This 9.1-magnitude</tspan>
      <tspan x="24%" dy="1.8em">earthquake, which was centered off the west coast of northern</tspan>
      <tspan x="24%" dy="1.8em">Sumatra, Indonesia, created the most destructive tsunami in history,</tspan>
      <tspan x="24%" dy="1.8em">impacting 18 different countries. There were over 227,000 casualties</tspan>
      <tspan x="24%" dy="1.8em">and it left long-term environmental damage to the surrounding area.</tspan>
      <tspan x="24%" dy="1.8em">Many marine ecosystems suffered lasting damage, and freshwater</tspan>
      <tspan x="24%" dy="1.8em">supplies were polluted with waste and chemicals.</tspan>
    </text>

    <rect 
    width="565" 
    height="280" 
    x="4%" 
    y={$tweenedStory11Y - 110} 
    rx="20" 
    ry="20" 
    fill="white" 
    opacity={$tweenedStory11Opacity / 2}
    />

    <text class = 'earthquakeExample4'
      x="10%"
      y={$tweenedStory11Y}
      text-anchor="middle"
      opacity={$tweenedStory11Opacity}
      in:fly={{ y: -300, duration: 1000 }}
      out:fly={{ y: -300, duration: 1000 }}
    >
      <tspan x="24%" dy="-4em">The most significant Californian earthquake was the 1906 San</tspan>
      <tspan x="24%" dy="1.8em">Francisco earthquake, which had a 7.9 magnitude. Unlike the</tspan>
      <tspan x="24%" dy="1.8em">previously mentioned earthquakes that all generated destructive</tspan>
      <tspan x="24%" dy="1.8em">tsunamis, the San Francisco earthquake caused a massive fire</tspan>
      <tspan x="24%" dy="1.8em">that lasted for several days. The earthquake and fire destroyed</tspan>
      <tspan x="24%" dy="1.8em">over 80% of San Francisco and as many as 3000 people died,</tspan>
      <tspan x="24%" dy="1.8em">making it the deadliest earthquake in US history.</tspan>
    </text>

    <rect 
    width="610" 
    height="390" 
    x="2%" 
    y={$tweenedStory12Y - 110} 
    rx="20" 
    ry="20" 
    fill="white" 
    opacity={$tweenedStory12Opacity / 2}
    />

    <text class = 'takeaway1'
      x="10%"
      y={$tweenedStory12Y}
      text-anchor="middle"
      opacity={$tweenedStory12Opacity}
      in:fly={{ y: -300, duration: 1000 }}
      out:fly={{ y: -300, duration: 1000 }}
    >
      <tspan x="24%" dy="-4em">As we can see on the map, the San Andreas fault line runs</tspan>
      <tspan x="24%" dy="1.8em">through California, which makes California prone to earthquakes.</tspan>
      <tspan x="24%" dy="1.8em">However, the San Andreas has been in a seismic drought due to the</tspan>
      <tspan x="24%" dy="1.8em">lack of major earthquakes in California. This fault line has a</tspan>
      <tspan x="24%" dy="1.8em">history of producing massive earthquakes every 180 years, but it's</tspan>
      <tspan x="24%" dy="1.8em">been over 300 years since Southern California experienced a major</tspan>
      <tspan x="24%" dy="1.8em">earthquake. Although this may seem like good news, this unfortunately</tspan>
      <tspan x="24%" dy="1.8em">means that there could be a strong earthquake coming in the future.</tspan>
      <tspan x="24%" dy="1.8em">Some studies estimate as high as a 60% chance of an earthquake with</tspan>
      <tspan x="24%" dy="1.8em">a 6.5-magnitude or stronger striking the LA region in the next 30 years.</tspan>
    </text>

    <rect 
    width="510" 
    height="170" 
    x="6%" 
    y={$tweenedStory13Y - 110} 
    rx="20" 
    ry="20" 
    fill="white" 
    opacity={$tweenedStory13Opacity / 2}
    />

    <text class = 'takeaway2'
      x="10%"
      y={$tweenedStory13Y}
      text-anchor="middle"
      opacity={$tweenedStory13Opacity}
      in:fly={{ y: -300, duration: 1000 }}
      out:fly={{ y: -300, duration: 1000 }}
    >
      <tspan x="24%" dy="-4em">Due to this high likelihood, it’s important to be prepared</tspan>
      <tspan x="24%" dy="1.8em">for an earthquake. We’ve seen the devastating impact that</tspan>
      <tspan x="24%" dy="1.8em">earthquakes have, so make sure you have an idea of what to</tspan>
      <tspan x="24%" dy="1.8em">do if you ever experience a major earthquake.</tspan>
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
