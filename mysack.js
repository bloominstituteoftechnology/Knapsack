
var fs = require('fs');


// fs.readFile('./data/large1.txt', 'utf8', function(err, data) {  
fs.readFile(process.argv[2], 'utf8', function(err, data) {  
    // './data/medium1.txt'
    if (err) throw err;

    let dataArray = data
        .split('\n')
        .reduce((res, item, i) => {
            if(!item) {
                return res
            }
            const line = item.split(' '); // 1 42 81
            res[i] = { item: Number(line[0]), size: Number(line[1]), val: Number(line[2]), score: Number(line[2]/line[1])}
            return res;
        }, [])
  
function sortedArray(dataArray) {
    for (let i = 0; i < dataArray.length; i++) {
        let temp = dataArray[i];
        let j = i -1;
        while (j>= 0 && dataArray[j].score > temp.score) {
            dataArray[j +  1] = dataArray[j];
            j--;
            //console.log(dataArray[j]);
        }
        dataArray[j + 1] = temp;
    }
    return dataArray;
}
 

function fillSack(dataArray) {
    // console.log(dataArray.length);
    let sackLevel = 0;
    let sackSize = process.argv[3];
    let totVal  = 0;
    let items = [];

    for(i = dataArray.length - 1; i >= 0; i--) {
        if ((sackLevel <= sackSize) && (dataArray[i].size <= (sackSize - sackLevel))) {
            items.push(dataArray[i].item);
            sackLevel += dataArray[i].size;
            totVal += dataArray[i].val;
        } 
    }
  //  console.log(sackLevel);   
    console.log("Items to Select:" , items);
    console.log("Total cost: " , sackLevel);
    console.log("Total value: " , totVal);
    
}
// console.log(dataArray);
sortedArray(dataArray);
// console.log(dataArray);
fillSack(dataArray);
//console.log(sackLevel);


    })

 

  
 

// console.log(stuff);

// stuff.map((print) => {
//     return print; // console.log("here is a print of" + print);
// });


// run through nums and create ratio of ranking. save top and track how full sack is
// each row converts into a struct with VC (value cost ratio) and sorted. then plugged in as per weight. col3/col2 = VC. 

// fs.readFile('data/small1.txt', (err, data) => {
//     if (err) {
//       console.error('Could not find file')
//       process.exit(1)
//     }
//     const dataArray = data
//       .toString()
//       .split('\n')
//       .reduce((res, item, i) => {
//         if (!item) {
//           return res
//         }
//         const line = item.split(' ') // 1, 42, 81
//         res[i] = { item: line[0], size: Number(line[1]), val: Number(line[2]) }
//         return res;
//       }, [])
//   })