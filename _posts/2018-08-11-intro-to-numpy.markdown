---
title:  "Intro to Numerical Computing with NumPy"
date:   2018-08-11 06:28:00 -0600
categories: numpy
---


```python
a = [1, 2, 3, 4]
```


```python
b = [10, 11, 12, 13]
```


```python
a + b
```




    [1, 2, 3, 4, 10, 11, 12, 13]



```python
output = []

for item1, item2 in zip(a, b):
    output.append(item1 + item2)
```


```python
output
```




    [11, 13, 15, 17]




```python
g = list(range(1000000))
```


```python
%timeit sum(g)
```

    17.5 ms ± 932 µs per loop (mean ± std. dev. of 7 runs, 100 loops each)



```python
import numpy as np
```


```python
g_array = np.array(g)
```


```python
%timeit np.sum(g_array)
```

    1.98 ms ± 11.1 µs per loop (mean ± std. dev. of 7 runs, 100 loops each)


The reason for the speed increase: The python list contains a list of addresses to memory locations. Numpy contains all integers in one integer array that are all stored together and the interpreter does not have to perform type checking, and derefernce the integers.


```python
a = np.array([1, 2, 3, 4])
b = np.array([10, 11, 12, 13])
```


```python
a
```




    array([1, 2, 3, 4])




```python
b
```




    array([10, 11, 12, 13])




```python
a + b
```




    array([11, 13, 15, 17])




```python
a * b
```




    array([10, 22, 36, 52])




```python
a / b
```




    array([0.1       , 0.18181818, 0.25      , 0.30769231])




```python
a ** b
```




    array([       1,     2048,   531441, 67108864])




```python
type(a)
```




    numpy.ndarray




```python
a.dtype
```




    dtype('int64')




```python
a.ndim
```




    1




```python
a.shape
```




    (4,)



Has trailing comma becuase it is a tuple with one element.


```python
a.itemsize
```




    8




```python
a.nbytes
```




    32




```python
a * 100
```




    array([100, 200, 300, 400])




```python
np.sin(a)
```




    array([ 0.84147098,  0.90929743,  0.14112001, -0.7568025 ])




```python
np.log(a)
```




    array([0.        , 0.69314718, 1.09861229, 1.38629436])




```python
np.exp(a)
```




    array([ 2.71828183,  7.3890561 , 20.08553692, 54.59815003])




```python
np.log
```




    <ufunc 'log'>




```python
a[0]
```




    1




```python
a[0] = 10
```


```python
a
```




    array([10,  2,  3,  4])




```python
a[0] = 10.6
```


```python
a
```




    array([10,  2,  3,  4])



type of the np array was integer so assigning a float just got truncated.


```python
c = np.array([1, 2, 3, 4])
```


```python
c.fill(0)
c
```




    array([0, 0, 0, 0])




```python
a = np.array([1, 2, 3, 4.0], dtype='int32')
a.dtype
```




    dtype('int32')




```python
a
```




    array([1, 2, 3, 4], dtype=int32)




```python
c = np.array([[10, 11, 12], [20, 21, 22]])
c
```




    array([[10, 11, 12],
           [20, 21, 22]])




```python
c.dtype
```




    dtype('int64')




```python
c.ndim
```




    2




```python
c.shape
```




    (2, 3)



2 rows and 3 columns. (rows, columns) 

default 'building block' of numpy is an array, not a matrix. default is row major.


```python
a.T
```




    array([1, 2, 3, 4], dtype=int32)



does not product a column vector, like it would in MATLAB


```python
c.size
```




    6




```python
c[0, 0]
```




    10




```python
c[0]
```




    array([10, 11, 12])




```python
a = np.array([10, 11, 12, 13, 14])
a
```




    array([10, 11, 12, 13, 14])



-5 -4 -3 -2 -1  
0 1 2 3 4


```python
a[1:3]
```




    array([11, 12])




```python
a[1:-2]
```




    array([11, 12])




```python
a[-4:3]
```




    array([11, 12])




```python
a[:3]
```




    array([10, 11, 12])




```python
a[-2:]
```




    array([13, 14])




```python
a[::2]
```




    array([10, 12, 14])




```python
a = np.zeros((6, 6), dtype='int64')
for i in range(6):
    a[i] = (i+1) * np.array(range(1, 7))
a
```




    array([[ 1,  2,  3,  4,  5,  6],
           [ 2,  4,  6,  8, 10, 12],
           [ 3,  6,  9, 12, 15, 18],
           [ 4,  8, 12, 16, 20, 24],
           [ 5, 10, 15, 20, 25, 30],
           [ 6, 12, 18, 24, 30, 36]])




```python
a[0, 3:5]
```




    array([4, 5])




```python
a[4:, 4:]
```




    array([[25, 30],
           [30, 36]])




```python
a[:, 2]
```




    array([ 3,  6,  9, 12, 15, 18])



Everytime you **index** you **drop** a dimension.  
Everytime you **slice** you **keep** that dimension.  
If there is a colon present, then you are **slicing**.


```python
a[1:4, 1:4]
```




    array([[ 4,  6,  8],
           [ 6,  9, 12],
           [ 8, 12, 16]])




```python
a[2::2, ::2]
```




    array([[ 3,  9, 15],
           [ 5, 15, 25]])




```python
a = np.arange(25).reshape(5, 5)
a
```




    array([[ 0,  1,  2,  3,  4],
           [ 5,  6,  7,  8,  9],
           [10, 11, 12, 13, 14],
           [15, 16, 17, 18, 19],
           [20, 21, 22, 23, 24]])




```python
red = a[:, 1::2]
print(red)
blue = a[1::2, :3:2]
print(blue)
yellow = a[4]
print(yellow)
yellow = a[-1]
print(yellow)
```

    [[ 1  3]
     [ 6  8]
     [11 13]
     [16 18]
     [21 23]]
    [[ 5  7]
     [15 17]]
    [20 21 22 23 24]
    [20 21 22 23 24]



```python
red[-1, -1] = 0
```


```python
red
```




    array([[ 1,  3],
           [ 6,  8],
           [11, 13],
           [16, 18],
           [21,  0]])




```python
a
```




    array([[ 0,  1,  2,  3,  4],
           [ 5,  6,  7,  8,  9],
           [10, 11, 12, 13, 14],
           [15, 16, 17, 18, 19],
           [20, 21, 22,  0, 24]])




```python
id(a)

```




    140687300558080




```python
id(red)
```




    140687300532784




```python
red.flags
```




      C_CONTIGUOUS : False
      F_CONTIGUOUS : False
      OWNDATA : False
      WRITEABLE : True
      ALIGNED : True
      WRITEBACKIFCOPY : False
      UPDATEIFCOPY : False




```python
a.flags
```




      C_CONTIGUOUS : True
      F_CONTIGUOUS : False
      OWNDATA : False
      WRITEABLE : True
      ALIGNED : True
      WRITEBACKIFCOPY : False
      UPDATEIFCOPY : False




```python
red.data
```




    <memory at 0x7ff45d631c18>




```python
a.data
```




    <memory at 0x7ff45d631cf0>




```python
red.copy()
```




    array([[ 1,  3],
           [ 6,  8],
           [11, 13],
           [16, 18],
           [21,  0]])




```python
mask = np.array([0, 1, 1, 0, 0, 1, 0, 0], dtype=bool)
```


```python
mask2 = a < 30
```


```python
a = np.arange(0, 80, 10)
a
```




    array([ 0, 10, 20, 30, 40, 50, 60, 70])




```python
indices = [1, 2, -3]
y = a[indices]
y
```




    array([10, 20, 50])




```python
a[mask2]
```




    array([ 0, 10, 20])




```python
a[mask]
```




    array([10, 20, 50])




```python
a = np.array([3, -1, -2, 4, -6, 8])
```


```python
a
```




    array([ 3, -1, -2,  4, -6,  8])




```python
a < 0
```




    array([False,  True,  True, False,  True, False])




```python
negatives = a < 0
```


```python
a[negatives]
```




    array([-1, -2, -6])




```python
a[a < 0]
```




    array([-1, -2, -6])




```python
a[a < 0] = 0
```


```python
a
```




    array([3, 0, 0, 4, 0, 8])




```python
a < 8
```




    array([ True,  True,  True,  True,  True, False])




```python
a > 3
```




    array([False, False, False,  True, False,  True])




```python
a > 3 and a < 8
```


    ---------------------------------------------------------------------------

    ValueError                                Traceback (most recent call last)

    <ipython-input-176-a611552ecf48> in <module>()
    ----> 1 a > 3 and a < 8
    

    ValueError: The truth value of an array with more than one element is ambiguous. Use a.any() or a.all()



```python
(a < 8).any()
```




    True




```python
# Binary Operators
#   and, or, not
# Bitwise operators
#   & (and), | (or), ~ (not), ^ (xor)
```


```python
(a > 3) & (a < 8)
```




    array([False, False, False,  True, False, False])




```python
a
```




    array([3, 0, 0, 4, 0, 8])




```python
f = 3
```

Slicing gives a view of the same data (memory buffer).  
Fancy indexing (masking) gives a copy.


```python
np.nonzero(negatives)
```




    (array([1, 2, 4]),)




```python
a.sort()
```


```python
a
```




    array([0, 0, 0, 3, 4, 8])




```python
a = np.array([10, 1, 20])
b = np.array([2, 3, 20])
```


```python
a > b
```




    array([ True, False, False])




```python
a = np.arange(25).reshape(5, 5)
```


```python
a
```




    array([[ 0,  1,  2,  3,  4],
           [ 5,  6,  7,  8,  9],
           [10, 11, 12, 13, 14],
           [15, 16, 17, 18, 19],
           [20, 21, 22, 23, 24]])




```python
mask = a % 3 == 0
```


```python
mask
```




    array([[ True, False, False,  True, False],
           [False,  True, False, False,  True],
           [False, False,  True, False, False],
           [ True, False, False,  True, False],
           [False,  True, False, False,  True]])




```python
a[mask]
```




    array([ 0,  3,  6,  9, 12, 15, 18, 21, 24])




```python
output = np.empty_like(a, dtype='float')
output.fill(np.nan)
output
```




    array([[nan, nan, nan, nan, nan],
           [nan, nan, nan, nan, nan],
           [nan, nan, nan, nan, nan],
           [nan, nan, nan, nan, nan],
           [nan, nan, nan, nan, nan]])




```python
output[mask] = a[mask]
output
```




    array([[ 0., nan, nan,  3., nan],
           [nan,  6., nan, nan,  9.],
           [nan, nan, 12., nan, nan],
           [15., nan, nan, 18., nan],
           [nan, 21., nan, nan, 24.]])




```python
np.where(a % 3 == 0, a, np.nan)
```




    array([[ 0., nan, nan,  3., nan],
           [nan,  6., nan, nan,  9.],
           [nan, nan, 12., nan, nan],
           [15., nan, nan, 18., nan],
           [nan, 21., nan, nan, 24.]])




```python
l = [1, 2, 3, 4, 5]
l2 = l[:]
```


```python
l2[2] = 0
```


```python
l2
```




    [1, 2, 0, 4, 5]




```python
l
```




    [1, 2, 3, 4, 5]



#### Computations with Arrays 
**Rule 1:** Operations between multiple array objects are first checked for proper shape match.  
    See documentation about *broadcasting*  
**Rule 2:** Mathematical operators (+ - \* / exp, log, ...) apply element by element, on the values.  
**Rule 3:** Reduction opertations (mean, std, skew, kurt, sum, prod, ...) apply to the whole array, unless an axis is specified.  
**Rule 4:** Missing values propagate unless explicitly ignored (nanmean, nansum, ...)

(2, 3)  
specify axis 0, then have a (3,)  
specify axis 1, then have a (2,)


```python
a = np.array([[1, 2, 3], [4, 5, 6]])
```


```python
print(np.sum(a, axis=0))
print(np.sum(a, axis=1))
```

    [5 7 9]
    [ 6 15]



```python
a = np.arange(24).reshape(6, 4)
```


```python
a.shape
```




    (6, 4)

