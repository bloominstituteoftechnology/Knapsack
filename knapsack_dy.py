import sys
import time
from functools import reduce
start = time.time()
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
    itemNumber += [int(item[0])]
    size += [int(item[1])]
    totalWeight += int(item[1])
    value += [int(item[2])]
    totalValue += int(item[2])
    ratiosUnsorted  += [[float(item[2]) / float(item[1]), int(item[0])]]

if totalWeight < limit:
    print itemNumber
    print totalValue
    print totalWeight
    sys.exit(0)

ratios = sorted(ratiosUnsorted)
bestCombo = []
currentCombo = []
bestTotalSize = 0
bestTotalValue = 0
guesses = []
for i in range(0, len(ratios)):
    if ratios[i][0] > 1:
        guesses += [ratios[i]]
def knapsack(ratiosLeft, guessArray, guessArraySize, guessArrayValue):
    for item in range(len(ratiosLeft) - 1, -1, -1):
        itemRow = ratiosLeft[item][1]
        itemSize = size[itemRow - 1]
        if guessArraySize + itemSize > limit:
            break
        itemValue = value[itemRow - 1]
        gA = guessArray[:] + [itemRow]
        gAS = guessArraySize + itemSize
        gAV = guessArrayValue + itemValue
        global bestTotalValue
        if gAV > bestTotalValue:
            global bestTotalSize
            global bestCombo
            bestTotalValue = gAV
            bestTotalSize  = gAS
            bestCombo = gA
        modifiedRatios = ratiosLeft[:]
        del modifiedRatios[item]
        knapsack(modifiedRatios, gA, gAS, gAV)

# ratioHalf = 0 - ((len(ratios) - 1) / 2)
knapsack(guesses[:], [], 0, 0)
end = time.time()
print bestCombo
print bestTotalValue
print bestTotalSize
print 'total time ---> %f' % (end - start)