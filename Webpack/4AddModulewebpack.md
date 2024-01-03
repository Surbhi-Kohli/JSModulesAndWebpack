src/index.js:

```
import nav from "./nav"
console.log(nav);

```

src/nav.js
```
export default "nav";
```
then run yarn prod.A build file is generated in ur dist folder ,named main.js
So by default, it was kinda canonical in our ecosystem that dist was where your built web assets will go.WIthin dist , we have single file, which is main.js.
In main.js , we see that our code is in minified version.We can run this code via node
 ``node ./dist/main.js``
 
## Webpack watch mode:

 I don't want to have to force anybody to have to run ``npm run dev`` or ``npm run prod``, or ``yarn dev`` whenever the code is updated and so, why don't we jump back into our scripts.We can solve this.Webpack has a watching mode and so, maybe it makes sense for our development mode, that we just have a watch flag added on.
 <img width="563" alt="Screenshot 2023-12-25 at 5 07 51 PM" src="https://github.com/Surbhi-Kohli/JSModulesAndWebpack/assets/32058209/1418e25d-bab3-45de-8e92-2080f3b677e3">


we have some rules in Webpack that just say,you cannot use CommonJS and ES syntax in the same file.
It would throw an error.Or you can't use an export, and then a default exports, or a module.exports.So what we should do is usually just use the ESM syntax at the top level.

Try not to use commonjs.
There are tools like Babble and Typescript that safely default to converting your ESM to CommonJS behind the scenes and then passing it to Webpack.But Webpack supports ESM out of the box, and that makes it possible to tree shake, to code eliminate, and all the optimizations.

Also you should only import what is needed And so I'm gonna just only need this function.And the reason why is because webpack leverages this information to only bundle what you're using.So let's just say makeColorStyle, >> Sean Larkin: Look I love it,you get all the intellicents right out of the box, and I didn't even type itjust uses automatic inference of the typescript language service.
