#!/usr/bin/python

import sys
from collections import namedtuple

Item = namedtuple('Item', ['index', 'size', 'value'])
#                 item_set  e[0],    e[1],    e[2]

'''
  # ====== my code ====== #
  # return subset but not the knapsack answer

  def knapsack_solver(items, capacity, value, size):

  # initialize the placeholders
  knapsack = []
  best_value = 0
  max_capacity = 0

  # find the subset
  def powerset(items):
    res = []
    for item in items:
      newset = [r+[item] for r in res]
      res.extend(newset)
    return res

  print('powerset', items)

  # sum weight and value through each subset
  # update the weight and value when it finds the best value and less weight
  for item_set in powerset(items):
    set_capacity = sum([e[1] for e in item_set])
    set_value = sum([e[2] for e in item_set])
    if set_value > best_value and set_capacity <= max_capacity:
      best_value = set_value
      max_capacity = set_capacity
      knapsack = item_set
  return knapsack, best_value, max_capacity
'''

# ====== Sean's solution for naive Knapsack ====== #
'''
Brute-force checks every possible combination of items we could be taking
and outputs the combination with the best value. A single recursive call will represent us picking up the next item in the and deciding whether we 
want to add it to our bag or not.

1. Use recursion to exhaustively check every single combination
2. Base 1: we have no more items in the pile.
3. Base 2: we have one item left in the pile. Check to see if it fits in our bag's remaining capacity. If it does, take it. Otherwise discard it.
4. Calculate the overall value we have in our knapsack if we take the item.
5. Calculate the overall value we have in our knapsack if we don't take the item.
6. Compare the two resulting values; take the option with the larger value.
'''
def knapsack_solver(items, capacity):
  def knapsack_helper(items, capacity, value, bag):
    if not items:
      return value, bag
    elif len(items) == 1:
      if items[0].size <= capacity:
        bag[items[0].index - 1] = 1
        value += items[0].value
        return value, bag
      else:
        return value, bag
    elif items[0].size <= capacity:
      bag_copy = bag[:]
      bag_copy[items[0].index -1] = 1

      branch_1 = knapsack_helper(items[1:], capacity - items[0].size, 
                                value + items[0].value, bag_copy)
      branch_2 = knapsack_helper(items[1:], capacity, value, bag)
      return max(branch_1, branch_2, key=lambda tup: tup[0])
    else:
      return knapsack_helper(items[1:], capacity, value, bag)
  return knapsack_helper(items, capacity, 0, [0] * len(items))


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