#!/usr/bin/python

import sys
from collections import namedtuple

Item = namedtuple('Item', ['index', 'size', 'value'])

def knapsack_solver(items, capacity):
  # !!!! IMPLEMENT ME
  # Brute Force
  #   add size of 'all' combinations less than the capacity
  #   find the largest value
  # indice = []
  # i = 0
  # j = 0

  # for items in Item:
  #   size_1 = Item[i][1]
  #   i += 1
  #   for items in Item:
  #     size_2 = Item[j][1]
  #     j += 1
  #     mid_sum = size_1 + size_2

  #   if mid_sum <= capacity and i != j:
  #     indice.append(i, j)

  # Momoized recursive
  """
  Memoized Recursive Strategy 
  
  The idea: we'll use the same naive recursive logic but augment it 
  with the ability to save work we've already done. This doesn't actually
  improve the theoretical runtime complexity over the naive recursive 
  approach, but it does significantly improve the actual running time.
  
  1. Initialize a cache (can be a list or dictionary)
  2. Write a helper function that checks the cache for the answer we're looking for
  3. If the answer is not found, fall back on our naive logic
  4. The naive helper needs to recursively call the memoized version, not itself
  5. Return the value that the memoized helper function finds

def nth_fib_memo(n):
  cache = {}
  
  def nth_fib_memo_helper(n):
    if n not in cache.keys():
      cache[n] = naive_nth_fib_helper(n)
    return cache[n]
      
  def naive_nth_fib_helper(n):
    if n < 2:
      return n
    return nth_fib_memo_helper(n - 1) + nth_fib_memo_helper(n - 2)
  
  return nth_fib_memo_helper(n)
  """


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