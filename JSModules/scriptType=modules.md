A script tag having type="module" attribute specifies that it to be considered as a Javascript module.
It may be importing other Javascript module(s) inside it and becomes a "top-level" module for the imported modules.

Javascript modules are newly added in Javascript to help give a "modular" structure to an application.
However when we want to use Javascript modules in our HTML code, we need to do that within a <script type="module"> tag. 
Importing modules cannot be done in a normal script tag.
  
###  What is a Module in JavaScript?
A module is a Javascript file.

However unlike a normal Javascript file, a module can specify which variables and functions can be accessed outside the module.
Other sections of the module cannot be accessed. A module can also load other modules.

### Why Modules ?
With Web Applications gaining prominence, the need to be able to manage the code better led to modules.
With this, JavaScript codes can be divided into modules which then can be imported as and when required.

### Creating a Module
A module allows only specific variables and functions to be accessed outside it. These variables and functions have the export statement prefixed to them.

```
// file "module.js"
export var someVar = "Some data";

export function someFunc() {
    return " for output";
}

// this has no "export" prefixed hence cannot be used outside this module 
function someOtherFunction() {
    return 1;
}
```
### Using a Javascript Module inside a Module Script Tag

The import statement is used to import variables and functions exported by an module into the script that plans on using it.

Any <script> tag in HTML wanting to import a module needs have the attribute type="module".

In the below example the module that is created in the above snippet is imported using the import statement.

```
<script type="module">
    import {someVar, someFunc} from './module.js';

    // "Some data for output"
    console.log(someVar + someFunc());
</script>
```
### Module Scripts are Deferred By the Browser
A script tag of type="module", whether inline or external is always deferred by the browser (regardless of the fact whether defer attribute is used or not).


Module scripts are always deferred, same effect as defer attributefor both external and inline scripts.

It is loaded in parallel by the browser, not impacting the webpage load time. Once loaded,
it waits for the DOM to get ready, and then the script is executed. The page suffers no performance penalty as such.
In other words:

downloading external module scripts <script type="module" src="..."> doesn’t block HTML processing, they load in parallel with other resources.
module scripts wait until the HTML document is fully ready (even if they are tiny and load faster than HTML), and then run.
relative order of scripts is maintained: scripts that go first in the document, execute first.
 #####  As a side-effect, module scripts always “see” the fully loaded HTML-page, including HTML elements below them.
  
  For instance:
  ```
  <script type="module">
  alert(typeof button); // object: the script can 'see' the button below
  // as modules are deferred, the script runs after the whole page is loaded
</script>

//Compare to regular script below:

<script>
  alert(typeof button); // button is undefined, the script can't see elements below
  // regular scripts run immediately, before the rest of the page is processed
</script>

<button id="button">Button</button>
  ```
  
  Please note: the second script actually runs before the first! So we’ll see undefined first, and then object.

That’s because modules are deferred, so we wait for the document to be processed. The regular script runs immediately, so we see its output first.

When using modules, we should be aware that the HTML page shows up as it loads, and JavaScript modules run after that, so the user may see the page before the JavaScript application is ready. Some functionality may not work yet. We should put “loading indicators”, or otherwise ensure that the visitor won’t be confused by that.

### Async works on inline scripts
For non-module scripts, the async attribute only works on external scripts. Async scripts run immediately when ready, independently of other scripts or the HTML document.

For module scripts, it works on inline scripts as well.
For example, the inline script below has async, so it doesn’t wait for anything.

It performs the import (fetches ./analytics.js) and runs when ready, even if the HTML document is not finished yet, or if other scripts are still pending.

That’s good for functionality that doesn’t depend on anything, like counters, ads, document-level event listeners.

```
<!-- all dependencies are fetched (analytics.js), and the script runs -->
<!-- doesn't wait for the document or other <script> tags -->
<script async type="module">
  import {counter} from './analytics.js';

  counter.count();
</script>

```

### External Scripts
External scripts that have type="module" are different in two aspects:

1.External scripts with the same src run only once:
```
<!-- the script my.js is fetched and executed only once -->
<script type="module" src="my.js"></script>
<script type="module" src="my.js"></script>
```

External scripts that are fetched from another origin (e.g. another site) require CORS headers, as described in the chapter Fetch: Cross-Origin Requests.
In other words, if a module script is fetched from another origin, the remote server must supply a header Access-Control-Allow-Origin allowing the fetch.
```
<!-- another-site.com must supply Access-Control-Allow-Origin -->
<!-- otherwise, the script won't execute -->
<script type="module" src="http://another-site.com/their.js"></script>
```
That ensures better security by default.

### No “bare” modules allowed
In the browser, import must get either a relative or absolute URL. Modules without any path are called “bare” modules. Such modules are not allowed in import.

For instance, this import is invalid:
```
import {sayHi} from 'sayHi'; // Error, "bare" module
```
the module must have a path, e.g. './sayHi.js' or wherever the module is
Certain environments, like Node.js or bundle tools allow bare modules, without any path, as they have their own ways for finding modules and hooks to fine-tune them. But browsers do not support bare modules yet.

### Compatibility, “nomodule”
Old browsers do not understand type="module". Scripts of an unknown type are just ignored. For them, it’s possible to provide a fallback using the nomodule attribute:
```
<script type="module">
  alert("Runs in modern browsers");
</script>

<script nomodule>
  alert("Modern browsers know both type=module and nomodule, so skip this")
  alert("Old browsers ignore script with unknown type=module, but execute this.");
</script>
```
