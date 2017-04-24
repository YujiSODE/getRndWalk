# getRndWalk
The interface for simulating random walk in a closed system.  
https://github.com/YujiSODE/getRndWalk

>Copyright (c) 2017 Yuji SODE \<yuji.sode@gmail.com\>  
>This software is released under the MIT License.  
>See LICENSE or http://opensource.org/licenses/mit-license.php
______

These functions return function that simulates random walk in a closed system.  
* `getRndWalkP(canvasId,rgb)`
* `getRndWalkL(canvasId,rgb)`

## Script
* `getRndWalkL.js`
* `getRndWalkP.js`

## Paremeter
* `canvasId`: id of target canvas.  

* `rgb`: RGB color.

## Parameters for returned function
* `title`: description of simulation.  

* `x0` and `y0`: initial values.  

* `maxStep`: the max step that is equivalent to positive integer; simulating process is not canceled  
  without calling method "`end()`" when `maxStep = 0`.  
  
* `sampleX` and `sampleY`: [optional] csv formatted numerical texts.

## Property and method of returned function
* `logs`: array that has simulation results as Log objects.  

* `end()`: method to end simulation; it shows result.

## Log objects
These object can be accessed with a property `logs` in returned function, as an array.  
A Log object has properties as follows:
