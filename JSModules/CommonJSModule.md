
The most widely used approach to bolted-on JavaScript modules is called CommonJS modules. 
Node.js uses it and is the system used by most packages on NPM.CommonJS modules were designed with server-side development in mind.How would you load js, if there was no script tag,no html, in node. Thats how commonjs came into picture.

The main concept in CommonJS modules is a function called require. When you call this with the module name of a dependency,
it makes sure the module is loaded and returns its interface.

Because the loader wraps the module code in a function, modules automatically get their own local scope. 
All they have to do is call require to access their dependencies and put their interface in the object bound to exports.

##  CommonJS Features

#### 1. Implemented by node, used for the server side when you have modules installed.
#### 2. import via “require”
#### 3. export via “module.exports”
#### 4. Module Definition: 
In CommonJS, every file is its own module. The variables, functions, and objects you define in a file are local to that file unless explicitly exported.
#### 5. Module Caching:
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
           /* Node.js doesn't re-execute the counter.js module. 
             Instead, it retrieves the cached exports from the 
             first require call in app.js. This is 
            the singleton behavior in action.*/


#### 6. No runtime/async module loading:
Modules are loaded synchronously, meaning the program waits for the module to be fully loaded and executed before moving on.Synchronous API makes it unsuitable for certain uses (client-side)as this can pose a few performance issues for large-scale applications that have hundreds of modules. 
So there is by default ,No Browser support.
In order to make commonJS suitable for client-side, browsers require a loader library or transpiler,Bundlers and linkers like Browserify(static),RequireJs(Loader),SystemJS(Loader) .So these bundlers started to be created, what they do,their main premise is to allow you to write CommonJS modules.Module loaders are libraries that load, interpret, and execute JavaScript in the browser at run-time.So tools like Bundlers/Linkers:Browerify(bundler)(static),RequireJS(Loader),SystemJs(Loader) can be used to fetch and execute modules at run-time and hence solve issues related to commonjs on client-side.

#### 7. When you import you get back an object , no live changes support :
 What we receive from require is not a copy. It's a reference to the exports object.
 
                // counter.js
                let count = 0;
                function increment() { count++; }
                module.exports = { increment, count, getCount };
                
                // app.js
                const counter = require("./counter");
                counter.increment();
                console.log(counter.count); // Outputs: 0, not 1!

Another example:

               //------ lib.js ------
                var counter = 3;
                function incCounter() {
                    counter++;
                }
                module.exports = {
                    counter: counter, // (A)
                    incCounter: incCounter,
                };

                //------ main1.js ------
                var counter = require('./lib').counter; // (B)
                var incCounter = require('./lib').incCounter;
                
                // The imported value is a (disconnected) copy of a copy
                console.log(counter); // 3
                incCounter();
                console.log(counter); // 3

               // The imported value can be changed
               counter++;
               console.log(counter); // 4
              /* If you access the value via the exports object, it is still 
               copied once, on export:*/
               
               //------ main2.js ------
               var lib = require('./lib');
               
               // The imported value is a (disconnected) copy
               console.log(lib.counter); // 3
               lib.incCounter();
               console.log(lib.counter); // 3

               // The imported value can be changed
               lib.counter++;
               console.log(lib.counter); // 4
                
#### 8.No tree shaking, because when you import you get an object
#### No static analyzing, as you get an object, so property lookup is at runtime
#### You always get a copy of an object, so no live changes in the module itself


#### Poor cyclic dependency management, but they are supported
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
