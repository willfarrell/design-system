<script>
  import Data from "@design-system/svelte/element/data.svelte";

  const { value, enums, ...props } = $props();

  const locale = "en-CA"; // TODO connect to page localization i18m

  const label = enums[value];
</script>

<Data {value} {...props}>{label}</Data>
