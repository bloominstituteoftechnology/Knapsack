const fs = require('fs');

/* Naive Recursive Approach */
function naiveKnapsack(items, capacity) {
    // i is the iteration number of the item we're currently
    // looking at and deciding if we want to take that item
    // size is the total capacity we still have available in our knapsack
  function recurse(i, size) {
    // base case
    // return our empty result object
    if (i === -1) {
      return {
        value: 0,
        size: 0,
        chosen: [],
      };
    }

    // check to see if the item fits
    else if (items[i].size > size) {
      return recurse(i - 1, size);
    }
    // Item fits, but might not be worth as much as items in there already
    // But is it worth taking? Doe it positively affect our value?
    else {
    // The value we get from not taking the item
      const r0 = recurse(i - 1, size);
      /*
      r0 = {
          size, 
          value,
          chosen,
      }
      */
    //The value we get from taking the item
      const r1 = recurse(i - 1, size - items[i].size);

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
  return recurse(items.length - 1, capacity);
}

// Memoized Recursive / Dynamic Programming Strategy
function memoizedKnapsack(items, capacity) {
    // initialize cache (in this, it will be a matrix)
    const cache = Array(items, length);

    //add the second dimension
    for (let i = 0; i < items.length; i++) {
        cache[i] = Array(capacity + 1).fill(null);
    }

    function recurseMemo(i, size) {
        let value = cache[i] [size];

        if (!value) {
            value = recurseNaive(i, size);
            cache[i][size] = Object.assign({}, value);   // make a copy
        }

        return value;
    }

    function recurseNaive(i, capacityLeft) {
        if (i === -1) {
        return {
            value: 0,
            size: 0,
            chosen: [],
        };
    }
    
    
    }
}

// Iterative Approach
function knapsackIterative(items, capacity) {
    const cache = Array(items.length);

    for (let i = 0; i < items.length; i++) {
        cache[i] = Array(capacity + 1).fill(null);
    }

    // seed the cache with some initial values
    for (let i = 0; i <= capacity; i++) {
        cache[0][i] = {
            size: 0,
            value: 0,
            chosen: []
        };
    }

    // Loop through all of the the items in our items array
    for (let i = 1; i < items.length; i++) {
        // Loop through all of the capacities
        for (let j = 0; j <= capacity; j++) {
            if (items[i].size > j) {
            // if the item is too large, use the previous value
            cache[i][j] = cache[i-1][j];
            } else {
                // item fits
                const r0 = cache[i-1][j];
                const r1 = Object.assign({}, cache[i-1][j - items[i].size]);

                r1.value += items[i].value;

                if (r0.value > r1.value) {
                    cache[i][j] = r0;
                } else {
                    r1.size += items[i].size;
                    r1.chosen = r1.chosen.concat(items[i].index);
                    cache[i][j] = r1;
                }
            }
        }
    }
    return cache[cache.length-1][capacity];
}

/*
  Greedy Strategy
  0. Go through our items and filter out any items whose size > knapsack's capacity
  1. 'Score' each item by determining its value/weight ratio
  2. Sort the items array by each item's ratio such that the items with the best ratio
  are at the top of the array of items
  3. Grab items off the top of the items array until we reach our knapsack's full capacity
*/
const greedyAlgo = (items, capacity) => {
  const result = {
    size: 0,
    value: 0,
    chosen: [],
  };

  // items = items.filter(item => item.size < capacity);
  items.sort((i1, i2) => {
    const r1 = i1.value / i1.size;
    const r2 = i2.value / i2.size;

    return r2 - r1;
  });
  // loop through our items array, checking to see if the
  // item's size <= our total capacity
  for (let i = 0; i < items.length; i++) {
    if (items[i].size <= capacity) {
      // if it is, add it to our final result
      result.size += items[i].size;
      result.value += items[i].value;
      result.chosen.push(items[i].index);
      // don't forget to decrement our total capacity
      capacity -= items[i].size;
    }
  }

  return result;
};

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

 console.log(greedyAlgo(items, capacity));
// console.log(naiveKnapsack(items, capacity));