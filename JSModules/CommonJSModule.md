The most widely used approach to bolted-on JavaScript modules is called CommonJS modules. 
Node.js uses it and is the system used by most packages on NPM.

The main concept in CommonJS modules is a function called require. When you call this with the module name of a dependency,
it makes sure the module is loaded and returns its interface.

Because the loader wraps the module code in a function, modules automatically get their own local scope. 
All they have to do is call require to access their dependencies and put their interface in the object bound to exports.

