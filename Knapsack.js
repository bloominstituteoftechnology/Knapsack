const fs = require('fs');

const threshold = 300;
let arr = [];

const input = process.argv[2];
arr = fs.readFileSync(input, 'utf8').trim().split('\n');

let t1 = Date.now();
// let firstSpace;
// let secondSpace;
// let cost;
// let value;
let matched;

arr = arr.map(item => {
   // firstSpace = item.indexOf(' ');
   // secondSpace = item.lastIndexOf(' ');
   // cost = +item.slice(firstSpace + 1, secondSpace);
   // value = +item.slice(secondSpace + 1);
   // return [value / cost, value, cost, +item.slice(0, firstSpace)];

   matched = item.match(/([0-9]+) ([0-9]+) ([0-9]+)/);
   return [+matched[3] / +matched[2], +matched[3], +matched[2], +matched[1]];
})

arr.sort((a, b) => b[0] - a[0]);
let totalCost = 0;
let totalValue = 0;
let itemsToSelect = [];
for (let i = 0; i < arr.length; i++) {
   let newCost = arr[i][2];
   if (totalCost + newCost >= threshold) continue;
   totalCost += newCost;
   totalValue += arr[i][1];
   itemsToSelect.push(arr[i][3]);
}

let t2 = Date.now();
console.log(
   `Items to select: ${itemsToSelect.join(' ')}
   Total cost: ${totalCost}
   Total value: ${totalValue}
   Time to run: ${((t2 - t1) / 1000).toFixed(4)}`
);


// // Beej's solution
// // run using `node knapsack.js .txt size#`
// const fs = require('fs');

// function knapsackRecursive(items, capacity) {
//    // function recur(i, size) {
//    //    if (i == 0 || size == 0) {
//    //       return 0;
//    //    } else if (items[i].size > size) {
//    //       return recur(i - 1, size);
//    //    } else {
//    //       return Math.max(
//    //          recur(i - 1, size),
//    //          recur(i - 1, size - items[i].size) + items[i].value
//    //       );
//    //    }
//    // }

//    // more info returned
//    function recur(i, size) {
//       if (i == 0) {
//          return {
//             value: 0,
//             size: 0,
//             chosen: []
//          };
//       } else if (items[i].size > size) {
//          return recur(i - 1, size);
//       } else {
//          const r0 = recur(i - 1, size);
//          const r1 = recur(i - 1, size - items[i].size);

//          r1.value += items[i].value;

//          if (r0.value > r1.value) {
//             return r0;
//          } else {
//             r1.size += items[i].size;
//             r1.chosen = r1.chosen.concat(i);
//             return r1;
//          }
//       }
//    }

//    return recur(items.length - 1, capacity);
// }

// function timedRun(name, f, items, capacity) {
//    let t0 = Date.now();
//    let result = f(items, capacity);
//    let t1 = Date.now();
//    let td = t1 - t0;

//    console.log('Function: ' + name);
//    console.log('Time: ' + (td /1000).toFixed(4));
//    console.log('Size: ' + result.size);
//    console.log('Value: ' + result.value);
//    console.log('Chosen: ' + result.chosen);
// }

// const args = process.argv.slice(2);
// if (args.length != 2) {
//    console.error("usage: knapsack infile capacity");
//    process.exit(1);
// }
// const filename = args[0];
// const capacity = args[1];
// const filedata = fs.readFileSync(filename, "utf8");
// const lines = filedata.trim().split(/[\rn\n]+/);
// const items = [];

// for (let l of lines) {
//    const [index, size, value] = l.split(/\s+/).map(n => parseInt(n));
//    items[index] = {
//       index: index,
//       size: size,
//       value: value
//    };
// }

// timedRun("Recursive", knapsackRecursive, items, capacity);

// // const value = knapsackRecursive(items, capacity);
// // console.log(value);



// Beej's memoized solution

// function knapSackRecursiveMemoized(items, capacity) {
//    let resultsMem = Array(items.length);

//    for (let s = 0; s < items.length; s++) {
//       resultsMem[s] = Array(capacity + 1).fill(null);
//    }

//    function recurMemoized(i, size) {
//       size = +size;
//       let v = resultsMem[i][size];
//       if (v === null) {
//          v = recur(i, size);
//          resultsMem[i][size] = Object.assign({}, v);
//       }

//       return v;
//    }

//    function recur(i, size) {
//       if (i == 0) {
//          return {
//             value: 0,
//             size: 0,
//             chosen: []
//          };
//       } else if (items[i].size > size) {
//          return recurMemoized(i - 1, size);
//       } else {
//          const r0 = recurMemoized(i - 1, size);
//          const r1 = recurMemoized(i - 1, size - items[i].size);

//          r1.value += items[i].value;

//          if (r0.value > r1.value) {
//             return r0;
//          } else {
//             r1.size += items[i].size;
//             r1.chosen = r1.chosen.concat(i);
//             return r1;
//          }
//       }
//    }
// }



// // Ronnie's code
// const fs = require('fs');

// const loadFile = () => {
//   if(process.argv[2] && process.argv[3]) {
//     return fs.readFileSync(process.argv[2], 'utf-8');
//   } else {
//     console.error('Please supply a file to read from and a knapsack capacity');
//     process.exit(0);
//   }
// };

// const Main = () => {
//   const table = [];
//   const values = [];
//   const weights = [];
//   const file = loadFile();
//   const capacity = process.argv[3];

//   let arr = file.trim().split('\n');
//   const n = arr.length;
//   for(let e = 0; e < n; e++) {
//     out = arr[e].split( ' ' );
//     values.push(+out[2]);
//     weights.push(+out[1]);
//   }

//   for(let i = 0; i < n; i++) {
//     table[i] = [];
//   }

//   for(let j = 0; j < capacity; j++) {
//     table[0][j] = 0;
//   }

//   for(let i = 1; i < n; i++) {
//     for(let j = 0; j < capacity; j++) {
//       if(weights[i] > j) {
//         table[i][j] = table[i - 1][j];
//       } else {
//         table[i][j] = Math.max(table[i - 1][j], table[i - 1][j - weights[i]] + values[i]);
//       }
//     }
//   }

//   // console.log('arr: ', arr);
//   console.log('val: ', values);
//   console.log('wgt: ', weights);
//   console.log('TABLE: ', table);
//   // console.log(((end - start) / 1000).toFixed(4));
//   console.log('OPTIMAL: ', table[n - 1][capacity - 1]);
// };

// Main();