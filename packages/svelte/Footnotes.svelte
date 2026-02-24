<script>
import A from "@design-system/svelte/element/a.svelte";
import Article from "@design-system/svelte/element/article.svelte";
import Footer from "@design-system/svelte/element/footer.svelte";
import H2 from "@design-system/svelte/element/h2.svelte";
import Li from "@design-system/svelte/element/li.svelte";
import Ol from "@design-system/svelte/element/ol.svelte";
import P from "@design-system/svelte/element/p.svelte";

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
