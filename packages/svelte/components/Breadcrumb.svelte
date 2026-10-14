<script>
import A from "../elements/a.svelte";
import Li from "../elements/li.svelte";
import Nav from "../elements/nav.svelte";
import Ol from "../elements/ol.svelte";

const { items = [], label = "Breadcrumb", ...props } = $props();
</script>

<Nav {...props} class="breadcrumb" aria-label={label}>
  <Ol>
    {#each items as { href, text }, idx}
      <Li><A {href} aria-current={idx === items.length - 1 ? "page" : undefined}>{text}</A></Li>
    {/each}
  </Ol>
</Nav>
