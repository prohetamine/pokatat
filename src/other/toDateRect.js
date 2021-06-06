export default value => {
  const _date = value.split('')

  let date = '';

  _date[0] && (date += _date[0])
  _date[1] && (date += _date[1])

  if (_date.length >= 2) {
    date += '/'
  }

  _date[2] && (date += _date[2])
  _date[3] && (date += _date[3])

  if (_date.length >= 4) {
    date += '/'
  }

  _date[4] && (date += _date[4])
  _date[5] && (date += _date[5])
  _date[6] && (date += _date[6])
  _date[7] && (date += _date[7])

  return date
}
