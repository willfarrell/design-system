<script>
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
	import {fontFamily, argTypes, text} from './lib/controls.js'
	import Main from '../svelte/element/Main.svelte'
	import P from '../svelte/element/p.svelte'
	import A from '../svelte/element/a.svelte'
	
	import './assets/global.css';
	
</script>

<Meta title="Address"/>

<Story name="Address" 
{argTypes} args={{fontFamily, email:'username+alias@example.org', telephone:'+1-000-000-0000 x000', address: '000 street, unit 000, city, region, country, postcode'}} 
let:fontFamily let:address let:email let:telephone>
<Main class="container" style="--font-family: {fontFamily};">
  <address>
  <P><A href="mailto:{email}">{email}</A></P>
  <P><A href="tel:{telephone.replace(/[^0-9+x]/, '')}">{telephone}</A></P>
	<P>{address}</P>
  </address>
</Main>
</Story>
