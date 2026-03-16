<script>
import webComponentUrl from "@willfarrell-ds/vanilla/components/ds-scrollspy.js?worker&url";
import H2 from "../elements/h2.svelte";
import Header from "../elements/header.svelte";
import Nav from "../elements/nav.svelte";
import Section from "../elements/section.svelte";

const { children, labelHeader = "On this page", labelId = "nav-scrollspy-label", is = "ds-scrollspy", ...props } = $props();
</script>

<svelte:head>
  <link rel="modulepreload" href={webComponentUrl} />
</svelte:head>

<Nav aria-labelledby={labelId} {...props} {is}>
  <Section>
    <Header><H2 id={labelId}>{labelHeader}</H2></Header>
    {@render children?.()}
  </Section>
</Nav>
