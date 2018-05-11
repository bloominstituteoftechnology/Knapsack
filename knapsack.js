const fs = require('fs');

function naiveKnapsack(items, capacity) {
  // what is the value we have when we don't pick up any items
  // value[0, w] = 0
  // value[i, w] = value[i-1, w] if W[i] > w

  // recursive solution
  function recurse(i, size) {
    // base case
    if (i == 0) {
      return {
        value: 0,
        size: 0,
        chosen: [],
      };
    }

    // how do we move towards our base case?
    // recurse(items.length, capacity)
    // recurse(items.length - 1, capacity)
    // recurse(items.length - 2, capacity)

    // Pick up an item
    // case: item doesn't fit
    else if (items[i].size > size) {
      return recurse(i - 1, size);
    }

    // case: item does fit, but it might not be worth
    // as much as the sum of values of items we currently
    // have in our bag
    else {
      // the max value we've accumulated so far
      const r0 = recurse(i - 1, size);
      // the max value we could have if we added the new item we picked
      // but evicted some others
      const r1 = recurse(i - 1, size - items[i].size);

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

  return recurse(items.length - 1, capacity);
}

/* Recursive Memoized */
function knapsackRecursiveMemoized(items, capacity) {
  const cache = Array(items.length);

  // fill the cache array with more arrays
  for (let i = 0; i < items.length; i++) {
    cache[i] = Array(capacity + 1).fill(null);
  }

  // i is the index of the item
  // size is the capacity
  function recurseMemoized(i, size) {
    let answer = cache[i][size];

    if (!answer) {
      answer = recurse(i, size);
      // make a copy of the answer we got
      cache[i][size] = Object.assign({}, answer);
    }

    return answer;
  }

  function recurse(i, size) {
    if (i === 0) {
      return {
        size: 0,
        value: 0,
        chosen: [],
      };
    } else if (items[i].size > size) {
      return recurseMemoized(i - 1, size);
    } else {
      const r0 = recurseMemoized(i - 1, size);
      const r1 = recurseMemoized(i - 1, size - items[i].size);

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
  // don't forget to make the inital call to our recursive function
  return recurseMemoized(items.length - 1, capacity);
}

/* Iterative Memoization */
function knapsackIterative(items, capacity) {
  const cache = Array(items.length);

  for (let i = 0; i < items.length; i++) {
    cache[i] = Array(capacity + 1).fill(null);
  }

  // seed our cache with base values
  for (let i = 0; i <= capacity; i++) {
    cache[0][i] = {
      size: 0,
      value: 0,
      chosen: [],
    };
  }

  // looping through all items;
  for (let i = 1; i < items.length; i++) {
    // looping through all capacities
    for (let j = 0; j <= capacity; j++) {
      // check if the item fits our size constraint
      if (items[i].size > j) {
        // if the item doesn't fit, just use the previous best value
        cache[i][j] = cache[i - 1][j];
      } else {
        // item does fit
        // look at the previous best value and the value we'll get
        // by taking the current item. choose the best one.

        const r0 = cache[i - 1][j];
        const r1 = Object.assign({}, cache[i - 1][j - items[i].size]);

        r1.value += items[i].value;

        if (r0.value > r1.value) {
          cache[i][j] = r0;
        } else {
          r1.size += items[i].size;
          r1.chosen = r1.chosen.concat(i);
          cache[i][j] = r1;
        }
      }
    }
  }

  return cache[cache.length - 1][capacity];
}

/* Greedy Implementation */
function knapsackGreedy(items, capacity) {
  const answer = {
    size: 0,
    value: 0,
    chosen: [],
  };

  // slice off the first empty entry in our items array
  // so that we can sort properly
  items = items.slice(1);

  // sort the items array in descending order
  items.sort((item0, item1) => {
    const r0 = item0.value / item0.size;
    const r1 = item1.value / item1.size;

    return r1 - r0;
  });

  // Add items to our knapsack from the top of the items array

  for (let i = 0; i < items.length; i++) {
    if (items[i].size <= capacity) {
      answer.size += items[i].size;
      answer.value += items[i].value;
      answer.chosen.push(items[i].index);

      capacity -= items[i].size;
    }
  }

  return answer;
}

/* Timing code */
function timedRun(name, f, items, capacity) {
  let startTime = Date.now();
  let result = f(items, capacity);
  let endTime = Date.now();
  let diffTime = endTime - startTime;

  console.log(name);
  console.log(`Time: ${(diffTime / 1000).toFixed(4)}`);
  console.log(`Value: ${result.value}`);
  console.log(`Size: ${result.size}`);
  console.log(`Chosen: ${result.chosen}`);
  console.log();
}

/* Read program arguments and process them */
const argv = process.argv.slice(2);

// add an error check to check the number of params
if (argv.length != 2) {
  console.error('usage: [filename] [capacity]');
  process.exit(1);
}

const filename = argv[0];
const capacity = argv[1];

// read the file that was passed to our program

const filedata = fs.readFileSync(filename, 'utf8');

const lines = filedata.trim().split(/[\r\n]+/g);

// process the lines

const items = [];

for (let l of lines) {
  const [index, size, value] = l.split(' ').map(n => parseInt(n));

  items[index] = {
    index,
    size,
    value,
  };
}

timedRun('Iterative Memoized', knapsackIterative, items, capacity);
// timedRun("Recursive Memoized", knapsackRecursiveMemoized, items, capacity);
// timedRun("Greedy Solution", knapsackGreedy, items, capacity);
// console.log("Naive Recursive implementation: ", naiveKnapsack(items, capacity));
