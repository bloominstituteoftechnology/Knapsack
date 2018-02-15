#!/usr/bin/env node
const fs = require('fs');

const readFileFromDisk = file => new Promise((resolve, reject) => {
  fs.readFile(file, 'utf-8', (error, data) => error ? reject(error) : resolve(data));
});
const ensureArgs = args => {
  const requiredArgs = args.slice(2);
  requiredArgs.length < 2 && (() => { throw new Error('File and threshold arguments are required')})();
  const file = requiredArgs[0];
  const threshold = requiredArgs[1].includes('--threshold=') ? parseInt(requiredArgs[1].replace('--threshold=', '')) : null;
  !!threshold || !(Number.isNaN(threshold)) || (() => { throw new Error('Invalid threshold: Must be a number')})();
  return { file, threshold }
}
const formatData = data => data.split('\n').reduce((arr, line) => {
  const row = line.split(' ');
  return row.length === 3 ? [
    ...arr,
    {
      item: row[0],
      weight: row[1],
      value: row[2]
     }
  ] : arr 
}, []);
const createtable = (rows, cols) => (new Array(rows+1)).fill(0).map(row => (new Array(cols+1).fill(0)));
function calculateMaxValueFromTable(items, maxWeight, table, row, column) {
  if(row === 0 || column === 0) {
    return 0;
  }
  const currentItem = items[row-1];
  const currentWeight = parseInt(currentItem.weight);
  const currentValue = parseInt(currentItem.value);
  const canSelectCurrentItem = currentWeight <= column;
  const prvValue = table[row - 1][column];
  // console.log('current item', currentItem, 'row', row)
  return canSelectCurrentItem ? Math.max(currentValue + table[row - 1][column - currentWeight], prvValue) : prvValue;
}
const generatePossibilityTable = (items, tableIn, threshold) => {
  const table = [...tableIn];
  for(let row = 0; row < table.length; row++) {
    let test = 0;
    for(let column = 0; column < threshold+1; column++) {
      table[row][column] = calculateMaxValueFromTable(items, column, table, row, column);
     
    }
    // console.log(table[row].join(' '));
  }
  return table;
}
const extractBestKnapsack = (items, table, threshold) => {
  let rowsLeft = items.length;
  let weightLeft = threshold;
  const itemsIncluded = [];
  while(rowsLeft > 0 &&  weightLeft > 0) {
    // console.log('weightLeft', weightLeft);
    if(table[rowsLeft][weightLeft] != table[rowsLeft-1][weightLeft]) {
      itemsIncluded.push(rowsLeft);
      weightLeft -= items[rowsLeft-1].weight;
    }
    rowsLeft--;
  }
  return itemsIncluded.map(item =>  items[item-1] );
  // console.log(table[rowsLeft][weightLeft], table[0].length);
}

const optimizeKnapsack = (items, threshold) => {
  const defaultKnapsack = {
    items: [],
    cost: 0,
    value: 0
  }
  if (threshold <= 0) return defaultKnapsack;

  const table = createtable(items.length, threshold);
  const possibilities = generatePossibilityTable(items, table, threshold);
  const bestItems = extractBestKnapsack(items, possibilities, threshold);
  return bestItems;
}

async function run() {
  try {
    const { file, threshold } = ensureArgs(process.argv);
    const data = await readFileFromDisk(file);
    const formattedData = formatData(data);
    // console.log(formattedData.length);
    const knapsack = optimizeKnapsack(formattedData, threshold);
    console.log(`
    Items to select: ${knapsack.map(item => item.item).join(", ")}
    Total Weight: ${ knapsack.reduce((weight, item) => weight + parseInt(item.weight), 0)}
    Total Value: ${ knapsack.reduce((value, item) => value + parseInt(item.value), 0)}
    
  `)
  } catch (e) {
    console.error(e);
  }
}
run();