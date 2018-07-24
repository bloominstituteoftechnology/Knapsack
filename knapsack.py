#!/usr/bin/python

import sys
from collections import namedtuple
from pprint import pprint

Item = namedtuple('Item', ['index', 'size', 'value'])

def string_formatter(best_set, size, best_value):
  # sorted
    return (f'''\nItems to select: {str(sorted([item.index for item in best_set])).strip('[]')}
Total cost: {sum([item.size for item in best_set])}
Total Value: {str(best_value)}\n''')

# Unsorted
#   return (f'''\nItems to select: {str([item.index for item in best_set]).strip('[]')}
# total cost: {sum([item.size for item in best_set])}
# Total Value: {str(best_value)}\n''')

def bad_knapsack_solver(items, capacity):
  # doesn't test for all cases
  best_set = None
  best_value = 0
  for itemA in items:
    set = []
    size = 0
    value = 0

    set.append(itemA)
    size += itemA.size
    value += itemA.value

    for itemB in items:
      if itemB != itemA:
        if itemB.size + size <= capacity:
          set.append(itemB)
          size += itemB.size
          value += itemB.value

    if value > best_value:
      best_set = set
      best_value = value

  return string_formatter(best_set, 0, best_value)


def greedy_heuristic_knapsack_solver(items, capacity):
  # Doesn't work for large 1.
  sorted_items = sorted(items, key=lambda i: i.size / i.value)
  best_set = []
  best_value = 0
  for i in sorted_items:
      if i.size <= capacity:
          capacity -= i.size
          best_set.append(i)
          best_value += i.value

  return string_formatter(best_set, 0, best_value)

def powerset(items):
  res = [[]]
  for item in items:
    newset = [r+[item] for r in res]
    res.extend(newset)
  return res


def non_recursive_brute_force_knapsack_solver(items, capacity):
  knapsack = []
  best_weight = 0
  best_value = 0
  for item_set in powerset(items):
    set_weight = sum([e[1] for e in item_set])
    set_value = sum([e[2] for e in item_set])
    if set_value > best_value and set_weight <= capacity:
      best_value = set_value
      best_weight = set_weight
      knapsack = item_set
  return string_formatter(knapsack, best_weight, best_value)



def recursive_brute_force_knapsack_solver(items, capacity):
  #recursively checking all combinations of items
  # inputs: items, capacity, total value, taken items
  # returns the resulting value and the taken array of taken items
  def knapsack_helper(items, capacity, value, bag):
    if not items:
      return value, bag
    elif len(items) == 1:

      #check if the last item fits or not
      if items[0].size <= capacity:
        bag[items[0].index-1] = 1

        # update our total value for taking this item
        value += items[0].value
        return value, bag

      # last item doesn't fit, just discard it
      else:
        return value, bag

    # we still have a bunch of items to consider
    # check to see if the item we just picked up fits in our remaining capacity
    elif items[0].size <= capacity:

      #make a copy of our bag
     bag_copy = bag[:]
     # change bag_copy item at that index to 1 from 0
     bag_copy[items[0].index - 1] = 1

     # branch where we took the item
     r1 = knapsack_helper(items[1:], capacity- items[0].size, value + items[0].value, bag_copy)
    
      # branch we don't take the item
     r2 = knapsack_helper(items[1:], capacity, value, bag)

     return max(r1, r2, key=lambda tup: tup[0])
   
    else:
       # item doesn't fit, discard it and continue recursing
       return knapsack_helper(items[1:], capacity, value, bag)

  # initial call our recursive knapsack_helper
  return knapsack_helper(items, capacity, 0, [0] * len(items))




def cached_recursive__knapsack_solver(items, capacity):

  cache = {}

  def memo_helper(items, capacity, value, bag):
    if str(bag) not in cache.keys():
      cache[str(bag)] = knapsack_helper(items, capacity, value, bag)
    return cache[str(bag)], bag

  def knapsack_helper(items, capacity, value, bag):
    if not items:
      return value, bag
    elif len(items) == 1:
      if items[0].size <= capacity:
        bag[items[0].index-1] = 1
        value += items[0].value
        return value, bag
      else:
        return value, bag
    elif items[0].size <= capacity:
     bag_copy = bag[:]
     bag_copy[items[0].index - 1] = 1
     r1 = memo_helper(items[1:], capacity- items[0].size, value + items[0].value, bag_copy)
     r2 = memo_helper(items[1:], capacity, value, bag)
     return max(r1, r2, key=lambda tup: tup[0])
    else:
       return memo_helper(items[1:], capacity, value, bag)
  return memo_helper(items, capacity, 0, [0] * len(items))







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
    #print("Naive: " + knapsack_solver(items, capacity))

    # print("Non Recursive Brute: " + (non_recursive_brute_force_knapsack_solver(items, capacity)))
    print("Recursive Brute: " + str(recursive_brute_force_knapsack_solver(items, capacity)))
    print("Cached Recursive: " + str(cached_recursive__knapsack_solver(items, capacity)))
    # print("Greedy/Heuristic: " + greedy_heuristic_knapsack_solver(items, capacity))

  else:
    print('Usage: knapsack.py [filename] [capacity]')