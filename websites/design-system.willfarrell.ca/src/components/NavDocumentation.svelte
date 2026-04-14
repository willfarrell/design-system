<script>
import Image from "@design-system/components/Image.svelte";
import LayoutAsideNav from "@design-system/components/LayoutAsideNav.svelte";
import NavScrollspy from "@design-system/components/NavScrollspy.svelte";
import A from "@design-system/elements/a.svelte";
import { page } from "$app/state";

const pathname = $derived.by(() => {
	try {
		return page.url.pathname;
	} catch {
		return "";
	}
});

import Abbr from "@design-system/elements/abbr.svelte";
import Address from "@design-system/elements/address.svelte";
import B from "@design-system/elements/b.svelte";
import Button from "@design-system/elements/button.svelte";
import Code from "@design-system/elements/code.svelte";
import Del from "@design-system/elements/del.svelte";
import Details from "@design-system/elements/details.svelte";
import Em from "@design-system/elements/em.svelte";
import Header from "@design-system/elements/header.svelte";
import I from "@design-system/elements/i.svelte";
import Img from "@design-system/elements/img.svelte";
import Ins from "@design-system/elements/ins.svelte";
import Kbd from "@design-system/elements/kbd.svelte";
import Li from "@design-system/elements/li.svelte";
import Mark from "@design-system/elements/mark.svelte";
import Nav from "@design-system/elements/nav.svelte";
import Ol from "@design-system/elements/ol.svelte";
import S from "@design-system/elements/s.svelte";
import Small from "@design-system/elements/small.svelte";
import Strong from "@design-system/elements/strong.svelte";
import Sub from "@design-system/elements/sub.svelte";
import Summary from "@design-system/elements/summary.svelte";
import Sup from "@design-system/elements/sup.svelte";
import Time from "@design-system/elements/time.svelte";
import U from "@design-system/elements/u.svelte";
import Ul from "@design-system/elements/ul.svelte";
import Var from "@design-system/elements/var.svelte";
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
					<!-- <Li><A href="/design-token/color-palette">Colour palette</A></Li> -->
					<!-- <Li><A href="/design-token/themes">Themes</A></Li> -->
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
					<!-- <Li><A href="/text/code">Code block</A></Li> -->
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
					<!-- <Li><A href="/form/back-link">Back link</A></Li> -->
					<Li><A href="/form/input-text">Text</A></Li>
					<Li><A href="/form/input-name">Name</A></Li>
					<Li><A href="/form/input-email">Email address</A></Li>
					<Li><A href="/form/input-tel">Telephone number</A></Li>
					<Li><A href="/form/input-url">URL</A></Li>
					<Li><A href="/form/input-password">Password</A></Li>
					<Li><A href="/form/input-webauthn">WebAuthn</A></Li>
					<Li><A href="/form/input-date">Date</A></Li>
					<Li><A href="/form/input-address">Address</A></Li>
					<Li><A href="/form/input-textarea">Textarea</A></Li>
					<Li><A href="/form/input-number">Number</A></Li>
					<Li><A href="/form/input-one-time-code">One time code</A></Li>
					<Li><A href="/form/input-select">Select</A></Li>
					<Li><A href="/form/input-radio">Radios</A></Li>
					<Li><A href="/form/input-checkbox">Checkboxes</A></Li>
					<Li><A href="/form/input-file">File</A></Li>
					<Li><A href="/form/input-search">Search</A></Li>
				</Ul>
			</Details>
		</Li>
		<!-- <Li>
			<Details class="chevron" open={pathname.includes('/media/')}>
				<Summary><strong>Media</strong></Summary>
				<Ul>
					<Li><A href="/media/images">Images</A></Li>
					<Li><A href="/media/icons">Icons</A></Li>
					<Li><A href="/media/video">Video</A></Li>
					<Li><A href="/media/audio">Audio</A></Li>
				</Ul>
			</Details>
		</Li> -->
		<Li>
			<Details class="chevron" open={pathname.includes('/component/')}>
				<Summary><strong>Components</strong></Summary>
				<Ul>
					<Li><A href="/component/dialog">Dialog</A></Li>
					<Li><A href="/component/dialog-fallback">Dialog (JS fallback)</A></Li>
					<Li><A href="/component/task-list">Task list</A></Li>
					<Li><A href="/component/card">Card</A></Li>
					<Li><A href="/component/badge">Badge</A></Li>
					<Li><A href="/component/tag">Tag</A></Li>
					<Li><A href="/component/icon">Icon</A></Li>
					<Li><A href="/component/popover">Popover</A></Li>
					<Li><A href="/component/data-bytes">DataBytes</A></Li>
					<Li><A href="/component/data-number">DataNumber</A></Li>
					<Li><A href="/component/data-time">DataTime</A></Li>
					<Li><A href="/component/data-enum">DataEnum</A></Li>
				</Ul>
			</Details>
		</Li>

		<!-- <Li><Strong>Patterns</Strong></Li>
		<Li><A href="/pattern/card">card</A></Li>
		<Li><A href="/pattern/skip-link">Skip link</A></Li>
		<Li><A href="/pattern/header">header</A></Li>
		<Li><A href="/pattern/footer">footer</A></Li> -->

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
