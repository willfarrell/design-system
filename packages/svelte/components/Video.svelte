<script>
import Details from "../elements/details.svelte";
import Figcaption from "../elements/figcaption.svelte";
import Figure from "../elements/figure.svelte";
import Source from "../elements/source.svelte";
import Summary from "../elements/summary.svelte";
import Track from "../elements/track.svelte";
import Video from "../elements/video.svelte";

const {
	src,
	sources = [],
	tracks = [],
	preload = "metadata",
	caption,
	transcript,
	labelTranscript = "Transcript",
	...props
} = $props();

const captionedTracks = $derived.by(() => {
	if (
		!tracks.some(({ kind = "captions" }) =>
			["captions", "subtitles"].includes(kind),
		)
	) {
		throw new Error("Video requires a captions or subtitles track");
	}
	return tracks;
});
</script>

{#snippet video()}
  <Video {src} {preload} {...props}>
    {#each sources as source (source.src)}
      <Source {...source} />
    {/each}
    {#each captionedTracks as track (track.src)}
      <Track kind="captions" {...track} />
    {/each}
  </Video>
{/snippet}

{#if caption || transcript}
  <Figure>
    {@render video()}
    {#if caption}<Figcaption>{caption}</Figcaption>{/if}
    {#if transcript}
      <Details>
        <Summary>{labelTranscript}</Summary>
        {@render transcript()}
      </Details>
    {/if}
  </Figure>
{:else}
  {@render video()}
{/if}
