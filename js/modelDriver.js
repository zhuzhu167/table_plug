(function(global, factory) {
	// 闭包1：判断（1）运行环境 （2）其他
	return factory.call(global.jQuery);
})(typeof window !== "undefined" ? window : this, function() {
	// 闭包2：逻辑操作
	var __M__ = {}
	var __md__ = {
		// 初始化
		init: function(id, data, config) {
			var $obj = $(id).find('td') || {};
			__M__ = config || __M__;
			this.load($obj, data);
		},
		// 加载
		load: function($obj, data) {
			this.fetch($obj, data);
		},
		// 解包
		fetch: function($obj, data) {
			var that = this;
			var x = 0;
			var nowLac = 1;
			var $objLen = $($obj).length;
			var dataLen = this.countObj(data[0]);
			var lacArr = this.recordLca(data[0]);
			var mLen = this.countObj(__M__);
			var demo = 0;
			$.each(data, function(key, val) {
				for (var hNum = 0; hNum < mLen; hNum++) {
					$.each(val, function(key, val) {
						if (lacArr[hNum] == nowLac) {
							that.refresh($obj[x], key, val);
							x++;
							return false;
						}
						nowLac++;
					});
					nowLac = 1;
				}
			});
		},
		// 刷新
		refresh: function($obj, key, val) {
			// $($obj).text(val);
			if (__M__[key].render != undefined) {
				__M__[key].render($obj, key, val);
			} else {
				$($obj).text(val);
			}
		},
		// 计算对象属性数量
		countObj: function(obj) {
			var n = 0;
			for (var i in obj) {
				n++;
			}
			return n;
		},
		// 记录数据对应的位置
		recordLca: function(data) {
			var lac = 0;
			var lacRes = [];
			for (var a in __M__) {
				for (var b in data) {
					lac++;
					if (a === b) {
						lacRes.push(lac);
						lac = 0
						break;
					}
				}
			}
			return lacRes;
		}
	};
	window.ModelDrider = window.$md = __md__;
	return __md__;
});
