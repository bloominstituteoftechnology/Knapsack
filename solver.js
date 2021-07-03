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

for (let i = 0; i < data.length; i++) {
  data[i].push(data[i][2] / data[i][1]);
}

data = data.sort((a, b) => {
  if (a[3] > b[3]) return -1;
  else if (a[3] < b[3]) return 1;
  else return 0;
});

const sack = {
  items: [],
  cost: 0,
  value: 0,
}

for (let i = 0; i < data.length; i++) {
  if (sack.cost + data[i][1] <= 100) {
    sack.items.push(data[i][0]);
    sack.cost += data[i][1];
    sack.value += data[i][2];
  }
}

console.log(sack);