Loaders are useful help support Hot module replacement

We see the changes of our code without re-loading of our browser.Webpack has the capability of being able to patch changes that are made incrementally and apply them without u ever having to reload the browser.

Add ```hot``` flag
```
  "scripts": {
    "webpack-dev-server": "webpack-dev-server",
    "webpack": "webpack",
    "debug": "node --inspect --inspect-brk ./node_modules/webpack/bin/webpack.js",
    "prod": "npm run webpack -- --env.mode production",
    "dev": "npm run webpack-dev-server -- --env.mode development --open --hot",
    "prod:debug": "npm run debug -- --env.mode production",
    "dev:debug": "npm run debug -- --env.mode development"
  },
```
It's just super valuable when you have situation in app, like something that has a lot of complex state and refreshing the browser would be a real pain to debug.And it's also just a really cool development experience.


