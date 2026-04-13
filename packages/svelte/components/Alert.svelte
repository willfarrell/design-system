<script>
    import P from "../elements/p.svelte";
        import Section from "../elements/section.svelte";

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
