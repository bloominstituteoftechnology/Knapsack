#!/usr/bin/python

import sys
from collections import namedtuple

Item = namedtuple('Item', ['index', 'size', 'value'])

# taken = [0] + len(items)

def knapsack_solver(items, capacity):
  # !!!! IMPLEMENT ME
  if strategy == "brute":
    algorithm = brute_knapsack_solver
  else:
    return 'strategy needs to be {"brute", "iterative", "greedy"}'
    
  value, size, knapsack = algorithm(items, capacity)
  knapsack = map(str, knapsack)
  return "Value: {}\nSize: {}\nChose: {}\n".format(value, size, ",".join(knapsack))

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
      bag_copy[items[0].index - 1] = 1
      
      r1 = knapsack_helper(items[1:], capacity - items[0].size, value + items[0].value, bag_copy)
      
      r2 = knapsack_helper(items[1:], capacity, value, bag)

      # return max(r1[0], r2[0])
      return max(r1, r2, key=lambda tup: tup[0])
          
    else:  # read whats in front of me
      return knapsack_helper(items[1:], capacity, value, bag)

    return knapsack_helper(items, capacity, 0, [0] * len(items)

  def greedy_knapsack_solver(items, capacity):
    weight_items = sorted([item for item in items], key=lambda item: item.value / item.size, reverse=True)

    knapsack = []
    size = 0
    value = 0

    while size + weight_items[0].size <= capacity:
      item = weight_items.pop(0)
      knapsack.append(item.index)
      size += item.size
      value += item.value
    return value, size, knapsack

  def iterative_knapsack_helper(items, capacity):
    cache = [[0] * (capacity + 1) for _ in range(len(items) + 1)]
    
    bag = set()

    for item in range(1, len(cache)):
      for size in range(len(cachr[item])):
        if items[item - 1].size > size:
          cache[item][size] = cashe[item - 1][size]
        else:
          r1 = cache[item - 1][size]
          r1 = cache[item - 1][size - items[item - 1].size] + items[item - 1].value
          cache[item][size] = max(r1, r2)
          print(cache)
          
  # knapsack_iterative(updated, 100)

    # cache = {}
    # knapsack = {}
    
    # for weight in range(0, capacity + 1):
    #   cache[0, weight] = 0
    #   knapsack[0, weight] = []
    
    # for index in range(1, len(items) + 1):
    #   for weight in range(0, capacity + 1):
    #     if items[index - 1].size > weight:
    #       cache[index, weight] = cache[index - 1, weight]
    #       knapsack[index, weight] = knapsack[index - 1, weight]
    #     else:
    #       with_new = (cache[index - 1, weight - items[index - 1].size] + items[index - 1].value)
    #       without_new = cache[index - 1, weight]

    #       if with_new > without_new:
    #         cache[index, weight] = with_new
    #         knapsack[index, weight] = knapsack[index - 1, weight - iterms[index - 1].size] + [index]
          
    #       else:
    #         cache[index, weight] = without_new
    #         knapsack[index, weight] = knapsack[index - 1, weight]

    # value = cache[len(items), capacity]
    # knapsack = knapsack[len(items), capacity]
    # size = sum([items[item - 1].size for item in knapsack])
    # return value, size, knapsack




  # print(sys.argv[1])
  # capacity.reverse()
  # num_items = items 
  # return sum(capacity[:num_items])
      # pass
  

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
