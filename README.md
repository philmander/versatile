versatile
============

## Development

Run `npm start` to start your Pagespace server.

The Pagespace middleware configuration in `app.js` is for simple local development. More advanced configuration 
is also available which more suitable for other setups such as production.

Start by going to [http://localhost:3000/_dashboard](http://localhost:3000/_dashboard) 

Login with `admin / admin` and start working with Pagespace by importing templates and plugins.

### Theme

Customize HTML and CSS in the `theme` directory.

CSS is modularized and compiled using [SCSS](http://sass-lang.com/). 

```
node-sass theme/assets/css/site.scss -o theme/assets/css
```