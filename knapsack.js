const fs = require('fs');

/* 
  Memoized Recursive Strategy
  1. Initialize a cache (can be an object or an array)
  2. Write a helper function that checks the cache for the answer we're looking for
  3. If the answer is not found, fall back on our naive logic
  4. The naive helper needs to recursively call the memoized version, not itself
  5. Return the value that the memoized function returns
*/

function knapsack(items, capacity) {
  const cache = Array(items.length).fill(Array(capacity + 1).fill(null)); // this will be a matrix, 2-dimensional array
  // add the second dimension
  // for (let i = 0; i < items.length; i++) {
  //   cache[i] = Array(capacity + 1).fill(null);
  // }
  // check cache
  function recurseMemo(i, size) {
    // i - iteration number
    // size - remaining capacity
    let value = cache[i][size];

    if (!value) {
      value = recurseNaive(i, size);
      cache[i][size] = Object.assign({}, value);
    }

    return value;
  }

  function recurseNaive(i, size) {
    if (i === -1) {
      return {
        value: 0,
        size: 0,
        chosen: [],
      };
    }

    // check to see if the item fits
    else if (items[i].size > size) {
      return recurseMemo(i - 1, size);
    }
    // Item fits, but might not be worth as much as items in there already
    else {
      const r0 = recurseMemo(i - 1, size);
      const r1 = recurseMemo(i - 1, size - items[i].size);

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
  return recurseMemo(items.length - 1, capacity);
}

/*
  Greedy Strategy
  0. Go through our items and filter out any items whose size > knapsack's capacity
  1. 'Score' each item by determining its value/weight ratio
  2. Sort the items array by each item's ratio such that the items with the best ratio
  are at the top of the array of items
  3. Grab items off the top of the items array until we reach our knapsack's full capacity
*/

const greedyAlgo = (items) => {
  const result = {
    items: "",
    totalCost: 0,
    totalValue: 0
  }

  items.sort((a, b) => {
    // establish scores for each item
    a.score = a.value / a.size;
    b.score = b.value / b.size;
    // order items from highest score to lowest score
    return b.score - a.score;
  })
  // console.log("scored items: ", items);

  let threshold = 100;
  let index = 0;
  while (threshold > 0 && index < items.length) {
    // current item
    const item = items[index];
    if (threshold - (item.size) < 0) {
      // when current item is too large, move on to the next one
      index++;
    } else {
      result.items += `${item.index}, `;
      result.totalCost += item.size;
      result.totalValue += item.value;
      threshold -= items[index].size;
      index++;
    }
  }
  // trim off excess spacing
  result.items = result.items.slice(0, -2);
  return result;
}

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

// console.log(greedyAlgo(items));
console.log(knapsack(items, capacity));
