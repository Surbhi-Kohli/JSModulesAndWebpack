## Tree shaking  = Dead code elemination
 Tree shaking or dead code elimination means that unused modules will not be included in the bundle during the build process.
 It only works with import and export(ES modules). It won’t work with CommonJS require syntax. Same applies to npm dependencies. great example is lodash, just import pick from ‘lodash/pick and your bundle will only include one small module instead of entire lodash library.

Utilizing the tree shaking and dead code elimination can significantly reduce the code size we have in our application. The less code we send over the wire the more performant the application will be.

https://www.smashingmagazine.com/2021/05/tree-shaking-reference-guide/
https://web.dev/articles/reduce-javascript-payloads-with-tree-shaking

button-styles.js

``const red=  "color:red;"
const blue = "color:blue;"
const makeColorStyle = (color)=>`color:${color}`
exports.red = red;
exports.blue = blue;
exports.makeColorStyle = makeColorStyle;``

index.js
``
import { red,blue,makeColorStyle } from "./button-styles";
console.log(makeColorStyle("cyan"));
``
When the bundle for above is created(via npm run dev), red and blue are added in bundle .That's because the button-styles.js is a commonjs module.Tree shaking is not done.

/****************************************************************/

button-styles.js

``const red=  "color:red;"
const blue = "color:blue;"
const makeColorStyle = (color)=>`color:${color}`
export {red, blue, makeColorStyle}``

If you're using only one lodash function,you should only be bundling one function, right?That's super important.

index.js
``
import { red,blue,makeColorStyle } from "./button-styles";
console.log(makeColorStyle("cyan"));
``
Bundle generated now would be tree shaken and red and blue wont be there.


## Adding webpack configuration:
If you're trying to do is just build JavaScript.Like let's say you don't wanna handle CSS.You don't wanna handle html.This is the only tool you need.Cuz literally as long as you are writing modules,you can have default config for webpack.
What if you wish to  also have incremental recompiling on the styles and why can't it be tied to modules if those change.There are dependencies.And so that's kind of where loaders were born, so let's add a web pack configuration.

By default, web pack, when it runs,all it's doing since it's node, all it's doing,is just requiring webpack.config.js file or it attempts to try to.
With configs, u can over-write the default bhaviour.
