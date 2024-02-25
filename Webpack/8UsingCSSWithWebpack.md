
footer.css

```
footer{
    height:100px;
    width:100%;
    background: yellowgreen;
    border: 1px solid black;
}
```
 The traditional way of adding css file is by just serving it in a dis folder and referencing in a style tag.But if we change the css file and it's affecting our code,we would want to have it tied in with our build like an incremental rebuild.Or, wouldn't it be cool if you could have it changed without even reloading?
 
```
import { red, blue } from "./button-styles";
import "./footer.css";

const top = document.createElement("div");
top.innerText = "Top of Footer";
top.style = red;
const bottom = document.createElement("div");
bottom.innerText = "Bottom of Footer";
bottom.style = blue;

const footer = document.createElement("footer");
footer.appendChild(top);
footer.appendChild(bottom);

export { top, bottom, footer };
```
<img width="564" alt="Screenshot 2024-01-14 at 1 32 32 PM" src="https://github.com/Surbhi-Kohli/JSModulesAndWebpack/assets/32058209/392733b1-f183-4af0-b7e5-803bc48f18b9">
So we will have to add the loader in webpack dev config

webpack.development.js
```
module.exports = () => ({
    module:{
        rules:[
            { test:/\.css$/,
            use:["css-loader"]
          }
        ]
    }
});
```
On running of ```yarn dev```, we see error does not exist, but the css does not get applied.


footer.js
```

import { red, blue } from "./button-styles";
import css from "./footer.css";
console.log(css);
const top = document.createElement("div");
top.innerText = "Top of Footer";
top.style = red;
const bottom = document.createElement("div");
bottom.innerText = "Bottom of Footer";
bottom.style = blue;

const footer = document.createElement("footer");
footer.appendChild(top);
footer.appendChild(bottom);

export { top, bottom, footer };


```
line 54 logs the following:
String version of styles is logged.  
css-loader takes css and turns it into valid JS code, basically turn it into really long strings and make sure that it is valid JS.But is not being applied.
style-loader takes that js and onjects it into the dom by injecting a <style> tag
There is also a sass-loader, that can be used in case ur project has sass files.
<img width="1142" alt="Screenshot 2024-01-14 at 1 40 03 PM" src="https://github.com/Surbhi-Kohli/JSModulesAndWebpack/assets/32058209/eb8ec575-04cb-497d-a06a-a295a20a4b70">
So we need to add style-loader.
Style loader adds the script tag in the browser.It consumes that array that css loader passes to it.

webpack.development.js
```
module.exports = () => ({
    module:{
        rules:[
            { test:/\.css$/,
            use:["style-loader","css-loader"]
          }
        ]
    }
});

```
We just applied the CSS to the selectors that it matched against.So, what's really awesome about this is jump back into your footer.css, and you can go ahead make whatever stylistic changes you want.And those would get reflected on the server
