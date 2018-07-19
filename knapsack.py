#!/usr/bin/python

import sys
import decimal
from collections import namedtuple

Item = namedtuple('Item', ['index', 'size', 'value'])

#Greedy approach

def knapsack_solver(items, capacity):
  sortRatio = []
  fullStats = []
  empArr = []
  size_counter = int(0)
  counter = 0
  # !!!! IMPLEMENT ME

  d = {'key':'value'}
  d['mynewkey'] = 'mynewvalue'
  print(d)

  print("test")
  for i in items:
    print(i)
    ratio = i.value / float(i.size)
    itemsObject = {
      'size':i.size, 
      'value':i.value,
      'ratio': float(ratio)}
    
    fullStats.append(itemsObject)
  while counter <= len(fullStats):
    if fullStats[counter]['ratio'] > 1:
      print(fullStats.ratio)
      empArr.append(fullStats[0])
    else:
      continue
    counter += 1
    # sorted(fullStats[ratio])
    # print(fullStats)
    
    
  #print("empArr ,", empArr)
  
#################
# taken = [0] = len(items)

#def knapsack_solver(items, capacity):
  # Recursively checking all combinations of items
  # inputs: items, capacity, total value, taken items
  # returns the resulting value and the taken array of taken items
  # def knapsack_helper(items, capacity, value, bag):
  #   if not items:
  #     return value, bag
  #   elif len(items) == 1:
  #     # Check if the last item fits or not
  #     if items[0].size <= capacity:
  #       # take the item by setting its index to 'bag' to 1
  #       bag[items[0].index - 1] = 1
  #       # update our total value for taking this item
  #       value += items[0].value
  #       return value, bag
  #     else:
  #       #last item doesn't fit, just discard it
  #       return value, bag
  #   # end of base cases
  #   # check to see if the item we just pickedup fits in our remaining capacity
  #   elif items[0].size <= capacity:
  #     # We can consider the overall value of this item
  #     # make a copy of our bag
  #     bag_copy = bag[:]
  #     bag_copy[items[0].index - 1] = 1



    
    
    

      
    
#print("ratio ", sortRatio)

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