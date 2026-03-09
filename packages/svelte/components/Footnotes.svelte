<script>
import A from "../elements/a.svelte";
import Article from "../elements/article.svelte";
import Footer from "../elements/footer.svelte";
import H2 from "../elements/h2.svelte";
import Li from "../elements/li.svelte";
import Ol from "../elements/ol.svelte";
import P from "../elements/p.svelte";

const {
	title,
	returnLabel = "Back to content", // TODO i18n
	footnotes = [],
} = $props();
</script>

<Footer>
  <H2 id="footnote-label">{title}</H2>
  <Ol>
    {#each footnotes as footnote}
      <Li id="footnote-{footnote.id}">
        {footnote.value}
        <A href="#footnote-{footnote.id}-ref" aria-label={returnLabel}>↵</A>
      </Li>
    {/each}
  </Ol>
</Footer>
