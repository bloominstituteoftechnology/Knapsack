#!/usr/bin/python
import pdb

import sys
from collections import namedtuple
from operator import attrgetter

Item = namedtuple("Item", ["index", "size", "value"])  # "ratio"


def knapsack_greedy(items, capacity):
    Item = namedtuple("Item", ["index", "size", "value", "ratio"])
    updated_items = []
    for item in items:
        updated_items.append(Item(item[0], item[1], item[2], item[2] / item[1]))
    total_size = 0
    knapsack = []
    for item in sorted(updated_items, key=attrgetter("ratio"), reverse=True):
        if total_size + item.size <= capacity:
            knapsack.append(item)
            total_size += item.size
        elif item.size <= capacity and total_size + item.size >= capacity:
            for swag in knapsack:
                if item not in knapsack:
                    if swag.value < item.value:
                        if swag.size >= item.size:
                            total_size -= swag.size
                            knapsack.remove(swag)
                            total_size += item.size
                            knapsack.append(item)
                        elif sum(item.value for item in knapsack) < item.size:
                            del knapsack[:]
                            total_size = 0
                            total_size += item.size
                            knapsack.append(item)

    chosen_indices = []
    value = 0
    for swag in knapsack:
        chosen_indices.append(swag.index)
        value += swag.value

    return [value, total_size, chosen_indices]


def knapsack_brute_force(items, capacity):
    #  Recursively checking all combinations
    #  inputs:  items, capacity, total value, size accumulated, taken
    #  output: value, size, indexes of items taken
    def helper(items, capacity, value, size, bag):
        # pdb.set_trace()
        if not items:
            return value, size, bag
        elif len(items) == 1:
            if items[0].size <= capacity:
                bag[items[0].index - 1] = items[0].index
                value += items[0].value
                size += items[0].size
                return value, size, list(filter(lambda a: a != 0, bag))
            else:
                return value, size, list(filter(lambda a: a != 0, bag))
        elif items[0].size <= capacity:
            bag_copy = bag[:]
            bag_copy[items[0].index - 1] = items[0].index
            r1 = helper(
                items[1:],
                capacity - items[0].size,
                value + items[0].value,
                size + items[0].size,
                bag_copy,
            )
            r2 = helper(items[1:], capacity, value, size, bag)
            return max(r1, r2, key=lambda tup: tup[0])
        else:
            return helper(items[1:], capacity, value, size, bag)

    return helper(items, capacity, 0, 0, [0] * len(items))


# def knapsack_solver(items, capacity):
#     Item = namedtuple("Item", ["index", "size", "value", "ratio"])
#     updated_items = []
#     for item in items:
#         updated_items.append(Item(item[0], item[1], item[2], item[2] / item[1]))
#     total_size = 0
#     knapsack = []

#     def computation(items, capacity, knapsack, value, size):
#         if len(items) == 0 and knapsack:
#             return value, size, knapsack
#         elif not items:
#             return 0
#         if items[0].size <= capacity:
#             knapsack2 = knapsack[:]
#             knapsack.append(item)
#             capacity -= item.size
#             a = computation(items[1:], capacity, knapsack, value, size)
#             b = computation(items[1:], capacity, knapsack2, value, size)
#             return max(a, b, key=lambda tup: tup[0])
#         else:
#             return computation(items[1:], capacity, knapsack, value, size)

#     return computation(items, capacity, [], 0, 0)

#     chosen_indices = []
#     value = 0
#     for swag in knapsack:
#         chosen_indices.append(swag.index)
#         value += swag.value

#     return [value, total_size, chosen_indices]

## Iterative is still not outputting what I expect it to, will work on this later


def knapsack_solver(items, capacity):
    def knapsack_iterative(items, capacity):
        cache = [[0] * (capacity + 1) for _ in range(len(items) + 1)]

        bag = set()

        # every spot in matrix is an integer that represents the value at that spot/capacity
        for item in range(1, len(cache)):
            for size in range(len(cache[item])):
                if items[item - 1].size > size:
                    cache[item][size] = cache[item - 1][size]
                else:
                    r1 = cache[item - 1][size]
                    r2 = (
                        cache[item - 1][size - items[item - 1].size]
                        + items[item - 1].value
                    )
                    cache[item][size] = max(r1, r2)

            rows = len(cache) - 1
            cols = len(cache[0]) - 1

            while rows > 0 and cols > 0:
                if cache[rows][cols] != cache[rows - 1][cols]:
                    bag.add(rows - 1)
                    rows -= 1
                    cols -= items[rows].size
                else:
                    rows -= 1

            return cache[-1][-1], bag

    return knapsack_iterative(items, capacity)


# def solve(items, capacity):
#     value, bag = knapsack_iterative(items, capacity)

#     output = str(value) + "\n"
#     output += " ".join(map(str, bag))
#     return output


if __name__ == "__main__":
    if len(sys.argv) > 1:
        capacity = int(sys.argv[2])
        file_location = sys.argv[1].strip()
        file_contents = open(file_location, "r")
        items = []

        for line in file_contents.readlines():
            data = line.rstrip().split()
            items.append(
                Item(
                    int(data[0]),
                    int(data[1]),
                    int(data[2]),
                    # int(data[2]) / int(data[1]),
                )
            )

        file_contents.close()
        print(knapsack_solver(items, capacity))
    else:
        print("Usage: knapsack.py [filename] [capacity]")
