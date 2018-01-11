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
totalSize = 0
ratiosUnsorted  = []
for line in lines:
    if len(line) <= 0:
        break
    item = line.split()
    itemNumber += [int(item[0])]
    size += [int(item[1])]
    totalSize += int(item[1])
    value += [int(item[2])]
    ratiosUnsorted  += [[float(item[2]) / float(item[1]), int(item[0])]]
ratios = sorted(ratiosUnsorted)
bestCombo = []
currentCombo = []
average = totalSize / len(size)
currentSizeTotal = 0
currentValueTotal = 0

for i in range(len(ratios) - 1, -1, -1):
    ratios[i] *= average / size[ratios[i][1] - 1]
for i in range(len(itemNumber) - 1, -1, -1):
    itemRow = ratios[i][1] - 1
    itemSize = size[itemRow]
    itemValue = value[itemRow]
    if itemSize > limit:
        break
    elif currentSizeTotal + itemSize > limit:
        break
    else:
        currentCombo += [itemRow]
        currentSizeTotal += itemSize
        currentValueTotal += itemValue

# print itemNumber
# print size
# print value
print currentCombo
print currentValueTotal
print currentSizeTotal