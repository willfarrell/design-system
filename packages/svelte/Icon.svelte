<script>
	let { src, alt } = $props()
	// TODO docs: https://css-tricks.com/accessible-svgs/
	const role = alt ? 'img' : null
</script>

<svg class="icon" {role}>
	{#if alt}<title>{alt}</title>{/if}
	<use href="{src}" />
</svg>
