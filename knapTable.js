// Guy from the group's example
// I also didn't follow this either... blah
const fs = require('fs');
const filename = process.argv[2] + '';

const table = [];
const values = [];
const weights = [];
const file = fs.readFileSync(filename, 'binary');
const knapweight = process.argv[3];

let arr = file.trim().split('\n');
console.log(arr);
const n = arr.length;
for(let e = 0; e < n; e++) {
    out = arr[e].split(' ');
    values.push(+out[2]);
    weights.push(+out[1]);
}

const start = Date.now();
for(let i = 0; i < n; i++) {
    table[i] = [];
}
for(let j = 0; j < knapweight; j++) {
    table[0][j] = 0;
}
for(let i = 1; i < n; i++) {
    for(let j = 0; j < knapweight; j++) {
        if(weights[i] > j) {
            table[i][j] = table[i-1[j]];
        } 
        else {
            table[i][j] = Math.max(table[i-1][j], table[i-1][j - weights[i]] + values[i]);
        }
    }
}
const end = Date.now;

console.log(`Time: ${(end-start)/1000} seconds`);
console.log(`Best Combination: ${(table[n-1][knapweight-1])}`);