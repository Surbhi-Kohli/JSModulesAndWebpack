## Browserify
Browserify is a tool for compiling node-flavored commonjs modules for the browser.
It recursively analyzes all the require() calls in your app, in order to build a bundle that you can serve to the browser in a single <script> tag.

Browserify uses the term entry file(s) to describe where it will start reading a dependency graph, and its output is referred to as a bundle. At its highest level, a Browserify bundle is simply an IIFE, or Immediately Invoked Function Expression. This is of course a simple mechanism to make code run as soon as it is loaded.

      ``` npm install -g browserify
          browserify entryFile.js>bundle.js

Refer Browserify handbook for details:https://github.com/browserify/browserify-handbook?tab=readme-ov-file
