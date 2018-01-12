import sys
from functools import reduce
import time
begin = time.time()
filename = sys.argv[1]
limit = int(sys.argv[2])
file_object = open(filename, 'r')
file = file_object.read()
lines = file.split('\n')
itemNumber = []
size = []
value = []
ratiosUnsorted  = []
for line in lines:
    if len(line) <= 0:
        break
    item = line.split()
    itemNumber += [int(item[0])]
    size += [int(item[1])]
    value += [int(item[2])]
    ratiosUnsorted  += [[float(item[2]) / float(item[1]), int(item[0])]]
ratios = sorted(ratiosUnsorted)
bestCombo = []
currentCombo = []
currentSizeTotal = 0
currentValueTotal = 0
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
end = time.time()
print '|_______________________________________________________|'
print '|-------------------------------------------------------|'
print '|------------Best combination using %i items------------|\n' % len(currentCombo)
print currentCombo
print '\n|-------------------------------------------------------|'
print '|---------------------Total Value-----------------------|'
print '|-------------------------------------------------------|\n'
print '|                         %i' % currentValueTotal
print '\n|-------------------------------------------------------|'
print '|---------------------Total  Size-----------------------|'
print '|-------------------------------------------------------|\n'
print '|                          %i' % currentSizeTotal

print '\n\nTotal Time ---> %f\n' % (end - begin)