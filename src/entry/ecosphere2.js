import 'jquery'
import 'common'
import 'sass/layout.scss'
import '../api/api'
import {render} from "../api/render";
import {addAnimated} from "../utils/utils";

$(function () {
	const headBanner = ()=>
		new Promise(resolve => {
			api.getRow(212).then(res=>{
				const data = {
					imgUrl:res.data[0].img_url
				}

				render("headbannerTmp","headbanner",data);
				resolve();
			})
		})
	const secondContent = ()=>
		new Promise(resolve => {
			api.getRow({
				id:191,
				big_img:1,
				content2:1
			}).then(res=>{
				const data = {
					imgUrl:res.data[0].img_url,
					content:res.data[0].content,
					content2:unescape(res.data[0].content2),
					bigImg:res.data[0].big_img
				}
				render("secondContentTmp","secondContent",data);
				render("third-contentTmp","third-content",data)
				resolve();
			})
		})
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
		}
	;(async()=>{
		await headBanner()
		await secondContent()
		loading.hide();
		animation()
	})()
})