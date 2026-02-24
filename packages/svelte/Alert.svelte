<script>
    import Section from "@design-system/svelte/element/section.svelte";
    import P from "@design-system/svelte/element/p.svelte";

let {
	children,
	role = "alert", // or status
	...props
} = $props();
</script>

<Section {role} {...props}>
    <P>
  {@render children?.()}
    </P>
</Section>
