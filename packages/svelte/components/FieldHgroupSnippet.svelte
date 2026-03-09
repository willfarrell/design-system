<script>
import { createRawSnippet } from "svelte";
import H1 from "../elements/h1.svelte";
import Hgroup from "../elements/hgroup.svelte";
import P from "../elements/p.svelte";

const { children, prefix, label, ...props } = $props();
</script>



  <Hgroup>
      {#if prefix}
          <P aria-roledescription="subtitle">{prefix}</P>
    {/if}
    <H1>{label}</H1>
  </Hgroup>
