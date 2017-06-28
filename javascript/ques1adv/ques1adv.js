document.getElementById('submit').addEventListener('click' , getData);
var isPrime = (function(){
  var primes = {};
  return function(value){
    if (primes[value] != null) {
      return primes[value];
    }
    var prime_flag = true
    for (var i = 2; i <= value/2; i++) {
      if (value % i == 0) {
        prime_flag = false;
        break;
      }
    }
    return primes[value] = prime_flag;
  };
}());
function getData() {
  var number = Number(document.getElementById('inp1').value);
  document.getElementById('inp1').value = '';
  if (isPrime(number)) {
    alert("The entered number is a prime")
  } else {
    alert("The entered number is not a prime")
  }
}
