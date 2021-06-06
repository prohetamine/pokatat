export default value => {
  const _date = value.split('')

  let date = ''

  if (_date.length > 0) {
    if (_date[0].match(/[0123]/gi)) {
      date += _date[0]
    } else {
      date += '3'
    }
  }

  if (_date.length > 1) {
    if (_date[1].match(/\d/gi)) {
      if (_date[0] === '3') {
        if (_date[1].match(/[01]/gi)) {
          date += _date[1]
        } else {
          date += '1'
        }
      } else {
        if (_date[0] === '0') {
          if (_date[1].match(/[123456789]/gi)) {
            date += _date[1]
          } else {
            date += '1'
          }
        } else {
          date += _date[1]
        }
      }
    }
  }

  if (_date.length > 2) {
    if (_date[2].match(/[01]/gi)) {
      date += _date[2]
    } else {
      date += '1'
    }
  }

  if (_date.length > 3) {
    if (_date[3].match(/\d/gi)) {
      if (_date[2] === '1') {
        if (_date[3].match(/[012]/gi)) {
          date += _date[3]
        } else {
          date += '2'
        }
      } else {
        if (_date[0] === '0') {
          if (_date[3].match(/[123456789]/gi)) {
            date += _date[3]
          } else {
            date += 1
          }
        } else {
          date += _date[3]
        }
      }
    }
  }

  if (_date[3] === '2') {
    if (parseInt(_date[0] + _date[1]) > 29) {
      let _date_ = date.split('')
      _date_[0] = '2'
      _date_[1] = '9'

      date = _date_.join('')
    }
  }

  if (_date[3] === '4' || _date[3] === '6' || _date[3] === '9' || _date[3] === '11') {
    if (parseInt(_date[0] + _date[1]) > 30) {
      let _date_ = date.split('')
      _date_[0] = '3'
      _date_[1] = '0'

      date = _date_.join('')
    }
  }

  if (_date.length > 4) {
    if (_date[4].match(/[12]/gi)) {
      date += _date[4]
    } else {
      date += '1'
    }
  }

  if (_date.length > 5) {
    if (_date[4] === '1') {
      if (_date[5] === '9') {
        date += _date[5]
      } else {
        date += '9'
      }
    } else {
      date += '0'
    }
  }

  if (_date.length > 6) {
    if (_date[5] === '9') {
      if (_date[6].match(/\d/gi)) {
        date += _date[6]
      } else {
        date += '9'
      }
    }

    if (_date[5] === '0') {
      if (_date[6].match(/[01]/gi)) {
        date += _date[6]
      } else {
        date += '0'
      }
    }
  }

  if (_date.length > 7) {
    if (_date[7].match(/\d/gi)) {
      date += _date[7]
    } else {
      date += '0'
    }
  }

  return date
}
