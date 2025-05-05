<script>
  import Data from "@design-system/svelte/element/data.svelte";

  const { value, ...props } = $props();

  const getLocalizedNumber = (value, locale, options = {}) => {
    if (typeof value === "string") value = Number.parseFloat(value);
    return new Intl.NumberFormat(locale, options).format(value);
  };

  const locale = "en-CA"; // TODO connect to page localization i18m

  const label = getLocalizedNumber(value, locale, props);
</script>

<Data {value} {...props}>{label}</Data>
