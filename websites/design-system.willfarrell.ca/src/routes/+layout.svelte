<script>
    import "@styles/above.css";
    import bootstrapUrl from "@scripts/bootstrap.js?url&worker";
    import belowStyles from "@styles/below.css?url";
    import printStyles from "@styles/print.css?url";

    const { children } = $props();
</script>

<svelte:head>
    <link rel="preload stylesheet" as="style" href="{belowStyles}" />
    <script src={bootstrapUrl} type="module"></script>
    <link rel="stylesheet" media="print" href="{printStyles}" />
</svelte:head>

{@render children?.()}
