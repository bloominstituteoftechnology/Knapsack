const fs = require('fs');

const args = process.argv.slice(2);

const filename = args[0];
const threshold = parseInt(args[1]);

let data = fs.readFileSync(filename, 'utf8').split('\r\n');
data.pop(); // remove empty line at end

data = data.map((item) => {
  const obj = {};
  const temp = item.split(" ");
  obj["index"] = temp[0];
  obj["weight"] = parseInt(temp[1]);
  obj["value"] = parseInt(temp[2]);
  return obj;
});

const exhaustive = ((data) => {
  const recurse = ((threshold, weights, values, n) => {
    if (n === 0 || threshold === 0){
      return 0;
    }
    if (weights[n-1] > threshold) {
      return recurse(threshold, weights, values, n-1);
    } else {
      return Math.max(values[n-1] + recurse(threshold-weights[n-1], weights, values, n-1), recurse(threshold, weights, values, n-1));  
    }
  });
  const weights = data.map(arr => arr.weight);
  const values = data.map(arr => arr.value);
  const totalValue = recurse(threshold, weights, values, weights.length);
  console.log(`Total value: ${totalValue}`);
});

const greedy = ((data) => {
  let totalWeight = 0;
  let totalValue = 0;

  const dataCopy = data.slice(); // don't mutate original array
  
  dataCopy.sort((a, b) => {
    return (b.value / b.weight) - (a.value / a.weight);
  });
  
  const result = [];
  const chosenItems = [];
  let index = 0;
  while ((totalWeight < threshold) && (dataCopy[index].weight + totalWeight <= threshold ) && (index < dataCopy.length - 1)) {
    result.push(dataCopy[index]);
    chosenItems.push(dataCopy[index].index);
    totalWeight += dataCopy[index].weight;
    totalValue += dataCopy[index].value;
    index++;
  }
  console.log(`Items to select: ${chosenItems.join(", ")}`);
  console.log(`Total cost: ${totalWeight}`);
  console.log(`Total value: ${totalValue}`);
});

const dynamic = ((data) => {
  const weights = data.map(arr => arr.weight);
  const values = data.map(arr => arr.value);
  const n = weights.length;
  const matrix = Array(n + 1).fill().map(() => Array(threshold + 1).fill(0));
  for (let i = 0; i <= n; i++) {
    for (let j = 0; j <= threshold; j++) {
      if (i === 0 || j === 0) {
        matrix[i][j] = 0;
      }
      else if (weights[i - 1] <= j) {
        matrix[i][j] = Math.max(values[i - 1] + matrix[i - 1][j - weights[i - 1]], matrix[i - 1][j]);
      } 
      else{
        matrix[i][j] = matrix[i - 1][j];
      } 
    }
  }

  const totalValue = matrix[n][threshold];
  let totalWeight = 0;
  let i = n;
  let k = threshold;
  const chosenItems = [];
  while(i > 0 && k > 0) {
    if(matrix[i][k] != matrix[i-1][k]) {
      chosenItems.push(i);
      i--;
      k -= weights[i];
      totalWeight += weights[i];
    } else {
      i--;
    }
  }
  console.log(`Items to select: ${chosenItems.join(", ")}`)
  console.log(`Total cost: ${totalWeight}`);
  console.log(`Total value: ${totalValue}`);
});

// exhaustive(data);  // do not run with the large file
greedy(data);
dynamic(data);
