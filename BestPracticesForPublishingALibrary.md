Credits:https://kamleshchandnani.com/articles/learn-the-basics-of-the-javascript-module-system-and-build-your-own-library

## Tree Shaking 🌳
* Tree shaking is a term commonly used in the context of JavaScript for dead-code elimination. It relies on the static structure of ES2015 module syntax, 
that is, import and export. The name and concept have been popularized by the ES2015 module bundler rollup.
* Webpack and Rollup both support Tree Shaking, meaning we need to keep certain things in mind so that our code is tree shakeable.
Tree Shaking Example

```
// File shakebake.js
const shake = () => console.log('shake');
const bake = () => console.log('bake');
//can be tree shaken as we export as es modules
export { shake, bake };

// File index.js
import { shake } from './shakebake.js'
// only shake is included in the output

/***********************/

// File shakebake.js
const shake = () => console.log('shake');
const bake = () => console.log('bake');
//cannot be tree shaken as we have exported an object
export default { shake, bake };
// File index.js
import { shake } from './shakebake.js'
// both shake and bake are included in the output

```
