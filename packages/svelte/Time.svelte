<script>
  import Time from "@design-system/svelte/element/time.svelte";

  const { datetime, ...props } = $props();

  const getLocalizedDate = (value, locale, options = {}) => {
    if (!value) return value;
    options.dateStyle ??= "long";
    return new Intl.DateTimeFormat(locale, options).format(new Date(value));
  };

  const locale = "en-CA"; // TODO connect to page localization i18m

  const label = getLocalizedDate(datetime, locale, props);
</script>

<Time datatime={datetime} {...props}>{label}</Time>
