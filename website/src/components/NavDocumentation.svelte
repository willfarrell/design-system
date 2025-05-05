<script>
	import { page } from '$app/stores';
	import Nav from '@design-system/svelte/element/nav.svelte';
	import Time from '@design-system/svelte/element/time.svelte';
	import NavScrollspy from '@design-system/svelte/NavScrollspy.svelte';
	import Header from '@design-system/svelte/element/header.svelte';
	import A from '@design-system/svelte/element/a.svelte';
	import Abbr from '@design-system/svelte/element/abbr.svelte';
	import Address from '@design-system/svelte/element/address.svelte';
	import B from '@design-system/svelte/element/b.svelte';
	import Strong from '@design-system/svelte/element/strong.svelte';
	import Em from '@design-system/svelte/element/em.svelte';
	import I from '@design-system/svelte/element/i.svelte';
	import Del from '@design-system/svelte/element/del.svelte';
	import Ins from '@design-system/svelte/element/ins.svelte';
	import Code from '@design-system/svelte/element/code.svelte';
	import Kbd from '@design-system/svelte/element/kbd.svelte';
	import Mark from '@design-system/svelte/element/mark.svelte';
	import S from '@design-system/svelte/element/s.svelte';
	import Small from '@design-system/svelte/element/small.svelte';
	import Sub from '@design-system/svelte/element/sub.svelte';
	import Sup from '@design-system/svelte/element/sup.svelte';
	import U from '@design-system/svelte/element/u.svelte';
	import Var from '@design-system/svelte/element/var.svelte';
	import Ul from '@design-system/svelte/element/ul.svelte';
	import Ol from '@design-system/svelte/element/ol.svelte';
	import Li from '@design-system/svelte/element/li.svelte';
	import Button from '@design-system/svelte/element/button.svelte';
	import Img from '@design-system/svelte/element/img.svelte';
	import Details from '@design-system/svelte/element/details.svelte';
	import Summary from '@design-system/svelte/element/summary.svelte';
	import Image from '@design-system/svelte/Image.svelte';
</script>

<Nav>
	<Ul>
		<Li>
			<Details class="chevron" open={$page.url.pathname.includes('/design-token/')}>
				<Summary><strong>Design tokens</strong></Summary>
				<Ul>
					<Li><A href="/design-token/font-family">Font family</A></Li>
					<Li><A href="/design-token/font-size">Font size</A></Li>
					<!-- <Li><A href="/design-token/color-palette">Colour palette</A></Li> -->
					<!-- <Li><A href="/design-token/themes">Themes</A></Li> -->
				</Ul>
			</Details>
		</Li>
		<Li>
			<Details class="chevron" open={$page.url.pathname.includes('/text/')}>
				<Summary><strong>Text</strong></Summary>
				<Ul>
					<Li><A href="/text/headings">Headings</A></Li>
					<Li><A href="/text/heading-group">Headings-group</A></Li>
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
					<Li><A href="/text/table">Table</A></Li>
					<!-- <Li><A href="/text/code">Code block</A></Li> -->
					<Li><A href="/text/footnotes">Footnotes</A></Li>
				</Ul>
			</Details>
		</Li>
		<Li>
			<Details class="chevron" open={$page.url.pathname.includes('/form/')}>
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
					<!-- <Li><A href="/form/input-webauthn">WebAuthn</A></Li> -->
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
			<Details class="chevron" open={$page.url.pathname.includes('/media/')}>
				<Summary><strong>Media</strong></Summary>
				<Ul>
					<Li><A href="/media/images">Images</A></Li>
					<Li><A href="/media/icons">Icons</A></Li>
					<Li><A href="/media/video">Video</A></Li>
					<Li><A href="/media/audio">Audio</A></Li>
				</Ul>
			</Details>
		</Li> -->
		<!-- <Li>
			<Details class="chevron" open={$page.url.pathname.includes('/nav/')}>
				<Summary><strong>Navigation</strong></Summary>
				<Ul>
					<Li><A href="/nav/links">Links</A></Li>
					<Li><A href="/nav/dropdown">dropdown</A></Li>
				</Ul>
			</Details>
		</Li> -->

		<!-- <Li><Strong>Patterns</Strong></Li>
		<Li><A href="/pattern/card">card</A></Li>
		<Li><A href="/pattern/skip-link">Skip link</A></Li>
		<Li><A href="/pattern/header">header</A></Li>
		<Li><A href="/pattern/footer">footer</A></Li> -->

		<Li>
			<Details class="chevron" open={$page.url.pathname.includes('/layout/')}>
				<Summary><strong>Layouts</strong></Summary>
				<Ul>
					<Li><A href="/layout/article">Article</A></Li>
					<Li><A href="/layout/documentation">Documentation</A></Li>
					<Li><A href="/layout/form">Form</A></Li>
					<Li><A href="/layout/search">Search</A></Li>
				</Ul>
			</Details>
		</Li>
	</Ul>
</Nav>
