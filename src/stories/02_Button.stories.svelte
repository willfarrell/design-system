<script>
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
	
	import Icon from '../svelte/Icon.svelte'
	import Button from '../svelte/element/button.svelte'
	
	import './assets/global.css';
	
</script>

<Meta title="Button"/>

<Template let:args>
  <slot {...args}/>
</Template>

<Story name="Button">
	<div role="group">
		<Button><Icon src="search"/><span class="visually-hidden">button</span></Button>
		<Button><Icon src="search"/><span>button</span></Button>
  	  	<Button>button</Button>
	</div>
</Story>

<Story name="Button (outline)">
	<div role="group">
		<Button class="outline"><Icon src="search"/><span class="visually-hidden">button</span></Button>
		<Button class="outline"><Icon src="location"/><span>button</span></Button>
  <Button class="outline">button</Button>
	</div>
</Story>


<style>
</style>