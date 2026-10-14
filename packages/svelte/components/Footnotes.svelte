<script>
import A from "../elements/a.svelte";
import Footer from "../elements/footer.svelte";
import H2 from "../elements/h2.svelte";
import Li from "../elements/li.svelte";
import Ol from "../elements/ol.svelte";

const {
	title,
	returnLabel = "Back to reference", // TODO i18n
	footnotes = [],
	labelId = "footnote-label",
} = $props();
</script>

<Footer>
  <H2 id={labelId}>{title}</H2>
  <Ol>
    {#each footnotes as footnote, index (footnote.id)}
      <Li id="footnote-{footnote.id}">
        {footnote.value}
        <A href="#footnote-{footnote.id}-ref" aria-label="{returnLabel} {index + 1}">↵</A>
      </Li>
    {/each}
  </Ol>
</Footer>
