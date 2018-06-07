const fs = require('fs');

/* Naive Recursive Approach */
function naiveKnapsack(items, capacity) {
    // i is the interation number of the item we're currently looking and deciding if we want to take that item
    function recurse(i, size) {
      // base case
      // return our empty result object 
      if (i === -1) {
        return {
          value: 0,
          size: 0,
          chosen: [],
        };
      }
  
      // check to see if the item fits
      else if (items[i].size > size) {
        return recurse(i - 1, size);
      }
      // Item fits, but might not be worth as much as items in there already
      else {
        // the Value we get from not taking the item
        const r0 = recurse(i - 1, size);
        /* 
            r0 = {
                size, 
                value,
                chose,
            }
        */
        // the value we get from taking the item
        const r1 = recurse(i - 1, size - items[i].size);
  
        r1.value += items[i].value;
  
        if (r0.value > r1.value) {
          return r0;
        } else {
          r1.size += items[i].size;
          r1.chosen = r1.chosen.concat(i+1);
          return r1;
        }
      }
    }
    return recurse(items.length - 1, capacity);
  }

/*
  Greedy Strategy
  0. Go through our items and filter out any items whose size > knapsack's capacity
  1. 'Score' each item by determining its value/weight ratio
  2. Sort the items array by each item's ratio such that the items with the best ratio
  are at the top of the array of items
  3. Grab items off the top of the items array until we reach our knapsack's full capacity
*/

/* Sean's Code from lecture*/
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
// console.log(items);

/*------My Code Starts Here------*/

//sort  myLoot 
const sorted = items => {
    const ratio = items.map(item => {
        return {
            ...item, 
            takenLoot: item.size / item.value
        }
    }) 
    return ratio.sort((a, b) => a.takenLoot - b.takenLoot)
}

//set variables
const greedy = () => {
    let chosenLoot = [];
    let totalCost = 0;
    let totalValue = 0;

    // loop over sorted function
    sorted(items).forEach(item => {
        //check if we have room in knapsack
        if (totalCost + item.size <= capacity) {
            chosenLoot.push(item.index); 
            totalCost += item.size; 
            totalValue += item.value;
        }
    })   

    return {chosenLoot, totalCost, totalValue};
}

// console Greedy function - empty () to invoke 
console.log(greedy());
// console.log(sorted(items));

/*------My Code Ends Here------*/



/*------Instructor Solve------*/
// const greedyAlgo = (items, capacity) => {
//     const result = {
//         size: 0,
//         value: 0,
//         chosen: [],
//     };

//     // items = items.filter(item => item.size < capacity);
//     //NOTE: i1 = Item 1 & i2 = Item 2
//     items.sort((i1, i2) => {
//        const r1 = i1.value / i1.size;
//        const r2 = i2.value / i2.size;
       
//        return r2 - r1;
//     });
//     // NOTE: loop through our items array, checking to see if the items size <= our total capacity

//     for (let i = 0; i < items.length; i++) {
//         if (items[i].size <= capacity) {
//             //NOTE: if it is, add it to our final result
//             result.size += items[i].size;
//             result.value += items[i].value;
//             result.chosen.push(items[i].index);
//             //NOTE: don't forget to decrement our total capacity
//             capacity -= items[i].size;
//         }
//     }

//     return result;
// };

// console.log(greedyAlgo); 
// runtime complexity: O(n log n)
