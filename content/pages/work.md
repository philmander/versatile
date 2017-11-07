## Recent Work

<a id=topspots></a>
### TopSpots: Full stack webapp

<span class=date>2017</span>

Live beta site: <a href="https://demo.topspots.com" target=_blank>Topspots.com</a>

Jan Bartelsman's online photography guide to restaurants, cafés and bars
was a statically generated site that needed a major update to meet the
requirements of scaling TopSpots B.V.

This was a major full-stack build; a database driven progressive web app
for mobile and desktop plus a separate administration console for
managing the venue database and photography library. It includes features
such as geo-location searches, full localization in multiple countries and
languages, server-side (isomorphic) rendering and OAuth login for administrators.

The implementation is built using *Preact* and *Mobx* on the client and
*Express* and *MongoDB* on a *Node.JS* backend. A *GraphQL* API bridges
communication between the two. Deployment is fully containerized using
*Docker* and *Docker Compose*.

The result is fast and engaging user experience which meets the demands
of a rapidly growing business.

<figure>
    <img src="/images/work-topspots.png" alt="TopSpots' geo search results view" width=100%>
    <figcaption>TopSpots' geo search results view.</p>
</figure>

<a id=vonq></a>
### Vonq: FE Architecture

<span class=date>2017</span>

Vonq needed a modern frontend architecture to compliment a new vision
for the UX of its online services.
The solution had to find the balance between being customized so that
it may integrate with legacy systems but also be easily approachable to
new frontend developers with a common skillset. Technically, it needed
to support a componentized  approach where mini-apps could be developed
discretely and then integrated into a dashboard.

Such mini-apps were developed using *React* and distributed as NPM
modules. A *Redux* store acted as a central communications bus and data
store. A challenging business requirement was that the new solution
should be delivered as a phased migration from a legacy *AngularJS*
application. This was achieved by iframing in units of Angular.JS
functionality as dashboard widgets. Bespoke Redux middleware helped to
bridge the state between the two worlds. It meant that time-to-market was
greatly increased. We were then able to phase out the legacy implementation
on sprint-by-sprint basis by replacing these units with React versions
of the same functionality.

After the foundation delivery I stayed with Vonq to
support bringing a new development team up to speed and establishing
agile and development processes. This included drawing up scrum best
practices for the team, creating a functional testing framework with
<em>Selenium</em> and <em>Cucumber.JS</em> and designing a continuous
delivery workflow.

<figure>
    <img src="/images/work-vonq.png" alt="Vonq's Re-architected Job Marketing Platform" width=100%>
    <figcaption>Vonq's Re-architected Job Marketing Platform.</p>
</figure>

<a id=backbase></a>
### Backbase: Tech lead/FE Architecture

<span class=date>2015 - 2017</span>

I worked in the heart of Backbase's R&D department working as the
frontend architect and a tech lead on the latest major version of its
Customer Experience Platform; an enterprise presentation layer for
banking and finanical services.

This was a "vanilla js" project intended to support developing and
rendering "widgets": mini-apps, units of functionality which may be
built using any framework and run alongise each other on the same page.

My work at Backbase also included mobile architecture and Angular
development.

<a id=projets></a>
### Projects and open source

* [Periodic Table Map](https://periodictablemap.com/): Based on my 2016 10k Apart entry, Periodic Table Map is a fun and interactive way to explore the chemical elements.
* [Pagespace](https://github.com/pagespace/pagespace): A platform running on Node.JS for managing websites. Several small websites such as <a href="https://lovedaysmith.com/">lovedaysmith.com</a> and <a href="https://orangeteatheatre.com/whats-on">orangteatheatre.com</a> are presently running on this platform.
* [Browser Bunyan](https://github.com/philmander/browser-bunyan): A logging framework optimized for the browser based on Bunyan for Node.
* [A Seal](https://github.com/philmander/a-seal): Access control list libary for Node.JS
* [More on Github](https://github.com/philmander)

<a id=talks></a>
### Talks

* [The Evolution of MVC in Javascript (2016)](https://docs.google.com/presentation/d/1qnK5QC5uyQfLhb4U_OoF7FcKM1yhOKw9AUF8NigBCno/edit?usp=sharing): A look at how frontend frameworks have evolved but remain rooted in the MVC pattern, which hasn't changed much.
* [Streamlining Frontend development with Node.JS (2014)](https://docs.google.com/presentation/d/1co8iOt_3EX7CFXzjzkg5D6ki_CV0k6CpmUAY1shv450/edit?usp=sharing): A review of working with Node.JS based frontend build tools.

<a id=cv></a>
### CV

You can download <a href="https://drive.google.com/file/d/0Byz1SdR7oPOfd2V0Y29MN2RPbWM/view?usp=sharing" target="_blank">my CV here</a>.
