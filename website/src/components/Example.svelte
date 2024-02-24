<script>
	import makeExampleComponent from '@examples/index.js';
	
	// Style
	import ExampleHorizontalRule from '@examples/horizontal-rule.svelte';
	import ExampleLayoutArticle from '@examples/layout-article.svelte';
	import ExampleLayoutDocumentation from '@examples/layout-documentation.svelte';
	import ExampleLayoutForm from '@examples/layout-form.svelte';
	import ExampleLayoutSearch from '@examples/layout-search.svelte';
	
	// Typography
	import ExampleHeadings from '@examples/headings.svelte';
	import ExampleHeadingGroup from '@examples/heading-group.svelte';
	import ExampleParagraphs from '@examples/paragraphs.svelte';
	import ExampleBlockquote from '@examples/blockquote.svelte';
	import ExampleInlineTextElements from '@examples/inline-text-elements.svelte';
	import ExampleListOrdered from '@examples/list-ordered.svelte';
	import ExampleListUnordered from '@examples/list-unordered.svelte';
	import ExampleListDescription from '@examples/list-description.svelte';
	
	import ExampleFormErrors from '@examples/form-errors.svelte';
	import ExampleFormInputText from '@examples/form-input-text.svelte';
	import ExampleFormInputNumber from '@examples/form-input-number.svelte';
	import ExampleFormInputDate from '@examples/form-input-date.svelte';
	import ExampleFormInputSearch from '@examples/form-input-search.svelte';
	import ExampleFormInputCheckbox from '@examples/form-input-checkbox.svelte';
	import ExampleFormInputRadio from '@examples/form-input-radio.svelte';
	import ExampleFormInputSelect from '@examples/form-input-select.svelte';
	import ExampleFormInputTextarea from '@examples/form-input-textarea.svelte';
	import ExampleFormInputFile from '@examples/form-input-file.svelte';
	
	// Components
	import ExampleAddress from '@examples/address.svelte';
	
	import ExampleButton from '@examples/button.svelte';
	import ExampleFootnotes from '@examples/footnotes.svelte';
	import ExampleTableStripe from '@examples/table-stripe.svelte';
	import ExampleTable from '@examples/table.svelte';
	
	import ExampleAccordion from '@examples/accordion.svelte';
	import ExampleCard from '@examples/card.svelte';
	import ExampleDetails from '@examples/details.svelte';
	import ExampleDialog from '@examples/dialog.svelte';
	
	// Patterns
	import ExampleGridCards from '@examples/grid-cards.svelte';
	
	
	
	
	
	const examples = {
		ExampleAddress,ExampleBlockquote,ExampleButton,ExampleHeadings,ExampleHeadingGroup,ExampleHorizontalRule,ExampleInlineTextElements,ExampleListOrdered,ExampleListUnordered,ExampleListDescription,ExampleParagraphs,ExampleTableStripe,ExampleTable,
		ExampleFormErrors,ExampleFormInputText,ExampleFormInputNumber,ExampleFormInputDate,ExampleFormInputSearch,ExampleFormInputCheckbox,ExampleFormInputRadio,ExampleFormInputSelect,ExampleFormInputTextarea, ExampleFormInputFile,
		
		ExampleAccordion,ExampleCard,ExampleDetails,ExampleDialog,ExampleFootnotes,
		
		ExampleLayoutArticle, ExampleLayoutDocumentation, ExampleLayoutForm, ExampleLayoutSearch,
		
		ExampleGridCards
	}
	
	const {component, ...attributes} = $$props
	const importedComponent = examples[makeExampleComponent(component ?? '')]
	if (!importedComponent) {
		console.error(component,'aka',makeExampleComponent(component ?? ''), 'missing')
	}
</script>

<svelte:component this={importedComponent} {...attributes} />
