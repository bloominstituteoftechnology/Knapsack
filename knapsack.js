const fs = require("fs");
const args = require("yargs").argv;

if (!args.file || !args.threshold) {
  console.error("Usage: node knapsack --file=<file>.txt --threshold=100");
  process.exit(1);
}

const recKnapSack = (items, capacity, total, taken) => {
  if (
    (items.length === 1 && capacity - items[0].size < 0) ||
    items.length == 0
  ) {
    return { total, taken };
  } else if (items.length === 1) {
    total += items[0].val;
    capacity -= items[0].size;
    taken.push(items[0].item);
    return { total, taken };
  } else {
    if (items[0].size <= capacity) {
      const takenCopy = taken.slice(0);
      takenCopy.push(items[0].item);
      const valWith = recKnapSack(
        items.slice(1),
        capacity - items[0].size,
        total + items[0].val,
        takenCopy
      );
      const valWithout = recKnapSack(items.slice(1), capacity, total, taken);
      const picked = valWith.total > valWithout.total ? valWith : valWithout;
      return picked;
    } else {
      return recKnapSack(items.slice(1), capacity, total, taken);
    }
  }
};

const greedyKnapSack = (items, capacity) => {
  let total = 0;
  const taken = [];
  const sorted = items.map(item => {
    return {
      pos: item.item,
      size: item.size,
      val: item.val,
      density: item.val / item.size
    };
  });

  sorted.sort((a, b) => b.density - a.density);

  sorted.forEach(item => {
    if (item.size <= capacity) {
      capacity -= item.size;
      taken.push(item.pos);
      total += item.val;
    }
  });

  return { total, taken };
};

const dynamicKnapSack = (items, capacity) => {
  const weightMatrix = [];
  const taken = [];
  for(let i = 0; i < items.length; i++) {
    weightMatrix[i] = new Array(capacity + 1);
    taken[i] = new Array(capacity + 1);
  }

  for(let i = 0; i <= items.length; i++) {
    for(let j = 0; j <= capacity; j++) {
      
    }
  }
};

fs.readFile(`${__dirname}/data/${args.file}`, (err, data) => {
  if (err) {
    console.error(`Could not read file: ${args.file}`);
    process.exit(1);
  }
  const dataObj = data
    .toString()
    .split("\n")
    .reduce((res, item, i) => {
      if (!item) {
        return res;
      }
      const line = item.split(" ");
      res[i] = { item: line[0], size: Number(line[1]), val: Number(line[2]) };
      return res;
    }, []);

  // const result = recKnapSack(dataObj, args.threshold, 0, []);
  const result = greedyKnapSack(dataObj, args.threshold);
  console.log(result);
});
