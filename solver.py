#!/usr/bin/python

import sys
from collections import namedtuple

Item = namedtuple("Item", ['index', 'size', 'value'])

def knapsackExhaustive(items, capacity):
    """
    Correct but generally infeasible/inefficient at scale knapsack solution.
    """
    # Recursively check all combinations of items with inner helper method
    def knapsackRec(items, capacity, value, taken):
        if not items or (len(items) == 1 and items[0].size > capacity):
            # No remaining items that fit
            return value, taken
        elif len(items) == 1:
            # Last item and it fits, take it
            taken[items[0].index - 1] = 1
            value += items[0].value
            return value, taken
        elif capacity > items[0].size:
            # Recurse cases of taking item/not taking item, return max
            new_taken = taken[:]  # Copy to avoid marking everything taken
            new_taken[items[0].index - 1] = 1
            return max(
                knapsackRec(items[1:], capacity - items[0].size,
                            value + items[0].value, new_taken),
                knapsackRec(items[1:], capacity, value, taken),
                key=lambda tup: tup[0]
            )
        else:
            # Doesn't fit, just skip and recurse on rest
            return knapsackRec(items[1:], capacity, value, taken)
    # Initial call with nothing taken
    value, taken = knapsackRec(items, capacity, 0, [0] * len(items))
    # Output is a string of the value of the knapsack (line 1)
    # Note - first row is all 0s because picking from 0 items
    # Need to have it to refer back to for solution computation
    # and a 0/1 array indicating whether items were taken (line 2)
    output_data = str(value) + '\n'
    output_data += ' '.join(map(str, taken))
    return output_data

def knapsackGreedy(items, capacity):
    """
    Incorrect but feasible and efficient solution for the knapsack problem.
    """
    value = 0
    weight = 0
    taken = [0] * len(items)
    # Relax the problem by considering items in increasing order of weight by value
    norm_items = [Item(item[0], float(item[1]) / item[2], item[2])
                  for item in items]
    sorted_items = sorted(norm_items, key=lambda item: item.size)

    # Greedy loop, if the item fits in the knapsack, take it
    for item in sorted_items:
        if weight + (item.size * item.value) <= capacity:
            taken[item.index - 1] = 1
            value += item.value
            weight += (item.size * item.value)

    output_data = str(value) + '\n'
    output_data += ' '.join(map(str, taken))
    return output_data

def knapsackDP(items, capacity):
    """
    Correct but very memory inefficient solution, can only solve problems where
    computer memory is at least number of items times capacity time 8bytes large
    """
    # Initialize the knapsack matrix: rows are items (including a "no item" row)
    # Columns are integral capacities: 0, 1, 2, ..., capacity - 1, capacity
    knapsack = [[0] * (capacity + 1) for _ in range(len(items) + 1)]

    # 0/1 array indicating whether items are taken or not (like in greedy)
    taken = [0] * len(items)

    # DP loops for filling in knapsack matrix
    # if the item does not fit in a "sub-knapsack", don't include it
    # else include it only if its value makes the knapsack more valuable
    # These loops fill the matrix but do not solve the problem
    # Note - first row is all 0s because picking from 0 items
    # Need to have it to refer back to for solution computation
    for i in range(1, len(knapsack)):
        for j in range(len(knapsack[i])):
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

    output_data = str(knapsack[-1][-1]) + '\n'
    output_data += ' '.join(map(str, taken))
    return output_data

def knapsackBB(items):
    """
    This would be cool with breath-first search, pass for now
    Idea: https://ocw.mit.edu/courses/civil-and-environmental-engineering/1-204-computer-algorithms-in-systems-engineering-spring-2010/lecture-notes/MIT1_204S10_lec16.pdf
    More: http://www.mathcs.emory.edu/~cheung/Courses/323/Syllabus/BranchBound/Docs/Knapsack-branch+bound.pdf
    C++: https://stackoverflow.com/questions/11498035/c-implementation-of-knapsack-branch-and-bound
    """
    pass

def solve_it(input_data, capacity):
    # parse the input
    lines = input_data.split('\n')
    items = []

    for line in lines:
        parts = line.split()
        # Item(index, size, value)
        items.append(Item(int(parts[0]), int(parts[1]), int(parts[2])))

    answer = knapsackExhaustive(items, capacity)
    # answer = knapsackGreedy(items, capacity)
    # answer = knapsackDP(items, capacity)
    return answer

if __name__ == '__main__':
    if len(sys.argv) > 1:
        capacity = int(sys.argv[2])
        file_location = sys.argv[1].strip()
        input_data_file = open(file_location, 'r')
        input_data = ''.join(input_data_file.readlines()).rstrip()
        input_data_file.close()
        print solve_it(input_data, capacity)
    else:
        print 'Usage: solver.py (file) (capacity)'