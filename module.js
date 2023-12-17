let myVar = 10;
const updateVar = ()=>{
    myVar+=10;
    console.log("within func "+myVar)
}

module.exports= {myVar,updateVar}