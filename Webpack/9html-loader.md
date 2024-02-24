How does html-loader work?
https://stackoverflow.com/questions/62255735/what-is-the-use-of-html-loader-and-how-it-works-in-webpack
The html-loader defination says that it exports html as String (What does it mean).

it also says that every loadable attributes (for example <img src="image.png" is imported as require('./image.png'),and you may need to specify loader for images in your configuration (file-loader or url-loader), What does it mean.

 Does it convert html into String or it just convert the img tag to require. How all this work together.

There are two underlying questions that I'm going to answer first.

Q. What type of asset webpack understands by default?
A. By default webpack only understands JavaScript.

Q. What should we do if we want to work with other types of assets (namely HTML, CSS, images, etc.)?
A. We must use loaders and plugins to expand webpack's functionality.

In other words, loaders and plugins allow us to work with static assets in webpack.

Q. What does it mean to export HTML as string?
A. You need to remember that HTML and JavaScript are two different things. If you want to manipulate the DOM using JavaScript, you do that through APIs, for example, when you write

const p = document.createElement("p");
document.body.appendChild(p);
You are using the Document Object to write to an HTML file. You can also do something like this:
```
const html = `<h1>heading level 1</h1>`;
const header = document.createElement("header");
header.innerHTML = html;

document.body.appendChild(header);
```
The string assigned to the html variable is what's called an HTML string. Simple put, a string that contains HTML markup.

This is part of what the html-loader do: it reads your HTML files and returns their contents as HTML strings that can be understand by JavaScript and used by APIs.

The html-loader also translates every loadable attribute to require() calls. Again, because JavaScript doesn't understand HTML related syntax such as src, href, etc., but it understands the require() syntax, which is Javascript related syntax.
I'm answering your questions in a different sequence for I believe this is a more logical sequence for understanding the usage of the html-loader.

There are two underlying questions that I'm going to answer first.

Q. What type of asset webpack understands by default?
A. By default webpack only understands JavaScript.

Q. What should we do if we want to work with other types of assets (namely HTML, CSS, images, etc.)?
A. We must use loaders and plugins to expand webpack's functionality.

In other words, loaders and plugins allow us to work with static assets in webpack.

Q. What does it mean to export HTML as string?
A. You need to remember that HTML and JavaScript are two different things. If you want to manipulate the DOM using JavaScript, you do that through APIs, for example, when you write

const p = document.createElement("p");
document.body.appendChild(p);
You are using the Document Object to write to an HTML file. You can also do something like this:

const html = `
  <h1>heading level 1</h1>
`;
const header = document.createElement("header");
header.innerHTML = html;

document.body.appendChild(header);
The string assigned to the html variable is what's called an HTML string. Simple put, a string that contains HTML markup.

This is part of what the html-loader do: it reads your HTML files and returns their contents as HTML strings that can be understand by JavaScript and used by APIs.

The html-loader also translates every loadable attribute to require() calls. Again, because JavaScript doesn't understand HTML related syntax such as src, href, etc., but it understands the require() syntax, which is JavaScript related syntax.

For more information on APIs see Client-side web APIs.

Q. What does it mean (that you may have to specify a loader for images in your configuration)?
A. If your .html file has an img inside it, the image will be required but, again, webpack only understands JavaScript by default. Therefore, you'll have to set up a loader for allowing webpack to process your image.

I'm answering your questions in a different sequence for I believe this is a more logical sequence for understanding the usage of the html-loader.

There are two underlying questions that I'm going to answer first.

Q. What type of asset webpack understands by default?
A. By default webpack only understands JavaScript.

Q. What should we do if we want to work with other types of assets (namely HTML, CSS, images, etc.)?
A. We must use loaders and plugins to expand webpack's functionality.
In other words, loaders and plugins allow us to work with static assets in webpack.

Q. What does it mean to export HTML as string?
A. You need to remember that HTML and JavaScript are two different things. If you want to manipulate the DOM using JavaScript, you do that through APIs, for example, when you write

const p = document.createElement("p");
document.body.appendChild(p);
You are using the Document Object to write to an HTML file. You can also do something like this:

const html = `
  <h1>heading level 1</h1>
`;
const header = document.createElement("header");
header.innerHTML = html;

document.body.appendChild(header);
The string assigned to the html variable is what's called an HTML string. Simple put, a string that contains HTML markup.
This is part of what the html-loader do: it reads your HTML files and returns their contents as HTML strings that can be understand by JavaScript and used by APIs.
The html-loader also translates every loadable attribute to require() calls. Again, because JavaScript doesn't understand HTML related syntax such as src, href, etc., but it understands the require() syntax, which is JavaScript related syntax.

Q. What does it mean (that you may have to specify a loader for images in your configuration)?
A. If your .html file has an img inside it, the image will be required but, again, webpack only understands JavaScript by default. Therefore, you'll have to set up a loader for allowing webpack to process your image.

Q. How the html-loader works?
A. Simplifying, it will read the contents of you .html file and, if it finds loadable attributes on the elements, it will translate them into require() calls. The URL passed as an argument to the require() function can reference a simple address (when an href attribute is translated into a require() call, for instance) and, in this situation, you won't need to set up an additional loader; Or it can reference an image (when a src is translated into a require() call, for example) and, in this situation, since webpack don't understand images by default, you'll have to configure a loader (the file-loader).

Note: Since webpack 5, webpack uses Asset Modules(https://webpack.js.org/guides/asset-modules/) for loading images. Therefore, you don't need to set up additional loaders for handling images.
