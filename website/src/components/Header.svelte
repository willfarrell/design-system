<script>
	import Header from '@design-system/svelte/element/header.svelte';
	import Nav from '@design-system/svelte/element/nav.svelte';
	import Aside from '@design-system/svelte/element/aside.svelte';
	import Ul from '@design-system/svelte/element/ul.svelte';
	import Li from '@design-system/svelte/element/li.svelte';
	import A from '@design-system/svelte/element/a.svelte';
	import Image from '@design-system/svelte/Image.svelte';
	import Button from '@design-system/svelte/element/button.svelte';
</script>

<Header>
	<Aside>
		<Nav aria-label="Main maneu">
			<A href="#main" class="skip">Skip to main content</A>
			<Ul>
				<!-- <Li><A href="/en" lang="en">English</A></Li> -->
				<!-- <Li><A href="/ja" lang="ja">日本語</A></Li>
				<Li><A href="/ar" lang="ar" dir="rtl">عربي</A></Li> -->
			</Ul>
		</Nav>
	</Aside>
	<Nav aria-label="Main maneu">
		<A href="/">
			<Image
				src="/img/logo.svg"
				alt="Home"
				height="31"
				width="213"
				decoding="auto"
				fetchpriority="high"
				loading="egar"
			/>
		</A>

		<Ul>
			<Li>
				<A href="/edit">edit</A>
			</Li>
			<Li>
				<A href="/full-ltr">LTR</A>
			</Li>
		</Ul>
	</Nav>
</Header>

<style global>
	body > header {
		nav {
			display: flex;
			justify-content: space-between;
			padding: 0.5em 1em;
			border-block-end: solid #555 1px;
		}
		ul {
			display: flex;
			gap: 1em;
		}
	}
</style>
