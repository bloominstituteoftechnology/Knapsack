# index, weight, value
with open("small1.txt", "r") as data:
    lines = data.readlines()
    database =  # what on earth do I put here? lol
    for line in lines:
        s = line.rstrip().split()
        item = (int(s[0]), int(s[1]), int(s[2]))
        database.append(item)  # what do I put here?
    print("database", database)


def total_value(database, max_weight):
    return sum([x[2] for x in database]) if sum([x[1] for x in database]) < max_weight else 0


cache = {}


def solve(database, max_weight):
    if not database:
        return ()
    if (database, max_weight) not in cache:
        head = database[0]
        tail = database[1:]
        include = (head,) + solve(tail, max_weight - head[1])
        dont_include = solve(tail, max_weight)
        if total_value(include, max_weight) > total_value(dont_include, max_weight):
            answer = include
        else:
            answer = dont_include
        cache[(database, max_weight)] = answer
    return cache[(database, max_weight)]


# database = (
#     (1, 42, 81), (2, 42, 42), (3, 68, 56), (4, 68, 25),
#     (5, 77, 14), (6, 57, 63), (7, 17, 75), (8, 19, 41),
#     (9, 94, 19), (10, 34, 12),
# )

max_weight = 100

solution = solve(database, max_weight)
print("solution:", solution)
print("value:", total_value(solution, max_weight))
print("weight:", sum([x[1] for x in solution]))
