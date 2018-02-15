const commandLineArgs = require('command-line-args');
const fs = require('fs');
const mongoose = require('mongoose');
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
    fs.readFile(options.src, 'utf8', (err, data) => {
        const matches = data.match(/^(?:(\d+)\s+){3}/mg);
        // console.log(`length ${matches.length}\n0: ${matches[0]}1: ${matches[1]}`);

        const matchO = [];
        let l = 0;
        const byWV = [];
        matches.forEach(arrs => {
            const arr = arrs.split(' ');
            // matchO.push({ id: Number(arr[0]), weight: Number(arr[1]), value: Number(arr[2]) });
            matchO.push(new Knap({ _id: Number(arr[0]), weight: Number(arr[1]), value: Number(arr[2]) }));

            // if (l<10)
            //     console.log(`matchO[l].weight: ${matchO[l].weight} ${matchO[l].value}     arr[1]: ${arr[1]} is Array: ${Array.isArray(arr)}   `);
            // l++;
        });
        Knap.remove((err, removed) => {
            Knap.collection.insert(matchO, (err, knaps) => {
                if (err) {
                    console.log(`error: ${err}`);
                    process.exit(1);
                }
                // checkDups(matchO);
                // matchO.sort((a, b) => {
                //     return (a.weight * 1000000 - a.value * 10000 + a._id)  - (b.weight * 1000000 - a.value * 10000 + a._id);
                // });
                // checkDups(matchO);
                //console.log(`knaps ids[0] type ${typeof knaps.insertedIds[0]}  isArray: ${Array.isArray(knaps.insertedIds)} `);
                const table = new Array(matchO.length);// [matchO.length] [options.threshold];
                let loop = 0
                matchO.forEach((o, i) => {
                    loop++;
                    if (i < 0)
                        console.log(`i: ${i} o.id ${o.id}  o.weight:${o.weight}  o.value: ${o.value}`);
                    if (i === 0) {
                        table[i] = new Array(W);
                        for (let j = 0; j < o.weight; j++)
                            table[i][j] = { objects: [], value: 0 };
                        for (let j = o.weight; j < W; j++) {
                            table[i][j] = { objects: [o], value: o.value };
                            // if (j === o.weight)
                            //     console.log(`o weight: ${o.weight}  o.id: ${o.id}  o.value: ${o.value} i: ${i}, j: ${j} ol: ${table[i][j].objects.length}`);
                        }

                    } else {
                        table[i] = new Array(W);
                        for (let j = 0; j < o.weight; j++)
                            table[i][j] = table[i - 1][j];
                        for (let j = o.weight; j < W; j++) {
                            const remaining = j - o.weight;
                            if (o.id == 671 && j < 0) {
                                console.log(`before o.weight: ${o.weight}  o._id: ${o._id} value: ${o.value}  i: ${i}, j: ${j}, remaining: ${remaining} table[i-1][remaining]: ${table[i - 1][remaining].objects.length}`)
                                logObject(table[i-1][remaining].objects);
                                console.log(`remaining objects ${table[i - 1][remaining].objects}  ${table[i - 1][j].value} ${table[i - 1][j].objects} `);
                            }
                            table[i][j] = (table[i - 1][remaining].value + o.value > table[i - 1][j].value) ?
                                { objects: [].concat(table[i - 1][remaining].objects, [o]), value: table[i -1][remaining].value + o.value } :
                                table[i - 1][j];
                            if (o.id == 671 && j < 0) {
                                console.log(`after table[i][j].objects: ${table[i][j].objects}`);
                                // logObject(table[i][remaining].objects);
                            }
                        }

                    }
                    if (i == -1) {
                        // console.log(`o.id ${o.id}  o.weight:${o.weight}  o.value: ${o.value}`);
                        logRow(table[i], i);
                    }
                });
                let totalWeight = 0, totalValue = 0, totalW1 = 0;
                const r = table[matchO.length - 1][W - 1];

                for (let i = 0; i < r.objects.length; i++) {
                    totalWeight += r.objects[i].weight;
                    totalValue += r.objects[i].value;
                    if (r.objects[i].weight === 1) totalW1++;
                }
                // // console.log(table[matchO.length - 1][1]);
                // // console.log(table[matchO.length - 1][2]);
                // console.log(`loop : ${loop} result: ${r.objects.length}   totalWeight: ${totalWeight}   totalValue: ${totalValue}  total Weight==1: ${totalW1} `)
                console.log(`total value: ${totalValue}`)
            });
        });
    });
}
main();


