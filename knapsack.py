#!/usr/bin/python

import sys
from collections import namedtuple

Item = namedtuple('Item', ['index', 'size', 'value'])

# GREEDY IMPLEMENTATION
# def knapsack_solver(items, capacity):
#   valuable_chosen_items = []
#   total_cost_of_chosen_items = 0
#   running_total_cost = 0

#   # variables for print statements
#   item_nums_list = []
#   total_value = 0

#   # sorted by value/weight ratio in descending order 
#   items_sorted_by_value = sorted(items, key=lambda item:item[2]/item[1], reverse=True)
#   print(items_sorted_by_value)

#   for item in items_sorted_by_value:
#     if item[1] + running_total_cost < capacity:
#       valuable_chosen_items.append(item)
#       running_total_cost += item[1]
  
#   for chosen_item in valuable_chosen_items:
#     item_nums_list.append(chosen_item[0])
  
#   for chosen_item in valuable_chosen_items:
#     total_value += chosen_item[2]

  
#   print('Items to select:' + str(item_nums_list[:]))
#   print('Total cost: ' + str(running_total_cost))
#   print('Total value: ' + str(total_value))
#   return valuable_chosen_items
    
# B R U T E  F O R C E (Lecture Notes)
'''
Brute-force checks every possible combination of items we could be taking and outputs
the combination with the best value. A single recursive call with represent us picking
up the next item in the pile and deciding whether we want to add it to our
bag or not.

1. Use recursion to exhaustively check every single combination 
2. Base 1: we have no more items in the pile 
3. Base 2: we have one item left in the pile. Check to see if it fits in our bag's remaining
   capacity. If it does, take it. Otherwise discard it. 
4. Calculate the overall value we have in our knapsack if we take the item. 
5. Calculate the overall value we have in out knapsack if we don't take the item.
6. Compare the two resulting  values; take the option with the larger value.
'''
# BRUTE FORCE NAIVE IMPLEMENTATION
def knapsack_solver(items, capacity):
  # Recursively checking all combinations of items
  # inputs: items, capacity, total value, taken items
  # returns: the resulting value and the bag array of taken items
  def knapsack_helper(items, capacity, value, bag):
    if not items: 
      return value, bag
    elif len(items) == 1:
      # Check if the last item fits or not
      if items[0].size <= capacity:
        # take the item by setting its index in 'bag' to 1
        bag[items[0].index -1] = 1
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
      bag_copy[items[0].index -1] = 1
      # we take the item in this universe
      r1 = knapsack_helper(items[1:], capacity - items[0].size, value + items[0].value, bag_copy)
      # we don't take the item in this universe
      r2 = knapsack_helper(items[1:], capacity, value, bag)
      # pick the universe that results in a larger value
      # make sure we're comparing just the resulting values
      return max(r1, r2, key=lambda tup: tup[0])
    else: 
      # item doesn't fit, discard it and continue recursing
      return knapsack_helper(items[1:], capacity, value, bag)
  # Initial call to our recursive knapsack_helper
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