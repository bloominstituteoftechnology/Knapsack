Notes from chapter 15 of Cormen  `Intro to Algorithms`

# Dynamic Programming
* like the divide-and-conquer method, dynamic programming solves solutions to subproblems. 
    - **programming** in this instance refers to the tabular method and not actually writing computer code. 
    - divide and conquer, breaks down the problem into subproblems, solves the problems recursively, and then combine their solutions to solve the original problem. 

    - dyanmic programming applies when the subproblems are not independent of each other...that is when subproblems share subsubproblems. A dynamic solution solves each subsubproblem once and then saves its answer to a cache, thereby avoiding the work of recomputing every time. 

* Dynamic programming is often used to solve optimization problems. Each solution has a value and we wish to find a solution that is optimal (_min or max_) value. We call such a solution _an_ optimal solution 
rather than *the* optimal solution since there may be several solutions that achieve optimal value. 

Development:

1. Characterize the structure of an optimal solution
2. Recursively define the value of an optimal solution
3. Compute the value of an optmal solution in a bottum-up fashion
4. Construct an optimal solution from computed information. 

 - 4 is optional. It can be omitted if only the value of the solution is required. 

## Elements of Dynamic Programming

* Two key ingredients an optimization problem must have in order for dynamic programming to be applicable: 
1. optimal substructure
2. overlapping subproblems
    * _memoization_

------

### Characterize structure of optimal solution

* a problem exhibits *optimal substructure* if an optimal solution to the problem contains within it optimal solutions to subproblems. 
* We build a structure with an optimal solution by building optimal solutions to subproblems. 

