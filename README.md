
This node module is develop because when you have large iteration to do in node their is no sufficent module their. By this module you can iterate more then crores and their will be no crash in the application . Even Asyn module crash in node on iteration.


## Installation

To install `nodeloops` using [npm](https://www.npmjs.org/), simply run:

```console
$ npm install nodeloops
```

## How to use

If you have installed `nodeloops`, you can use it to  asynchronously even if you have crore of record in your for loop.


```javascript
var nodeloops = require('nodeloops');

var i=0;

// this is very fast 
nodeloops.fastforloops(function (next) {
       if(i == 10000000)  
            {
		next(i);
                console.log("task done");
            }else{     
                next();
                i++;  
            }
       }
       ,
        function (err) {
            console.log('All done!');
        }
    );

we made several cron job type task which run asynchronously and manupulate large for loops and even some time we need to our
for loop to stay their inside loop then excute so for that i have give microsecond parameter so that you can perform task easily and on time 
which you require . If you not need that simply place 0 (ZERO) in it.  
// this is a function run as fast you want it to run 

// put microsecond 0 if you dont want . It will not crash even the loop is huge in iteration

nodeloops.mediumforloops(start, end,microsecond, function(n) {
  // action you want to perform
  console.log("index number:", n);
});


nodeloops.mediumforloops(start, end,microsecond, function(n) {
  // action you want to perform
  console.log("index number:", n);
});



Want to run some code after the loop is finished? No problem!

```javascript

nodeloops.mediumforloops(0, 10000000,0, function(n) {
 // action you want to perform
  console.log("index number:", n);
}, function() {
  console.log('task completed!');
});
```










