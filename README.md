# addTimeToUrl

This is a simple function, used to add timestamp to url.

e.g.
```javascript
addTimeToUrl('http://www.sample.com/path.html');
// return:
// "http://www.sample.com/path.html?v=1438165051488"
```

# install

```hash
npm install add_time_to_url
```

# usage

`addTimeToUrl` is a simple function, used as CommonJS Module:

```javascript
var addTimeToUrl = require('addTimeToUrl');
var url = addTimeToUrl('http://www.sample.com/path.html');
```

But, if used in browser directly, the global function's name is `XSM_addTimeToUrl`.

# test

```hash
npm test
```
