#!/usr/bin/python
import math
"""
value / weight = most val per pound
sort val
iterate through.

go through pick 
notes:
m(i, w) maxium that can be attained with weight <= w
m(0,w) = 0  no items = no value
m(i, 0) = 0 no allowed weight means no items
m(i,w) = m(i - 1, w) if w(i) > w  ((w is weight limit))
m(i,w) = max(m(i - 1, w)), w(i) + m(i-1, w - w(i))
"""

import sys
from collections import namedtuple

Item = namedtuple('Item', ['index', 'size', 'value'])

  # pick best one
  #  
  # Greedy is ratio value sorted. Grabbing the best value from a sorted list
  # fast but less accurate
  # 
  # BRUTE FORCE EXAMPLE
  #Brute force exhaustively check every single combo and outputs best combo
  # 1. use recursion to check all combos
  # 2. a single recursive call will rep us picking up the next item in the file
  # and deciding whether or not to add it to our bag or not
  # 3. Base Case 1: we have no more items in the file.
  # 4. Base Case 2: check to see if we have 1 item left in the file
  # once we have 1 item left to see if it fits in our bags remaining capacity
  # If it does, take it, otherwise discard it.
  # 5. calc overall value we have in knapsack if we take the item.
  # 6. Calc overall value we have in knapsack if we DON't take the item.
  # 7. Compare the two resulting values; take the option with the larger value
"""truth table"""

"""taken = [0] * len(items)"""
"""[0,0,0,0,0,0,0,0,0]"""
"""[1,0,0,0,0,0,1,1,0]"""


def knapsack_solver(items, capacity):
  #Recursivly checking all combinations of items
  # knapsack_helper inputs: items, capactiy, value, taken

  def knapsack_helper(items, capacity, value, taken):
    #setup base case
    # returns the resulting value in the taken array
    if not items:
      return value, taken
    elif len(items) == 1:
      #check if the last item fits or not
      if items[0].size <= capacity:
        #take the item by setting its index in 'taken' to 1
        taken[items[0].index -1 ] = 1
        # 50ish min on video prob
        #look up .index
        #update our total value for taking this item
        value += items[0].value
        return value, taken
      else:
        #last item doesnt fit, just discard it
        return value, taken
      # we still have a bunch of items to consider
      #check to see if the item we just picked up fits in our remaining capacity
    elif items[0].size <= capacity:
        # we can consider the overall value of this item if it fits
        # make a copy of taken
      taken_copy = taken[:]
      taken_copy[items[0].index - 1] = 1
      r1 = knapsack_helper(items[1:], capacity - items[0].size, 
                            value + items[0].value, taken_copy)
      r2 = knapsack_helper(items[1:], capacity, value, taken)
      # r1 is universe where item was taken r2 is universe is where we didnt take
      #pick the universe that results in the largest value
      # r1 = (20, [1,0,0,1])
      # r2 = (19, [1,1,0,0]) 
      # make sure to compare 20 to 19(resulting values)
      return max(r1, r2, key=lambda tup: tup[0])
    else:
          #item doesnt fit, discard it and continue to next item
          return knapsack_helper(items[1:], capacity, value, taken)
    # make initial call to recursive helper
  return knapsack_helper(items, capacity, 0, [0] * len(items))


"""def knapsack_second_pass(items, capacity):

  cache = {}

  def knapsack_memo_helper(items, capacity, value, taken):
    if taken not in cache.keys():
      cache[value, taken] = knapsack_second_pass_helper(value, taken)
    return cache[value, taken]

  def knapsack_second_pass_helper(value, taken):
    if not items:
      return value, taken
    elif len(items) == 1:
      #check if the last item fits or not
      if items[0].size <= capacity:
        #take the item by setting its index in 'taken' to 1
        taken[items[0].index -1 ] = 1
        # 50ish min on video prob
        #look up .index
        #update our total value for taking this item
        value += items[0].value
        return value, taken
      else:
        #last item doesnt fit, just discard it
        return value, taken
      # we still have a bunch of items to consider
      #check to see if the item we just picked up fits in our remaining capacity
    elif items[0].size <= capacity:
        # we can consider the overall value of this item if it fits
        # make a copy of taken
      taken_copy = taken[:]
      taken_copy[items[0].index - 1] = 1
      r1 = knapsack_memo_helper(items[1:], capacity - items[0].size, 
                            value + items[0].value, taken_copy)
      r2 = knapsack_memo_helper(items[1:], capacity, value, taken)
      # r1 is universe where item was taken r2 is universe is where we didnt take
      #pick the universe that results in the largest value
      # r1 = (20, [1,0,0,1])
      # r2 = (19, [1,1,0,0]) 
      # make sure to compare 20 to 19(resulting values)
      return max(r1, r2, key=lambda tup: tup[0])
    else:
          #item doesnt fit, discard it and continue to next item
          return knapsack_memo_helper(items[1:], capacity, value, taken)
    # make initial call to recursive helper
  return knapsack_memo_helper(items, capacity, 0, [0] * len(items))
  """
      
    







def simple_solver(items, capacity):
  new_items = []
  if len(items) < 1 or capacity < 1:
    return 0  
  for i in items:
    new_items.append(i)
  new_items.reverse()
  print(sorted(new_items, key=lambda value: value[2], reverse=True))


################# Greedy Solver ############################

def greedy_solver(items, capacity):
  max_value_list = []
  for i, c, v in items:
    max_val =  i, c, v, (v / float(c))
    max_value_list.append(max_val) 

  max_value_list = sorted(max_value_list, key=lambda value: value[3], reverse=True)  
  totalv = 0
  total_list = []
  for i in max_value_list:
    if i[1] <= capacity:
      totalv += i[2]
      capacity -= i[1]
      total_list.append(i[0])
  return(totalv, total_list)

  


  
  """
  if len(items) < 1 or capacity < 1:
    return 0  
  new_item = []
  for i in items:
    new_item.append(i)
  new_item.reverse()
  print(sorted(new_item, key=lambda value: value[2], reverse=True))
  """
  
  #print(isinstance(items, list))
  
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
    #print(knapsack_solver(items, capacity))
    print(greedy_solver(items, capacity))
  else:
    print('Usage: knapsack.py [filename] [capacity]')