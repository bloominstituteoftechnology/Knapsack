#!/usr/bin/python

import sys
from collections import namedtuple

Item = namedtuple('Item', ['index', 'size', 'value'])

'''
Brute force checks every possible combinations of items we would be taking.
Outputs the combination with the best value. A single recursive call will represent
picking up the next item in the end deciding whether we want to add it to our bag


1. Use recursion to exhaustively check every single combination.
  - base case 1:
    - we've looked through everything. No more items in pile. 
  - base case 2:
    - we have one item left in the pile
    - check to see if it fits in bag's remaining capacity
    - if it does take it or otherwise discard it.
2. Calculate the overall value we have in our knapsack if we take the item
3. Calculate the overall value we have in our knapsack if we DON'T take the item.
4. Compare the two resulting values: take the option that has the largest value





'''
# chosen = [0] * len(items) #truth table

def knapsack_solver(items, capacity):
  #Recursively checking combos of all items
  # inputs: items, capacity, total value, chosen items
  # returns: the resulting value and the chosen array of chosen items  
    def knapsack_helper(items, capacity, value, size, chosen):
  
      if not items: #base case 1
        return value, size, chosen
      elif len(items) == 1: #base case 2
        #Check if the last item fits or not:
        if items[0].size <= capacity:
          #take the item by setting its index in chosen to one
          chosen[items[0].index - 1] = 1
          #update our total value for taking this item
          value += items[0].value
          #update our total size for taking this item
          size += items[0].size
          return value, size, chosen
        else:
          #last item doesn't fit, ignore it
          return value, size, chosen
      # we still have a bunch of items to consider
      # check to see if the item we just picked up fits in our remaining capacity
      elif items[0].size <= capacity:
        # we can consider the overall value of this item if it fits
        # make a copy of our bag
        # if we don't make a copy of the bag, we will get an incorrect result
        chosen_copy = chosen[:] #chosen.copy() also works
        chosen_copy[items[0].index - 1] = 1
        r1 = knapsack_helper(
          items[1:], capacity - items[0].size, value + items[0].value, size+ items[0].size, chosen_copy) 
          # universe where we took the item
        r2 = knapsack_helper(
          items[1:], capacity, value, size, chosen)
          # universe where we didn't take the item
        return max(r1, r2, key= lambda tup: tup[0])
          #pick the universe that results in a larger value
          # we use an anonymous function to compare values so that we get the entire tuple returned
      else:
            # item doesn't fit and continue recursing
        return knapsack_helper(items[1:], capacity, value, size, chosen)
            #Make initial call to our recursive helper
    value = 0
    size = 0
    chosen = [0] * len(items)
    return knapsack_helper(items, capacity, value, size, chosen)
 # where would we put a func to loop through chosen and just return the items that are chosen
 


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
    filename = "data/small1.txt"
    print("Usage: knapsack.py {} {}".format(filename, capacity))