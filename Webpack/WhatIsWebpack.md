### Webpack

Webpack is a module bundler.It lets you write any module format(even mixed),compiles them for the browser.Supports static async bundling(code splitting)
  You can create separate lazy loaded bundles at build time(nothing dynamic)
  ### Why webpack?
  
  #### Going back to history:There are primarily only 2 ways to use JS in browser
     i Add a script tag with src attribute and a reference to that js file-->this is how we leverage when we use webpack
     ii Write ur JS in HTML
  
  But there are problems:
      
      i Too many scripts:that u try to load from script tags in HTML.And each browser has bottlenecks.There's only a certain amount of concurrent requests that
          can fetch data in a single time.And so breaking ur app into a 100 JS files and loading them in a browser affects the performance  
      ii Unmaintainable file, * Scope ,* Size ,* Monolith files
  
  Solution:IIFE
  Treat each file as an IIFE (Revealing Module).
  People started to ship their JS but have  individua files wrapped in IIFEs.So now u can CONCATENATE files.
  With the help of IIFE we can "safely" combine files without concern of scope collision*. (*=There are caveats always)
  
   But there is a problem with this as well
   *Full rrebuilds everytime
  
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
