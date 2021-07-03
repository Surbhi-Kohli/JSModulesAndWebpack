```
//webpack.config.js

module.exports={}
   //webpack can take an object as a default export for the module ,
   //but it can also take a function that returns an object 
   ///This syntax can be used when we want to pass variables from cli to webpack config file
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
         "prod:debug":"npm run debug --mode production",
         "dev:debug":"npm run debug --mode developement"
        }
    */

//package.json---modified to let u pass variables from cli to webpack config file

```
"scripts":{
         "webpack":"webpack",
         "prod":"npm run webpack -- --env.mode production",
         "dev":"npm run webpack  -- --env.mode developement watch",
         "prod:debug":"npm run debug --env.mode production",
         "dev:debug":"npm run debug --env.mode developement"
        }
        
/* Here the webpack will consider env as an object which has a mode property.The env object will be passed to the webpack config */       
        
 module.exports=(env)=>{
 console.log(env)
  return{
     mode:env.mode
     output:{
       filename:"bundle.js"
     }
  }
}
 /* Now when we do npm run prod, our env object will get logged: {mode:production } */
```
   You can also pass single primitives
```
         
         "scripts":{
         "webpack":"webpack",
         "prod":"npm run webpack -- --envmode production",
         "dev":"npm run webpack  -- --envmode developement watch",
         "prod:debug":"npm run debug --envmode production",
         "dev:debug":"npm run debug --envmode developement"
        }
        //here envmode will be a primitive value passed to webpack config 
   module.exports=(env)=>{
   console.log(env)
  return{
      mode:env
     output:{
       filename:"bundle.js"
     }
  }
}
npm run prod //logs production

```
Prefer passing in an object as u might want to pass multiple things to webpack config like test parameters or environment 
variables.Like if u are using it from another build process like gradle or make,u can passin that value and interpolate as follows

```
         "scripts":{
          "webpack":"webpack",
          "prod":"npm run webpack -- --env.${someENVVar} production",
          "dev":"npm run webpack  -- --env.${someENVVar} developement watch",
          "prod:debug":"npm run debug -- --env.${someENVVar} production",
          "dev:debug":"npm run debug -- --env.${someENVVar} developement"
        }

```

### Adding Webpack Plugins
First install html-webpack plugin
```
npm install html-webpack-plugin --save-dev 
```
