#!/usr/bin/env python
# -*- coding: utf-8 -*-

import sys
from collections import namedtuple

Item = namedtuple('Item', ['index', 'size', 'value'])

def knapsackExhaustive(items, capacity):
    """
    Exhaustive solution - correct, but doesn't scale.
    """
    # Inner helper method to accomodate tracking state
    def knapsackRec(items, capacity, value, taken):
        if not items or (len(items) == 1 and items[0].size > capacity):
            # Nothing left, or one thing but it doesn't fit
            return value, taken
        elif len(items) == 1:
            # One thing left, and it fits
            taken[items[0].index - 1] = 1
            value += items[0].value
            return value, taken
        elif capacity >= items[0].size:
            # Multiple things left, head fits
            new_taken = taken[:]  # copy taken so each call has its own
            new_taken[items[0].index - 1] = 1
            return max(
                knapsackRec(items[1:], capacity - items[0].size,
                            value + items[0].value, new_taken),
                knapsackRec(items[1:], capacity, value, taken),
                key=lambda tup: tup[0]
            )
        else:
            # Multiple things left, head doesn't fit
            return knapsackRec(items[1:], capacity, value, taken)
    # Initial call of inner method with nothing taken
    value, taken = knapsackRec(items, capacity, 0, [0] * len(items))
    # Output is a string of the value of the knapsack (line 1)
    # and a 0/1 array indicating whether items were taken (line 2)
    output_data = str(value) + '\n'
    output_data += ' '.join(map(str, taken))
    return output_data

def knapsackGreedy(items, capacity):
    """
    Scalable/efficient but incorrect solution.
    """
    value = 0
    weight = 0
    taken = [0] * len(items)
    # Consider items by increasing order of weight by value
    norm_items = [Item(item.index, float(item.size) / item.value, item.value)
                  for item in items]
    sorted_items = sorted(norm_items, key=lambda item: item.size)

    # Greedy loop - take things as long as they fit
    for item in sorted_items:
        if weight + (item.size * item.value) <= capacity:
            taken[item.index - 1] = 1
            value += item.value
            weight += (item.size * item.value)

    output_data = str(value) + '\n'
    output_data += ' '.join(map(str, taken))
    return output_data


"""
BAD greedy case
capacity 100
item1 value=2 size=1
item2 value=99 size=100
"""

def knapsackDP(items, capacity):
    """
    Semi-scalable (depends on knapsack size/available memory) correct solution
    """
    # Initialize the knapsack matrix: rows are items (including a "no item" row)
    # Columns are integral capacities: 0, 1, 2, ..., capacity - 1, capacity
    knapsack = [[0] * (capacity + 1) for _ in range(len(items) + 1)]
    # [[0, 0, 0...], [0, 0, 0... ], ...]

    taken = [0] * len(items)
    # DP loops for filling in knapsack matrix
    # if the item does not fit in a "sub-knapsack", don't include it
    # else include it only if its value makes the knapsack more valuable
    # These loops fill the matrix but do not solve the problem
    # Note - first row is all 0s because picking from 0 items
    # Need to have it to refer back to for solution computation
    for i in range(1, len(knapsack)):
        for j in range(len(knapsack[i])):
            new_taken = taken[:]
            if items[i-1].size > j:
                # Item doesn't fit, skip
                knapsack[i][j] = knapsack[i-1][j]
            else:
                # Item fits, take max of skipping it or adding it
                # Adding -> base new knapsack on current - size + value of item
                knapsack[i][j] = max(
                    knapsack[i-1][j],
                    knapsack[i-1][j - items[i-1].size] + items[i-1].value)

    # With this loop we can traverse the matrix and figure out what items
    # to take in our knapsack, that is, if the value increased from item i-1
    # to item i then we know we took item it and should go to the previous
    # item in the smaller knapsack
    # (the column discounting the size of the taken item)
    i = len(knapsack) - 1
    j = len(knapsack[-1]) - 1
    while i > 0 and j > 0:
        if knapsack[i][j] != knapsack[i-1][j]:
            taken[i-1] = 1
            i -= 1
            j -= items[i].size
        else:
            i -= 1

    value = knapsack[-1][-1]
    output_data = str(value) + '\n'
    output_data += ' '.join(map(str, taken))
    return output_data

def solve_it(items, capacity):
    # answer = knapsackExhaustive(items, capacity)
    # answer = knapsackGreedy(items, capacity)
    answer = knapsackDP(items, capacity)
    return answer

if __name__ == '__main__':
    if len(sys.argv) > 1:
        capacity = int(sys.argv[2])
        file_location = sys.argv[1].strip()
        file_contents = open(file_location, 'r')
        items = []
        for line in file_contents.readlines():
            data = line.rstrip().split()
            # Item(index, size, value)
            items.append(Item(int(data[0]), int(data[1]), int(data[2])))
        file_contents.close()
        print(solve_it(items, capacity))
    else:
        print('Usage: solver.py (file) (capacity)')
        