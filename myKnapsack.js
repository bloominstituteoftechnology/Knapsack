const fs = require('fs');
const firstBy = require('thenby');


function loopSack(items, capacity) {

        
        // console.log('preshift', items)

        items.shift()

        // console.log('postshiftpresort', items)

        items.sort(function(item1, item2){

            let item1ValSize = item1.value / item1.size;
            let item2ValSize = item2.value / item2.size;
            return item1ValSize < item2ValSize ? 1 : -1;
        });

        // console.log('postshiftpostsort', sortedItems)

        // console.log('items size', items.size);

        let knap = {
            value: 0,
            size: 0,
            weight: capacity,
            sack: []
        };

        for(let i = 0; i < items.length; i++) {

            if(knap.weight > items[i].size){

                knap.sack.push(items[i].index);

                knap.value += items[i].value;

                knap.size += items[i].size;

                knap.weight -= items[i].size;

            }
          
            }

        return knap;


        // knap.sack.pop()
        
        // return knap;
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