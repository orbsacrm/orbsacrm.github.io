orbsa.com
=========
Source-code for the https://orbsa.com website. Built on the `este.js`
boilerplate.

## Prerequisites
- [node.js](http://nodejs.org) (Node 5 with npm 3 is required).
- [gulp](http://gulpjs.com/) (`npm install -g gulp`)

If you are using different node versions on your machine, use
[nvm](https://github.com/creationix/nvm) to manage them.

## Start Development

- run `gulp`
- point your browser to [localhost:8000](http://localhost:8000)

## Dev Tasks
- `gulp` run web app in development mode
- `gulp -p` run web app in production mode
- `gulp mocha` run mocha unit tests
- `gulp mocha-watch` continuous test running for TDD
- `gulp eslint` eslint

## Production Tasks
- `gulp build -p` build app for production, for example for [Heroku](https://dashboard.heroku.com/)
- `npm test` run all checks and tests
- `node src/server` start app, remember to set NODE_ENV and SERVER_URL
- `gulp to-html` render app to HTML for static hosting like [Firebase](https://www.firebase.com/features.html#features-hosting)


## FAQ
### Why does the CSS flicker when starting the app/refreshing it?
In dev mode, webpack loads all the style inline, which makes them hot
reloadable. This behaviour disappears in production mode (`gulp -p`).

#### Does Hapi/SailJS/Restify/Rails work with Este? Do you have any example app for this framework?
Yes it does. Este is agnostic of what you use in your backend and is completely
decoupled from the API. It uses an Express app for server-side rendering, but
you can use anything for your API. The only benefit that an Express API has is
that it can simply be `use()` by the main app, like any other middleware.

#### Is it possible use XXX library with Este?
Yes. Este makes little assumptions about your stack, and passing every bit of
needed info through props. This is not a framework, nothing prevents you from
picking the bits you're interested in.

## License
Este.js is published under the MIT license.

All rights are reserved on all modifications made by Orbsa.
