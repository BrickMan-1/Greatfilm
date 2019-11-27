import 'jquery'
import 'common'
import 'sass/layout.scss'
import '../api/api'
import {render} from "../api/render";
import {addAnimated} from "../utils/utils";

$(function(){
	// 引导页渲染
	const guideVideoRender = ()=>
		new Promise(resolve => {
			api.getRow({
				id:257,
                video_src:1
			}).then(res=>{
				const data = {
					src:res.data[0].img_url,
					video_src:res.data[0].video_src
				}
				render("guide_inner_tmp","guide_inner",data)
				resolve()
				const bgSrc = $(".guidePic").attr("data-bgUrl")
				$(".guidePic").css("background-image","url("+bgSrc+")");
			})
		})
		// 是否显示引导页
		const isShowGuide = ()=>{
			if (sessionStorage.getItem('HIDE_YINGER_INDEX_GUIDE')) {
				return;
			}else{
				var guide = $('#guide')
				guide.show();
				$("body").addClass("bodyso")

				var video = $(".guideVideo").find('video');
				if(video.attr("src") !== ''){
					if($(window).width()>991){
                        $(".guidePic").hide()
                        video.trigger("play")
					}
				}
				guide.on('click', function () {
					guide.slideUp(500)
					$("body").removeClass("bodyso");
					video.trigger("pause");
					sessionStorage.setItem('HIDE_YINGER_INDEX_GUIDE', 1);
				});
			}
		}


	const HeadvideoRender = ()=>
		new Promise(resolve => {
			api.getRow({
				id: 188,
				video_src: 1
			}).then(res=>{
				const data = {
					img_url:res.data[0].img_url,
					video_src:res.data[0].video_src
				}
				render("pv-item-tmp","pv-item",data)
				render("wv-item-tmp","wv-item",data)
				resolve()
			})


		})
	const secbannerRender = ()=>
		new Promise(resolve => {
			api.getRows(100).then(res=>{
				const data = {
					list:res.data.map(v=>v)
				}
				render("secbannerTmp","secbanner",data)
				resolve()
			})
		})
	const thirdVideoRender = ()=>
		new Promise(resolve => {
			api.getRows({
				categoryId: 98,
				video_src: 1,
				title_en:1
			}).then(res => {
				const data = {
					list:res.data.map(v=>v)
				}
				render("video-list-wrapper-tmp","video-list-wrapper",data)
				render("vbtnTmp","vbtn",data)
				resolve()
			})
		})
	const fourthTaoCanRender = ()=>
		new Promise(resolve => {
			api.getRow(189).then(res=>{
				const data = {
					title:res.data[0].title,
					content:res.data[0].content
				}
				render("taocanTmp","taocan",data);
				resolve()
			})
		})
	const newsTjRender = ()=>
		new Promise(resolve => {
			api.getRows({
				categoryId: 84,
				filter:"推荐",
				pageSize:3
			}).then(res=>{
				const data = {
					list:res.data.map(v=>v)
				}
				render("newsTjTmp","newsTj",data)
				resolve()
			})


		})



	// 回调
	/**
	 * @method scrollScreen 点击下一屏
	 */
	const nextPage = () => {
		$('.goDown-wrapper').on('click', function (e) {
			e.stopPropagation()
			$('html,body').stop(true, false).animate({
				scrollTop: $(".head-banner-wrapper").height()
			}, 500);
		})
	}
	// 自定义banner By wy 2018-8-8
	const HeadvideoHandle = ()=>{
		var
			pcBox = $("#pv-item"),
			wapBox = $("#wv-item"),
			player = $(".head-banner-wrapper>.playerbox"),
			playerVideo = player.find("video"),
			playerClose = player.find(".player-close");
		pcBox.on("play", "video", function() {
			$(this)
				.parents(".pv-inner")
				.addClass("playing");
		});
		pcBox.on("click", ".pv-inner", function() {
			var video = $(this).find("video"),
				paused = video[0].paused;
			video.trigger(paused ? "play" : "pause");
		});
		playerClose.on("click", function() {
			playerVideo.trigger("pause");
			player.removeClass("show");
			$("body").removeClass("bodyso")
		});
		wapBox.on("click", ".wv-inner", function() {
			var src = $(this).attr("data-mp4");
			player.addClass("show");
			playerVideo.attr("src", src).trigger("play");
			$("body").addClass("bodyso")

		});
		//滚到第二屏视频暂停
		$(window).on("scroll",function scrollhandle(){
			if($(window).height() <= $(window).scrollTop()){
				var video = document.getElementById("myVideo");
				video.pause()
			}
		})

	}
	const BannerHandle = ()=>{
		var timer;
		var c_index = 0;
		var WINDOW_WIDTH = $(window).width();
		$('.banner-wrapper>ul>li').eq(0).addClass("active")
		$('.icon-right').on('click',function(){

			var first = $('.banner-wrapper>ul>li').first();
			$('.banner-wrapper>ul').stop(false,true).animate({'margin-left':'-100%'},1000,function(){
				$(this).append(first).css({'margin-left':'0'})

			})
		})
		$('.icon-left').on('click',function(){

			var last = $('.banner-wrapper>ul>li').last();
			$('.banner-wrapper>ul').prepend(last).css('margin-left','-100%').stop(false,false).animate({'margin-left':'0'},1000,function(){

			});
		})
		$(".wap-dots>ul>li").on('click',function(){
			var dot_index = $(this).index();
			$('.banner-wrapper>ul>li').eq(dot_index).addClass("active").siblings().removeClass("active");
			$(".wap-dots>ul>li").eq(dot_index).addClass("active").siblings().removeClass("active");
			c_index = dot_index;
		})
		$(window).on('resize',function(){
			var WINDOW_WIDTH = $(window).width();
			var wid = $(".banner-wrapper").width();
			$('.banner-wrapper>ul>li').css({'width':1*wid+'px'})
			if(WINDOW_WIDTH <= 991){

				var imgHeight = $("#secbanner>li>.imgbox").height(),
					txtHeight = $("#secbanner>li>.textbox").height();
				console.log(imgHeight)
				$("#secbanner").css("height",imgHeight+txtHeight+'px')
				$(".wap-dots").css("top",(imgHeight*1)+"px")
			}
		})
		var wid = $(".banner-wrapper").width();
		$('.banner-wrapper>ul>li').css({'width':1*wid+'px'})
		if(WINDOW_WIDTH <= 991){
			var imgHeight = $("#secbanner>li>.imgbox").height(),
				txtHeight = $("#secbanner>li>.textbox").height();
			$("#secbanner").css("height",imgHeight+txtHeight+'px')
			$(".wap-dots").css("top",(imgHeight*1)+"px")
		}
		// // 定时轮播
		const timerHandle = ()=>{
			if(WINDOW_WIDTH<991){
				$('.banner-wrapper>ul>li').eq(c_index = ++c_index%5).addClass("active").siblings().removeClass("active");
				$(".wap-dots>ul>li").eq(c_index).addClass("active").siblings().removeClass("active");
			}
			else{
				var first = $('.banner-wrapper>ul>li').first();
				$('.banner-wrapper>ul').animate({'margin-left':'-100%'},1000,function(){
					$(this).append(first).css({'margin-left':'0'})
				})
			}
		}
		if(WINDOW_WIDTH<991){
			timer = setInterval(timerHandle,5000);
		}else{
			timer = setInterval(timerHandle,7000);
		}
		$(".btn").on("mouseover",function(){
			if(timer){
				timer = clearInterval(timer)
			}else{
				return;
			}
		})
		$(".btn").on("mouseout",function(){
			timer = setInterval(timerHandle,5000)
		})

	}
	const videoHandle = ()=>{
		var
			wapBox = $(".video-unit"),
			player = $(".playerbox"),
			playerVideo = player.find("video"),
			playerClose = player.find(".player-close");
		playerClose.on("click", function() {
			playerVideo.trigger("pause");
			player.removeClass("show");
			$("body").removeClass('bodyso');//开启滚动条
		});
		wapBox.on("click", function() {
			var src = $(this).attr("data-mp4");
			player.addClass("show");
			playerVideo.attr("src", src).trigger("play");
			$("body").addClass('bodyso');//关闭滚动条
		});
	}
	const videoBannerHandle = ()=>{
		$(".btnGroups ul li").on("click",function(){
			$(this).addClass("active").siblings("li").removeClass("active");
			var index = $(this).index();
			$(".video-unit").eq(index).fadeIn(1000).siblings("li").css("display","none");
		})
	}

//自定义动画 By wy 2018-8-9
	const animation = ()=>{
			function scrollHandleAnimation(target){
				var offsetTop = $(target).offset().top;
				if(offsetTop<= $(window).height()+$(document).scrollTop()){

					addAnimated(target)
				}
				$(window).on('scroll',function(){
					if(offsetTop<= $(window).height()+$(document).scrollTop()){

						addAnimated(target)
					}
				})
			}
			scrollHandleAnimation(".an1")
			scrollHandleAnimation(".an2")
			scrollHandleAnimation(".an3")
			scrollHandleAnimation(".an4")
			scrollHandleAnimation(".an5")
			scrollHandleAnimation(".an6")
			scrollHandleAnimation(".an7")
			scrollHandleAnimation(".an8")

		}
	;(async()=>{
		await guideVideoRender()
		await HeadvideoRender()
		await secbannerRender()
		await thirdVideoRender()
		await fourthTaoCanRender()
		await newsTjRender()
		loading.hide();
		$("#video-list-wrapper li").first().addClass("active");
		$("#vbtn li").first().addClass("active");
        isShowGuide()
		nextPage()
		HeadvideoHandle();
		BannerHandle();
		videoHandle();
		videoBannerHandle()
		animation()
	})()
});