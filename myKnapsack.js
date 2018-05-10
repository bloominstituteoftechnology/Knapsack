const fs = require('fs');
const firstBy = require('thenby');

function loopKnapsack(items, capacity) {

    // items.sort(function (b, a) {
    //     // return a.value - b.value;
    //     // b.size - a.size;
    //     // return(b, a);

    //     // if(a.size > b.size) return -1;
    //     // if(a.size < b.size) return 1;

    //     // if(a.value > b.value) return 1;
    //     // if (a.value < b.value) return -1;

    //     return a.value - b.value && b.size + a.size;

    // })

    // for(let i = 1; i < items.length; i++){
    //     let sorter;
    //     if (items[i].value > items.value){
    //       return sorter = items[i].length++
    //     }
        // if(items[i].size < items.size){
        //     items[i].size.length++
        // }
    
        items.sort(function(item1, item2){

            let item1ValSize = item1.value / item1.size;
            let item2ValSize = item2.value / item2.size;
            return item1ValSize < item2ValSize ? 1 : -1;
        }

        //     firstBy(function (b, a) { return b.value - a.value })
        //     .thenBy(function (b, a { return b.size - a.size })


        // }
    )

        let knap = {
            value: 0,
            size: 0,
            sack: []
        };

        while(knap.size <= capacity ){
                
             for(let i = 0; i < items.length; i++) {

               return knap.sack = items.slice([i]);

            }

        return knap;    
    }

        // for(let i = 0; i < knap.sack.length; i++){

        //     if(knap.sack.length == 0) {
        //         return 0;
        //     }
        //     else{
        //         return knap.size =+ knap.sack[i].size;
        //     }

        //     while(knap.size != capacity){

        //         // for(let i = 0; i < items.length; i++){

        //         //     if(items[i].value < items.value){
                        
        //         //     }
        //         // }

        //         items.slice()
                
                
        //     }
            
        // }






    console.log(items);


    }


    // if (i == 0) {
    //     return {
    //       value: 0,
    //       size: 0,
    //       chosen: []
    //     };
    //   }

    // else if(items[i].size > size) {
    //     for(let i = items[i].size; i > size; i--)
    // }
    

    
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

console.log("Naive Recursive implementation: ", loopKnapsack(items, capacity));