import 'jquery'
import 'common'
import 'sass/layout.scss'
import '../api/api'
import {render} from "../api/render";
import {addAnimated} from "../utils/utils";

$(function () {
	const headBanner = ()=>
		new Promise(resolve => {
			api.getRow(211).then(res=>{
				const data = {
					imgUrl:res.data[0].img_url
				}

				render("headbannerTmp","headbanner",data);
				resolve();
			})
		})
	const secondContent = ()=>
		new Promise(resolve => {
			api.getRow(179).then(res=>{
				const data = {
					content:res.data[0].content
				}

				render("second-contentTmp","second-content",data);
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
		}
	;(async()=>{
		await headBanner()
		await secondContent()
		loading.hide();
		animation()
	})()
})