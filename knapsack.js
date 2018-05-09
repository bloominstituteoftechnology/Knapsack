// Need this to access data using the fs.readFileSync method
const fs = require('fs');

// write a naive solution function:

function naiveKnapsack(items, capacity) {
  // what is the value we have when we don't pick up any items
  // value[0, w] = 0
  // vaue[i, w] = value[i-1,w] if W[i] > w

  // recursive solution:
  function recurse(i, size) {
    // i being the index of the item we are trying to put in our bag
    // base case
    // Sean uses double equals here so that...
    if (i == 0) {
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

    // CASE #1: The item does not fit
    else if (items[i].size > size) {
      return recurse(i - 1, size);
    }
    // CASE #2: The item does fit, BUT might not be worth as much
    // as the sum of values of items we currently have in our bag.
    else {
      // the max value we've accumulated so far
      const r0 = recurse(i - 1, size);
      // the max value we could have if we added the new item we picked,
      // but evicted others
      const r1 = recurse(i - 1, size - items[i].size);

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
  return recurse(items.length - 1, capacity);
}

console.log('PROCESS', process);

// process.argv returns:
// [ '/usr/local/bin/node',
//      '/Users/admin/Desktop/Project Files/GitHub/lambdaSchool/Knapsack/knapsack.js',
//      'data/small1.txt',
//      '100' ]
// Since you only need access to the filename and capacity values passed in when
// your node command is initiated, only the last two parameters above are needed.
const argv = process.argv.slice(2);

console.log('ARGV', argv);

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
console.log('FILEDATA:', filedata);

// regEx carraige Return, creating new line for each data set
const lines = filedata.trim().split(/[\r\n]+/g);

console.log('LINES - strings', lines); // should see data in array:
// [ "1 42 81",
// "2 42 42",
// "3 68 56",
// "4 68 25",
// "5 77 14",
// "6 57 63",
// "7 17 75",
// "8 19 41",
// "9 94 19",
// "10 34 12"
// ]

// process the lines

const items = [];

// turns above strings into actual 'number' data types -- see console.log('ITEMS', items);
for (let l of lines) {
  const [index, size, value] = l.split(' ').map(n => parseInt(n));

  // Adds field/keys
  items[index] = {
    index,
    size,
    value
  };
}

// shift off the undefined element at index 0
// items.shift();
// items[0] = null;
console.log('ITEMS', items);
console.log('length of ITEMS', items.length);

console.log('Naive Recursive implementation', naiveKnapsack(items, capacity));

// PSEUDO:

// ratio approach
// Dynamic Programming Approach
// Memoization Approach -- to make Recursive Approach more efficient
