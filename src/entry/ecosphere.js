import 'jquery'
import 'common'
import 'sass/layout.scss'
import '../api/api'
import {render} from "../api/render";
import {addAnimated} from "../utils/utils";
$(function () {
	const headBanner = ()=>
		new Promise(resolve => {
			api.getRow(214).then(res=>{
				const data = {
					imgUrl:res.data[0].img_url
				}

				render("headbannerTmp","headbanner",data);
				resolve();
			})
		})
	const secondContent = ()=>
		new Promise(resolve => {
			api.getRow(180).then(res=>{
				const data = {
					imgUrl:res.data[0].img_url,
					content:res.data[0].content
				}

				render("secondContentTmp","secondContent",data);
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

			scrollHandleAnimation(".an2")
			scrollHandleAnimation(".an3")
		}
	;(async()=>{
		await headBanner()
		await secondContent()
		loading.hide();
		animation()
	})()
})