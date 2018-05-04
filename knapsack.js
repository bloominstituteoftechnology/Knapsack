const fs = require('fs');

//Declare arrays to hold weights and values

let weight = [];
let val = [];

//Read file add threshold

let capacity = 100;
let content = fs.readFileSync('./data/large1.txt' , "utf-8");
let inputArr = content.split('\n')
inputArr.pop();
console.log(inputArr)

let n = inputArr.length

//Create weight and val arrays

for(let i = 0; i < inputArr.length; i++) {
    let temp = inputArr[i].split('');
    weight.push(parseInt[temp[1]])
    val.push(parseInt(temp[2]))
}

function knapsack(capacity, i) {
    if(capacity === 0 || i >= n - 1) {
        return 0;
    }
    if(weight[i] > capacity) {
        return knapsack(capacity, i + 1)
    }
    let case1 = knapsack(capacity - weight[i], i + 1) +  val[i];
    let case2 = knapsack(capacity, i + 1)
    return(Math.max(case1, case2))
}

console.log(knapsack(capacity, 0))