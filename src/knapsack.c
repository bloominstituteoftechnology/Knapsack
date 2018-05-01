///README
///There is no starter file for this method.  Part of the exercise is building
///your own program in C, from scratch.  
///This is a _messy_ solution to the naive recursive knapsack problem in C.  The 
///intent is to show an iterative and imperfect process to get towards a working
///solution.  Once it works, we can make it better.
///Before starting on the solution, you may need to review/teach loading a file
///in C.
///This exercise gives practice finding code on the internet and modifying it
///to fit your own needs.  To start, google "knapsack solution in C".  One of the
///First results will be https://www.geeksforgeeks.org/knapsack-problem/
///After setting up the code to load the file, or entering a hardcoded test array,
///copy and paste the code from the website into your file and get it working.
///After running, compare the output to the docs and realize that our output also
///needs a list of what specific items to take.  We need to modify knapsack() to
///do this, but the function is dense and obscure.
///Use printf and comments to break down exactly what it is doing, then modify 
///it to what is shown below.  Project work after this demo is to clean up the code 
///and use the same process to implement the memoization technique that is farther 
///down on the web page.


#include <stdlib.h>
#include <stdio.h>
#include <string.h>

#define DEBUG_TREASURE_SIZE 30

int knapSack(int solution[], int W, int wt[], int val[], int n);

// A utility function that returns maximum of two integers
// Removed and put functionality in knapSack() to improve clarity of code
// int max(int a, int b) { return (a > b)? a : b; }
 
// Returns the maximum value that can be put in a knapsack of capacity W
// W is max weight, n is total number of items to choose from
int knapSack(int solution[], int W, int wt[], int val[], int n)
{

    int candidate[DEBUG_TREASURE_SIZE] = {0};
    memcpy(candidate, solution, DEBUG_TREASURE_SIZE * sizeof(int));//TODO: Validate how this works and pitfalls
  
    printf("Knapsack called for item %d, with %d space left\n", n, W);

    // Base Case
    if (n == 0 || W == 0)
    {
        //there are no items, or there is no space
        //printf("base case\n");
        return 0;
    }

    // If weight of the nth item is more than Knapsack capacity W, then
    // this item cannot be included in the optimal solution
    if (wt[n-1] > W)
    {
        //If it doesn't fit, we can't take it
        //Therfore, ignore this item, and test the next one
        //printf("item %d didn't fit\n", n);
        return knapSack(solution, W, wt, val, n-1);
    }
    
    // Return the maximum of two cases: 
    // (1) nth item included 
    // (2) not included
    
    else 
    {
        ////////////////the value of the item under consideration
        ///////////////////////plus
        ///////////////////////////calling knapsack
        ////////////////////////////////////////////////////////iterate to the next time
        ///////////////////////////////////capacity minus weight of current item
        //numberOne is equal to the value of the current item, plus keep going
        //Assume we are taking this item
        candidate[n-1] = 1;
        int numberOne = val[n-1] + knapSack(candidate, W-wt[n-1], wt, val, n-1);
        //printf("numberOne is %d\n", numberOne);

        //Ignore this item and keep going
        int numberTwo = knapSack(solution, W, wt, val, n-1);
        //printf("numberTwo is %d\n", numberTwo);
    
        int biggerValue;

        if(numberOne > numberTwo)
        {
            //if number one is bigger then we will take this item
            //mark it in the solution as a 1

            memcpy(solution, candidate, DEBUG_TREASURE_SIZE * sizeof(int));
            printf("numberOne was %d and numberTwo was %d\n", numberOne, numberTwo);

            biggerValue = numberOne;
        }
        else
        {
            //we get a better solution by not taking this item
            //printf("numberTwo was bigger\n");
            biggerValue = numberTwo;
        }
        
        return biggerValue;
    }
}

int main ()
{
    printf("Hello world\n");

    int indexNum[DEBUG_TREASURE_SIZE] = {0};
    int weight[DEBUG_TREASURE_SIZE] = {0};//TODO:  Use malloc with info from command line
    int value[DEBUG_TREASURE_SIZE] = {0};
    int solution[DEBUG_TREASURE_SIZE] = {0}; //: 0 if item skipped, 1 if taken
    
    //From the command line, get the filename to load
    char *debugFile = "../data/medium1.txt";//TODO: Get file name from the command line
    printf("File name is %s\n", debugFile);


    //Load the file
    // FILE *fp;
    // fp = fopen(debugFile, "r");


    // fclose(fp);

    int num;

    FILE *fptr;
    
    if ((fptr = fopen(debugFile,"r")) == NULL){
        printf("Error! opening file\n");

        // Program exits if the file pointer returns NULL.
        exit(1);
    }

    int counter = 0;
    int index = -1;//index starts at -1 becuase it increments before use
                    //TODO:  Fix index iteration so we can start at 0
    while(fscanf(fptr,"%d", &num) == 1)
    {
        //printf("We read %d\n", num);

        int switchNumber = counter % 3;
        //printf("switchNum is %d\n", switchNumber);
        switch(switchNumber)
        {
            case 0: 
                index++;
                indexNum[index] = num;
                break;
            case 1: 
                //store the weight in that array/index
                weight[index] = num;
                break;
            case 2:
                //store the value
                value[index] = num;
                break;
        }

        counter++;
    }

    printf("the value array contains ");
    for (int i = 0; i < DEBUG_TREASURE_SIZE; i++)
    {        
        printf("%d, ", value[i]);
    }
    printf("\n");
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
    printf("The solution is %d\n", knapSack(solution, debugSize, weight, value, DEBUG_TREASURE_SIZE));

    //TODO:  From the array of whether or not items are in the solution
    // Calculate and print the output
    // But for now, just print what is in the solution array

    printf("The solution array is: ");
    for (int i = 0; i < DEBUG_TREASURE_SIZE; i++)
    {        
        printf("%d, ", solution[i]);
    }
    printf("\n");

    return 0;
}

