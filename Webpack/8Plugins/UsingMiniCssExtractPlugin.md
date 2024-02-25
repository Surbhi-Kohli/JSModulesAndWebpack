

Currently everything is loaded via JS
So the CSS that we have now, it's just adding a module and it's blocking the main thread, right?Because you're relying on JavaScript to attach a style tag.And so instead what we would wanna do, is we would wanna extract it out and have it in a separate tag, right?So, we can do this by adding the mini CSS extract plug-in.
