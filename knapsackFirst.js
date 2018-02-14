const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('What is the maximum threshold for your backpack? ', (threshold) => {
    const args = process.argv.slice(2);

    const filename = args[0];

    fs.readFile(filename, 'utf-8', function (err, data) {
        if (err) {
            throw err;
        }

        // Only getting numbers from data
        data = data.match(/[-]{0,1}[\d]*[\.]{0,1}[\d]+/g);

        // Converting data to an array
        let temp = [];

        for (let i = 0; i < data.length; i += 3) {
            temp.push([Number(data[i]), Number(data[i + 1]), Number(data[i + 2])]);
        }

        data = temp;
        // console.log(data);
        
        // Knapsack calculations
        let sumArr = [];
        let sumIndex = [];

        let indexCounter = 0;

        let indices = [];
        let sumWeight = 0;
        let sumValue = 0

        for (let i = 0; i < data.length; i++) {
            // console.log("--------------Beginning of for loop---------------");
            sumWeight = data[i][1];
            sumValue = data[i][2];
            indices.push([data[i][0]]);
            for (let j = i + 1; j < data.length; j++) {
                sumWeight += data[j][1];
                // console.log(`tempSum AFTER:  ${tempSum}.`);
                if (sumWeight > 100) {
                    sumWeight -= data[j][1];
                } else {
                    sumValue += data[j][2];
                    sumArr.push([sumWeight, sumValue]);
                    indices[i].push(data[j][0]);
                }
            }
        }
        // console.log(sumArr.length);
        console.log(indices);

        // Knapsack finding the max value sum
        let maxValue = 0;
        let maxIndex = 0;

        for (let i = 0; i < sumArr.length; i++) {
            if (maxValue < sumArr[i][1]) {
                maxValue = sumArr[i][1];
                maxIndex = i;
            }
        }
        // console.log(sumArr[maxIndex][1]);
        // console.log(indices[maxIndex]);
    });

    rl.close();
});
