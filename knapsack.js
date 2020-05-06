const fs = require("fs");

/*

 Greedy Strategy

 0. Go through our items and filter out any items whose size > knapsack's capacity

 1. 'Score' each item by determining its value/weight ratio

 2. Sort the items array by each item's ratio such that the items with the best ratio

 are at the top of the array of items

 3. Grab items off the top of the items array until we reach our knapsack's full capacity

*/

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
  const score = value / size;
  if (size < 100)
    items.push({
      index: index,

      size: size,

      value: value,
      score: score
    });
}

items.sort((a, b) => {
  return b.score - a.score;
});

const knapsack = {
  content: [],
  totalValue: 0,
  totalSize: 0,
  capacity: capacity
};

for (let i = 0; i < items.length; i++) {
  if (items[i].size <= knapsack.capacity) {
    knapsack.content.push(items[i].index);
    knapsack.totalValue += items[i].value;
    knapsack.totalSize += items[i].size;
    knapsack.capacity -= items[i].size;
  }
}

const knapsackRecursive = (items, capacity) => {
  const recur = (i, size) => {
    if (i === -1) {
      return {
        value: 0,
        size: 0,
        content: []
      };
    } else if (items[i].size > size) {
      return recur(i - 1, size);
    } else {
      const r0 = recur(i - 1, size);
      const r1 = recur(i - 1, size - items[i].size);

      r1.value += items[i].value;

      if (r0.value > r1.value) {
        console.log("r0 value:" + r0.value);
        return r0;
      } else {
        console.log("r1 value: " + r1.value);
        r1.size += items[i].size;
        r1.content = r1.content.concat(i + 1);
        return r1;
      }
    }
  };
  return recur(items.length - 1, capacity);
};

console.log(knapsackRecursive(items, capacity));
