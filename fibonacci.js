// function naiveNthFib(n) {
//   if (n === 0 || n === 1) {
//     return n;
//   }
//   return naiveNthFib(n - 1) + naiveNthFib(n - 2);
// }

/* 
  Memoized Recursive Strategy 
  The idea: we'll use the same naive recursive logic but augment it 
  with the ability to save work we've already done. This doesn't actually
  improve the theoretical runtime complexity over the naive recursive 
  approach, but it does significantly improve the actual running time.

  1. Initialize a cache (can be an object or an array)
  2. Write a helper function that checks the cache for the answer we're looking for
  3. If the answer is not found, fall back on our naive logic
  4. The naive helper needs to recursively call the memoized version, not itself
  5. Return the value that the memoized function returns
*/

function nthFib(n) {
  let cache = Array(n);

  function nthFibMemo(n) {
    let value = cache[n];

    if (!value) {
      value = naiveNthFib(n);
      cache[n] = value;
    }
    return value;
  }

  function naiveNthFib(n) {
    if (n=== 0 || n === 1) {
      return n;
    }
    return nthFibMemo(n - 1) + nthFibMemo(n - 2);
  } 

  return nthFibMemo(n);
}


