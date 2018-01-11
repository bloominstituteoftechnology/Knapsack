import sys
from functools import reduce

filename = sys.argv[1]
limit = int(sys.argv[2])
file_object = open(filename, 'r')
file = file_object.read()
lines = file.split('\n')
itemNumber = []
totalOfSize = 0
size = []
value = []
ratiosUnsorted  = []
for line in lines:
    if len(line) <= 0:
        break
    item = line.split()
    itemNumber += [int(item[0])]
    size += [int(item[1])]
    totalOfSize += int(item[1])
    value += [int(item[2])]
    ratiosUnsorted  += [[float(item[2]) / float(item[1]), int(item[0])]]
ratios = sorted(ratiosUnsorted)

if limit > totalOfSize:
    print totalOfSize

# if the item is a low ratio item that has a size larger than average and the average is greater than one third the limit, remove those items
print len(ratios)
average = totalOfSize / len(ratios)
if average > limit / 4 and len(ratios) > 10:
    for item in range((len(ratios) - 1) / (11/10), -1, -1):
        if size[ratios[item][1] - 1] > average * .7:
            del ratios[item]
        if size[ratios[item][1] - 1] > limit / 2:
            del ratios[item]

print len(ratios)

bestCombo = []
currentCombo = []
bestTotalSize = 0
bestTotalValue = 0

def knapsack(limit, ratiosLeft, guessArray, guessArraySize, guessArrayValue):
    global bestTotalValue
    if guessArrayValue > bestTotalValue:
        global bestTotalSize
        global bestCombo
        bestTotalValue = guessArrayValue
        bestTotalSize  = guessArraySize
        bestCombo = guessArray
    if len(ratiosLeft) == 0:
        return
    for item in range(len(ratiosLeft) - 1, -1, -1):
        itemRow = ratiosLeft[item][1]
        itemSize = size[itemRow - 1]
        itemValue = value[itemRow - 1]
        if itemSize > limit:
            break
        elif guessArraySize + itemSize > limit:
            break
        else:
            gA = guessArray[:] + [itemRow]
            gAS = guessArraySize + itemSize
            gAV = guessArrayValue + itemValue
            modifiedRatios = ratiosLeft[:]
            del modifiedRatios[item]
            knapsack(limit, modifiedRatios, gA, gAS, gAV)


knapsack(limit, ratios[:], [], 0, 0)
print bestCombo
print bestTotalValue
print bestTotalSize