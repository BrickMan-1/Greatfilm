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
			api.getRows(74).then(res=>{
				const data = {
					list:res.data.map(v=>v)
				}
				render("mouse-ulTmp","mouse-ul",data)
				render("banner-innerTmp","banner-inner",data)
				$(".right>ul>li").eq(0).addClass("active")
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
			"width":"82px",
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

	const bannerHandle = ()=>{
		let wid = $(".banner-wrapper").width()
			$(".banner-inner>li").css("width",wid);
		$(window).on("resize",function(){
			let wid = $(".banner-wrapper").width()
			$(".banner-inner>li").css("width",wid);
		})
		$("#mouse-ul li").on("click",function(){
			let index = $(this).index();
			$(".banner-inner").animate({"margin-left":-1*(index-1)*wid+"px"});

		})
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
			scrollHandleAnimation(".an5")
			scrollHandleAnimation(".an6")
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
		bannerHandle()
		scrollFindMaodian1()
		animation()
	})();
})