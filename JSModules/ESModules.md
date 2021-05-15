### From KCD's blog <3 https://kentcdodds.com/blog/super-simple-start-to-es-modules-in-the-browser


First, we need a JavaScript file that we want to load into our site:

```
// append-div.js
function appendDiv(message) {
  const div = document.createElement('div')
  div.textContent = message
  document.body.appendChild(div)
}
export {appendDiv}

```
Next, let's make an HTML file to load that file:

```
<!-- index.html -->
<script type="module">
  import {appendDiv} from './append-div.js'
  appendDiv('Hello from inline script')
</script>

```

Notice the type="module" attribute there. That's all we need to do to inform the browser that the JavaScript code is a "module" rather than a "script".
There are several differences in how the runtime environment handles the JavaScript file based on whether 
it's a script or a module, but suffice-it to say that one of those differences is when it's a "module" you're allowed to use modules!

In our inline script above, we're importing the appendDiv function from the append-div.js file. Unfortunately, to load the module,
we can't just open the HTML file in our browser. We have to be using a local server and open the file from that.
If you have node.js installed, then you can open your terminal to the directory where you have these files and run this to get a server going:``` npx serve ```

Tada! We've loaded a real EcmaScript Module! Hooray 🎉

Normally we don't write our JavaScript in an inline script in our HTML file, so let's load a module from a file:
### External script:

```
// script-src.js
import {appendDiv} from './append-div.js'
appendDiv('Hello from external script')

```
To load that up, we just add another script tag to our HTML:

```
<!-- index.html -->
<script type="module">
  import {appendDiv} from './append-div.js'
  appendDiv('Hello from inline script')
</script>
<script type="module" src="./script-src.js"></script>

```
And now if we pull that up on our server, we'll also have "Hello from external script" appear on the screen.
One thing that's important to note here is the inclusion of the .js in our import statement. 
We may be spoiled by NodeJS and Babel, but in the modules specification we really do have to provide the extension.

### IMPORTANT:
When you import from another module, you import the binding, not the value, which means an exporting module
may change the value of the binding at any time, and the modules that import it will see its new value.

When there is a binding named default, it is treated as the module’s main exported value. If you import a module, without braces around the binding name,
you get its default binding. Such modules can still export other bindings under different names alongside their default export.

Another important feature is that ES module imports happen before a module’s script starts running. That means import declarations may not appear inside functions or blocks(solves problem of nested require in commonJS modules), and the names of dependencies must be quoted strings, not arbitrary expressions.

### Dynamic Imports
One last thing I want to show is that dynamic imports work well too. So if we add another file:

```
// async-script.js
import {appendDiv} from './append-div.js'
function go() {
  appendDiv('Hello from async script')
}
export {go}
```
Then we can load that using a dynamic import statement:

```
// script-src.js
import {appendDiv} from './append-div.js'
appendDiv('Hello from external script')
import('./async-script.js').then(
  moduleExports => {
    moduleExports.go()
  },
  error => {
    console.error('there was an error loading the script')
    throw error
  },
)


```
The dynamic import likewise also must point directly to a JavaScript file (with the extension).
And to be clear, what's important is not the extension, but the fact that when the browser makes a request to that URL,
it receives back a text file which it can execute as JavaScript.
```import * as d3 from 'https://unpkg.com/d3?module'```

The point is, the thing you put in the quotes in your import statements has to point to a JavaScript resource on some server somewhere. 
This means that if you happen to have a URL that returns a JavaScript file but doesn't end in .js you are fine omitting that.

 ### ECMAScript Harmony (ES6) key points summarised --Credits https://kamleshchandnani.com/articles/learn-the-basics-of-the-javascript-module-system-and-build-your-own-library
 
#### Used for both server/client side
#### Runtime/static loading of modules supported
#### When you import, you get back bindings value (actual value)
#### Import via “import” and export via “export”
#### Static analyzing — You can determine imports and exports at compile time (statically) — you only have to look at the source code, you don’t have to execute it
#### Tree shakeable, because of static analyzing supported by ES6
#### Always get an actual value so live changes in the module itself
#### Better cyclic dependency management than CommonJS
