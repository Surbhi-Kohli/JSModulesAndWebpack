Info About this commit1:
Starting off with basic html with script tag
Script is present in the end of body, otherwise html parsing gets stopped.We have not used async or defer
ES5 js is used considering era of early 2000s where browsers dont support es6

Having js in html within script tag is fine, but it will be a problem .It is not scalable to put all ur code within script tag
Check the next commit

Info about commit 2:
We are gonna move the js code to a separate file: index.js.
Also, as websites get bigger, it is also not scalable to have all html tags .So we move our html to js
We have also added a utility script that helps in creating tags.In utils.js ,we have used es6
which is not compatible with older browsers.We need to solve this problem in next commit
The order of multiple script tags matter.
