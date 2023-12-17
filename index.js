const {myVar,updateVar} = require("./module.js");
const exportObj = require("./module2.js");
console.log(myVar+" inital val in index.js");
updateVar();
console.log(myVar +" after calling function");

console.log(exportObj.myVar)