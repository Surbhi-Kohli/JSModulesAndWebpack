
Currently everything is loaded via JS
So the CSS that we have now, it's just adding a module and it's blocking the main thread, right?Because you're relying on JavaScript to attach a style tag in html.
Also sharing differences between style tag and link
---------------------------------------------------------------------
In HTML, there are two primary ways to include CSS (Cascading Style Sheets) in a 
document: using the <style> tag and using the <link> tag.

<style> tag:

The <style> tag is used to define internal CSS within an HTML document.
It's typically placed within the <head> section of the HTML document.
The CSS rules defined within the <style> tag apply only to the specific document in which 
they are defined.
This method is useful for small, single-page applications or documents where the CSS is unique to that document.
<link> tag:

The <link> tag is used to link an external CSS file to an HTML document.
It's placed within the <head> section of the HTML document.
The CSS rules defined in the linked external CSS file can be reused across multiple HTML documents.
This method is preferred for larger projects with multiple HTML pages or when you want to separate the CSS code from the HTML for better organization and maintenance.
Performance Difference:
When it comes to performance, there's generally no significant difference between using the <style> tag and the <link> tag to include CSS. However, there are a few factors to consider:

Caching:

When you use the <link> tag to link an external CSS file, the browser can cache the CSS file. Subsequent page loads will then be faster because the cached CSS file doesn't need to be re-downloaded.
With the <style> tag, the CSS is included directly within the HTML document, so it cannot be cached separately. This means that the CSS is fetched every time the HTML document is loaded.
Page Load Time:

In some cases, using an external CSS file linked with the <link> tag might lead to faster initial page load times because the browser can start fetching the CSS file while parsing the HTML document.
However, for small projects or when the CSS code is minimal, the difference in page load time between using <style> and <link> might not be noticeable.
Code Organization and Maintainability:

Using the <link> tag with an external CSS file promotes better code organization and maintainability, especially for larger projects, as it separates the HTML and CSS code.
The <style> tag is more suitable for small-scale projects or cases where the CSS code is 
 specific to a single document.
In summary, while there may be subtle differences in performance between using the <style> and <link> tags, the choice between them often depends on factors such as code organization, maintainability, and project size rather than significant performance considerations.

-------------------------------------------------------------------------
<img width="1030" alt="Screenshot 2024-02-25 at 10 19 36 PM" src="https://github.com/Surbhi-Kohli/JSModulesAndWebpack/assets/32058209/ee21083a-5f7e-47b4-a14f-6e2a811b61f1">

And so instead what we would wanna do, is we would wanna extract it out and have it in a separate tag, right?So, we can do this by adding the mini CSS extract plug-in.
We will apply this to our production config
abd replace the following code 
<img width="438" alt="Screenshot 2024-02-25 at 10 35 52 PM" src="https://github.com/Surbhi-Kohli/JSModulesAndWebpack/assets/32058209/d2f11c72-7e44-40d2-a827-44f9f36d32e5">

to:

<img width="678" alt="Screenshot 2024-02-25 at 10 34 11 PM" src="https://github.com/Surbhi-Kohli/JSModulesAndWebpack/assets/32058209/2c103e4f-a286-41e0-b418-23ef84290bc3">

When you build your code, you will notice that there is a css file added in your dist folder and the index.html holds a link to that file. 
<img width="738" alt="Screenshot 2024-02-25 at 10 38 03 PM" src="https://github.com/Surbhi-Kohli/JSModulesAndWebpack/assets/32058209/43e86bae-3e72-40a2-9940-25c5277be4bb">

<img width="503" alt="Screenshot 2024-02-25 at 10 42 36 PM" src="https://github.com/Surbhi-Kohli/JSModulesAndWebpack/assets/32058209/c06d8f57-8f77-4abc-84a1-335da496de90">
 If you import multiple CSS files in your project, like here we do, will it inject multiple link tags?no
 <img width="431" alt="Screenshot 2024-02-25 at 10 52 44 PM" src="https://github.com/Surbhi-Kohli/JSModulesAndWebpack/assets/32058209/709892c2-b18a-49cd-8713-8918f0f32c7b">

 It will concatenate the styles in the main.css.

 One important thing here:
So you're importing css styles  to the top-level module there. And then it's just gonna be putting those all in the same scope there.So the CSS wouldn't be scoped to the module.That is a caveat to think about.And that's why, when we talk about, let's say, Code splitting CSS,it becomes valuable to then separate those into asynchronous applications.you can, in real time, dynamically force scope change by applying a new style sheet.

a lot of people will end up using CSS modules to have the scope capabilities.Or they'll use their framework's recommended waythat webpack powers behind the scenes.

The mini css extract plugin has support to lazy load css.I think that's really cool,because it's nothing that any build tools have been able to generate so far for us.And so really makes performance possible, especially in the realms of CSS.

