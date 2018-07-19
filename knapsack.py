#!/usr/bin/python

import sys
from collections import namedtuple

Item = namedtuple('Item', ['index', 'size', 'value'])

def knapsack_solver_greedy(items, capacity):
  # sort items by ratio
  diffs = sorted(items, key=lambda x: 1. * x[2]/x[1], reverse=True)
  
  # logging the diffs for visualize
  # for diff in diffs:
  #   print(diff[0], diff[1], diff[2], 1. * diff[2]/diff[1])
    
  res = []
  sumSize = 0
  sumValue = 0
  
  # calculate current sum until sum reaches capacity
  for diff in diffs:
    if sumSize + diff[1] < capacity:
      sumSize += diff[1]
      sumValue += diff[2]
      res.append(diff[0])
  
  # res.append(diff[0])
  return (sumSize, sumValue, sorted(res))
  
def knapsack_solver_bruteforce(items, capacity):
  # 1.Use recursion to exhaustively check every single combination
  # 2. Base 1: we have no more items in the pile
  # 3. Base 2: we have one item left in the pile. Check to see if it fits in our bag's remaining capacity. If it does, take it. Otherwise discard it.
  # 4. Calculate the overall value we have in our knapsack if we take the item
  # 5. Calculate the overall value we have in our knapsack if we dont take the item
  # 6. Compare the two resulting values; take the option with the larger value
  def helper(items, capacity, tracker, sumValue):
    #  the end of tree
    if not items:
      # return max value and tracker list "1" for keep, "0" for discard
      return sumValue, tracker 
    # reaching the end of tree
    elif len(items) == 1:
      # good to be included, track it as "1"
      if items[0].size <= capacity:
        tracker[items[0].index-1] = 1
        sumValue += items[0].value
        return sumValue, tracker
      # size is too large, leave it as "0", return current sumValue
      else:
        return sumValue, tracker
    # most of the cases, keep recurse until reach end of tree
    elif items[0].size <= capacity:
      # recursion flow now will be branched with 
      # 1. items list (without the current item)
      tracker_copy = tracker[:]
      tracker_copy[items[0].index-1] = 1
      
      # for branch that we keep current item, we will keep recurse with:
      # 2. leftover capacity
      # 3. new copy of the current tracker (current item is marked with "1")
      r1 = helper( items[1:], capacity - items[0].size, tracker_copy, sumValue + items[0].value)
      
      # for branch that we NOT keep current item, we will keep recurse with:
      # 2. current capacity
      # 3. current tracker (current item stays as "0")
      r2 = helper( items[1:], capacity, tracker, sumValue)
      
      # return the best value with lower capacity
      return max(r1,r2, key=lambda tup: tup[0])
    # rare cases, size is too large, so keep recurse until reach end of tree
    else:
      return helper( items[1:], capacity, tracker, sumValue)
  
  return helper(items, capacity, [0] * len(items), 0)

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
    print(knapsack_solver_greedy(items, capacity))
    print(knapsack_solver_bruteforce(items, capacity))
  else:
    print('Usage: knapsack.py [filename] [capacity]')