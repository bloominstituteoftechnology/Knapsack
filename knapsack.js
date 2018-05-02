const fs = require('fs');

const args = process.argv.slice(2);

if (args.length !== 2) {
  console.error('usage: extractlinks inputfile followed by threshold');
  process.exit(1);
}

const filename = args[0];
const threshold = args[1];

let data = fs.readFileSync(filename, 'utf8');

let parsed = data.split('\n').map(each => each.split(' '));
if (parsed[parsed.length - 1][0] === '') parsed.pop();
console.log(parsed);
console.log(threshold);

function printData(data) {
  console.log(data);
}