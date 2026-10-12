<script>
import FootnoteLink from "@willfarrell-ds/svelte/components/FootnoteLink.svelte";
import Footnotes from "@willfarrell-ds/svelte/components/Footnotes.svelte";
import A from "@willfarrell-ds/svelte/elements/a.svelte";
import Article from "@willfarrell-ds/svelte/elements/article.svelte";
import Footer from "@willfarrell-ds/svelte/elements/footer.svelte";
import H2 from "@willfarrell-ds/svelte/elements/h2.svelte";
import Li from "@willfarrell-ds/svelte/elements/li.svelte";
import Ol from "@willfarrell-ds/svelte/elements/ol.svelte";
import P from "@willfarrell-ds/svelte/elements/p.svelte";

const footnotes = [
	{
		id: "uid",
		value: "about uid",
	},
	{
		id: "css",
		value: "about css",
	},
];
</script>

  <Article>
	  <P>Maintaining <FootnoteLink id="uid">footnotes</FootnoteLink>
	  manually can be a pain. By using <FootnoteLink id="css">CSS</FootnoteLink>
	  counters to add the numbered references in the text and an ordered list to display the actual footnotes
	  in the footer, it becomes extremely easy.</P>

	  <Footnotes title="Footnotes" {footnotes}/>
  </Article>
