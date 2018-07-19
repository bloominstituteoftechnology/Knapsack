#!/usr/bin/python

import sys
from collections import namedtuple

Item = namedtuple('Item', ['index', 'size', 'value'])

def recursive_knapsack_solver(items, capacity, index=0):
  if capacity == 0:
    return 0, 0, []

  chosen_group = 0, 0, []
  max_value = 0
  for i in range(index, len(items)):
    item = items[i]
    if item.size <= capacity:
      group_extension = recursive_knapsack_solver(items, capacity-item.size, i+1)
      group = item.value+group_extension[0], item.size+group_extension[1], [item.index]+group_extension[2]
      if group[0] > max_value:
        max_value = group[0]
        chosen_group = group

  return chosen_group

def memoized_knapsack_solver(items, capacity, index=0, calculated={}):
  if capacity == 0:
    return 0, 0, []

  max_value = 0
  chosen_group = 0, 0, []
  for i in range(index, len(items)):
    item = items[i]
    if item.size <= capacity:
      key = (capacity-item.size, i+1)
      if key not in calculated:
        calculated[key] = memoized_knapsack_solver(items, capacity-item.size, i+1, calculated)

      group = item.value+calculated[key][0], item.size+calculated[key][1], [item.index]+calculated[key][2]
      if group[0] > max_value:
        max_value = group[0]
        chosen_group = group

  return chosen_group

def really_recursive_knapsack_solver(items, capacity, index=0):
  if capacity == 0 or index == len(items):
    return 0, 0, []

  group_without = really_recursive_knapsack_solver(items, capacity, index+1)
  group_with = 0, 0, []
  item = items[index]
  if item.size <= capacity:
    group_extension = really_recursive_knapsack_solver(items, capacity-item.size, index+1)
    group_with = item.value+group_extension[0], item.size+group_extension[1], [item.index]+group_extension[2]

  return group_without if group_without[0] > group_with[0] else group_with

def really_memoized_knapsack_solver(items, capacity, index=0, calculated={}):
  if capacity == 0 or index == len(items):
    return 0, 0, []

  key_without = (capacity, index+1)
  if key_without not in calculated:
    calculated[key_without] = really_memoized_knapsack_solver(items, capacity, index+1, calculated)
  group_without = calculated[key_without]

  group_with = 0, 0, []
  item = items[index]
  if item.size <= capacity:
    key_with = (capacity-item.size, index+1)
    if key_with not in calculated:
      calculated[key_with] = really_memoized_knapsack_solver(items, capacity-item.size, index+1, calculated)
    group_with = item.value+calculated[key_with][0], item.size+calculated[key_with][1], [item.index]+calculated[key_with][2]

  return group_without if group_without[0] > group_with[0] else group_with

def greedy_knapsack_solver(items, capacity):
  items.sort(key=lambda item: float(item.value/item.size), reverse=True) # sort by value/weight

  chosen = []
  chosen_value = 0
  chosen_size = 0
  for item in items:
    if chosen_size + item.size <= capacity:
      chosen.append(item.index)
      chosen_value += item.value
      chosen_size += item.size

  return chosen_value, chosen_size, chosen

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
    print()

    # print("BruteForce recursive")
    # brute_recursive = recursive_knapsack_solver(items, capacity)
    # print("Value:", brute_recursive[0])
    # print("Size:", brute_recursive[1])
    # print("Chosen:", brute_recursive[2])
    # print()

    print("Memoized recursive")
    memoized_recursive = memoized_knapsack_solver(items, capacity)
    print("Value:", memoized_recursive[0])
    print("Size:", memoized_recursive[1])
    print("Chosen:", memoized_recursive[2])
    print()

    # print("Really recursive")
    # really_recursive = really_recursive_knapsack_solver(items, capacity)
    # print("Value:", really_recursive[0])
    # print("Size:", really_recursive[1])
    # print("Chosen:", really_recursive[2])
    # print()

    # print("Really recursive memoized")
    # really_memoized = really_memoized_knapsack_solver(items, capacity)
    # print("Value:", really_memoized[0])
    # print("Size:", really_memoized[1])
    # print("Chosen:", really_memoized[2])
    # print()

    print("Greedy")
    greedy = greedy_knapsack_solver(items, capacity)
    print("Value:", greedy[0])
    print("Size:", greedy[1])
    print("Chosen:", greedy[2])
    print()

  else:
    print('Usage: knapsack.py [filename] [capacity]')