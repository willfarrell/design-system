<script>
	export let src
</script>

<!-- requires filter or mask to color -->
<!-- <img class="icon" {alt} src="{src}" decoding="async" height="16" loading="lazy" width="16" {...$$props}> -->
<span class="icon" data-icon="{src}" inert/>
<!-- doesn't load -->

<!-- will support currentColor -->
<!--
<object type="image/svg+xml" data="/img/icons.svg" width="0" height="0"/>
<svg class="icon" {alt} {height} {width} {...$$props}>
	<use href={src}/>
</svg>
-->