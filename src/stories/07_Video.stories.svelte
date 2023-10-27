<script>
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
	import Figure from '../svelte/element/Figure.svelte'
	import Figcaption from '../svelte/element/Figcaption.svelte'
	import Image from '../svelte/Image.svelte'
	import Img from '../svelte/element/Img.svelte'
	import Picture from '../svelte/element/Picture.svelte'
	
	import './assets/global.css';
	
	const argTypes = {
		aspectRatio: {
		  control: 'select',
		  options: [
			  "1:1","2:3","3:2","3:4","4:3","16:9","9:16"
		  ]
		}
	  }
</script>

<Meta title="Video"/>

<Template let:args>
  <slot {...args}/>
</Template>

<Story name="Video">
	  
</Story>

<Story name="YouTube">
	  
</Story>

<Story name="Vimeo">
	  
</Story>

<Story name="Audio">
	  
</Story>

<style>
</style>