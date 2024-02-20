// https://www.npmjs.com/package/@github/hotkey
import { install } from '@github/hotkey'

const d = document

/*
https://buffer.com/library/keyboard-shortcuts-ultimate-list/

Search focus: Ctrl/Command + k or /
Print: Ctrl/Command + p
Go to ____: g then _
Back to top: Command + up

test disable when inputs focused
*/

// Install all the hotkeys on the page
// d.querySelectorAll('[accesskey]') // always ctrl + option + key, no js needed
for (const el of d.querySelectorAll('[aria-keyshortcuts]')) {
  // el.ariaKeyShortcuts not supported in Firefox
  install(el, el.getAttribute('aria-keyshortcuts'))
}
