const fs = require('fs');

const args = process.argv.slice(2);

if (args.length !== 2) {
  console.error('usage: extractlinks inputfile followed by threshold');
  process.exit(1);
}

const filename = args[0];
const threshold = args[1];

let data = fs.readFileSync(filename, 'utf8');

let parsed = data
  .trim()
  .split('\n')
  .map(each => each.split(' '));

let parsedNum = parsed.map(each => [+each[0], +each[1], +each[2]]);

//
// ────────────────────────────────────────────────────────── START THE TIMER ─────
const startTime = Date.now();

for (let i = 0; i < parsedNum.length; i++) {
  parsedNum[i].push(parsedNum[i][2] / parsedNum[i][1]);
}

parsedNum = parsedNum.sort((a, b) => {
  if (a[3] > b[3]) return -1;
  else if (a[3] < b[3]) return 1;
  else return 0;
});

let value = 0;
let cost = 0;
for (let i = 0; i < parsedNum.length; i++) {
  if (cost + parsedNum[i][1] <= 100) {
    cost += parsedNum[i][1];
    value += parsedNum[i][2];
  }
}

const endTime = Date.now();
// ──────────────────────────────────────────────────────────── END THE TIMER ─────
//


console.log('THRESHOLD:', threshold);
console.log('Value:', value);
console.log('Cost:', cost);
console.log('Time:', endTime - startTime, 'milliseconds');
