# detect-node
JS library to detect addition of nodes on web page

# Usage
use function:
```
NodeDetect(callback, selectors, timing);
```
where

**selectors(Optional- ["body \*"] by default)** : list of selectors path inside
which node detection is to be implemented.

**timing(Optional- 0ms by default)** : time limit between the adjacent function calls or to throttle down the event capturing by an specified time. (in ms)

**callback** : Function to execute when event is captured on detection of node 
on web page.

# Example
```
NodeDetect(function() {
   console.log("Node Detected");
}, ["div","p","a"], 3000);
```
