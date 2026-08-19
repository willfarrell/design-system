<script>
import Span from "../elements/span.svelte";
import Card from "./Card.svelte";
import DataNumber from "./DataNumber.svelte";

const { value, children: label, class: className, ...props } = $props();
</script>

<Card class="metric {className ?? ''}" {...props}>
  {#snippet children({ id })}
    <DataNumber {value} />
    <Span {id}>{@render label?.()}</Span>
  {/snippet}
</Card>

<style>
  :global([is="ds-card"].metric) {
    & .text {
      justify-content: center;
      text-align: center;
    }
    /* The count is what you read first; the label explains it. */
    & data {
      font-size: 250%;
      line-height: 1.1;
    }
  }
</style>
