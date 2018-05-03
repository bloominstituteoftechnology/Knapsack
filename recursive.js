const fs = require('fs');

const timedRun = (label, func, items, capacity) => {
  console.log(label, ': ', func(items, capacity));
}

const knap = (i, size) => {
  const recur = (i, size) => {
    if(i == 0) {
      return 0;
    }
    else if (items[i].size > size) {
      return recur(i - 1, size);
    }
    else {
      return Math.max(
        recur(i - 1, size),
        recur(i - 1, size - items[i].size) + items[i].value
      );
    }
  }
  return recur(items.length - 1, capacity);
}

const args = process.argv.slice(2);

if (args.length != 2) {
  console.error('usage: knapsack file capacity');
  process.exit(1);
}

const filename = args[0];
const capacity = args[1];

const filedata = fs.readFileSync(filename, 'utf-8');
const lines = filedata.trim().split(/[\r\n]+/);

const items = [];

for (let l of lines) {
  const [index, size, value] = l.split(/\s+/).map(n => parseInt(n));

  items[index] = {index, size, value};
}

timedRun('Result', knap, items, capacity);