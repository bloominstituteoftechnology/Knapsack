const fs = require('fs');

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
  const [index, size, value, score] = l.split(" ").map(n => parseInt(n));

  items.push({
    index: index,
    size: size,
		value: value,
		score: (value / size)
  });
}

const knapsack = (items, capacity) => {

	const newItems = items.filter(item => item.size <= capacity);
	const scoringItems = newItems.sort((a, b) => b.score - a.score)
	const knapsackItems = {
    value: 0,
    size: 0,
    chosen: []
  };
	
  for (let i = 0; i < scoringItems.length; i++) {
    if (scoringItems[i].size <= capacity) {
      capacity -= scoringItems[i].size;
      knapsackItems.value += scoringItems[i].value;
      knapsackItems.size += scoringItems[i].size;
      knapsackItems.chosen.push(scoringItems[i].index);
    }
  }
	return knapsackItems;
}

function naiveKnapsack(items, capacity) {
  function recurse(i, size) {
    if (i === -1) {
      return {
        value: 0,
        size: 0,
        chosen: [],
      }
    } else if (items[i].size > size) {
        return recurse(i - 1, size);
    } else {
      const r0 = recurse(i - 1, size);
      const r1 = recurse(i - 1, size - items[i].size);

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
  return recurse(items.length - 1, capacity);
}


console.log(knapsack(items, capacity))