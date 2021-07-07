const fs = require('fs');

/*
  Greedy Strategy
  0. Go through our items and filter out any items whose size > knapsack's capacity
  1. 'Score' each item by determining its value/weight ratio
  2. Sort the items array by each item's ratio such that the items with the best ratio
  are at the top of the array of items
  3. Grab items off the top of the items array until we reach our knapsack's full capacity
*/

const argv = process.argv.slice(2);

if (argv.length != 2) {
  console.error("usage: filename capacity");
  process.exit(1);
}

const filename = argv[0];
const capacity = parseInt(argv[1]);

// Read the file
const filedata = fs.readFileSync(filename, "utf8");
// Split the filedata on each new line
const lines = filedata.trim().split(/[\r\n]+/g);

// Process the lines
const items = [];

for (let l of lines) {
  const [index, size, value] = l.split(" ").map(n => parseInt(n));

  items.push({
    index: index,
    size: size,
    value: value,
  });
}

console.log('before sort', items)

let initial = parseInt(capacity);
let betterValue = [];
let sameValue = [];
let worseValue = [];
// items.sort((a, b) => {
//   //b is an index above b
//   //a starts at index 1, doesn't have the last index
//   //b doesn't contain the first index
//   let valA = a.value / a.size;
//   let valB = b.value / b.size;
//   return valB - valA;

// });



// const greedyAlgo = (items, initial) => {

//   let cost = 0;
//   const result = {
//     value: [],
//     size: [],
//     chosen: []
//   };
//   for (i = 0; i < items.length; i++) {
//     if (initial >= items[i].size) {
//       result.size += items[i].size;
//       result.value += items[i].value;
//       result.chosen += items[i].index + ' ';
//       initial -= items[i].size;
//     }
//   }


//   return result;
// }


// console.log(greedyAlgo(items, initial))

//<<<<<< >>>>>>>> <<<<<<<<<<< >>>>>>>>>>>>>>> <<<<<<<<< >>>>

/* Naive Recursive Approach */
function naiveKnapsack(items, capacity) {
  // function recurse(i, size) {
  //   // base case
  //   if (i === -1) {
  //     return {
  //       value: 0,
  //       size: 0,
  //       chosen: [],
  //     };
  //   }

  //   // check to see if the item fits
  //   else if (items[i].size > size) {
  //     return recurse(i - 1, size);
  //   }
  //   // Item fits, but might not be worth as much as items in there already
  //   else {
  //     const r0 = recurse(i - 1, size);
  //     const r1 = recurse(i - 1, size - items[i].size);

  //     r1.value += items[i].value;

  //     if (r0.value > r1.value) {
  //       return r0;
  //     } else {
  //       r1.size += items[i].size;
  //       r1.chosen = r1.chosen.concat(i + 1);
  //       return r1;
  //     }
  //   }
  // }
  // return recurse(items.length - 1, capacity);
  
}



//<<<<<< >>> <<< >>> <<<<<<<<<<< >>>>>>>>>>>>>>> <<<<<<<<< >>>>
function Knapsack(items, initial) {
  const cache = Array([items][initial]);
  function memoKnapsack(items, initial) {
    let cacheValue = cache[[items][initial]];
    if (!cacheValue) {
      cacheValue = naiveKnapsack(items, initial);
      cache[[items][initial]] = cacheValue;
      // return console.log('cacheValue null', initial)
      // return cacheValue
    }
    // return console.log('cacheValue not null', initial)
    return cacheValue;
  }
  function naiveKnapsack(items, initial) {
    
    function recurse(i, size) {
      // base case
      if (i === -1) {
        return {
          value: 0,
          size: 0,
          chosen: [],
        };
      }
      // console.log('items inside naive', size, i, items, items[i].size < size, cache);
  
      // check to see if the item fits
      // else if (items[i].size > size) {
      //   return memoKnapsack(i - 1, size);
      // }
      // Item fits, but might not be worth as much as items in there already
      else {
        return console.log('else', items[i].size)
        // const r0 = memoKnapsack(i - 1, size);
        // const r1 = memoKnapsack(i - 1, size - items[i].size);
  
        // r1.value += items[i].value;
  
        // if (r0.value > r1.value) {
        //   return r0;
        // } else {
        //   r1.size += items[i].size;
        //   r1.chosen = r1.chosen.concat(i + 1);
        //   return r1;
        // }
      }
    }
    return recurse(items.length - 1, initial);
  }
  return memoKnapsack(items, initial)
}
//Work on completing Memoization 
//and Iteration for Knapsack when possible!
console.log(Knapsack(items, initial));