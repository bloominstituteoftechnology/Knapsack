const fs = require('fs');

const args = process.argv.slice(2);

if (args.length != 2) {
  console.error('usage:  inputfile and threshold');
  process.exit(1);
}

const filename = args[0];
const threshold = args[1];

let data = fs.readFileSync(filename, 'utf8');

data = data.trim().split('\n').map(x => x.split(' '));
data = data.map(x => [Number(x[0]), Number(x[1]), Number(x[2])]);