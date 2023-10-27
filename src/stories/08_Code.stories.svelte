<script>
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
	import {fontFamily, argTypes, text} from './lib/controls.js'
	import Main from '../svelte/element/Main.svelte'
	import Pre from '../svelte/element/Pre.svelte'
	import Code from '../svelte/element/Code.svelte'
	import Codeblock from '../svelte/Codeblock.svelte'
	
	import './assets/global.css';

</script>

<Meta title="Code"/>

<Story name="Codeblock" 
{argTypes} args={{fontFamily, text}} 
let:fontFamily let:text>
<Main class="container" style="--font-family: {fontFamily};">
  <Codeblock language="js" code={'const str = "{text}"'}/>
</Main>
</Story>
