### Webpack

Webpack is a module bundler.It lets you write any module format(even mixed),compiles them for the browser.Supports static async bundling(code splitting)
  You can create separate lazy loaded bundles at build time(nothing dynamic)
  ### Why webpack?
  
  #### Going back to history:There are primarily only 2 ways to use JS in browser
  i Add a script tag with src attribute and a reference to that js file-->this is how we leverage when we use webpack
  ii Write ur JS in HTML
  
  But there are problems:
      
      i Doesn't scale:Too many scripts that u try to load from script tags in HTML.And each browser has bottlenecks.There's only a certain amount of concurrent requests that can fetch data in a single time.And so breaking ur app into a 100 JS files and loading them in a browser affects the performance.  
      ii Single Unmaintainable file(with like 10,000 lines of js), creates problems like :Scope, Size, Readability, Fragility, Monolith files
  
 ##### Solution:IIFE
  Treat each file as an IIFE (Revealing Module Pattern).-->Provide data from an outside scope and return scoped information
  ```
  /**Immediately Invoked Function Expression **/
  const whatever=(function(dataNowUsedInside){
     return {
       someAttribute:"youWant"
     }
  })(1)
  /*
  * whatever.someAttribute
  * > "youWant"
  */
  
  //IIFEs prevent scope leak
  var outerScope=1
  //IIFE
  
  const whatever=(function(dataNowUsedInside){
     var outerScope=4;
     return{
       someAttribute:"youWant"
     }
  
  })(1);
  console.log(outerScope);//1 -->No inner scope leak!!!
  ```
  
  
  People started to ship their JS but have  individual files wrapped in IIFEs.So now u can CONCATENATE files.
  With the help of IIFE we can "safely" combine files without concern of scope collision*. (*=There are caveats always)
   Tools like Make,Gulp,Grunt,Broccoli,Brunch and StealJS helped to solve problem
   using this approach.
  
   But there is a problem with this as well
      
      i Full rebuilds everytime: Every time u change somethng in one file,u have to rebuild the whole project (concatenate all scripts together and create a build again).
      ii Dead code :Concat doesn't help tie usages across files,ie if u're just concatenating files together,
       how do u remove code that u're actually not using or
       how do u even know that there is some unused code.
      iii Lots of IIFES are slow .-->Forces JS engine to eager parse the code(intensuve and costly parsing time when js is loading),leads to slower running apps
      iv No dynamic loaing: Lazy loading is not possible.You ship the whole code
      And so JS modules came into picture to solve these issues.
      
  
  ## How to configure webpack?
  
  There are 3 ways to do so .
  
  * webpack.config.js---its a module itself
 ```
 module.exports={
   entry:{
     vendor:'./src/vendor.ts'
       main:'./src/main.browser.ts'
   }
  output:{
   path:'dist/',
    filename:[name].bundle.js
  }
  
}

```

 * webpack cli
   webpack <entry.js> <result.js> --colors --progress
   webpack-dev-server --port=9000
   
   * node api
```
var webpack= require("webpack")
   
   //returns a compiler instance
   webpack({//config object here},
     function(err,status)){
       //compilerCallBack
       console.error(err)
     })
```
