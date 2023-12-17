const myExportObj = require("./module.js");
console.log(myExportObj.myVar+" initail val in module2");
myExportObj.updateVar();
console.log(myExportObj.myVar +" updated val in module2");
myExportObj.myVar++;
console.log(myExportObj.myVar);
module.exports= myExportObj;