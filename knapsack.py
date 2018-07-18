#!/usr/bin/python

import sys
from collections import namedtuple

Item = namedtuple('Item', ['index', 'size', 'value'])


def knapsack_solver(items, capacity):
    a = sorted(items, key=lambda x: x[2], reverse=True)
    for tup in range(len(items)):
        print(a[tup])

    print(items[0])

    def firstAttempt(items, capacity):
        iterationControl = 0
        sizeControl = 0
        value_picked_up = 0
        items_taken = 'Items taken: '
        while iterationControl < len(items) and sizeControl < capacity:
            nextSize = sizeControl + items[iterationControl][1]
            if nextSize < capacity:
                sizeControl = nextSize
                value_picked_up += items[iterationControl][2]
                items_taken += f'''{str(items[iterationControl][0])} '''
            iterationControl += 1
        print(items_taken, sizeControl, value_picked_up)
    firstAttempt(a, capacity)


if __name__ == '__main__':
    if len(sys.argv) > 1:
        capacity = int(sys.argv[2])
        file_location = sys.argv[1].strip()
        file_contents = open(file_location, 'r')
        items = []

        for line in file_contents.readlines():
            data = line.rstrip().split()
            items.append(Item(int(data[0]), int(data[1]), int(data[2])))

        file_contents.close()
        print(knapsack_solver(items, capacity))
    else:
        print('Usage: knapsack.py [filename] [capacity]')
