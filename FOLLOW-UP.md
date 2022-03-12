# General

### Q) If you had more time, what further improvements or new features would you add?
I will ad `eslint` and configure its files, also I will continue working on unit test cases and test redux (simulate actions and async functions).
### Q) Which parts (JS/TS) are you most proud of?
Most of my previous work is `JS`, but Currently I prefer working with `TS` and doing my best to achieve best improvments wit it.
### Q) Do you have experience with docker?
I don't have much experience with it, but I'm familier with how it work and some basic commands for it.
### Q) Do you have experience with unit testing and end-to-end testing?
Yes, I used to test my code at previous with `(jest and Enzyme)`, and recently I changed from `Enzyme` to `React testing library` since it have mor flexability and less configurations. 
### Q) What is the output of the next code, and why?

```
for (var i = 0; i < 5; i++) {
 setTimeout(function() { console.log(i); }, 1000 );
}
```
result will be `5`,`5`,`5`,`5`,`5`, reason for that is each function run in the loop will be run after the whole loop completed  and all will take reference the last value stored in i, which is 5.
when we have async code in `JS`, this code will be waiting in callback queue until event loop check the callstack and make sure it can push it.

### Q) Iit possible to run mutli task in the same time in javascript? and why?
at usual cases `JS` don't support multi tasking since it working on single thread and if we need to run async code it will run in backgrount and listen on it when finished,but there is another way to run multi tasking or requests in parellel using `Promise.all()` and pass array of this async code as param.
### Q) How did you find the test overall? Did you have any issues or have difficulties completing?If you have any suggestions on how we can improve the test, we'd love to hear them
It's really great experience, I think this test was nt diffcult, the matter is `(investigate time in it = good and high quality code )`, also I added package and use it in `CORS` problem (`"cors": "^2.8.5"`).