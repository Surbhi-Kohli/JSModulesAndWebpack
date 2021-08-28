### Node
They took the V8 negine ,shove it in a binary and gave it a runtime for server side.Node is JS that runs in server.How do u load JS,if theres no DOM,
How would u add script tag if theres no html.That was the issue..Lead to birth of CommonJS

  
  ```
    //index.js
  const path=require('path');//used for built in node.js modules
  const {add,subtract}=require("./math");//or also used modules from another file
  
   const sum=add(5,5);
const difference=subtract(10,4);
console.log(sum,difference);

/**********
* Math.js (has 2 named exports {add,subtract})
*
**********/
const divideFn=require("./division")
  //since division was default export,we could name the import whatever we like
  exports.add=(first,second)=>first+second;
   exports.subtract=(first,second)=>first-second;
exports.divide=divideFn;
/*
* division.js->has default exports "divide"
*/
module.exports=(first,second)=>first/second
  
  ```
  Gives scope for static analysis
  
  Problems with commonJs:
 *No Browser Support
 *No live bindings(Problems with circular references)-->ppl changing imported value in one file,doesnt show in other module
 
 * Sync module resolution,Loader(Slow)Resolution algo is slow,Its build into node but its really slow coz its synchronous
 * 
  Solution:Bundlers/Linkers:Browerify(static),RequireJS(Loader),SystemJs(Loader) or js that runs in browser that is responsible for fetching modules in the
  run time
  
  Problems:
require() is a function u can pass anywhere,so people were abusing its usage
_-No static analysis that way,because without evaluating the whole function,u won't know if theres a require somewhere within
-No async/lazy loading(all bundles up front) although require is dynamic module
  require is dynamic,but theres no way to async load something
  commonjs is Too dynamic module format to be able to write optimized code
  
  ESM:Static,Reusable,encapsulated,organized,convenient
  Problem:ESM for node???
    Modules,in browsers are natively slow-><script type="module" src="module.js"></script>
    Browser has to read top-down,need to start at import statement,need to find location of imports,resolve those and check 
    if imports are valid and do same for the imported page..All of this at run time,when u load the page
