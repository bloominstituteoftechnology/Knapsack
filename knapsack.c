#include <stdio.h>
// compare two values and return the higher one
int max(int a, int b) { return (a > b)? a : b; }
// return maximum value that can be stuffed in a knapsack of arbitrary capacity
int knapsack(int capacity, int cost[], int value[], int n)
{
    int i,  w;
    int table[n + 1][capacity + 1];
// build a table and perform bottom up search 
// we want to avoid recalculating the same subproblems, so we avoid recursion
// results of computations to overlapping subproblems will be stored in the table 
// use tabulation to fill the table, always returning the last entry
    for (i = 0; i<= n; i++)
    {
        for (w = 0; w <= capacity; w++)
        {
            // base case
            if (i == 0 || w == 0) 
                table[i][w] = 0;
                
                else if (cost[i - 1] <= w)
                    table[i][w] = max(value[i - 1] + table[i - 1][w - cost[i - 1]], table[i - 1][w]);
                    
                    else 
                        table[i][w] = table[i- 1][w];
        }
                   //Time Complexity is O(n*Capacity)
    }
    return table[n][capacity];  
}


int main()
{

    int value[];
    int cost[];
    int capacity;
    int n = sizeof(value)/sizeof(value[0]);
    FILE *ptr_file;
    char buf[1000];

    ptr_file =fopen("input.txt","r");
    if (!ptr_file)
        return 1;

    while (fgets(buf,1000, ptr_file)!=NULL)
        fscanf("%d %d %d",&n , &cost, &value);

		fclose(ptr_file);
    		return 0;
    
    
    printf("\nvalue = %d",knapsack(capacity, cost, value, n));
    return 0;
}

