(function(){
	/**
	 * 向 url 添加时间戳 v=<当前时间毫秒数>
	 *
	 * @url {String} URL
	 * @return {String} 添加了 v=xxxx 参数的 URL
	 *
	 * 示例：
	 * url1 - http://www.sample.com/path.html
	 *        http://www.sample.com/path.html?v=1438161290674
	 * url2 - http://www.sample.com/path.html?param=value
	 *        http://www.sample.com/path.html?param=value&v=1438161290674
	 * url3 - http://www.sample.com/path.html?param=value#hash
	 *        http://www.sample.com/path.html?param=value&v=1438161290674#hash
	 */
	function addTimeToUrl(url) {
		// 只对含有 .htm 的 url 进行处理
		if (!url || typeof url !== 'string' || url.toLowerCase().indexOf('.htm') === -1) {
			return url;
		}

		var rest = url;

		// 处理 hash
		var hashIndex = rest.indexOf('#');
		var hash;

		if (hashIndex > -1) {
			hash = rest.substr(hashIndex);
			rest = rest.slice(0, hashIndex);
		} else {
			hash = '';
		}

		// 处理 search
		var searchIndex = rest.indexOf('?');
		var search;

		if (searchIndex > -1) {
			search = rest.substr(searchIndex);
			rest = rest.slice(0, searchIndex);

			// 已有 v 参数，视为已添加时间戳，直接返回原始 url
			if (search.indexOf('?v=') > - 1 || search.indexOf('&v=') > -1) {
				return url;
			}
		} else {
			search = '';
		}

		var path = rest;

		search = search.length > 1 ? search + '&' + generateTimeParam() : '?' + generateTimeParam();

		return path + search + hash;
	}

	// 生成时间参数
	function generateTimeParam() {
		return 'v=' + (+new Date());
	}

	if (typeof exports == 'object') {
		module.exports = addTimeToUrl;
	} else { // 全局方法
		window.XSM_addTimeToUrl = addTimeToUrl;
	}

})();