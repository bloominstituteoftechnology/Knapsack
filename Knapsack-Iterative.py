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
                    cache[item - 1][size - items[item - 1].size] + items[item - 1].value
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

    knapsack_iterative(items, capacity)
