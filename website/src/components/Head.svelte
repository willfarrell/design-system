<script>
	let {
		locale,
		name,
		title,
		description,
		keywords,
		url,
		image,
		imageAlt,
		usernameTwitter,
		usernameFacebook,
		children,
		...props
	} = $props();
	const origin = 'https://example.org'; // TODO pull from url
	const locales = {};
</script>

<svelte:head>
	<!-- https://ogp.me/ -->
	<!-- https://css-tricks.com/essential-meta-tags-social-media/ -->
	<!-- https://metatags.io/ -->

	<!-- <link rel="canonical" href={url}> -->
	{#each locales as lang}
		{#if lang.toLowerCase() !== locale}
			<link
				rel="alternate"
				hreflang={lang}
				href="{origin}{document?.locales?.[lang.toLowerCase()] ??
					pathname.replace(locale, lang.toLowerCase())}"
			/>
		{/if}
	{/each}
	<!--<link
  rel="alternate"
  hreflang="x-default"
  href={pathname.replace(locale, "").replace("//", "/")}
/>-->

	{#if name}
		<!-- <meta property="name" content="{name}" /> -->
		<meta property="og:site_name" content={name} />
	{/if}

	<meta property="og:type" content="website" />
	<!-- <meta property="og:locale" content="" /> -->
	<!-- <meta property="og:locale:alternate" content="" /> -->

	{#if title}
		<title>{title}</title>
		<!-- <meta property="og:title" content={title} /> --><!-- fallback to <title> -->
		<!--<meta property="twitter:title" content={title} />--><!-- fallback to <title> -->
	{/if}

	{#if description}
		<meta name="description" content={description} />
		<!-- <meta property="og:description" content={description} /> -->
		<!-- <meta property="twitter:description" content={description} /> --><!-- fallback to og:description -->
	{/if}

	{#if keywords}
		<meta name="keywords" content={keywords} />
	{/if}

	{#if url}
		<meta property="og:url" content={url} />
		<!--<meta property="twitter:url" content={url} />--><!-- fallback to og:url -->
	{/if}

	{#if image}
		<!-- Facebook: 1200x630 -->
		<!-- Twitter: 600x315 -->
		<meta property="og:image" content="{origin}{image}?w=1200&h=630" />
		<!-- <meta property="twitter:image" content={image + '?w=600&h=315'} /> --><!-- fallback to og:image -->
		{#if imageAlt}
			<meta property="og:image:alt" content={imageAlt} />
			<!-- <meta name="twitter:image:alt" content="{imageAlt}"> --><!-- fallback to og:image:alt -->
		{/if}
		{#if usernameTwitter}
			<meta property="twitter:card" content="summary_large_image" />
			<!-- <meta name="twitter:image:width" content="1200" /> -->
			<!-- <meta name="twitter:image:height" content="630" /> -->
		{/if}
	{/if}

	{#if usernameTwitter}
		<meta content="@{usernameTwitter}" name="twitter:site" />
		<meta content="@{usernameTwitter}" name="twitter:creator" />
	{/if}
	{#if usernameFacebook}
		<meta content={usernameFacebook} property="fb:app_id" />
	{/if}
	<!--
  Testing social share
  https://developers.facebook.com/tools/debug/
  https://cards-dev.twitter.com/validator
  https://www.linkedin.com/post-inspector/inspect/
-->
</svelte:head>
