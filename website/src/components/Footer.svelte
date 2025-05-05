<script>
	import Footer from '@design-system/svelte/element/footer.svelte';
	import H2 from '@design-system/svelte/element/h2.svelte';
	import H3 from '@design-system/svelte/element/h3.svelte';
	import Nav from '@design-system/svelte/element/nav.svelte';
	import Div from '@design-system/svelte/element/div.svelte';
	import Ul from '@design-system/svelte/element/ul.svelte';
	import Li from '@design-system/svelte/element/li.svelte';
	import P from '@design-system/svelte/element/p.svelte';
	import Span from '@design-system/svelte/element/span.svelte';
	import A from '@design-system/svelte/element/a.svelte';
	import Image from '@design-system/svelte/Image.svelte';
	import Icon from '@design-system/svelte/Icon.svelte';
	import Address from '@design-system/svelte/element/address.svelte';
</script>

<Footer id="footer">
	<H2 class="visually-hidden">Footer</H2>

	<Nav class="grid">
		<Div>
			<Ul>
				<Li>
					<A href="/">
						<Image src="/img/logo-square.svg" alt="Home" height="68" width="105" />
					</A>
				</Li>
				<Li><A href="#">Return to top</A></Li>
			</Ul>
			<Address>
				<P><A href="mailto:user+alias@example.org">user+alias@example.org</A></P>
				<P><A href="tel:+10000000000x000">+1-000-000-0000 x000</A></P>
				<P>Unit A, 1 Address Street, City, Region, Country, Postcode</P>
			</Address>
		</Div>
		<Div>
			<H3>Design tokens</H3>
			<Ul>
				<Li><A href="/design-tokens/font-family">font family</A></Li>
				<Li><A href="/design-tokens/font-size">font size</A></Li>
			</Ul>
		</Div>
		<Div>
			<H3>Components</H3>
			<Ul>
				<Li><A href="/full-ltr">Left To Right (LTR)</A></Li>
				<Li><A href="/full-rtl">Right To Left (RTL)</A></Li>
				<Li><A href="/full-vrl">Vertical Right to Left (VRL)</A></Li>
				<Li><A href="/full-vlr">Vertical Left to Right (VLR)</A></Li>
			</Ul>
		</Div>
		<Div>
			<H3>Layouts</H3>
			<Ul>
				<Li><A href="/layout/article">Article</A></Li>
				<Li><A href="/layout/documentation">Documentation</A></Li>
				<Li><A href="/layout/form">Form</A></Li>
				<Li><A href="/layout/search">Search</A></Li>
			</Ul>
		</Div>
		<Div>
			<H3>Social</H3>
			<Ul>
				<Li>
					<A href="https://github.com/willfarrell/design-system">
						<Icon src="/img/icons.svg#github" /><Span>GitHub</Span>
					</A>
				</Li>
			</Ul>
		</Div>
		<Div>
			<H3>Policies</H3>
			<Ul>
				<Li><A href="/policy/privacy">Privacy</A></Li>
				<Li><A href="/policy/accessibility">Accessibility</A></Li>
				<Li><A href="/policy/sustainability">Sustainability</A></Li>
				<Li><A href="/policy/security">Security</A></Li>
			</Ul>
		</Div>
	</Nav>
</Footer>

<style global>
	body > footer {
		border-block-start: solid #555 1px;
		padding: 0.5em 1em;
		.grid {
			--grid-gap: 1.5em;
			--grid-min-width: 12em;
		}
	}
</style>
