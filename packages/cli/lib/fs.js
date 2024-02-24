import {
  readdirSync,
  existsSync,
  mkdirSync,
  readFileSync,
  writeFileSync
} from 'node:fs'
import { join as pathJoin, dirname, extname } from 'node:path'
import { createRequire } from 'node:module'

// Source: https://stackoverflow.com/questions/10111163/how-can-i-get-the-path-of-a-module-i-have-loaded-via-require-that-is-not-mine
export const getModuleDir = (moduleEntry) => {
  const packageName = moduleEntry.includes('/')
    ? moduleEntry.startsWith('@')
      ? moduleEntry.split('/').slice(0, 2).join('/')
      : moduleEntry.split('/')[0]
    : moduleEntry
  const require = createRequire(import.meta.url)
  const lookupPaths = require.resolve
    .paths(moduleEntry)
    .map((p) => pathJoin(p, packageName))
  return lookupPaths.find((p) => existsSync(p))
}

function* walkDirSyncGenerator(dir, ext) {
  const files = readdirSync(dir, { withFileTypes: true })
  for (const file of files) {
    if (file.isDirectory()) {
      yield* walkDirSyncGenerator(pathJoin(dir, file.name), ext)
    } else if (!ext || extname(file.name) === ext) {
      yield pathJoin(dir, file.name)
    }
  }
}
export const walkDirSync = walkDirSyncGenerator

export const saveFileSync = (path, data) => {
  const dir = dirname(path)
  if (!existsSync(dir)) {
    mkdirSync(dir)
  }
  writeFileSync(path, data)
}
