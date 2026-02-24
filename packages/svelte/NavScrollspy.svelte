<script>
// import webComponentUrl from "../component/ds-scrollspy.js?url";
import Nav from "./element/nav.svelte";

const { children, ...props } = $props();
const { is = "ds-scrollspy" } = props;
</script>

<!-- <svelte:head>
  <script src={webComponentUrl} type="module"></script>
</svelte:head> -->

<Nav {...props} {is}>
  {@render children?.()}
</Nav>
