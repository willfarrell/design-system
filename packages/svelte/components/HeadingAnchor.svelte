<script>
    import A from "../elements/a.svelte";
        import Span from "../elements/span.svelte";

    const { id } = $props();
</script>

{#if id}
  <A href="#{id}" class="noprint"
    ><Span aria-hidden="true">#</Span><Span class="visually-hidden">anchor</Span
    ></A
  >
{/if}
