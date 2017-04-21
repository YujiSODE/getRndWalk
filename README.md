# getRndWalk
The interface for simulating random walk in a closed system.

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
* `logs`: array that has simulation results as an object.
* `end()`: method to end simulation; it shows result.
