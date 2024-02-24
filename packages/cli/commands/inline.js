import { createHash } from 'node:crypto'
import { readFileSync, writeFileSync } from 'node:fs'
import { join as pathJoin, basename, extname } from 'node:path'
import { getModuleDir, walkDirSync, saveFileSync } from '../lib/fs.js'

// Subresource Integrity
const algo = 'sha256'
const methods = {
  css: {
    tag: 'style',
    regexp: (filename) =>
      new RegExp(
        `<link[^>]*?href="?[^>]*?${filename.replace(
          '.',
          '.'
        )}\??[^>]*"?[^>]*?/?>`
      ),
    replace: (integrity, content) =>
      `<style integrity="${algo}-${integrity}">${content}</style>`
  },
  js: {
    tag: 'script',
    regexp: (filename) =>
      new RegExp(
        `<script[^>]*?src="?[^>]*?${filename.replace(
          '.',
          '.'
        )}\??[^>]*"?[^>]*?/?>`
      ),
    // TODO add in `type=module`, `defer` detection
    replace: (integrity, content) =>
      `<script integrity="${algo}-${integrity}">${replaceContent}</script>`
  },
  csp: {
    regexp: (tag) =>
      new RegExp(
        `<meta http-equiv="content-security-policy"[^>]*?${tag}-src[^>]*?/?>`
      )
  }
}
const command = (input, dir, options) => {
  const replaceContent = readFileSync(input)
  const integrity = createHash(algo.toUpperCase())
    .update(replaceContent)
    .digest('hex')

  const filename = basename(input)
  const ext = extname(filename).substring(1)
  let elementRegExp
  let replaceString
  if (ext === '.css') {
    elementRegExp = new RegExp(
      `<link[^>]*?href="?[^>]*?app\.css\??[^>]*"?[^>]*?/?>`
    )
    replaceString = `<style integrity="${algo}-${integrity}">${replaceContent}</style>`
  } /* else if (ext === '.js') {
    elementRegExp = new RegExp(
      `<script[^>]*?src="?[^>]*?${filename}\??[^>]*"?[^>]*?/?>`
    )
    // TODO add in `type=module`, `defer` detection
    replaceString = `<script integrity="${algo}-${integrity}">${replaceContent}</script>`
  } */ else {
    console.error('Unsipported file extention', ext)
    return
  }

  if (options.debug) {
    console.log(input, `${algo}-${integrity}`)
  }

  const sourceDir = pathJoin(process.cwd(), dir)
  for (const filePath of walkDirSync(sourceDir, '.html')) {
    if (options.debug) {
      console.log('Update', filePath)
    }
    const content = readFileSync(filePath).toString()
    writeFileSync(
      filePath,
      content.replace(
        methods[ext].regexp(filename),
        methods[ext].replace(integrity, replaceContent)
      )
    )
    // TODO update <meta http-equiv="content-security-policy" content="default-src 'none'; frame-src 'self'; worker-src 'self'; img-src 'self'; manifest-src 'self'; script-src 'self'; style-src 'self'; base-uri 'none'; form-action 'self'; report-to csp; upgrade-insecure-requests">
  }
  console.log('Done!')
}

export default command
