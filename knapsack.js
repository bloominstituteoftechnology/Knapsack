const fs = require("fs");

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
        chosen: []
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

function ratioKnapsack(items, capacity) {
  items.shift();
  let ratios = items.map(item => {
    return {
      index: item.index,
      size: item.size,
      value: item.value,
      ratio: Math.round(100 * item.value / item.size) / 100
    };
  });
  function mergeSort(arr) {
    if (arr.length === 1) {
      return arr;
    }
    const middle = Math.floor(arr.length / 2);
    const left = arr.slice(0, middle);
    const right = arr.slice(middle);

    console.log(left);

    return merge(mergeSort(left), mergeSort(right));
  }
  function merge(left, right) {
    let result = [];
    let indexLeft = 0;
    let indexRight = 0;

    while (indexLeft < left.length && indexRight < right.length) {
      //   console.log("Left: ", left[indexLeft]);
      if (left[indexLeft].ratio > right[indexRight].ratio) {
        result.push(left[indexLeft]);
        indexLeft++;
      } else {
        result.push(right[indexRight]);
        indexRight++;
      }
    }
    return result.concat(left.slice(indexLeft)).concat(right.slice(indexRight));
  }
  let sorted = mergeSort(ratios);
  //   console.log(sorted);
  let results = {
    value: 0,
    size: 0,
    chosen: []
  };
  for (let i = 0; i < sorted.length; i++) {
    if (results.size < capacity && sorted[i].size <= capacity - results.size) {
      results.size += sorted[i].size;
      results.value += sorted[i].value;
      results.chosen.push(sorted[i].index);
    }
  }
  console.log(results);
  return results;
}

function timedRun(name, func, items, capacity) {
  const startTime = Date.now();
  const result = func(items, capacity);
  const endTime = Date.now();
  const diffTime = endTime - startTime;

  console.log(name);
  console.log(`Time: ${(diffTime / 1000).toFixed(4)}`);
  console.log(`Answer: ${result}`);
  console.log();
}

function dynamicKnapsack(items, capacity) {
  items.shift();
  // let cache = [...Array(items.length)].map(element =>
  // Array(items.length).fill(0)
  // );
  let cache = [];
  for (let i = 0; i <= items.length; i++) {
    for (let j = 0; j <= capacity; j++) {
      if (i === 0 || j === 0) {
        if (!cache[i]) cache[i] = [{}];
        cache[i][j] = { value: 0, size: 0, chosen: [] };
        // console.log(cache);
      } else if (items[i - 1].size <= j) {
        let value;
        let chosen;
        let currentResult =
          items[i - 1].value + cache[i - 1][j - items[i - 1].size].value;
        let prevResult = cache[i - 1][j].value;
        if (currentResult > prevResult) {
          value = currentResult;
          chosen = i - 1;
        } else {
          value = prevResult;
        }
        cache[i][j] = {
          value: value,
          size: j
        };
        if (chosen) {
          cache[i][j].chosen = [...cache[i - 1][j].chosen, chosen];
        } else {
          cache[i][j].chosen = cache[i - 1][j].chosen;
        }
      } else {
        cache[i][j] = cache[i - 1][j];
      }
    }
  }
  let results = {
    value: 0,
    size: 0,
    chosen: []
  };
  console.log(cache[items.length][capacity]);
  return JSON.stringify(cache[items.length][capacity]);
}

const argv = process.argv.slice(2);

// add an error check to check the number of params
if (argv.length != 2) {
  console.error("usage: [filename] [capacity]");
  process.exit(1);
}

const filename = argv[0];
const capacity = argv[1];

// read the file that was passed to our program

const filedata = fs.readFileSync(filename, "utf8");

const lines = filedata.trim().split(/[\r\n]+/g);

// process the lines

const items = [];

for (let l of lines) {
  const [index, size, value] = l.split(" ").map(n => parseInt(n));

  items[index] = {
    index,
    size,
    value
  };
}

// console.log("Naive Recursive implementation: ", naiveKnapsack(items, capacity));
// console.log("Ratio implementation: ", ratioKnapsack(items, capacity));
timedRun("Dynamic", dynamicKnapsack, items, capacity);
