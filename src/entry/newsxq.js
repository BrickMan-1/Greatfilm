import "jquery";
import "common";
import "sass/layout.scss";
import {
	render, renderBanner
} from "../api/render";

$(function () {
	/**
	 * 异步获取数据渲染页面
	 * @method renderContent  异步渲染content部分
	 */
	const bannerRender = () => {
		new Promise(resolve => {
			renderBanner(163, img => {
				$(img).appendTo(".content_header");
				resolve();
			});
		});
	}

	/**
	 * 异步获取数据渲染页面
	 * @method renderContent  异步渲染content部分
	 */
	const renderContent = articleId =>
		new Promise(resolve => {
			api.getRow(articleId).then(res => {
				const data = {
					list: res.data[0],
					content:res.data[0].content,
				};
				console.log(data)
				render("casexq_lists", "casexq_listbox", data);
				render("j-nav-tmp", "j-nav", data);
				resolve();
			});
		});


	/**
	 * 各个渲染成功后的回调方法
	 * @method getAricleId 获取文章id，用于后面的异步渲染
	 */
	const getArticleId = () => {
		const param = window.location.href,
			reg = /^.*\?id=(\d+)$/gi;
		return reg.exec(param)[1];
	};


	/**
	 * 将异步渲染代码和回调按顺序整合到一起
	 */
	(async () => {
		// await bannerRender();
		const articleId = getArticleId();
		await renderContent(articleId);
		loading.hide();
	})();
});
