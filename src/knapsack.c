#include <stdio.h>	
	
	int max(int a, int b) { return (a > b)? a : b; }
	
	int knapsack(int capacity, int weight[], int value[], int n)
	{
	int i,  w;
	int table[n + 1][capacity + 1];
	
	for (i = 0; i<= n; i++)
	{
	for (w = 0; w <= capacity; w++)
	{
	if (i==0 || w==0)
	table[i][w] = 0;
	else if (weight[i-1] <= w)
	table[i][w] = max(value[i - 1] + table[i-1][w - weight[i - 1]], table[i - 1][w]);
	else
	table[i][w] = table[i-1][w];
	}
	
	}
	return table[n][capacity];
	}
	
	
	int main()
	{
	int value[] = {60, 100, 120};
	int weight[] = {10, 20, 30};
	int capcity = 50;
	int n = sizeof(value)/sizeof(value[0]);
	printf("\nvalue = %d\n",knapsack(capcity, weight, value, n));
	return 0;
	}
