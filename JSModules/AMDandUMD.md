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
