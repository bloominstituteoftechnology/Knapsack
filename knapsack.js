const fs = require('fs');

// takes in txt data file
const readFile = fs.readFileSync('./data/small2.txt','utf-8');
const rows = readFile.trim().split(/[\r\n]+/g);// and splits it upon each new line
rows.pop();
console.log(rows);
let knapSize = rows.length;

for(let i = 0; i < rows.length; i++){
  rows[i].concat(' ');//needs variable? idk..,, split()?
  weightArray.push(parseInt(temp[1]))
  valueArray.push(parseInt(temp[2]))
}

let capacity = 100;
function knapSack(capacity, anArray, item) {
  const state = {
    weightArray: [],
    valueArray: [],
    size: 0,
  };

  if(capacity == 0 || knapsize == (null || undefined)) {
    return 0;
    console.log("YA DONE MESSED UP");
  }

  if (WeightArray[item - 1] > capacity) {
    return knapSack(anArray, capacity, item-1);
  }

  //create an array for switch1
  let array1 = anArray.slice(0);
  array1[item-1] = 1;
  let switchOutput = '';

  let switch1 = knapSack(array1, capacity-weightArray[item-1], item-1) + valueArray[item-1];
  let switch2 = knapSack(anArray, capacity, item-1);

  if (switch1 > switch2) {

  }

}