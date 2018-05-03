#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define DEBUG_TREASURE_SIZE 30

int knapsack(int W, int wt[], int val[], int n);
 
int max(int a, int b) { return (a > b) ? a : b; }
// Returns the maximum value that can be put in a knapsack of capacity W
int knapsack(int W, int wt[], int val[], int n)
{
  int i, w;
  int K[n + 1][W + 1];

  // Build table K[][] in bottom up manner
  for (i = 0; i <= n; i++)
  {
    for (w = 0; w <= W; w++)
    {
      if (i == 0 || w == 0)
        K[i][w] = 0;
      else if (wt[i - 1] <= w)
        K[i][w] = max(val[i - 1] + K[i - 1][w - wt[i - 1]],  K[i - 1][w]);
      else
        K[i][w] = K[i - 1][w];
    }
  }

  return K[n][W];
}

int main() 
{
  int indexNum[DEBUG_TREASURE_SIZE] = {0};
  int weight[DEBUG_TREASURE_SIZE] = {0};//TODO:  Use malloc with info from command line
  int value[DEBUG_TREASURE_SIZE] = {0};
  
  //From the command line, get the filename to load
  char *debugFile = "../data/medium1.txt";//TODO: Get file name from the command line
  printf("File name is %s\n", debugFile);

  int num;

  FILE *fptr;
  
  if ((fptr = fopen(debugFile, "r")) == NULL) {
    printf("Error! opening file\n");

    exit(1);
  }

  int counter = 0;
  int index = -1;//index starts at -1 becuase it increments before use
                  //TODO:  Fix index iteration so we can start at 0
  while(fscanf(fptr, "%d", &num) == 1)
  {
    int switchNumber = counter % 3;

    switch(switchNumber)
    {
      case 0: 
        index++;
        indexNum[index] = num;
        break;
      case 1: 
        weight[index] = num;
        break;
      case 2:
        value[index] = num;
        break;
    }

    counter++;
  }

  // fscanf(fptr,"%d", &num2);

  // printf("Value of n=%d\n", num);
  // printf("Value of n=%d\n", num2);
  fclose(fptr); 

  //set the knapsack size to the number in the second parameter
  int debugSize = 100;  //TODO:  Load from parameter

  
  // Start with the most valuable and go from there
  


  // Start with the smallest weight and go from there


  // Averages - do the cost/value ratio of each item, then start with the densest and go down until we run out of space


  // Brute force - Check every possible combination and pick the best one.
                                  //knapSack(W, wt, val, n)
  printf("The solution is %d\n", knapsack(debugSize, weight, value, DEBUG_TREASURE_SIZE));

  return 0;
}