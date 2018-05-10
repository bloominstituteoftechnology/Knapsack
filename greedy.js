const fs = require('fs');
const filedata = fs.readFileSync('./medium2.txt', 'utf8');

//take lines from file input data and split them by line
const lines = filedata.trim().split(/[\r\n]+/g);

// let lines = fullString.split('\n');
console.log(lines[1]);

//Make a custom array of lines ending in the ratio of PAYOFF/COST
let mutatedLines = lines.map((line, index) => {
  //Split each line by space into an array of each number: '2 51 76' -> [2, 51, 76]
  let lineArr = line.split(' ');
  console.log(index);
  if (index < 3) console.log(lineArr);

  //Add the ratio of the payoff/cost to the end of the array: ['1', '18', '100'] -> ['1', '18', '100', '5.555']
  lineArr.push(Number(lineArr[2]) / Number(lineArr[1]));
  if (index < 3) console.log(lineArr);
  return lineArr;
});

console.log(mutatedLines[0].slice(3)[0]);
console.log(mutatedLines[0]);

// Create an array of objects from the custom array above
// Containing the index and the ratio of each LINE in order to sort
let doubleMutate = mutatedLines.map((line, index) => {
  if (index < 3) console.log(line);

  return { index: index, ratio: line[3] };
});

console.log(doubleMutate[0], doubleMutate[1], doubleMutate[2]);

// Sort the array of objects containing the ratio and index by RATIO DESCENDING
doubleMutate.sort(function compareNumbers(a, b) {
  return b.ratio - a.ratio;
});

console.log(
  doubleMutate[0].index,
  doubleMutate[1].index,
  doubleMutate[2].index,
  doubleMutate[3].index,
  doubleMutate[4].index
);

// Running sum of cost that must be less than totalCost
let costSum = 0;

// Running sum of the total payoff
let totalPayoff = 0;

// tracking variable to make sure
let i = 0;

// while we haven't reached the end of the file
while (i <= lines.length - 1) {
  // Add to the running sum the cost of the line with the highest ratio
  // Starting at 0 because we sorted above to have highest ratio first
  costSum += Number(mutatedLines[doubleMutate[i].index][1]);
  // Add onto the running sum of the total payoff
  totalPayoff += Number(mutatedLines[doubleMutate[i].index][2]);
  // If we have gone over the total cost(costSum)...
  if (costSum > 100) {
    // Then we undo the additions above and continue looping
    costSum -= Number(mutatedLines[doubleMutate[i].index][1]);
    totalPayoff -= Number(mutatedLines[doubleMutate[i].index][2]);
  }
  i++;
}

console.log(totalPayoff);
console.log(mutatedLines[doubleMutate[0].index]);
console.log(doubleMutate[0].index);
