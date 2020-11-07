#include <stdio.h>
// compare two values and return the higher one
int max(int a, int b) { return (a > b)? a : b; }
// return maximum value that can be stuffed in a knapsack of arbitrary capacity
int knapsack(int capacity, int cost[], int value[], int n)
{
    int i,  w;
    int table[n + 1][capacity + 1];
// build a table and perform bottom up calculations 
// we want to avoid recalculating the same subproblems, so we avoid recursion 
// results of computations to subproblems will be stored in the table 
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


int main(int argc, char *argv[])
{



    //TODO: read command line argument to get file and size
    int capacity = 100; //todo read from command line
    FILE *fp;
    int cost[MAX_SIZE] = {0}; //todo magic numbers;
    int values[MAX_SIZE] = {0};  //todo magic numbers;
    int n = 0;

    fp = fopen("./data/large1.txt", "r");
    int numberRead = 0; //bucket to store the last item read from file

    for (int i = 0; i < MAX_SIZE * 3; i++) //todo magic numbers
   {
        for (int j = 0; j < 3; j++)
        {
            int found = fscanf(fp, "%d", &numberRead);
            if (found == 1)
            {
                switch (j)
                {
                    case 0:
                        n++;
                        break;
                    case 1:
                        cost[i] = numberRead;
                        break;
                    case 2:
                        values[i] = numberRead;
                        break;
            }
            }
        }
    }
        
        fclose(fp);
        int solution[n];
        memset(solution, 0, n*sizeof(int));
        int visited[capacity+1][n+1];
        memset(visited, 0, (capacity+1)*(n+1)*sizeof(int));
        int result = knapsack(n, capacity, cost, values, 0, visited);
        printf("The answer is %d\n", result);
     
    return 0;
};
//{
//     int value[];
//     int cost[];
//     int capacity;
//     int n = sizeof(value)/sizeof(value[0]);
//     FILE *ptr_file;
//     char buf[1000];

//     ptr_file =fopen("input.txt","r");
//     if (!ptr_file)
//         return 1;

//     while (fgets(buf,1000, ptr_file)!=NULL)
//         fscanf("%d %d %d",&n , &cost, &value);

// 		fclose(ptr_file);
//     		return 0;
    
    
//     printf("\nvalue = %d",knapsack(capacity, cost, value, n));
//     return 0;
// }