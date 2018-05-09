// ============ PROVIDED CODE =============== //

// Need this to access data using the fs.readFileSync method
const fs = require('fs');

// process.argv returns:
// [ '/usr/local/bin/node',
//      '/Users/admin/Desktop/Project Files/GitHub/lambdaSchool/Knapsack/knapsack.js',
//      'data/small1.txt',
//      '100' ]
// Since you only need access to the filename and capacity values passed in when
// your node command is initiated, only the last two parameters above are needed.
const argv = process.argv.slice(2);
// console.log('ARGV', argv);

// add an error to check the number of params
if (argv.length != 2) {
  console.error('usage: [filename] [capacity]');
  process.exit(1);
}

// Thus, `filename` will be assigned whatever filename is given in your node command AND
// `capacity` will be assigned to whatever max capacity value you assign.
const filename = argv[0];
const capacity = argv[1];

// read the file that was passed to our program
const filedata = fs.readFileSync(filename, 'utf8');
// console.log('FILEDATA:', filedata);

// regEx carraige Return, creating new line for each data set
const lines = filedata.trim().split(/[\r\n]+/g);

//  ========  END OF PROVIDED CODE ======= //
// oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo
// oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo
// oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo
// oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo

// ========= RATIO SOLUTION - Cesar -- FASTEST (7ms on large)======= //

const startTime = Date.now();

const items = lines.map(line => {
  const [index, size, value] = line.split(' ');
  const vsratio = value / size;
  return { index, size, value, vsratio };
});

// console.log('ITEMS', items);

items.sort((a, b) => {
  return b.vsratio - a.vsratio;
});

const ratioKnapsack = {
  selectedIndices: [],
  totalSize: Number(0),
  totalValue: Number(0),
  remainingCapacity: Number(capacity)
};

for (let i = 0; i < items.length; i++) {
  if (items[i].size <= ratioKnapsack.remainingCapacity) {
    ratioKnapsack.selectedIndices.push(items[i].index);
    ratioKnapsack.totalSize += Number(items[i].size);
    ratioKnapsack.totalValue += Number(items[i].value);
    ratioKnapsack.remainingCapacity -= Number(items[i].size);
    console.log('ratioKnapsack.capacity:', ratioKnapsack.capacity);
  }
}

const endTime = Date.now();

console.log(ratioKnapsack);
console.log('Process time:', endTime - startTime, 'milliseconds');

// // ========= GREEDY SOLUTION -- EricHech -- 2nd Place ======== //

// const startTime = Date.now();

// let items = filedata
//   .trim()
//   .split('\n')
//   .map(element => element.split(' '))
//   // converts each line's values to a typeof number and assigns index
//   .map(element => [Number(element[0]), Number(element[1]), Number(element[2])]);
// console.log('items', items);

// for (let i = 0; i < items.length; i++) {
//   items[i].push(items[i][2] / items[i][1]);
// }

// items = items.sort((a, b) => {
//   if (a[3] > b[3]) return -1;
//   else if (a[3] < b[3]) return 1;
//   else return 0;
// });

// let value = 0;
// let cost = 0;
// for (let i = 0; i < items.length; i++) {
//   if (cost + items[i][1] <= 100) {
//     cost += items[i][1];
//     value += items[i][2];
//   }
// }

// const endTime = Date.now();

// console.log('CAPACITY:', capacity);
// console.log('Value:', value);
// console.log('Cost:', cost);
// console.log('Process time:', endTime - startTime, 'milliseconds');

// // ================ RECURSIVE/MEMOIZATION SOLUTION - Mephestys - SLOWEST (98ms on large) ============ //

// const items = [];

// function knapSackRecursiveMemo(items, capacity) {
//   let resultsMem = Array(items.length);

//   for (let s = 0; s < items.length; s++) {
//     resultsMem[s] = Array(capacity + 1).fill(null);
//   }

//   function recurMemo(i, size) {
//     let v = resultsMem[i][size];

//     if (v === null) {
//       v = recur(i, size);
//       resultsMem[i][size] = Object.assign({}, v);
//     }
//     return v;
//   }

//   function recur(i, size) {
//     if (i === 0) {
//       return {
//         value: 0,
//         size: 0,
//         chosen: []
//       };
//     } else if (items[i].size > size) {
//       return recurMemo(i - 1, size);
//     } else {
//       const r0 = recurMemo(i - 1, size);
//       const r1 = recurMemo(i - 1, size - items[i].size);

//       r1.value += items[i].value;

//       if (r0.value > r1.value) {
//         return r0;
//       } else {
//         r1.size += items[i].size;
//         r1.chosen = r1.chosen.concat(i);
//         return r1;
//       }
//     }
//   }
//   return recur(items.length - 1, capacity);
// }

// if (argv.length < 1) {
//   console.error('usage: knapsack <filename> [sack-size]');
//   process.exit(2);
// }

// let sackSize = parseInt(argv[1], 10);

// if (!Number.isInteger(sackSize)) {
//   sackSize = 100;
// }

// const treasure = fs
//   .readFileSync(`./${argv[0]}`, 'utf8', (err, fd) => {
//     if (err) throw err;
//   })
//   .split(/\r?\n/);

// for (let item of treasure) {
//   item = item.trim();
//   if (item === '') continue;
//   const [index, size, value] = item.split(/\s+/).map(n => parseInt(n));
//   // weights.push(parseInt(item[1], 10));
//   // values.push(parseInt(item[2], 10));
//   items[index] = {
//     index: index,
//     size: size,
//     value: value
//   };
// }

// console.time('Process Time');
// // const result = knapSackRecursive(items, sackSize);
// const result = knapSackRecursiveMemo(items, sackSize);

// console.log(`${result.size} out of ${sackSize} slots used.`);
// console.log(`Total Value: ${result.value}`);
// console.log(`Chosen: ${result.chosen}`);

// console.timeEnd('Process Time');
