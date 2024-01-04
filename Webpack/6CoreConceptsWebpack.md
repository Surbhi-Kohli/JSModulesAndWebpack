### Mode:
By setting the mode parameter to either development, production or none, you can enable webpack's 
built-in optimizations that correspond to each environment. The default value is production.

module.exports = {
  mode: 'production',
};

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
   filename:'./bundle.js' //in webpack 4 ,filename is set to main.js by default unless u specify in config file
  }
} 

```
### Loaders and Rules:
Rules:Tell webpack how to modify files before its added to dependency graph.Defines rule on how we want  to treat files that aren't js or
  how we want to treat files that match against the specific loaders
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
We may have multiple criteria specified in one rule-set as follows
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
#### Chaining Loaders

```
rules:[
{ 
test:/\.less$/,
use:['style','css','less'] //is equivalent to style(css(less())) "right to left execution" ---less is executed first 
}
]
//The anatomy of a loader is just a function that takes a source and it returns a new source .
//Loaders always execute from right to left.Technically,under the hood they go right left right ,but the first pass 
//from left to right is just to collect meta-data
```

### Plugins

While loaders are used to transform certain types of modules, plugins can be leveraged to perform a wider range of tasks 
like bundle optimization, asset management and injection of environment variables.


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
