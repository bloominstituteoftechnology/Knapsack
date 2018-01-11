'''
this is working through your solution
'''
import sys
from collections import namedtuple

dataFile = sys.argv[1]
capacity = float(sys.argv[2])

input_data_file = open("data/" + dataFile, 'r')
input_data = ''.join(input_data_file.readlines()).rstrip()

# create an item class with namedtuple
Item = namedtuple("Item", ['index', 'weight', 'value'])

# parse the input
lines = input_data.split('\n')
items = []

for line in lines:
    parts = line.split()
    # Item(index, size, value)
    items.append(Item(int(parts[0]), int(parts[1]), int(parts[2])))

def knapsackRec(items, capacityLeft, totalVal, taken):
    if not items or (len(items) == 1 and items[0].weight > capacityLeft):
        # No remaining items that fit
        return totalVal, taken
    elif len(items) == 1:
        # Last item and it fits, take it
        taken[items[0].index - 1] = 1
        totalVal += items[0].value
        return totalVal, taken
    elif capacityLeft > items[0].weight:
        # Recurse cases of taking item/not taking item, return max
        new_taken = taken[:]  # Copy to avoid marking everything taken
        new_taken[items[0].index - 1] = 1
        return max(
            knapsackRec(items[1:], capacityLeft - items[0].weight,
                        totalVal + items[0].value, new_taken),
            knapsackRec(items[1:], capacityLeft, totalVal, taken),
            key=lambda tup: tup[0]
        )
    else:
        # Doesn't fit, just skip and recurse on rest
        return knapsackRec(items[1:], capacityLeft, totalVal, taken)


print knapsackRec(items, capacity, 0, [0] * len(items))
