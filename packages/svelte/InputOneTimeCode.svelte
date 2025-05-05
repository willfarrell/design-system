<script>
  import InputNumber from "./InputNumber.svelte";
  let { ...props } = $props();
  let {
    pattern = "^[0-9]*$"
  } = props
</script>

<InputNumber
  {...props}
  autocomplete='one-time-code'
  {pattern}
/>
