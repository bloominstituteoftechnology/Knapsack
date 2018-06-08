const fs = require("fs"); // file system

const argv = process.argv.slice(2);

const filename = argv[0];
const capacity = parseInt(argv[1]);

const filedata2array = () => {
  return fs
    .readFileSync(filename, "utf8") // read the file
    .trim().split(/[\r\n]+/g) // split the filedata on each new line
    .reduce((acc, line) => {
      const [index, size, value] = line.split(" ").map(numStr => +numStr);
      return [...acc, { index, size, value }];
    }, []);
}

const items = filedata2array();

/*
Strategy 0 - Naive Recursive Strategy
  * complexity - O(2^n) - each recursive call is met with two more recursive calls
  * only feasible for small data sets
*/

const naive = (items, capacity) => {

  const recurse = (index, size) => {
    // base case - negative one bc we want to include index 0
    if (index === -1) return { value: 0, size: 0, chosen: [] };

    // check to see if the item fits
    else if (items[index].size > size) return recurse(index - 1, size);

    // the item fits, but might not be worth as much as items in there already
    else {
      const r0 = recurse(index - 1, size); // index 9 size 94 value 19
      const r1 = recurse(index - 1, size - items[index].size); // index 9 size 94 - 34 = 60

      r1.value += items[index].value; // index 9 value 19 + 12 = 31

      if (r0.value > r1.value) return r0;

      else {
        r1.size += items[index].size;
        r1.chosen = r1.chosen.concat(index + 1);
        return r1;
      }
    }
  }

  return recurse(items.length - 1, capacity);

}

/*
Strategy 1 - Greedy Strategy - O(n log(n) + n)
  1. "score" each item by determining its value/weight ratio
  2. sort the items array by each item's ratio where the best ratio items are first
  3. grab items off the top of the array until out knapsack is full
*/

const greedy = array => {
  let chosenItems = [], totalCost = 0, totalValue = 0;
  
  const sortedByRatio = array.sort((a, b) => (b.value / b.size) - (a.value / a.size));

  sortedByRatio.forEach(item => {
    if (totalCost + item.size <= capacity) {
      chosenItems.push(item.index);
      totalCost += item.size;
      totalValue += item.value;
    }
  });

  return { chosenItems, totalCost, totalValue };
}

/*
Strategy 2 - Iterative Bottom-Up
  The idea: 
    * generally follow the same logic as the memoized recursive approach
    * still make use of a cache to save prior data
    * seed the cache with some initial values and then loop up to the input, while populating the cache with the answer for the current iteration

  1. initialize a cache (can be an object or an array)
  2. seed the cache with initial values
  3. loop up to the input (skip over the seed values!!)
  4. populate the cache with the answer for the current iteration
  5. return cache[n]
*/

const iterative = (items, capacity) => {

  let cache = Array(items.length);

  // add second dimension to cache 
  for (i = 0; i < items.length; i++) {
    cache[i] = Array(capacity + 1).fill(null);
  }

  // seed cache with some initial values
  for (i = 0; i <= capacity; i++) {
    cache[0][i] = { size: 0, value: 0, chosenItems: [] };
  }

  // loop through all the items in the items array
  for (i = 1; i < items.length; i++) {
    // loop through all the capacities
    for (x = 0; x <= capacity; x++) {
      // if the item is too large, skip it and use the previous value
      if (items[i].size > x) cache[i][x] = cache[i - 1][x]; 
      else {
        // item fits
        const r0 = cache[i - 1][x];
        const r1 = Object.assign({}, cache[i - 1][x - items[i].size]);

        r1.value += items[i].value;

        if (r0.value > r1.value) cache[i][x] = r0;
        else {
          r1.size += items[i].size;
          r1.chosenItems.push(items[i].index);
          cache[i][x] = r1;
        }
      }
    }
  }

  return cache[cache.length - 1][capacity];

}

/*
Strategy 3 - Memoized Recursive Strategy
  The idea: 
  * We'll use the same naive recursive logic, 
      but augment it with the ability to save work we've already done
  * This doesn't improve the theoretical runtime complexity over the naive recursive approach, 
      but it does significantly improve the actual runtime

  1. initialize a cache (can be an object or an array)
  2. write a helper function that checks the cache for the desired answer
  3. if the answer is not found, fall back on the naive logic
  4. the naive helper must recursively call the memoized version, NOT itself
  5. return the value that the memoized function returns
*/

const memoized = (items, capacity) => {

  let cache = Array(items.length);

  // add second dimension to cache 
  for (i = 0; i < items.length; i++) {
    cache[i] = Array(capacity + 1).fill(null);
  }

  const memoHelper = (index, size) => {
    // base case - this will be the starting value when recursion begins to unwind
    if (index === -1) return { value: 0, size: 0, chosen: [] };

    let value = cache[index][size];

    if (!value) {
      value = recurseNaive(index, size);
      cache[index][size] = Object.assign({}, value);
    }

    return value;

  }

  const recurseNaive = (index, size) => {
    // check to see if the item fits
    // does the item fit the capacity requirements ? if not, move on to next index
    if (items[index].size > size) return memoHelper(index - 1, size);

    // the item fits, but might not be worth as much as items in there already
    // there is room for this item in the knapsack
    else {
      // item that hasn't been claimed - value from not taking the item
      const availableItems = memoHelper(index - 1, size);
      // items that are already in knapsack - value from taking the item
      const itemsInKnapsack = memoHelper(index - 1, size - items[index].size);

      itemsInKnapsack.value += items[index].value;

      if (availableItems.value > itemsInKnapsack.value) {
        return availableItems;
      } else {
        itemsInKnapsack.size += items[index].size;
        itemsInKnapsack.chosenItems.push(index + 1); // r1.chosen = r1.chosen.concat(index + 1);
        return itemsInKnapsack;
      }
    }
  }

  return memoHelper(items.length - 1, capacity);

}

/* END OF KNAPSACK METHODS */

/* 
  to run these algos in your terminal...
  
  ...node knapsack.js data/filename.txt capacity
  
  for example: node knapsack.js data/small1.txt 100
*/

console.log(items);
console.log(naive(items, capacity));
console.log(greedy(items));
console.log(iterative(items, capacity));
console.log(memoized(items, capacity));