const fs = require('fs');

// takes in txt data file
const readFile = fs.readFileSync('./data/small2.txt','utf-8');
const rows = readFile.trim().split(/[\r\n]+/g);// and splits it upon each new line
rows.pop();
console.log(rows);
let knapSize = rows.length;

for(let i = 0; i < rows.length; i++){
  let temp = rows[i].split(' '); //needs variable? idk..,, split()? (resolved)
  weightArray.push(parseInt(temp[1]))
  valueArray.push(parseInt(temp[2]))
}

let capacity = 100;
function knapSack(anArray, capacity, knapSize) {
  const state = {
    weightArray: [],
    valueArray: [],
    capacity: 0,
  };

  if(capacity == 0 || knapSize == (null || undefined)) {
    return 0;
    console.log("YA DONE MESSED UP");
  }

  if (WeightArray[item - 1] > capacity) {
    return knapSack(anArray, capacity, knapSize-1);
  }

  //create an array for switch1
  let array1 = anArray.slice(0);
  array1[knapSize-1] = 1;
  let switchOutput = '';

  let switch1 = knapSack(array1, capacity-weightArray[knapSize-1], knapSize-1) + valueArray[knapSize-1];
  let switch2 = knapSack(anArray, capacity, knapSize-1);

  if (switch1 > switch2) {// if knapSackArray(switch1) is > than inputed array(switch two)
    anArray = array1.slice(0);// everything can go in the knapsack easily
    switchOutput = switch1;// output it
  } else {
    switchOutput = switch2;// if the input is greater, it pushes out the result of the knapSack function
  }
  return switchOutput;
}

let ActiveArray = [];
for (let i = 0; i < knapSize; i++) {
  ActiveArray.push(0);
}
return knapSack(ActiveArray,capacity,knapSize);

