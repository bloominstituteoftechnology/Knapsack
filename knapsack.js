// Need this to access data using the fs.readFileSync method
const fs = require('fs');

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
// items.shift(); // This messes with the output somehow
// items[0] = null; // This doesn't change anything - empty vs null
console.log('ITEMS', items);
console.log('length of ITEMS', items.length);

// PSEUDO:

// ratio approach
// Dynamic Programming Approach
// Memoization Approach -- to make Recursive Approach more efficient
