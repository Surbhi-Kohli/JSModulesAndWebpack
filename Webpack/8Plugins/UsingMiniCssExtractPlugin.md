
Currently everything is loaded via JS
So the CSS that we have now, it's just adding a module and it's blocking the main thread, right?Because you're relying on JavaScript to attach a style tag.

<img width="1030" alt="Screenshot 2024-02-25 at 10 19 36 PM" src="https://github.com/Surbhi-Kohli/JSModulesAndWebpack/assets/32058209/ee21083a-5f7e-47b4-a14f-6e2a811b61f1">

And so instead what we would wanna do, is we would wanna extract it out and have it in a separate tag, right?So, we can do this by adding the mini CSS extract plug-in.
We will apply this to our production config
abd replace the following code 
<img width="438" alt="Screenshot 2024-02-25 at 10 35 52 PM" src="https://github.com/Surbhi-Kohli/JSModulesAndWebpack/assets/32058209/d2f11c72-7e44-40d2-a827-44f9f36d32e5">

to:

<img width="678" alt="Screenshot 2024-02-25 at 10 34 11 PM" src="https://github.com/Surbhi-Kohli/JSModulesAndWebpack/assets/32058209/2c103e4f-a286-41e0-b418-23ef84290bc3">

When you build your code, you will notice that there is a css file added in your dist folder and the index.html holds a link to that file. 
<img width="738" alt="Screenshot 2024-02-25 at 10 38 03 PM" src="https://github.com/Surbhi-Kohli/JSModulesAndWebpack/assets/32058209/43e86bae-3e72-40a2-9940-25c5277be4bb">

<img width="617" alt="Screenshot 2024-02-25 at 10 41 00 PM" src="https://github.com/Surbhi-Kohli/JSModulesAndWebpack/assets/32058209/9d7257d1-259b-495e-ac9b-f8635519f818">



