export default value => {
  const _date = value.split('')

  let date = '+';

  _date[1] && (date += _date[1])

  if (_date.length > 1) {
    date += ' ('
  }

  _date[2] && (date += _date[2])
  _date[3] && (date += _date[3])
  _date[4] && (date += _date[4])

  if (_date.length > 4) {
    date += ') '
  }

  _date[5] && (date += _date[5])
  _date[6] && (date += _date[6])
  _date[7] && (date += _date[7])

  if (_date.length > 7) {
    date += ' '
  }

  _date[8] && (date += _date[8])
  _date[9] && (date += _date[9])

  if (_date.length > 9) {
    date += '-'
  }

  _date[10] && (date += _date[10])
  _date[11] && (date += _date[11])

  return date
}
