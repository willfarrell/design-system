<script>
import ExampleAccordion from "@examples/accordion.svelte";
import ExampleAccordionChevron from "@examples/accordion-chevron.svelte";
// Components
import ExampleAddress from "@examples/address.svelte";
import ExampleAlert from "@examples/alert.svelte";
import ExampleBlockquote from "@examples/blockquote.svelte";
import ExampleButton from "@examples/button.svelte";
import ExampleCallout from "@examples/callout.svelte";
import ExampleCard from "@examples/card.svelte";
import ExampleDetails from "@examples/details.svelte";
import ExampleDetailsChevron from "@examples/details-chevron.svelte";
import ExampleDialog from "@examples/dialog.svelte";
import ExampleFootnotes from "@examples/footnotes.svelte";
import ExampleFormErrors from "@examples/form-errors.svelte";
import ExampleFormInputAddress from "@examples/form-input-address.svelte";
import ExampleFormInputCheckbox from "@examples/form-input-checkbox.svelte";
import ExampleFormInputDate from "@examples/form-input-date.svelte";
import ExampleFormInputDatepicker from "@examples/form-input-datepicker.svelte";
import ExampleFormInputEmail from "@examples/form-input-email.svelte";
import ExampleFormInputFile from "@examples/form-input-file.svelte";
import ExampleFormInputFocus from "@examples/form-input-focus.svelte";
import ExampleFormInputName from "@examples/form-input-name.svelte";
import ExampleFormInputNumber from "@examples/form-input-number.svelte";
import ExampleFormInputOneTimeCode from "@examples/form-input-one-time-code.svelte";
import ExampleFormInputPassword from "@examples/form-input-password.svelte";
import ExampleFormInputRadio from "@examples/form-input-radio.svelte";
import ExampleFormInputSearch from "@examples/form-input-search.svelte";
//import ExampleFormInputDatalist from '@examples/form-input-datalist.svelte';
import ExampleFormInputSelect from "@examples/form-input-select.svelte";
import ExampleFormInputSelectMultiple from "@examples/form-input-select-multiple.svelte";
import ExampleFormInputSelectTypeahead from "@examples/form-input-select-typeahead.svelte";
import ExampleFormInputTel from "@examples/form-input-tel.svelte";
import ExampleFormInputText from "@examples/form-input-text.svelte";
import ExampleFormInputTextarea from "@examples/form-input-textarea.svelte";
import ExampleFormInputUrl from "@examples/form-input-url.svelte";
// Patterns
import ExampleGridCards from "@examples/grid-cards.svelte";
import ExampleHeadingGroup from "@examples/heading-group.svelte";
// Typography
import ExampleHeadings from "@examples/headings.svelte";
// Style
import ExampleHorizontalRule from "@examples/horizontal-rule.svelte";
import makeExampleComponent from "@examples/index.js";
import ExampleInlineFormatElements from "@examples/inline-format-elements.svelte";
import ExampleInlineStyleElements from "@examples/inline-style-elements.svelte";
import ExampleLink from "@examples/link.svelte";
import ExampleLinkBack from "@examples/link-back.svelte";
import ExampleLinkBackToTop from "@examples/link-back-to-top.svelte";
import ExampleLinkButton from "@examples/link-button.svelte";
import ExampleLinkMailto from "@examples/link-mailto.svelte";
import ExampleLinkSkip from "@examples/link-skip.svelte";
import ExampleLinkTag from "@examples/link-tag.svelte";
import ExampleLinkTel from "@examples/link-tel.svelte";
import ExampleListDescription from "@examples/list-description.svelte";
import ExampleListOrdered from "@examples/list-ordered.svelte";
import ExampleListUnordered from "@examples/list-unordered.svelte";
import ExampleParagraphs from "@examples/paragraphs.svelte";
import ExampleTable from "@examples/table.svelte";
import ExampleTaskList from "@examples/task-list.svelte";

const { component, ...props } = $props();

const componets = {
	ExampleAddress,
	ExampleBlockquote,
	ExampleCallout,
	ExampleAlert,
	ExampleButton,
	ExampleHeadings,
	ExampleHeadingGroup,
	ExampleHorizontalRule,
	ExampleInlineFormatElements,
	ExampleInlineStyleElements,
	ExampleListOrdered,
	ExampleListUnordered,
	ExampleListDescription,
	ExampleParagraphs,
	ExampleTable,
	ExampleFormErrors,
	ExampleFormInputFocus,
	ExampleFormInputText,
	ExampleFormInputName,
	ExampleFormInputEmail,
	ExampleFormInputTel,
	ExampleFormInputUrl,
	ExampleFormInputPassword,
	ExampleFormInputNumber,
	ExampleFormInputOneTimeCode,
	ExampleFormInputDate,
	ExampleFormInputDatepicker,
	ExampleFormInputSearch,
	ExampleFormInputCheckbox,
	ExampleFormInputRadio,
	ExampleFormInputSelect,
	ExampleFormInputSelectTypeahead,
	ExampleFormInputSelectMultiple,
	//ExampleFormInputDatalist,
	ExampleFormInputTextarea,
	ExampleFormInputFile,
	ExampleFormInputAddress,
	ExampleLink,
	ExampleLinkButton,
	ExampleLinkTel,
	ExampleLinkMailto,
	ExampleLinkSkip,
	ExampleLinkBack,
	ExampleLinkBackToTop,
	ExampleLinkTag,
	ExampleCard,
	ExampleDetails,
	ExampleDetailsChevron,
	ExampleAccordion,
	ExampleAccordionChevron,
	ExampleDialog,
	ExampleTaskList,
	ExampleFootnotes,
	ExampleGridCards,
};

const componentName = makeExampleComponent(component ?? "");
const importedComponent = componets[componentName];
if (!importedComponent) {
	console.error(component, "aka", componentName, "missing");
}
const SvelteComponent = $derived(importedComponent);
</script>

{#if SvelteComponent}
	<SvelteComponent {...props} />
{:else}
	<p>TODO Need to wire up &lt;Example&gt; to use {component}</p>
{/if}
