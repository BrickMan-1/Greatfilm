import "jquery";
import "common";
import "sass/layout.scss";
import "../plugs/scrollreveal/scrollreveal.min"
import "../plugs/async_v201711171014"
import '../plugs/tesla'
import Masonry from "masonry-layout"

$(window).on('load', function () {

	// 请求配置
	var grid = $('.grid'),
		gridLoader = $('.grid-loader'),
		canRequest = true,
		initMasonry = false,
		query = {
			categoryId: 70,
			pageSize: 6,
			pageIndex: 1
		};

	// 请求第一页数据
	var page = 1;
	getData();


	$(window).on('scroll',function(){
		var offsetTop = gridLoader.offset().top;
		if(offsetTop<$(window).height()+$(window).scrollTop()){

			canRequest && getData()
		}
	})
	// 请求后台数据并设置下次请求配置
	function getData() {
		canRequest = false;
		gridLoader.addClass('grid-loader-show');
		api.getRows(query).then(function (response) {
			var maxRequestCount = Math.ceil((response.total / query.pageSize));
			query.pageIndex++;
			canRequest = query.pageIndex <= maxRequestCount;
			if(page == 1){
				getList(response.data, _render);
				page = 2;
			}else{
				setTimeout(function(){
					getList(response.data, _render);
				},1000)
			}
		});
	}

	// 异步(主要等待图片加载完成：imgReady)拼接数据列表, 拼接完成回调渲染
	function getList(data, callback) {
		tesla.imgReady(data, 'img_url', function () {
			var list = '';
			data.forEach(function (item) {
				list += tesla.solve($('#gridTmp').html(), {
					src: item.img_url,
					title: item.title
				});
			});
			callback(list);
			gridLoader.removeClass('grid-loader-show');
			loading.hide();
		}, undefined);
	}

	// 渲染列表到页面
	function _render(list) {
		var items = $(list);
		grid.append(items);
		$(".grid-item").addClass("animated zoomIn")

		// 初始化瀑布流
		if(!initMasonry){
			var ele = document.getElementsByClassName("grid")[0];
			new Masonry(ele,{
				itemSelector: '.grid-item',
				columnWidth: '.grid-item',
				gutter: 0,
				percentPosition: true,
				isAnimated: true
			})
		}
	}
});

