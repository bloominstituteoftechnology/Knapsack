const fs = require('fs');

function knapsackRecursive(items, capacity) {

    function recur(i, size) {
        if (i == 0) {
            return {
                value: 0,
                size: 0,
                chosen: []
            };
        } else if (items[i].size > size) {
           return recur(i - 1, size);     
        } else {
            const r0 = recur(i - 1, size);
            const r1 = recur(i - 1, size - items[i].size);
    
            r1.value += items[i].value;
    
            if (r0.value > r1.value) {
                return r0;
            } else {
                r1.size += items[i].size;
                r1.chosen = r1.chosen.concat(i); // make a copy
                return r1;
            }
        }
    }
    return recur(items.length - 1, capacity);
}

function knapsackRecursiveMemoized (items, capacity) {
    let resultsMem = Array(items.length);

    for (let s = 0; s < items.length; s++) {
        resultsMem[s] = Array(capacity + 1).fill(null);
    }

    function recurMemoized(i, size) {
        // size = +size;
        let v = resultsMem[i][size];
    
        if (v === null) {
            v = recur(i, size);
            resultsMem[i][size] = Object.assign({}, v); // Make a copy of the object
        }
        return v;
    }

    function recur(i, size) {
        if (i == 0) {
            return {
                value: 0,
                size: 0,
                chosen: []
            };
        } else if (items[i].size > size) {
           return recurMemoized(i - 1, size);     
        } else {
            const r0 = recurMemoized(i - 1, size);
            const r1 = recurMemoized(i - 1, size - items[i].size);

            r1.value += items[i].value;
    
            if (r0.value > r1.value) {
                return r0;
            } else {
                r1.size += items[i].size;
                r1.chosen = r1.chosen.concat(i); // make a copy
                return r1;
            }
        }
    }

    return recur(items.length - 1, capacity);
}

function knapsackGreedy(items, capacity) {
    const result = {
        value: 0,
        size: 0,
        chosen: []
    };

    // Change from 1-based to 0-based
    items = items.slice(1);

    items.sort((i0, i1) => {
        const r0 = i0.value / i0.size;
        const r1 = i1.value / i1.size;

        return r1 - r0;
    });

    for (let i = 0; i < items.length && capacity > 0; i++) {
        const item = items[i];

        if (item.size <= capacity) {
            // Pack it in
            result.value += item.value;
            result.size += item.size;
            result.chosen.push(item.index);

            capacity -= item.size;
        }
    }
    return result;
}

function timedRun (name, f, items, capacity) {
    let t0 = Date.now();
    let result = f(items, capacity);
    let t1 = Date.now();
    let td = t1 - t0;

    console.log("Function: " + name);
    console.log("Time: " + (td / 1000).toFixed(4));
    console.log("Size: " + result.size);
    console.log("Value: " + result.value);
    console.log("Chosen: " + result.chosen);
}

// Main
const args = process.argv.slice(2);

if (args.length != 2) {
    console.error("usage: knapsack infile capacity");
    process.exit(1);
}

const filename = args[0];
const capacity = +args[1];

const filedata = fs.readFileSync(filename, "utf8");

const lines = filedata.trim().split(/[\r\n]+/);

const items = [];

for (let l of lines) {
    const [index, size, value] = l.split(/\s+/).map(n => parseInt(n));

    items[index] = {
        index: index,
        size: size,
        value: value
    };
}
// timedRun("Recursive", knapsackRecursive, items, capacity);
timedRun("Recursive Memoized", knapsackRecursiveMemoized, items, capacity);
timedRun("Greedy", knapsackGreedy, items, capacity);
