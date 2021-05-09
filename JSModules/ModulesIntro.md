### Modules, introduction
As our application grows bigger, we want to split it into multiple files, so called “modules”. A module may contain a class or a library of functions for a specific purpose.

For a long time, JavaScript existed without a language-level module syntax. That wasn’t a problem, because initially scripts were small and simple, so there was no need.

But eventually scripts became more and more complex, so the community invented a variety of ways to organize code into modules, special libraries to load modules on demand.

To name some (for historical reasons):

## AMD – one of the most ancient module systems, initially implemented by the library require.js.
## CommonJS – the module system created for Node.js server.
## UMD – one more module system, suggested as a universal one, compatible with AMD and CommonJS.
Now all these slowly become a part of history, but we still can find them in old scripts.

The language-level module system appeared in the standard in 2015, gradually evolved since then, and is now supported by all major browsers and in Node.js.
So we’ll study the modern JavaScript modules from now on.

### Core Module features

What’s different in modules, compared to “regular” scripts?

There are core features, valid both for browser and server-side JavaScript.

## Always “use strict”  
Modules always use strict, by default. E.g. assigning to an undeclared variable will give an error.
 ```
 <script type="module">
  a = 5; // error
</script>
 ```
 
 ## Module level scope
 
 Each module has its own top-level scope. In other words, top-level variables and functions from a module are not seen in other scripts.
