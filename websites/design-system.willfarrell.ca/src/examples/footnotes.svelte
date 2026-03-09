<script>
import FootnoteLink from "@design-system/components/FootnoteLink.svelte";
import Footnotes from "@design-system/components/Footnotes.svelte";
import A from "@design-system/elements/a.svelte";
import Article from "@design-system/elements/article.svelte";
import Footer from "@design-system/elements/footer.svelte";
import H2 from "@design-system/elements/h2.svelte";
import Li from "@design-system/elements/li.svelte";
import Ol from "@design-system/elements/ol.svelte";
import P from "@design-system/elements/p.svelte";

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
