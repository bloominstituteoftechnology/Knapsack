/* Native Recursive */

function naiveNthFib(n) {
  // base case
  if (n === 0 || n === 1) {
    return n;
  }
  return naiveNthFib(n - 1) + naiveNthFib(n - 2);
}
// console.log(naiveNthFib(35));

/* Memoization Recursive */
function recursiveNthFib(n) {
  // initialization a cache array with a lenght of n
  const cache = Array(n); // cache.length returns n

  // define a recursive helper function
  function recursiveHelper(n) {
    // try to access the answer from the cache
    let answer = cache(n);

    if (!answer) {
      answer = naiveNthFib(n);
      // save this answer in our cache
      cache(n) = answer;
    }

    return answer;
  }
  // don't foget to call the recursiveHelper
}
