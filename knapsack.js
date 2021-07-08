const fs = require('fs');

/*
  Greedy Strategy
  0. Go through our items and filter out any items whose size > knapsack's capacity
  1. 'Score' each item by determining its value/weight ratio
  2. Sort the items array by each item's ratio such that the items with the best ratio
  are at the top of the array of items
  3. Grab items off the top of the items array until we reach our knapsack's full capacity
*/

const argv = process.argv.slice(2);

if (argv.length != 2) {
    console.error("usage: filename capacity");
    process.exit(1);
}

const filename = argv[0];
const capacity = parseInt(argv[1]);

// Read the file
const filedata = fs.readFileSync(filename, "utf8");
// Split the filedata on each new line
const lines = filedata.trim().split(/[\r\n]+/g);

// Process the lines
const items = [];

for (let l of lines) {
    const [index, size, value] = l.split(" ").map(n => parseInt(n));

    items.push({
        index: index,
        size: size,
        value: value,
    });
}
/*
  Greedy Strategy
  0. Go through our items and filter out any items whose size > knapsack's capacity
  1. 'Score' each item by determining its value/weight ratio
  2. Sort the items array by each item's ratio such that the items with the best ratio
  are at the top of the array of items
  3. Grab items off the top of the items array until we reach our knapsack's full capacity
*/

const greedy = (items, capacity) => {
    const result = {
        size: 0,
        value: 0,
        chosen: []
    }

    items.sort((a, b) => b.value/b.size - a.value/a.size);

    for(item of items) {
        if(item.size <= capacity) {
            capacity -= item.size;
            result.size += item.size;
            result.value += item.value;
            result.chosen.push(item.index);
        }
    }
    console.log(result);
    return result;
}

// greedy(items, capacity);

/* Naive Recursive Approach */
function naiveKnapsack(items, capacity) {
    function recurse(i, size) {
        // base case
        if(i === -1) {
            return {
                value: 0,
                size: 0,
                chosen: []
            }
        } 

        else if(items[i].size > size) {
            return recurse(i - 1, size);
        }

        else {
            const r0 = recurse(i - 1, size);
            const r1 = recurse(i - 1, size - items[i].size);

            r1.value += items[i].value;
            if(r0.value > r1.value) {
                return r0;
            } else {
                r1.size += items[i].size;
                r1.chosen = r1.chosen.concat(i);
                return r1;
            }
        }
    }
    return recurse(items.length - 1, capacity)
}

/*   Memoized Recursive Strategy */
function memoizedKnapsack(items, capacity) {
    // initialized the cache
    const cache = Array(items.length);
    for(let i = 0; i < items.length; i++){
        cache[i] = Array(capacity + 1).fill(null);
    }

    function recursiveMemoizedKnapsack(i, size) {
        if (i === -1) {
            return {
                value: 0,
                size: 0,
                chosen: []
            }
        }
        let value = cache[i][size];
        if (!value) {
        value = naiveRecursiveKnapsack(i, size);
        cache[i][size] = Object.assign({}, value);
        }
        return value;
    }

    function naiveRecursiveKnapsack(i, size) {
        if (i === -1) {
            return {
                value: 0,
                size: 0,
                chosen: []
            }
        }

        else if (items[i].size > size) {
            return recursiveMemoizedKnapsack(i - 1, size);
        }

        else {
            const r0 = recursiveMemoizedKnapsack(i - 1, size);
            const r1 = recursiveMemoizedKnapsack(i - 1, size - items[i].size);

            r1.value += items[i].value;
            if (r0.value > r1.value) {
                return r0;
            } else {
                r1.size += items[i].size;
                r1.chosen = r1.chosen.concat(i+1);
                return r1;
            }
        }
    }
    return recursiveMemoizedKnapsack(items.length-1, capacity);
}

console.log(memoizedKnapsack(items, capacity));