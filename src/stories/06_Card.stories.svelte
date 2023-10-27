<script>
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
	
	import Card from '../svelte/Card.svelte'
	import H3 from '../svelte/element/h3.svelte'
	import P from '../svelte/element/p.svelte'
	import A from '../svelte/element/a.svelte'
	import Img from '../svelte/element/Img.svelte'
	
	import './assets/global.css';
	import src from './assets/img/16_9.640x359.png'
	
	
	// import '../components/card.js';
</script>

<Meta title="Cards"/>

<Template let:args>
  <slot {...args}/>
</Template>

<Story name="Card">
	<ul class="grid">
	  <Card href="#" id="A card" let:id>
		  <H3><A href="#" aria-describedby="{id}">A card</A></H3>
		  <P>Commodo ut laborum fugiat aliqua eiusmod voluptate pariatur.</P>
		  <span aria-hidden="true" id="{id}">Read more</span>
		<Img alt="" src="{src}" slot="img"/>
	  </Card>
	  <Card href="#" id="A card" ] let:id>
			<H3><A href="#" aria-describedby="{id}">A card</A></H3>
			<P>Commodo ut laborum fugiat aliqua eiusmod voluptate pariatur.</P>
			<span aria-hidden="true" id="{id}">Read more</span>
		  <Img alt="" src="{src}" slot="img"/>
		</Card>
		<Card href="#" id="A card"  let:id>
			  <H3><A href="#" aria-describedby="{id}">A card</A></H3>
			  <P>Commodo ut laborum fugiat aliqua eiusmod voluptate pariatur.</P>
			  <span aria-hidden="true" id="{id}">Read more</span>
			<Img alt="" src="{src}" slot="img" width="640" height="359"/>
		  </Card>
	</ul>
</Story>

<style>
	.grid {
		--min-width: 20rem;
	}
	:global(.card) {
		/* max-width: 25rem; */
	}
</style>