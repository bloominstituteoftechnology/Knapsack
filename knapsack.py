#!/usr/bin/python

import sys
import functools
from collections import namedtuple

Item = namedtuple('Item', ['index', 'size', 'value'])

# V1 - Brute force
def knapsack_solver(items, capacity):
    items_by_value = sorted(items, key=lambda item: item.value, reverse=True)
    items_by_size = sorted(items, key=lambda item: item.size)
    knapsack_by_value = {
        'value': 0,
        'size': 0,
        'chosen': [],
        'capacity': capacity
    }
    knapsack_by_size = {
        'value': 0,
        'size': 0,
        'chosen': [],
        'capacity': capacity
    }

    # Add most valuable items until no more can fit
    counter = 0
    while counter < len(items_by_value):
        if items_by_value[counter].size <= knapsack_by_value['capacity']:
            item = items_by_value.pop(counter)
            knapsack_by_value['value'] += item.value
            knapsack_by_value['size'] += item.size
            knapsack_by_value['capacity'] -= item.size
            knapsack_by_value['chosen'].append(item.index)
        else:
            counter += 1

    # Add lightest items until no more can fit
    counter = 0
    while counter < len(items_by_size):
        if items_by_size[counter].size <= knapsack_by_size['capacity']:
            item = items_by_size.pop(counter)
            knapsack_by_size['value'] += item.value
            knapsack_by_size['size'] += item.size
            knapsack_by_size['capacity'] -= item.size
            knapsack_by_size['chosen'].append(item.index)
        else:
            counter += 1

    # Return knapsack with the highest value
    return knapsack_by_value if knapsack_by_value['value'] > knapsack_by_size['value'] else knapsack_by_size

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

# For debugger
# capacity = 100
# file_contents = open('data/large1.txt', 'r')
# items = []

# for line in file_contents.readlines():
#     data = line.rstrip().split()
#     items.append(Item(int(data[0]), int(data[1]), int(data[2])))

# file_contents.close()
# print(knapsack_solver(items, capacity))