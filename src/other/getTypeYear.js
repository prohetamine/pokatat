export default (age, typeYears) => {
  let txt
    , count = age % 100;
  if (count >= 5 && count <= 20) {
    txt = typeYears[0]
  } else {
    count = count % 10;
    if (count === 1) {
      txt = typeYears[1]
    } else if (count >= 2 && count <= 4) {
      txt = typeYears[1]
    } else {
      txt = typeYears[0]
    }
  }
  return txt;
}
