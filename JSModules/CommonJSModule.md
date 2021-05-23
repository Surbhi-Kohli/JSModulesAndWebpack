The most widely used approach to bolted-on JavaScript modules is called CommonJS modules. 
Node.js uses it and is the system used by most packages on NPM.

The main concept in CommonJS modules is a function called require. When you call this with the module name of a dependency,
it makes sure the module is loaded and returns its interface.

Because the loader wraps the module code in a function, modules automatically get their own local scope. 
All they have to do is call require to access their dependencies and put their interface in the object bound to exports.

##  CommonJS Features

#### Implemented by node
#### Used for the server side when you have modules installed
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
