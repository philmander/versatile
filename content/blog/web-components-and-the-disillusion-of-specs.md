## Web Components and the Disillusion of Specs

I have recently taken a direction where I have been working with developers who are proponents of Web Components and/or Polymer. A frequent argument I have encountered in favor of selecting Web Components as a view technology is that they "meet the [W3C or WHATWG] specs". But what does this really mean and why is it an advantage?

Let's take a closer look at why these specs exist. Specifications or standards exist for the purpose of interoperability; so that the same code will run across multiple environments - specifically for web developers these environments are web browsers.

By this measure, libraries like React (or insert view library with strong browser support here) surely have much greater spec conformance because have much better browser compatibility that Web Components do! This statement is a bit tongue and cheek, but the point here is that even though say, JSX, is not a standard supported by the browser, the code that ultimately runs in the browser does indeed confirm to specs. To imply that Web Components have better spec conformance than React is not accurate. Web Components just choose to create new specs that confirm with their way of doing things.

The real, underlying argument then is that Web Components don't require a build step to run in a development environment. This is a desire that some developers continue to hang on to. The popularity of libraries that do, however, suggests this not something that hinders the many. Indeed, it seems to be something that has fostered tremendous innovation in web development over the past few years. I should also note that even Polymer CLI transpiles to ES5.

You could also argue that Web Components, being implemented in the browser, require less code to be sent over the wire resulting in better performance. Maybe so...

Anyhow, from here I will sit firmly on the fence. The point of this post is to not get drawn in to a debate on the pros and cons of Web Components. But when evaluating the benefits of Web Components in comparison with other modern view libraries, "confirming to specs" is, in itself, a point of little substance.
