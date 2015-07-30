var addTimeToUrl = require('./addTimeToUrl');
var colors = require('colors/safe');

var timeStampPlaceholder = getTimeStampPlaceholder();

function getTimeStampPlaceholder() {
	var timeStamp = +new Date();
	timeStamp = '' + timeStamp;
	return 'xxxxxxxxxxxxxxxxxxxxxxxxxx'.substr(0, timeStamp.length);
}

function checkResult(expext, output) {
	placeholder = expext.indexOf(timeStampPlaceholder);
	return expext.length === output.length &&
		(placeholder > -1 ?
			// remove placeholder and compare the rest string
			expext.slice(0, placeholder) + expext.substr(placeholder + timeStampPlaceholder.length) ===
			output.slice(0, placeholder) + output.substr(placeholder + timeStampPlaceholder.length)
		: expext === output);
}

function test__addTimeToUrl() {
	var cases = [
		[
			'http://www.sample.com/path.html',
			'http://www.sample.com/path.html?v=' + timeStampPlaceholder,
			'no search, just add timestamp'
		], [
			'http://www.sample.com/path.html?param=value',
			'http://www.sample.com/path.html?param=value&v=' + timeStampPlaceholder,
			'append timestamp to existing search'
		], [
			'http://www.sample.com/path.html?param=value#hash',
			'http://www.sample.com/path.html?param=value&v=' + timeStampPlaceholder + '#hash',
			'with hash, insert timestamp between existing search and hash'
		], [
			'http://www.sample.com/path.html#hash',
			'http://www.sample.com/path.html?v=' + timeStampPlaceholder + '#hash',
			'with hash, no search, insert timestamp before hash'
		], [
			'http://www.sample.com/path.html#foo?k=v',
			'http://www.sample.com/path.html?v=' + timeStampPlaceholder + '#foo?k=v',
			'with hash, and hash has "?", insert timestamp before hash'
		], [
			'http://www.sample.com/path.html#v=123',
			'http://www.sample.com/path.html?v=' + timeStampPlaceholder + '#v=123',
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
		], [
			'javascript:void(0)',
			'javascript:void(0)',
			'not valid url, used as placeholder'
		], [
			'#',
			'#',
			'not valid url, used as placeholder'
		]
	];

	console.log(
		colors.cyan('i: INPUT\ne: EXPECT ' + timeStampPlaceholder + ' is placeholder for TIMESTAMP\no: OUTPUT\n')
	);

	var fail = 0, caseNum = cases.length;

	for (var idx = 0, c, d, i, e, o, success; idx < caseNum; idx++) {
		c = cases[idx];
		d = c[2];
		i = c[0];
		e = c[1];
		o = addTimeToUrl(c[0]);
		// simple juge
		success = checkResult(e, o);
		if (!success) fail++;
		console.log(
			colors.cyan(d) + '\n' +
			'i: ' + i + '\n' +
			'e: ' + e + '\n' +
			'o: ' + colors.yellow(o) + '\n' +
			(success ? colors.green('done.') : colors.red('fail!')) + '\n'
		);
	}

	if (fail === 0) {
		console.log(colors.green('DONE! All ' + caseNum + ' test cases passed.'));
	} else {
		console.log(colors.red('FAIL! ' + fail + '/' + caseNum + ' test cases failed.'));
	}
	
}

test__addTimeToUrl();