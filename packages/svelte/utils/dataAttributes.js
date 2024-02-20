export default (props) => {
  const data = {}
  for (const prop in props) {
    if (prop.substring(0, 5) !== 'data-') continue
    data[prop] = props[prop]
  }
  return data
}
