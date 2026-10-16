<script>
import { getContext } from "svelte";
import H1 from "../elements/h1.svelte";
import Hgroup from "../elements/hgroup.svelte";
import P from "../elements/p.svelte";
import Span from "../elements/span.svelte";

const { prefix, label } = $props();
const inLabel = getContext("label");
</script>

{#if inLabel}
  {#if prefix}<Span>{prefix}</Span>{/if}
  {label}
{:else}
  <Hgroup>
    {#if prefix}
      <P aria-roledescription="subtitle">{prefix}</P>
    {/if}
    <H1>{label}</H1>
  </Hgroup>
{/if}
