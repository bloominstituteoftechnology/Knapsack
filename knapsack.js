const fs = require('fs');

const exhaustive = (items, capacity, total, taken) => {
  if (!items.length || (items.length === 1 && items[0].w > capacity)) {
    return { total, capacity, taken };
  }
  else if (items.length === 1) {
    total += items[0].v;
    capacity -= items[0].w;
    taken.push(items[0].i);
    return { total, capacity, taken };
  }
  else if (items[0].w <= capacity) {
    let tmp = taken.slice(0);
    tmp.push(items[0].i);
    let withitem = exhaustive(items.slice(1), capacity - items[0].w, total + items[0].v, tmp);
    let without = exhaustive(items.slice(1), capacity, total, taken);
    return withitem.total > without.total ? withitem : without;
  }
  else {
    return exhaustive(items.slice(1), capacity, total, taken);
  }
};

const greedy = (items, capacity, total, taken) => {
  const sorted = items.map(i => {
    return { i: i.i, w: i.w, v: i.v, r: i.v / i.w }
  }).sort((a, b) => b.r - a.r);

  for (let item of sorted) {
    if (item.w <= capacity) {
      capacity -= item.w;
      total += item.v;
      taken.push(item.i);
    }
  }
  return { total, capacity, taken }
};

const dynamic = (items, capacity, total, taken) => {
  const knapsack = Array.from(Array(items.length),
    _ => [...Array(capacity)]);

  for (let i = 0; i < items.length; i++) {
    for (let j = 0; j < capacity; j++) {
      if (i === 0 || j === 0) knapsack[i][j] = 0;
      else if (items[i - 1].w <= j)
        knapsack[i][j] = Math.max(
          knapsack[i - 1][j],
          knapsack[i - 1][j - items[i - 1].w] + items[i - 1].v
        )
      else
        knapsack[i][j] = knapsack[i - 1][j];
    }
  }

  let i = knapsack.length - 1;
  let j = knapsack[i].length - 1;

  while (i > 0 && j > 0) {
    if (knapsack[i][j] != knapsack[i - 1][j]) {
      taken.push([items[i - 1].i, items[i - 1].w]);
      i -= 1;
      j -= items[i].w;
    } else {
      i -= 1;
    }
  }

  const weight = taken.reduce((a, b) => {
    return a + b[1];
  }, 0);

  const result = taken.map(i => i[0]);

  return { total: knapsack[items.length - 1][capacity - 1], weight, result }
}

(function getResults() {
  const file = process.argv[2];
  const capacity = parseInt(process.argv[3]);
  let data;

  file
    ? data = fs.readFileSync(`./data/${file}`, 'utf-8')
    : console.error('usage: node knapsack <filename> capacity');

  const items = data
    .trim()
    .split('\n')
    .map(line => {
      let [i, w, v] = line.split(' ');
      return { i: i, w: parseInt(w), v: parseInt(v) };
    });

  // let x = exhaustive(items, capacity, 0, []);
  // console.log(
  //   `\n`
  //   + `⭕️ Exhaustive Approach:\n`
  //   + `   Total Value: ${x.total}\n`
  //   + `   Total Weight: ${process.argv[3] - x.capacity}\n`
  //   + `   Taken: ${x.taken}\n\n`
  // );

  // let g = greedy(items, capacity, 0, []);
  // console.log(
  //   `\n`
  //   + `⭕️ Greedy Approach:\n`
  //   + `   Total Value: ${g.total}\n`
  //   + `   Total Weight: ${process.argv[3] - g.capacity}\n`
  //   + `   Taken: ${g.taken}\n\n`
  // );

  let d = dynamic(items, capacity, 0, []);
  console.log(
    `\n`
    + `⭕️ Dynamic Approach:\n`
    + `   Total Value: ${d.total}\n`
    + `   Total Weight: ${d.weight}\n`
    + `   Taken: ${d.result}\n`
  );
})();
