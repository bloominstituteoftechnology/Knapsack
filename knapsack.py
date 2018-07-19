#!/usr/bin/python

import sys
import functools
from collections import namedtuple

Item = namedtuple('Item', ['index', 'size', 'value'])

# Heuristic Approach
def knapsack_solver_greedy(items, capacity):
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

# Recursive/Brute-Force Approach
def knapsack_solver_recursive(items, capacity):
    knapsack = {
        'value': 0,
        'size': 0,
        'chosen': [],
        'capacity': capacity
    }

    def knapsack_solver_recursive_helper(items, capacity, knapsack):
        # Base case
        if not items or knapsack['capacity'] == 0:
            return knapsack

        item = items[0]

        if item.size <= knapsack['capacity']:
            # Do we take the item? Yes:
            knapsack_take = knapsack.copy()
            knapsack_take_chosen = knapsack['chosen'][:]
            knapsack_take_chosen.append(item.index)
            knapsack_take['value'] += item.value
            knapsack_take['size'] += item.size
            knapsack_take['capacity'] -= item.size
            knapsack_take['chosen'] = knapsack_take_chosen
            take = knapsack_solver_recursive_helper(
                items[1:], capacity, knapsack_take)

            # Do we take the item? No:
            knapsack_discard = knapsack.copy()
            disgard = knapsack_solver_recursive_helper(
                items[1:], capacity, knapsack_discard)
            
            # Which decision gave a greater value:
            knapsack_max = max(take, disgard, key=lambda results: results['value'])
            return knapsack_max
        else:
            # Item didn't fit. discard it and keep going
            return knapsack_solver_recursive_helper(items[1:], capacity, knapsack)

    return knapsack_solver_recursive_helper(items, capacity, knapsack)

if __name__ == '__main__':
    if len(sys.argv) > 1:
        capacity = int(sys.argv[2])
        file_location = sys.argv[1].strip()
        algo_type = sys.argv[3].strip() if len(sys.argv) == 4 else 'greedy'
        file_contents = open(file_location, 'r')
        items = []

        for line in file_contents.readlines():
            data = line.rstrip().split()
            items.append(Item(int(data[0]), int(data[1]), int(data[2])))

        file_contents.close()

        if algo_type == 'recursive':
            print('Recursive/Brute Force: {}'.format(knapsack_solver_recursive(items, capacity)))
        else:
            print('Greedy: {}'.format(knapsack_solver_greedy(items, capacity)))
    else:
        print('Usage: knapsack.py [filename] [capacity]')

# For debugger
# capacity = 100
# file_contents = open('data/hard.txt', 'r')
# items = []

# for line in file_contents.readlines():
#     data = line.rstrip().split()
#     items.append(Item(int(data[0]), int(data[1]), int(data[2])))

# file_contents.close()
# print(knapsack_solver_recursive(items, capacity))
