function naiveNthFib(n) {
  if (n === 0 || n === 1) {
    return n;
  }
  return naiveNthFib(n - 1) + naiveNthFib(n - 2);
}



