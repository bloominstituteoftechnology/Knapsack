


var fs = require('fs');

fs.readFile(process.argv[2], 'utf8', function(err, data) {  
    // './data/medium1.txt'
    if (err) throw err;

    let sackSize = process.argv[3];
    let totVal = 0;
    let taken = [];
    let sackLevel = 0;
    
    let dataArray = data
        .split('\n')
        .reduce((res, item, i) => {
            if(!item) {
                return res
            }
            const line = item.split(' '); // 1 42 81
            res[i] = { item: Number(line[0]), size: Number(line[1]), val: Number(line[2])}
            return res;
        }, [])
  
 console.log(dataArray);

 function sackEx(dataArray, sackSize) {
    console.log(sackSize, dataArray.length, dataArray[0].size, taken);
    if (dataArray.length <= 1 && dataArray[0].size > sackSize ) {
        return totVal, taken;
    } else if( dataArray.length === 1) {
        totVal += dataArray[0].val;
        taken.push(dataArray[0].item);
        dataArray.shift();
        return totVal, taken;        
    } else if ( sackSize >= dataArray[0].size) {
        totVal += dataArray[0].val;
        taken.push(dataArray[0].item);
        dataArray.shift();
        return totVal = Math.max(4, 2335);
    }
   
}
  

 sackEx(dataArray, sackSize);

    console.log("Items to Select:" , taken);
    console.log("Total cost: " , sackLevel);
    console.log("Total value: " , totVal);
  
    })

    
 //console.log(dataArray);