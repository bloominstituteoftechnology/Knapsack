// ============ PROVIDED CODE =============== //

const fs = require('fs');

function naiveKnapsack(items, capacity) {
  // what is the value we have when we don't pick up any items
  // value[0, w] = 0
  // value[i, w] = value[i-1, w] if W[i] > w

  // recursive solution
  function recurse(i, size) {
    console.log(`recurse() called again, beginning: i: ${i}, size: ${size}`);
    // base case
    if (i == 0) {
      console.log(
        `Base Case, RESET all values to [value: 0, size: 0, chosen[]]`
      );
      return {
        value: 0,
        size: 0,
        chosen: []
      };
    }

    // how do we move towards our base case?
    // recurse(items.length, capacity)
    // recurse(items.length - 1, capacity)
    // recurse(items.length - 2, capacity)

    // Pick up an item
    // case: item doesn't fit
    else if (items[i].size > size) {
      console.log(
        `item[${i} will not fit] so return {value:${
          recurse(i - 1, size).value
        }, size: ${recurse(i - 1, size).size}, chosen:[${
          recurse(i - 1, size).chosen
        }]}`
      );
      return recurse(i - 1, size);
    }

    // case: item does fit, but it might not be worth
    // as much as the sum of values of items we currently
    // have in our bag
    else {
      // the max value we've accumulated so far
      let r0 = recurse(i - 1, size);
      console.log(
        `r0 values: {value:${r0.value}, size:${r0.size}, chosen:[${r0.chosen}]`
      );
      // the max value we could have if we added the new item we picked
      // but evicted some others
      let r1 = recurse(i - 1, size - items[i].size);
      console.log(
        `r1 values: {value:${r1.value}, size:${
          r1.size
        } (size(${size}) - item size(${items[i].size})), chosen:[${r1.chosen}]`
      );

      r1.value += items[i].value;

      if (r0.value >= r1.value) {
        console.log(`r0 wins: `);
        console.log(
          `All three values replaced with r0: {value:${r0.value}, size:${
            r0.size
          }, chosen:[${r0.chosen}] INSTEAD OF r1: {value:${r1.value}, size:${
            r1.size
          }, chosen:[${r1.chosen}]`
        );
        return r0;
      } else {
        console.log(`current index: ${i}`);
        // .size changed
        r1.size += items[i].size;

        r1.chosen = r1.chosen.concat(i);
        console.log(
          `All three values replaced with r1: {value:${r1.value}, size:${
            r1.size
          }, chosen:[${r1.chosen}] INSTEAD OF r0: {value:${r0.value}, size:${
            r0.size
          }, chosen:[${r0.chosen}]`
        );
        return r1;
      }
    }
  }

  return recurse(items.length - 1, capacity);
}

// /* Recursive Memoized */
// function knapsackRecursiveMemoized(items, capacity) {
//   const cache = Array(items.length);

//   // fill the cache array with more arrays
//   for (let i = 0; i < items.length; i++) {
//     cache[i] = Array(capacity + 1).fill(null);
//   }

//   // i is the index of the item
//   // size is the capacity
//   function recurseMemoized(i, size) {
//     let answer = cache[i][size];

//     if (!answer) {
//       answer = recurse(i, size);
//       // make a copy of the answer we got
//       cache[i][size] = Object.assign({}, answer);
//     }

//     return answer;
//   }

//   function recurse(i, size) {
//     if (i === 0) {
//       return {
//         size: 0,
//         value: 0,
//         chosen: []
//       };
//     } else if (items[i].size > size) {
//       return recurseMemoized(i - 1, size);
//     } else {
//       const r0 = recurseMemoized(i - 1, size);
//       const r1 = recurseMemoized(i - 1, size - items[i].size);

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
//   // don't forget to make the inital call to our recursive function
//   return recurseMemoized(items.length - 1, capacity);
// }

// /* Iterative Memoization */
// function knapsackIterative(items, capacity) {
//   const cache = Array(items.length);

//   for (let i = 0; i < items.length; i++) {
//     cache[i] = Array(capacity + 1).fill(null);
//   }

//   // seed our cache with base values
//   for (let i = 0; i <= capacity; i++) {
//     cache[0][i] = {
//       size: 0,
//       value: 0,
//       chosen: []
//     };
//   }

//   // looping through all items;
//   for (let i = 1; i < items.length; i++) {
//     // looping through all capacities
//     for (let j = 0; j <= capacity; j++) {
//       // check if the item fits our size constraint
//       if (items[i].size > j) {
//         // if the item doesn't fit, just use the previous best value
//         cache[i][j] = cache[i - 1][j];
//       } else {
//         // item does fit
//         // look at the previous best value and the value we'll get
//         // by taking the current item. choose the best one.

//         const r0 = cache[i - 1][j];
//         const r1 = Object.assign({}, cache[i - 1][j - items[i].size]);

//         r1.value += items[i].value;

//         if (r0.value > r1.value) {
//           cache[i][j] = r0;
//         } else {
//           r1.size += items[i].size;
//           r1.chosen = r1.chosen.concat(i);
//           cache[i][j] = r1;
//         }
//       }
//     }
//   }

//   return cache[cache.length - 1][capacity];
// }

// /* Greedy Implementation */
// function knapsackGreedy(items, capacity) {
//   const answer = {
//     size: 0,
//     value: 0,
//     chosen: []
//   };

//   // slice off the first empty entry in our items array
//   // so that we can sort properly
//   items = items.slice(1);

//   // sort the items array in descending order
//   items.sort((item0, item1) => {
//     const r0 = item0.value / item0.size;
//     const r1 = item1.value / item1.size;

//     return r1 - r0;
//   });

//   // Add items to our knapsack from the top of the items array

//   for (let i = 0; i < items.length; i++) {
//     if (items[i].size <= capacity) {
//       answer.size += items[i].size;
//       answer.value += items[i].value;
//       answer.chosen.push(items[i].index);

//       capacity -= items[i].size;
//     }
//   }

//   return answer;
// }

/* Timing code */
function timedRun(name, f, items, capacity) {
  let startTime = Date.now();
  let result = f(items, capacity);
  let endTime = Date.now();
  let diffTime = endTime - startTime;

  console.log(name);
  console.log(`Time: ${(diffTime / 1000).toFixed(4)}`);
  console.log(`Value: ${result.value}`);
  console.log(`Size: ${result.size}`);
  console.log(`Chosen: ${result.chosen}`);
  console.log();
}

/* Read program arguments and process them */
const argv = process.argv.slice(2);

// add an error check to check the number of params
if (argv.length != 2) {
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
    value
  };
}

// timedRun('Iterative Memoized', knapsackIterative, items, capacity);
// timedRun("Recursive Memoized", knapsackRecursiveMemoized, items, capacity);
// timedRun("Greedy Solution", knapsackGreedy, items, capacity);
console.log('Naive Recursive implementation: ', naiveKnapsack(items, capacity));

// // ========= RATIO SOLUTION - Cesar -- FASTEST (7ms on large) ======= //

// const startTime = Date.now();

// const items = lines.map(line => {
//   const [index, size, value] = line.split(' ');
//   const vsratio = value / size;
//   return { index, size, value, vsratio };
// });

// // console.log('ITEMS', items);

// items.sort((a, b) => {
//   return b.vsratio - a.vsratio;
// });

// const ratioKnapsack = {
//   selectedIndices: [],
//   totalSize: Number(0),
//   totalValue: Number(0),
//   remainingCapacity: Number(capacity)
// };

// for (let i = 0; i < items.length; i++) {
//   if (items[i].size <= ratioKnapsack.remainingCapacity) {
//     ratioKnapsack.selectedIndices.push(items[i].index);
//     ratioKnapsack.totalSize += Number(items[i].size);
//     ratioKnapsack.totalValue += Number(items[i].value);
//     ratioKnapsack.remainingCapacity -= Number(items[i].size);
//     console.log('ratioKnapsack.capacity:', ratioKnapsack.capacity);
//   }
// }

// const endTime = Date.now();

// console.log(ratioKnapsack);
// console.log('Process time:', endTime - startTime, 'milliseconds');

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

// ================ RECURSIVE/MEMOIZATION SOLUTION - Mephestys - SLOWEST (98ms on large) ============ //

// // ============ RECURSION W/O MEMO =========== //

// const args = process.argv.slice(2);
// console.log('ARGS', args);
// const weights = [],
//   values = [];
// // let cost = 0;

// // In this case capacity is set to 100
// function knapSackRecursive(capacity) {
//   // We have a nested function within which will be called recursively with the value of
//   // capacity passed in as the second argument `size`, and the first argument being the
//   // index value at the end of the `size` array.  Each element in the size array is
//   function ksr(i, remainingCapacity) {
//     if (i === 0) {
//       return 0;
//     } else if (weights[i] > remainingCapacity) {
//       return ksr(i - 1, remainingCapacity);
//     } else {
//       console.log('REMAINING-CAPACITY', remainingCapacity);
//       return Math.max(
//         ksr(i - 1, remainingCapacity),
//         ksr(i - 1, remainingCapacity - weights[i]) + values[i]
//       );
//     }
//   }
//   // recursively run through ksr

//   return ksr(weights.length - 1, capacity);
// }

// // just in case args is not receiving the correct parameters --> (filename/dir, capacity)
// if (args.length < 1) {
//   console.error('usage: knapsack <filename> [sack-size]');
//   process.exit(2);
// }

// // sackSize assigned to 'capacity' parameter of args (see comment above)
// // Also parsed to a base 10 integer - which is redundant
// let sackSize = parseInt(args[1], 10).toString();
// console.log('SACKSIZE', sackSize);

// // if the 'capacity' parameter in args is not typeof number, then assign default value = Number(100)
// if (!Number.isInteger(sackSize)) {
//   sackSize = 100;
// }

// // treasure is the data, with lines (index, size, value) as strings.
// const treasure = fs
//   .readFileSync(`./${args[0]}`, 'utf8', (err, fd) => {
//     if (err) throw err;
//   })
//   .split(/\r?\n/);
// // console.log('TREASURE', treasure);

// // each line of `treasure` is manually composed
// for (let line of treasure) {
//   line = line.trim();
//   if (line === '') continue;
//   line = line.split(' ');
//   // for each  line, populate the `size` array with index 1 (of each line)
//   weights.push(parseInt(line[1], 10));
//   // for each  line, populate the `values` array with index 1 (of each line)
//   values.push(parseInt(line[2], 10));
// }

// console.log('WEIGHTS(populated)', weights);
// console.log('VALUES', values);

// // WOW!  Cool! Another way to time calculation -- console.time AND console.timeEnd VS using Date.now() and subtraction
// console.time('Process Time');
// // This is where everything really starts -- well, really it is called below in the console.log(${value}), but ya
// const value = knapSackRecursive(sackSize);

// console.log(`${sackSize} slots total in knapsack.`);
// console.log(`Slots Used: TODO, Total Value: ${value}`);
// console.timeEnd('Process Time');

// // ========== RECURSION WITH MEMO
// function knapSackRecursive(items, capacity) {
//   function recur(i, size) {
//     if (i === 0) {
//       return {
//         value: 0,
//         size: 0,
//         chosen: [],
//       };
//     } else if (items[i].size > size) {
//       return recur(i - 1, size);
//     } else {
//       const r0 = recur(i - 1, size);
//       const r1 = recur(i - 1, size - items[i].size);

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

// const items = [];

// function knapSackRecursiveMemo(items, capacity) {
//   // An empty array with the items.length = the number of slots
//   let resultsMem = Array(items.length);
//   console.log(resultsMem);

//   for (let s = 0; s < items.length; s++) {
//     resultsMem[s] = Array(capacity + 1).fill(null);
//   }

//   function recurMemo(i, size) {
//     let v = resultsMem[i][size];

//     if (v === null) {
//       v = recur(i, size);
//       resultsMem[i][size] = Object.assign({}, v);
//     }
//     console.log('resultsMem', resultsMem);
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

// // SETUP

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
//   // size.push(parseInt(item[1], 10));
//   // values.push(parseInt(item[2], 10));
//   items[index] = {
//     index: index,
//     size: size,
//     value: value
//   };
// }

// console.time('Process Time');
// const result = knapSackRecursive(items, sackSize);
// // const result = knapSackRecursiveMemo(items, sackSize);

// console.log(`${result.size} out of ${sackSize} slots used.`);
// console.log(`Total Value: ${result.value}`);
// console.log(`Chosen: ${result.chosen}`);

// console.timeEnd('Process Time');
