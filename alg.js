const fs = require('fs');

const loadFile = () => {
  if(process.argv[2] && process.argv[3]) {
    return fs.readFileSync(process.argv[2], 'utf-8');
  } else {
    console.error('Please supply a file to read from and a knapsack capacity');
    process.exit(0);
  }
};

const Main = () => {
  const table = [];
  const values = [];
  const weights = [];
  const file = loadFile();
  const capacity = process.argv[3];

  let arr = file.split('\n');
  const n = arr.length;
  arr = arr.map(elem => {
    out = elem.split( ' ' );
    values.push(out[1]);
    weights.push(out[2]);
    return out;
  });

  for(let i = 0; i < n; i++) {
    table[i] = [];
  }

  for(let j = 0; j < capacity; j++) {
    table[0][j] = 0;
  }

  for(let i = 1; i < n; i++) {
    for(let j = 0; j < capacity; j++) {
      if(weights[i] > j) {
        table[i][j] = table[i - 1][j];
      } else {
        table[i][j] = Math.max(table[i - 1][j], table[i - 1][j - weights[i]] + values[i]);
      }
    }
  }

  console.log('arr: ', arr);
  console.log('val: ', values);
  console.log('wgt: ', weights);
  console.log('TABLE: ', table);

};

Main();


