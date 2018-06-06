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

let mutated = lines.map((line, index) => {
  let lineArr = line.split(' ');
  if (index < 3) console.log(lineArr);
  lineArr.push(Number(lineArr[2]) / Number(lineArr[1]));
  if (index < 3) console.log(lineArr);
  return lineArr;
});

let mutateArr = mutated.map((line, index) => {
  if (index < 3) console.log(line);
  return { index: index, ratio: line[3] };
});

mutateArr.sort(function compareNumbers(a, b) {
  return b.ratio - a.ratio;
});

let costSum = 0;
let totalPayoff = 0;
let i = 0;

while (i <= lines.length - 1) {
  costSum += Number(mutated[mutateArr[i].index][1]);
  totalPayoff += Number(mutated[mutateArr[i].index][2]);
  if (costSum > 100) {
    costSum -= Number(mutated[mutateArr[i].index][1]);
    totalPayoff -= Number(mutated[mutateArr[i].index][2]);
  }
  i++;
};

console.log(totalPayoff);
console.log(costSum);