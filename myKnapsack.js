const fs = require('fs');
const firstBy = require('thenby');

function loopSack(items, capacity) {



        items.sort(function(item1, item2){

            let item1ValSize = item1.value / item1.size;
            let item2ValSize = item2.value / item2.size;
            return item1ValSize < item2ValSize ? 1 : -1;
        });

        let knap = {
            value: 0,
            size: 0,
            capacity,
            sack: []
        };

        
        // while(knap.size <= capacity ){

        // let sack = knap.sack
        // let knapSize = knap.size += items.size;
  
        for(let i = 0; i < items.length; i++) {

            knap.sack = items.slice([i, 1]);

            for(let l = 0; l < knap.sack.length; l++){
                knap.size += knap.sack[l].size;
            }

            if(knap.size === capacity){
                return knap;
            }

        }

        // return knap;
    // }
}

const argv = process.argv.slice(2);

// add an error check to check the number of params
if (argv.length != 2) {
  console.error('usage: [filename] [capacity]');
  process.exit(1);
}

const filename = argv[0];
const capacity = argv[1];

// read the file that was passed to our program

const filedata = fs.readFileSync(filename, 'utf8');

const lines = filedata.trim().split(/[\r\n]+/g);

// process the lines 

const items = [];

for (let l of lines) {
  const [index, size, value] = l.split(' ').map(n => parseInt(n));
  
  items[index] = {
    index,
    size,
    value,
  };
}

console.log("loopSack implementation: ", loopSack(items, capacity));