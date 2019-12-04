import 'jquery'
import 'common'
import 'sass/layout.scss'
import '../api/api'
import Map from '../lib/map/map'
import {render} from "../api/render";
import {addAnimated} from "../utils/utils";

$(function(){
	const headBanner = ()=>{
		new Promise(resolve => {
			api.getRow(192).then(res=>{
				const data = {
					imgUrl:res.data[0].img_url
				}
				render("headbannerTmp","headbanner",data);
				resolve();
			})
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
		}

	const MapFn = () => {
		var map = null,
			mapBox = $('.mapbox')

		// 手机端点击地图关闭按钮关闭地图
		$('.map-close').on('click', function () {
			mapBox.fadeOut();
		});

		// 初始化地图
		function initMap() {
			map = new Map('.map', {
				center: "114.075160,22.544400",
				zoom: 14,
				markIconSrc: './assets/image/map_marker.png',
				marker: {
					point: "114.075160,22.544400",
					tips: '',
					title: "",
					summary: "深圳GreatFilm大影视文化传媒",
					tel: "telephone : 18018732016"
				},
			});
		}
		initMap()
	}
	/**
	 * @method Form 表单提交
	 */
	const Form = ()=> {
			// 留言反馈
			var canSubmitClass = 'active';
			var nameBox = $('#username'),
				emailBox = $('#email'),
				contentBox = $('#msg'),
				btnSubmit = $('#submit'),
				alertBox = $('.fbalert'),
				closer = alertBox.find('.closer'),
				icon = alertBox.find('img'),
				title = alertBox.find('h1'),
				second = alertBox.find('span'),
				autoCounter = alertBox.find('.autocounter'),
				btnOk = alertBox.find('.btn-ok'),
				counter = 3,
				timer = null,
				alert = [
					{
						src: './assets/image/icons/icon_ok.png',
						alt: 'ok',
						title: '发送成功，感谢您的留言！'
					},
					{
						src: './assets/image/icons/icon_fail.png',
						alt: 'fail',
						title: '发送失败，请稍后再试！'
					},
					{
						src: './assets/image/icons/icon_warn.png',
						alt: 'warn',
						title: '请输入正确的邮箱地址！'
					},
					{
						src: './assets/image/icons/icon_warn.png',
						alt: 'warn',
						title: '不能为空!'
					},
					{
						src: './assets/image/icons/icon_warn.png',
						alt: 'warn',
						title: '请输入正确的手机/座机号码！'
					},
				];

			// 输入框符合条件即可提交反馈
			nameBox.add(emailBox).add(contentBox).on('input', function () {
				var name = nameBox.val().trim(),
					email = emailBox.val().trim(),
					content = contentBox.val().trim();
				if (name && isEmail(email) && content) {
					btnSubmit.addClass(canSubmitClass);
				} else {
					btnSubmit.removeClass(canSubmitClass);
				}
			});

			// 检测邮件格式
			emailBox.on('blur', function () {
				if (this.value && !isEmail(this.value)) {
					showAlert(2, 1);
				}
			});

			// 提交
			btnSubmit.on('click', function () {
				var name = nameBox.val().trim(),
					email = emailBox.val().trim(),
					content = contentBox.val().trim(),
					canSubmit = $(this).hasClass(canSubmitClass);
				if (!name) {
					showAlert(3, 1, '姓名');
					return;
				}
				if (!email) {
					showAlert(3, 1, '邮箱');
					return;
				}
				if (!isEmail(email)) {
					showAlert(2, 1);
					return;
				}
				if (!content) {
					showAlert(3, 1, '留言内容');
					return;
				}
				if (!canSubmit) {
					return;
				}
				api.postMsg({
					txtName: name,
					txtEmail: email,
					content: content
				}).then(function(response){
					var index = response.status == 1 ? 0 : 1;
					nameBox.add(emailBox).add(contentBox).val('');
					btnSubmit.removeClass(canSubmitClass);
					second.html(3);
					showAlert(index, 0);
					clearInterval(timer);
					timer = setInterval(autoClose, 1000);
				});
			});

			// 关闭弹出层
			btnOk.add(closer).on('click', function () {
				alertBox.fadeOut(300);
			});

			// alert
			function showAlert(index, showBtn, tit) {
				icon.attr({
					src: alert[index].src,
					alt: alert[index].alt
				});
				title.html((tit || '') + alert[index].title);
				if (showBtn) {
					autoCounter.hide();
					btnOk.show();
				} else {
					autoCounter.show();
					btnOk.hide();
				}
				alertBox.fadeIn(300);
			}

			// 自动计时
			function autoClose() {
				if (counter < 0) {
					alertBox.fadeOut(300);
					clearInterval(timer);
					counter = 3;
				} else {
					second.html(counter);
					counter--;
				}
			}

			// 检测邮箱格式
			function isEmail(email) {
				return /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g.test(email);
			}

			// 检测手机号码
			function isCellPhone(str) {
				return /^1[34578]\d{9}$/.test(str);
			}

			// 检测固定电话
			// 支持以下格式：
			// 0755-33189588;
			// 0755 - 33189588;
			// (0755)33189588;
			// (0755) 33189588;
			// 0755 33189588
			function isTelephone(str) {
				return /^(\(0\d{2,3}\)\s*|0\d{2,3}\s*-\s*|0\d{2,3}\s+)\d{7,14}$/.test(str);
			}

			function isContact(str) {
				return isCellPhone(str) || isTelephone(str);
			}

		}

	;(async()=>{
		await headBanner();
		MapFn();
		Form();
		animation();
		loading.hide();
	})();
})



