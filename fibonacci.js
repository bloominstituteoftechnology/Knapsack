// exponential time
const nthFib = n => {
  if (n === 0 || n === 1) return n;
  return nthFib(n - 1) + nthFib(n - 2);
}


const nthFibMemoized = n => {
  let cache = Array(n + 1);

  const nthFibMemo = n => {
    let value = cache[n];

    if (!value) {
      value = naiveNthFib(n);
      cache[n] = value;
    }

    return value;
  }

  const naiveNthFib = n => {
    if (n === 0 || n === 1) return n;
    return nthFibMemo(n - 1) + nthFibMemo(n - 2);
  }

  return nthFibMemo(n);
}


const nthFibIterative = n => {
  let cache = Array(n);
  cache[0] = 0;
  cache[1] = 1;

  for (let i = 2; i <= n; i++) {
    cache[i] = cache[i - 1] + cache[i - 2];
  }

  return cache[n];
}

/* END OF FIB METHODS */

console.log(nthFib(5))
console.log(nthFibMemoized(10))
console.log(nthFibIterative(50))