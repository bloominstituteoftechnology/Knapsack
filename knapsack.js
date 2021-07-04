const fs = require("fs");

/* Naive Recursive approach  */

/*
  Greedy Strategy
  0. Go through our items and filter out any items whose size > knapsack's capacity
  1. 'Score' each item by determining its value/weight ratio
  2. Sort the items array by each item's ratio such that the items with the best ratio
  are at the top of the array of items
  3. Grab items off the top of the items array until we reach our knapsack's full capacity
*/

function naiveKnapsack(items, capacity) {
  function recurse(i, size) {
    //base case
    if (i === -1) {
      return {
        value: 0,
        size: 0,
        chosen: []
      };
    }
    //check to see if item fits
    else if (items[i].size > size) {
      return recurse(i - 1, size);
    } else {
      //the item fits, but may not be worth the as much
      const result0 = recurse(i - 1, size);
      const result1 = recurse(i - 1, size - items[i].size);
      result1.value += items[i].value;
      if (result0.value > result1.value) {
        return result0;
      } else {
        r1.size += items[i].size;
        result1.chosen = result1.chosen.concat(i +1);
        return result1;
      }
    }
  }
  return recurse(items.length -1,capacity);
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
    value: value
  });
}
console.log(items);
const sortedItems = items.sort((a, b) => {
  return b.value / b.size - a.value / a.size;
});
const greedy = (items, capacity) => {
  let memo = [];

  for (let i = 0; i < items.length; i++) {
    if (items[i].size <= capacity) {
      capacity -= items[i].size;
      memo.push(items[i]);
    }
  }

  return memo;
};
greedy(sortedItems, capacity);

console.log(naiveKnapsack())