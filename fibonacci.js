function naiveNthFib(n) {
  if (n === 0 || n === 1) {
    return n;
  }

  return naiveNthFib(n - 1) + naiveNthFib(n - 2);
}
// Momoized Recursive Strategy
function nthFib(n) {
  const cache = Array(n);
  function nthFibMemo(n) {
    let value = cache[n];
    if (!value) {
      value = naiveNthFib(n);
      cache[n] = value;
    }
    return value;
  }
  function naiveNthFib(n) {
    if (n === 0 || n === 1) {
      return n;
    }
    return nthFibMemo(n - 1) + nthFibMemo(n - 2);
  }
  return nthFibMemo;
};

// Bottom Up iterative
function nthFibIterative(n) {
  const cache = Array(n);
  cache[0] = 0;
  cache[1] = 1;
  for (let i = 2; i <= n; i++) {
    cache[i] = cache[i - 1] + cache[i - 2];
  }
  return cache[n];
}