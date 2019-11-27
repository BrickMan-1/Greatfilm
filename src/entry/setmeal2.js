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
	const rightInfoRender = ()=>
		new Promise(resolve => {
			api.getRow(227).then(res=>{
				const data = {
					content:res.data[0].content
				}
				render("right-infolistTmp","right-infolist",data)
				resolve()

			})
		})
	const leftShowRender = ()=>{
		const checkli = $(".right-infolist>ul>li ul li");
		const checkItem = $(".right-infolist>ul>li ul li input");
		const model = $(".model");
		let shopNum = 0;//购物车数字
		function clickRender(index){
			model.eq(index).html("");
			// 对哪一个栏目下面的li循环
			// console.log('==='+ index)
			$(".right-infolist>ul>li").eq(index).find("li").each(function(i,e){
				if($(e).children("input").is(":checked")){
					if(model.eq(index).text()===""){
						model.eq(index).append($(e).children('span').text());
					}else{
						model.eq(index).append("、"+$(e).children('span').text());
					}
				}
			})
			const txtArr = model.text().split("（");
			// console.log(txtArr)
			shopNum= txtArr.length-1;
			$("#shopListBtn").find("span").text(shopNum);
			let totalNum = [];
			let count = 0;
			txtArr.forEach(function(e,i){
				if(e.indexOf("/") !== -1){
					const eArr = e.split("/");
					totalNum.push(eArr[0]);
				}
			})

			totalNum.forEach((e,i)=>{
				count += e*1;
			})

			$(".totalPrice span").text(count)
		}
		// problem:通过input选取的，点击li无法取消选择，点击li对input的checked失去影响。
		//input的checked属性原本未显示在标签内，无论是否checked，该状态都不显示，这里给添加
		// checked的值显示出来了，问题可能出自这里。
		checkli.on("click",function(e){
			e.stopPropagation();
			if($(this).children("input").is(":checked")){
				$(this).children("input").removeAttr("checked")
			}else{
				$(this).children("input").attr("checked","checked");
			}
			var index = $(this).parent().parent("li").index();
			clickRender(index);

		})
		checkItem.on("change",function(){
			// 栏目索引
			let index = $(this).parent().parent().parent("li").index();
			clickRender(index);
		})
	}

	const shopCarDis = ()=>{
		$(window).on("scroll",function(){
			var $offsetTop = $(".right-infolist>.tit").offset().top;
			var $scrollTop = $(window).scrollTop();
			var $innerHeight = $(window).height();
			if( $offsetTop <= $scrollTop){
				$("#shopListBtn").fadeIn(500);
			}else{
				$("#shopListBtn").fadeOut(500);
			}
		})

	}

	const runShopCarDis = ()=>{
		if($(window).width()<991){
			shopCarDis()
		}
		$(window).on("resize",function(){
			if($(window).width()<991){
				shopCarDis()
			}else{
				$("#shopListBtn").fadeOut(500);
			}
		})
	}

	const shopCarCli = ()=>{
		$("#shopListBtn").on("click",function(){
			$(".info-wrapper .left-wrapper").addClass("active");
			$("body").addClass("bodyso");
			$(".returnBtn").css("display","block")
			$(".fixed-top").css('position',"static")
            $(".back2top").css('position',"static")
            $(".input-cnt").css('position',"static")
		})
		$(".returnBtn").on("click",function(){
            $(".info-wrapper .left-wrapper").removeClass("active");
            $("body").removeClass("bodyso");
            $(".returnBtn").css("display","none")
            $(".fixed-top").css('position',"fixed")
            $(".back2top").css('position',"fixed")
            $(".input-cnt").css('position',"relative")
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
			scrollHandleAnimation(".an7")
			scrollHandleAnimation(".an8")
			scrollHandleAnimation(".an9")
			scrollHandleAnimation(".an10")
			scrollHandleAnimation(".an11")
			scrollHandleAnimation(".an12")
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
	;(async()=>{
		await headBanner()
		await rightInfoRender()
		loading.hide();
		leftShowRender();
		runShopCarDis();
		shopCarCli();
		scrollFindMaodian1()
		animation()
	})()
})