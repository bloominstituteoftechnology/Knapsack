#!/usr/bin/python

import sys
from collections import namedtuple
from operator import attrgetter

Item = namedtuple("Item", ["index", "size", "value", "ratio"])


def knapsack_solver(items, capacity):
    total_size = 0
    knapsack = []
    if len(items) > 2:
        for item in sorted(items, key=attrgetter("ratio"), reverse=True):
            if item.size <= capacity:
                if total_size + item.size <= capacity:
                    knapsack.append(item)
                    total_size += item.size
    else:
        for item in sorted(items, key=attrgetter("value"), reverse=True):
            if item.size <= capacity:
                if total_size + item.size <= capacity:
                    knapsack.append(item)
                    total_size += item.size

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
