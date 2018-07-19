#!/usr/bin/python

import sys
from collections import namedtuple

Item = namedtuple('Item', ['index', 'size', 'value'])

def knapsack_solver_recursive(items, capacity):
  def naive(items, capacity, sack, value):
    item = items[0] if len(items) > 0 else None
    if len(items) == 0:
      return (sack, value)
    elif len(items) == 1:
      if item.size <= capacity:
        sack.add(item.index)
        value += item.value
        return(sack, value, capacity-item.size)
      else:
        return (sack, value, capacity)
    elif item.size <= capacity:
      temp_sack = set(sack)
      temp_sack.add(item.index)

      leave = naive(items[1:], capacity, sack, value)
      keep = naive(items[1:], capacity-item.size, temp_sack, value+item.value)
      return max(leave, keep, key=lambda x: x[1])
    else:
      return naive(items[1:], capacity, sack, value)
  result = naive(items, capacity, set(), 0)
  return "Value: %s\nSize: %s\nChosen: %s" %(result[1], capacity-result[2], result[0])

def knapsack_solver_greedy(items, capacity):
  knapsack, total_cost, total_value = [], 0, 0
  while capacity > 0:
    biggest_gain, cost, value, chosen_item = -1, 0, 0, None
    for item in items:
      ratio = item.value/item.size
      if item.size <= capacity and ratio > biggest_gain:
        biggest_gain = ratio
        chosen_item = item
        value = item.value
        cost = item.size
    if chosen_item == None:
      capacity = 0
      break
    else:
      knapsack.append(chosen_item.index)
      total_cost += cost
      total_value += value
      items.remove(chosen_item)
      capacity -= cost
  return "Value: %s\nSize: %s\nChosen: %s" %(total_value, total_cost, knapsack)

def knapsack_solver_greedy_2(items, capacity):
  remaining = capacity
  knapsack, total = [], 0 
  GreedyItem = namedtuple('GreedyItem',Item._fields+('ratio',))
  new_items = []
  for item in items:
    new_item = GreedyItem(item.index, item.size, item.value, item.value/item.size)
    new_items.append(new_item)
  new_items.sort(key=lambda item: item[3], reverse=True)
  for item in new_items:
    if item.size <= remaining:
      remaining -= item.size
      knapsack.append(item.index)
      total += item.value
    else:
      pass
  return "Value: %s\nSize: %s\nChosen: %s" %(total, capacity-remaining, knapsack)


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
    print(knapsack_solver_greedy_2(items, capacity))
  else:
    print('Usage: knapsack.py [filename] [capacity]')