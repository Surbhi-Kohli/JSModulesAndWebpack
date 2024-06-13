function userCreater(name,score){
    this.name=name;
    this.score=score;
    }
    
    userCreater.prototype.increment=function(){this.score++}
    userCreater.prototype.login=function (){console.log("login")}
    
    const user1=new userCreater("Eva",9);
    user1.increment();

    console.log(user1);
    userCreater.prototype.name="sk"
    const user2= new userCreater("John",10); 
    user2.increment();