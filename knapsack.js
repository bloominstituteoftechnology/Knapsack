const fs = require("fs");

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
      // 2 different recursive cases
      // this one moves on to next item without changes
      const r0 = recurse(i - 1, size);
      console.log("r0", r0, i);
      // this one puts the item in the bag; essentially capacity - size of item
      const r1 = recurse(i - 1, size - items[i].size);

      // defining case when value of r1
      r1.value += items[i].value;
      console.log("r1", r1, i);

      if (r0.value > r1.value) {
        console.log("r0 returned");
        return r0;
      } else {
        r1.size += items[i].size;
        r1.chosen = r1.chosen.concat(i + 1);
        console.log("r1 returned");
        return r1;
      }
    }
  }
  return recurse(items.length - 1, capacity);
}

/* Memoized Rercursive */
function memoizedKnapsack(items, capacity) {
  // console.log(items.length, capacity);
  // initalize cache (in this, it will be a matrix)
  const cache = Array(items.length).fill(Array(capacity + 1).fill(null));

  // add the second dimension
  // for (let i = 0; i < items.length; i++) {
  //   cache[i] = Array(capacity + 1).fill(null);
  // }

  function recurseMemo(i, capacityLeft) {
    if (i === -1) {
      return {
        value: 0,
        size: 0,
        chosen: [],
      };
    }

    let value = cache[i][capacityLeft];

    if (!value) {
      value = recurseNaive(i, capacityLeft);
      cache[i][capacityLeft] = Object.assign({}, value);    // make a copy
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
    // check to see if the item fits
    else if (items[i].size > capacityLeft) {
      return recurseMemo(i - 1, capacityLeft);
    }
    // Item fits, but might not be worth as much as items in there already
    // But is it worth taking? Does it positively affect our value?
    else {
      // The value we get from not taking the item
      const r0 = recurseMemo(i - 1, capacityLeft);
      const r1 = recurseMemo(i - 1, capacityLeft - items[i].size)

      r1.value += items[i].value;

      if (r0.value > r1.value) {
        return r0;
      } else {
        r1.size += items[i].size;
        r1.chosen = r1.chosen.concat(items[i].index);
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
const greedyAlgo = (items, capacity) => {
  const result = {
    size: 0,
    value: 0,
    chosen: []
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
    value: value
  });
}

// console.log(greedyAlgo(items, capacity));
console.log("answer:", memoizedKnapsack(items, capacity));
// console.log(naiveKnapsack(items, capacity));
