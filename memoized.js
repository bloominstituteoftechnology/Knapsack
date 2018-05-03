const fs = require('fs');

const timedRun = (label, func, items, capacity) => {
  console.log(label, ': ', func(items, capacity));
}


const knap = (i, size) => {

  let resultsMem = Array(items.length);

  for (let s = 0; s < items.length; s++) {
      resultsMem[s] = Array(capacity + 1).fill(null);
  }
  const recurMemoized = (i, size) => {
      let v = resultsMem[i][size];

      if (v === null) {
          v = recur(i, size);
          resultsMem[i][size] = Object.assign({}, v); // Make a copy of the object
      }

      return v;
  }
  const recur = (i, size) => {
    if(i == 0) {
      return {
        value: 0,
        size: 0,
        chosen: [],
      };
    }
    else if (items[i].size > size) {
      return recurMemoized(i - 1, size);
    }
    else {
        const r0 = recurMemoized(i - 1, size);
        const r1 = recurMemoized(i - 1, size - items[i].size);
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
  return recur(items.length - 1, capacity);
}

const args = process.argv.slice(2);

if (args.length != 2) {
  console.error('usage: knapsack file capacity');
  process.exit(1);
}

const filename = args[0];
const capacity = +args[1];

const filedata = fs.readFileSync(filename, 'utf-8');
const lines = filedata.trim().split(/[\r\n]+/);

const items = [];

for (let l of lines) {
  const [index, size, value] = l.split(/\s+/).map(n => parseInt(n));

  items[index] = {
    index: index,
    size: size,
    value: value
  };
}

timedRun('Result', knap, items, capacity);