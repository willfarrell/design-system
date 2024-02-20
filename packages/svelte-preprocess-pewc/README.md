# pewc svelte preprocess

Does not preprocess any content, just scans content for elements and use of `is` to allow smarter bundling.

## Options

- `file` (default: `./build/pewc.json`): Where to save the json export

## Implementation

```javascript
import pewcSveltePreprocess from '@pewc/svelte-preprocess'
import preprocess from 'svelte-preprocess'

export default {
  preprocess: [
	pewcSveltePreprocess(),
	preprocess({...})
  ],
}
```
