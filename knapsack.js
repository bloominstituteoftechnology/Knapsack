const fs = require('fs');

const args = process.argv.slice(2);
if (args.length !== 2) {
  console.error('There must be two and only two additional arguments in the CLI');
  process.exit(1);
}

const file = args[0];
const capacity = args[1];
const filedata = fs.readFileSync(file, 'utf8');
const entries = filedata.trim().split(/[\r\n]+/);
const items = [];

for (let line of entries) {
  const [index, size, value] = line.split(/\s+/).map(n => +n);
  items[index] = { index, size, value, density: value / size };
}

items.sort((a, b) => b.density - a.density);
items.unshift(undefined);
items.pop();

let value = 0;
let volume = 0;
const final = {};

// Greedy Unbounded Solution
// for (let i = 1; i < items.length; i++) {
//   while (volume + items[i].size <= capacity) {
//     volume += items[i].size;
//     value += items[i].value;
//     if (final[items[i].index]) {
//       final[items[i].index] += 1;
//     } else {
//       final[items[i].index] = 1;
//     }
//   }
//   if (volume === capacity) break;
// }

// Greedy 0/1 Solution
for (let i = 1; i < items.length; i++) {
  if (volume + items[i].size <= capacity) {
    volume += items[i].size;
    value += items[i].value;
    if (final[items[i].index]) {
      final[items[i].index] += 1;
    } else {
      final[items[i].index] = 1;
    }
    if (volume === capacity) break;    
  }
}

console.log(items);
console.log(value);

// 2640 idealized 0/1
// 2639 greedy 0/1
