const fs = require("fs");

function naiveKnapsack(items, capacity) {
  // what is the value we have when we don't pick up any items
  // value[0, w] = 0
  // value[i, w] = value[i-1, w] if W[i] > w
  let arr = [];
  //   console.log(arr[1][0]);
  // recursive solution
  function recurse(i, size) {
    // console.log("in the function");
    // console.log("i:", i, "  size:", size, "   item:", items[i]);
    console.log(arr[[items[i]],[size]]);
    if (arr[[items[i]],[size]] !== undefined) {
      console.log("about to return a value");
      console.log("array", arr[[items[i]], [size]]);
      return arr[[items[i]], [size]];
      console.log("returned a value");
    }
    // base case
    else if (i == 0) {
      //console.log("returning defaults");
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
      //console.log("recursing");
      return recurse(i - 1, size);
    }

    // case: item does fit, but it might not be worth
    // as much as the sum of values of items we currently
    // have in our bag
    else {
      // the max value we've accumulated so far
      //console.log("recursing, r0");
      const r0 = recurse(i - 1, size);
      // the max value we could have if we added the new item we picked
      // but evicted some others
      //console.log("recursing, r1");
      const r1 = recurse(i - 1, size - items[i].size);
      arr[[items[i]], [size]] = Math.max(r0, r1);
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
  console.log("starting the recursion");
  return recurse(items.length - 1, capacity);
}

// function knapsack (items, capacity) {
//     //base case:
//     if (items.length === 0 || capacity === 0) {
//         //result = 0
//         return {
//             value:0,
//             size: 0,
//             chosen : []
//         };
//     }
//     else if (items.length > capacity) {
//         return knapsack(items.length - 1, capacity);
//     }
//     else {
//         const r0 = knapsack(items.length - 1, capacity);
//         const r1 = knapsack(items.length - 1, capacity - items.length);
//         return Math.max(r0,r1);
//       }

// }

const argv = process.argv.slice(2);

// add an error check to check the number of params
if (argv.length != 2) {
  console.error("usage: [filename] [capacity]");
  process.exit(1);
}

const filename = argv[0];
const capacity = argv[1];

// read the file that was passed to our program

const filedata = fs.readFileSync(filename, "utf8");

const lines = filedata.trim().split(/[\r\n]+/g);

// process the lines

const items = [];

for (let l of lines) {
  const [index, size, value] = l.split(" ").map(n => parseInt(n));

  items[index] = {
    index,
    size,
    value
  };
}

console.log("Naive Recursive implementation: ", naiveKnapsack(items, capacity));
