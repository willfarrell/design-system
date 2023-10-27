<script>
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
	import Details from '../svelte/element/Details.svelte'
	import Summary from '../svelte/element/Summary.svelte'
	import './assets/global.css';
	
</script>

<Meta title="Accordions"/>

<Template let:args>
  <slot {...args}/>
</Template>

<Story name="Disclosure">
	<Details is="ds-accordion">
		<Summary>summary</Summary>
		details
	</Details>
</Story>

<Story name="Exclusive Accordion">
	<div role="group">
		<Details name="name" is="ds-accordion" open>
			<Summary>summary</Summary>
			details
		</Details>
		<Details name="name" is="ds-accordion">
			<Summary>summary</Summary>
			details
		</Details>
		<Details name="name" is="ds-accordion">
			<Summary>summary</Summary>
			details
		</Details>
	</div>
	Ref: https://adrianroselli.com/2023/08/progressively-enhanced-html-accordion.html
</Story>

<style>
	
</style>