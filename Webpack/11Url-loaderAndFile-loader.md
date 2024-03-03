https://masteringjs.io/tutorials/webpack/url-loader
https://www.freecodecamp.org/news/everything-you-need-to-know-about-encoding/
https://www.freecodecamp.org/news/what-is-base64-encoding/
### what is base64-encoded data strings

Base64 encoding is a method of encoding binary data (such as images, audio files, or any other binary content) into a text-based format that consists of printable ASCII characters. This encoding scheme is used to ensure that binary data remains intact when it needs to be transmitted or stored in a format that only supports text data.

In a base64-encoded string:

Each character represents 6 bits of the original binary data.
Four characters in the encoded string represent three bytes (24 bits) of the original binary data.
Padding characters (typically =) are added at the end of the string if the original binary data's length is not a multiple of three bytes.
The "64" in "base64" refers to the fact that each base64 character can represent 64 (2^6) distinct values.

Base64 encoding is commonly used in various scenarios, including:

* Transferring binary data over text-based protocols: When binary data needs to be transmitted over protocols that only support text data (such as email or HTTP), base64 encoding ensures that the data remains intact during transmission.

* Data URI scheme: Base64-encoded data strings are often used in Data URI scheme (RFC 2397) to embed small files directly into HTML, CSS, or XML documents.

* Storing binary data in text-based formats: Base64 encoding is sometimes used to store binary data (such as images) in text-based storage systems (such as databases or configuration files) where binary data is not supported directly.

Here's an example of a base64-encoded string:

makefile:
SGVsbG8gV29ybGQ=

This encoded string represents the text "Hello World" in base64 encoding.

When dealing with base64-encoded data strings, it's important to remember that they are larger in size compared to the original binary data, typically around 33% larger due to the encoding overhead. However, they are easily transmitted and stored as text data, making them useful in various applications.

## what is a url-loader

url-loader is a module commonly used in webpack configurations for handling various types of files, such as images, fonts, and other assets, within JavaScript applications. It allows you to import these files directly into your JavaScript code as URLs or base64-encoded data strings, rather than as separate file dependencies.

This module is particularly useful for small files, as it can embed them directly into the bundle to reduce the number of HTTP requests and improve performance. For larger files, url-loader can also be configured to fall back to file-loader, which simply copies the files into the output directory and returns the URL.

Here's a brief example of how url-loader might be used in a webpack configuration:

```
module: {
  rules: [
    {
      test: /\.(png|jpg|gif)$/i,
      use: [
        {
          loader: 'url-loader',
          options: {
            limit: 8192, // Convert images < 8kb to base64 strings
            name: 'images/[name].[ext]' // Output path and filename
          }
        }
      ]
    }
  ]
}
```
In this example, any image files smaller than 8 kilobytes will be converted to base64 strings and embedded directly into the bundle. Larger files will be processed by file-loader, which copies them to the specified output directory and returns the URL.

Using url-loader can help streamline the process of managing assets in your JavaScript applications and optimize their performance.

### how can image be converted to URLs or base64-encoded data strings and what does it mean?

Converting an image to a URL or a base64-encoded data string means representing the image in a format that can be embedded directly into a web page or JavaScript code without the need for separate file requests. This can be useful for small images or icons that are used frequently on a website, as it reduces the number of HTTP requests required to load the page, thereby improving performance.

Here's how image conversion to URLs or base64-encoded data strings generally works:

URLs: When an image is converted to a URL, it means that the image file is hosted on a server, and its location is specified by a URL (Uniform Resource Locator). This URL can then be used to reference the image in HTML or CSS code, allowing the browser to fetch the image from the server when the page is loaded.

For example, if you have an image called "example.png" hosted on your server at the URL "https://example.com/images/example.png", you can use this URL to display the image on your web page:

```
<img src="https://example.com/images/example.png" alt="Example Image">
```
2.Base64-encoded data strings: Base64 encoding is a way of representing binary data, such as image files, as ASCII strings. This encoding converts binary data into a sequence of printable characters, making it suitable for embedding directly into HTML, CSS, or JavaScript code.

To convert an image to a base64-encoded data string, you can use tools or libraries that provide this functionality. Once encoded, the data string can be used as the value of the src attribute for an image tag or as a background image in CSS.

Here's an example of embedding a base64-encoded image data string in an HTML <img> tag:

```
<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAA..." alt="Example Image">

```
In this example, the long string following base64, is the base64-encoded data representing the image.

Both methods have their advantages and use cases. Using URLs is more suitable for larger images or images that may change frequently, as it allows the browser to cache the image separately. On the other hand, base64 encoding can be more convenient for small images or icons that are used within CSS or JavaScript code, as it eliminates the need for additional HTTP requests.



## Why do we import plugins but use loaders which automatically are fetched from node_modules
why do we import plugins,but why do we only pass node module references for these loaders, right?
A.The short hand reason is because,so loaders are serialized.Basically, the first premise with Webpack is thatwhen loaders were originally invented, the way that you wereusing them actually was doing something like this, 
import style from "css-loader!./button.css"
This is still valid but not encouraged. Essentially,what happens is that we stringify and we serialize this entire request, but sometimes you can add options and even functions as options, and those aren't serializable.And so we have to get really crafty,we couldn't just pass a function itself in the config, or a function object cuz we need to be able to serialize that information, and then we parallelize it.
And so it's kind of like an architecture constraint.We've considered trying to normalize it into just all plugins.I think now that we've added thisX as module type where we cannot create new module types in Webpack 4.We may see the usage of loaders for things like CSS maybe less common andmaybe more like for pre-processing and stuff like that.
Now you can customize this because the resolver uses our sameWebpack resolver.If you are going to write a custom loader.You have to if you wanna have your function locally, you can do so butyou have to have a special resolution pattern for it.Just set up an alias essentially, but yeah.So this is always referencing the path to that inner module.
