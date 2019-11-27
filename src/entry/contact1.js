import 'jquery'
import 'common'
import 'sass/layout.scss'
import '../api/api'
import '../plugs/fsgallery/fsgallery'
import {render} from "../api/render";
import {addAnimated} from "../utils/utils";

$(function () {
	const galleryRender = ()=>
		new Promise(resolve => {
			api.getRows(71).then(res=>{
				const data = {
					list:res.data.map(v=>v)
				}
				console.log(data)
				render("galleryTmp","gallery",data)
				resolve()
			})
		})
	const initFsgallery = ()=>{
			$('#gallery img').fsgallery();
			$(".imgbox").on("click",function(){
				$("body").addClass("bodyso");
			})
	}
	const addAniDelayCss = ()=>{
		$(".grid-item").each(function(i,e){
			$(e).css("animation-delay","0."+(i+1)+"s");
			if(i>=9){
				$(e).css("animation-delay",("0."+(i+1))*10+"s");
			}
			//以下情况基本不会发生。。。
			if(i>=99){
				$(e).css("animation-delay",("0."+(i+1))*100+"s");
			}
		})
	}
	const wapAlertBoxHandle = ()=>{
		var $wapImgBoxBtn = $(".grid-item>.imgbox");
		var $alertBox = $(".wapAlertBox");
		var $closeBtn = $alertBox.find(".close");
		var $img = $alertBox.children('.content').find("img");
		var $p = $alertBox.children('.content').children(".imgbox").find("p");
		var $desc = $alertBox.children('.content').find(".desc");
		$wapImgBoxBtn.on("click",function(){
			var wid = $(window).width();
			if(wid<991){
				// alert("ok")
				$alertBox.fadeIn(500);
				// 渲染弹出盒子的内容
                var imgSrc = $(this).find("img").attr("src");
                var title = $(this).find("img").attr("title");
                var desc = $(this).find("img").attr("alt");
                $img.attr("src",imgSrc)
                $p.html(title)
                $desc.html(desc)
			}
		})
		$(window).on("resize",function(){
            var wid = $(window).width();
            if(wid>991){
                $alertBox.fadeOut(500);
			}
		})
        $closeBtn.on("click",function(){
            $alertBox.fadeOut(500);
            $("body").removeClass("bodyso");
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
	}
	;(async()=>{
		await galleryRender()
		loading.hide();
		initFsgallery()
		addAniDelayCss()
        wapAlertBoxHandle()
		animation()
	})();
})