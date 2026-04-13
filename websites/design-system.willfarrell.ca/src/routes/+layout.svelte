<script>
    import "@styles/above.css";
        // import trustedTypesUrl from "@willfarrell-ds/vanilla/components/trustedtypes.js?url";
        import bootstrapUrl from "@scripts/bootstrap.js?worker&url";
        import belowStyles from "@styles/below.css?url";
        import printStyles from "@styles/print.css?url";

        const { children } = $props();
</script>

<svelte:head>
    <link rel="preload stylesheet" as="style" href="{belowStyles}" />
    <!-- <link rel="modulepreload" href={trustedTypesUrl} /> -->
    <script type="module" src={bootstrapUrl}></script>
    <link rel="stylesheet" media="print" href="{printStyles}" />
</svelte:head>

{@render children?.()}
