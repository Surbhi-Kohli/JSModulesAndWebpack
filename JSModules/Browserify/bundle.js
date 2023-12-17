(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const {myVar,updateVar} = require("./module.js");
const exportObj = require("./module2.js");
console.log(myVar+" inital val in index.js");
updateVar();
console.log(myVar +" after calling function");

console.log(exportObj.myVar)
},{"./module.js":2,"./module2.js":3}],2:[function(require,module,exports){
let myVar = 10;
const updateVar = ()=>{
    myVar+=10;
    console.log("within func "+myVar)
}

module.exports= {myVar,updateVar}
},{}],3:[function(require,module,exports){
const myExportObj = require("./module.js");
console.log(myExportObj.myVar+" initail val in module2");
myExportObj.updateVar();
console.log(myExportObj.myVar +" updated val in module2");
myExportObj.myVar++;
console.log(myExportObj.myVar);
module.exports= myExportObj;
},{"./module.js":2}]},{},[1]);
