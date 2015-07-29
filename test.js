var addTimeToUrl = require('./addTimeToUrl');

function test__addTimeToUrl() {
	var cases = [
		'http://www.sample.com/path.html',
		'http://www.sample.com/path.html?param=value',
		'http://www.sample.com/path.html?param=value#hash',
		'http://www.sample.com/path.html#hash',
		'http://www.sample.com/path.html#foo?k=v'
	];

	for (var i = 0, len = cases.length; i < len; i++) {
		console.log('Input: ' + cases[i] + '\nOutput: ' + addTimeToUrl(cases[i]) + '\n');
	}
}

test__addTimeToUrl();