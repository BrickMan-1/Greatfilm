import 'jquery'
import 'common'
import 'sass/layout.scss'
import '../api/api'
import {render} from "../api/render";
import {addAnimated} from "../utils/utils";

$(function () {
	const bgBoxRender = (id)=>
		new Promise(resolve => {
			api.getRow(id).then(res=>{
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
				video_src: 1,
				filter:cid==59?"置顶":""
			}).then(res => {
				const data = {
					list:res.data.map(v=>v)
				}
				render("video-list-wrapper-tmp","video-list-wrapper",data);
				loading.hide();
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
	//截取id
	const getArticleId = () => {
		const param = window.location.href,
			reg = /^.*\?id=(\d+)/gi;
		try {return reg.exec(param)[1]}
		catch( err ) {
			return 59;
		};
	};
    //截取bgid
    const getBgImgId = () => {
        const param = window.location.href,
              reg = /^.*\&bg=(\d+)$/gi;
        try {return reg.exec(param)[1]}
        catch( err ) {
            return 198;
        };
    };

	const videoHandle = ()=>{
		var wapBox = $(".picbox"),
			player = $(".playerbox"),
			playerVideo = player.find("video"),
			playerClose = player.find(".player-close");

		    playerClose.on("click", function() {
			    playerVideo.trigger("pause");
			    player.removeClass("show");
			    $("body").removeClass('bodyso');//开启滚动条
                $(".header-wrapper").css("z-index",991)
		    });

		wapBox.on("click",function() {
			var src = $(this).parent(".wv-inner").attr("data-mp4");
			player.addClass("show");
			playerVideo.attr("src", src).trigger("play");
			$("body").addClass('bodyso');//关闭滚动条
			// 临时 控制层级
			$(".header-wrapper").css("z-index",0)
		});
	}

	const initActive = (cid)=>{
		$(".right ul li").each(function(i,e){
			let eid = $(e).attr("data-id");
			if(eid === cid){
				$(e).addClass("active").siblings("li").removeClass("active");
			}
		})
	}

	// 异步获取
	const clickAsyncGetData = ()=>{
		$(".right ul li").on("click",function(){
			$(this).addClass("active").siblings("li").removeClass("active");
			const id = $(this).attr("data-id"),
                  cid = $(this).attr("data-cid");
			(async()=>{
				await videoRender(id);
				await BannerIMG(cid);
				videoHandle();
				moreVideoCli()
			})()
		})
	}

	// 更多视频
	const moreVideoCli = ()=>{
		$(".morevideo").on("click",function(){
			const cid = $(this).attr("data-id");
			$(".right ul li").each(function(i,e){
				if($(e).attr("data-id")===cid){
					$(e).addClass("active").siblings("li").removeClass("active")
				}
			})
			videoRender(cid);
			videoHandle();
			(async()=>{
				await videoRender(cid);
				videoHandle();
			})()
		})
	}

	// 搜索
	const searchAsyncGetData = ()=>{
		$(".searchbox").on("mouseover",function(){
			$(this).addClass("active");
		})
		// $(".searchbox").on("mouseout",function(){
		// 	$(this).removeClass("active");
		// })
		$(".searchbox i").on("click",function(){//筛选数据
			var txt = $(this).siblings("input").val()
			$(".video-unit").filter(function(i,e){
				if($(e).find(".tit").text().indexOf(txt) !== -1){
					$(e).fadeIn(500);
				}else{
					$(e).fadeOut(500);
				}
			})
		})

		$(".searchbox").keyup(function(ev){//筛选数据
			var txt = $(this).siblings("input").val()
			if(ev.keyCode == 13){
				$(".video-unit").filter(function(i,e){
					if($(e).find(".tit").text().indexOf(txt) !== -1){
						$(e).fadeIn(500);
					}else{
						$(e).fadeOut(500);
					}
				})
			}
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
	}

	// Banner 更改图片
    const BannerIMG = (id)=>{
	    new Promise(resolve => {
	        api.getRow(id).then(res=>{
                $('.bgBox').find('.BannerImg').attr('src',''+res.data[0].img_url);
	            resolve();
	        })
	    })
    }


	;(async()=>{
		const id = getArticleId();
        const bgId = getBgImgId();
		await bgBoxRender(bgId);
		await videoRender(id);
		nextPage();
		initActive(id);
		searchAsyncGetData();
		clickAsyncGetData();
		moreVideoCli();
		videoHandle();
		animation();
	})();
})