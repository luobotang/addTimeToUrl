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
		if (typeof url !== 'string') {
			return url;
		}
		var path, searh, hash;

		var searchIndex = url.indexOf('?');
		var hashIndex = url.indexOf('#');

		if (hashIndex === -1) {
			hashIndex = url.length;
		}

		// 没有查询参数，或 ? 出现在 # 之后，此时视为 hash 的一部分，没有查询参数
		if (searchIndex === -1 || searchIndex > hashIndex) {
			searchIndex = hashIndex;
		}

		path = url.substring(0, searchIndex);
		searh = url.substring(searchIndex, hashIndex);
		hash = url.substring(hashIndex);

		// 将时间加入查询参数
		var time = +new Date();
		if (searh) {
			// 已有 v 参数，视为已添加时间戳，直接返回原始 url
			if (searh.indexOf('?v=') > - 1 || searh.indexOf('&v=') > -1) return url;
			searh = searh + '&v=' + time;
		} else {
			searh = '?v=' + time;
		}

		return path + searh + hash;
	}

	if (typeof exports == 'object') {
		module.exports = addTimeToUrl;
	} else { // 全局方法
		window.XSM_addTimeToUrl = addTimeToUrl;
	}

)();