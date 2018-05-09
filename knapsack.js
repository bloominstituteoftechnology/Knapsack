const fs = require('fs');

function betterKnapsack(items, capacity) {
  let result = {
    val: 0,
    size: 0,
    indeces: []
  };
  let currentIndex = 0;

  for (let i = 0; result.size + items[i].size <= capacity; i++) {
    let current = items[i];

    result.size += current.size;
    result.indeces.push(current.index);
    result.val += current.value;
    currentIndex = i;
  }

  for (let i = currentIndex; i < items.length - 1; i++) {
    let current = items[i];

    if (result.size + current.size <= capacity) {
      result.size += current.size;
      result.indeces.push(current.index);
      result.val += current.value;
    }
  }

  return result;
}

const argv = process.argv.slice(2);

// add an error check to check the number of params
if (argv.length !== 2) {
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
    ratio: value / size
  };
}

const selectedItems = items.sort((a, b) => b.ratio - a.ratio);

console.log(selectedItems);

console.log("Naive Recursive implementation: ", betterKnapsack(items, capacity));
