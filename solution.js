
const fs = require('fs');

//Declare a weights and values array
let wts= [];
let vals = [];


// Read file and define threshhold
let capacity = 100;
let content = fs.readFileSync('./data/medium2.txt','utf-8');
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

//Method 1 with recursion

function knapsack(capacity,i){  
    // console.log(selected)
    //Base Case
    if(capacity === 0 || i >= n-1) {
        return 0;
    }
    //If nth items has a weight > capacity
    if(wts[i] > capacity){
        return knapsack(capacity,i+1)
    }

    //Take the max of 2 case
    //1) If item is selected
    //2) if items is not selected; 
    let case1 = knapsack(capacity-wts[i],i+1)+vals[i];
    let case2 = knapsack(capacity,i+1)
    return(Math.max(case1,case2))
}
// console.log(knapsack(capacity,0))


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
        // console.log(visited[])
        visited[capacity][i] = 0;
        return 0;
    }
    if(wts[i] > capacity){
        if(!visited[capacity][i+1]){
            visited[capacity][i+1] = dynamicKs(capacity,i+1)
        }
        return visited[capacity][i+1]
    }
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


