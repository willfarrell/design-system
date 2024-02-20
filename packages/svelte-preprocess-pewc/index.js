import { writeFileSync } from 'node:fs'
const preprocessPEWC = (options = {}) => {
  options.file ??= './build/pewc.json'
  const tags = {}
  const pewc = {}

  const tagRegExp = /<([a-z]+)[ >]/g
  const pewcRegExp = /is="?([a-z]+-[a-z]+)"?/g
  const markup = ({ content, filename }) => {
    if (process.env.NODE_ENV === 'production') {
      let match
      while ((match = tagRegExp.exec(content))) {
        tags[match[1]] ??= 0
        tags[match[1]] += 1
      }
      while ((match = pewcRegExp.exec(content))) {
        pewc[match[1]] ??= 0
        pewc[match[1]] += 1
      }
    }

    return { code: content }
  }

  if (process.env.NODE_ENV === 'production') {
    const exitHandler = () => {
      writeFileSync(options.file, JSON.stringify({ tags, pewc }))
      process.exit()
    }
    process.on('exit', exitHandler)
    process.on('SIGINT', exitHandler)
    process.on('uncaughtException', exitHandler)
  }
  return { markup }
}
export default preprocessPEWC
