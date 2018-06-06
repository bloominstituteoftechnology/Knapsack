const fs = require('fs');
const argv = process.argv.slice(2);

if (argv.length !== 2) {
  console.error('usage: [filename] [capacity]');
  process.exit(1);
};

const filename = argv[0];
const capacity = parseInt(argv[1]);

const filedata = fs.readFileSync(filename, 'utf8');
// split input data by line
const lines = filedata.trim().split(/[\r\n]+/g);

const items = lines.map(line => {
  const [index, size, value] = line.split(' ');
  const relVal = value / size;
  return { index, size, value, relVal };
});

items.sort((a, b) => {
  return b.relVal - a.relVal;
});

const greedy = {
  contains: [],
  totalSize: Number(0),
  totalValue: Number(0),
  currCap: Number(capacity),
};

for (let i = 0; i < items.length; i++) {
  if (items[i].size <= greedy.currCap) {
    greedy.contains.push(items[i].index);
    greedy.totalSize += Number(items[i].size);
    greedy.totalValue += Number(items[i].value);
    greedy.currCap -= Number(items[i].size);
  }
}

return greedy;