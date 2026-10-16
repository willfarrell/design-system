<script>
import Video from "@willfarrell-ds/svelte/components/Video.svelte";
import P from "@willfarrell-ds/svelte/elements/p.svelte";
</script>

<Video
	sources={[
		{ src: "/video/test-pattern.webm", type: "video/webm" },
		{ src: "/video/test-pattern.mp4", type: "video/mp4" },
	]}
	poster="/video/test-pattern.jpg"
	width="320"
	height="180"
	tracks={[
		{ src: "/video/test-pattern.en.vtt", srclang: "en", label: "English" },
	]}
	caption="Test pattern with a steady tone"
>
	{#snippet transcript()}
		<P>A three second colour test pattern with a moving counter. A steady 440 hertz tone plays throughout. No speech.</P>
	{/snippet}
</Video>
