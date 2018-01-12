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
  for (let i = 0; i < items.length + 1; i++) {
    weightMatrix[i] = new Array(capacity + 1);
    taken[i] = new Array(capacity + 1);
  }

  for (let i = 0; i <= items.length; i++) {
    for (let j = 0; j <= capacity; j++) {
      if (i === 0 || j === 0) {
        weightMatrix[i][j] = 0;
      } else if (items[i - 1].size < j) {
        const newMax =
          items[i - 1].val + weightMatrix[i - 1][j - items[i - 1].size];
        const oldMax = weightMatrix[i - 1][j];

        if (newMax > oldMax) {
          weightMatrix[i][j] = newMax;
          taken[i][j] = 1;
        } else {
          weightMatrix[i][j] = oldMax;
          taken[i][j] = 0;
        }
      } else {
        weightMatrix[i][j] = weightMatrix[i - 1][j];
      }
    }
  }
  let weightIdx = capacity;
  const resultArr = [];
  for (let i = items.length; i > 0; i--) {
    if (taken[i][weightIdx] === 1) {
      resultArr.push(items[i - 1].item);
      weightIdx -= items[i - 1].size;
    }
  }

  return { total: weightMatrix[items.length][capacity], taken: resultArr };
};

const createNode = (level, profit, weight, bound, contains) => {
  return { level, profit, weight, bound, contains };
};

const bound = (node, capacity, items) => {
  if (node.weight >= capacity) {
    return 0;
  }

  let profitBound = node.profit;
  let i = node.level + 1;
  let totalWeight = node.weight;

  while (i < items.length && totalWeight + items[i].size <= capacity) {
    totalWeight += items[i].size;
    profitBound += items[i].val;
    i++;
  }

  if (i < items.length) {
    profitBound += (capacity - totalWeight) * items[i].density;
  }

  return profitBound;
};

const bbKnapSack = (items, capacity) => {
  const sorted = items.map(item => {
    return {
      pos: item.item,
      size: item.size,
      val: item.val,
      density: item.val / item.size
    };
  });

  sorted.sort((a, b) => b.density - a.density);

  const q = [];
  let node1 = createNode(-1, 0, 0, 0, []);

  q.push(node1);
  let maxProfit = 0;
  let taken = [];
  while (q.length) {
    node1 = q.shift();

    if (node1.level === sorted.length - 1) {
      continue;
    }

    let n2Level = node1.level + 1;
    let node2 = createNode(
      n2Level,
      node1.profit + sorted[n2Level].val,
      node1.weight + sorted[n2Level].size,
      0,
      []
    );

    node2.contains = node1.contains.slice(0);
    node2.contains.push(sorted[node2.level].pos);
    node2.bound = bound(node2, capacity, sorted);

    if (node2.weight <= capacity && node2.profit > maxProfit) {
      maxProfit = node2.profit;
      taken = node2.contains;
    }

    if (node2.bound > maxProfit) {
      q.push(node2);
    }

    node2 = createNode(n2Level, node1.profit, node1.weight, 0, []);
    node2.contains = node1.contains.slice(0);
    node2.bound = bound(node2, capacity, sorted);

    if (node2.bound > maxProfit) {
      q.push(node2);
    }
  }

  return { total: maxProfit, taken };
};

fs.readFile(`${__dirname}/data/${args.file}`, (err, data) => {
  if (err) {
    console.error(`Could not read file: ${args.file}`);
    process.exit(1);
  }
  const dataArr = data
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

  // const result = recKnapSack(dataArr, args.threshold, 0, []);
  // const result = greedyKnapSack(dataArr, args.threshold);
  // const result = dynamicKnapSack(dataArr, args.threshold);
  const result = bbKnapSack(dataArr, args.threshold);
  console.log(result);
});
