const commandLineArgs = require('command-line-args');
const fs = require('fs');



const optionDefinitions = [
    { name: 'src', type: String, multiple: false, defaultOption: true },
    { name: 'threshold', type: Number }
]

const options = commandLineArgs(optionDefinitions);
const W = options.threshold;
function logRow(row, rowNumber) {
    console.log(`row Number: ${rowNumber}`);
    for (let i = 0;i<W;i++) {  // for columns
        console.log(`\tobjects column ${i}: objects.length: ${row[i].objects.length} `);
        // for(let j = 0;j<row[i].objects.length;i++)
        //     console.log(`\t${row[i].objects[j].id} ${row[i].objects[j].weight}  ${row[i].objects[j].value}   `)
        console.log(`\tvalue: ${row[i].value}\n`);
    }
}

fs.readFile(options.src, 'utf8', (err, data) => {
    const matches = data.match(/^(?:(\d+)\s+){3}/mg);
    console.log(`length ${matches.length}\n 0: ${matches[0]}\n1: ${matches[1]}`);

    const matchO = [];
    let l = 0;
    matches.forEach(arrs => {
        const arr = arrs.split(' ');
        matchO.push({ id: Number(arr[0]), weight: Number(arr[1]), value: Number(arr[2]) });
        // if (l<10)
        //     console.log(`matchO[l].weight: ${matchO[l].weight} ${matchO[l].value}     arr[1]: ${arr[1]} is Array: ${Array.isArray(arr)}   `);
        // l++;
    });
    matchO.sort((a, b) => {
        return a.weight - b.weight;
    });
    const table = new Array(matchO.length);// [matchO.length] [options.threshold];

    matchO.forEach((o, i) => {
        if (i === 0) {
            table[i] = new Array(W);
            for (let j = 0; j < o.weight; j++)
                table[i][j] = { objects: [], value: 0 };
            for (let j = o.weight; j < W; j++)
                table[i][j] = { objects: [o], value: o.value };
        } else {
            table[i] = new Array(W);
            for (let j = 0; j < o.weight; j++)
                table[i][j] = table[i - 1][j];
            for (let j = o.weight; j < W; j++) {
                const remaining = j - o.weight;
                // console.log(`o.: ${o.weight}  o.id: ${o.id}  i: ${i}, j: ${j}, remaining: ${remaining} table[i][remaining]: ${table[i][remaining]} `)
                table[i][j] = (table[i][remaining].value + o.value > table[i - 1][j].value) ?
                    { objects: [].concat(table[i][remaining].objects, [o]), value: table[i][remaining].value + o.value } :
                    table[i - 1][j];
            }

        }
        if (i == 1) {
            console.log(`o.id ${o.id}  o.weight:${o.weight}  o.value: ${o.value}`);
            logRow(table[i],i);
        }
    });
    let totalWeight = 0;
    const r = table[matchO.length - 1][W - 1];
    for(let i = 0;i<r.objects.length;i++)
        totalWeight += r.objects[i].weight;
    console.log(`result: ${r.objects.length}   totalWeight: ${totalWeight}`)
});



