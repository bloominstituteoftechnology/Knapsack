#!/usr/bin/python

import sys
from collections import namedtuple
from operator import attrgetter

Item = namedtuple("Item", ["index", "size", "value"])  # "ratio"


def knapsack_solver(items, capacity):
    Item = namedtuple("Item", ["index", "size", "value", "ratio"])
    updated_items = []
    for item in items:
        updated_items.append(Item(item[0], item[1], item[2], item[2] / item[1]))
    total_size = 0
    knapsack = []
    #  There is only a point to organizing the data by ratio if there are more than two items
    #  If there are two items or less, organizing by value makes more sense
    for item in sorted(updated_items, key=attrgetter("ratio"), reverse=True):
        if total_size + item.size <= capacity:
            knapsack.append(item)
            total_size += item.size
        elif item.size <= capacity and total_size + item.size >= capacity:
            for swag in knapsack:
                if item not in knapsack:
                    if swag.value < item.value:
                        if swag.size >= item.size:
                            total_size -= swag.size
                            knapsack.remove(swag)
                            total_size += item.size
                            knapsack.append(item)
                        elif sum(item.value for item in knapsack) < item.size:
                            del knapsack[:]
                            total_size = 0
                            total_size += item.size
                            knapsack.append(item)

    chosen_indices = []
    value = 0
    for swag in knapsack:
        chosen_indices.append(swag.index)
        value += swag.value

    return [value, total_size, chosen_indices]


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
                    # int(data[2]) / int(data[1]),
                )
            )

        file_contents.close()
        print(knapsack_solver(items, capacity))
    else:
        print("Usage: knapsack.py [filename] [capacity]")
