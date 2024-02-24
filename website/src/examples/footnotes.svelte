<script>
	import Article from '@design-system/svelte/element/article.svelte'
	import A from '@design-system/svelte/element/a.svelte'
	import P from '@design-system/svelte/element/p.svelte'
	import H2 from '@design-system/svelte/element/h2.svelte'
	import Ol from '@design-system/svelte/element/ol.svelte'
	import Li from '@design-system/svelte/element/li.svelte'
	import Footer from '@design-system/svelte/element/footer.svelte'
	
	import Footnotes from '@design-system/svelte/Footnotes.svelte'
	import FootnoteLink from '@design-system/svelte/FootnoteLink.svelte'
	
	const footnotes = [{
		id: 'uid',
		value: 'about uid'
	},{
		id: 'css',
		value: 'about css'
	}]
	
</script>

  <Article>
	  <P>Maintaining <FootnoteLink id="uid">footnotes</FootnoteLink> 
	  manually can be a pain. By using <FootnoteLink id="css">CSS</FootnoteLink> 
	  counters to add the numbered references in the text and an ordered list to display the actual footnotes 
	  in the footer, it becomes extremely easy.</P>
	  
	  <Footnotes title="Footnotes" {footnotes}/>
  </Article>