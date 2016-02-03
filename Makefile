ESLINT := node_modules/.bin/eslint

lint:
	@${ESLINT} .

mocha:
	@node_modules/.bin/mocha --compilers js:babel-core/register test/index.js --watch test/*.js --watch-extensions lib/*.js

test: lint mocha

build:
	@node_modules/.bin/babel lib/ > dist/reconnect.js


