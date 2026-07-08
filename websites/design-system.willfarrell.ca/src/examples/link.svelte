<script>
import A from "@design-system/elements/a.svelte";
import P from "@design-system/elements/p.svelte";
import { page } from "$app/state";

const pathname = $derived.by(() => {
	try {
		return page.url.pathname;
	} catch {
		return "";
	}
});
</script>

<P>
	<A href="#">link</A>
	<A href={pathname}>link (current page)</A>
	<A href="https://example.org">link (external)</A>
</P>

<P>
	<A href="#" class="force active">link (active)</A>
	<A href="#" class="force focus">link (focus)</A>
	<A href="#" class="force hover">link (hover)</A>
	<A href="#" class="force visited">link (visited)</A>
</P>
