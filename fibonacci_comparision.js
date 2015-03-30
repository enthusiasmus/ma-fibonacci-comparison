function calcFibonacciRecursive(n) {
  if (n <= 2) {
    return 1;
  } else {
    return calcFibonacciRecursive(n - 1) + calcFibonacciRecursive(n - 2);
  }
}

function calcFibonacciMoivreBinet(n) {
  var firstFraction = 1 / Math.sqrt(5);
  var secondFraction = Math.pow((1 + Math.sqrt(5)) / 2, n);
  var thirdFraction = Math.pow((1 - Math.sqrt(5)) / 2, n);
  return Math.round(firstFraction * (secondFraction - thirdFraction));
}

function calcFibonacciIterative(n) {
  var firstFN = 1;
  var secondFN = 1;
  var finalNumber;

  for (var i = 3; i <= n; i++) {
    var finalNumber = firstFN + secondFN;
    secondFN = firstFN;
    firstFN = finalNumber;
  }

  return finalNumber;
}

for (var i = 100; i <= 1000000; i = i * 10) {
  console.log(calcFibonacciMoivreBinet(i));
}