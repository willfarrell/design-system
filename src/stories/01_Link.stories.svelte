<script>
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
	
	import P from '../svelte/element/p.svelte'
	import A from '../svelte/element/a.svelte'
	import Icon from '../svelte/Icon.svelte'
	
	import './assets/global.css';
	
	const text = 'link'
</script>

<Meta title="Link"/>

<Template let:args>
  <slot {...args}/>
</Template>

<Story name="Links" args={{text}} let:fontFamily let:text>
	<A href="#main">{text} (same-origin page)</A><br/>
	<A href="/">{text} (current page)</A><br/>
	<A href="https://example.org">{text} (external page)</A><br/>
	<A href="#main" class="hover">{text} (hover)</A><br/>
	<A href="#main" class="active">{text} (active)</A><br/>
	<A href="#main" class="visited">{text} (visited)</A><br/>
	<A href="#main" class="focus">{text} (focus)</A><br/>
</Story>

<Story name="Email" args={{email:'username+alias@example.org'}} let:fontFamily let:email>
	<A href="mailto:{email}">{email}</A>
</Story>

<Story name="Telephone" args={{telephone:'+1-000-000-0000 x000'}} let:fontFamily let:telephone>
	<A href="tel:{telephone.replace(/[^0-9+x]/, '')}">{telephone}</A>
</Story>


<Story name="Back" args={{text:'Back'}} let:fontFamily let:text>
	<P>Placed before <code>main</code>.</P>
	<A href="/back" class="back">{text}</A>
</Story>

<Story name="Return to top" args={{text:'Return to top'}} let:fontFamily let:text>
	<P>Placed after <code>main</code>.</P>
	<A href="#">{text}</A>
</Story>

<Story name="Icon" args={{text:'Icon'}} let:fontFamily let:text>
	<A href="#main"><Icon src="search"/><span class="visually-hidden">{text}</span></A>
</Story>

<style>
	a.hover {
		
	}
	
	a.focus {
		
	}
	
</style>