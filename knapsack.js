const fs = require('fs');

/* Naive Reursive Approach */
function naiveKnapsack(items, capacity) {
  function recurse(i, size) {
    // base case
    if (i === -1) {
      // hit once recursion 'bottoms out'
      return { value: 0, size: 0, chosen: [] }
    }
    // check to see if the item fits
    else if (items[i].size > size) {
      // Effectively skips item
      return recurse(i - 1, size);
    }
    // Item fits, but might not be worth as much as items in there already
    else {
      // Option 1: Item not taken
      const r0 = recurse(i - 1, size);
      // Option 2: Take item and decrement space left in bag and add  value
      const r1 = recurse(i - 1, size - items[i].size);
      r1.value += items[i].value;

      // Compare variants and take larger value
      if (r0.value > r1.value) {
        return r0;
      } else {
        // Add to recusive return object while 'uncoiling'
        r1.size += items[i].size;
        r1.chosen = r1.chosen.concat(i+1);
        return r1;
      }
    }
  }
  // Return most optimal option
  return recurse(items.length - 1, capacity);
}

/* 
  Memoized Recursive Strategy 
  The idea: we'll use the same naive recursive logic but augment it 
  with the ability to save work we've already done. This doesn't actually
  improve the theoretical runtime complexity over the naive recursive 
  approach, but it does significantly improve the actual running time.
  
  1. Initialize a cache (can be an object or an array)
  2. Write a helper function that checks the cache for the answer we're looking for
  3. If the answer is not found, fall back on our naive logic
  4. The naive helper needs to recursively call the memoized version, not itself
  5. Return the value that the memoized function returns
*/

function memoKnapsack(items, capacity) {
  // initialize cache
  const cache = Array(items.length);
  for (let i = 0; i < items.length; i++) {
    cache[i] = Array(capacity + 1).fill(null);
  }
  // check cache for previously processed data
  function checkCache(i, size) {
    if (i === -1) {
      return { value: 0, size: 0, chosen: [] }
    }

    let value = cache[i][size];
    if (!value) {
      value = recurse(i, size);
      cache[i][size] = Object.assign({}, value);
    }
    return value;
  }

  // fallback algo if no data is found in cache
  function recurse(i, size) {
    if (items[i].size > size) {
      return checkCache(i - 1, size);
    } else {
      const r0 = checkCache(i - 1, size);
      const r1 = checkCache(i - 1, size - items[i].size);

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
  return checkCache(items.length - 1, capacity);
}

/* 
  Bottom Up Iterative 
  The idea: Generally follow the same logic as the memoized recursive approach. We 
  still make use of a cache to save prior data. In this case though, we seed the cache
  with some initial values and then loop up to our input, along the way populating the
  cache with the answer for the currennt iteration.

  1. Initialize a cache (again, can be an object or array)
  2. Seed the cache with initial values so that we can build up from there
  3. Loop up to our input (don't forget to skip over the initial seed values)
  4. Populate the cache with the answer for the current iteration
  5. Return cache[n]
*/

function iterateKnapsack(items, capacity) {
  // initialize cache
  const cache = Array(items.length);
  for (let i = 0; i < items.length; i++) {
    cache[i] = Array(capacity + 1).fill(null);
  }

  // seed the cache with some initial values
  for (let i = 0; i <= capacity; i++) {
    cache[0][i] = { size: 0, value: 0, chosen: [] };
  }

  // loop through all the items in our items array
  for (let i = 1; i < items.length; i++) {
    // loop through all the capacities
    for (let j = 0; j <= capacity; j++) {
      if (items[i].size > j) {
        // if the item is too large, use the previous value
        cache[i][j] = cache[i - 1][j];
      } else {
        // item fits
        const r0 = cache[i - 1][j];
        const r1 = Object.assign({}, cache[i - 1][j - items[i].size]);

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
  return cache[cache.length - 1][capacity];
}

/*
  Greedy Strategy
  0. Go through our items and filter out any items whose size > knapsack's capacity
  1. 'Score' each item by determining its value/weight ratio
  2. Sort the items array by each item's ratio such that the items with the best ratio
  are at the top of the array of items
  3. Grab items off the top of the items array until we reach our knapsack's full capacity
*/

// Solution lecture
const greedyAlgo = (items, capacity) => {
  const result = { size: 0, value: 0, chosen: [] };
  // items = items.filter(item => item.size < capacity);
  items.sort((i1, i2) => {
    const r1 = i1.value / i1.size;
    const r2 = i2.value / i2.size;
    return r2 - r1;
  });
  // loop through items array, checking to see if the
  // item's size <= out total capacity
  for (let i = 0; i < items.length; i++) {
    // if it is, add it to our final result
    if(items[i].size <= capacity) {
      result.size += items[i].size;
      result.value += items[i].value;
      result.chosen.push(items[i].index);
      // don't forget to decrement our total capacity
      capacity -= items[i].size;
    }
  }

  return `Value: ${result.value}, Size: ${result.size}, Chosen: ${result.chosen}`;
}

// Solo partial completion before solution lecture
const greedyAlgoSolo = (items, capacity) => {
  // Track size, value, and indecies of chosen items
  let size = 0, value = 0, chosen = [];
  // Sort based on size/value ratio
  const sorted = items.slice().sort(((a, b) => {
    return (b.value / b.size) - (a.value / a.size);
  }));
  // Loop through sorted array
  for(item of sorted) {
    // Check if item.size will break capacity
    if(size + item.size <= capacity) {
        chosen.push(item.index);
        size += item.size;
        value += item.value;
    }
  }

  return `Value: ${value}, Size: ${size}, Chosen: ${chosen}`;
}


const argv = process.argv.slice(2);

if (argv.length != 2) {
  console.error("usage: filename capacity");
  process.exir(1);
}

const filename = argv[0];
const capacity = parseInt(argv[1]);

// Reads the file
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

console.log(memoKnapsack(items, capacity));
console.log(iterateKnapsack(items, capacity));