// const nthFib = n => {
//   if (n === 0 || n === 1) return n;
//   return nthFib(n - 1) + nthFib(n - 2);
// }

//////////////////////////////////////////////////////////////////////////////

const nthFib = n => {
  let cache = Array(n);

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
  } // n === 0 || n === 1 ? n : nthFibMemo(n - 1) + nthFibMemo(n - 2);

  return nthFibMemo(n);
}

// console.log(nthFib(10))

//////////////////////////////////////////////////////////////////////////////

const nthFibIterative = n => {
  let cache = Array(n);
  cache[0] = 0;
  cache[1] = 1;

  for (let i = 2; i <= n; i++) {
    cache[i] = cache[i - 1] + cache[i - 2];
  }

  return cache[n];
}

console.log(nthFibIterative(50))