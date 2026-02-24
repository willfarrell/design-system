<script>
// import webComponentUrl from "../component/ds-form-submit.js?url";
import Form from "./element/form.svelte";

const { children, is = "ds-form-submit", ...props } = $props();
</script>

<!-- <svelte:head>
  <script src={webComponentUrl} type="module"></script>
</svelte:head> -->

<Form {is} {...props}>
  {@render children?.()}
</Form>
