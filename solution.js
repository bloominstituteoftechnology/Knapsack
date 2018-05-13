if (process.argv.length < 3){
    console.log(`Filename not provided`);
    process.exit(1);
}

const filename = process.argv[2];
const fs = require("fs");
const items = [];

const fileReading = fs.readFile(filename, 'utf8', (err, data) => {
    if (err) throw err;
    let output = data.split(/\r\n/);
    output.forEach(string => {
        let splitString = string.split(/ /);
        let pushObj = {name: splitString[0], weight: parseInt(splitString[1]), value: parseInt(splitString[2])}
        items.push(pushObj);
    })

    main(100);
})

const main = (W) => {
    var bag = items
    // sort items by most value per decagram first
    .sort(function (item1, item2) {
    var item1ValuePerWeight = item1.value / item1.weight;
    var item2ValuePerWeight = item2.value / item2.weight;
    return item1ValuePerWeight < item2ValuePerWeight ? 1 : -1;
    })
    // push items in the bag as long as the weight doesn't exceed 400 decagrams
    .reduce(function (bag, item) {
    var currentBagWeight = bag.reduce(function (weight, item) {
        weight += item.weight;
        return weight;
    }, 0);
    if (currentBagWeight + item.weight < W) {
        bag.push(item);
    }
    return bag;
    }, []);

    // result : compute bag weight (396)
    var bagWeight = bag.reduce(function (weight, item) {
        weight += item.weight;
        return weight;
    }, 0);

    // result : compute bag value (1030)
    var bagValue = bag.reduce(function (value, item) {
        value += item.value;
        return value;
    }, 0);

    // print resoult
    //console.log('weight: ' + bagWeight + '\nvalue: ' + bagValue + '\nitems: ' + bag.map(function (item) { return item.name; }).join(', '));
    console.log(`Items to select: ${bag.map(item => item.name).join(", ")}`);
    console.log(`Total cost: ${bagWeight}`);
    console.log(`Total value: ${bagValue}`);
    // output:
    // weight: 396
    // value: 1030
    // items: map, socks, suntan cream, glucose, note-case, sandwich, sunglasses, compass, banana, waterproof overclothes, waterproof trousers, water
}

