# Brute force checks every possible combination of items we could be taking and outputs the combination


def knapsack_brute_force(items, capacity):
    def helper(items, capacity, value, bag):
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
            r1 = helper(
                items[1:], capacity - items[0].size, value + items[0].value, bag_copy
            )
            r2 = helper(items, capacity, value, bag)
            return max(r1, r2, key=lambda tup: tup[0])
        else:
            return helper(items[1:], capacity, value, bag)

    return helper(items, capacity, 0, [0] * len(items))
