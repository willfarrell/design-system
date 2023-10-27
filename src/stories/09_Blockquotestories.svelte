<script>
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
	import {fontFamily, argTypes, text} from './lib/controls.js'
	import Main from '../svelte/element/Main.svelte'
	
	import './assets/global.css';
	
	const cite = '~ De Finibus Bonorum et Malorum'
</script>

<Meta title="Blockquote"/>

<Story name="Blockquote & Cite" 
{argTypes} args={{fontFamily, text, cite}}
let:fontFamily let:text let:cite>
<Main class="container" style="--font-family: {fontFamily};">
  <blockquote>
	{text}
	<footer>
		<cite>{cite}</cite>
	</footer>
  </blockquote>
  
  https://adrianroselli.com/2023/07/blockquotes-in-screen-readers.html
</Main>
</Story>
