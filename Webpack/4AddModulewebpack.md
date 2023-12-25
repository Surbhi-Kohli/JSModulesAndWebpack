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

## Webpack watch mode:

 I don't want to have to force anybody to have to run ``npm run dev`` or ``yarn dev`` whenever the code is updated and so, why don't we jump back into our scripts.We can solve this.Webpack has a watching mode and so, maybe it makes sense fo rour development mode, that we just have a watch flag added on.
 <img width="563" alt="Screenshot 2023-12-25 at 5 07 51 PM" src="https://github.com/Surbhi-Kohli/JSModulesAndWebpack/assets/32058209/1418e25d-bab3-45de-8e92-2080f3b677e3">


we have some rules in Webpack that just say,you cannot use CommonJS and ES syntax in the same file.
It would throw an error.Or you can't use an export, and then a default exports, or a module.exports.So what I tend to do is usually just use the ESM syntax at the top level.
