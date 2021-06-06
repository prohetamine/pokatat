export default value =>
  value.length > 1 && value.match(/[^\d!@#$%^&*\\(\\)"'\\{\\}\\[\]\-\\+№%:,.;=_ A-Za-zА-Яа-яёЁ<>\\\\/]/gi) === null
