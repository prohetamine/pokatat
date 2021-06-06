export default value =>
  (e =>
    e
      ? e.join('')
      : ''
  )(
    value.match(/[\d!@#$%^&*\\(\\)"'\\{\\}\\[\]\-\\+№%:,.;=_ A-Za-zА-Яа-яёЁ<>\\\\/]/gi)
  )
