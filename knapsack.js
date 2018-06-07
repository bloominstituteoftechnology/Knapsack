const fs = require("fs");

const argv = process.argv.slice(2);

if (argv.length !== 2) {
  console.error("usage: filename capacity");
  process.exit(1);
}

const filename = argv[0];
const capacity = parseInt(argv[1]);

const filedata = fs.readFileSync(filename, "utf8");
const lines = filedata.trim().split(/[\r\n]+/g);

const items = [];

for (let l of lines) {
  const [index, size, value] = l.split(" ").map(n => parseInt(n));
  if (size <= capacity) {
    items.push({
      index: index,
      size: size,
      value: value
    });
  }
}

// ==========================================================================
/* Naive Recursive Approach */

function naiveKnapsack(items, capacity) {
  function recurse(i, size) {
    // base case
    if (i === -1) {
      return {
        value: 0,
        size: 0,
        chosen: []
      };
    }
    // check to see if the item fits
    else if (items[i].size > size) {
      return recurse(i - 1, size);
    }
    // Item fits, but might not be worth as much as items in there already
    else {
      const r0 = recurse(i - 1, size);
      const r1 = recurse(i - 1, size - items[i].size);

      r1.value += items[i].value;

      if (r0.value > r1.value) {
        return r0;
      } else {
        r1.size += items[i].size;
        r1.chosen = r1.chosen.concat(i + 1);
        return r1;
      }
    }
  }
  return recurse(items.length - 1, capacity);
}

// ==========================================================================
/* Greedy Strat
  1. Score each item by determining its value/weight ratio
  2. Sort the items by each item's weight/value efficiency
  3. Grab items off the top until we get a full knapsack
*/

const greedyAlgo = (items, capacity) => {
  const result = {
    value: 0,
    size: 0,
    chosen: []
  };
  for (let i of items) {
    i.worth = i.value / i.size;
  }
  items.sort((a, b) => b.worth - a.worth);
  for (let i = 0; i < items.length; i++) {
    if (result.size + items[i].size <= capacity) {
      result.size += items[i].size;
      result.value += items[i].value;
      result.chosen.push(items[i].index);
    }
  }
  return result;
};

// ==========================================================================
/* Memoized Recursive Strategy 
  The idea: we'll use the same naive recursive logic but augment it with the ability to save work we've already done. This doesn't actually improve the theoretical runtime complexity over the naive recrusive approach, but it does significantly improve the actual running time.

  1. Initialize a cache (can be an object or an array)
  2. Write a helper function that checks the cache for the answer we're looking for
  3. If the answer is not found, fall back on our naive logic
  4. The naive helper needs to recursively call the memoized version, not itself
  5. Return the value that the memoized function returns
*/

const memoizedRecursive = (items, capacity) => {
  //creates array of length n, so it knows how long the array will be before making it
  const cache = Array(items.length);

  function memoized(i, size) {
    console.log(cache[i]);
    let value = cache[i];
    if (!value) {
      value = recurse(i, size);
      cache[i] = value;
    }
    return value;
  }
  function recurse(i, size) {
    // base case
    if (i === -1) {
      return {
        value: 0,
        size: 0,
        chosen: []
      };
    }
    // check to see if the item fits
    else if (items[i].size > size) {
      return recurse(i - 1, size);
    }
    // Item fits, but might not be worth as much as items in there already
    else {
      const r0 = memoized(i - 1, size - items[i].size);
      const r1 = memoized(i - 1, size - items[i].size);

      r1.value += items[i].value;

      if (r0.value > r1.value) {
        return r0;
      } else {
        r1.size += items[i].size;
        r1.chosen = r1.chosen.concat(i + 1);
        return r1;
      }
    }
  }
  return memoized(items.length - 1, capacity);
};

// ==========================================================================
/* Bottom Up Iterative 
  The idea: Generally follow the same logic as the memoized recursive approach. We still make use of a cache to save prior data. In this case though, we seed the cache with some initial values and then loop up to our input, along the way populating our cache with the answer for the current iteration.

  1. Initialize a cache (again, can be an object or array)
  2. Seed the cache with initial values so that we can build up from there
  3. Loop up to our input (don't forget to skip over the initial seed values)
  4. Populate the cache with the answer for the current iteration
  5. Return cache[n]
*/

// const bottomUpIterative = (items, capacity) => {
//   return items;
// };

console.log(memoizedRecursive(items, capacity));
