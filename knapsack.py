#!/usr/bin/python
# Wladimir Fraga CS10

import sys
from collections import namedtuple

Item = namedtuple('Item', ['index', 'size', 'value'])
ItemRatio = namedtuple('Item', ['index', 'size', 'value', 'ratio'])

''' This uses brute force don't try with medium
this is a O(2**N) function
'''
def knapsackSolver(items, capacity):
  combinations = getCombinations(items, capacity)
  solutions = []
  count = 0
  maxValue = 0
  maxCapacity = 0
  maxChosen = []
  print('ready set go...')
  for combination in combinations:
    totalCapacity = 0
    totalValue = 0
    chosen = []
    count += 1
    for item in combination:
      if totalCapacity + item.size <= capacity:
        totalCapacity += item.size
        totalValue += item.value
        chosen.append(item.index)
    if totalValue > maxValue:
      maxValue = totalValue
      maxCapacity = totalCapacity
      maxChosen = chosen
  print('Total Value : {}'.format(maxValue))
  print('Total Capacity : {}'.format(maxCapacity))
  print('Chosen : {}'.format(maxChosen))
    
  return combinations

def knapsackSolver2(items, capacity):
  combinations = getCombinations2(items, capacity)
  solutions = []
  maxValue = 0
  maxCapacity = 0
  maxChosen = []
  print('ready set go...')
  for combination in combinations:
    totalCapacity = 0
    totalValue = 0
    chosen = []
    for item in combination:
      if totalCapacity + item.size <= capacity:
        totalCapacity += item.size
        totalValue += item.value
        chosen.append(item.index)
    if totalValue > maxValue:
      maxValue = totalValue
      maxCapacity = totalCapacity
      maxChosen = chosen
  print('Total Value : {}'.format(maxValue))
  print('Total Capacity : {}'.format(maxCapacity))
  print('Chosen : {}'.format(maxChosen))
    
  return combinations

def getCombinations(items, capacity):
  combinations=[[]]
  for item in items:
    for bag in combinations:
      # print(combinations)
      combinations = combinations + [list(bag)+[item]]
  return combinations

def getCombinations2(items, capacity):
  combinations=[[]]
  for item in items:
    for bag in combinations:
      size = 0
      for itemSet in bag:
        size += itemSet.size
      if size <= capacity:
        combinations = combinations + [list(bag)+[item]]
  return combinations

def bestRatio(items, capacity):
  itemsRatio = []
  for item in items:
    itemsRatio.append(ItemRatio(item.index, item.size, item.value, item.size/item.value))
  
  itemsRatio = sorted(itemsRatio, key=lambda x: x.ratio)
  
  totalCapacity = 0
  totalValue = 0
  chosen = []
  for item in itemsRatio:
    if totalCapacity + item.size <= capacity:
      totalCapacity += item.size
      totalValue += item.value
      chosen.append(item.index)
  print('Total Value : {}'.format(totalValue))
  print('Total Capacity : {}'.format(totalCapacity))
  print('Chosen : {}'.format(chosen))
  return itemsRatio

def knapsack_solver(items, capacity):
  # Recursively checking all combinations of items
  # inputs: items, capacity, total value, taken items
  # returns: the resulting value and the taken array of taken items
  def knapsack_helper(items, capacity, value, bag):
    if not items:
      return value, bag
    elif len(items) == 1:
      # Check if the last item fits or not
      if items[0].size <= capacity:
        # take the item by setting its index in `bag` to 1
        bag[items[0].index - 1] = 1
        # update our total value for taking this item
        value += items[0].value
        return value, bag
      else:
        # last item doesn't fit, just discard it
        return value, bag
    # we still have a bunch of items to consider
    # check to see if the item we just picked up fits in our remaining capacity
    elif items[0].size <= capacity:
      # we can consider the overall value of this item 
      # make a copy of our bag
      bag_copy = bag[:] 
      bag_copy[items[0].index - 1] = 1
      # we take the item in this universe
      r1 = knapsack_helper(items[1:], capacity - items[0].size,
                           value + items[0].value, bag_copy)
      # we don't take the item in this universe
      r2 = knapsack_helper(items[1:], capacity, value, bag)
      # pick the universe that results in a larger value
      # make sure we're comparing just the resulting values 
      return max(r1, r2, key=lambda tup: tup[0])
    else:
      # item doesn't fit, discard it and continue recursing
      return knapsack_helper(items[1:], capacity, value, bag)
  # Initial call our recursive knapsack_helper
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

    # print('\nSean Recursive solution\n')
    # solutions = knapsack_solver(items, capacity)
    # print('Combinations : ',solutions)

    print('\nGreedy ratio solution\n')
    solutions= (bestRatio(items, capacity))
    print('Combinations : ',len(solutions))

    print('\nOptimized Brute Force solution : size < capacity\n')
    solutions = knapsackSolver2(items, capacity)
    print('Combinations : ',len(solutions))

    # print('\nBrute Force solution all combinations\n')
    # solutions = knapsackSolver(items, capacity)
    # print('Combinations : ',len(solutions))

    # for solution in solutions:
    #   print(solution)
    # combinations(5)



  else:
    print('Usage: knapsack.py [filename] [capacity]')