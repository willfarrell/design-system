<script>
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
	import {fontFamily, argTypes, text} from './lib/controls.js'
	import Figure from '../svelte/element/Figure.svelte'
	import Figcaption from '../svelte/element/Figcaption.svelte'
	import Image from '../svelte/Image.svelte'
	import Img from '../svelte/element/Img.svelte'
	import Picture from '../svelte/element/Picture.svelte'
	
	import './assets/global.css';
	
	const figcaption = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
</script>

<Meta title="Image"/>

<Template let:args>
  <slot {...args}/>
</Template>

<Story name="Vector">
	  <Img/>
	  
	  <Figure>
		  <Img/>
		  <Figcaption slot="caption">caption</Figcaption>
	  </Figure>
</Story>

<Story name="Picture" {argTypes} args={{aspectRatio:"1:1"}} let:aspectRatio>
	  <Picture src="/assets/src/{aspectRatio.replace(':','_')}.320x320.png" />
</Story>

<Story name="Background">
	<div role="presentation" class="picture" data-src-avif="" data-src-webp="" />
</Story>

<Story name="Figure & Figcaption" 
{argTypes} args={{fontFamily, figcaption}} 
let:fontFamily let:figcaption>
<Main class="container" style="--font-family: {fontFamily};">
  <figure style="font-family: {fontFamily}; width:35rem;">
	  <div style="border: 1px solid #000; height:35rem;"/>
	<figcaption>{figcaption}</figcaption>
  </figure>
</Main>
</Story>


<style>
	.picture {
		height: auto;
		background-color: var(--background-color);
		background-image: image-set(
			attr(data-src-avif url) type("image/avif"),
			attr(data-src-webp url) type("image/webp")
		);
		background-size: cover;
		background-position: center center;
	}
</style>