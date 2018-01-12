module.exports = (store) => {
    // Start counting...
    const startTime = process.hrtime();
    console.log(`Started running: ${startTime}`);
    // Ratios to compare with
    const ratios = [];

    // Iterate over the values
    for (let i = 0; i < store.values.length; i++) {
        // Push the pair to the ratio array
        // could custom sort with insert sort here
        ratios.push({
            ratio: store.values[i] / store.weights[i],
            weight: store.weights[i],
            value: store.values[i],
            index: i
        });
        // Set Average value sum
        store.averages.value += parseInt(store.values[i]);
        // Set average weight sum
        store.averages.weight += parseInt(store.weights[i]);
    }
    // Calculate average of total value
    store.averages.value = store.averages.value / store.values.length;
    // Calculate average of total weight
    store.averages.weight = store.averages.weight / store.weights.length;

    // Sort the ratios by how high their ratio is
    ratios.sort((a, b) => {
        if (a.ratio > b.ratio) {
            return -1;
          }
          if (a.ratio < b.ratio) {
            return 1;
          }
          // a must be equal to b
          return 0;
    });

    // Exit flag
    let exit = false;
    // count j
    let j = 0;
    // Previously found indeces
    let used = [];
    // Loop through until Exit flag...
    while (!exit) {
        exit = true;
        // loop over while j isn't out of range and nothing called the exit flag
        while (j < ratios.length) {
            // Log for visuals...
            //ßconsole.log('capacity: ', store.capacity, 'weight: ', ratios[j].weight, 'value: ', ratios[j].value);
            // weight
            const w = parseInt(ratios[j].weight);
            if (w <= store.capacity && !used.includes(ratios[j].index)) {
                // subtract weight from capacity
                store.capacity = store.capacity - w;
                // add ratio to items used array
                store.items.push(ratios[j]);
                // add to used
                used.push(ratios[j].index);
                exit = false;
                if (store.capacity === 0) exit = true;
            }
            j++;
        }
    }
    // Finish counting time...
    const endTime = process.hrtime();
    console.log(`Finished running: ${endTime}`);
    console.log(`Total Run Time: ${process.hrtime(startTime)}`);
    // return store to the program
    return store;
};
