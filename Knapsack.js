// node knapsack.js data/small1.txt 100

const fs = require('fs');

/* Naive Recursive Approach */
function naiveKnapsack(items, capacity) {
  function recurse(i, size) {
    // base case
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
    else {
      const r0 = recurse(i - 1, size);
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

//   Greedy Strategy
/*
  0. Go through our items and filter out any items whose size > knapsack's capacity
  1. 'Score' each item by determining its value/weight ratio
  2. Sort the items array by each item's ratio such that the items with the best ratio
  are at the top of the array of items
  3. Grab items off the top of the items array until we reach our knapsack's full capacity
*/
function greedyStrategy(items, capacity) {
  let changed = false;
  const possibleItems = items;
  let weight = 0;
  const inventory = {
    selectedItems: [],
    totalCost: 0,
    totalValue: 0, 
  };

  console.log("Capacity is: ", capacity);

  // sort the array by value/size ratio score
  possibleItems.sort(function(a, b) {
    return parseFloat(b.score) - parseFloat(a.score);
  });

  for(let i = 0; weight <= capacity && i < possibleItems.length; i++) {
    weight += possibleItems[i].size;
    if(weight <= capacity){
      inventory.selectedItems.push(possibleItems[i].index);
      inventory.totalCost = weight;
      inventory.totalValue += possibleItems[i].value;
    } else{
      weight -= possibleItems[i].size;
    }
  }

  console.log("\nInventory to GREED: \nItems to select: ", inventory.selectedItems, "\nTotal cost: ", inventory.totalCost, "\nTotal value: ", inventory.totalValue)

  return inventory;
}

//   Memoized Recursive Strategy 
/*
  Uses the naive logic, but augments it with work that's already been done and saved.
  This does not save time, but saves work, thereby saving time.

  1.  Initialize a cache (can be an object or an array)
  2.  Write a helper function that checks the cache for the answer we're looking for
  3.  If the answer is not found, fall back on our naive logic
  4.  The naive helper needs to recursively call the memoized version, not itself
  5.  Return the value that the memoized function returns
*/
function memoizedRecursive(items, capacity) {
  let cache = Array(items);

  function nthFibMemo(items) {
    let value = cache[items]

    if(!value) {
      value = naiveNthFib(items);
      cache[items] = value;
    }
    return value;
  }

  function naiveNthFib(items) {
    if(items === 0 || items === 1) {
      return items;
    }
    return nthFibMemo(items-1) + nthFibMemo(items-2)
  }
  return nthFibMemo(items);
}


// Iterative strategy
function iterativeStrategy(items, capacity) {
  const cache = Array (items.length);

  for(let i = 0; i < items.length; i++){
    cache[i] = Array(capacity + 1).fill(null);
  }

  for (let i = 0; i <= capacity; i++) {
    cache[0][i] = {
      size: 0,
      value: 0,
      chosen: []
    };
  }

  for(let i = 1; i < items.length; i++) {
    for (let j = 0; j <= capacity; j++) {
      if(items[i].size > j) {
        cache[i][j] = cache[i-1][j];
      } else {
        const r0 = cache[i-1][j];
        const r1 = Object.assign({}, cache[i-1][j - items[i].size]);

        r1.value += items[i].value;

        if(r0.value > r1.value) {
          cache[i][j] = r0;
        } else {
          r1.size += items[i].size;
          r1.chosen = r1.chosen.concat(i);
          cache[i][j] = r1;
        }
      }
    }
  }
}

// setup of incoming data

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
    score: ((value/size).toFixed(2)),
  });
}

// greedyStrategy(items, capacity);

// console.log(naiveKnapsack(items, capacity));

// console.log(memoizedRecursive(items, 100));

console.log(iterativeStrategy(items, 100));