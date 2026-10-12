<script>
import Codeblock from "@willfarrell-ds/svelte/components/Codeblock.svelte";
import H2 from "@willfarrell-ds/svelte/components/Heading2.svelte";
import H3 from "@willfarrell-ds/svelte/components/Heading3.svelte";

// Every value a scan reports on, in the form a provider's field takes: the
// value on its own, no record prefix and no header name.
const dns = [
	["Verification TXT", "dns", "tardisec-verification=abc123def456"],
	["SPF", "dns-spf", "v=spf1 include:_spf.example.com ip4:192.0.2.0/24 -all"],
	[
		"DMARC",
		"dns-dmarc",
		"v=DMARC1; p=reject; sp=reject; pct=100; adkim=s; aspf=s; rua=mailto:dmarc@example.com",
	],
	["DKIM", "dns-dkim", "v=DKIM1; k=rsa; h=sha256; p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQ"],
	["MTA-STS", "dns-mta-sts", "v=STSv1; id=20260913T000000"],
	["TLS-RPT", "dns-tls-rpt", "v=TLSRPTv1; rua=mailto:tlsrpt@example.com"],
	["BIMI", "dns-bimi", "v=BIMI1; l=https://example.com/logo.svg; a=https://example.com/vmc.pem"],
	["CAA", "dns-caa", '0 issue "letsencrypt.org"'],
];

const headers = [
	["Content-Security-Policy", "http-csp", "default-src 'none'; script-src 'self'; frame-ancestors 'none'; report-to default"],
	["Strict-Transport-Security", "http-hsts", "max-age=31536000; includeSubDomains; preload"],
	["Public-Key-Pins", "http-hpkp", 'pin-sha256="d6qzRu9zOECb90Uez27xWltNsj0e1Md7GkYYkVoZWmM="; max-age=5184000'],
	["Permissions-Policy", "http", "camera=(),geolocation=(),microphone=(),fullscreen=(self)"],
	["Cross-Origin-Embedder-Policy", "http-coep", "require-corp;report-to=default"],
	["Cross-Origin-Opener-Policy", "http-coop", "same-origin;report-to=default"],
	["Cross-Origin-Resource-Policy", "http-corp", "same-origin"],
	["Document-Isolation-Policy", "http-dip", "isolate-and-require-corp;report-to=default"],
	["Document-Policy", "http", "*;report-to=default"],
	["Integrity-Policy", "http-integrity-policy", "blocked-destinations=(script style),endpoints=(default)"],
	["Origin-Agent-Cluster", "http", "?1"],
	["Referrer-Policy", "http-referrer", "no-referrer"],
	["Reporting-Endpoints", "http", 'default="https://example.report-to.org"'],
	["X-Content-Type-Options", "http-content-type-options", "nosniff"],
	["X-Frame-Options", "http-frame-options", "DENY"],
	["X-Permitted-Cross-Domain-Policies", "http-cross-domain-policies", "none"],
	["NEL", "json", '{"failure_fraction":1,"include_subdomains":true,"max_age":31536000,"report_to":"default"}'],
	["Report-To", "json", '{"endpoints":[{"url":"https://example.report-to.org"}],"group":"default","max_age":31536000}'],
];
</script>

<H2>DNS</H2>
{#each dns as [title, language, value] (title)}
	<H3>{title}</H3>
	<Codeblock {language} code={value} />
{/each}

<H2>HTTP headers</H2>
{#each headers as [title, language, value] (title)}
	<H3>{title}</H3>
	<Codeblock {language} code={value} />
{/each}
