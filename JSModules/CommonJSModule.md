
The most widely used approach to bolted-on JavaScript modules is called CommonJS modules. 
Node.js uses it and is the system used by most packages on NPM.CommonJS modules were designed with server-side development in mind.How would you load js, if there was no script tag,no html, in node. Thats how commonjs came into picture.The CommonJS group defined a module format to solve JavaScript scope issues by making sure each module is executed in its own namespace. This is achieved by forcing modules to explicitly export those variables it wants to expose to the "universe", and also by defining those other modules required to properly work.

The main concept in CommonJS modules is a function called require. When you call this with the module name of a dependency,
it makes sure the module is loaded and returns its interface.

Because the loader wraps the module code in a function, modules automatically get their own local scope. 
All they have to do is call require to access their dependencies and put their interface in the object bound to exports.

##  CommonJS Features

#### 1. Implemented by node, used for the server side when you have modules installed.
#### 2. Module Definition: 
In CommonJS, every file is its own module. The variables, functions, and objects you define in a file are local to that file unless explicitly exported.
#### 3. Module Caching:
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


#### 4. No runtime/async module loading or lazy loading:
Modules are loaded synchronously, meaning the program waits for the module to be fully loaded and executed before moving on. The browser doesn't understand require and export. Second, it loads modules synchronously which in the browser would be a terrible user experience. If we can fix those two problems, we're in good shape.Synchronous API makes it unsuitable for certain uses (client-side).In order to make commonJS suitable for client-side, browsers require a loader library or transpiler or bundler.
#### 5. import via “require”
#### 6. export via “module.exports”
#### 7. When you import you get back an object , no live bindings support :
 What we receive from require is not a copy. It's a reference to the exports object.
So if there are changes made by a file to a module it has imported, the changes won’t reflect at other places where the module is imported.The problems show up in circular references and self referencing modules.
 
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
                
#### No tree shaking, because when you import you get an object
#### No static analyzing, as you get an object, so property lookup is at runtime
#### You always get a copy of an object, so no live changes in the module itself


#### Poor cyclic dependency management, but they are supported:
Since require() can be called not just at the top level, but anywhere within a module, where there may also be circular references , this leads to inconsistencies .
A scenario where cyclic dependency is handled fine:
The following CommonJS code correctly handles two modules a and b cyclically depending on each other.

            //------ a.js ------
            var b = require('b');
            function foo() {
                b.bar();
            }
            exports.foo = foo;
            
            //------ b.js ------
            var a = require('a'); // (i)
            function bar() {
                if (Math.random()) {
                    a.foo(); // (ii)
                }
            }
            exports.bar = bar;
If module a is imported first then, in line i, module b gets a’s exports object before the exports are added to it. Therefore, b cannot access a.foo in its top level, but that property exists once the execution of a is finished. If bar() is called afterwards then the method call in line ii works.

Note that circular dependencies are explicitly supported in ES6 modules because they are static. They have no evaluation order. So the only time they fail is in certain build tools and runtime tools that attempt to translate them into something more linear, such as classic Node CommonJS require statements.
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

## Solving problems on commonjs via bundlers
What a JavaScript module bundler does is it examines your codebase, looks at all the imports and exports, then intelligently bundles all of your modules together into a single file that the browser can understand. Then instead of including all the scripts in your index.html file and worrying about what order they go in, you include the single bundle.js file the bundler creates for you.
Commonly used bundlers are Browserify and webpack

app.js ---> |         |    
users.js -> | Bundler | -> bundle.js  
dom.js ---> |         |  
 But there can be problems with bundlers.In case a module takes require and you pass a require function in, and then you call it a different require.And there's no way for bundlers to be able to statically analyze this stuff.We can't know without evaluating the code what's happening with this function.And so,  you end up with a lot ofproblems with getting really bloated bundles.
Refer:
https://github.com/Surbhi-Kohli/JSModulesAndWebpack/tree/main/JSModules/Browserify#readme


https://2ality.com/2015/07/es6-module-exports.html, https://exploringjs.com/es6/ch_modules.html#sec_imports-as-views-on-exports
