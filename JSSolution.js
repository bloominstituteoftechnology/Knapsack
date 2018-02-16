//  Dynamic Approach to the knapsack problem
const knapsackDP = (items, capacity) => {
    // Dynamic: Semi-Scalable (depends on knapsack size/available memory) correct solution
    // Initialize the knapsack matrix: rows are items (including a "no item" row)
    // Columns are integral capacities: 0, 1, 2, ..., capacity - 1, capacity
    let knapsack = [[0] * (capacity + 1)]

    const taken = [0];
}