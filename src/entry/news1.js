import "jquery";
import "common";
import "sass/layout.scss";
import "../plugs/scrollreveal/scrollreveal.min"
import "../plugs/async_v201711171014"
import '../plugs/tesla'
import {render} from "../api/render";
import {addAnimated} from "../utils/utils";

$(function(){
	const secBarRender = ()=>
		new Promise(resolve => {
			api.getSubmenu(87).then(res=>{
				const data = {
					list:res.data.map(v=>v)
				}
				// console.log(data)
				render("secBar-tmp","secBar",data)
				resolve();
			})
		})
	const infoListRender = ()=>
		new Promise(resolve => {
			api.getRows({
				categoryId:83,
				title_en:1
			}).then(res=>{
				const data = {
					list:res.data.map(v=>v)
				}
				render("selfMediaTmp","selfMedia",data)
				resolve()
			})
		})
	const addActive = ()=>{
		// @method 截取路由参数id
		const getArticleId = () => {
			const param = window.location.href,
				reg = /^.*\?id=(\d+)$/gi;
			try {return reg.exec(param)[1]}
			catch( err ) {
				return 89
			};
		};
		let id = getArticleId();
		// 根据id判断选项卡active
		console.log(id)
		$('.secItem').addClass('active');
		$('.secItem').not('.id'+id).removeClass('active');
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
		await secBarRender();
		await infoListRender()
		loading.hide();
		addActive();
		animation();
	})()
})





