# Modules, introduction
As our application grows bigger, we want to split it into multiple files, so called “modules”. A module may contain a class or a library of functions for a specific purpose.

For a long time, JavaScript existed without a language-level module syntax. That wasn’t a problem, because initially scripts were small and simple, so there was no need.

But eventually scripts became more and more complex, so the community invented a variety of ways to organize code into modules, special libraries to load modules on demand.
🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑
A module allows only specific variables and functions to be accessed outside it. These variables and functions have the export statement prefixed to them.
🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑🛑
To name some modules(for historical reasons):

### AMD – one of the most ancient module systems, initially implemented by the library require.js.
### CommonJS – the module system created for Node.js server.
### UMD – one more module system, suggested as a universal one, compatible with AMD and CommonJS.
Now all these slowly become a part of history, but we still can find them in old scripts.

The language-level module system appeared in the standard in 2015, gradually evolved since then, and is now supported by all major browsers and in Node.js.
So we’ll study the modern JavaScript modules from now on.

## Core Module features

What’s different in modules, compared to “regular” scripts?

There are core features, valid both for browser and server-side JavaScript.

#### Always “use strict”  
Modules always use strict, by default. E.g. assigning to an undeclared variable will give an error.
 ```
 <script type="module">
  a = 5; // error
</script>
 ```
 
 #### Module level scope
 
 Each module has its own top-level scope. In other words, top-level variables and functions from a module are not seen in other scripts.
 In the example below, two scripts are imported, and hello.js tries to use user variable declared in user.js, and fails:
 
 ```
 //users.js
 let user = "John";
  /*********************/
  
  //hello.js
  alert(user); // no such variable (each module has independent variables)
  
  /******************/
  //index.html
  <!doctype html>
  <script type="module" src="user.js"></script> 
  <script type="module" src="hello.js"></script>
  ```
Modules are expected to export what they want to be accessible from outside and import what they need.
So we should import user.js into hello.js and get the required functionality from it instead of relying on global variables.

This is the correct variant:
```
//user.js
export let user = "John";

/*********************************/

//hello.js
import {user} from './user.js';
document.body.innerHTML = user; // John

/************************/

//index.html
<!doctype html>
<script type="module" src="hello.js"></script>
```

In the browser, independent top-level scope also exists for each <script type="module">:

```
<script type="module">
  // The variable is only visible in this module script
  let user = "John";
</script>

<script type="module">
  alert(user); // Error: user is not defined
</script>

```
If we really need to make a window-level global variable, we can explicitly assign it to window and access as
window.user. But that’s an exception requiring a good reason.

#### A module code is evaluated only the first time when imported

If the same module is imported into multiple other places, its code is executed only the first time, then exports are given to all importers.

That has important consequences. Let’s look at them using examples:

First, if executing a module code brings side-effects, like showing a message, then importing it multiple times will trigger it only once – the first time:

```
Examples are as per ESM module
// 📁 alert.js
alert("Module is evaluated!");
/**********************************/

// Import the same module from different files

// 📁 1.js
import `./alert.js`; // Module is evaluated!
/********************************************/
// 📁 2.js
import `./alert.js`; // (shows nothing)

```
In practice, top-level module code is mostly used for initialization, creation of internal data structures, and if we want something to be reusable – export it.
Now, a more advanced example.

 
An ES module’s interface is not a single value but a set of named bindings.When you import from another module, you import the binding, not the value, 
which means an exporting module may change the value of the binding at any time, and the modules that import it will see its new value.
This is different from CommonJS where module get imported as value and dont get updated if a file makes updation in imported module.
Let’s say, a module exports an object:

```
// 📁 admin.js
export let admin = {
  name: "John"
};
```
If this module is imported from multiple files, the module is only evaluated the first time, admin object is created, and then passed to all further importers.
All importers get exactly the one and only admin object:

```
// 📁 1.js
import {admin} from './admin.js';
admin.name = "Pete";

// 📁 2.js
import {admin} from './admin.js';
alert(admin.name); // Pete

// Both 1.js and 2.js imported the same object
// Changes made in 1.js are visible in 2.js
```

So, let’s reiterate – the module is executed only once. Exports are generated, and then they are shared between importers, 
so if something changes the admin object, other modules will see that.

Such behavior allows us to configure modules on first import. We can setup its properties once, and then in further imports it’s ready.

For instance, the admin.js module may provide certain functionality, but expect the credentials to come into the admin object from outside:

```
// 📁 admin.js
export let admin = { };

export function sayHi() {
  alert(`Ready to serve, ${admin.name}!`);
}

```
In init.js, the first script of our app, we set admin.name. Then everyone will see it, including calls made from inside admin.js itself:

```
// 📁 init.js
import {admin} from './admin.js';
admin.name = "Pete";

```
Another module can also see admin.name:

```
// 📁 other.js
import {admin, sayHi} from './admin.js';

alert(admin.name); // Pete

sayHi(); // Ready to serve, Pete!
```
#### import.meta
The object import.meta contains the information about the current module.
Its content depends on the environment. In the browser, it contains the url of the script, or a current webpage url if inside HTML:
```
<script type="module">
  alert(import.meta.url); // script url (url of the html page for an inline script)
</script>
```

#### In a module, “this” is undefined

That’s kind of a minor feature, but for completeness we should mention it.

In a module, top-level this is undefined.

```
<script>
  alert(this); // window
</script>

<script type="module">
  alert(this); // undefined
</script>

```

Compare it to non-module scripts, where this is a global object:
