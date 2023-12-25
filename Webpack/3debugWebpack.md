If you want to debug node, you can do so by running node and passing a couple of arguments.
node --inspect --inspect-brk ./src/index.js
```
  "scripts": {
    "webpack": "webpack",
    "debug": "node --inspect --inspect-brk ./node_modules/webpack/bin/webpack.js",
    "prod": "npm run webpack -- --mode production",
    "dev": "npm run webpack -- --mode development",
    "prod:debug": "npm run debug -- --mode production",
    "dev:debug": "npm run debug -- --mode development",
    "debugthis": "node --inspect --inspect-brk ./src/index.js" //**
  },
```
If u wanna debug a node application or a node script ,u can do so simply by running node and passing a couple of arguments as follows:
```
//package.json
scripts:{
"debugthis": "node --inspect --inspect-brk ./src/index.js"
 }
 ```
 Run the above command in terminal:npm run debugthis 
 and in chrome write :chrome://inspect
  ,there u can open dedicated dev tools,and check for files using  command+P
  To debug webpack, you will run ``yarn debug``
  That runs :node --inspect --inspect-brk ./node_modules/webpack/bin/webpack.js
