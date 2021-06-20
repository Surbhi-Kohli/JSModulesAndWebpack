npm adds a bin folder(which contains binary executables and/or clis) in node modules when we run npm install and so even for webpack we have an executable file and a cli file.

You cant simply run those files .npm allows u to run scripts that hoist these binary packages within its scope.To do that u need to add a script key in ur package.json

```
/*package.json*/

scripts:{
"seanLarkin":"webpack"
}


```
//to run --> npm run <nameOfTheScript>
  //npm run seanLarkin
  This command looks for entry property and it defaults to src/index.js and 
  
  
  ## Adding npm scripts for Environment Builds 
  
  When you run the webpack config as above,you get a nice warning :The mode option has not been set,webpack will fallback to 'production' for this value.
  Set the 'mode' option to 'developement' or 'production' to enable defaults for each environment.You can also set it to 'none' to disable any default behaviour.
  
  npm has an awesome capability to compose scripts(yarn supports this as well)
  
  ```
  //package.json
  "seanLarkin":"webpack"
  "dev": "npm run seanLarkin -- --mode development" // --  pipes in the next  argument to the original command
  
  ```
  no we will run 
  npm run dev
  
   ```
  //package.json
  "seanLarkin":"webpack"
  "dev": "npm run seanLarkin -- --mode development" // --  pipes in the next  argument to the original command
  "prod": "npm run seanLarkin -- --mode production"
  
  
  ```
