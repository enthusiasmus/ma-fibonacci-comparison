var bignum = require("bignum");
var threads = require("threads_a_gogo");

function calcFibonacciRecursive(n) {
  if (n <= 2) {
    return 1;
  } else {
    var temp1 = bignum(calcFibonacciRecursive(n - 1));
    var temp2 = bignum(calcFibonacciRecursive(n - 2));
    return temp1.add(temp2);
  }
}

function calcFibonacciIterative(n) {
  var firstFN = bignum(1);
  var secondFN = bignum(1);
  var finalNumber = bignum(1)

  for (var i = 3; i <= n; i++) {
    var finalNumber = firstFN.add(secondFN);
    secondFN = firstFN;
    firstFN = finalNumber;
  }

  return finalNumber;
}

var start = 1;
var end = 40;

//for (var i = start; i <= end; i++) {
 // console.log(calcFibonacciRecursive(40).toString());
//}

//for (var i = start; i <= end; i++) {
 // console.log(calcFibonacciIterative(40).toString());
//}