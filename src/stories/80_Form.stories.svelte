<script>
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
	
	import Main from '../svelte/element/Main.svelte'
	
	import Button from '../svelte/element/button.svelte'
	import Icon from '../svelte/Icon.svelte'
	
	import FormErrors from '../svelte/FormErrors.svelte'
	import Form from '../svelte/element/Form.svelte'
	import Search from '../svelte/element/Search.svelte'
	import Fieldset from '../svelte/Fieldset.svelte'
	import FieldOptgroup from '../svelte/FieldOptgroup.svelte'
	import FieldOption from '../svelte/FieldOption.svelte'
	import InputCheckbox from '../svelte/InputCheckbox.svelte'
	import InputEmail from '../svelte/InputEmail.svelte'
	import InputFile from '../svelte/InputFile.svelte'
	import InputFileDropzone from '../svelte/InputFileDropzone.svelte'
	import InputHidden from '../svelte/InputHidden.svelte'
	import InputNumber from '../svelte/InputNumber.svelte'
	import InputOneTimeCode from '../svelte/InputOneTimeCode.svelte'
	import InputPassword from '../svelte/InputPassword.svelte'
	import InputRadio from '../svelte/InputRadio.svelte'
	import InputText from '../svelte/InputText.svelte'
	import InputUrl from '../svelte/InputUrl.svelte'
	import InputSearch from '../svelte/InputSearch.svelte'
	import InputSelectAutocomplete from '../svelte/InputSelectAutocomplete.svelte'
	import InputSelect from '../svelte/InputSelect.svelte'
	import InputTextarea from '../svelte/InputTextarea.svelte'
	
	import './assets/global.css';
	
	const method = 'POST'
	const error = [{ id: "id", message: "error message" }]
	const id = "id"
	const label = "label (...args)"
	const labelLabel = "label (label)"
	const labelHint = "label (hint)"
	const labelError = "label (error)"
	const labelButton = "label (button)"
	const labelAll = "label (label, hint, error)"
	const hint = "hint"
	const placeholder = 'placeholder'
	const value = "00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000" // length === 500
	const button = 'button'
</script>

<Meta title="Form"/>

<Template let:args>
  <slot {...args}/>
</Template>

<Story name="Errors" args={{label, hint, error, placeholder, value}} let:args let:error>
	<Main class="container">
	<!-- TODO one of each error -->
  <FormErrors errors={error}>
	<h2>Errors</h2>
  </FormErrors>
  <Form {method}>
	<InputText {id} {...args} />
  </Form>
	</Main>
</Story>

<Story name="Input Hidden" args={{label, hint, error, placeholder, value, button}} 
let:args let:label let:hint let:error let:value let:button>
  <Main class="container"><Form>
	<InputHidden {...args} />
	<InputHidden {id} label="labelLabel" />
	<InputHidden {id} label={labelHint} {hint} />
	<InputHidden {id} label={labelError} {error} />
	<InputHidden {id} label={labelAll} {hint} {error} {value} />
	<div role="group">
	<InputHidden {id} label={labelButton} /><Button>{button}</Button>
		</div>
  </Form></Main>
</Story>

<Story name="Input Text" args={{label, hint, error, placeholder, value, button}} 
let:args let:label let:hint let:error let:value let:button>
  <Main class="container"><Form>
	<InputText {...args} />
	<InputText {id} label={labelLabel} />
	<InputText {id} label={labelHint} {hint} />
	<InputText {id} label={labelError} {error} />
	<InputText {id} label={labelAll} {hint} {error} {value} />
	<div role="group">
	<InputText {id} label={labelButton} /><Button>{button}</Button>
		</div>
  </Form></Main>
</Story>

<Story name="Input Textarea" args={{label, hint, error, placeholder, value, button}} 
let:args let:label let:hint let:error let:value let:button>
  <Main class="container"><Form>
	<InputTextarea {...args} />
	<InputTextarea {id} label={labelLabel} />
	<InputTextarea {id} label={labelHint} {hint} />
	<InputTextarea {id} label={labelError} {error} />
	<InputTextarea {id} label={labelAll} {hint} {error} {value} />
		<!-- TODO count component -->
  </Form></Main>
</Story>

<Story name="Input Email" args={{label, hint, error, placeholder, value:"name@example.org", button}} 
let:args let:label let:hint let:error let:value let:button>
  <Main class="container"><Form>
	<InputEmail {...args} />
	<InputEmail {id} label={labelLabel} />
	<InputEmail {id} label={labelHint} {hint} />
	<InputEmail {id} label={labelError} {error} />
	<InputEmail {id} label={labelAll} {hint} {error} {value} />
	<div role="group">
	<InputEmail {id} label={labelButton} /><Button>{button}</Button>
		</div>
  </Form></Main>
</Story>

<Story name="Input Number" args={{label, hint, error, placeholder, value:-1, button}} 
let:args let:label let:hint let:error let:value let:button>
  <Main class="container"><Form>
	<InputNumber {...args} />
	<InputNumber {id} label={labelLabel} />
	<InputNumber {id} label={labelHint} {hint} />
	<InputNumber {id} label={labelError} {error} />
	<InputNumber {id} label={labelAll} {hint} {error} {value} />
	<div role="group">
	<InputNumber {id} label={labelButton} /><Button>{button}</Button>
		</div>
  </Form></Main>
</Story>

<Story name="Input Number Code" args={{label, hint, error, placeholder, value:'000000', button}} 
let:args let:label let:hint let:error let:value let:button>
  <Main class="container"><Form>
	<InputOneTimeCode {...args} />
	<InputOneTimeCode {id} label={labelLabel} />
	<InputOneTimeCode {id} label={labelHint} {hint} />
	<InputOneTimeCode {id} label={labelError} {error} />
	<InputOneTimeCode {id} label={labelAll} {hint} {error} {value} />
		<div role="group">
		<InputOneTimeCode {id} label={labelButton} /><Button>{button}</Button>
			</div>
  </Form></Main>
</Story>

<Story name="Input URL" args={{label, hint, error, placeholder, value:'https://example.org', button}} 
let:args let:label let:hint let:error let:value let:button>
  <Main class="container">
	  <Form>
	<InputUrl {...args} />
	<InputUrl {id} label={labelLabel} />
	<InputUrl {id} label={labelHint} {hint} />
	<InputUrl {id} label={labelError} {error} />
	<InputUrl {id} label={labelAll} {hint} {error} {value} />
		<div role="group">
	<InputUrl {id} label={labelButton} /><Button>{button}</Button>
		</div>
  </Form></Main>
</Story>

<Story name="Input Search" args={{label, hint, error, placeholder, value, button}} 
let:args let:label let:hint let:error let:value let:button>
  <Main class="container">
	  <Search>
  <Form>
	<InputSearch {...args} />
	<InputSearch {id} label={labelLabel}/>
	<InputSearch {id} label={labelHint} {hint}/>
	<InputSearch {id} label={labelError} {error} />
	<InputSearch {id} label={labelAll} {hint} {error} {value} />
	<div role="group">
		<InputSearch {id} label={labelButton} />
		<Button type="submit"><Icon src="search"/><span>{button}</span></Button>
	</div>
  </Form></Search>
  </Main>
</Story>

<Story name="Input Search Datalist" args={{label, hint, error, placeholder, value, button}} 
let:args let:label let:hint let:error let:value let:button>
  <Main class="container">
	  <Search>
  <Form>
	<InputSelectAutocomplete {...args}  >
	  <FieldOption label="a" value="1" />
	  <FieldOption label="b" value="2" />
	  <FieldOptgroup label="g1">
		<FieldOption label="g" value="3" />
	  </FieldOptgroup>
	  <FieldOptgroup label="g2">
		<FieldOption label="d" value="4" />
	  </FieldOptgroup>
	</InputSelectAutocomplete>
	<InputSelectAutocomplete {id} label={labelLabel} >
	  <FieldOption label="a" value="1" />
	  <FieldOption label="b" value="2" />
	  <FieldOptgroup label="g1">
	    <FieldOption label="g" value="3" />
	  </FieldOptgroup>
	  <FieldOptgroup label="g2">
	    <FieldOption label="d" value="4" />
	  </FieldOptgroup>
	</InputSelectAutocomplete>
	<InputSelectAutocomplete {id} label={labelHint} {hint}  >
	  <FieldOption label="a" value="1" />
	  <FieldOption label="b" value="2" />
	  <FieldOptgroup label="g1">
		<FieldOption label="g" value="3" />
	  </FieldOptgroup>
	  <FieldOptgroup label="g2">
		<FieldOption label="d" value="4" />
	  </FieldOptgroup>
	</InputSelectAutocomplete>
	<InputSelectAutocomplete {id} label={labelError} {error}  >
	  <FieldOption label="a" value="1" />
	  <FieldOption label="b" value="2" />
	  <FieldOptgroup label="g1">
		<FieldOption label="g" value="3" />
	  </FieldOptgroup>
	  <FieldOptgroup label="g2">
		<FieldOption label="d" value="4" />
	  </FieldOptgroup>
	</InputSelectAutocomplete>
	<InputSelectAutocomplete {id} label={labelLabel}  >
	  <FieldOption label="a" value="1" />
	  <FieldOption label="b" value="2" />
	  <FieldOptgroup label="g1">
		<FieldOption label="g" value="3" />
	  </FieldOptgroup>
	  <FieldOptgroup label="g2">
		<FieldOption label="d" value="4" />
	  </FieldOptgroup>
	</InputSelectAutocomplete>
	<InputSelectAutocomplete {id} label={labelButton}  >
	  <FieldOption label="a" value="1" />
	  <FieldOption label="b" value="2" />
	  <FieldOptgroup label="g1">
		<FieldOption label="g" value="3" />
	  </FieldOptgroup>
	  <FieldOptgroup label="g2">
		<FieldOption label="d" value="4" />
	  </FieldOptgroup>
	  <Button slot="button">{button}</Button>
	</InputSelectAutocomplete>
	<!-- TODO progressive enhancement -->
  </Form>
	  </Search></Main>
</Story>

<Story name="Input Select" args={{label, hint, error, placeholder, value, button}} 
let:args let:label let:hint let:error let:value let:button>
  <Main class="container">
  <Form>
	<InputSelect {...args} >
	  <FieldOption label="0000" value="1" />
	  <FieldOption label="MMMM" value="2" />
	  <FieldOptgroup label="g1">
		<FieldOption label="gggg" value="3" />
	  </FieldOptgroup>
	  <FieldOptgroup label="g2">
		<FieldOption label="dddd" value="4" />
	  </FieldOptgroup>
	</InputSelect>
	<InputSelect {id} label={labelLabel} >
	  <FieldOption label="0" value="1" />
	  <FieldOption label="M" value="2" />
	  <FieldOptgroup label="g1">
	    <FieldOption label="g" value="3" />
	  </FieldOptgroup>
	  <FieldOptgroup label="g2">
		<FieldOption label="d" value="4" />
	  </FieldOptgroup>
	</InputSelect>
	<InputSelect {id} label={labelHint} {hint}  >
	  <FieldOption label="00" {value} />
	  <FieldOption label="MM" value="2" />
	  <FieldOptgroup label="g1">
		  <FieldOption label="g" value="3" />
	  </FieldOptgroup>
	  <FieldOptgroup label="g2">
		  <FieldOption label="d" value="4" />
	  </FieldOptgroup>
	</InputSelect>
	<InputSelect {id} label={labelError} {error}  >
	  <FieldOption label="0" {value} />
	  <FieldOption label="M" value="2" />
	  <FieldOptgroup label="g1">
		  <FieldOption label="g" value="3" />
	  </FieldOptgroup>
	  <FieldOptgroup label="g2">
		  <FieldOption label="d" value="4" />
	  </FieldOptgroup>
	</InputSelect>
	<InputSelect {id} label={labelAll} {hint} {error} {value}  >
	  <FieldOption label="0" {value} />
	  <FieldOption label="M" value="2" />
	  <FieldOptgroup label="g1">
		  <FieldOption label="g" value="3" />
	  </FieldOptgroup>
	  <FieldOptgroup label="g2">
		  <FieldOption label="d" value="4" />
	  </FieldOptgroup>
	</InputSelect>
	<InputSelect {id} label={labelButton}  >
	  <FieldOption label="0" {value} />
	  <FieldOption label="M" value="2" />
	  <FieldOptgroup label="g1">
		  <FieldOption label="g" value="3" />
	  </FieldOptgroup>
	  <FieldOptgroup label="g2">
		  <FieldOption label="d" value="4" />
	  </FieldOptgroup>
	  <Button slot="button">{button}</Button>
	</InputSelect>
  </Form></Main>
</Story>

<Story name="Input Checkbox" args={{label, hint, error, placeholder, value, button}} 
let:args let:label let:hint let:error let:value let:button>
<Main class="container">
  <Form>
    <Fieldset {...args}>
	  <InputCheckbox {...args} />
	</Fieldset>
	<Fieldset {id} label={labelLabel}>
	  <InputCheckbox label={labelLabel} {value} />
	</Fieldset>
	<Fieldset {id} label={labelHint} {hint}>
	  <InputCheckbox label={labelHint} {hint} {value} />
	</Fieldset>
	<Fieldset {id} label={labelError} {error}>
	  <InputCheckbox label={labelHint} {hint} {value} />
	</Fieldset>
	<Fieldset {id} label={labelHint} {hint} {value}>
	  <InputCheckbox label={labelLabel} {value}>
		<InputText {id} label={labelLabel} />
	  </InputCheckbox>
	</Fieldset>
  </Form>
</Main>
</Story>

<Story name="Input Radio" args={{label, hint, error, placeholder, value, button}} 
let:args let:label let:hint let:error let:value let:button>
  <Main class="container">
	  <Form>
	<Fieldset {...args}>
	  <InputRadio {...args} />
	</Fieldset>
	<Fieldset {id} label={labelLabel}>
	  <InputRadio label={labelLabel} {value} />
	</Fieldset>
	<Fieldset {id} label={labelHint} {hint}>
	  <InputRadio label={labelHint} {hint} {value} />
	</Fieldset>
	<Fieldset {id} label={labelError} {error}>
	  <InputRadio label={labelHint} {hint} {value} />
	</Fieldset>
	<Fieldset {id} label={labelHint} {hint} {value}>
	  <InputRadio label={labelLabel} {value}>
		<InputText {id} label={labelLabel} />
	  </InputRadio>
	</Fieldset>
  </Form></Main>
</Story>

<Story name="Input Password" args={{label, hint, error, placeholder, value, button}} 
let:args let:label let:hint let:error let:value let:button>
  <Main class="container"><Form>
	<InputPassword {...args} />
	<InputPassword {id} label={labelLabel} />
	<InputPassword {id} label={labelHint} {hint} />
	<InputPassword {id} label={labelError} {error} />
	<InputPassword {id} label={labelAll} {hint} {error} {value} />
	<div role="group">
		<InputPassword {id} label={labelButton} />
		<Button>{button}</Button>
	</div>
	<!-- TODO is="input-password" data-text-reveal={t("form-password-reveal")}
	data-text-conceal={t("form-password-conceal")}
	data-text-capslock-on={t("form-password-capslock-on")}
	data-text-capslock-off={t("form-password-capslock-off")} -->
  </Form></Main>
</Story>

<!-- TODO WebAuth -->

<Story name="Input File" args={{label, hint, error, placeholder, value, button}} 
let:args let:label let:hint let:error let:value let:button>
  <Form>
	  <InputFile {id} label={labelLabel} data-button="Choose file" />
	<InputFile {id} label={labelHint} {hint} data-button="Choose file" />
	<InputFile {id} label={labelError} {error} data-button="Choose file" />
	<!-- <InputFile {id} label={labelAll} {hint} {error} {value} />-->
	<div role="group">
		<InputFile {id} label={labelLabel} data-button="Choose file" />
		<Button>{button}</Button>
	</div>
	<InputFileDropzone>
		<InputFile {id} label={labelLabel} data-button="Choose file" />
	</InputFileDropzone>
  </Form>
</Story>

<!-- TODO Browser Up to date -->
<!-- TODO JS enabled -->

<!-- TODO <meter> -->
<!-- TODO <progress> -->

<style>
	
</style>