
const fs = require('fs');

//Declare a weights and values array
let wts= [];
let vals = [];


// Read file and define threshhold
let capacity = 100;
let content = fs.readFileSync('./data/small2.txt','utf-8');
let inputArr = content.split('\n')
inputArr.pop();
console.log(inputArr)


let n = inputArr.length

//Push items to wts and vals array
for(let i = 0; i < inputArr.length; i++){
    let temp = inputArr[i].split(' ');
    wts.push(parseInt(temp[1]))
    vals.push(parseInt(temp[2]))
}
console.log(wts)
//Method 1 with recursion

function knapsack(anyarray,capacity,n){ 
    //Base Case
    if(capacity === 0 || n===0) {
        return 0;
    }
    //If nth items has a weight > capacity
    if(wts[n-1] > capacity){
        return knapsack(anyarray,capacity,n-1)
    }
    //Take the max of 2 case
    //1) If item is selected
    //2) if items is not selected; 
    let max;
    let v1 = anyarray.slice(0);
    v1[n-1] =1;
    let case1 = knapsack(v1,capacity-wts[n-1],n-1)+vals[n-1];
    let case2 = knapsack(anyarray,capacity,n-1)
    if(case1 > case2){
        console.log('from here');
        anyarray=v1.slice(0);
        max =case1;
    } else {
        max = case2;
    }
    console.log(anyarray)
    return(max)
}
let selectedArr = [];
for(let i =0; i <inputArr.length; i++){
    selectedArr.push(0)
}
console.log(knapsack(selectedArr,capacity,n))
console.log(selectedArr)


//Method 2 ...with Dynamic programming

let visited = []
for(let i =0; i<= capacity+1; i++){
    visited[i] =[];
    for(let j =0; j <= n+1; j++){
        visited[i][j] = null
    }
}

function dynamicKs(capacity, i){ 
    if(i >= n-1 || capacity === 0){
        visited[capacity][i] = 0;
        return 0;
    }
    if(wts[i] > capacity){
        if(!visited[capacity][i+1]){
            visited[capacity][i+1] = dynamicKs(capacity,i+1)
        }
        return visited[capacity][i+1]
    }
    //Case1 Items Seleted //Case2 Not selected
    let case1; let case2;
    if(!visited[capacity-wts[i]][i+1]){
        visited[capacity-wts[i]][i+1] = dynamicKs(capacity-wts[i],i+1);
    }
    case1 = visited[capacity-wts[i]][i+1]+vals[i]
    if(!visited[capacity][i+1]){
        visited[capacity][i+1]= dynamicKs(capacity,i+1)
    }
    case2 = visited[capacity][i+1]
    visited[capacity][i] = Math.max(case1,case2)
    return(Math.max(case1,case2))
}
console.log(dynamicKs(capacity,0))


