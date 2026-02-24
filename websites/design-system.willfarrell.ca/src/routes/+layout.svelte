<script>
import "@design-system/style/all.css";
import "@components/theme.css";
const { children } = $props();
//import '@scripts/bootstrap.js'; /* self is not defined */
</script>

{@render children?.()}
