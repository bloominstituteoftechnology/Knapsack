import sys
from functools import reduce

filename = sys.argv[1]
limit = int(sys.argv[2])
file_object = open(filename, 'r')
file = file_object.read()
lines = file.split('\n')
itemNumber = []
size = []
value = []
ratiosUnsorted  = []
totalWeight = 0
totalValue = 0
for line in lines:
    if len(line) <= 0:
        break
    item = line.split()
    ratio = float(item[2]) / float(item[1])
    itemNumber += [int(item[0])]
    size += [int(item[1])]
    totalWeight += int(item[1])
    value += [int(item[2])]
    totalValue += int(item[2])
    ratiosUnsorted  += [[ratio, int(item[0])]]

if totalWeight < limit:
    print itemNumber
    print totalValue
    print totalWeight
    sys.exit(0)

ratios = sorted(ratiosUnsorted)
for abcd in ratios:
    print abcd
bestCombo = []
currentCombo = []
bestTotalSize = 0
bestTotalValue = 0

def knapsack(ratiosLeft, guessArray, guessArraySize, guessArrayValue):
    global bestTotalValue
    if guessArrayValue > bestTotalValue:
        global bestTotalSize
        global bestCombo
        bestTotalValue = guessArrayValue
        bestTotalSize  = guessArraySize
        bestCombo = guessArray
        if guessArraySize == limit:
            return
    if len(ratiosLeft) == 0:
        return
    if guessArraySize > limit * 0.75 and guessArrayValue < bestTotalValue * 0.7:
        return
    for item in range(len(ratiosLeft) - 1, -1, -1):
        itemRow = ratiosLeft[item][1]
        itemSize = size[itemRow - 1]
        itemValue = value[itemRow - 1]
        if guessArraySize + itemSize > limit:
            break
        else:
            gA = guessArray[:] + [itemRow]
            gAS = guessArraySize + itemSize
            gAV = guessArrayValue + itemValue
            modifiedRatios = ratiosLeft[:]
            del modifiedRatios[item]
            knapsack(modifiedRatios, gA, gAS, gAV)


knapsack(ratios[:], [], 0, 0)
print bestCombo
print bestTotalValue
print bestTotalSize