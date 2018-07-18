#!/usr/bin/python

import sys
import functools
from collections import namedtuple

Item = namedtuple('Item', ['index', 'size', 'value'])

# V1 - Brute force
def knapsack_solver(items, capacity):
    counter = 0
    sorted_items = sorted(items, key=lambda item: item.value/item.size, reverse=True)
    knapsack = {
        'value': 0,
        'size': 0,
        'chosen': [],
        'capacity': capacity
    }
    
    # Add best weight/value items until no more can fit
    while counter < len(sorted_items):
        if sorted_items[counter].size <= knapsack['capacity']:
            item = sorted_items.pop(counter)
            knapsack['value'] += item.value
            knapsack['size'] += item.size
            knapsack['capacity'] -= item.size
            knapsack['chosen'].append(item.index)
        else:
            counter += 1
    
    return knapsack

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
