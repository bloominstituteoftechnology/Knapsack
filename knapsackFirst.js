const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function knapsackExhaustive() {

};

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
    });

    rl.close();
});
