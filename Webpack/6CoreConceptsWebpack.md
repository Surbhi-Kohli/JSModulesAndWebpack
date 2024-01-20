### Mode:
By setting the mode parameter to either development, production or none, you can enable webpack's 
built-in optimizations that correspond to each environment. The default value is production.

module.exports = {
  mode: 'production',
};
In dev mode, the generated code has eval.
<img width="780" alt="Screenshot 2024-01-14 at 3 37 26 PM" src="https://github.com/Surbhi-Kohli/JSModulesAndWebpack/assets/32058209/4a424410-65f7-4463-acb4-dd63ba076e36">
We can set devtool to none , to increase readability of the dev build code
<img width="391" alt="Screenshot 2024-01-14 at 3 37 54 PM" src="https://github.com/Surbhi-Kohli/JSModulesAndWebpack/assets/32058209/13cbb516-19fc-4201-b0ee-3ac548b35a57">

### Entry:
<img width="544" alt="Screenshot 2024-01-04 at 9 18 54 PM" src="https://github.com/Surbhi-Kohli/JSModulesAndWebpack/assets/32058209/986d7a46-4b5b-4c0b-aff5-083f61162317">  

So say you have this diagram, and you have some code, and some modules, and you have a top level file.And it imports a component, and that component imports some lib and also some other components.And that lib has a dependency.
This is how JavaScript works.And let's say sometimes your dependencies aren't just JavaScript.Sometimes for a component library,you might rely on some SaaS or CSS or whatever.
But the point is that that top file, that is your entry point.That is the entry.It is the root of what is now kind of a graph here.
Entry file is the first JS file to load to "kick-off" your app.Webpack uses it as a starting point.And so we define this using an entry property in the configuration.There's a couple ways or a couple different types of data types that you can pass into the entry property.But the simplest is just a string, which is just a relative path.

Tells webpack what(files) to load for the browser(What u want ur code be bundled in its contents);Compliments the output property.
Behind the scenes:We just passed that string(relative path of entry file) to webpack's compiler and then it goes and resolves it and tries to create a graph.So when you think about entry as the concept, the entrypoint or the entry property, the entry concept is really about telling webpackwhat you want to include in the browser.What do you want your code to be bundled in its contents?

### Output:
<img width="859" alt="Screenshot 2024-01-04 at 9 25 16 PM" src="https://github.com/Surbhi-Kohli/JSModulesAndWebpack/assets/32058209/7e3362bf-18a7-4c1e-a5e8-b264aa74e102">



Tells webpack WHERE and HOW to distribute bundles(also called compilations).Works with Entry
```
module.exports ={
  entry: './browser.main.ts',
  output:{
   path:'./dist',
   filename:'./bundle.js' //in webpack 4 ,filename is set to main.js
                         //by default unless u specify in config file
  }
} 

```
### Loaders and Rules:

Out of the box, webpack only understands JavaScript and JSON files. Loaders allow webpack to process other types of files and convert them into valid modules that can be consumed by your application and added to the dependency graph.

 They allow you to pre-process files as you import or “load” them. Thus, loaders are kind of like “tasks” in other build tools and provide a powerful way to handle front-end build steps. Loaders can transform files from a different language (like TypeScript) to JavaScript or load inline images as data URLs. Loaders even allow you to do things like import CSS files directly from your JavaScript modules!
 
<img width="733" alt="Screenshot 2024-01-04 at 9 46 55 PM" src="https://github.com/Surbhi-Kohli/JSModulesAndWebpack/assets/32058209/f75527c9-c824-4901-9d5b-28476c5e3056">  
Right now, or at least just right up until webpack 4,we have always treated every dependency as a JavaScript module.So with rules, we tell webpack, how to treat files that are not js.
We have a terminology named ruleset(each object containing test and use) .A rule set basically has two minimum criteria.One,  if webpack comes across something that matches one of the regular expressions here, this rules set basically says, apply this node module, which is just a function behind the scenes.And transform whatever file that comes across, as it is being resolved.So basically webpack is transforming files that are being added to your dependency graph, and based on one of the loaders that are provided.
You're pattern matching the extension and applying a different type of transform to it.And this is a per file process.So, it's not something that just happens in bulk,and there's a very specific reason for that.
<img width="858" alt="Screenshot 2024-01-04 at 10 00 34 PM" src="https://github.com/Surbhi-Kohli/JSModulesAndWebpack/assets/32058209/d8a35521-b92a-4499-b524-8e49a26db1ea">
Consider the above image: webpack's not gonna understand typescript out of the box,and it would throw out errors trying to parse that file.And so what this ruleset does is, it basically says any time that you're trying to add a dependency to the graph,if it matches this extension, apply this transform.
Then webpack  transforms the file to JavaScript,which might also have dependency statements.So as webpack continues to traverse, it might come across something like, a specific ES syntax.  
And even though Webpack could parse this, you probably don't support a specificsyntax in the browser, so you'd wanna transform it.So there is a very specific use case for why we even use Bable.So it works on per file basis and not bulk

Rules(gist):Tell webpack how to modify files before its added to dependency graph.Defines rule on how we want  to treat files that aren't js or
  how we want to treat files that match against the specific pattern
Loaders: These are JS modules(functions) that takes the source file and returns it in a [modified state].Loaders tell webpack HOW to interpret and translate files.
         Transformed on a per-file basis before adding to the dependency graph

```
module:{
   rules:[
      { test: /\.ts$/ ,use:'ts-loader'}, //rule-set---2 min criteria
      { test: /\.js$/, use:'babel-loader'},
      { test:/\.css$/ ,use:'css-loader'}
   ],
}
//this is bare minimum use-case in one rule set with just 2 criteria specified.
```
<img width="379" alt="Screenshot 2024-01-04 at 10 06 33 PM" src="https://github.com/Surbhi-Kohli/JSModulesAndWebpack/assets/32058209/ea591896-a8c8-4482-a583-9b18243e2382">


We may have multiple criteria specified in one rule-set as follows.There are different types of features that help you filter and include or choose to ignore when you want to transform a file or not.There's things like include and exclude which are like,ignore any files that are coming from the node modules folder.Or let's say, use : you actually pass the loader node module string.And so you could choose to do it conditionally, or you can apply a chain of loaders.Or you could say I want it enforce.You could say I want this to run before every other loader orafter every other loader.So there's lots of different behaviors and ways that you can configure.But really this is the minimal, like this is the minimum use.
<img width="819" alt="Screenshot 2024-01-04 at 10 15 51 PM" src="https://github.com/Surbhi-Kohli/JSModulesAndWebpack/assets/32058209/fb4363bb-2fa8-4add-94ff-bb23d81e34dd">
<img width="865" alt="Screenshot 2024-01-04 at 10 17 55 PM" src="https://github.com/Surbhi-Kohli/JSModulesAndWebpack/assets/32058209/fa46d972-d566-4b46-897f-f009ad058d44">

```
module:{
  rules:[
    {
      test :regex,
      use: (Array|String|Function), //the loader node module string is what u pass here
      include:RegExp[],
      exclude:RegExp[],  //eg ignore any files that are coming  from node modules folder
      issuer: (RegExp|String)[],
      enforce:"pre"|"post"
    }
  ]
}
//this is use-case based
```

test:A regular expression that instructs the compiler which files to run the loader against.
use:An array/string/function that returns loader objects.you can add a loader conditionally or apply a chain of loaders
enforce:Can be "pre" or "post",tells webpack to run this rule before or after all the other rules
include:An array of regular expression that instructs the compiler which folders/files to include.Will only search paths provided with the include.
exclude:An array of regular expression that instructs the compiler which folders/files to ignore.

//include exclude example:

```
module:{
rules:[
{
  test:/\.ts$/,
  use:[
    'awesome-typescript-loader',
    'ng2-asset-loader'
  ]
  include:/some_dir_name/,
  exclude:[/\.(spec|e2e)\.ts$/],//i dont want to transform my spec files in production mode
}
]


}

```
<img width="772" alt="Screenshot 2024-01-05 at 1 00 49 PM" src="https://github.com/Surbhi-Kohli/JSModulesAndWebpack/assets/32058209/66a4cd95-9e3e-4515-9e51-379900a3fb1e">

#### Chaining Loaders 
<img width="846" alt="Screenshot 2024-01-05 at 12 40 10 PM" src="https://github.com/Surbhi-Kohli/JSModulesAndWebpack/assets/32058209/608d1c54-554b-49a2-a8ab-3946473bf13f">

The anatomy of a loader is just a function that takes a source and it returns a new source.So when they are chained,loaders always execute from right to left.
Now technically under the hood they actually go right left right.But the first pass going from left to right is actually just to collectmetadata, and it's not really that important.The important thing is that, they are going from right to left.
```
rules:[
{ 
test:/\.less$/,
use:['style','css','less'] //is equivalent to style(css(less())) "right to left execution" ---less is executed first 
}
]

```
Lets say that webpack encounters a .less file depenedency,the rule is a match,
so less-loader is applied to it .The loader converts the file to a css file.(style.css)  

Then we take the css file to pass it to css loader.And what that does behind the scenes is, it converts it to the style rules in memory as an array( valid javascript),that style-loader is equipped to consume.  
The style-loader adds css to DOM by injecting a <style> tag: 

<img width="357" alt="Screenshot 2024-01-20 at 3 08 43 PM" src="https://github.com/Surbhi-Kohli/JSModulesAndWebpack/assets/32058209/e0e12457-4e62-49d4-a2b0-bf218d1026cc">
 
 And then you'll see that once you pass that to style-loader,actually what happens is it converts it to a JavaScript module( inlineStyleInBrowser.js ) that says:Take these styles, slap it in a script tag on the browser.

So, and you might be thinking to yourself ,that doesn't really seem like best practice for performance, right?And it's true.Maybe for your critical styles you could use this.But there is lots of different ways of handling assets in Webpack.And so for example we have plugins that will extract this out into single bundles instead of trying to load it through JavaScript.But this is really just a showcase.  

List of loaders that work with webpack :
<img width="845" alt="Screenshot 2024-01-05 at 12 59 07 PM" src="https://github.com/Surbhi-Kohli/JSModulesAndWebpack/assets/32058209/384303f2-8d6a-44da-8904-d4a437718dde">

### Plugins

While loaders are used to transform certain types of modules, plugins can be leveraged to perform a wider range of tasks 
like bundle optimization, asset management and injection of environment variables.

A webpack plugin is a JavaScript object that has an apply method. This apply method is called by the webpack compiler, giving access to the entire compilation lifecycle.

Plugins add additional functionality to Compilations(optimized bundled modules).More powerful with more acces to CompilerAPI.
Does everything else that you'd ever want to in a webpack.Loaders are applied on per-file basis.But plugins can work on the whole bundle

Anatomy of Plugin:its an instance(js object) with an 'apply' property in the prototype chain OR A plugin is an es5 class which implements
an 'apply' function.
The compiler uses it to emit events.

It allows you to hook into the entire lifecycle of
events(compilation lifecycle).
webpack has a variety of built-in plugins.

Basic Plugin example:
```
function BellOnBundlerErrorPlugin(){}

BellOnBundlerErrorPlugin.prototype.apply=function(compiler){
   
    if(typeof process!=='undefined')
    {
       //Compiler events that are emitted and handled
       compiler.plugin('done'.function(stats){
         if(stats.hasError()){
         process.stderr.write('\x07');
         }
       });
       compiler.plugin('failed',function(err){
          process.stderr.write('\x07');
       })
       
    }

}
module.exports=BellOnBundleErrorPlugin;
/*************************************************************************/
Using the plugin

//require from node modules or webpack or local file
var BellOnBundleErrorPlugin=require('bell-on-error');
var webpack=require('webpack');

module.export={

 plugins:[
    new BellOnBundlerErrorPlugin(), //new instance
   
    
    //Just a few of the built in  plugin
    new webpack.optimize.CommonsChunkPlugin('vendors'),
    new webpack.optimize.UglifyJsPlugin()
 ]
 //....
}


```

How to use plugins?
a.require() plugin from node_modules into config.
b.Add new instance of plugin to plugins key in config object.
c.Provide additional info for arguments

Why do we want to make plugins instantiable ?

a.We should be able to apply the same plugin multiple times if u want to or if its valid.
b.We should be able to pass different types of arguments or options into the plugins
and hence instantiation required

Plugins let u do anything u can't do with loaders as loaders are applied on per file basis but with plugins ,u can access the whole bundle.
And so wouldn't want to run things like uglify.js in a loader as then u would get less optimized minification bcoz then minifier wont know
where other things are in the scope and whether its being used(It only knows about that file) and thats whywe have uglifyJS plugin or compression plugin,etc
Tip: When u want to interact more with the compiler runtime,or the event lifecycle or for functionality at the bundle level ,plugins are the way to go.

DID YOU KNOW: 80% of webpack is made up of its own plugin system.Webpack is completely event driven architecture and so all of the webpack source code is all of these plugins.
