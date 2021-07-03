```
//webpack.config.js

module.exports={}
//webpack can take an object as a default export for the module ,nut it can also take a function that returns an object 

module.exports=()=>{
  return{
     Output:{
       filename:"bundle.js"
     }
  }
}

```
### Passing variable to webpack config
How to access environment variables from the command line?

Usually we apply certain features depending on whether we are in production environment or dev environment.Webpack tries to solve this 
problem out of the box using the mode flag in the webpack config but u can also pass in environment variables and environment flag from the CLI into 
the configuration and that is super valuable.

```
// package.json --older 
/*
"scripts":{
     "webpack":"webpack",
     "prod":"npm run webpack -- --mode production",
     "dev":"npm run webpack  -- --mode developement watch",
     "prod:debug":"npm run debug --mode production"
}
*/

```
