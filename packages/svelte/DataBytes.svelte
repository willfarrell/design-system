<script>
  import Data from "@design-system/svelte/element/data.svelte";

  const { value, ...props } = $props();

  const getLocalizedBytes = (value, locale, decimals = 2) => {
    if (value === 0) return "0 Bytes";

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(value) / Math.log(k));
    return (
      new Intl.NumberFormat(locale).format(
        parseFloat((value / Math.pow(k, i)).toFixed(dm)),
      ) +
      " " +
      sizes[i]
    );
  };

  const locale = "en-CA"; // TODO connect to page localization i18m

  const label = getLocalizedBytes(value, locale, props);
</script>

<Data {value} {...props}>{label}</Data>
