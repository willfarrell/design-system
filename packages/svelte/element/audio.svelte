<script>
  import allowedAttributes from '../utils/attributes.js'
  const elementAttributes = new Set([
    'autoplay',
    'controls',
    'controlslist',
    'crossorigin',
    'disableremoteplayback',
    'loop',
    'muted',
    'preload',
    'src'
  ])
  
  let {
    children,
    ...props
  } = $props();
</script>
<audio autoplay="false" controls preload="none" {...allowedAttributes(props, elementAttributes)}>
  {@render children?.()}
</audio>

<!-- <audio is="audio" controls {...props}>
  <source src="{baseUrl}/audio/{props.src}.mp3" type="audio/mp3" />
  <source src="{baseUrl}/audio/{props.src}.ogg" type="audio/ogg" />
</audio> -->
