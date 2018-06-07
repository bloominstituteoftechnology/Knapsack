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
let capacity = parseInt(argv[1]);

// Read the file
const filedata = fs.readFileSync(filename, "utf8");
// Split the filedata on each new line
const lines = filedata.trim().split(/[\r\n]+/g);

// Process the lines
const items = [];

for (let l of lines) {
  const [index, size, value] = l.split(" ").map(n => parseInt(n));

  items.push({
    index,
    size,
    value
  });
}

let originalItems = Array.from(items);
let originalCapacity = capacity;

const sorter = () => {
  items.forEach(n => {
    n["score"] = n.value / n.size;
  });
  items.sort((a, b) => {
    return b.score - a.score;
  });
};

const greedy = () => {
  let knapsack = [];
  let value = 0;
  let cost = 0;

  sorter();
  items.forEach(item => {
    if (item.size <= capacity) {
      knapsack.push(item.index);
      capacity -= item.size;
      cost += item.size;
      value += item.value;
    }
  });
  console.log("\nGreedy method");
  console.log("Items to select:", knapsack);
  console.log("Total Cost: ", cost);
  console.log("Total value: ", value, "\n");
};

const recursive = (items, capacity) => {
  const recurse = (i, spaceLeft) => {
    // build from this
    if (i === -1) {
      return {
        knapsack: [],
        value: 0,
        cost: 0
      };
    }
    const { size, value, index } = items[i];

    // item doesn't fit in knapsack
    if (size > spaceLeft) {
      return recurse(i - 1, spaceLeft);
    } else {
      const untakenPath = recurse(i - 1, spaceLeft);
      const takenPath = recurse(i - 1, spaceLeft - size);

      takenPath.value += value;

      if (untakenPath.value > takenPath.value) {
        return untakenPath;
      } else {
        takenPath.cost += size;
        takenPath.knapsack.push(index);
        return takenPath;
      }
    }
  };
  result = recurse(items.length - 1, capacity);
  console.log("\nRecursive method");
  console.log("Items to select:", result.knapsack);
  console.log("Total Cost: ", result.cost);
  console.log("Total value: ", result.value, "\n");
  return result;
};
greedy();
recursive(originalItems, originalCapacity);
