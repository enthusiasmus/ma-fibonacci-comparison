var threadRecursive = require('threads_a_gogo').create().destroy();
var threadIterative = require('threads_a_gogo').create();
var threadMoivet = require('threads_a_gogo').create();

//get high resolution timestamp from the node process
var timestampStart = process.hrtime();

var nthFibonacci = 8000;

/**
 *
 * RECURSIV
 *
 **/
var k = 0;

function calcFibonacciRecursive(n) {
  console.log(k++);
  if (n <= 2) {
    return 1;
  } else {
    var temp1 = calcFibonacciRecursive(n - 1);
    var temp2 = calcFibonacciRecursive(n - 2);
    return temp1 + temp2;
  }
}

//evaluate the function into the workers thread context
/*threadRecursive.eval(calcFibonacciRecursive);

 //call the function with the expression to evaluate and the callback for the result
 threadRecursive.eval('calcFibonacciRecursive(40)', function(err, data) {
 console.log("RECURSIVE");
 console.log(data);

 var duration = process.hrtime(timestampStart);
 console.log(duration[0] + "sec " + duration[1] + "ns\n");
 threadRecursive.destroy();
 });*/

/**
 *
 * ITERATIV
 *
 **/

function calcFibonacciIterative(n) {
  var firstFN = 1;
  var secondFN = 1;
  var finalNumber = 1;
  for (var i = 3; i <= n; i++) {
    finalNumber = firstFN + secondFN;
    secondFN = firstFN;
    firstFN = finalNumber;
  }

  return finalNumber;
}

threadIterative.on("data", function (number) {
  console.log(number);
})

//evaluate the function into the workers thread context
threadIterative.eval(calcFibonacciIterative);

//call the function with the expression to evaluate and the callback for the result
threadIterative.eval('calcFibonacciIterative(' + nthFibonacci + ')', function (err, data) {
  console.log("ITERATIVE");
  console.log(data);

  var duration = process.hrtime(timestampStart);
  console.log(duration[0] + "sec " + duration[1] + "ns\n");
  this.destroy();
});

/**
 *
 * MOIVET
 *
 **/

function calcFibonacciMoivreBinet(n) {
  var firstFraction = 1 / Math.sqrt(5);
  var secondFraction = Math.pow((1 + Math.sqrt(5)) / 2, n);
  var thirdFraction = Math.pow((1 - Math.sqrt(5)) / 2, n);
  return Math.round(firstFraction * (secondFraction - thirdFraction));
}

//evaluate the function into the workers thread context
threadMoivet.eval(calcFibonacciMoivreBinet);

//call the function with the expression to evaluate and the callback for the result
threadMoivet.eval('calcFibonacciMoivreBinet(' + nthFibonacci + ')', function (err, data) {
  console.log("MOIVET");
  console.log(data);

  var duration = process.hrtime(timestampStart);
  console.log(duration[0] + "sec " + duration[1] + "ns\n");
  this.destroy();
});


/*
for (var k = 0; k < 5; k++) {
  for (var i = 1; i < 1000000; i *= 10) {
    console.log(calcFibonacciIterative(i), i);
    console.log(calcFibonacciMoivreBinet(i), i);
  }
}*/

console.log(calcFibonacciRecursive(10));