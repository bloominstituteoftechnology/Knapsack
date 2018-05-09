const fs = require('fs');

const argv = process.argv.slice(2);
const largeAnswer = [
  44,
  83,
  104,
  107,
  134,
  160,
  239,
  271,
  295,
  297,
  308,
  335,
  337,
  370,
  373,
  420,
  432,
  561,
  566,
  623,
  648,
  671,
  693,
  704,
  737,
  782,
  795,
  796,
  814,
  844,
  866,
  907,
  909,
  913,
  935,
  949,
  987,
  997,
];

const customKnapsack = (items, capacity) => {
  const results = {
    chosen: [],
    value: 0,
    size: 0,
  };
  let avaliableSpace = capacity;

  for (let i = 1; i < items.length; i++) {
    const { size, index, value } = items[i];
    if (avaliableSpace > size) {
      results.chosen.push(index);
      results.value += value;
      results.size += size;
      avaliableSpace -= size;
    }
  }

  return results;
};

const checkDifference = (obj, diff) => {
  for (let i = 0; i < 10; i++) {}
};

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

  const ratio = Number((value / size).toFixed(4));

  items[index] = {
    index,
    size,
    value,
    ratio,
  };
}

function ratioSort(arr) {
  let change = true;
  function recurse(arry) {
    if (!change) return arry;
    change = false;
    for (let i = 1; i < arry.length - 1; i++) {
      if (arry[i].ratio < arry[i + 1].ratio) {
        const temp = arry[i];
        arry[i] = arry[i + 1];
        arry[i + 1] = temp;
        change = true;
      }
    }
    if (change) recurse(arry);
    return arr;
  }
  return recurse(arr);
}

function bubbleSort(arr) {
  let change = true;
  function recurse(arry) {
    if (!change) return arry;
    change = false;
    for (let i = 0; i < arry.length; i++) {
      if (arry[i] > arry[i + 1]) {
        const temp = arry[i];
        arry[i] = arry[i + 1];
        arry[i + 1] = temp;
        change = true;
      }
    }
    if (change) recurse(arry);
    return arr;
  }
  return recurse(arr);
}

ratioSort(items);
items.forEach(item =>
  console.log(`${item.index} \t ${item.size} \t ${item.value} \t ${item.ratio}`)
);
// console.log(items);

const results = customKnapsack(items, capacity);
bubbleSort(results.chosen);

console.log('Naive Recursive implementation: ');
console.log(results);

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
        r1.chosen = r1.chosen.concat(items[i].index);
        return r1;
      }
    }
  }

  return recurse(items.length - 1, capacity);
}
