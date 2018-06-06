// const naiveNthFib = n => {
//   if (n === 0 || n === 1) {
//     return n;
//   }
//   return naiveNthFib(n - 1) + naiveNthFib(n - 2);
// };

// Memorized Recursive Strategy

/* The idead is to use the same naive recursive logic but augment it
with the ability to save work we've already done. This doesn't actually
imporve the theoretical runtime complexity over the naive recursive approach,
but it does significantly improve the actual running time */

const nthFib = n => {
  let cache = Array(n);

  function nthFibMemo(n) {
    let value = cache[n];

    if (!value) {
      value = naiveNthFib(n);
      cache[n] = value;
    }
    return value;
  }

  const naiveNthFib = n => {
    if (n === 0 || n === 1) {
      return n;
    }
    return naiveNthFib(n - 1) + naiveNthFib(n - 2);
  };
  return nthFibMemo(n);
};

// Bottom Up Iterative

/* The idea: generally follow the same logic as the memoized recursive approach.
We still make use of a cache to save prior data, In this case though, we seed the
cache with some initial values and then loop up to our input, along the way
populating cache with the answer for the current iteration.

1. Initialize a cache (again, can be an object or array)
2. Sed the cache with initial values
*/
function nthFibIterative(n) {
  const cache = Array(n);
  cache[0] = 0;
  cache[1] = 1;

  for (let i = 2; i <= n; i++) {
    cache[i] = cache[i - 1] + cache[i - 2];
  }

  return cache[n];
}

console.log(naiveNthFib(1000));
