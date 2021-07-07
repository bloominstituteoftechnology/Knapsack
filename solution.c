#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define MAX_SIZE 1000



///With recursion
int knapsack(int solution[],int capacity,int wts[],int vals[], int n){
    if(capacity == 0 || n ==0) {
        return 0;
    }
    //If nth items has a weight > capacity
    if(wts[n-1] > capacity){
        return knapsack(solution,capacity,wts, vals,n-1);
    }
    //Take the max of 2 case
    //1) If item is selected
    //2) if items is not selected; 
    int max;
    int v1[MAX_SIZE] = {0};
    v1[n-1] =1;
    int case1 = knapsack(v1,capacity-wts[n-1],wts,vals,n-1)+vals[n-1];
    int case2 = knapsack(solution,capacity,wts,vals,n-1);
    if(case1 > case2){
        max = case1;
    } else {
        max = case2;
    }
    return(max);
}

// With Dynamic Programming
//Keeping the recursion intact


int dynamicKs(int n,int capacity,int wts[],int vals[], int i, int visited[capacity+1][n+1]){
    if(i >= n-1 || capacity == 0){
        visited[capacity][i] = 0;
        return 0;
    }
    if(wts[i] > capacity){
        if(!visited[capacity][i+1]){
            visited[capacity][i+1] = dynamicKs(n,capacity,wts,vals,i+1,visited);
        }
        return visited[capacity][i+1];
    }
    //Case1 Items Seleted //Case2 Not selected
    int case1, int case2, int max;
    if(!visited[capacity-wts[i]][i+1]){
        visited[capacity-wts[i]][i+1] = dynamicKs(n,capacity-wts[i],wts,vals,i+1,visited);
    }
    case1 = visited[capacity-wts[i]][i+1]+vals[i];
    if(!visited[capacity][i+1]){
        visited[capacity][i+1]= dynamicKs(n,capacity,wts,vals,i+1,visited);
    }
    case2 = visited[capacity][i+1];
    if(case1 > case2){
        max = case1;
    } else {
        max =case2;
    }
    visited[capacity][i] = max;
    return max;
}



int main()
{
    //TODO: read command line argument to get file and size
    int maxWeight = 100; //todo read from command line
    FILE *fp;
    int weights[MAX_SIZE] = {0}; //todo magic numbers;
    int values[MAX_SIZE] = {0};  //todo magic numbers;
    int numObjects = 0;

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
    }
        
        fclose(fp);
        int solution[numObjects];
        memset(solution, 0, numObjects*sizeof(int));
        int visited[maxWeight+1][numObjects+1];
        memset(visited, 0, (maxWeight+1)*(numObjects+1)*sizeof(int));
        int result = dynamicKs(numObjects,maxWeight, weights, values,0, visited);
        printf("The answer is %d\n", result);
        // for(int i = 0; i < numObjects; i++){
        //     printf("The value at index %d in solution is %d\n",i,solution[i]);
        // }
    return 0;
};
