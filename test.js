var addTimeToUrl = require('./addTimeToUrl');

function test__addTimeToUrl() {
	var cases = [
		[
			'http://www.sample.com/path.html',
			'http://www.sample.com/path.html?v=xxxxxxxxxxxxx',
			'no search, just add timestamp'
		], [
			'http://www.sample.com/path.html?param=value',
			'http://www.sample.com/path.html?param=value&v=xxxxxxxxxxxxx',
			'append timestamp to existing search'
		], [
			'http://www.sample.com/path.html?param=value#hash',
			'http://www.sample.com/path.html?param=value&v=xxxxxxxxxxxxx#hash',
			'with hash, insert timestamp between existing search and hash'
		], [
			'http://www.sample.com/path.html#hash',
			'http://www.sample.com/path.html&v=xxxxxxxxxxxxx#hash',
			'with hash, no search, insert timestamp before hash'
		], [
			'http://www.sample.com/path.html#foo?k=v',
			'http://www.sample.com/path.html?v=xxxxxxxxxxxxx#foo?k=v',
			'with hash, and hash has "?", insert timestamp before hash'
		], [
			'http://www.sample.com/path.html#v=123',
			'http://www.sample.com/path.html?v=xxxxxxxxxxxxx#v=123',
			'with hash, and hash has "v=xxx", insert timestamp before hash'
		], [
			'http://www.sample.com/path.htm?v=123',
			'http://www.sample.com/path.htm?v=123',
			'search has "v=xxx", skip and return origin url'
		], [
			'http://www.sample.com/path.js',
			'http://www.sample.com/path.js',
			'url not .htm, skip and return origin url' 
		], [
			'http://www.sample.com/path',
			'http://www.sample.com/path',
			'url not .htm, skip and return origin url' 
		]
	];

	console.log(
		'i - INPUT, e - EXPECT, o - OUTPUT, xxxxxxxxxxxxx - TIMESTAMP\n'
	);

	for (var i = 0, c, len = cases.length; i < len; i++) {
		c = cases[i];
		console.log(
			'# ' + c[2] + '\n' +
			'i: ' + c[0] + '\n' +
			'e: ' + c[1] + '\n' +
			'o: ' + addTimeToUrl(c[0]) + '\n'
		);
	}
}

test__addTimeToUrl();