const fs = require('fs');
const argv = process.argv.slice(2);

if (argv.length !== 2) {
  console.log('usage: [filename], [capacity]');
  process.exit(1);
}

const filename = argv[0];
const capacity = argv[1];

const fileData = fs.readFileSync(filename, 'utf8');
const lines = fileData.trim().split(/[\r\n]+/g);

const items = [];
for (let line of lines) {
  const [index, size, value] = line.split('').map(n => parseInt(n));
  items[index] = {
    index,
    size,
    value,
  };
}

items.shift();
console.log(items);
