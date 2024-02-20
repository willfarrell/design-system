<script>
	import Header from '@design-system/svelte/element/header.svelte';
	import Nav from '@design-system/svelte/element/nav.svelte';
	import Main from '@design-system/svelte/element/main.svelte';
	import Section from '@design-system/svelte/element/section.svelte';
	import Hgroup from '@design-system/svelte/element/hgroup.svelte';
	import H1 from '@design-system/svelte/Heading1.svelte';
	import HSub from '@design-system/svelte/HeadingSub.svelte';
	import Time from '@design-system/svelte/element/time.svelte';
	import H2 from '@design-system/svelte/Heading2.svelte';
	import H3 from '@design-system/svelte/Heading3.svelte';
	import P from '@design-system/svelte/element/p.svelte';
	import A from '@design-system/svelte/element/a.svelte';
	import Small from '@design-system/svelte/element/small.svelte';
	import Ul from '@design-system/svelte/element/ul.svelte';
	import Li from '@design-system/svelte/element/li.svelte';
	import Table from '@design-system/svelte/Table.svelte';

	import Codeblock from '@design-system/svelte/Codeblock.svelte';

	import Footer from '@design-system/svelte/element/footer.svelte';

	import Snippet from '@components/Snippet.svelte';

	import ExampleAddress from '../examples/address.svelte';
	import ExampleBlockquote from '../examples/blockquote.svelte';
	import ExampleButton from '../examples/button.svelte';
	import ExampleHeadings from '../examples/headings.svelte';
	import ExampleHeadingGroup from '../examples/heading-group.svelte';
	import ExampleHorizontalRule from '../examples/horizontal-rule.svelte';
	import ExampleInlineTextElements from '../examples/inline-text-elements.svelte';
	import ExampleListOrdered from '../examples/list-ordered.svelte';
	import ExampleListUnordered from '../examples/list-unordered.svelte';
	import ExampleListDescription from '../examples/list-description.svelte';
	import ExampleParagraphs from '../examples/paragraphs.svelte';
	import ExampleTableStripe from '../examples/table-stripe.svelte';
	import ExampleTable from '../examples/table.svelte';

	import ExampleFormErrors from '../examples/form-errors.svelte';
	import ExampleFormInputText from '../examples/form-input-text.svelte';
	import ExampleFormInputNumber from '../examples/form-input-number.svelte';
	import ExampleFormInputDate from '../examples/form-input-date.svelte';
	import ExampleFormInputSearch from '../examples/form-input-search.svelte';
	import ExampleFormInputCheckbox from '../examples/form-input-checkbox.svelte';
	import ExampleFormInputRadio from '../examples/form-input-radio.svelte';
	import ExampleFormInputSelect from '../examples/form-input-select.svelte';
	import ExampleFormInputTextarea from '../examples/form-input-textarea.svelte';

	import ExampleAccordion from '../examples/accordion.svelte';
	import ExampleCard from '../examples/card.svelte';
	import ExampleDetails from '../examples/details.svelte';
	import ExampleDialog from '../examples/dialog.svelte';
	import ExampleDialogButton from '../examples/dialog-button.svelte';
	import ExampleDialogCode from '../examples/dialog-code.svelte';

	const fontSize = 16; // px
	const fontScale = 0.5; // vw
	const deviceSizes = [360, 480, 768, 1024, 1280, 1920]; // px
</script>

<svelte:head>
	<title>title</title>
</svelte:head>

<Main class="container">
	<article>
		<Hgroup>
			<H1>design system</H1>
			<HSub>Sematic fluid design</HSub>
		</Hgroup>
		<P>TL;DR</P>
		<Section>
			<H2>Features</H2>
			<Ul>
				<Li>Sematic HTML</Li>
				<Li>classless first</Li>
				<Li>Start at as little as 0.5 kB, up to 5 kB</Li>
				<Li>Framework agnostic</Li>
				<Li>Built to meet WCAG 2.2 AAA, WCAG 3 for colors</Li>
				<Li>Right to left support</Li>
				<Li>Light and dark mode with all the prefers @media queries</Li>
				<Li>Progressive enhancement though lazy loaded customElements</Li>
			</Ul>
		</Section>
		<Section>
			<H2>Gettings started</H2>
			<H3>Install</H3>
			<Codeblock language="sh" code={'npm i @design-system/style'} />

			<H3>Import</H3>
			<Codeblock language="css" code={'import @design-system/style/all.css'} />

			<H3>Add into your HTML</H3>
			<pre><code /></pre>
		</Section>
		<Section>
			<H2 id="typography">Typography</H2>
			<Table class="stripe">
				<thead>
					<tr>
						<th scope="col">Device width</th>
						{#each deviceSizes as size}
							<th scope="col">{size}px</th>
						{/each}
					</tr>
				</thead>
				<tbody>
					<tr>
						<th scope="row">Base</th>
						{#each deviceSizes as size}
							<td
								><abbr title="1rem + {fontScale}vw"
									>{(fontSize + (fontScale / 100) * size).toFixed(2)}px</abbr
								></td
							>
						{/each}
					</tr>
					<tr>
						<th scope="row">&lt;h1&gt;</th>
						{#each deviceSizes as size}
							<td
								><abbr title="2 * 1rem + {fontScale}vw"
									>{(2 * fontSize + (fontScale / 100) * size).toFixed(2)}px</abbr
								></td
							>
						{/each}
					</tr>
					<tr>
						<th scope="row">&lt;h2&gt;</th>
						{#each deviceSizes as size}
							<td
								><abbr title="1.75 * 1rem + {fontScale}vw"
									>{(1.75 * fontSize + (fontScale / 100) * size).toFixed(2)}px</abbr
								></td
							>
						{/each}
					</tr>
					<tr>
						<th scope="row">&lt;h3&gt;</th>
						{#each deviceSizes as size}
							<td
								><abbr title="1.5 * 1rem + {fontScale}vw"
									>{(1.5 * fontSize + (fontScale / 100) * size).toFixed(2)}px</abbr
								></td
							>
						{/each}
					</tr>
					<tr>
						<th scope="row">&lt;h4&gt;</th>
						{#each deviceSizes as size}
							<td
								><abbr title="1.25 * 1rem + {fontScale}vw"
									>{(1.25 * fontSize + (fontScale / 100) * size).toFixed(2)}px</abbr
								></td
							>
						{/each}
					</tr>
					<tr>
						<th scope="row">&lt;h5&gt;</th>
						{#each deviceSizes as size}
							<td
								><abbr title="1.125 * 1rem + {fontScale}vw"
									>{(1.125 * fontSize + (fontScale / 100) * size).toFixed(2)}px</abbr
								></td
							>
						{/each}
					</tr>
					<tr>
						<th scope="row">&lt;h6&gt;</th>
						{#each deviceSizes as size}
							<td
								><abbr title="1 * 1rem + {fontScale}vw"
									>{(1 * fontSize + (fontScale / 100) * size).toFixed(2)}px</abbr
								></td
							>
						{/each}
					</tr>
					<tr>
						<th scope="row">&lt;small&gt;</th>
						{#each deviceSizes as size}
							<td
								><abbr title="0.8 * 1rem + {fontScale}vw"
									>{(0.8 * fontSize + (fontScale / 100) * size).toFixed(2)}px</abbr
								></td
							>
						{/each}
					</tr>
				</tbody>
			</Table>
			<H3>Headings</H3>
			<Snippet Example={ExampleHeadings} />

			<H3>Heading group</H3>
			<Snippet Example={ExampleHeadingGroup} />
		</Section>
		<Section>
			<H2>Paragraphs</H2>
			<Snippet Example={ExampleParagraphs} />
		</Section>
		<Section>
			<H2>Horizontal rule</H2>
			<Snippet Example={ExampleHorizontalRule} />
		</Section>
		<Section>
			<H2>Inline text elements</H2>
			<Snippet Example={ExampleInlineTextElements} />
		</Section>
		<Section>
			<H2>Blockquote</H2>
			<Snippet Example={ExampleBlockquote} />
		</Section>
		<Section>
			<H2>Address</H2>
			<Snippet Example={ExampleAddress} />
		</Section>
		<Section>
			<H2>Lists</H2>
			<H3>Unordered</H3>
			<Snippet Example={ExampleListUnordered} />
			<H3>Ordered</H3>
			<Snippet Example={ExampleListOrdered} />
			<H3>Descriptions</H3>
			<Snippet Example={ExampleListDescription} />
		</Section>
		<Section>
			<H2>Buttons</H2>
			<Snippet Example={ExampleButton} />
		</Section>
		<Section>
			<H2>Table</H2>
			<Snippet Example={ExampleTable} />
			<Snippet Example={ExampleTableStripe} />
		</Section>
		<Section>
			<H2>Forms</H2>
			<H3>Errors</H3>
			<Snippet Example={ExampleFormErrors} />
			<H3>Text inputs</H3>
			<Snippet Example={ExampleFormInputText} />
			<H3>Number inputs</H3>
			<Snippet Example={ExampleFormInputNumber} />
			<H3>Date inputs</H3>
			<Snippet Example={ExampleFormInputDate} />
			<H3>Search input</H3>
			<Snippet Example={ExampleFormInputSearch} />
			<H3>Checkboxes</H3>
			<Snippet Example={ExampleFormInputCheckbox} />
			<H3>Radios</H3>
			<Snippet Example={ExampleFormInputRadio} />
			<H3>Select</H3>
			Don't use
			<Snippet Example={ExampleFormInputSelect} />
			<H3>Textarea</H3>
			<Snippet Example={ExampleFormInputTextarea} />
		</Section>
		<Section>
			<H2>Details</H2>
			<Snippet Example={ExampleDetails} />
		</Section>
		<Section>
			<H2>Accordion</H2>
			<Snippet Example={ExampleAccordion} />
		</Section>
		<Section>
			<H2>Cards</H2>
			<Snippet Example={ExampleCard} />
		</Section>
		<Section>
			<H2>Dialog</H2>
			<Snippet Example={ExampleDialogButton} Code={ExampleDialogCode} />
		</Section>
		<Section>
			<H2>Footnotes</H2>
		</Section>
		<Section>
			<H2>CSS rules</H2>
			<Ul>
				<Li
					>Use `start` and `end` of `top`, `right`, `bottom`, `left`
					(https://rtlstyling.com/posts/rtl-styling/#logical-properties-cheat-sheet)</Li
				>
				<Li>don't use `opacity`, will be removed with `prefers-reduced-transparency`</Li>
				<Li
					>don't use `box-shadow` or `text-shadow`, will be removed with `forced-colors` and
					`inverted-colors`</Li
				>
			</Ul>
		</Section>
	</article>
</Main>
<ExampleDialog />

<style>
	article {
		max-inline-size: var(--max-inline-size, 60ch);
	}

	/*iframe {
		height: 20em;
		max-inline-size: 60ch;
		resize: both;
		overflow: auto;
	}*/
</style>
