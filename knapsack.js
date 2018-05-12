// ============ PROVIDED CODE =============== //

// Need this to access data using the fs.readFileSync method
// This is 'reading in files using Node.js' - grab the node.fs module
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
// Now we are getting the correct parameters from argv

// add an error to check the number of params
if (argv.length != 2) {
  console.error('usage: [filename] [capacity]');
  process.exit(1);
}

// Thus, `filename` will be assigned whatever filename is given in your node command AND
// `capacity` will be assigned to whatever max capacity value you assign.
const filename = argv[0];
const capacity = argv[1];

// read the file ('filename') that was passed to our program
// use readFileSync method (can do this async as well), passing filename, and the format
// that we are going to read this data in --> 'utf8'
const filedata = fs.readFileSync(filename, 'utf8');
// console.log('FILEDATA:', filedata);

// regEx carraige Return, creating new line for each data set
// creates a new object, where each line of filedata is given
// its own line.
const lines = filedata.trim().split(/[\r\n]+/g);
// console.log(lines) // expect and array with all the data on seperate lines - strings

//  ========  END OF PROVIDED CODE ======= //
// oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo
// oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo
// oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo
// oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo

// ========= NATIVE SOLUTION - Sean ======== //

// ========== SETUP =========== //

// process the lines

const items = [];

// turns above strings into actual 'number' data types -- see console.log('ITEMS', items);
// This is called a 'for...of' statement: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of
// Essentially 'l' or whatever is placed between `let` and `of` is going to represent the value
// of each of the elements in the array/object placed after `of`
// Additionally, Sean uses something that looks like deconstruction, which assigns each of the three elements
// in each line to the fields `index`, `size`, and `value`.
console.log(
  `000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000`
);
console.log(`lines array before index, size, and value added: ${lines}`);
for (let l of lines) {
  // assigns three values in each string 'l' to these three fields.
  // This DOES NOT change the 'lines' array, but creates a NEW array.
  const [index, size, value] = l
    .toString() // Just to be explicit that `l` is a typeof string -- not necessary though
    .split(' ')
    .map(n => parseInt(n));

  // console.log(`INDEX: ${index} vs. FULL LINE: [${(index, size, value)}]`);

  // creates `items` object from the above array
  // console.log(`items: ${items}`); // Shows items object being created.
  // console.log(`index before items[index] defined: ${index}`); // expect:
  // console.log(`size before items[index] defined: ${size}`);
  // console.log(`value before items[index] defined: ${value}`);

  items[index] = {
    index,
    size,
    value
  };
}

console.log(
  `lines array unadjusted after index, size, and value added: ${lines}`
);

// ============================== NAIVE KNAPSACK: ACTUAL FUNCTION ============================== //

function naiveKnapsack(items, capacity) {
  // what is the value we have when we don't pick up any items
  // value[0, w] = 0
  // vaue[i, w] = value[i-1,w] if W[i] > w
  console.log('ITEMS', items);

  // recursive solution:
  function recurse(i, size) {
    // console.log(`recurse() beginning: CURRENT INDEX IS: ${i}`);
    // CASE #1: i being the index of the item we are trying to put in our bag
    // base case
    // Sean uses double equals here so that...
    if (i === 0) {
      // console.log('i inside Case #1:', i);
      // console.log('CASE #1');

      return {
        value: 0,
        size: 0,
        chosen: []
      };
    }

    // how do we move towards our base case?
    // Example:
    // recurse(items.length, capacity)
    // recurse(items.length -1, capacity)
    // recurse(items.length -2, capacity)

    // === You pick up an item, what are the possible cases? === //

    // CASE #2: The item does not fit
    else if (items[i].size > size) {
      // console.log(`CASE #2: i = ${i}`);
      // console.log(`${items[i].size} is greater than ${size}`);
      // console.log(`call recurse function again of i - 1 = one less than ${i}`);
      return recurse(i - 1, size);
    }
    // CASE #3: The item does fit AND index does not equal 0, BUT the item might not be worth as much
    // as the sum of values of items we currently have in our bag.
    else if (i !== 0) {
      console.log(`CASE #3`);
      // the max value we've accumulated so far
      const r0 = recurse(i - 1, size);

      // the max value we could have if we added the new item we picked,
      // but evicted others - this will compare with all elements
      const r1 = recurse(i - 1, size - items[i].size);
      // console.log(`i`, i);
      console.log(`value of bag if new item is added: ${r1.value}`);
      console.log(
        `items[${i}].value(which equals ${items[i].value}) added to r1.value(${
          r1.value
        })`
      );

      r1.value += items[i].value;
      console.log(`updated r1.value (plus new item's value) is ${r1.value}`);

      // console.log(
      //   `COMPARE: If the value of current items in the bag was: ${
      //     r0.value
      //   }
      //   greater than the value if the item at index ${i} with value ${
      //     items[i].value
      //   } were added to the bag: ${r1.value}?`
      // );
      console.log(
        `CURRENT state of bag's contents is [({r0.value: ${
          r0.value
        }, r0.size: ${r0.size}, r0.chosen: [ ${r0.chosen} ]})]`
      );
      if (r0.value > r1.value) {
        console.log(`CASE #3.1: The current total value of the bag (${
          r0.value
        } is greater than the value
        of the bag if the new item(${
          r1.value
        }) were added.  SO, DO NOT PUT TREASURE at index ${i} in BAG)`);
        console.log(
          `CASE #3.1: Current state of bag = ({r0.value: ${
            r0.value
          }, r0.size: ${r0.size}, r0.chosen: [ ${r0.chosen} ]})`
        );
        return r0;
      } else {
        console.log(
          `No it is not --> CASE #3.2 [PUT TREASURE at index ${i} in cue for adding: ({r1.value: ${
            r1.value
          }, r1.size: ${r1.size}, r1.chosen: [ ${r1.chosen} ]})`
        );
        console.log(
          `CASE #3.2: Current state of bag = ({r0.value: ${
            r0.value
          }, r0.size: ${r0.size}, r0.chosen: [ ${r0.chosen} ]})`
        );
        return r1;
      }
    }
  }
  console.log(
    `START of nested "recurse" function: "recurse" will run as many times as it needs to until the base case is reached --> i == 0`
  );
  // The minus 1 here is what moves us closer to our base case
  const lastItemInItems = items.length - 1;
  console.log('lastItemInItemsINPUT', lastItemInItems); // returns: 10
  return recurse(lastItemInItems, capacity);
}

console.log('Naive Recursive implementation', naiveKnapsack(items, capacity));

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
