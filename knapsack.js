const fs = require('fs')

fs.readFile('data/small2.txt', (err, data) => {
  if (err) {
    console.error('Could not find file')
    process.exit(1)
  }
  const dataArray = data
    .toString()
    .split('\n')
    .reduce((res, item, i) => {
      if (!item) {
        return res
      }
      const line = item.split(' ') // 1, 42, 81
      res[i] = { item: line[0], size: Number(line[1]), val: Number(line[2]) }
      return res;
    }, [])

    console.log(dataArray);
    let weight = 0;
    let value = 0;
        for (i = 0; i < dataArray.length; i++) {
            for (j = i+1; j < dataArray.length; j++) {
                for (k = j+1; k < dataArray.length; k++) {
                weight = dataArray[i].size+dataArray[j].size+dataArray[k].size;
                if (weight <= 100) {
                    if ((dataArray[i].val+dataArray[j].val+dataArray[k].val) > value) {
                        value = dataArray[i].val+dataArray[j].val+dataArray[k].val;
                        console.log(`Items to select: ${dataArray[i].item}, ${dataArray[j].item}, ${dataArray[k].item}`);
                        console.log(`Total cost: ${weight}`);
                        console.log(`Total value: ${value}`);
                    };
                }
            }
        }
    }
})