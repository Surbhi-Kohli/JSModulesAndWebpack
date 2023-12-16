nodejs: ppl took v8 engine, shoved it in a binary and gave it a run time.But how would u load js, if there was no script tag,no html, in node.
Thats how commonjs came into picture.To be able to actually include other files,they created the CommonJS module format.They use a syntax called require, which allows you to inject other pieces of a module into the current module.  with exports, there is this module's way of providing that scope or those values to another file if it wants to request it.
Thats how we solved scope,without the use of IIFEs
We now can pull in pieces of values, assign them to variables in a different module without having problems with scope or anything like that.
Benefit:
 * Static Analysis : This actually kinda gave us a little static analysis, where we can tell right here exactly what is used for the most part.
  
 * NPM + Node + Modules : It is so easy to ship whatever module you want with NPM. NPM was created as a package registry to be able to share CommonJS node modules across an entire ecosystem and registry.

   Problem:
   * There is no browser support for CommonJS.You can't just go write a CommonJS module and load it 
 in the browser.
   * There's no live bindings, and this is specifically with circular references.Trying to self-referral and having circular dependencies andthings like that.And this really starts to show itself through CommonJS.
   * Sync module resolution loader is slow:The resolution algo is built into node but is slow because it is synchronous.
   * No Browser support for commonjs
  
     Solution: Bundlers and linkers  like Browserify(static),RequireJs(Loader),SystemJS(Loader)
     But these bundlers started to be created, what they do,their main premise is to allow you to write CommonJS modules.But then it get bundled, and stripping those statements, andthen executed in the same orders so that it works in the webexactly as it might work or you would expected to work in your code.
     We all started to see different approaches like loaders, orthings that like JavaScripts that executes in the browser that's responsible forgoing in dynamically realtime fetching,different module formats.
     
     There are problems even in usage of bundlers and linkers: require is actually a function that you can pass anywhere.And so, we started seeing people abuse the crap out ofCommonJS syntax.
    * No static async/lazy loading(u get all bundles up front):
     eg, take require and you pass a require function in, and then you call it a different require.
And there's no way for bundlers to be able to statically analyze this stuff.We can't know without evaluating the code what's happening with this function.You end up with a lot of problems with getting really bloated bundles.And then there's no support for lazy loading in a way that we would expect.
     Require sure it is kind of dynamic, but there's no way to asynchronously loadsomething, especially for the web.
* commonjs bloat too dynamic:CommonJS is just too dynamic of a module format to be able to havereally optimized code.
