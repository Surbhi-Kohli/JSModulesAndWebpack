 ## AMD: Async Module Definition

#### Implemented by RequireJs
#### Used for the client side (browser) when you want dynamic loading of modules
#### Import via “require”
#### Complex Syntax

```
// File log.js
define(['logModule'], function(){
    // export (expose) foo for other modules
    return {
        log: function(){
          console.log('Example of AMD module system');    
      }
    };
 });
// File index.js
require(['log'], function (logModule) {
  logModule.log();
});

```
Problems with RequireJS:
No static analysis: require() is a function u can pass anywhere so without evaluating the whole function,RequireJs(or loaders) won't know if there's a require() function somewhere within.
No async/lazy loading(all bundles up front) : although commonjs is dynamic module ,but theres no way to async load something. commonjs is too dynamic module format to be able to write optimised code.

 ## UMD:Universal Module Definition
 
#### Combination of CommonJs + AMD (that is, Syntax of CommonJs + async loading of AMD)
#### Can be used for both AMD/CommonJs environments
#### UMD essentially creates a way to use either of the two, while also supporting the global variable definition. 
####    As a result, UMD modules are capable of working on both client and server.

```
// File log.js
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.log = mod.exports;
  }
})(this, function (exports) {
  "use strict";
  function log() {
    console.log("Example of UMD module system");
  }
  // expose log to other modules
  exports.log = log;
});    
```
