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

// memoized recursive

function memoKnapsack(items, capacity) {
  let cache = Array(items.length)

  for (let i = 0; i < items.length; i++) {
    cache[i] = Array(capacity + 1).fill(null);
  }

  function recurseMemo(i, size) {
    if (i === -1) {
      return {
        value: 0,
        size: 0,
        chosen: [],
      }
    }
    let value = cache[i][size];
    if (!value) {
      value = recurseNaive(i, size);
      cache[i][size] = Object.assign({},value);
    }
    return value;
  }
  function recurseNaive(i, size) {
    if (i === -1) {
      return {
        value: 0,
        size: 0,
        chosen: [],
      }
    } else if (items[i].size > size) {
        return recurseMemo(i - 1, size);
    } else {
      const r0 = recurseMemo(i - 1, size);
      const r1 = recurseMemo(i - 1, size - items[i].size);

      r1.value += items[i].value;

      if (r0.value > r1.value) {
        return r0;
      } else {
        r1.size += items[i].size;
        r1.chosen = r1.chosen.concat(i);
        return r1;
      }
    }
  }
  return recurseMemo(items.length - 1, capacity);
}


// iterative

function iterativeKnapsack(items, capacity) {
  let cache = Array(items.length)

  for (let i = 0; i < items.length; i++) {
    cache[i] = Array(capacity + 1).fill(null);
  }

  for (let i = 0; i <= capacity; i++) {
    cache[0][i] = {
      size: 0,
      value: 0,
      chosen: []
    };
  }

  for (let i = 1; i < items.length; i++) {
    for (let j = 0; j <= capacity; j++) {
      if (items[i].size > j) {
        cache[i][j] = cache[i-1][j];
      } else {
        const r0 = cache[i-1][j];
        const r1 = Object.assign({}, cache[i-1][j - items[i].size]);

        r1.value += items[i].value;
        if (r0.value > r1.value) {
          cache[i][j] = r0;
        } else {
          r1.size += items[i].size;
          r1.chosen = r1.chosen.concat(items[i].index);
          cache[i][j] = r1;
        }
      }
    }
  }
  return cache[cache.length-1][capacity];
}

console.log(iterativeKnapsack(items, capacity))