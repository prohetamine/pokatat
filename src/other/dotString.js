export default (string, max) => {
  if (string.length > max) {
    return string.slice(0,-((string.length - max)+3))+'...'
  }
  return string
}
