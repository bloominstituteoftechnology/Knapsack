if (process.argv.length < 3){
    console.log(`Filename not provided`);
    process.exit(1);
}

const filename = process.argv[2];
const fs = require("fs");
const originalValues = [];
const solutions = [];
const solutions2 = [];

const incomingData = fs.readFile(filename, 'utf8', (err, data) => {
    if (err) throw err;
    let output = data.split(/\r\n/);
    output.forEach(string => {
        let splitString = string.split(/ /);
        let pushObj = {index: splitString[0], weight: parseInt(splitString[1]), value: parseInt(splitString[2])}
        originalValues.push(pushObj);
    })
})

const bruteForce = (W) => {
    console.log(`Test 1`);
    for (let i = 0; i < originalValues.length; i++){
        console.log(`Test 1.5`);
        let j = i + 1;
        solutions[i] = originalValues[i];
        for (j; j < solutions.length; j++){
            console.log(`Test 2`);
            if (solutions[i].weight + originalValues[j].weight <= W){
                console.log(`Test 3`);
                let pushObj = {
                    index: solutions[i].index + " " + originalValues[j].index,
                    weight: solutions[i].weight + originalValues[j].weight,
                    value: solutions[i].value + originalValues[j].value
                }
                solutions[i] = pushObj;
                solutions2.push(pushObj);
            } else {
                console.log(`Test 4`);
            }
        }
    }
}

// const knapsackFunction = (knapSize) => {
//     for (let i = 1; i <= knapSize; i++){
//         let lootVal;
//         for (let j = 1; j < originalValues.length; i++){
//             if (originalValues[i].size <= i){
//                 lootVal = Math.max(lootVal, originalValues[i].value);
//             }
//         }
//         solutions[k] = {}
//     }
// }

/*Steps:
*1. Store the read values as an array of objects
*2. Create an array of objects with solutions
*3. Iterate over the stored values and then store them in the numbers array
*   3a. Use a for loop that counts from 1 to the size of the sack
*   3b. Use another for loop to iterate over the stored data
*   3c. If the weight of the stored data is less than or equal to the current value in the main loop, store the value compared with Math.max and then set the solution array sub the first value equal to the value stored.
*4. Loop over the finished values array to find the highest value and then print them out
*   4a. Create a temp variable that stores the higest value, then use conditionals to replace it whenever a higher value is iterated over

*/

/*
var solution = [];
var items = problem.items;
var sackSize = problem.knapsack;

solution[0] = 0;
for(var k = 1; k <= sackSize; k++)
{
    var loot = 0;
    for(var i = 1; i < items.length; i++)
    {
        if(k >= items[i].weight)
        {
            loot = Math.max(loot, items[i].value)
        }
    }
    solution[k] = loot;
}
*/