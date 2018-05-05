#!/usr/bin/env node

const fs = require('fs');

/**
 * Naive recursive solution
 */
function knapsackRecursive(items, capacity) {
  // value[0, w] = 0
  // value[i, w] = value[i-1, w] if W[i] > w
  // value[i, w] = max(
  //         value[i-1, w],
  //         value[i-1, w - W[i]
  //        ) if W[i] <= w

  // Direct implementation of the definition, above
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
      return recur(i - 1, size);
    }
    
    // Item fits, but might not be worth as much as items in there
    // already
    else {
  
      const r0 = recur(i - 1, size);
      const r1 = recur(i - 1, size - items[i].size);

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
 * Recursive dynamic programming, memoization
 */
function knapsackRecursiveMemoized(items, capacity) {
  // value[0, w] = 0
  // value[i, w] = value[i-1, w] if W[i] > w
  // value[i, w] = max(
  //         value[i-1, w],
  //         value[i-1, w - W[i]
  //        ) if W[i] <= w

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

/**
 * Greedy solution
 */
function knapsackGreedy(items, capacity) {
  const result = {
    size: 0,
    value: 0,
    chosen: []
  };

  // Items is 1-based, so take off the undefined so we can sort it.
  // Also make a copy so we don't mess with the original.
  items = items.slice(1);

  // Sort items in descending order by value / size
  items.sort((i0, i1) => {
    const r0 = i0.value / i0.size;
    const r1 = i1.value / i1.size;

    return r1 - r0;
  });

  // Add items to knapsack in order, if they fit
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    if (item.size <= capacity) {
      result.size += item.size;
      result.value += item.value;
      result.chosen.push(item.index);

      capacity -= item.size;
    }
  }

  return result;
}

/**
 * Show a timed run
 */
function timedRun(name, f, items, capacity) {
  let startTime = Date.now();
  let result = f(items, capacity);
  let endTime = Date.now();
  let diffTime = endTime - startTime;

  console.log(name);
  console.log(`Time: ${(diffTime/1000).toFixed(4)}`);
  console.log(`Value: ${result.value}`);
  console.log(`Size: ${result.size}`);
  console.log(`Chosen: ${result.chosen}`);
  console.log();
}

// ----------------------------------------
// Main

// Parse command line

const argv = process.argv.slice(2);

if (argv.length != 2) {
  console.error("usage: filename capacity");
  process.exit(1);
}

const filename = argv[0];
const capacity = parseInt(argv[1]);

// Read file

const filedata = fs.readFileSync(filename, "utf8");

const lines = filedata.trim().split(/[\r\n]+/g);

// Process lines

const items = [];

for (let l of lines) {
  const [index, size, value] = l.split(/\s+/g).map(n => parseInt(n));

  items[index] = {
    index: index,
    size: size,
    value: value
  };
}

timedRun("Naive recursive", knapsackRecursive, items, capacity);
timedRun("Memoized recursive", knapsackRecursiveMemoized, items, capacity);
timedRun("Iterative bottom-up", knapsackBottomUp, items, capacity);
timedRun("Greedy", knapsackGreedy, items, capacity);
