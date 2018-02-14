const lineByLine = require('n-readlines');
const readline = require('readline');
const util = require('util');
const fs = require('fs');

const rl = readline.createInterface({
  input: fs.createReadStream('./data/medium1.txt'),
});

const liner = new lineByLine('./data/medium1.txt');

const quickSort = (items) => {
  if (items.length <= 1) {
    return items;
  }
  let left = [];
  let right = [];
  let newArray = [];
  const pivot = items.pop();
  // console.log(pivot);
  // const pivotLocation = Math.floor(items.length / 2);
  // const pivot = items[pivotLocation].ratio;
  const length = items.length;
  // console.log(length);
  for (let i = 0; i < length; i++) {
    if (items[i].ratio <= pivot.ratio) {
      left.push(items[i]);
    } else {
      right.push(items[i]);
    }
  }
  // console.log(left.length);
  // console.log(right.length);
  // return;
  return newArray.concat(quickSort(left), pivot, quickSort(right));
}

let line;
let lineSplit = [];
let lineValued = [];
while (line = liner.next()) {
  cl = line.toString('ascii').split(/[^0-9]+/);
  lineSplit.push([cl[0], cl[1], cl[2]]);

}
lineSplit.forEach(e => {
  lineValued.push({
    ol: e,
    number: e[0],
    cost: e[1],
    value: e[2],
    ratio: e[2] / e[1],
  })
})

const maxWeight = 100;
const sorted = quickSort(lineValued);
let backpack = {
  items: [],
  weight: 0,
  value: 0,
};

for (let i = sorted.length - 1; i > 0; i--) {
  if (backpack.weight + Number(sorted[i].cost) <= maxWeight) {
    backpack.items.push(sorted[i].number);
    backpack.weight += Number(sorted[i].cost);
    backpack.value += Number(sorted[i].value);
  }
  console.log(sorted[i].ratio);
}
console.log(backpack);

// const fs = require('fs')

// fs.readFile('data/small1.txt', (err, data) => {
//   if (err) {
//     console.error('Could not find file')
//     process.exit(1)
//   }
//   const dataArray = data
//     .toString()
//     .split('\n')
//     .reduce((res, item, i) => {
//       if (!item) {
//         return res
//       }
//       const line = item.split(' ') // 1, 42, 81
//       res[i] = { item: line[0], size: Number(line[1]), val: Number(line[2]) }
//       return res;
//     }, [])
// })