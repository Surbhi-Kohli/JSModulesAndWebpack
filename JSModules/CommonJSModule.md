The most widely used approach to bolted-on JavaScript modules is called CommonJS modules. 
Node.js uses it and is the system used by most packages on NPM.CommonJS modules were designed with server-side development in mind.How would you load js, if there was no script tag,no html, in node. Thats how commonjs came into picture.

The main concept in CommonJS modules is a function called require. When you call this with the module name of a dependency,
it makes sure the module is loaded and returns its interface.

Because the loader wraps the module code in a function, modules automatically get their own local scope. 
All they have to do is call require to access their dependencies and put their interface in the object bound to exports.

##  CommonJS Features

#### Implemented by node ,  Used for the server side when you have modules installed
#### Module Definition: 
In CommonJS, every file is its own module. The variables, functions, and objects you define in a file are local to that file unless explicitly exported.
#### Module Caching:
 Modules are cached after the first time they are loaded, improving performance and ensuring that module initialization only happens once. This means (among other things) that every call to require('foo') will get exactly the same object returned, if it would resolve to the same file. **This ensures that all parts of an application share the same instance of the module, making it stateful.** Provided require.cache is not modified, multiple calls to require('foo') will not cause the module code to be executed multiple times. This is an important feature. With it, "partially done" objects can be returned, thus allowing transitive dependencies to be loaded even when they would cause cycles.

 Important read: https://bambielli.com/til/2017-04-30-node-require-cache/

            //Example demonstrating caching of module imports

 // counter.js
 let count = 0;
function increment() {
 count++;
}
function getCount() {
 return count;
}
module.exports = { increment, count, getCount };


// app.js
const counter = require("./counter");
console.log(counter.getCount()); // Outputs: 0
counter.increment();
console.log(counter.getCount()); // Outputs: 1
require("./another");

// another.js
const counter = require("./counter");
console.log(counter.getCount()); // Outputs: 1

#### No runtime/async module loading
#### import via “require”
#### export via “module.exports”
#### When you import you get back an object
#### No tree shaking, because when you import you get an object
#### No static analyzing, as you get an object, so property lookup is at runtime
#### You always get a copy of an object, so no live changes in the module itself

#### Poor cyclic dependency management
#### Simple Syntax

To avoid loading the same module multiple times, require keeps a store (cache) of already loaded modules. 
When called, it first checks if the requested module has been loaded and, if not, loads it. This involves 
reading the module’s code, wrapping it in a function, and calling it.

```
// File log.js
function log(){
  console.log('Example of CJS module system');
}
// expose log to other modules
module.exports = { log }
// File index.js
var logModule = require('./log');
logModule.log()
```
#### named exports in commonJS
```
//common js named exports
const red="color:red;"
const blue="color:blue;"
const makeColorStyle=(color)=>`color:${color}`

exports.red=red;//named exports in common js
exports.blue=blue;
exports.makeColorStyle=makeColorStyle

```
