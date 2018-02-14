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
        //console.log(data);
        
        // Knapsack calculations
        let tempSumArr = [];
        let tempSum = 0;
        for (let i = 0; i < data.length; i++) {
            // console.log("--------------Beginning of for loop---------------");
            tempSum = data[i][1];
            for (let j = i + 1; j < data.length; j++) {
                // console.log(`tempSum BEFORE: ${tempSum}.`);
                // console.log(`data[${i}][1] adding to tempSum`);
                tempSum += data[j][1];
                // console.log(`tempSum AFTER:  ${tempSum}.`);
                if (tempSum > 100) {
                    tempSum -= data[j][1];
                } else {
                    tempSumArr.push([i, j, tempSum]);
                }
            }
        }

        // Knapsack finding the max weight sum
        let maxWeight = 0;
        for (let i = 0; i < tempSumArr.length; i++) {
            if (maxWeight < tempSumArr[i][2]) {
                maxWeight = tempSumArr[i][2];
            }
        }
        console.log(maxWeight);
    });

    rl.close();
});
