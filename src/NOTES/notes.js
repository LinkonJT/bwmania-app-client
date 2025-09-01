Synchronous (sync):

Runs line by line, one after another.

Each line waits for the previous line to finish.

Example:

console.log("A");
console.log("B");
console.log("C");


Output is always: 
A
B
C
Nothing else can run until each line finishes.


Asynchronous (async):

Doesn’t block the rest of the code.

Some operations can happen in the background, while the rest of your code continues.

This is important for things that take time, like API requests, reading files, or timers.

Example:
console.log("A");

setTimeout(() => {
  console.log("B");
}, 1000);

console.log("C");

Output will be:

A
C


setTimeout runs asynchronously → doesn’t block the main code.

