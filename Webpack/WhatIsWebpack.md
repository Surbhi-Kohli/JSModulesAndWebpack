### Webpack

Webpack is a module bundler.It lets you write any module format(even mixed),compiles them for the browser.Supports static async bundling(code splitting)
  You can create separate lazy loaded bundles at build tym(nothing dynamic)
  
  ## How to configure webpack?
  
  There are 3 ways to do so .
  
  * webpack.config.js---its a module itself
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
 * webpack cli
   webpack <entry.js> <result.js> --colors --progress
   webpack-dev-server --port=9000
   
   * node api
   var webpack= require("webpack")
   
   //returns a compiler instance
   webpack({//config object here},
     function(err,status)){
       //compilerCallBack
       console.error(err)
     })
