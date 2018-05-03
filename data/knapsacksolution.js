// const fs = require('fs');

// const args = process.argv.slice(2);
// if (args.length !== 2) {
//     console.error('There must be two and only two additional arguments in the CLI');
//     process.exit(1);
// }

// const file = args[0];
// const capacity = args[1];
// const filedata = fs.readFileSync(file, 'utf8');
// const entries = filedata.trim().split(/[\r\n]+/);
// const items = [];

// for (let line of entries) {
//     const [index, size, value] = line.split(/\s+/).map(n => +n);
//     items[index] = {
//         index,
//         size,
//         value,
//     };
// }

// console.log(items);

function knapsackRecursive(items, capacity) {
   
    
    function recur(i, size) {
        if (i == 0) {
            return {
                value: 0,
                size: 0,
                chosen: []
            };
        }

        else if (items[i].size > size) {
            return recur(i - 1, size);
        }

        else {
                const r0 = recur(i - 1, size);
                const r1 = recur(i - 1, size - items[i].size) 
                
                r1.value += items[i].value

                if (r0.value > r1.value) {
                    return r0;
                } else {
                    r1.size += items[i].size;
                    r1.chosen = r1.chosen.concat(i); // Make a copy
                    return r1;
                }
        }
    }

    return recur(items.length - 1, capacity);
}
//---> Main
const fs = require("fs");
const args = process.argv.slice(2); // node is the first argument

if (args.length != 2) {
    console.error("Usage: Knapsack infile capacity");
    process.exit(1);
}

const filename = args[0];
const capacity = args[1];

const filedata = fs.readFileSync(filename, "utf8");

const lines = filedata.trim().split(/[\r\n]+/);

const items = [];

for (let l of lines) {
    const [index, size, value] = l.split(/\s+/).map(n => parseInt(n));

    items[index] = {
        index: index,
        size: size,
        value: value
    };
}

const value = knapsackRecursive(items, capacity);

console.log(value);


/*
Output for node knapsacksolution.js large1.txt 10

-At capacity 10=

[ <1 empty item>,
  { index: 1, size: 42, value: 81 },
  { index: 2, size: 42, value: 42 },
  { index: 3, size: 68, value: 56 },
  { index: 4, size: 68, value: 25 },
  { index: 5, size: 77, value: 14 },
  { index: 6, size: 57, value: 63 },
  { index: 7, size: 17, value: 75 },
  { index: 8, size: 19, value: 41 },
  { index: 9, size: 94, value: 19 },
  { index: 10, size: 34, value: 12 },
  { index: 11, size: 87, value: 25 },
  { index: 12, size: 27, value: 37 },
  { index: 13, size: 99, value: 10 },
  { index: 14, size: 30, value: 86 },
  { index: 15, size: 59, value: 6 },
  { index: 16, size: 100, value: 46 },
  { index: 17, size: 30, value: 7 },
  { index: 18, size: 38, value: 18 },
  { index: 19, size: 86, value: 79 },
  { index: 20, size: 69, value: 8 },
  { index: 21, size: 53, value: 51 },
  { index: 22, size: 59, value: 53 },
  { index: 23, size: 40, value: 38 },
  { index: 24, size: 96, value: 100 },
  { index: 25, size: 57, value: 82 },
  { index: 26, size: 70, value: 70 },
  { index: 27, size: 84, value: 24 },
  { index: 28, size: 47, value: 57 },
  { index: 29, size: 86, value: 15 },
  { index: 30, size: 28, value: 97 },
  { index: 31, size: 61, value: 19 },
  { index: 32, size: 56, value: 77 },
  { index: 33, size: 24, value: 85 },
  { index: 34, size: 75, value: 35 },
  { index: 35, size: 39, value: 6 },
  { index: 36, size: 53, value: 15 },
  { index: 37, size: 85, value: 98 },
  { index: 38, size: 83, value: 14 },
  { index: 39, size: 58, value: 2 },
  { index: 40, size: 47, value: 80 },
  { index: 41, size: 68, value: 53 },
  { index: 42, size: 29, value: 63 },
  { index: 43, size: 49, value: 48 },
  { index: 44, size: 3, value: 59 },
  { index: 45, size: 78, value: 25 },
  { index: 46, size: 11, value: 56 },
  { index: 47, size: 36, value: 71 },
  { index: 48, size: 84, value: 15 },
  { index: 49, size: 12, value: 81 },
  { index: 50, size: 37, value: 2 },
  { index: 51, size: 39, value: 68 },
  { index: 52, size: 14, value: 34 },
  { index: 53, size: 83, value: 47 },
  { index: 54, size: 53, value: 82 },
  { index: 55, size: 32, value: 46 },
  { index: 56, size: 62, value: 21 },
  { index: 57, size: 94, value: 79 },
  { index: 58, size: 16, value: 80 },
  { index: 59, size: 80, value: 6 },
  { index: 60, size: 7, value: 68 },
  { index: 61, size: 76, value: 10 },
  { index: 62, size: 50, value: 84 },
  { index: 63, size: 33, value: 77 },
  { index: 64, size: 61, value: 24 },
  { index: 65, size: 82, value: 33 },
  { index: 66, size: 53, value: 18 },
  { index: 67, size: 25, value: 58 },
  { index: 68, size: 81, value: 100 },
  { index: 69, size: 40, value: 14 },
  { index: 70, size: 65, value: 55 },
  { index: 71, size: 25, value: 75 },
  { index: 72, size: 67, value: 79 },
  { index: 73, size: 17, value: 4 },
  { index: 74, size: 85, value: 1 },
  { index: 75, size: 46, value: 13 },
  { index: 76, size: 50, value: 42 },
  { index: 77, size: 6, value: 48 },
  { index: 78, size: 69, value: 45 },
  { index: 79, size: 92, value: 18 },
  { index: 80, size: 11, value: 84 },
  { index: 81, size: 91, value: 39 },
  { index: 82, size: 50, value: 3 },
  { index: 83, size: 1, value: 36 },
  { index: 84, size: 18, value: 91 },
  { index: 85, size: 89, value: 79 },
  { index: 86, size: 44, value: 15 },
  { index: 87, size: 34, value: 81 },
  { index: 88, size: 55, value: 6 },
  { index: 89, size: 44, value: 96 },
  { index: 90, size: 54, value: 65 },
  { index: 91, size: 2, value: 2 },
  { index: 92, size: 97, value: 90 },
  { index: 93, size: 57, value: 42 },
  { index: 94, size: 8, value: 57 },
  { index: 95, size: 36, value: 98 },
  { index: 96, size: 58, value: 71 },
  { index: 97, size: 69, value: 59 },
  { index: 98, size: 68, value: 54 },
  { index: 99, size: 72, value: 50 },
  ... 901 more items ]
*/

// Recursive test returns 630

// Output from node knapsacksolution.js large1.txt 10 from modification

/*
{ value: 630,
  size: 10,
  chosen: [ 104, 107, 239, 370, 432, 561, 671, 737 ]}
*/