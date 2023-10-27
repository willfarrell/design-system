<script>
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
	
	import './assets/global.css';
	
</script>

<Meta title="classes"/>

<Template let:args>
  <slot {...args}/>
</Template>

<Story name="container">
	  
</Story>

<Story name="grid">
	  
</Story>

<Story name="grid-max-col">
	  
</Story>


<Story name="hsl">
	  
</Story>

<Story name="rgb">
	  
</Story>

<Story name="skip">
	<a href="#main" class="skip">Skip to main content</a><br/>
	Press <kbd>Tab</kbd> to activate.
</Story>

<Story name="visually-hidden">
	  
</Story>

<Story name="hamburger">
	<!-- TODO a -> button via js -->
	  <a href="#footer" class="hamburger" aria-label="Go to menu"></a><br/><br/><br/>
		<button class="hamburger" aria-expanded='true'><span class="visually-hidden">Close menu</span></button>
</Story>

<Story name="close">
	  <div class="close"><span class="visually-hidden">Close</span></div>
</Story>

<Story name="::marker">
	  
</Story>

<Story name="::after">
	  <details><summary class="chevron">chevrong</summary></details>
		<details><summary class="chevron-small">chev</summary></details>
	  <div class="check">check</div>
</Story>

<style>
	details .chevron:after {
		transform: rotate(45deg);
	}
	details[open] .chevron:after {
		transform: rotate(135deg);
	}
	details .chevron-small:after {
		transform: rotate(45deg);
	}
	details[open] .chevron-small:after {
		transform: rotate(135deg);
	}
</style>