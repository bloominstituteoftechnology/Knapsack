const fs = require('fs');
const argv = process.argv.slice(2);
/*
  Strategy 1
  0. Go through our items and filter out any items whose size > knapsack's capacity
  1. 'Score' each item by determining its value/weight ratio
  2. Sort the items array by each item's ratio such that the items with the best ratio
  are at the top of the array of items
  3. Grab items off the top of the items array until we reach out knapsack's full capacity
*/

/*  AMANDA'S SOLUTION  */

function naiveKnapsack(items, capacity) {
  // go through each obj
  // divide its size / value
  // store ratios
  let ratioArr = [];
  for (let i = 0; i < items.length; i++) {
    // console.log('item at index', items[i].index, items[i].size, 'size');
    // console.log('ratio', items[i].size / items[i].value);
    ratioArr[items[i].index] = {
      index: items[i].index,
      ratio: items[i].size / items[i].value,
      size: items[i].size,
      value: items[i].value,
    };
  }
  ratioArr.shift();

  // order ratios
  const sortByRatio = ratioArr.slice(0);
  sortByRatio.sort((a, b) => {
    return a.ratio - b.ratio;
  });
  console.log('sortbyratio', sortByRatio);

  // Items to select: 2, 8, 10
  // Total cost: 98
  // Total value: 117

  const initKnapsack = {
    initValue: 0,
    initCost: 0,
    itemsSelected: [],
  };

  let sack = capacity;
  let value = 0;
  while (sack >= 0) {
    for (let obj of sortByRatio) {
      if (sack - obj.size > 0) {
        sack -= obj.size;
        value += obj.value;
        initKnapsack.itemsSelected.push(obj.index);
        filledKnapsack = {
          ...initKnapsack,
          Value: value,
          Size: capacity - sack,
        };
      }
    }
    return filledKnapsack;
  }
  // go through each ratio
  // while capacity under
  // hold ratio index

  // return items meeting knapsack reqs
  return 'KNAPSACK SUCCESS';
}

if (argv.length !== 2) {
  console.error("usage: filename capacity");
  process.exit(1);
}

const filename = argv[0];
const capacity = argv[1];

// Read the File
const filedata = fs.readFileSync(filename, "utf8");

// Split the filedata on each new line
const lines = filedata.trim().split(/[\r\n]+/g);

// Process the lines
const items = [];

for (let l of lines) {
  const [index, size, value] = l.split(" ").map(n => parseInt(n));

  items[index] = {
    index,
    size,
    value,
  };
}

items.shift();

console.log("Naive Recursive implementation: ", naiveKnapsack(items, capacity));

// //  SEAN's SOLUTION  //
// // const greedyAlgo = (items, capacity) => {
// //   const result = {
// //     size: 0,
// //     value: 0,
// //     chosen: [],
// //   };

// //   // items = item.filter(item => item.size < capacity);
// //   items.sort((i1, i2) => {
// //     const r1 = i1.value / i1.size;
// //     const r2 = i2.value / i2. size;

// //     return r2 - r1;
// //   });

// // // Loop through items array, checking to see if the item's
// // // size <= our total capacity
// //   for (let i = 0; i < items.length; i++) {
// //     if (items[i].size <= capacity) {
// // // If it is, add it to our final result
// //       result.size += items[i].size;
// //       result.value += items[i].value;
// //       result.chosen.push(items[i].index);
// // // Don't forget to decrement our total capacity
// //       capacity -= items[i].size;
// //     }
// //   }

// //   return result;
// // };

// //  SOLUTION  //
// // function naiveKnapsack(items, capacity) {
// //   // go through each obj
// //   // divide its size / value
// //   // store ratios
// //   let ratioArr = [];
// //   for (let i = 0; i < items.length; i++) {
// //     // console.log('item at index', items[i].index, items[i].size, 'size');
// //     // console.log('ratio', items[i].size / items[i].value);
// //     ratioArr[items[i].index] = {
// //       index: items[i].index,
// //       ratio: items[i].size / items[i].value,
// //       size: items[i].size,
// //       value: items[i].value,
// //     };
// //   }
// //   ratioArr.shift();

// //   // order ratios
// //   const sortByRatio = ratioArr.slice(0);
// //   sortByRatio.sort((a, b) => {
// //     return a.ratio - b.ratio;
// //   });
// //   console.log('sortbyratio', sortByRatio);

// //   // Items to select: 2, 8, 10
// //   // Total cost: 98
// //   // Total value: 117

// //   const initknapsack = {
// //     itemsSelected: [],
// //     totalCost: 0,
// //     totalValue: 0,
// //   };
// //   let sack = capacity;
// //   let value = 0;
// //   while (sack >= 0) {
// //     for (let obj of sortByRatio) {
// //       if (sack - obj.size > 0) {
// //         sack -= obj.size;
// //         value += obj.value;
// //         initKnapsack.itemsSelected.push(obj.index);
// //         filledKnapsack = {
// //           ...initKnapsack,
// //           totalCost: capacity - sack,
// //           totalValue: value,
// //         };
// //       }
// //     }
// //     return filledKnapsack;
// //   }
// //   // go through each ratio
// //   // while capacity under
// //   // hold ratio index

// //   // return items meeting knapsack reqs
// //   return 'meh';
// // }

// //  RECURSIVE SOLUTION  //
// function naiveKnapsack(items, capacity) {
//   // What is the value we have when we don't pick up any items
//   // value[0, w] = 0
//   // value[i, w] = value[i - 1, w] if W[i] > w
  
//   function recurse(i, size) {
//     // Base case
//     if (i === -1) {
//       return {
//         value: 0,
//         size: 0,
//         chosen: []
//       };
//     }

//     // How do we move towards our base case?
//     // recurse(items.length, capacity)
//     // recurse(items.length - 1, capacity)
//     // recurse(items.length - 2, capacity)

//     // Pick up an item
//     // Case: item doesn't fit
    
//     else if (items[i].size > size) {
//       return recurse(i - 1, size);
//     }

//     // Case: item does fit, but it might not be worth
//     // as much as the sum of values of items we currently
//     // have in our bag
//     else {
//       // the max value we've accumulated so far 
//       const r0 = recurse(i - 1, size);
//       // the max value we could have if we added the new item we picked
//       // but evicted some others
//       const r1 = recurse(i - 1, size - items[i].size);

//       r1.value += items[i].value;

//       if (r0.value > r1.value) {
//         return r0;
//       } else {
//         r1.size += items[i].size;
//         r1.chosen = r1.chosen.concat(i + 1);
//         return r1;
//       }
//     }
//   }

//   return recurse(items.length - 1, capacity);
// }

// const argv = process.argv.slice(2);

// if (argv.length != 2) {
//   console.error("usage: filename capacity");
//   process.exit(1);
// }

// const filename = argv[0];
// const capacity = parseInt(argv[1]);

// // Read the File
// const filedata = fs.readFileSync(filename, "utf8");

// // Split the filedata on each new line
// const lines = filedata.trim().split(/[\r\n]+/g);

// // Process the lines
// const items = [];

// for (let l of lines) {
//   const [index, size, value] = l.split(" ").map(n => parseInt(n));

// // - Value to Size Ratio
//   // const retValue = value / size
//   // return { index, size, value, retValue }

// // const items = lines.map(line => {
// //   const [index, size, value] = line.split(' ')
// //   const relValue = value / size
// //   return { index, size, value, relValue }
// // })

// // - Sorting Items than return remaing capacity
// // items.sort((a, b) => {
// //   return b.retValue - a.retValue
// // })

// // - Knapsack Max Capacity
// // const knapsack = {
// //   contains: [],
// //   totalSize: Number(0),
// //   totalValue: Number(0),
// //   currCap: Number(capacity)
// // }

// // - Knapsack Calculations
// // for (let i = 0; i < items.length; i++) {
// //   if(items[i].size <= knapsack.currCap) {
// //     knapsack.contains.push(items[i].index)
// //     knapsack.totalSize += Number(items[i].size)
// //     knapsack.totalValue += Number(items[i].value)
// //     knapsack.currCap -= Number(items[i].size)
// //   }
// // }

//   items.push({
//     index: index,
//     size: size,
//     value: value,
//   });
// }

// // return knapsack

// console.log("Naive Recursive implementation: ", naiveKnapsack(items, capacity));