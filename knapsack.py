#!/usr/bin/python

import sys
from collections import namedtuple
from operator import attrgetter, itemgetter

Item = namedtuple("Item", ["index", "size", "value", "ratio"])


# def small_knapsack_solver(items, capacity):
#     knapsack = []
#     secondknapsack = []
#     cost = 0
#     secondcost = 0
#     average_value = median(items[2])
#     for item in sorted(items, key=attrgetter("value"), reverse=True):
#         if item.size <= capacity:
#             if cost + item.size <= capacity:
#                 knapsack.append(item)
#                 cost += item.size
#     for item in sorted(items, key=attrgetter("size")):
#         if item.size <= capacity and item.value >= average_value:
#             if secondcost + item.size <= capacity:
#                 secondknapsack.append(item)
#                 secondcost += item.size

#     knapswag = sum(item.value for item in knapsack)
#     secondknapswag = sum(item.value for item in secondknapsack)
#     if knapswag > secondknapswag:
#         return [knapswag, knapsack]
#     else:
#         return [secondknapswag, secondknapsack]


# def knapsack_solver(items, capacity):
#     valuesack = []
#     sizesack = []
#     valuecost = 0
#     sizecost = 0
#     for item in sorted(items, key=attrgetter("value"), reverse=True):
#         if item.size <= capacity:
#             if valuecost + item.size <= capacity:
#                 valuesack.append(item)
#                 valuecost += item.size
#             elif valuecost + item.size < capacity:
#                 for sacked in valuesack:
#                     if sacked.value > item.value:
#                         valuesack.remove(sacked)
#                         valuecost - sacked.size
#                         valuesack.append(item)
#                         valuecost + item.size
#     for item in sorted(items, key=attrgetter("size")):
#         if item.size <= capacity:
#             if sizecost + item.size <= capacity:
#                 sizesack.append(item)
#                 sizecost += item.size
#             else:
#                 for sacked in sizesack:
#                     if sacked.value > item.value:
#                         if ((valuecost - sacked.size) + item.size) < capacity:
#                             sizesack.remove(sacked)
#                             sizecost - sacked.size
#                             sizesack.append(item)
#                             sizecost + item.size

#     valuetotal = sum(item.value for item in valuesack)
#     sizetotal = sum(item.value for item in sizesack)

#     if valuetotal > sizetotal:
#         return [valuetotal, valuesack]
#     else:
#         return [sizetotal, sizesack]


def knapsack_solver(items, capacity):
    total_size = 0
    knapsack = []
    for item in sorted(items, key=attrgetter("ratio"), reverse=True):
        if item.size <= capacity:
            if total_size + item.size <= capacity:
                knapsack.append(item)
                total_size += item.size
            elif total_size + item.size < capacity:
                for sacked in knapsack:
                    if sacked.value > item.value:
                        knapsack.remove(sacked)
                        total_size - sacked.size
                        knapsack.append(item)
                        total_size + item.size
    chosen_indexes = []
    value = 0
    for swag in knapsack:
        chosen_indexes.append(swag.index)
        value += swag.value

    return [value, total_size, chosen_indexes]


if __name__ == "__main__":
    if len(sys.argv) > 1:
        capacity = int(sys.argv[2])
        file_location = sys.argv[1].strip()
        file_contents = open(file_location, "r")
        items = []

        for line in file_contents.readlines():
            data = line.rstrip().split()
            items.append(
                Item(
                    int(data[0]),
                    int(data[1]),
                    int(data[2]),
                    int(data[2]) / int(data[1]),
                )
            )

        file_contents.close()
        print(knapsack_solver(items, capacity))
    else:
        print("Usage: knapsack.py [filename] [capacity]")
