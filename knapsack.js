const fs = require("fs"); // file system

const argv = process.argv.slice(2);
// console.log(argv) // node knapsack.js data/filename.txt 100

const filename = argv[0];
const capacity = parseInt(argv[1]);

// read the file
const filedata = fs.readFileSync(filename, "utf8");
const lines = filedata.trim().split(/[\r\n]+/g); // split the filedata on each new line

// process the lines
const items = [];

lines.forEach(line => {
  const [index, size, value] = line.split(" ").map(numStr => +numStr);
  const data = { index, size, value };
  items.push(data);
});

console.log(items)

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

// console.log(naive(items, capacity));

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

// console.log(greedy(items)); // node knapsack.js data/filename.txt 100

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
  let cache = Array(items.length - 1);
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

  const recurse = (index, remainingSize) => {
    if (index === -1) return { value: 0, size: 0, chosenItems: [] };
    if (items[index].size > remainingSize) return recurse(index - 1, remainingSize);

    const r0 = recurse(index - 1, remainingSize);
    const r1 = recurse(index - 1, remainingSize - items[index].size);

    r1.value += items[index].value;

    if (r0.value > r1.value) return r0;

    else {
      r1.size += items[index].size;
      r1.chosenItems.push(index + 1);
      return r1;
    }
  }

  return recurse(items.length - 1, capacity);
}

// console.log(memoized(items, capacity))