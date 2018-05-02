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
parsed = parsed.map(each => [
  Number(each[0]),
  Number(each[1]),
  Number(each[2]),
]);

const startTime = Date.now();

for (let i = 0; i < parsed.length; i++) {
  parsed[i].push(parsed[i][2] / parsed[i][1]);
}

parsed = parsed.sort((a, b) => {
  if (a[3] > b[3]) return -1;
  else if (a[3] < b[3]) return 1;
  else return 0;
});

let value = 0;
let cost = 0;
for (let i = 0; i < parsed.length; i++) {
  if (cost + parsed[i][1] <= 100) {
    cost += parsed[i][1];
    value += parsed[i][2];
  }
}

const endTime = Date.now();

console.log('THRESHOLD:', threshold);
console.log('Value:', value);
console.log('Cost:', cost);
console.log('Time:', endTime - startTime, 'milliseconds');
