const commandLineArgs = require('command-line-args');
const fs = require('fs');
// const mongoose = require('mongoose');
const readline = require('readline');

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
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
    let loop = 0;
    let matchO = [];
    const table = new Array(2);
    rl.on('line', function (data) {

        const matches = data.match(/^(\d+)\s+(\d+)\s+(\d+)/);
        // console.log(`data: |${data}| matches: ${matches} matches.length: ${matches.length}  `);
        if (matches === null) {
            console.log(`null match, data: ${data}`);
            return;
        }
        runRing({ _id: Number(matches[1]), weight: Number(matches[2]), value: Number(matches[3]) });
    });
    above = (i) => {
        return i === 0 ? 1 : i - 1;;
    }
    function runRing(o) {
        if (loop === 0) {
            table[0] = new Array(W);
            for (let j = 0; j < o.weight; j++)
                table[0][j] = { objects: [], value: 0 };
            for (let j = o.weight; j < W; j++) {
                table[0][j] = { objects: [o], value: o.value };
            }

        } else {
            const i = loop % 2;
            table[i] = (table[i] === undefined ? new Array(W) : table[i]);
            for (let j = 0; j < o.weight; j++)
                table[i][j] = table[above(i)][j];
            for (let j = o.weight; j < W; j++) {
                const remaining = j - o.weight;
                table[i][j] = (table[above(i)][remaining].value + o.value > table[above(i)][j].value) ?
                    { objects: [].concat(table[above(i)][remaining].objects, [o]), value: table[above(i)][remaining].value + o.value } :
                    table[above(i)][j];
            }
        }
        loop++;
    }

    rl.on("close", () => {
        let totalWeight = 0, totalValue = 0, totalW1 = 0;
        const r = table[above(loop % 3)][W - 1];

        for (let i = 0; i < r.objects.length; i++) {
            totalWeight += r.objects[i].weight;
            totalValue += r.objects[i].value;
            if (r.objects[i].weight === 1) totalW1++;
        }
        console.log(`${options.src} ${options.threshold} total value: ${totalValue}`);
        process.exit(0);
    });
}
main();


