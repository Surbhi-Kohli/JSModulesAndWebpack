
npm adds a bin folder(which contains binary executables and/or clis) ins node modules when we run npm install and so even for webpack we have an executable file and a cli file.

You cant simply run those files. npm allows u to run scripts that hoist these binary packages within its scope.To do that u need to add a scripts key in ur package.json
The command in the scripts  can be any , even Bash command, but the difference is now you have those binary executables in this scope.

```
/*package.json*/

scripts:{
"webpack":"webpack",
"seanLarkin":"command2"
}


```
//to run --> npm run <nameOfTheScript>
  //npm run webpack
  the comand runs successfuly, but there is no webpack config provided.So how does this work.
  This command looks for entry property and it defaults to src/index.js and 
 
  <img width="552" alt="Screenshot 2023-12-25 at 3 30 03 PM" src="https://github.com/Surbhi-Kohli/JSModulesAndWebpack/assets/32058209/917bb985-d29f-43d0-87de-88e414fe878d">

  ## Webpack without config
  
  Before webpack4,you were only required to provide entry and exit property.But now in webpack 4 its taken as default to ./src/index.(js|ts)(you dont need to specify entry file),
  but u get a warning when u run webpck without a config that u have not specified mode and webpack fell back to production mode anyways.
  But its encouraged to provide mode , which can dev or prod, depending on whether u want faster build or optimized build.
   Set the 'mode' option to 'developement' or 'production' to enable defaults for each environment.You can also set it to 'none' to disable any default behaviour.
  
  
  ## Adding scripts for Environment Builds :npm/yarn has the capability to compose scripts
  
  
  npm has an awesome capability to compose scripts(yarn supports this as well)
  You can provid mode within the script, without adding the webpack config.
  ```
  //package.json
  "webpack":"webpack"
  "dev": "npm run webpack -- --mode development" // --  pipes in the next  argument to the original command
  //u are composing without the need to re-write a command
  
  ```
  no we will run 
  npm run dev
  
   ```
  //package.json
  "webpack":"webpack"
  "dev": "npm run webpack -- --mode development" // --  pipes in the next  argument to the original command
  "prod": "npm run webpack -- --mode production"
  
  
  ```
