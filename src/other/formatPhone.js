export default value => {
  const _date = '+' + (
    e => e
      ? e.join('')
      : ''
  )(value.replace(/[+ \(\)-]/gi, '').match(/\d{0,11}/))

  let date = '+'

  for (let i = 1; i < 12; i++) {
    if (_date[i] !== undefined) {
      date += _date[i]
    }
  }

  return date
}
