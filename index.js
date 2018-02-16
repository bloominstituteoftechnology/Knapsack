const commandLineArgs = require('command-line-args');
const fs = require('fs');
const mongoose = require('mongoose');
const readline = require('readline');




function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:21078/knapsack');

const KnapSchema = new mongoose.Schema({
    _id: { type: Number, required: true },
    weight: { type: Number, required: true },
    value: { type: Number, required: true }
});
const Knap = mongoose.model('Knap', KnapSchema);
function createKnap(o) {
    const { id, weight, value } = o;
    const newKnap = new Knap(_id = id, weight, value);
    newKnap.save().then(

    );
    return;
}
function findMaxByWeight(weight, callback) {
    Knap.findOne(weight)
        .sort("-value")
        .exec((err, m) => {
            callback(m);
        })
}

const optionDefinitions = [
    { name: 'src', type: String, multiple: false, defaultOption: true },
    { name: 'threshold', type: Number }
]

const options = commandLineArgs(optionDefinitions);
const W = options.threshold + 1


function logObject(o) {
    console.log(`logObject length: ${o.length}`)
    for (let i = 0; i < o.length; i++) {
        process.stdout.write(`${o[i].id} `);
    }
    console.log();
}
function checkDups(m) {
    const dups = [];
    for (let i = 0; i < m.length; i++) {
        const id = m[i].id;
        if (dups.indexOf(id) >= 0)
            console.log(`dup id ${id}`);
        else
            dups.push(id);
    }
    if (dups.length == m.length) console.log('no dups');
}
function logRow(row, rowNumber) {
    console.log(`row Number: ${rowNumber}`);

    for (let i = 0; i < 4; i++) {  // for columns
        console.log(`\tobjects column ${i}: objects.length: ${row[i].objects.length} `);
        const dups = [];
        for (let j = 0; j < row[i].objects.length; j++) {
            console.log(`\t${row[i].objects[j].id} ${row[i].objects[j].weight}  ${row[i].objects[j].value} j: ${j}  `)
            const id = row[i].objects[j].id;
            if (dups.indexOf(id) >= 0)
                console.log(`dup id: ${id}`)
            else
                dups.push(id);
        }
        console.log(`\tvalue: ${row[i].value}\n`);
    }
}
async function main() {
    const rl = readline.createInterface({
        input: fs.createReadStream(options.src),
        terminal: false
    });
    const atATime = 1000;
    let loop = 0;
    let matchO = [];
    let iOffset = 0;
    const table = new Array(atATime + 1);// [matchO.length] [options.threshold];
    tableLastIndex = -1;
    rl.on('line', function (data) {

        const matches = data.match(/^(\d+)\s+(\d+)\s+(\d+)/);
        // console.log(`data: |${data}| matches: ${matches} matches.length: ${matches.length}  `);
        if (matches === null) {
            console.log(`null match, data: ${data}`);
            return;
        }
        matchO.push(new Knap({ _id: Number(matches[1]), weight: Number(matches[2]), value: Number(matches[3]) }))

        // do {
        if ((loop % atATime) === 0) {
            if (matchO.length > 0) {
                if (tableLastIndex >= 0) {
                    const last = table.slice(tableLastIndex,tableLastIndex + 1);
                    table[0] = last[0];
                    iOffset = 1;
                    tableLastIndex = 0;
                }
                runMatchO();
                matchO = [];
            }
            if ((loop % 100000) === 0) console.log(`loop: ${loop}`);
        }
        loop++;

    });
    function runMatchO() {
        matchO.forEach((o, I) => {
            let i = I + iOffset;
            if (iOffset === 0) {
                table[i] = new Array(W);
                for (let j = 0; j < o.weight; j++)
                    table[i][j] = { objects: [], value: 0 };
                for (let j = o.weight; j < W; j++) {
                    table[i][j] = { objects: [o], value: o.value };
                }
            } else {
                table[i] = (table[i] === undefined ? new Array(W) : table[i]);
                for (let j = 0; j < o.weight; j++)
                    table[i][j] = table[i - 1][j];
                for (let j = o.weight; j < W; j++) {
                    const remaining = j - o.weight;
                    table[i][j] = (table[i - 1][remaining].value + o.value > table[i - 1][j].value) ?
                        { objects: [].concat(table[i - 1][remaining].objects, [o]), value: table[i - 1][remaining].value + o.value } :
                        table[i - 1][j];
                }
            }
            tableLastIndex = i;
        });
    }

    rl.on("close", () => {
        // console.log(`tableLastIndex: ${tableLastIndex}  matchO.length: ${matchO.length} `)
        if (matchO.length > 0) {
            if (tableLastIndex >= 0) {
                const last = table.slice(tableLastIndex,tableLastIndex + 1);
                table[0] = last[0];
                iOffset = 1;
                tableLastIndex = 0;
            }
            runMatchO();
        }
        let totalWeight = 0, totalValue = 0, totalW1 = 0;
        const r = table[tableLastIndex][W - 1];

        for (let i = 0; i < r.objects.length; i++) {
            totalWeight += r.objects[i].weight;
            totalValue += r.objects[i].value;
            if (r.objects[i].weight === 1) totalW1++;
        }
        // // console.log(table[matchO.length - 1][1]);
        // // console.log(table[matchO.length - 1][2]);
        // console.log(`loop : ${loop} result: ${r.objects.length}   totalWeight: ${totalWeight}   totalValue: ${totalValue}  total Weight==1: ${totalW1} `)
        console.log(`${options.src} ${options.threshold} total value: ${totalValue}`);
        process.exit(0);
    });
    //         });
    //     });
}
main();


