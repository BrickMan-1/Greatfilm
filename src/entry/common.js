import API from "../api/api"; //引入api设置
import {
    seoRender,
    addCDN,
    loadFooter,
    loadHeader,
    loadLoading
} from "../api/render"; //异步数据渲染方法库
import {rootDir} from "../../config/config";
import {isEmail} from "../utils/utils";
import "../utils/tesla"

/**
 * 全局对象，这里我设置了api和loading对象，因为每个页面都需要异步请求和loading控制，
 * 如果给window对象扩展别的方法请一定三思，全局变量污染不利于后期维护和功能扩展，尽量不要讲方法挂载在window对象上
 * @type {object} api     初始化api对象，如：api.getRow(id).then(res => (render()))
 * @type {object} loading loading控制loading的隐藏，一般我再加载完banner图后隐藏，也可以在其他合适的时候隐藏
 * @see [注意] 下面用到的{...}花括号可以用来形成一个块级作用域，
 * 避免全局变量污染，这里我用来区分代码功能，让代码更易读，可维护
 */
{
    window.api = new API({
        rootdir: rootDir,
        fixPath: ['img_url', 'big_img', 'video_src','original_path'],
    });

    window.loading = {
        show: function () {},
        hide: function () {
            setTimeout(function () {
                $('.m-loading').hide();
            },1000)
        }
    };
}

$(function () {
    /**
     * 通用项，每个项目基本都要这三个方法
     * @method seoRender    seo渲染
     * @method addCDN       添加阿里图标cdn到head标签里，项目都用的阿里图标库
     * @method loadLoading  不管哪个页面都想加载loading,然后在必要的时候hide
     * @method loading.show 禁止屏幕滚动 不过可惜只对PC端有效...
     */
    {
        loadLoading(".m-loading", "./default/loading/loading.html");
        seoRender();
        addCDN();
    }

    /**
     * 头部加载相关代码
     * @method     headHanlde               头部js
     * @method     a_target_attr_handle     控制a标签的target属性
     * @method     a_link_href setmeal      页面三个套餐跳转
     * @method     wapHeaderHandle          wap头部js
     */
    {
        const headHanlde = ()=> {
            const param = window.location.href;
            const url = param.match(/(\w+)\.htm/);
            if (url === null) {//根目录
                // logo
                // $(".header-wrapper .logoBox img").attr("src","./assets/image/logo.png")
                $(".header-wrapper .logoBox .icon-logo").css("color", "#fff")
                // 头部颜色
                $(".header-wrapper").addClass("index");

                //导航栏active状态
                $(".nav-wrapper ul li a.index").addClass("active")
            } else {//非根目录 logo黑色
                const urlName = url[1].replace(/[^a-z]+/ig, "");
                if (urlName === 'index' || urlName === 'works' || urlName === 'setmeal') {
                    $(".g-content").css("padding-top", "0")
                    // logo
                    // $(".header-wrapper .logoBox img").attr("src","./assets/image/logo.png")
                    $(".header-wrapper .logoBox .icon-logo").css("color", "#fff")
                    // 头部颜色
                    $(".header-wrapper").addClass("index");
                } else {
                    // $(".header-wrapper .logoBox img").attr("src","./assets/image/logo1.jpg")
                    $(".header-wrapper .logoBox .icon-logo").css("color", "#000")
                }
                $(".nav-wrapper ul li a").addClass("active")
                $(".nav-wrapper ul li a").not("." + urlName).removeClass("active");
            }


            // 滚轮事件控制头部状态

            $(window).on("scroll", function () {
                if ($(window).scrollTop() > 120) {
                    $(".header-wrapper").addClass("active")
                    // $(".header-wrapper.active .logoBox img").attr("src","./assets/image/logo1.jpg")
                    $(".header-wrapper .logoBox .icon-logo").css("color", "#000")
                } else {
                    $(".header-wrapper").removeClass("active")
                    // $(".header-wrapper.index .logoBox img").attr("src","./assets/image/logo.png")
                    const urlName = url[1].replace(/[^a-z]+/ig, "");
                    if (urlName === 'index' || urlName === 'works' || urlName === 'setmeal') {
                        $(".header-wrapper .logoBox .icon-logo").css("color", "#fff")
                    } else {
                        $(".header-wrapper .logoBox .icon-logo").css("color", "#000")
                    }
                }

            })

        }

        const a_target_attr_handle = ()=> {
            if ($(window).width() <= 768) {
                $('.news_a').attr("target", "_self")
            }
            $(window).on("resize", function () {
                if ($(window).width() <= 768) {
                    $('.news_a').attr("target", "_self")
                } else {
                    $('.news_a').attr("target", "_blank")
                }
            })
        }

        const a_link_href = ()=> {
            $("#setmeal_ul>li").eq(0).on("click", function () {
                window.location.href = "setmeal.html#666";
            })
            $("#setmeal_ul>li").eq(1).on("click", function () {
                window.location.href = "setmeal1.html#666";
            })
            $("#setmeal_ul>li").eq(2).on("click", function () {
                window.location.href = "setmeal2.html#666";
            })
        }

        const wapHeaderHandle = ()=> {
            $(".button").on("click", function () {
                $(this).toggleClass("active");
                $(".first-level").fadeToggle(500)
            })
            $(".first-level>ul>li").on("click", function () {
                $(this).toggleClass("active").siblings("li:not(:first-child)").removeClass("active");
                $(this).find(".second-level ul").slideToggle(500);
                $(this).siblings("li").find(".second-level ul").slideUp(500);
            })

            const param = window.location.href;
            const url = param.match(/(\w+)\.htm/);
            const urlName = url[1].replace(/[^a-z]+/ig, "");
            // 手机端当前状态
            $(".first-level>ul>li").each(function () {
                var liname = $(this).attr("name");
                if (liname == urlName) {
                    $(this).toggleClass("active").siblings("li:not(:first-child)").removeClass("active");

                    $(this).find(".second-level ul").css("display", "block");

                }
            })

        }

        /**
         * 将异步渲染代码和回调按顺序结合到一起，顺序很重要！！！先做什么再做什么想清楚！！！
         */
        (async () => {
            await loadHeader(".j-g-header", "./default/header/header.html");
            headHanlde();
            a_target_attr_handle();
            a_link_href();
            wapHeaderHandle();
        })();
    }

    /**
     * 尾部加载相关代码
     * @method    initForm        底部表单验证及提交
     * @method    updateYear      更新年份
     * @method    Totop           返回顶部
     */
    {

        const initForm = () => {
            var canSubmitClass = 'active';
            var nameBox = $('.name'),
                emailBox = $('.email'),
                contentBox = $('.Mag'),
                btnSubmit = $('.btnSubmit'),
                alertBox = $('#fbalert'),
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
                        src: '../../assets/image/icons/icon_ok.png',
                        alt: 'ok',
                        title: '发送成功，感谢您的留言  ！'
                    },
                    {
                        src: '../../assets/image/icons/icon_fail.png',
                        alt: 'fail',
                        title: '发送失败，请稍后再试  ！'
                    },
                    {
                        src: '../../assets/image/icons/icon_warn.png',
                        alt: 'warn',
                        title: '请输入正确的手机号码  ！'
                    },
                    {
                        src: '../../assets/image/icons/icon_warn.png',
                        alt: 'warn',
                        title: '不能为空  !'
                    },
                    {
                        src: '../../assets/image/icons/icon_warn.png',
                        alt: 'warn',
                        title: '请输入正确的邮箱地址！'
                    },
                ];
            console.log(nameBox)

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

            // 提交
            btnSubmit.on('click', function () {
                console.log(11)
                var name = nameBox.val().trim(),
                    email = emailBox.val().trim(),
                    // tel = telBox.val().trim(),
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
                    showAlert(4, 1);
                    return;
                }
                // if (!tel) {
                //     showAlert(3, 1, '电话');
                //     return;
                // }
                // if (!isContact(tel)) {
                //     showAlert(2, 1);
                //     return;
                // }
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
        }

        const updateYear = () => {
            const time = new Date(),
                year = time.getFullYear();
            $(".j-time").html(year);
        };

        const Totop=()=>{
            const toTop = $('.back2top');
            let time = null;
            let isTop = null;
            $(window).on('scroll', function () {
                $(document).scrollTop() > ($(window).height() / 2) ? toTop.fadeIn() : toTop.fadeOut();
            });
            toTop.on('click',function () {
                $("html,body").animate({scrollTop:0}, 500);
            });
        }
        /**
         * 将异步渲染代码和回调按顺序结合到一起，顺序很重要！！！先做什么再做什么想清楚！！！
         */
        (async () => {
            await loadFooter(".j-g-footer", "./default/footer/footer.html");
            initForm();
            Totop();
            updateYear();
        })();
    }

    /**
     * 项目展示 通用功能
     * */

});

