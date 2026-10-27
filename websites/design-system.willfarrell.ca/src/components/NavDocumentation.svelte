<script>
import Image from "@willfarrell-ds/svelte/components/Image.svelte";
import LayoutAsideNav from "@willfarrell-ds/svelte/components/LayoutAsideNav.svelte";
import NavScrollspy from "@willfarrell-ds/svelte/components/NavScrollspy.svelte";
import A from "@willfarrell-ds/svelte/elements/a.svelte";
import { page } from "$app/state";

const pathname = $derived.by(() => {
	try {
		return page.url.pathname;
	} catch {
		return "";
	}
});

import Abbr from "@willfarrell-ds/svelte/elements/abbr.svelte";
import Address from "@willfarrell-ds/svelte/elements/address.svelte";
import B from "@willfarrell-ds/svelte/elements/b.svelte";
import Button from "@willfarrell-ds/svelte/elements/button.svelte";
import Code from "@willfarrell-ds/svelte/elements/code.svelte";
import Del from "@willfarrell-ds/svelte/elements/del.svelte";
import Details from "@willfarrell-ds/svelte/elements/details.svelte";
import Em from "@willfarrell-ds/svelte/elements/em.svelte";
import Header from "@willfarrell-ds/svelte/elements/header.svelte";
import I from "@willfarrell-ds/svelte/elements/i.svelte";
import Img from "@willfarrell-ds/svelte/elements/img.svelte";
import Ins from "@willfarrell-ds/svelte/elements/ins.svelte";
import Kbd from "@willfarrell-ds/svelte/elements/kbd.svelte";
import Li from "@willfarrell-ds/svelte/elements/li.svelte";
import Mark from "@willfarrell-ds/svelte/elements/mark.svelte";
import Nav from "@willfarrell-ds/svelte/elements/nav.svelte";
import Ol from "@willfarrell-ds/svelte/elements/ol.svelte";
import S from "@willfarrell-ds/svelte/elements/s.svelte";
import Small from "@willfarrell-ds/svelte/elements/small.svelte";
import Strong from "@willfarrell-ds/svelte/elements/strong.svelte";
import Sub from "@willfarrell-ds/svelte/elements/sub.svelte";
import Summary from "@willfarrell-ds/svelte/elements/summary.svelte";
import Sup from "@willfarrell-ds/svelte/elements/sup.svelte";
import Time from "@willfarrell-ds/svelte/elements/time.svelte";
import U from "@willfarrell-ds/svelte/elements/u.svelte";
import Ul from "@willfarrell-ds/svelte/elements/ul.svelte";
import Var from "@willfarrell-ds/svelte/elements/var.svelte";
</script>

<Nav aria-label="Documentation">
	<Ul>
		<Li>
			<Details class="chevron" open={pathname.includes('/design-token/')}>
				<Summary><Strong>Design tokens</Strong></Summary>
				<Ul>
					<Li><A href="/design-token/typography">Typography</A></Li>
					<Li><A href="/design-token/font-size">Font size</A></Li>
					<Li><A href="/design-token/font-weight">Font weight</A></Li>
				</Ul>
			</Details>
		</Li>
		<Li>
			<Details class="chevron" open={pathname.includes('/text/')}>
				<Summary><strong>Text</strong></Summary>
				<Ul>
					<Li><A href="/text/headings">Headings</A></Li>
					<Li><A href="/text/heading-group">Heading group</A></Li>
					<Li><A href="/text/paragraph">Paragraphs</A></Li>
					<Li><A href="/text/links">Links</A></Li>
					<Li><A href="/text/inline-style">Style inline elements</A></Li>
					<Li><A href="/text/inline-format">Style format elements</A></Li>
					<Li><A href="/text/list-ol">List (ordered)</A></Li>
					<Li><A href="/text/list-ul">List (unordered)</A></Li>
					<Li><A href="/text/list-dl">List (description)</A></Li>
					<Li><A href="/text/address">Address</A></Li>
					<Li><A href="/text/details">Disclosure</A></Li>
					<Li><A href="/text/accordion">Accordion</A></Li>
					<Li><A href="/text/blockquote">Blockquote</A></Li>
					<Li><A href="/text/callout">Callout</A></Li>
					<Li><A href="/text/alert">Alert</A></Li>
					<Li><A href="/text/table">Table</A></Li>
					<Li><A href="/text/footnotes">Footnotes</A></Li>
					<Li><A href="/text/horizontal-rule">Horizontal rule</A></Li>
				</Ul>
			</Details>
		</Li>
		<Li>
			<Details class="chevron" open={pathname.includes('/form/')}>
				<Summary><strong>Form</strong></Summary>
				<Ul>
					<Li><A href="/form/errors">Errors</A></Li>
					<Li><A href="/form/buttons">Button</A></Li>
					<Li><A href="/form/input-text">Text</A></Li>
					<Li><A href="/form/input-name">Name</A></Li>
					<Li><A href="/form/input-username">Username</A></Li>
					<Li><A href="/form/input-email">Email address</A></Li>
					<Li><A href="/form/input-tel">Telephone number</A></Li>
					<Li><A href="/form/input-url">URL</A></Li>
					<Li><A href="/form/input-password">Password</A></Li>
					<Li><A href="/form/input-password-create">Password (create)</A></Li>
					<Li><A href="/form/input-webauthn">WebAuthn</A></Li>
					<Li><A href="/form/input-date">Date</A></Li>
					<Li><A href="/form/input-address">Address</A></Li>
					<Li><A href="/form/input-organization">Organization</A></Li>
					<Li><A href="/form/input-textarea">Textarea</A></Li>
					<Li><A href="/form/input-number">Number</A></Li>
					<Li><A href="/form/input-one-time-code">One time code</A></Li>
					<Li><A href="/form/input-select">Select</A></Li>
					<Li><A href="/form/input-select-typeahead">Select typeahead</A></Li>
					<Li><A href="/form/input-fetch-typeahead">Fetch typeahead</A></Li>
					<Li><A href="/form/input-radio">Radios</A></Li>
					<Li><A href="/form/input-checkbox">Checkboxes</A></Li>
					<Li><A href="/form/input-file">File</A></Li>
					<Li><A href="/form/input-search">Search</A></Li>
					<Li><A href="/form/input-timezone">Timezone</A></Li>
					<Li><A href="/form/input-javascript-enabled">JavaScript enabled</A></Li>
					<Li><A href="/form/input-browser-up-to-date">Browser up to date</A></Li>
				</Ul>
			</Details>
		</Li>
		<Li>
			<Details class="chevron" open={pathname.includes('/component/')}>
				<Summary><strong>Components</strong></Summary>
				<Ul>
					<Li><A href="/component/dialog">Dialog</A></Li>
					<Li><A href="/component/task-list">Task list</A></Li>
					<Li><A href="/component/task-list-sortable">Task list (sortable)</A></Li>
					<Li><A href="/component/table-sortable">Table (sortable)</A></Li>
					<Li><A href="/component/item-list">Item list</A></Li>
					<Li><A href="/component/card">Card</A></Li>
					<Li><A href="/component/card-metric">Card metric</A></Li>
					<Li><A href="/component/badge">Badge</A></Li>
					<Li><A href="/component/tag">Tag</A></Li>
					<Li><A href="/component/breadcrumb">Breadcrumb</A></Li>
					<Li><A href="/component/pagination">Pagination</A></Li>
					<Li><A href="/component/image">Image</A></Li>
					<Li><A href="/component/icon">Icon</A></Li>
					<Li><A href="/component/video">Video</A></Li>
					<Li><A href="/component/codeblock">Codeblock</A></Li>
					<Li><A href="/component/copy-download">Copy and download</A></Li>
					<Li><A href="/component/codeblock-actions">Codeblock actions</A></Li>
					<Li><A href="/component/popover">Popover</A></Li>
					<Li><A href="/component/popover-hint">Popover hint</A></Li>
					<Li><A href="/component/dropdown">Dropdown</A></Li>
					<Li><A href="/component/tooltip">Tooltip</A></Li>
					<Li><A href="/component/scrollspy">Scrollspy</A></Li>
					<Li><A href="/component/data-bytes">DataBytes</A></Li>
					<Li><A href="/component/data-number">DataNumber</A></Li>
					<Li><A href="/component/data-time">DataTime</A></Li>
					<Li><A href="/component/data-enum">DataEnum</A></Li>
				</Ul>
			</Details>
		</Li>
		<Li>
			<Details class="chevron" open={pathname.includes('/layout/')}>
				<Summary><strong>Layouts</strong></Summary>
				<Ul>
					<Li><A href="/layout/article">Article</A></Li>
					<Li><A href="/layout/documentation">Documentation</A></Li>
					<Li><A href="/layout/form">Form</A></Li>
					<Li><A href="/layout/search">Search</A></Li>
					<Li><A href="/layout/slices">Slices</A></Li>
				</Ul>
			</Details>
		</Li>
	</Ul>
</Nav>
