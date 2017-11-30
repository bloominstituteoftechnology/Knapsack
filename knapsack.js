const fs = require('fs');
const data = fs.readFileSync(`data/${process.argv[2]}`, 'utf-8')
  .split('\n')
  .slice(0, -1)
  .map(data => data.split(' ').map(num => parseInt(num)).slice(1, 3));

const threshold = parseInt(process.argv[3]
  .split('')
  .filter(val => !isNaN(val))
  .join('')
);



console.log(data, threshold);

const possible = [];

const knapsackHeaps = (data, n = data.length) => {
  if (n === 1) return possible.push(data.slice());
  for(let i = 0; i < n - 1; i++) {
    knapsackHeaps(data, n - 1);
    n % 2 === 0 ?
      [data[i], data[n - 1]] = [data[n - 1], data[i]] :
      [data[0], data[n - 1]] = [data[n - 1], data[0]];
  }
  knapsackHeaps(data, n - 1);
}


const bruteForce = () => {
  knapsackHeaps(data);
  let best_value = 0, best_items = [];
  for (let i = 0; i < possible.length; i++) {
    let current_value = 0, thresh = threshold, count = -1;
    while (thresh >= 0) {
      count++;
      current_value += possible[i][count][1];
      thresh -= possible[i][count][0];
    }
    current_value -= possible[i][count][1];
    
    if (current_value >= best_value) {
      best_value = current_value;
      best_items = possible[i].slice(0, count);
    }
  }
  console.log(best_items, best_value);
}

bruteForce();

const ratio = () => {
  let rData = data;
  rData.forEach(item => item.push(item[1]/item[0]));
  rData = rData.sort((a, b) => b[2] - a[2]);
  return rData;
};

const greed = () => {
  const rData = ratio();
  let thresh = threshold, value = 0, knapped = [];
  for (let i = 0; i < rData.length; i++) {
    if (thresh - rData[i][0] >= 0) {
      thresh -= rData[i][0], value += rData[i][1], knapped.push(rData[i]);
    }
  }
  console.log(knapped, value);
}

greed();