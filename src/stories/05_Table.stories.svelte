<script>
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
	import {fontFamily, argTypes} from './lib/controls.js'
	import Main from '../svelte/element/Main.svelte'
	
	import './assets/global.css';
	const caption = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
	// https://inclusive-components.design/data-tables/
</script>

<Meta title="Table"/>

<Template let:args>
  <slot {...args}/>
</Template>

<Story name="Table & Caption" 
{argTypes} args={{fontFamily, caption}} 
let:fontFamily let:caption>
<Main class="container" style="--font-family: {fontFamily};">
	  <table>
		  <caption>{caption}</caption>
		  <colgroup>
			  <col />
			  <col span="2" class="a" />
			  <col span="3" class="b" />
			</colgroup>
		<thead>
		  <tr>
			<th scope="col">#</th>
			<th scope="col">Heading</th>
			<th scope="col">Heading</th>
			<th scope="col">Heading</th>
			<th scope="col">Heading</th>
			<th scope="col">Heading</th>
		  </tr>
		</thead>
		<tbody>
		  <tr>
			<th scope="row">1</th>
			<td>Cell</td>
			<td>Cell</td>
			<td>Cell</td>
			<td>Cell</td>
			<td>Cell</td>
		  </tr>
		  <tr>
			<th scope="row">1</th>
			<td>Cell</td>
			<td>Cell</td>
			<td>Cell</td>
			<td>Cell</td>
			<td>Cell</td>
		  </tr>
		  <tr>
			<th scope="row">1</th>
			<td>Cell</td>
			<td>Cell</td>
			<td>Cell</td>
			<td>Cell</td>
			<td>Cell</td>
		  </tr>
		</tbody>
		<tfoot>
		  <tr>
			<th scope="col">#</th>
			<th scope="col">Footer</th>
			<th scope="col">Footer</th>
			<th scope="col">Footer</th>
			<th scope="col">Footer</th>
			<th scope="col">Footer</th>
		  </tr>
		</tfoot>
	  </table>
</Main>
</Story>

<Story name="Table (stripe)" 
{argTypes} args={{fontFamily}} 
let:fontFamily>
<Main class="container" style="--font-family: {fontFamily};">
	  <table class="stripe">
		<thead>
		  <tr>
			<th scope="col">#</th>
			<th scope="col">Heading</th>
			<th scope="col">Heading</th>
			<th scope="col">Heading</th>
			<th scope="col">Heading</th>
			<th scope="col">Heading</th>
		  </tr>
		</thead>
		<tbody>
		  <tr>
			<th scope="row">1</th>
			<td>Cell</td>
			<td>Cell</td>
			<td>Cell</td>
			<td>Cell</td>
			<td>Cell</td>
		  </tr>
		  <tr>
			<th scope="row">1</th>
			<td>Cell</td>
			<td>Cell</td>
			<td>Cell</td>
			<td>Cell</td>
			<td>Cell</td>
		  </tr>
		  <tr>
			<th scope="row">1</th>
			<td>Cell</td>
			<td>Cell</td>
			<td>Cell</td>
			<td>Cell</td>
			<td>Cell</td>
		  </tr>
		</tbody>
		<tfoot>
		  <tr>
			<th scope="col">#</th>
			<th scope="col">Footer</th>
			<th scope="col">Footer</th>
			<th scope="col">Footer</th>
			<th scope="col">Footer</th>
			<th scope="col">Footer</th>
		  </tr>
		</tfoot>
	  </table>
</Main>
</Story>


<style>
	
</style>