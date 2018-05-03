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

  let arr = file.trim().split('\n');
  const n = arr.length;
  values.push(0);
  weights.push(0);
  for(let e = 0; e < n; e++) {
    out = arr[e].split( ' ' );
    values.push(+out[2]);
    weights.push(+out[1]);
  }
  // const lines = file.trim().split(/[\r\n]+/); //----- alt version, slightly slower (probably regex)
  // const n = lines.length;
  // for (let l of lines) {
    //   const [index, weight, value] = l.split(/\s+/);
    //   values.push(+value);
    //   weights.push(+weight);
    // }

  const start = Date.now();
  for(let i = 0; i < n; i++) {
    table[i] = [];
  }

  for(let j = 0; j < capacity; j++) {
    table[0][j] = 0;
  }
  // console.log('TABLE: ', table);

  for(let i = 1; i < n; i++) {
    for(let j = 0; j < capacity; j++) {
      if(weights[i] > j) {
        table[i][j] = table[i - 1][j];
      } else {
        table[i][j] = Math.max(table[i - 1][j], table[i - 1][j - weights[i]] + values[i]);
      }
    }
  }
  const end = Date.now();

  // console.log('arr: ', arr);
  // console.log('val: ', values);
  // console.log('wgt: ', weights);
  // console.log('TABLE: ', table);
  console.log('TIME: ', ((end - start) / 1000).toFixed(4));
  console.log('SOLUTION: ', table[n - 1][capacity - 1]);
};

Main();