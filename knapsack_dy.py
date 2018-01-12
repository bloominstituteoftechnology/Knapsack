import sys
import time
from functools import reduce
start = time.time()
filename = sys.argv[1]
limit = int(sys.argv[2])
file_object = open(filename, 'r')
file = file_object.read()
lines = file.split('\n')
file_object.close()
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
avgSize = totalWeight / len(ratios)
bestCombo = []
currentCombo = []
bestTotalSize = 0
bestTotalValue = 0
guesses = []
endArray = []
endSize = 0
endValue = 0


if len(ratios) >= 200:
    #this spot allows for cutting off the bottom of the knapsack
    guesses += ratios[:]
else:
    guesses += ratios[:]


perms = [] #tracks how many times the best value was found
def knapsack(ratiosLeft, guessArray, guessArraySize, guessArrayValue):
    for item in range(len(ratiosLeft) - 1, -1, -1):
        itemRow = ratiosLeft[item][1]
        itemSize = size[itemRow - 1]
        if guessArraySize + itemSize > limit:
            break
        itemValue = value[itemRow - 1]
        gA = sorted(guessArray[:] + [itemRow])
        gAS = guessArraySize + itemSize
        gAV = guessArrayValue + itemValue
        global bestTotalValue
        if guessArraySize >= int(limit * 0.95) and guessArrayValue >= int(bestTotalValue * 0.75):
            break
        if gAV > bestTotalValue:
            print gAV
            global bestTotalSize
            global bestCombo
            bestTotalValue = gAV
            bestTotalSize  = gAS
            bestCombo = gA
            global perms
            perms = [bestCombo] # assigns the best combination to perms, resets the count made on line 80
        if gA == perms[0]:  #if the current combination is the same as the best combination
            perms += [gA]   #add another copy of this combo to the array
        if len(perms) > 47: #THIS '47' IS THE THRESHOLD. THE LOWER THE NUMBER, THE FASTER; THE HIGHER THE NUMBER, MORE ACCURATE
            return
        modifiedRatios = ratiosLeft[:]
        del modifiedRatios[item]
        knapsack(modifiedRatios, gA, gAS, gAV)

knapsack(guesses[:], endArray[:], endSize, endValue)
end = time.time()
print '--------BEST-COMBO----------'
print bestCombo
print '\n----------VALUE-------------'
print bestTotalValue
print '\n----------SIZE--------------'
print bestTotalSize
print '\n----------------------------'
print 'total time ---> %f' % (end - start)