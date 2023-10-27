<script>
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
	
	import './assets/global.css';

	
	const argTypes = {
		fontFamily: {
		  control: 'select',
		  options: [
			  'inherit',
		  ]
		},
	  }
</script>

<Meta title="List"/>

<Template let:args>
  <slot {...args}/>
</Template>

<Story name="Unordered" {argTypes} args={{text:'item'}} let:fontFamily let:text>
  <ul style="font-family: {fontFamily}">
	<li>{text}</li>
	<li>{text}
		<ul>
			<li>{text}</li>
			<li>{text}
				<ul>
					<li>{text}</li>
					<li>{text}</li>
					<li>{text}</li>
				</ul>
			</li>
			<li>{text}</li>
		</ul>
	</li>
	<li>{text}</li>
  </ul>
</Story>

<Story name="Ordered" {argTypes} args={{text:'item'}} let:fontFamily let:text>
  <ol style="font-family: {fontFamily}">
	<li>{text}</li>
	<li>{text}
		<ol>
			<li>{text}</li>
			<li>{text}
				<ol>
					<li>{text}</li>
					<li>{text}</li>
					<li>{text}</li>
				</ol>
			</li>
			<li>{text}</li>
		</ol>
	</li>
	<li>{text}</li>
  </ol>
</Story>

<Story name="Definition" {argTypes} args={{text:'item'}} let:fontFamily let:text>
  <dl style="font-family: {fontFamily}">
	<dt><dfn>word</dfn>{text}</dt>
	<dd>{text}</dd>
  </dl>
</Story>
