/**
 * Created by Tesla on 2018/1/15/0015.
 */

!(function(fn, w, d){

	$(d).ready(function(){

		// selector: 绑定瀑布流的容器的css选择器(一般我用：'.grid');
		// options: 瀑布流插件的用户配置项，已经设置了我们常用的默认配置，一般忽略不填;
		var Grid = function(selector, options){
			// 默认配置
			var defaults = {
				columnWidth: '.grid-sizer',
				itemSelector: '.grid-item',
				gutter: 0,
				percentPosition: true,
				resize: true,
				loader: '.grid-loader',
				loaderShowClass: 'grid-loader-show',
				scrollLoad: true,
				layoutBefore: null,
			};
			this.setting = $.extend({}, defaults, options || {});
			this.grid = $(selector);
			this.loader = $(this.setting.loader);
			this.inited = false;
			this.allowRequestFlag = true;
			this.maxRequestCount = 0;
			this.init();
		}

		Grid.prototype = {
			constructor: Grid,

			// 初始化瀑布流布局
			init: function(){
				this.layout();
				if('function' === typeof this.setting.layoutBefore){
					$(w).on('resize', this.setting.layoutBefore);
				}
			},

			// 返回瀑布流对象
			data: function(){
				return this.grid.data('masonry');
			},

			// 瀑布流布局
			layout: function(html, event){
				var setting = this.setting,
					grid = this.grid,
					beforeFn = setting.layoutBefore,
					items = $(html || '');
				event = event || 'appended';
				grid.append(items);
				items.length && 'function' === typeof beforeFn && beforeFn();
				if(this.inited){
				}else{
					this.inited = true;
				}
				if(setting.scrollLoad){
					this.hideLoader();
					this.allowRequestFlag = true;
				}
			},

			// 重新布局
			relayout: function(){
				this.grid.masonry('layout');
			},

			// 在头部追加元素
			prepend: function(items){
				this.layout(items, 'prepended');
			},

			// 在尾部追加元素
			append: function(items){
				this.layout(items);
			},

			// 删除元素项
			remove: function(el){
				this.grid.masonry('remove', el).masonry('layout');
			},

			// 清空所有元素
			empty: function(){
				var items = this.grid.masonry('getItemElements');
				this.remove(items);
			},

			// 重新加载瀑布流
			reload: function(){
				this.grid.masonry('reloadItems');
			},

			// 销毁瀑布流对象
			destroy: function(){
				this.grid.masonry('destroy');
			},

			// 鼠标滚动到loader时触发
			allowRequest: function (callback){
				if(!this.setting.scrollLoad){
					return;
				}
				var that = this,
					loader = this.loader,
					h = loader.outerHeight(true),
					mgt = parseInt(loader.css('marginTop')),
					mgb = parseInt(loader.css('marginBottom')),
					event = 'scroll.grid';

			    $(w).off(event).on(event, function (){
			       var scrollTop = $(d).scrollTop(),
					   loaderTop = loader.offset().top,
					   top = loaderTop - $(w).height() + h + mgt + mgb;
			       if(scrollTop >= top && that.allowRequestFlag && that.maxRequestCount){
					   that.allowRequestFlag = false;
					   that.maxRequestCount--;
					   that.showLoader();
					   callback.call(that);
				   }
			    });
			},

			// 设置最大请求数
			setMaxRequestCount: function (value){
				if(!+value && +value !== 0){
					throw Error('Error on setMaxRequestCount(value); The parameter "value" must be converted to number!');
				}
				this.maxRequestCount = +value;
			},

			// 显示grid loader
			showLoader: function (){
			    this.loader.addClass(this.setting.loaderShowClass);
			},

			// 隐藏grid loader
			hideLoader: function (){
				this.loader.removeClass(this.setting.loaderShowClass);
			}

		}

		w.Grid = Grid;

	});

})(fn, window, document);
