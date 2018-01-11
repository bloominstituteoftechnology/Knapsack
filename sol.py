'''
this is working through your solution
'''
import sys

dataFile = sys.argv[1]
capacity = float(sys.argv[2])

with open("data/"+dataFile) as f:
    items = f.readlines()

items = [x.strip() for x in items]

itemObjs = []

for i in items:
	item = i.split(" ")
	itemObj = {}
	itemObj["index"] = item[0]
	itemObj["weight"] = float(item[1])
	itemObj["value"] = float(item[2])

	itemObjs.append(itemObj)

# the named numpled things looks awesome
# sortedItems = sorted(itemObjs, key=lambda k: k['value'], reverse=True)

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


print knapsackRec(itemObjs, capacity, 0, 0)
