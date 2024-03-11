/* global Response */

export const prerender = true

export const GET = async () => {
  const locs = [
	'/'
  ]

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${locs
	.map(makeUrl)
	.join('')}
</urlset>`
  return new Response(body, {
	headers: {
	  'Content-Type': 'application/xml',
	  'Cache-Control': 'max-age=600'
	}
  })
}

const domain = 'https://design-system.willfarrell.ca'
const lastmod = new Date().toISOString()
const changefreq = 'monthly'
const priority = 1
const makeUrl = (loc) => {
//	<xhtml:link rel="alternate" hreflang="en-CA" href="${domain}/en-ca${loc}"/>
//	<xhtml:link rel="alternate" hreflang="fr-CA" href="${domain}/fr-ca${loc}"/>
  return `  <url>
	<loc>${domain}${loc}</loc>
	${lastmod ? `<lastmod>${lastmod}</lastmod>` : ''}
	${changefreq ? `<changefreq>${changefreq}</changefreq>` : ''}
	${priority ? `<priority>${priority}</priority>` : ''}
  </url>`
}
