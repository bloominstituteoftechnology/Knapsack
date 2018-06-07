/* 
  A child is running up a staircase that has `n` steps.
  The child can hop either 1, 2, or 3 steps at a time. 
  Write a function that counts the number of possible ways 
    in which the child can climb the staircase.
*/

const naiveStairs = n => {
  if (n < 0) return 0;
  if (n === 0) return 1;

  return naiveStairs(n - 1) + 
         naiveStairs(n - 2) + 
         naiveStairs(n - 3);
}

/**************************************************************************/

const memoizedStairs = (n, cache) => {
  if (n < 0) return 0;
  if (n === 0) return 1;
  if (cache[n] > 1) return cache[n];

  cache[n] = memoizedStairs(n - 1, cache) +
             memoizedStairs(n - 2, cache) +
             memoizedStairs(n - 3, cache)
  
  return cache[n];
}

console.log(memoizedStairs(10, Array(11)))