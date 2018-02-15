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
const createTabel = (rows, cols) => (new Array(rows)).fill(0).map(row => (new Array(cols).fill(0)));

const optimizeKnapsack = (data, threshold) => {
  const defaultKnapsack = {
    items: [],
    cost: 0,
    value: 0
  }
  if (threshold <= 0) return defaultKnapsack;
  const tabel = createTabel(data.length, threshold+1);
}

async function run() {
  try {
    const { file, threshold } = ensureArgs(process.argv);
    const data = await readFileFromDisk(file);
    const formattedData = formatData(data);
    const knapsack = optimizeKnapsack(formattedData, threshold);
  } catch (e) {
    console.error(e);
  }
}
run();