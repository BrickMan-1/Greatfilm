import 'jquery'
import 'common'
import 'sass/layout.scss'
import '../api/api'
import {render} from "../api/render";

$(function () {
	const bgBoxRender = ()=>
		new Promise(resolve => {
			api.getRow(198).then(res=>{
				const data = {
					imgUrl:res.data[0].img_url
				}

				render("bgBoxTmp","bgBox",data);
				resolve();
			})
		})
	const videoRender = (cid)=>
		new Promise(resolve => {
			api.getRows({
				categoryId: cid,
				video_src: 1
			}).then(res => {

				const data = {
					list:res.data.map(v=>v)
				}
				console.log(data)
				render("video-list-wrapper-tmp","video-list-wrapper",data)
				resolve()
			})
		})

	// 回调
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
			wapBox.on("click", ".wv-inner", function() {
				var src = $(this).attr("data-mp4");
				player.addClass("show");
				playerVideo.attr("src", src).trigger("play");
				$("body").addClass('bodyso');//关闭滚动条
			});
		}
	const clickAsyncGetData = ()=>{
		$(".right ul li").on("click",function(){
			$(this).addClass("active").siblings("li").removeClass("active")
			const cid = $(this).attr("data-id");
			if(!cid){
				$("#video-list-wrapper").html("<li style='color:#fff;line-height: 100px;text-align: center'>抱歉,暂无数据</li>")
			}else{
				;(async()=>{
					await videoRender(cid)
					videoHandle();
				})()
			}
		})
	}
	clickAsyncGetData()
	;(async()=>{
		await bgBoxRender()
		await videoRender(90);
		videoHandle();
	})()
})