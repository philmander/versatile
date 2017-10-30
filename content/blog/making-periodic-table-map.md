## Making Periodic Table Map

*This is a write-up on a recent side project of mine, [Periodic Table Map](http://periodictablemap.com/); an interactive periodic table of elements.*

### The Periodic Table?

Some time ago I remember having a pub conversation about what the element would make the most compact 10kg dumbbell, whilst not being so expensive that someone with a reasonable amount of disposable income couldn't afford one; a premiership footballer maybe. A bit of Googling quickly led me to [Periodic Videos](http://www.periodicvideos.com/), a wonderful collection of short videos about chemistry including videos, by [Sir Martin Poliakoff](https://en.wikipedia.org/wiki/Martyn_Poliakoff) and colleagues, on every element in the periodic table. From then on I was an armchair chemist (definitely an armchair chemist, not an amateur).

It's fascinating to think about what stuff is actually made of. How something like Phosphorus can be used as a terrifying weapon of war, yet it has an essential biological role. How volatile sodium and chlorine are in isolation, yet as a compound it's just table salt. How magnesium, the first thing that comes to mind of when I think of school chemistry, is inside every single molecule of chlorophyl (the stuff that makes plants green). Perhaps, if chemistry had been taught in a more relatable way I would have enjoyed it more.

The periodic table was first published by Dmitri Mendeleev in 1869 as a way of arranging the known chemical elements in trends of their properties. Its a grid, where rows are called periods and the columns are groups. Elements in the same group exhibit similar chemical properties. As you move down the periodic table the elements have more mass.

### Periodic Table User Experience

Despite Mendeleev's periodic table of elements being almost 150 years old and such a ubiquitous resource for chemists and those learning science I thought its representation on the web was a bit lacking.

The user interaction problem with the periodic table is that there is a huge amount of information associated with each element - ranging from the most fundamental (atomic number, mass, symbol) to the more in-depth and (more technical data, images, Wikipedia pages, videos, etc) that should be displayed or linked to from within the table on screen. Given the interactive nature of a web app, its also nice to include some tools to filter and display the elements based on their various properties.

Two of the best examles, [The Royal Society of Chemistry's Periodic Table](http://www.rsc.org/periodic-table) and [PTable](http://www.ptable.com/), solve this problem in a similar way. The layout of the traditional periodic table leaves a space, void of elements, at the top middle In these examples, this space is initially used for introduction text or the filtering tools. When hovering over an element block, the space can then be used to show some more detailed data. Clicking then takes you to separate page or pop-up with more in-depth information and media.

<figure><img src="/_media/rsc-periodic-table.png" width="100%" alt="Screenshot of the Royal Society of Chemistry's Periodic Table"><figcaption><p>The Royal Society of Chemistry's Periodic Table</p></figcaption></figure>

You are probably familiar with the tactile user experience of using online mapping tools. Most notably Googe Maps. I had the idea of applying the user interaction pattern of online maps to other contexts. Where a user could drag to move around a grid of items and zoom in to scale up the space for each items and thus use the new space for revealing more detailed information. This year's [10K Apart contest](https://a-k-apart.com/) provided a good opportunity to apply this "maps" interaction concept to the periodic table of elements, where each "item" is an element. So I built it. You can still [view the entry here](https://a-k-apart.com/gallery/Zoomable-Periodic-Table), although I'm not sure how long Microsoft will keep this server up. Alternatively the original code is also on [Github](https://github.com/philmander/periodic-table).

Unfortunately, it didn't win anything or get a notable mention. I'll be honest, I was a bit gutted, it took some effort to get it finished in time and I thought the novelty at least would get it some notoriety. However, I'd neglected the keyboard accessibility of the application and I think this was quite an important judging criteria. Or maybe, there were other issues. Or maybe it was just not very good! I don't know.

Nevertheless, I liked the concept and I thought those needing to use the periodic table would do too. So I persevered, made some improvements, did some refactoring and added some new features without the 10kb constraint.  The result is [periodictablemap.com](http://periodictablemap.com/).

### How it works

This is a bit more technical. I'll break the functionality down into 4 parts:

#### Moving

When a user drags with their mouse or finger, they move the table around. Rather than moving the position of the table's DOM element, via its left/right CSS properties or translate transforms, dragging actually scrolls the page horizontally and vertically. This works particularly well on touch devices because it just utilizes the browser's natural scrolling behavior which results in a smoother feel.

#### Zooming

A key part of the user experience is the zooming in and out. Whereby the element cells smoothly increase in size creating more space for more information to be injected. Or the opposite. This happens via a variety of input methods. Either by the pressing the physical zoom buttons or by double tapping/clicking, pinching or scrolling the mouse wheel at a specific point on the table.

This was something I just wanted to get done and move on with quickly, given the fast-approaching entry deadline for the 10K apart competition. It took me a bit longer to get it right though.

The obvious solution (to me at least) was to use CSS3 transforms to scale the table with a transition. However, this meant that whilst scaling up the entire table, each cell had to be simultaneously inversely scaled down, so more content could be added to the enlarged space at the original scale. This, in my initial attempt, was killing performance; it was very juddery. So I went back to the drawing board.

Instead, I tried simply increasing the pixel width of the entire table, letting the width of each cell increase naturally. I remember being happy with this at first, but then decided to ditch it. I can't remember exactly why. I think it was something to do with scaling the height of the table cells not working out. I decided to revisit the CSS3 scaling method.

Rather stupidly, I realized that, in my initial attempt I was also fading in/out the additional data that was added/removed by using CSS3 transitions on opacity. I had done this first and forgotten about it. It was this that was causing the performance issue. Thousands of transitions were simultaneously occurring. Although the brief fade-in effect was nice, the zoom transition still looked satisfactory without it, so I dropped it. The result works well.

The only other niggle to fix here was the `transform-origin` of the scale transform. This must must be updated when the user zooms at a specific point. But changing the transform-origin causes the table's scroll position to jump, so this must also be offset against the delta of the new vs old origin by updating the scroll position.

<figure><img src="/_media/ptm-zooms.png" width="100%" alt="Periodic Table Zoom States"><figcaption><p>Sulfur in its possible zoom levels</p></figcaption></figure>

#### Lazy Loading

Of course, retrieving and injecting into the DOM the expanded information of every chemical element after a zoom transition would be costly, particularly for the closest zoom level. Therefore, only the elements within the viewport at the start of the zoom transition are requested. Other elements are then subsequently requested and injected only after appearing within viewport after every scroll event.

#### Filtering

The final main piece of functionality is the filtering. Nothing out of the ordinary here. Event listeners listen to the filter control events. A model of the table is in memory which is used to find the elements which match the current properties of the filter. Elements which don't match are faded out.

### Performance

The performance of Periodic Table Map is one of its highlights. Building it, at first, as a 10k apart entry means good performance is in its DNA. Although the latest version's size has increased a bit since the 10k apart submission, it is still very fast to load.

Because it's server-side rendered, the initial rendering of table requires just 11.5kb to be transferred over the wire in a single HTTP request. This consists of the HTML and the CSS, which is in-lined. The Javascript is an additional 5.2kb to transfer obfuscated into one file and loaded using the `defer` attribute. This means the script will be downloaded asynchronously, but not block HTML parsing, it will only be executed after the HTML parsing is complete, which is, in this instance, good because the functionality the JS provides isn't needed immediately.

Given the original size constraints of the project, the Javascript uses no frameworks or libraries; it's "vanilla" JS. To digress a little I want to emphasize that this isn't such a big deal and it doesn't mean spaghetti code. With no framework you can still use design patterns to structure and write maintainable Javascript code. The role of frameworks is to typically do the plumbing and wiring required to help implement design patterns and to provide abstractions for common tasks; rendering a view, for example. In a relatively simple  app, like Periodic Table Map, its quite easy to manage without this, resulting in a much lighter code footprint.

On the server, some Nginx proxy caching means the Node JS server does very little and responses are rapid. Naturally resources are all gzipped too.

### Conclusions

Personally, I really enjoy using Periodic Table Map. The most detailed zoom level creates an experience that encourages you to kill time and continue browsing. It keeps the user journey flowing. More so than if the in-depth details for each element were on separate web pages. I think some of the filtering capabilities are neat too. Particularly, being able to quickly see what elements are in a given state at any temperature. You might ask, "what elements are liquid at 100°C?" Or to go back in time and see what the periodic table looked like in the past using the *year* filter. For example, its easy to see what elements were known to Mendeleev when he first published his periodic table in 1869.

Obviously I'm writing this with a bias, but I hope others feel the same way and that Periodic Table Map becomes a popular learning and reference tool. Please let me know if you have any feedback. I would also welcome any help on publicising Periodic Table Map.

<figure><img src="/_media/periodic-table-1869.png" width="100%" alt="Periodic Table Map showing the known elements in 1869"><figcaption><p>Periodic Table Map showing the known elements in 1869</p></figcaption></figure>

Oh, and the answer to the question at the start of the post. Well, [Iridium](https://en.wikipedia.org/wiki/Iridium) and [Osmium](https://en.wikipedia.org/wiki/Osmium) are the densest naturally occurring metals. Osmium oxidizes in air, however, to form the highly toxic [Osmium Tetroxide](https://en.wikipedia.org/wiki/Osmium_tetroxide) so Osmium can be eliminated purely on practicality. A 10kg dumbbell of Iridium would probably be prohibitively expensive even for the very wealthy. Another contender that I think is most suitable is [Tungsten](https://en.wikipedia.org/wiki/Tungsten)*.

<small>*Being strictly an armchair chemist, this is probably wrong and/or lacking sufficient detail.</small>

[http://periodictablemap.com](http://periodictablemap.com)

<hr>





