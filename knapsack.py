#!/usr/bin/python

import sys
from collections import namedtuple

Item = namedtuple("Item", ["index", "size", "value"])


def knapsack_solver(items, capacity):
    # !!!! IMPLEMENT ME
    # start here
    # N/A   || lower is better || higher is better
    # index ||    size/cost    || value/payoff
    """ check to take most valuable items with least 
    cost first, make sure sum does not exceed backpack 
    size return indexed items
    """


if __name__ == "__main__":
    if len(sys.argv) > 1:
        capacity = int(sys.argv[2])
        file_location = sys.argv[1].strip()
        file_contents = open(file_location, "r")
        items = []

        for line in file_contents.readlines():
            data = line.rstrip().split()
            items.append(Item(int(data[0]), int(data[1]), int(data[2])))

        file_contents.close()
        print(knapsack_solver(items, capacity))
    else:
        print("Usage: knapsack.py [filename] [capacity]")

