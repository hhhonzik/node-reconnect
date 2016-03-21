ESLINT := node_modules/.bin/eslint

lint:
	@${ESLINT} .

mocha:
	@node_modules/.bin/mocha --compilers js:babel-core/register test/index.js


mocha-watch:
	@node_modules/.bin/mocha --compilers js:babel-core/register test/index.js --watch test/*.js --watch-extensions src/*.js

test: lint mocha
