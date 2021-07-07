/*
  A child is running up a staircase that has `n` steps.
  The child can hop either 1, 2, or 3 steps at a time. Write a function 
  that counts the number of possible ways in which the child can climb the
  staircase.
*/

function naiveStairs(n) {
    // base case 1
    if (n < 0) return 0;
    // base case 2
    if (n === 0) return 1;
    else {
      return naiveStairs(n-1) + naiveStairs(n-2) + naiveStairs(n-3);
    }
  }
  
  function memoizedStairs(n) {
    const cache = Array(n + 1);
  
    function memoizedHelper(n) {
      let value = cache[n];
  
      if (!value) {
        value = naiveStairs(n);
        cache[n] = value;
      }
      return value;
    }
  
    function naiveStairs(n) {
      if (n < 0) return 0;
      if (n === 0) return 1;
      else {
        return memoizedHelper(n-1) + memoizedHelper(n-2) + memoizedHelper(n-3);
      }
    }
  
    return memoizedHelper(n);
  }
  
  // function memoizedStairs(n, cache) {
  //   if (n < 0) return 0;
  //   if (n === 0) return 1;
  //   if (cache[n] > 1) return cache[n];
  //   else {
  //     cache[n] = memoizedStairs(n-1, cache) +
  //                memoizedStairs(n-2, cache) +
  //                memoizedStairs(n-3, cache);
  //   }
  //   return cache[n];
  // }
  
  console.log(naiveStairs(10));
  console.log(memoizedStairs(100));
  // console.log(memoizedStairs(100, Array(101)));