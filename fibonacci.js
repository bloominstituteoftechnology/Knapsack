

function nthFib(n) {
    let cache = Array(n);

    function nthFibMemo(n) {
        let value = cache[n]

        if(!value) {
            value = naiveNthFib(n);
            cache[n] = value;
        }

        return value;
    }

    function naiveNthFib(n) {
        if(n === 0 || n === 1) {
            return n;
        }
    
        return nthFibMemo(n-1) + nthFibMemo(n-2)
    }

    return nthFibMemo(n)
}


console.log(nthFib(1000))