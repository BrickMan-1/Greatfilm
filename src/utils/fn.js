/**
 * Created by Tesla on 2018/1/12/0012.
 */

!function(win, doc, udf){

	// 全局对象
	var fn = {
		get: get,
		create: create,
		extend: extend,
		isNumber: isNumber,
		isString: isString,
		isBoolean: isBoolean,
		isArray: isArray,
		isObject: isObject,
		isFunction: isFunction,
		isRegExp: isRegExp,
		isDate: isDate,
		isNull: isNull,
		isUndefined: isUndefined,
		isNaN: isNaN,
		type: type,
		int: int,
		float: float,
		min: min,
		max: max,
		random: random,
		parseStr: parseStr,
		parseUrl: parseUrl,
		getQuery: getQuery,
		format: format,
		second2hms: second2hms,
		imgReady: imgReady,
		loadStyle: loadStyle,
		reduceDimension: reduceDimension,
		splitArray: splitArray,
		hasClass: hasClass,
		addClass: addClass,
		removeClass: removeClass,
		toggleClass: toggleClass
	};

	win.fn = fn;

	// 获取原生dom节点， 返回array
	function get(selector){
	    return [].slice.call(doc.querySelectorAll(selector));
	}

	// 创建dom节点， 返回Element
	function create(tagName){
	    return doc.createElement(tagName);
	}

	// 加载样式表
	function loadStyle(href, beforeElement){
		var css = create('link'),
			head = doc.head;
		css.rel= 'stylesheet';
		css.href = href;
		beforeElement ? head.insertBefore(css, beforeElement) : head.appendChild(css);
	}

	// 判断对象类型， 返回String
	function type(obj){
		return {}.toString.call(obj).replace(/\[object\s(\w+?)]/, '$1');
	}

	// 判断是不是数字， 返回Boolean
	function isNumber(obj){
		return 'Number' === type(obj);
	}

	// 判断是不是字符串， 返回Boolean
	function isString(obj){
		return 'String' === type(obj);
	}

	// 判断是不是布尔值， 返回Boolean
	function isBoolean(obj){
		return 'Boolean' === type(obj);
	}

	// 判断是不是数组， 返回Boolean
	function isArray(obj){
		return 'Array' === type(obj);
	}

	// 判断是不是对象， 返回Boolean
	function isObject(obj){
		return 'Object' === type(obj);
	}

	// 判断是不是函数， 返回Boolean
	function isFunction(obj){
		return 'Function' === type(obj);
	}

	// 判断是不是正则， 返回Boolean
	function isRegExp(obj){
		return 'RegExp' === type(obj);
	}

	// 判断是不是日期， 返回Boolean
	function isDate(obj){
		return 'Date' === type(obj);
	}

	// 判断是不是null， 返回Boolean
	function isNull(obj){
		return 'Null' === type(obj);
	}

	// 判断是不是undefined， 返回Boolean
	function isUndefined(obj){
		return 'Undefined' === type(obj);
	}

	// 判断是不是NaN， 返回Boolean
	function isNaN(obj){
		return isNumber(obj) && obj !== obj;
	}

	// 取整
	function int(value, radix){
		return parseInt(value, radix || 10);
	}

	// 取小数
	function float(value){
		return parseFloat(value);
	}

	// 取最小值
	function min(){
		return Math.min.apply(null, isArray(arguments[0]) ? arguments[0] : arguments);
	}

	// 取最大值
	function max(){
		return Math.max.apply(null, isArray(arguments[0]) ? arguments[0] : arguments);
	}

	// 取随机数[min, max]
	function random(min, max){
		return Math.round(Math.random() * (max - min) + min);
	}

	// 数组降维
	function reduceDimension(array){
	    return [].concat.apply([], array);
	}

// 一维数组变为二维数组
function splitArray(array, size){
	var n = array.length, i = 0, result = [];
	for(; i < n; i += size){
		result.push(array.slice(i, i + size));
	}
	return result;
}

	// 字符串解析(把字符串中的key替换为value)
	function parseStr(str, data){
	    var key, reg;
	    for(key in data){
	    	if(data.hasOwnProperty(key)){
				reg = new RegExp('{' + key + '}', 'g');
				str = str.replace(reg, data[key]);
			}
		}
		return str;
	}

	// 解析路由
	function parseUrl(url){
		function decode(str){
			return str ? decodeURIComponent(str) : '';
		}
		var a = doc.createElement('a');
		a.href = url || win.location.href;
		return {
			href: decodeURI(a.href),
			protocol: a.protocol.replace(':', ''),
			hostname: a.hostname,
			port: a.port || 80,
			pathname: decode(a.pathname),
			filename: decode((a.pathname.match(/\/*?([^\/?#]+)$/i) || [, ''])[1]),
			search: decode(a.search),
			hash: decode(a.hash.slice(1)),
			query: getQuery(a.search.slice(1))
		};
	}

	// 获取查询参数
	function getQuery(queryStr){
		if(!queryStr){
			return {};
		}
		var obj = {}, array;
		queryStr.split('&').forEach(function(item){
			if(item){
				array = item.split('=');
				obj[array[0]] = +array[1] || +array[1] === 0 ? +array[1] : decodeURIComponent(array[1]);
			}
		});
		return obj;
	}

	// 时间格式化
	function format(format, timestamp) {
		var date = new Date(timestamp).getTime() ? new Date(timestamp) : new Date(),
			obj = {
				"y": date.getFullYear(),       							// 年份, 1970 - ?
				"M": date.getMonth() + 1,      							// 月份, 1-12
				"d": date.getDate(),           							// 日期, 1-31
				"h": date.getHours(),          							// 小时, 0-23
				"m": date.getMinutes(),        							// 分钟, 0-59
				"s": date.getSeconds(),        							// 秒钟, 0-59
				"q": Math.floor((date.getMonth() + 3) / 3),				// 季度, 1-4
				"w": date.getDay(),										// 星期, 0-6 (0:星期天)
				"S": date.getMilliseconds() 							// 毫秒, 0-999
			},
			key, value;
		for(key in obj){
			var reg = new RegExp('(' + key + '+)');
			if(obj.hasOwnProperty(key) && reg.test(format)){
				value = obj[key];
				value = value < 10 ? '0' + value : value;
				format = format.replace(RegExp.$1, value);
			}
		}
		return format;
	}

	// 秒转为时分秒: second2hms('h:m:s', 259.970612) --> 00:04:19
	function second2hms(format, second) {
		var obj = {
				'h': Math.floor(second / 3600),
				'm': Math.floor((second / 60 % 60)),
				's': Math.floor((second % 60))
			},
			key, value;
		for(key in obj){
			if(obj.hasOwnProperty(key)){
				var reg = new RegExp('(' + key + '+)');
				if(reg.test(format)){
					value = obj[key];
					value = value < 10 ? '0' + value : value;
					format = format.replace(RegExp.$1, value);
				}
			}
		}
		return format;
	}

	// 判断图片下载完成
	function imgReady(imgSrc, field, callback, rootDir){
		if(isFunction(imgSrc)){
			return;
		}
		if(isFunction(field)){
			callback = field;
			field = udf;
		}
		var that = this, src, image, images = [], count = 0, root = rootDir || '';
		if(isString(imgSrc)){
			listen(root + imgSrc, false);
		}else if(isArray(imgSrc)){
			imgSrc.forEach(function(item){
				src = isString(item) ? root + item : isObject(item) && item[field] ? root + item[field] : '';
				src && listen(src, true);
			});
		}
		function listen(src, isArray){
			image = create('img');
			images.push(image);
			image.addEventListener('load', function(){
				runCallback(isArray);
			}, false);
			image.addEventListener('error', function(){
				runCallback(isArray);
			}, false);
			image.src = src;
		}
		function runCallback(isArray){
			++count === images.length && callback.call(that, isArray ? images : image);
		}
	}

	// 简单对象合并拓展
	function extend(){
	    var args = [].slice.call(arguments),
			obj = {};
		args.forEach(function(arg){
			if(!isObject(arg)){
				return;
			}
		   for(var key in arg){
				if(arg.hasOwnProperty(key)){
					obj[key] = arg[key];
				}
		   }
		});
		return obj;
	}

	// classReg
	function classReg(className) {
		return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
	}

	// hasClass
	function hasClass(el, className){
		return classReg(className).test(el.className);
	}

	// addClass
	function addClass(el, className){
		if (!hasClass(el, className)) {
			el.className = el.className + ' ' + className;
		}
	}

	// removeClass
	function removeClass(el, className){
		el.className = el.className.replace(classReg(className), ' ');
	}

	// toggleClass
	function toggleClass(el, className){
		hasClass(el, className) ? removeClass(el, className) : addClass(el, className);
	}


}(window, document);