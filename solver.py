#!/usr/bin/python

import sys
from collections import namedtuple

Item = namedtuple('Item', ['index', 'size', 'value'])

"""
Brute-force knapsack checks every possible combination of items we could 
be taking and outputs the combination with the best value. 

1. Use recursion to exhaustively check every single combination of items
2. Base case 1: we have no items left in the pile to take
3. Base case 2: we have one item left in the pile. Check to see if it fits. If it does, take it, otherwise discard it.
4. On each recursive call we pick up the next item from the pile
5. Calculate the overall value we have in our knapsack if we don't take the item
6. Calculate the overall value we have in our knapsack if we do take the item
7. Compare the two calculated values; take the option that yields the greater value
"""

def knapsack_solver(items, capacity):
  # Recursively check all combinations of items with inner helper method
  def knapsack_rec(items, capacity, value, bag):
    # No remaining items that fit
    if not items:
      return value, bag
    elif len(items) == 1:
      # Last item and it fits, take it
      if items[0].size <= capacity:
        bag.add(items[0].index)
        value += items[0].value
        return value, bag
      # Last item doesn't fit, discard it
      else:
        return value, bag
    elif capacity > items[0].size:
      # Recurse cases of taking item/not taking item, return max
      bag_copy = bag.copy() # Copy to avoid marking everything taken
      bag_copy.add(items[0].index)
      # Calculate the value of taking this item
      r1 = knapsack_rec(items[1:], capacity - items[0].size,
                        value + items[0].value, bag_copy)
      # Calculate the value of not taking this item
      r2 = knapsack_rec(items[1:], capacity, value, bag)
      # Choose the option with the larger value
      return max(r1, r2, key=lambda tup: tup[0])
    else:
      # Item doesn't fit, skip and move on to the next one
      return knapsack_rec(items[1:], capacity, value, bag)
  # Initial call with our bag represented as a Set data structure
  return knapsack_rec(items, capacity, 0, set())


def knapsackGreedy(items, capacity):
    """
    Incorrect but feasible and efficient solution for the knapsack problem.
    """
    value = 0
    weight = 0
    bag = set() 
    # Relax the problem by considering items in increasing order of weight by value
    norm_items = [Item(item.index, float(item.size) / item.value, item.value)
                  for item in items]
    sorted_items = sorted(norm_items, key=lambda item: item.size)

    # Greedy loop, if the item fits in the knapsack, take it
    for item in sorted_items:
        if weight + (item.size * item.value) <= capacity:
            bag.add(item.index)
            value += item.value
            weight += (item.size * item.value)

    return value, bag
        

def knapsackDP(items, capacity):
    """
    Correct but very memory inefficient solution, can only solve problems where
    computer memory is at least number of items times capacity time 8bytes large
    """
    # Initialize the cache matrix: rows are items (including a "no item" row)
    # Columns are integral capacities: 0, 1, 2, ..., capacity - 1, capacity
    cache = [[0] * (capacity + 1) for _ in range(len(items) + 1)]

    # Our bag represented as a Set data structure
    bag = set()

    # DP loops for filling in cache matrix
    # if the item does not fit in a "sub-knapsack", don't include it
    # else include it only if its value makes the knapsack more valuable
    # These loops fill the matrix but do not solve the problem
    # Note - first row is all 0s because picking from 0 items
    # Need to have it to refer back to for solution computation
    for item in range(1, len(cache)):
        for size in range(len(cache[item])):
            if items[item-1].size > size:
                # Item doesn't fit, skip
                cache[item][size] = cache[item-1][size]
            else:
                # Item fits, take max of skipping it or adding it
                # Adding -> base new knapsack on current - size + value of item
                cache[item][size] = max(
                    cache[item-1][size],
                    cache[item-1][size - items[item-1].size] + items[item-1].value)

    # With this loop we can traverse the matrix and figure out what items
    # to take in our knapsack, that is, if the value increased from item i-1
    # to item i then we know we took the item and should go to the previous
    # item in the smaller knapsack
    # (the column discounting the size of the taken item)
    i = len(cache) - 1
    j = len(cache[-1]) - 1
    while i > 0 and j > 0:
        if cache[i][j] != cache[i-1][j]:
            bag.add(i - 1)
            i -= 1
            j -= items[i].size
        else:
            i -= 1

    return cache[-1][-1], bag

def knapsackBB(items):
    """
    This would be cool with breath-first search, pass for now
    Idea: https://ocw.mit.edu/courses/civil-and-environmental-engineering/1-204-computer-algorithms-in-systems-engineering-spring-2010/lecture-notes/MIT1_204S10_lec16.pdf
    More: http://www.mathcs.emory.edu/~cheung/Courses/323/Syllabus/BranchBound/Docs/Knapsack-branch+bound.pdf
    C++: https://stackoverflow.com/questions/11498035/c-implementation-of-knapsack-branch-and-bound
    """
    pass

def solve(items, capacity):
    # value, taken = knapsack_solver(items, capacity)
    # value, taken = knapsackGreedy(items, capacity)
    value, taken = knapsackDP(items, capacity)

    # Output is a string of the value of the knapsack (line 1)
    # Note - first row is all 0s because picking from 0 items
    # Need to have it to refer back to for solution computation
    # and a 0/1 array indicating whether items were taken (line 2)
    output = str(value) + '\n'
    output += ' '.join(map(str, taken))
    return output

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
        print(solve(items, capacity))
    else:
        print('Usage: solver.py (file) (capacity)')
