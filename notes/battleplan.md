# Knapsack

* what is it?
    - items are found that have `v` value. The total load that's able to be taken is `W`, where 
    `wˆi` is the weight of the individual item that has `vˆi` value.


How it looks on paper:



    W  = {(wˆi, vˆi)...(wˆn, vˆn)}



    
--??? 

What combination of items should one take to get the most value with the limited amount of space one  has? 
    
???--
    

- this is either or. No item can be "half-taken" or "left-behind"

    - optimal substructure properties 
        - if `wˆi` is taken away from `W`, `W` still needs to be the most valuable load weighing at most `W - wˆi`

``` markdown
we have _n_ items...

we have _W_ weight capacity...

each item...

_w_ = __weight__ of _i_ (item)

_v_ = __value__ of _i_ (item)

```

How do we translate this to code? 

* Two choices:
    - to take?
        - taking an item reduces the weight capacity of our knapsack

    - not to take?
        - retains capacity, but lessens available items to take by one

```python
# weight is a list with our weights, values is a list with our values
def knapSack(W, n, weight, value):
    if not W:
        return None
    else:
        return max(knapSack(W - weight(n-1), n-1, weight, value) + value[n-1], knapSack(W, n-1, weight, value ))




```

