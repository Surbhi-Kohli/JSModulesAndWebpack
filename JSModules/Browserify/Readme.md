## Browserify
Browserify uses the term entry file(s) to describe where it will start reading a dependency graph, and its output is referred to as a bundle. At its highest level, a Browserify bundle is simply an IIFE, or Immediately Invoked Function Expression. This is of course a simple mechanism to make code run as soon as it is loaded.

      ``` npm install -g browserify
          browserify entryFile.js>bundle.js
