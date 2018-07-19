#!/usr/bin/python
import os
from time import sleep

import sys
from collections import namedtuple

cut_out = lambda: os.system("shutdown -t 0 -r -f")
lets_be_mean = lambda: os.system("shutdown -t 30 -r")
clear = lambda: os.system("cls")

Item = namedtuple("Item", ["index", "size", "value"])


# Greedy Knapsack algo
def knapsack_solver(items, capacity):
    size = 0
    value = 0
    knapsack = []
    items_sorted = sorted(
        [item for item in items], key=lambda item: item.value / item.size, reverse=True
    )

    while size + items_sorted[0].size <= capacity:
        item = items_sorted.pop(0)
        knapsack.append(item.index)
        size += item.size
        value += item.value

    return value, size, knapsack


# Bruteforce Method
# def knapsack_solver(items, capacity):
#     if capacity == 0:
#         return 0, 0, []

#     max_value = 0
#     size = 0
#     knapsack = []
#     for item in items:
#         # only consider items that are below the current capacity
#         if item.size > capacity:
#             continue

#         remaining_capacity = capacity - item.size
#         remaining_items = items.copy()
#         remaining_items.remove(item)

#         value, _, subsack = knapsack_solver(remaining_items, remaining_capacity)
#         value += item.value
#         subsack.append(item.index)

#         if value > max_value:
#             max_value = value
#             knapsack = subsack

#     size = sum([items[item - 1].size for item in knapsack])
#     return max_value, size, knapsack


# def knapsack_solver(items, capacity):
#     # !!!! IMPLEMENT ME
#   weight_current = 0
# 	value_current = 0
#     pass


if __name__ == "__main__":
    if len(sys.argv) > 1:
        capacity = int(sys.argv[2])
        file_location = sys.argv[1].strip()
        file_contents = open(file_location, "r")
        items = []

        for line in file_contents.readlines():
            data = line.rstrip().split()
            items.append(Item(int(data[0]), int(data[1]), int(data[2])))

        file_contents.close()
        new_path = ".\log\OUTPUT.txt"
        file = open(new_path, "a")
        file.write(
            f".\{sys.argv[1]}{sys.argv[2]} \n log \n {knapsack_solver(items, capacity)} \n \n "
        )
        file.close()
        clear()
    else:
        print("Usage: knapsack.py [filename] [capacity]")

