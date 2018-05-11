const input = 1476;

/* Naive Recursive */
function naiveNthFib(n) {
  // base case
  if (n === 0 || n === 1) {
    return n;
  }
  return naiveNthFib(n - 1) + naiveNthFib(n - 2);
}

/* Recursive Memo-ized */
function recursiveNthFib(n) {
  // initialize a cache array with a length of n
  const cache = Array(n);

  // define a recursive helper function
  function recursiveHelper(n) {
    // try to access the answer from the cache
    let answer = cache[n];

    if (!answer) {
      answer = recurse(n);
      // save this answer in our cache
      cache[n] = answer;
    }

    function recurse(n) {
      // base case
      if (n === 0 || n === 1) {
        return n;
      }
      return recursiveHelper(n - 1) + recursiveHelper(n - 2);
    }

    return answer;
  }
  // don't forget to call the recursiveHelper
  return recursiveHelper(n);
}

/* Iterative Memo-ized */
function nthFibIterative(n) {
  const cache = Array(n);
  // hard code the first two fib numbers into our cache
  cache[0] = 0;
  cache[1] = 1;

  for (let i = 2; i <= n; i++) {
    cache[i] = cache[i - 1] + cache[i - 2];
  }

  return cache[n];
}

function timedRun(name, func, n) {
  const startTime = Date.now();
  const result = func(n);
  const endTime = Date.now();
  const diffTime = endTime - startTime;

  console.log(name);
  console.log(`Time: ${(diffTime / 1000).toFixed(4)}`);
  console.log(`Answer: ${result}`);
  console.log();
}

// timedRun('Naive Recursive', naiveNthFib, input); // slowest
// timedRun('Recursive Memo-ized', recursiveNthFib, input); // second fastest
timedRun('Iterative Memo-ized', nthFibIterative, input); // fastest
