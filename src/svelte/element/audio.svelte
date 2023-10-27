<script>
  export let src

  const baseUrl =
    import.meta.env.VITE_LOCALHOST === 'TRUE'
      ? 'https://dev.datastream.org'
      : ''
</script>

<audio is="audio" controls {...$$props}>
  <source src="{baseUrl}/audio/{src}.mp3" type="audio/mp3" />
  <source src="{baseUrl}/audio/{src}.ogg" type="audio/ogg" />
</audio>
