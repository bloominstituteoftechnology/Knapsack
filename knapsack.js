const fs = require('fs');

const argv = process.argv.slice(2);

if (argv.length !== 2) {
  console.log("Usage: filename capacity");
  process.exit(1);
}

const filename = argv[0];
const capacity = parseInt(argv[1]);

// Read the input file
const filedata = fs.readFileSync(filename, 'utf8');
const lines = filedata.trim().split(/[\r\n]+/g);

const items = [];

for (let l of lines) {
  const [index, size, value] = l.split(' ').map(Number);
  items.push({ index, size, value });
}

const displayItems = items => {
  const indices = [];
  let totalCost = 0;
  let totalValue = 0;
  items.forEach(x => {
    indices.push(x.index);
    totalCost += x.size;
    totalValue += x.value;
  });
  console.log(`Items to select: ${indices.sort().join(', ')}\nTotal cost: ${totalCost}\nTotal value: ${totalValue}`);
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
  const sortedItems = items.map(x => {
    x.ratio = x.value / x.size;
    return x;
  }).sort((a, b) => b.ratio - a.ratio);
  const pack = [];
  let pickedSize = 0;
  for (let i = 0; i < sortedItems.length; i++) {
    if (pickedSize + sortedItems[i].size <= capacity) { 
      pack.push(sortedItems[i]);
      pickedSize += sortedItems[i].size;
    }
  }
  displayItems(pack);
}

//greedy(items, capacity);

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

function knapsackRecursiveMemoized(items, capacity) {

  // Allocate an array to hold memoized results
  let resultsMem = Array(items.length);

  for (let s = 0; s < items.length; s++) {
    resultsMem[s] = Array(capacity + 1).fill(null);
  }

  // Just like the normal recursive call, but first checks to see if the
  // results have already been computed. If so, just returns them.
  function recurMemoize(i, size) {
    let v = resultsMem[i][size];

    if (v === null) {
      v = recur(i, size);
      resultsMem[i][size] = Object.assign({}, v); // Make a copy
    }

    return v;
  }

  // Direct implementation of the definition, above, except calls
  // recurMemoize() to see if the results have already been obtained.
  function recur(i, size) {

    // Base case
    if (i == 0) {
      return {
        value: 0,
        size: 0,
        chosen: []
      };
    }

    // Item doesn't fit
    else if (items[i].size > size) {
      return recurMemoize(i - 1, size);
    }
    
    // Item fits, but might not be worth as much as items in there
    // already
    else {
      const r0 = recurMemoize(i - 1, size);
      const r1 = recurMemoize(i - 1, size - items[i].size);

      r1.value += items[i].value;
      
      if (r0.value > r1.value) {
        return r0;
      } else {
        r1.size += items[i].size;
        r1.chosen = r1.chosen.concat(i); // Make a copy
        return r1;
      }
    }
  }
  
  return recur(items.length - 1, capacity);
}

/**
 * Iterative bottom-up dynamic programming
 */
function knapsackBottomUp(items, capacity) {

  // Build an array to hold all the results
  let results = Array(items.length);
  
  for (let i = 0; i < items.length; i++) {
    results[i] = Array(capacity + 1);
  }

  // Initialize the first row to zero
  for (let i = 0; i <= capacity; i++) {
    results[0][i] = {
      size: 0,
      value: 0,
      chosen: []
    };
  }
  
  // Go through all items
  for (let i = 1; i < items.length; i++) {

    // And all capacities
    for (j = 0; j <= capacity; j++) {

      if (items[i].size > j) {

        // If the item doesn't fit, just use the previous best value
        results[i][j] = results[i-1][j];
      } else {

        // Item does fit

        // Look at previous best value, and value that we'd get if we
        // chose this item. Choose the best one.

        const r0 = results[i-1][j];
        const r1 = Object.assign({}, results[i-1][j - items[i].size]); // Make a copy

        r1.value += items[i].value;

        if (r0.value > r1.value) {
          results[i][j] = r0;
        } else {
          r1.size += items[i].size;
          r1.chosen = r1.chosen.concat(i); // Make a copy
          results[i][j] = r1;
        }
      }
    }
  }

  return results[results.length - 1][capacity];
}