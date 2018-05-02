const fs = require('fs');

const args = process.argv.slice(2);

if (args.length != 2) {
    console.error("usage: lootbot loot.txt bag_capacity");
    process.exit(1);
}

const filename = args[0];
const capacity = args[1];

let file;
file = fs.readFileSync(filename);

const mask = /(\d*) (\d*) (\d*)/g;

const lootArray = [];
let lootFound = mask.exec(file);
while(lootFound !== null) {
  lootArray.push({
    id: parseInt(lootFound[1]),
    weight: parseInt(lootFound[2]),
    value: parseInt(lootFound[3]),
  });
  lootFound = mask.exec(file);
}

const valuateBag = (bagOfLoot) => {
  let value = 0;
  bagOfLoot.forEach(loot => {
    value += loot.value;
  });
  console.log("test");
  return value;
}

const weighBag = (bagOfLoot) => {
  let weight = 0;
  bagOfLoot.forEach(loot => {
    weight += loot.weight;
  });
  return weight;
}

const getPossibleLoots = (availableLoot) => {
  possibleLootCombos = [];
  for (let i = 0; i<availableLoot.length; i++) {
    for (let j = i; j<availableLoot.length; j++) {
      const someLootCombo = [];
      for (let k = i; k<=j; k++) {
        someLootCombo.push(availableLoot[k]);
      }
      possibleLootCombos.push(someLootCombo);
    }
  }
  return possibleLootCombos;
}

const possibleLootBags = getPossibleLoots(lootArray);

const lightEnoughLootBags = [];
possibleLootBags.forEach(bag => {
  console.log(`Bag weighs : ${weighBag(bag)}`);
  if (weighBag(bag) <= capacity) lightEnoughLootBags.push(bag);
})
console.log(lightEnoughLootBags);
let bestLootBag = lightEnoughLootBags[0];
lightEnoughLootBags.forEach(bag => {
  console.log("Going to valuate this bag: ", bag, "\n");
  const valueOfThisBag = valuateBag(bag);
  if (valuateBag(bag) > valuateBag(bestLootBag)) {
    console.log("Found a better bag : ", bag, "\n");
    return bestLootBag = bag;
  }
});
console.log("Best possible combination of loot:\n", bestLootBag);
console.log("Total value looted: ", valuateBag(bestLootBag));