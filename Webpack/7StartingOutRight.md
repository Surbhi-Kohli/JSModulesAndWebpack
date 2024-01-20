```
//webpack.config.js

//module.exports={}
   //webpack can take an object as a default export for the module ,
   //but it can also take a function that returns an object 
   ///
module.exports=()=>{
  return{
     output:{
       filename:"bundle.js"//now ur bundled code will be in dist/bundle.js
     }
  }
}

```
You can pass variables from cli to webpack config file
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

//package.json---modified to let u pass variables from command line to webpack
//config file

"scripts":{
         "webpack":"webpack",
         "prod":"npm run webpack -- --env.mode production",
         "dev":"npm run webpack  -- --env.mode developement watch",
         "prod:debug":"npm run debug --env.mode production",
         "dev:debug":"npm run debug --env.mode developement"
        }
 /*So when you pass the env flag to webpack,what it does is it takes whatever value that is, in this case,it's like we're passing an object with a mode property.And it's gonna provide that to the config for you, in the inside of the function.*/       
/* Here the webpack will consider env as an object which has a mode property.The env object will be passed to the webpack config */       
        
 module.exports=(env)=>{
 console.log(env)//{mode:'production'}
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
//here envmode will be a primitive value passed to webpack config and not an object
   module.exports=(env)=>{
   console.log(env)//'production'
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
variables.Like if u are using it from another build process like gradle or make,u can pass in that value and interpolate as follows.

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
You may want to have separate config files and save them all in build-utils folder
And this is gonna be where all of our supplemental,let's say partial configurations, or other utilities might end up.
First install html-webpack plugin
```
npm install html-webpack-plugin --save-dev 
```
```
//webpack.config.js
const webpack=require("webpack")//gives more interactive terminal progress
const HtmlWebpackPlugin=require("html-webpack-plugin");


module.exports=({mode})=>{
    return {
      mode,
      output:{
        filename:"bundle.js"
      },
      plugins:[new HtmlWebpackPlugin(),
     new webpack.ProgressPlugin]//any plugin that is on webpack namespace,u can access with dot syntax
    }
}

```

But you'll notice now, two assets have been emitted inside dist folder.
So I consider html-webpack-plugin an essential, specifically forsingle page applications.Even multi-page applications, you can adapt this plugin to work.But why is it so valuable is because it injects whatever output 
assets are there into this file for you.

Even let's say if you add some caching feature, or if you change the name,it reads that data as part of the webpack life cycle and then creates an index.html file and injects into the output.
Now what's super nice is now if I really wanted to,I could load an HTTP server and I could check this out locally.


## Webpack dev server:
What webpack-dev-server is.It is a web server based on Express.And all it's doing is webpack, instead of creating a bundle to your dist folder,it actually generates a bundle in memory.And it serves that information up to Express,which then does a web socket connection and says, hey, I just updated and reloads.

package.json
```
 "scripts": {
    "webpack-dev-server": "webpack-dev-server",
    "webpack": "webpack",
    "debug": "node --inspect --inspect-brk ./node_modules/webpack/bin/webpack.js",
    "prod": "npm run webpack -- --env.mode production",
    "dev": "npm run webpack-dev-server -- --env.mode development",
    "prod:debug": "npm run debug -- --env.mode production",
    "dev:debug": "npm run debug -- --env.mode development"
  }
```
Now run: ```npm run dev```
Any changes you make in ur index.js or button.js file or css files get reflected on the server immediately on save.It auto-runs in watch mode.

Essentially, **webpack-dev-server** operates as a local development server for projects using webpack, a popular module bundler for JavaScript applications.

Typically, when you're building an application with webpack, it creates a bundled version of your code (JavaScript, CSS, etc.) and saves it to a specified directory (often called 'dist' for distribution). However, webpack-dev-server works a bit differently during the development process.
In case u run webpack-dev-server, you wil notice that no dist folder is generated in ur project.
Instead of physically generating this bundle in a 'dist' folder on your file system, webpack-dev-server compiles your code into a bundle but holds it in the computer's memory (RAM) temporarily. This means that your files aren't written to disk during development; instead, they're stored in memory, making the process faster.

This in-memory bundle is then served to a local web server, which is based on Express.js, a popular web application framework for Node.js. Express serves this in-memory bundle to your browser, allowing you to view and interact with your application as if it were using the actual files on disk.

Moreover, webpack-dev-server uses a web socket connection to communicate any changes you make to your source files in real-time. When you modify a file and save it, webpack-dev-server recompiles only the parts that changed and pushes the updated bundle to the browser immediately through this established web socket connection. This **live reloading** or **hot module replacement (HMR)** feature is immensely helpful during development as it allows you to see changes instantly without needing to manually refresh the browser.

In summary, webpack-dev-server is a tool that compiles your code into an in-memory bundle, serves it via a local web server using Express.js, and facilitates real-time updates to your browser during development through a web socket connection, enhancing the development experience by speeding up the process and enabling quick feedback on code changes.

## Splitting environment config files:
origin/feature/04010-composing-configs-webpack-merge
 So what we wanna do is we want a way to conditionally load an extra JavaScript module that's going to kind of merge in with our base set of configuration items, right?

 We're able to have the mode, but how are we going to compose this object?We have this common configuration, but we need a way to merge in other configurations, right?And in a way that's safe, because this config has arrays, and so just object assign is not gonna be really valuable to you, right?And it's not gonna respect different things like array orders or other sorts of properties in your webpack config.So one of webpack maintainers actually wrote a really great library called **webpack-merge**, it's essentially just object assign for webpack-configs.
And so there are many other options,but by default it's really just doing object assign.So if you've used object assign before, it's the exact same behavior.You can pass a simple default, and then you can add whatever other thing you want to compose in the same manner on top of it.And so you can kinda see here, what I've done is, I return webpackMerge,and our base configuration is just the first argument.
 And so you can add it just by saying, ```npm install webpack-merge -d ```

```
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpackMerge = require("webpack-merge");

const modeConfig = env => require(`./build-utils/webpack.${env}`)(env);

module.exports = ({ mode, presets } = { mode: "production", presets: [] }) => {
  return webpackMerge(
    {
      mode,
      output: {
        filename: "bundle.js"
      },
      plugins: [new HtmlWebpackPlugin(), new webpack.ProgressPlugin()]
    },
    modeConfig(mode)
  );
};
```
build-utils/webpack.production.js

```
module.exports = () => ({
  output: {
    filename: "[chunkhash].js" /*We can use these string helpers that webpack provides
 out of the box.And this allows us to have hashing for JavaScript modules
when they're created.So technically in theory,we can just add this tiny partial
that is this partial config here.*/
  }
});

```

Now in your dist folder, for prod build, a hashedfile name would be generated which would automatically be added in script in index.html

 And then you'll see modeConfig, which returns either a production ordevelopment configuration, is added on second.So I'll just add this code in together here.So webpackMerge, so now we're just returning a functionthat will return our composed configuration, right?
 And the second argument to it will be our modeConfig.
