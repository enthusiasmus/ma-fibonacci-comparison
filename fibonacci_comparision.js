var BigNumber = require('bignumber.js');
BigNumber.config({ ERRORS: false });

var fibonacciCalculator = {

  /**
   *
   * RECURSIVE
   *
   * ATTENTION: Because the complexity of this algorithm
   * is O(2^n) it isn't used for this exercise
   *
   **/

  calcFibonacciRecursive: function (n) {
    if (n <= 2) {
      return 1;
    } else {
      var temp1 = fibonacciCalculator.calcFibonacciRecursive(n - 1);
      var temp2 = fibonacciCalculator.calcFibonacciRecursive(n - 2);
      return temp1 + temp2;
    }
  },

  /**
   *
   * RECURSIVE WITH MEMOIZATION (!!!)
   *
   * Script has to be started with:
   * nodejs --stack_size=102400 script.js
   * stack_size value is set in bytes, so
   * the stack size will be increased to
   * 100 MBytes.
   **/

  memo: [0, 1],
  calcFibonacciRecursiveWithMemoization: function (n) {
    var result = fibonacciCalculator.memo[n];
    if (typeof result !== 'number') {
      result = fibonacciCalculator.calcFibonacciRecursiveWithMemoization(n - 1) + fibonacciCalculator.calcFibonacciRecursiveWithMemoization(n - 2);
      fibonacciCalculator.memo[n] = result;
    }
    return result;
  },

  /**
   *
   * ITERATIV
   *
   **/

  calcFibonacciIterative: function (n) {
    var firstFN = new BigNumber(1);
    var secondFN = new BigNumber(1);
    var finalNumber = new BigNumber(1);
    for (var i = 3; i <= n; i++) {
      finalNumber = firstFN.add(secondFN);
      secondFN = firstFN;
      firstFN = finalNumber;
    }

    return finalNumber.toFixed(0).toString();
  },

  /**
   *
   * MOIVET
   *
   * TODO: Correct precision for example 150th fibonacci
   * number should be 9969216677189303386214405760200
   **/

  calcFibonacciMoivreBinet: function (n) {
    var firstFraction = new BigNumber((1 / Math.sqrt(5)));
    var secondFraction = ((1 + Math.sqrt(5)) / 2);
    secondFraction = new BigNumber(secondFraction).pow(n);
    var thirdFraction = ((1 - Math.sqrt(5)) / 2);
    thirdFraction = new BigNumber(thirdFraction).pow(n);
    return firstFraction.mul((secondFraction.sub(thirdFraction))).toFixed(0).toString();
  },

  /**
   *
   * MATRIX
   *
   **/

  calcFibonacciMatrix: function (n) {
    m = [[1, 0], [0, 1]];
    odd = [[1, 1], [1, 0]];
    var matrix = function (a, b) {
      /*
       Matrix multiplication
       Strassen Algorithm
       Only works with 2x2 matrices.
       */
      c = [[0, 0], [0, 0]];
      c[0][0] = (a[0][0] * b[0][0]) + (a[0][1] * b[1][0]);
      c[0][1] = (a[0][0] * b[0][1]) + (a[0][1] * b[1][1]);
      c[1][0] = (a[1][0] * b[0][0]) + (a[1][1] * b[1][0]);
      c[1][1] = (a[1][0] * b[0][1]) + (a[1][1] * b[1][1]);
      m1 = (a[0][0] + a[1][1]) * (b[0][0] + b[1][1]);
      m2 = (a[1][0] + a[1][1]) * b[0][0];
      m3 = a[0][0] * (b[0][1] - b[1][1]);
      m4 = a[1][1] * (b[1][0] - b[0][0]);
      m5 = (a[0][0] + a[0][1]) * b[1][1];
      m6 = (a[1][0] - a[0][0]) * (b[0][0] + b[0][1]);
      m7 = (a[0][1] - a[1][1]) * (b[1][0] + b[1][1]);
      c[0][0] = m1 + m4 - m5 + m7;
      c[0][1] = m3 + m5;
      c[1][0] = m2 + m4;
      c[1][1] = m1 - m2 + m3 + m6;
      return c;
    };

    var fib = function (n) {
      mat(n - 1);
      return m[0][0];
    };
    var mat = function (n) {
      if (n > 1) {
        mat(n / 2);
        m = matrix(m, m);
      }
      m = (n % 2 < 1) ? m : matrix(m, odd);
    };
    return fib(n);
  },
  measure: function (calcFunction, start, end, runs) {
    var measurements = [];
    for (var j = start; j <= end; j *= 10) {
      var resultsRuns = [];
      for (var i = 0; i < runs; i++) {
        var timeStart = process.hrtime();
        var number = calcFunction(j);
        //console.log(number);
        var duration = process.hrtime(timeStart);
        var durationNanoSeconds = duration[0] * Math.pow(10, 9) + duration[1];
        resultsRuns.push(durationNanoSeconds);
      }

      var average = Math.ceil(Math.average(resultsRuns));
      measurements.push(average);
    }

    return measurements;
  },
  printMeasurementsIterative: function () {
    var measurements = this.measure(this.calcFibonacciIterative, Math.pow(10, 2), Math.pow(10, 6), 5);
    console.log(measurements);
  },
  printMeasurementsMoivet: function () {
    var measurements = this.measure(this.calcFibonacciMoivreBinet, Math.pow(10, 2), Math.pow(10, 6), 5);
    console.log(measurements);
  },
  printMeasurementsMatrix: function () {
    var measurements = this.measure(this.calcFibonacciMatrix, Math.pow(10, 2), Math.pow(10, 6), 5);
    console.log(measurements);
  },
  printMeasurmentsRecursionWithMemoization: function () {
    try {
      this.memo = [0, 1];
      var measurements = this.measure(
        this.calcFibonacciRecursiveWithMemoization,
        Math.pow(10, 2),
        Math.pow(10, 5),
        1
      );
    }
    catch (e) {
      console.log(fibonacciCalculator.memo.length);
      console.log(e);
    }
    console.log(measurements);
  }
};

Math.average = function (array) {
  var average = 0;
  for (var i = 0; i < array.length; i++) {
    average += array[i];
  }
  return average / array.length;
};

//fibonacciCalculator.printMeasurementsIterative();
/*fibonacciCalculator.printMeasurementsMoivet();

 fibonacciCalculator.printMeasurementsMatrix();
 fibonacciCalculator.printMeasurmentsRecursionWithMemoization();*/

fibonacciCalculator.printMeasurmentsRecursionWithMemoization();