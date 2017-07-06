document.getElementById('submit').addEventListener('click' , getData)
function getData() {
  const number = parseInt(document.getElementById('input').value);
  if (number) {
    myFunction(number);
  } else {
    document.getElementById('output').innerHTML = "Enter a number "
  }
}
function myFunction(number) {
  const array = [];
  while (number > 0) {
    const digit = number % 10;
    array.unshift(digit);
    number = Math.floor(number / 10);
  }
  let b , sum = 0;
  for (let i = 0; i < array.length; i++) {
    b = 0;
    for (let j = i + 1; j <= i + array[i]; j++) {
      if (j === array.length) {
        i = j;
        break;
      }
      b *= 10;
      b += array[j];
      i = j - 1;
    }
    sum += b;
  }
  const x = sum % 2 ? 'odd' : 'even';
  document.getElementById('output').innerHTML = `The sum of decoded Value is an ${x} number`
  document.getElementById('input').value = '';
}
