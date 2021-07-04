const input = 1476; // after this, result is infinity

// Naive Recursive
const naiveNthFib = (n, limit = true) => {
  // prevents large numbers of n
  if (n > 30 && limit) {
    return `The input is too large for this naive recursion! Try something less than 30!`;
  }
  // base case
  if (n === 0 || n === 1) return n;
  return naiveNthFib(n - 1) + naiveNthFib(n - 2);
};

// Memoized Recursive
const recursiveNthFib = n => {
  if (n > 1400) {
    return `The input is too large for the recursion! Try something less than 1400!`;
  }
  // initialize a cache array with a length of n
  const cache = Array(n);

  // define a recursive helper function
  const recursiveHelper = n => {
    // try to access the answer from the cache
    let answer = cache[n];
    const recurse = n => {
      // base case
      if (n === 0 || n === 1) {
        return n;
      }
      return recursiveHelper(n - 1) + recursiveHelper(n - 2);
    };
    if (!answer) {
      answer = recurse(n);
      // save this answer in our cache;
      cache[n] = answer;
    }

    return answer;
  };
  // make sure to call recursiveHelper
  return recursiveHelper(n);
};

// Iterative Memoized
const nthFibIterative = n => {
  const cache = Array(n);
  // hard code the first two fib numbers into our cache
  cache[0] = 0;
  cache[1] = 1;

  for (let i = 2; i <= n; i++) {
    cache[i] = cache[i - 1] + cache[i - 2];
  }
  return cache[n];
};

// time function, with one to one parameters
const timedRun = (func, n, name = `Function call`, cond = true) => {
  // check if func is given and a typeof function
  if (!func || typeof func !== 'function') {
    return console.log(`a valid function input is required!`);
  }

  // check if n is given and a typeof number
  if (!n || typeof n !== 'number') {
    return console.log(`a valid number input is required!`);
  }

  const startTime = Date.now();
  const result = func(n, cond);
  const endTime = Date.now();
  const diffTime = endTime - startTime;

  console.log(`------------------------------`);
  console.log(`${name} with n = ${n}`);
  console.log(`------------------------------`);
  console.log(`Time: ${(diffTime / 1000).toFixed(4)}`);
  console.log(`Answer: ${result}`);
  console.log(`------------------------------`);
};

// time function, with an array of parameters, destructured
const timedArrayRun = ([func, n, name = `Function call`, cond = true]) => {
  // check if func is given and a typeof function
  if (!func || typeof func !== 'function') {
    return console.log(`a valid function input is required!`);
  }

  // check if n is given and a typeof number
  if (!n || typeof n !== 'number') {
    return console.log(`a valid number input is required!`);
  }

  const startTime = Date.now();
  const result = func(n, cond);
  const endTime = Date.now();
  const diffTime = endTime - startTime;

  console.log(`------------------------------`);
  console.log(`${name} with n = ${n}`);
  console.log(`------------------------------`);
  console.log(`Time: ${(diffTime / 1000).toFixed(4)}`);
  console.log(`Answer: ${result}`);
  console.log(`------------------------------`);
};

// time function, with an object destructured
const timedObjectRun = ({ func, n, name, cond }) => {
  if (!name) name = 'Function call';
  // check if func is given and a typeof function
  if (!func || typeof func !== 'function') {
    return console.log(`a valid function input is required!`);
  }

  // check if n is given and a typeof number
  if (!n || typeof n !== 'number') {
    return console.log(`a valid number input is required!`);
  }

  const startTime = Date.now();
  const result = func(n, cond);
  const endTime = Date.now();
  const diffTime = endTime - startTime;

  console.log(`------------------------------`);
  console.log(`${name} with n = ${n}`);
  console.log(`------------------------------`);
  console.log(`Time: ${(diffTime / 1000).toFixed(4)}`);
  console.log(`Answer: ${result}`);
  console.log(`------------------------------`);
};

//using one to one
// you can pass in a condition which can
timedRun(naiveNthFib, input, 'Naive Recursive');
timedRun(recursiveNthFib, input, 'Recursive Memoized');
timedRun(nthFibIterative, input, 'Iterative Memoized');

// using named parameters into an array
timedArrayRun([naiveNthFib, input, 'Naive Recursive']);
timedArrayRun([recursiveNthFib, input, 'Recursive Memoized']);
timedArrayRun([nthFibIterative, input, 'Iterative Memoized']);

//using named parameters in an object
timedObjectRun({ func: naiveNthFib, n: input, name: 'Naive Recursive' });
timedObjectRun({ func: recursiveNthFib, n: input, name: 'Recursive Memoized' });
timedObjectRun({ func: nthFibIterative, n: input, name: 'Iterative Memoized' });
