<script>
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
	import {fontFamily, argTypes, text} from './lib/controls.js'
	import Main from '../svelte/element/main.svelte'
	import Hgroup from '../svelte/element/hgroup.svelte'
	import HeadingSub from '../svelte/HeadingSub.svelte'
	import Heading1 from '../svelte/Heading1.svelte'
	import Heading2 from '../svelte/Heading2.svelte'
	import Heading3 from '../svelte/Heading3.svelte'
	import Heading4 from '../svelte/Heading4.svelte'
	import Heading5 from '../svelte/Heading5.svelte'
	import Heading6 from '../svelte/Heading6.svelte'
	import Article from '../svelte/element/article.svelte'
	import P from '../svelte/element/p.svelte'
	import A from '../svelte/element/a.svelte'
	import Small from '../svelte/element/small.svelte'
	import Time from '../svelte/element/time.svelte'
	import Pre from '../svelte/element/pre.svelte'
	import Code from '../svelte/element/code.svelte'
	
	import './assets/global.css';
	
	// https://en.wikipedia.org/wiki/Pangram
	const ascii = ' !"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~'
	const symbols = ' !"#$%&\'()*+,-./0123456789:;<=>?@[\\]^_`{|}~'
	const en = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz`
	const fr = `ÀàÂâÆæÇçÈèÉéÊêËëÎîÏïÔôÙùÛûÜüŸÿŒœ`
	// https://en.wikipedia.org/wiki/Cree_syllabics
	const cr = `ᐁᐃᐅᐊᐯᐱᐳᐸᑌᑎᑐᑕᑫᑭᑯᑲᒉᒋᒍᒐᒣᒥᒧᒪᓀᓂᓄᓇᓭᓯᓱᓴᔦᔨᔪᔭ`
	// https://en.wikipedia.org/wiki/Inuktitut_syllabics
	const iu = `ᐁᐃᐄᐅᐆᐊᐋᐯᐱᐲᐳᐴᐸᐹᑉᑌᑎᑏᑐᑑᑕᑖᑦᑫᑭᑮᑯᑰᑲᑳᒃᒉᒋᒌᒍᒎᒐᒑᒡᒣᒥᒦᒧᒨᒪᒫᒻᓀᓂᓃᓄᓅᓇᓈᓐᓓᓕᓖᓗᓘᓚᓛᓪᓭᓯᓰᓱᓲᓴᓵᔅᔦᔨᔩᔪᔫᔭᔮᔾᕂᕆᕇᕈᕉᕋᕌᕐᕓᕕᕖᕗᕘᕙᕚᕝᕴᕵᕶᕷᕸᕹᕺᕻᕿᖀᖁᖂᖃᖄᖅᖏᖐᖑᖒᖓᖔᖕᖖᖠᖡᖢᖣᖤᖥᖦᖨᖩᖪᖫᖬᖭᖮᙯᙰᙱᙲᙳᙴᙵᙶ𑪰𑪱𑪲𑪳𑪴𑪵𑪶𑪷𑪸𑪹𑪺𑪻`
	// https://en.wikipedia.org/wiki/Ojibwe_writing_systems
	const oj = `ᐁᐃᐄᐅᐆᐊᐋᐞᐤᐦᐧᐯᐱᐲᐳᐴᐸᐹᑉᑌᑎᑏᑐᑑᑕᑖᑦᑫᑭᑮᑯᑰᑲᑳᒃᒉᒋᒌᒍᒎᒐᒑᒡᒣᒥᒦᒧᒨᒪᒫᒻᓀᓂᓃᓄᓅᓇᓈᓐᓭᓯᓰᓱᓲᓴᓵᔅᔐᔑᔒᔓᔔᔕᔖᔥᔦᔨᔩᔪᔫᔭᔮᔾᣔᣕᣖᣗᣘᣙᣚᣛᣜ`
	
	const pangramEn = 'The quick brown fox jumps over the lazy dog'
	const pangramFr = 'Dès Noël Où Un Zéphyr Haï Me Vêt De Glaçons Würmiens Je Dîne D’exquis Rôtis De Bœuf Au Kir À L’aÿ D’âge Mûr & Cætera!'
	
	
	
	
	const fontSize = 16
	const fontScale = 0.5
	const deviceSizes = [360, 480, 768, 1024, 1280, 1920]
	
	const range = (n,m) => {
		// return [n...m]
		return Array.from({length: m-n}, (_, i) => '&#'+ (i + n)+';')
	}
	const rangeHex = (n,m) => {
		// return [n...m]
		n = parseInt(n, 16)
		m = parseInt(m, 16)
		return range(n,m)
	}
</script>

<Meta title="Typography"/>

<Story name="Font Family" {argTypes} args={{fontFamily, text}} let:fontFamily let:text>
  <Main class="container" style="font-family: {fontFamily};">
	
	<Heading2>{fontFamily}</Heading2>
	<P>000000000000000000000000000000000000000000000000000000000000{text}</P>
	<Heading2>mirroring and transpositioning</Heading2>
	<P>B8 coe qp db 0Oo nu !il1I| 69 a8g a6g rnm</P>
	<Heading2>Symbols</Heading2>
	<P>{symbols}</P>
	<Heading2>English</Heading2>
	<P>{en}</P>
	<Heading2>French / Français</Heading2>
	<P>{fr}</P>
	<Heading2>Cree / ᐃᔨᔫ ᐊᔨᒧᐎᓐ</Heading2>
	<P>{cr}</P>
	<Heading2>Inuktitut / ᐃᓄᒃᑎᑐᑦ</Heading2>
	<P>{iu}</P>
	<Heading2>Ojibwe / ᐊᓂᔑᓈᐯᒧᐎᓐ</Heading2>
	<P>{oj}</P>
	<!--
	<Heading2>Basic Latin (U+0-7F)</Heading2>
	<P>{#each rangeHex('0','7F') as i}{@html i}{/each}</P>
	<Heading2>Latin-1 Supplement (U+80-FF)</Heading2>
	<P>{#each rangeHex('80','FF') as i}{@html i}{/each}</P>
	<Heading2>Latin Extended-A (U+100-17F)</Heading2>
	<P>{#each rangeHex('100','17F') as i}{@html i}{/each}</P>
	<Heading2>Latin Extended-B (U+180-24F)</Heading2>
	<P>{#each rangeHex('180','24F') as i}{@html i}{/each}</P>
	<Heading2>IPA Extensions (U+250-2AF)</Heading2>
	<P>{#each rangeHex('250','2AF') as i}{@html i}{/each}</P>
	<Heading2>Spacing Modifier Letters (U+2B0-2FF)</Heading2>
	<P>{#each rangeHex('2B0','2FF') as i}{@html i}{/each}</P>
	<Heading2>Combining Diacritical Marks (U+300-36F)</Heading2>
	<P>{#each rangeHex('300','36F') as i}{@html i}{/each}</P>
	<Heading2>Greek and Coptic (U+370-3FF)</Heading2>
	<P>{#each rangeHex('370','3FF') as i}{@html i}{/each}</P>
	<Heading2>Cyrillic (U+400-4FF)</Heading2>
	<P>{#each rangeHex('400','4FF') as i}{@html i}{/each}</P>
	<Heading2>Cyrillic Supplement (U+500-527)</Heading2>
	<P>{#each rangeHex('500','527') as i}{@html i}{/each}</P>
	<Heading2>Armenian (U+531-58A)</Heading2>
	<P>{#each rangeHex('531','58A') as i}{@html i}{/each}</P>
	<Heading2>Hebrew (U+591-5F4)</Heading2>
	<P>{#each rangeHex('591','5F4') as i}{@html i}{/each}</P>
	<Heading2>Arabic (U+600-6FF)</Heading2>
	<P>{#each rangeHex('600','6FF') as i}{@html i}{/each}</P>
	<Heading2>Syriac (U+700-74F)</Heading2>
	<P>{#each rangeHex('700','74F') as i}{@html i}{/each}</P>
	<Heading2>Arabic Supplement (U+750-77F)</Heading2>
	<P>{#each rangeHex('750','77F') as i}{@html i}{/each}</P>
	<Heading2>Thaana (U+780-7B1)</Heading2>
	<P>{#each rangeHex('780','7B1') as i}{@html i}{/each}</P>
	<Heading2>NKo (U+7C0-7FA)</Heading2>
	<P>{#each rangeHex('7C0','7FA') as i}{@html i}{/each}</P>
	<Heading2>Samaritan (U+800-83E)</Heading2>
	<P>{#each rangeHex('800','83E') as i}{@html i}{/each}</P>
	<Heading2>Mandaic (U+840-85E)</Heading2>
	<P>{#each rangeHex('840','85E') as i}{@html i}{/each}</P>
	<Heading2>Devanagari (U+900-97F)</Heading2>
	<P>{#each rangeHex('900','97F') as i}{@html i}{/each}</P>
	<Heading2>Bengali (U+981-9FB)</Heading2>
	<P>{#each rangeHex('981','9FB') as i}{@html i}{/each}</P>
	<Heading2>Gurmukhi (U+A01-A75)</Heading2>
	<P>{#each rangeHex('A01','A75') as i}{@html i}{/each}</P>
	<Heading2>Gujarati (U+A81-AF1)</Heading2>
	<P>{#each rangeHex('A81','AF1') as i}{@html i}{/each}</P>
	<Heading2>Oriya (U+B01-B77)</Heading2>
	<P>{#each rangeHex('B01','B77') as i}{@html i}{/each}</P>
	<Heading2>Tamil (U+B82-BFA)</Heading2>
	<P>{#each rangeHex('B82','BFA') as i}{@html i}{/each}</P>
	<Heading2>Telugu (U+C01-C7F)</Heading2>
	<P>{#each rangeHex('C01','C7F') as i}{@html i}{/each}</P>
	<Heading2>Kannada (U+C82-CF2)</Heading2>
	<P>{#each rangeHex('C82','CF2') as i}{@html i}{/each}</P>
	<Heading2>Malayalam (U+D02-D7F)</Heading2>
	<P>{#each rangeHex('D02','D7F') as i}{@html i}{/each}</P>
	<Heading2>Sinhala (U+D82-DF4)</Heading2>
	<P>{#each rangeHex('D82','DF4') as i}{@html i}{/each}</P>
	<Heading2>Thai (U+E01-E5B)</Heading2>
	<P>{#each rangeHex('E01','E5B') as i}{@html i}{/each}</P>
	<Heading2>Lao (U+E81-EDD)</Heading2>
	<P>{#each rangeHex('E81','EDD') as i}{@html i}{/each}</P>
	<Heading2>Tibetan (U+F00-FDA)</Heading2>
	<P>{#each rangeHex('F00','FDA') as i}{@html i}{/each}</P>
	<Heading2>Myanmar (U+1000-109F)</Heading2>
	<P>{#each rangeHex('1000','109F') as i}{@html i}{/each}</P>
	<Heading2>Georgian (U+10A0-10FC)</Heading2>
	<P>{#each rangeHex('10A0','10FC') as i}{@html i}{/each}</P>
	<Heading2>Hangul Jamo (U+1100-11FF)</Heading2>
	<P>{#each rangeHex('1100','11FF') as i}{@html i}{/each}</P>
	<Heading2>Ethiopic (U+1200-137C)</Heading2>
	<P>{#each rangeHex('1200','137C') as i}{@html i}{/each}</P>
	<Heading2>Ethiopic Supplement (U+1380-1399)</Heading2>
	<P>{#each rangeHex('1380','1399') as i}{@html i}{/each}</P>
	<Heading2>Cherokee (U+13A0-13F4)</Heading2>
	<P>{#each rangeHex('13A0','13F4') as i}{@html i}{/each}</P>
	<Heading2>Unified Canadian Aboriginal Syllabics (U+1400-167F)</Heading2>
	<P>{#each rangeHex('1400','167F') as i}{@html i}{/each}</P>
	<Heading2>Ogham (U+1680-169C)</Heading2>
	<P>{#each rangeHex('1680','169C') as i}{@html i}{/each}</P>
	<Heading2>Runic (U+16A0-16F0)</Heading2>
	<P>{#each rangeHex('16A0','16F0') as i}{@html i}{/each}</P>
	<Heading2>Tagalog (U+1700-1714)</Heading2>
	<P>{#each rangeHex('1700','1714') as i}{@html i}{/each}</P>
	<Heading2>Hanunoo (U+1720-1736)</Heading2>
	<P>{#each rangeHex('1720','1736') as i}{@html i}{/each}</P>
	<Heading2>Buhid (U+1740-1753)</Heading2>
	<P>{#each rangeHex('1740','1753') as i}{@html i}{/each}</P>
	<Heading2>Tagbanwa (U+1760-1773)</Heading2>
	<P>{#each rangeHex('000','000') as i}{@html i}{/each}</P>
	<Heading2>Khmer (U+1780-17F9)</Heading2>
	<P>{#each rangeHex('1780','17F9') as i}{@html i}{/each}</P>
	<Heading2>Mongolian (U+1800-18AA)</Heading2>
	<P>{#each rangeHex('1800','18AA') as i}{@html i}{/each}</P>
	<Heading2>Unified Canadian Aboriginal Syllabics Extended (U+18B0-18F5)</Heading2>
	<P>{#each rangeHex('18B0','18F5') as i}{@html i}{/each}</P>
	<Heading2>Limbu (U+1900-194F)</Heading2>
	<P>{#each rangeHex('1900','194F') as i}{@html i}{/each}</P>
	<Heading2>Tai Le (U+1950-1974)</Heading2>
	<P>{#each rangeHex('1950','1974') as i}{@html i}{/each}</P>
	<Heading2>New Tai Lue (U+1980-19DF)</Heading2>
	<P>{#each rangeHex('1980','19DF') as i}{@html i}{/each}</P>
	<Heading2>Khmer Symbols (U+19E0-19FF)</Heading2>
	<P>{#each rangeHex('19E0','19FF') as i}{@html i}{/each}</P>
	<Heading2>Buginese (U+1A00-1A1F)</Heading2>
	<P>{#each rangeHex('1A00','1A1F') as i}{@html i}{/each}</P>
	<Heading2>Tai Tham (U+1A20-1AAD)</Heading2>
	<P>{#each rangeHex('1A20','1AAD') as i}{@html i}{/each}</P>
	<Heading2>Balinese (U+1B00-1B7C)</Heading2>
	<P>{#each rangeHex('1B00','1B7C') as i}{@html i}{/each}</P>
	<Heading2>Sundanese (U+1B80-1BB9)</Heading2>
	<P>{#each rangeHex('1B80','1BB9') as i}{@html i}{/each}</P>
	<Heading2>Batak (U+1BC0-1BFF)</Heading2>
	<P>{#each rangeHex('1BC0','1BFF') as i}{@html i}{/each}</P>
	<Heading2>Lepcha (U+1C00-1C4F)</Heading2>
	<P>{#each rangeHex('1C00','1C4F') as i}{@html i}{/each}</P>
	<Heading2>Ol Chiki (U+1C50-1C7F)</Heading2>
	<P>{#each rangeHex('1C50','1C7F') as i}{@html i}{/each}</P>
	<Heading2>Vedic Extensions (U+1CD0-1CF2)</Heading2>
	<P>{#each rangeHex('1CD0','1CF2') as i}{@html i}{/each}</P>
	<Heading2> (U+000-000)</Heading2>
	<P>{#each rangeHex('000','000') as i}{@html i}{/each}</P>
-->
	
	  Ref:
	  - https://fonts.google.com/knowledge/readability_and_accessibility/introducing_accessibility_in_typography
	  - https://www.unicodepedia.com/groups/
	 </Main>
</Story>

<Story name="Font Weight" 
{argTypes} args={{fontFamily, fontWeight:400}} 
let:fontFamily let:fontWeight>
  <Main class="container" style="font-family: {fontFamily};">
	  <P style="font-weight: {fontWeight};">{fontWeight} {text}</P>
	  {#each [100,200,300,400,500,600,700,800,900] as fontWeight}
	  <P style="font-weight: {fontWeight};">{fontWeight} {text}</P>
	  <P style="font-weight: {fontWeight};"><em>{fontWeight} Italics {text}</em></P>
	{/each}
  </Main>
</Story>

<Story name="Font Size" 
{argTypes} args={{fontFamily}} 
let:fontFamily>
  <Main class="container" style="font-family: {fontFamily};">
	  <table class="stripped">
		  <thead>
			<tr>
			  <th scope="col">Width</th>
			  {#each deviceSizes as size}
			  <th scope="col">{size}px</th>
			  {/each}
			</tr>
		  </thead>
		  <tbody>
			  <tr>
				<th scope="row">Base</th>
				  {#each deviceSizes as size}
				  <th scope="col">{(fontSize + fontScale/100 * size).toFixed(2)}px</th>
				  {/each}
			  </tr>
			  <tr>
				<th scope="row">&lt;h1&gt;</th>
				  {#each deviceSizes as size}
				  <th scope="col">{(2*fontSize + fontScale/100 * size).toFixed(2)}px</th>
				  {/each}
			  </tr>
			  <tr>
			  <th scope="row">&lt;h2&gt;</th>
				{#each deviceSizes as size}
				<th scope="col">{(1.75*fontSize + fontScale/100 * size).toFixed(2)}px</th>
				{/each}
			</tr>
			<tr>
				<th scope="row">&lt;h3&gt;</th>
			  {#each deviceSizes as size}
			  <th scope="col">{(1.5*fontSize + fontScale/100 * size).toFixed(2)}px</th>
			  {/each}
		  </tr>
		  <tr>
			  <th scope="row">&lt;h4&gt;</th>
				{#each deviceSizes as size}
				<th scope="col">{(1.25*fontSize + fontScale/100 * size).toFixed(2)}px</th>
				{/each}
			</tr>
			<tr>
				<th scope="row">&lt;h5&gt;</th>
				  {#each deviceSizes as size}
				  <th scope="col">{(1.125*fontSize + fontScale/100 * size).toFixed(2)}px</th>
				  {/each}
			  </tr>
				<tr>
					<th scope="row">&lt;h6&gt;</th>
					  {#each deviceSizes as size}
					  <th scope="col">{(1*fontSize + fontScale/100 * size).toFixed(2)}px</th>
					  {/each}
				  </tr>
					<tr>
						<th scope="row">&lt;small&gt;</th>
						  {#each deviceSizes as size}
						  <th scope="col">{(0.8*fontSize + fontScale/100 * size).toFixed(2)}px</th>
						  {/each}
					  </tr>
			
		</table>
  </Main>
</Story>

<Story name="Headings" 
{argTypes} args={{fontFamily, text:'a loooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong header'}} 
let:fontFamily let:text>
<Main class="container" style="font-family: {fontFamily};">
  <Heading1 id="h1">H1: {text}</Heading1>
  <Heading2 id="h2">H2: {text}</Heading2>
  <Heading3 id="h3">H3: {text}</Heading3>
  <Heading4 id="h4">H4: {text}</Heading4>
  <Heading5 id="h5">H5: {text}</Heading5>
  <Heading6 id="h6">H6: {text}</Heading6>
  
</Main>
</Story>

<Story name="Heading Group" 
{argTypes} args={{fontFamily, text:'a loooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong header'}} 
let:fontFamily let:text>
<Main class="container" style="font-family: {fontFamily};">
  <Hgroup>
  <Heading1>H1: {text}</Heading1>
  <HeadingSub>Sub-heading: {text} <time datetime="2000-01-01" >Jan 1, 2000</time></HeadingSub>
  <HeadingSub><Small>Small Sub-heading: {text} <time datetime="2000-01-01" >Jan 1, 2000</time></Small></HeadingSub>
  </Hgroup>
  
  Source: 
  https://adrianroselli.com/2020/08/be-wary-of-doc-subtitle.html
  https://www.tpgi.com/subheadings-subtitles-alternative-titles-and-taglines-in-html/
</Main>
</Story>

<Story name="P" 
{argTypes} args={{fontFamily}} 
let:fontFamily>
<Main class="container" style="font-family: {fontFamily};">
  <Hgroup>
  	<Heading1>Heading 1</Heading1>
  	<HeadingSub>Sub-heading</HeadingSub>
  </Hgroup>
  <P>{text}</P>
  <P>{text}</P>
  <Heading2>Heading 2</Heading2>
  <P>{text}</P>
  <P>{text}</P>
  <Heading3>Heading 3</Heading3>
  <P>{text}</P>
  <P>{text}</P>
  <Heading4>Heading 4</Heading4>
  <P>{text}</P>
  <P>{text}</P>
  <Heading5>Heading 5</Heading5>
  <P>{text}</P>
  <P>{text}</P>
  <Heading6>Heading 6</Heading6>
  <P>{text}</P>
  <P>{text}</P>
  
  Source:
  - Why 60ch, WCAG needs 80ch: https://meyerweb.com/eric/thoughts/2018/06/28/what-is-the-css-ch-unit/
</Main>
</Story>

<Story name="Inline text elements" 
{argTypes} args={{fontFamily, text:'text'}} 
let:fontFamily let:text>
<Main class="container" style="font-family: {fontFamily};">
  <P>{text} <a href="#main">link</a> <code>a</code> {text}</P>
  <P>{text} <abbr title="abbreviation">abbr</abbr> <code>abbr</code> {text}</P>
  <P>{text} <strong>bold</strong> <code>strong</code> <code>b</code> {text}</P>
  <P>{text} <em>italic</em> <code>em</code> <code>cite</code> <code>i</code> {text}</P>
  <P>{text} <del>deleted</del> <code>del</code> {text}</P>
  <P>{text} <ins>inserted</ins> <code>ins</code> {text}</P>
  <P>{text} <code>code</code> <code>code</code> {text}</P>
  <P>{text} <kbd>Ctrl + S</kbd> <code>kbd</code> {text}</P>
  <P>{text} <mark>highlighted</mark> <code>mark</code> {text}</P>
  <P>{text} <s>strikthrough</s> <code>s</code> {text}</P>
  <P>{text} <small>small</small> <code>small</code> {text}</P>
  <P>{text}<sub>sub</sub> <code>sub</code> {text}</P>
  <P>{text}<sup>sup</sup> <code>sup</code> {text}</P>
  <P>{text} <u>underline</u> <code>u</code> {text}</P>
  <P>{text} <var>variable</var> <code>var</code> {text}</P>
</Main>
</Story>

