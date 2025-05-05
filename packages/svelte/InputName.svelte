<script>
  import InputText from "./InputText.svelte";
  let { ...props } = $props();
  let {
    autocomplete = 'nickname' // name, given-name, additional-name, family-name, nickname
  } = props
</script>

<InputText {...props} {autocomplete} />
