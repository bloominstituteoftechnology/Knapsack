const fs = require("fs");

const args = process.argv.slice(2);
const items = [];
// const weights = [], values = [];
// let cost = 0;

// function knapSackRecursive(capacity) {
//   function ksr(i, size) {
//     if (i === 0) {
//       return 0;
//     } else if (weights[i] > size) {
//       return ksr(i - 1, size);
//     } else {
//       return Math.max(
//         ksr(i - 1, size),
//         ksr(i - 1, size - weights[i]) + values[i],
//       );
//     }
//   }
//   return ksr(weights.length - 1, capacity);
// }

function knapSackRecursive(items, capacity) {
  function recur(i, size) {
    if (i === 0) {
      return {
        value: 0,
        size: 0,
        chosen: [],
      };
    } else if (items[i].size > size) {
      return recur(i - 1, size);
    } else {
      const r0 = recur(i - 1, size);
      const r1 = recur(i - 1, size - items[i].size);

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

if (args.length < 1) {
  console.error("usage: knapsack <filename> [sack-size]");
  process.exit(2);
}

let sackSize = (parseInt(args[1], 10));

if (!Number.isInteger(sackSize)) {
  sackSize = 100;
}

const treasure = fs.readFileSync(`./data/${args[0]}`, 'utf8', (err, fd) => {
  if (err) throw err;
}).split(/\r?\n/);

for (let item of treasure) {
  item = item.trim();
  if (item === '') continue;
  const [index, size, value] = item.split(/\s+/).map(n => parseInt(n));
  // weights.push(parseInt(item[1], 10));
  // values.push(parseInt(item[2], 10));
  items[index] = {
    index: index,
    size: size,
    value: value,
  };
}

console.time('Process Time');
const result = knapSackRecursive(items, sackSize);

console.log(`${sackSize} slots total in knapsack.`);
console.log(`Chosen: ${result.chosen}`);
console.log(`Slots Used: ${result.size}, Total Value: ${result.value}`);
console.timeEnd('Process Time');