#include <stdio.h>

#define MAX_SIZE 100
// A utility function that returns maximum of two integers
int max(int a, int b) { return (a > b)? a : b; }
 
// Returns the maximum value that can be put in a knapsack of capacity W
int knapSack(int W, int wt[], int val[], int n)
{
   // Base Case
   if (n == 0 || W == 0)
       return 0;
 
   // If weight of the nth item is more than Knapsack capacity W, then
   // this item cannot be included in the optimal solution
   if (wt[n-1] > W)
       return knapSack(W, wt, val, n-1);
 
   // Return the maximum of two cases: 
   // (1) nth item included 
   // (2) not included
   else return max( val[n-1] + knapSack(W-wt[n-1], wt, val, n-1),
                    knapSack(W, wt, val, n-1)
                  );
}

int main (int argc, char *argv[])
{
    //TODO: read command line argument to get file and size


    int maxWeight = 100; //todo read from command line
    FILE *fp;
    

    int weights[MAX_SIZE] = {0}; //todo magic numbers;
    int values[MAX_SIZE] = {0};  //todo magic numbers;
    int numObjects = 0;

    fp = fopen("../data/small1.txt", "r");

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
                        numObjects++;
                        break;
                    case 1:
                        weights[i] = numberRead;
                        break;
                    case 2:
                        values[i] = numberRead;
                        break;
            }
            }
        }
            printf("trying to get a number : %d\n", weights[3]);
            printf("we counted %d objects\n", numObjects);
        
        fclose(fp);

        int result = knapSack(maxWeight, weights, values, numObjects);
        

        printf("The answer is %d\n", result);
    }
};