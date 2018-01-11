import sys

dataFile = sys.argv[1]
maxWeight = float(sys.argv[2])

with open("data/"+dataFile) as f:
    items = f.readlines()

items = [x.strip() for x in items]

itemObjs = []

for i in items:
	item = i.split(" ")
	itemObj = {}
	itemObj["name"] = item[0]
	itemObj["weight"] = float(item[1])
	itemObj["value"] = float(item[2])
	itemObj["valPerWeight"] = round(itemObj["value"] / itemObj["weight"], 4)

	itemObjs.append(itemObj)

sortedItems = sorted(itemObjs, key=lambda k: k['valPerWeight'], reverse=True)

weightCount = 0.0
itemsSelected = []
totalWeight = 0
totalVal = 0

# sum up highest valPerWeight
for item in sortedItems:
	weightCount += item["weight"]

	if weightCount < maxWeight:
		# print 'adding ' + item['name']
		itemsSelected.append(item["name"])
		totalWeight += item["weight"]
		totalVal += item["value"]

	else:
		break

# check if the last item added can be replaced by the next item in sorted items
# point being you can sneak in a lower ratio item that yields a greater total value sometimes


sys.stdout.write('Items selected: ')
sys.stdout.flush()
for i in itemsSelected: print i,
print "\b"
print "Total weight: " + str(totalWeight)
print "Total value: " + str(totalVal)


"""
Is there a term for this kind of problems of mathy, ambiguous problems?  As a developer I wonder how much of my time with spend with, this mathy-ambiguous problems VS straight-forward–CRUD app code?
"""