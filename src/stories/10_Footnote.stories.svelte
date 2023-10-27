<script>
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
	import {fontFamily, argTypes, text} from './lib/controls.js'
	import Main from '../svelte/element/Main.svelte'
	import Article from '../svelte/element/Article.svelte'
	
	import './assets/global.css';
	
</script>

<Meta title="Footnote"/>

<Story name="Footnote" 
{argTypes} args={{fontFamily, text}} 
let:fontFamily let:text>
<Main class="container" style="--font-family: {fontFamily};">
  <Article>
	  <p>Maintaining <a aria-describedby="footnote-label" href="#footnote-uid" id="footnote-uid-ref">footnotes</a> 
	  manually can be a pain. By using <a aria-describedby="footnote-label" href="#css">CSS</a> 
	  <a aria-describedby="footnote-label" href="#css-counters">counters</a> to add the 
	  numbered references in the text and an ordered list to display the actual footnotes 
	  in the footer, it becomes extremely easy.</p>
	  
	  <footer>
		<h2 id="footnote-label">Footnotes</h2>
		<ol>
		  <li id="footnote-uid">uid
			<a href="#footnote-uid-ref" aria-label="Back to content">↵</a></li>
		</ol>
	  </footer>
  </Article>
  Ref: https://www.sitepoint.com/accessible-footnotes-css/
</Main>
</Story>

