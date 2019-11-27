import 'jquery'
import 'common'
import 'sass/layout.scss'
import '../api/api'
import {render} from "../api/render";
import {addAnimated} from "../utils/utils";

$(function () {
	const headBanner = ()=>
		new Promise(resolve => {
			api.getRow(205).then(res=>{
				const data = {
					imgUrl:res.data[0].img_url
				}

				render("headbannerTmp","headbanner",data);
				resolve();
			})
		})
	const secNavRender = ()=>
		new Promise(resolve => {
			api.getRows(73).then(res=>{
				const data = {
					list:res.data.map(v=>v)
				}
				render("mouse-ulTmp","mouse-ul",data)
				render("inner-ulTmp","inner-ul",data)
				// console.log(data)
				resolve()
			})
		})
	const mouseMoveHandle = ()=>{
			const ul = document.getElementById("mouse-ul");
			const bg = document.getElementById("mouse-bg");
			$(bg).css({
				"position":"absolute",
				"background-color":"#000",
				"left":"0",
				"width":"152px",
				"height":"28px",
				"transition":"left .3s ease"
			})
			ul.addEventListener("mousemove",function(ev){
				bg.style.width = ev.target.offsetWidth + 'px';
				bg.style.height = ev.target.offsetHeight + 'px';
				bg.style.left = ev.target.offsetLeft+"px";
				bg.style.top = ev.target.offsetTop+"px";
				$(ev.target).addClass("active").siblings("li").removeClass("active")
			},false)

		}
	// 自定义banner By wy 2018-8-8
	const BannerHandle = ()=>{
		var $leftEar = $('.leftEar');
		var $rightEar = $('.rightEar');
		var $bannerWrapper = $('.inner ul');
		// li的索引
		var _index = 0;
		var $dot = $('.right ul li');
		var $bannerUnit = $('.inner>ul>li');
		var len = $bannerUnit.length;
		const bg = document.getElementById("mouse-bg");
		var wid;
			wid = $(".info-wrapper .inner").width();
			 $('.inner ul li').css("width",wid+"px")
			console.log(wid)
		$(window).on("resize",function() {
			wid = $(".info-wrapper .inner").width();
			 $('.inner ul li').css("width",wid+"px")
		})
		$dot.eq(0).addClass('active');
		$rightEar.click(function(ev){

			$dot.eq(_index = ++_index % len).addClass('active').siblings('li').removeClass('active');
			bg.style.left = _index * 152 + "px";
			$bannerWrapper.stop(false,true).animate({'margin-left':-1*wid},'normal',function(){
				var first = $bannerWrapper.children().first();
				$bannerWrapper.append(first).css('margin-left',0);
			});
		})
		$leftEar.click(function(ev){

			$dot.eq(_index = --_index % len).addClass('active').siblings('li').removeClass('active');
			console.log(_index)
			if(_index<0){
				_index = 5
			}
			bg.style.left = _index * 152 + "px";
			var last = $bannerWrapper.children().last();
			$bannerWrapper.prepend(last).css('margin-left',-1*wid);
			$bannerWrapper.stop(false,false).animate({'margin-left':0},'normal');
		});
		// 点击的索引
		var dot_index = 0;
		$dot.click(function(ev){
			dot_index = $(this).index()-1;
			//	判断向上切换还是向下切换
			//	首先判断点击的按钮不等于当前索引
			if (dot_index !== _index) {
				if (dot_index > _index) {
					var $prev = $bannerUnit.eq(dot_index).prevAll().toArray().reverse();
					$bannerWrapper.stop(false,true).animate({'margin-left':-1*wid},'normal',function(){
						$bannerWrapper.append($prev).css('margin-left',0);
					});
					_index = dot_index;
					$(this).addClass('active').siblings().removeClass('active');
				} else {
					var last = $bannerUnit.eq(dot_index-1).nextAll().toArray();
					$bannerWrapper.prepend(last).css('margin-left',-1*wid);
					$bannerWrapper.stop(false,false).animate({'margin-left':0},'normal');
					_index = dot_index;
					$(this).addClass('active').siblings().removeClass('active');
				};
			} else {
				return;
			};
		})

			// // 定时轮播
			// var timer = setInterval(()=>{
			// 	var first = $('.swiper-wrapper .swiper-slide').first();
			// 	$('.swiper-wrapper').animate({'margin-left':'-100%'},500,function(){
			// 		$(this).append(first).css({'margin-left':'0'})
			// 	})
			// },5000)

			// })
		}
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
			scrollHandleAnimation(".3thAni")
		}
	//进入页面滚动到锚点处
	const scrollFindMaodian1 = ()=>{
			var url = window.location.toString();
			var id = url.split('#')[1];
			if (id) {
				console.log(id)
				var t = $('#' + id).offset().top;
				$(window).scrollTop(t);
			}else{

			}
		}
	;(async ()=>{
		await headBanner()
		await secNavRender()
		loading.hide();
		mouseMoveHandle()
		BannerHandle()
		scrollFindMaodian1()
		animation()
	})();
})