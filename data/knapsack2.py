def total_value(items, max_weight):
    return sum([x[2] for x in items]) if sum([x[1] for x in items]) < max_weight else 0


cache = {}


def solve(items, max_weight):
    if not items:
        return ()
    if (items, max_weight) not in cache:
        head = items[0]
        tail = items[1:]
        include = (head,) + solve(tail, max_weight - head[1])
        dont_include = solve(tail, max_weight)
        if total_value(include, max_weight) > total_value(dont_include, max_weight):
            answer = include
        else:
            answer = dont_include
        cache[(items, max_weight)] = answer
    return cache[(items, max_weight)]


items = (
    (1, 42, 81), (2, 42, 42), (3, 68, 56), (4, 68, 25),
    (5, 77, 14), (6, 57, 63), (7, 17, 75), (8, 19, 41),
    (9, 94, 19), (10, 34, 12),
)
max_weight = 100

solution = solve(items, max_weight)
print("solution:", solution)
print("value:", total_value(solution, max_weight))
print("weight:", sum([x[1] for x in solution]))
