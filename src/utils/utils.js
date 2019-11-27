/**
 * 辅助函数库
 * @author rmchen
 * @version 1.0
 * Created: 18-06-25
 */

/**
 * 动态给元素添加animated库的动画效果
 * @param {string} element 操作的节点
 */
export const addAnimated = element => {
    const animated = $(element)[0].dataset.animated;
    $(element).addClass(animated);
};

/**
 * 屏幕的各种高度集合，如果有新的关于高度需求都可以整合到这个函数里面来
 * @example calcHeight().seeHeight()
 * @returns {object} [seeHeight]  可见区域高度 
 * @returns {object} [scrollTop]  滚动条距离顶部高度
 * @returns {object} [bodyHeight] 网页正文全文高
 * @link https: //i.jakeyu.top/2016/09/04/scrollTop-offsetTop-scrollLeft-offsetLeft/
 */
export const calcHeight = () => {
    const
        seeHeight = () => (document.documentElement.clientHeight),
        scrollTop = () => (document.documentElement.scrollTop || document.body.scrollTop),
        bodyHeight = () => (document.body.scrollHeight)

    return {
        seeHeight: seeHeight, //可见区域高度
        scrollTop: scrollTop, //滚动条距离顶部高度
        bodyHeight: bodyHeight //滚动条距离顶部高度
    }
}
/**
 * 将string转为DOM元素
 * @param   {string} text 需要转化的字符串
 * @returns {dom}  
 */
export const parseStringToHTML = text => {
    let
        i,
        a = document.createElement("div"),
        b = document.createDocumentFragment();

    a.innerHTML = text;
    while (i = a.firstChild) b.appendChild(i);
    return b;
}

/**
 * 得到网页地址的id查询字段
 * @param {string} id location的id
 */
export const getHrefId = () => {
    const
        param = window.location.href,
        reg = /^.*\?id=(\d+)$/ig;

    return reg.exec(param)[1]
}

/**
 * 禁用鼠标滚轮操作
 */
export const disabledMouseWheel = () => {
    if (document.addEventListener) {
        document.addEventListener('DOMMouseScroll', scrollFunc, false);
    } //W3C
    window.onmousewheel = document.onmousewheel = scrollFunc; //IE/Opera/Chrome

    function scrollFunc(evt) {
        evt = evt || window.event;
        if (evt.preventDefault) {
            // Firefox
            evt.preventDefault();
            evt.stopPropagation();
        } else {
            // IE
            evt.cancelBubble = true;
            evt.returnValue = false;
        }
        return false;
    }
}

/**
 * 允许鼠标滚轮操作
 */
export const enabledMouseWheel = () => {
    window.onmousewheel = document.onmousewheel = null
}

/**
 * lazyAppend 页面滚动到底部时加载更多数据
 * @example 
 * lazyAppend({
     array: imgList,         [必选]处理的数据
     tmpID: 'j-imgList-tmp', [必选]模板ID
     domID: 'j-imgList',     [必选]渲染domID
     n: 3,                   [可选]预设为3个一组得加载
     offset: 300,            [可选]预设为距离底部300px
     fn: () => {}            [可选]一般用来处理加载动画之类
 })
 * @param {object} options 参数对象
 */
export const lazyAppend = (options) => {
    const initOption = Object.assign({
        array: [],
        tmpID: '',
        domID: '',
        n: 3,
        offset: 300,
        fn: null
    }, options)

    let count = 0,
        imgs = groupByNum(initOption.array, initOption.n)

    const render = () => {
        const seeHeight = calcHeight().seeHeight();
        const scrollTop = calcHeight().scrollTop();
        const bodyHeight = calcHeight().bodyHeight();

        if (seeHeight + scrollTop >= bodyHeight - initOption.offset) {
            const data = {
                list: imgs[count]
            }

            const html = parseStringToHTML(template(initOption.tmpID, data));
            document.getElementById(initOption.domID).appendChild(html)
            count++;
            initOption.fn && initOption.fn(imgs,count)
        }
    }

    window.addEventListener('scroll', throttle(render, 100))
}

/**
 * lazyLoadImg 页面滚动到图片位置时再加载图片
 * @example  html:<img src='占位图路径' data-src=‘最终图的路径’ class='lazy animated' data-animated="zoomIn" alt="img">
 * @example js: lazyLoadImg([parent,delay]) 
 * @param {string}  parent [可选]非static定位的父元素节点，如果有的话
 * @param {number}  delay  [可选]懒加载延迟时间,默认0.5s
 * @see 这里有个坑点，img元素的offsetTop是相对非static定位的第一个父元素，
 * 比如我img元素的父元素是relation定位，那这里offsetTop的就应该改为父元素的值，
 * 所以我将这个函数改为可配置的形式，以便应对这两种情况
 * 如果对各种高度不清楚请先看下面的链接
 * @link https://i.jakeyu.top/2016/09/04/scrollTop-offsetTop-scrollLeft-offsetLeft/
 */
export const lazyLoadImg = (parent, delay = 500) => {
    const imgArr = document.getElementsByClassName("lazy");

    function lazyLoad() {
        const seeHeight = calcHeight().seeHeight();
        const scrollTop = calcHeight().scrollTop();

        Array.from(imgArr).forEach(img => {
            let offsetTop;
            !!parent
                ?
                (offsetTop = $(img).parents(parent)[0].offsetTop) :
                (offsetTop = img.offsetTop); //[!!!图片距离document顶部的距离,注意此处的offsetTop]

            if (offsetTop < seeHeight + scrollTop) {
                img.src = img.getAttribute("data-src");
                addAnimated($(img)[0]);
            }
        });
    }

    window.addEventListener("scroll", throttle(lazyLoad, delay));
};

/**
 * lazyAnimation 类似上面图片懒加载，但这里没有请求加载，只是延迟动画执行，所以我命名为lazyAnimation
 * @example  html:<div class='lazyEle animated' data-animated="zoomIn"></div>
 * @example  js: lazyAnimation([fn,offset,parent,delay])
 * @param {func}    fn     [可选] 执行动画前的回调，一般这个fn为$(ele).css({  visibility: "hidden" }),可以参考下我的实际代码
 * @param {number}  offset [可选] 距离window底部多少距离时执行动画，默认为0
 * @param {string}  parent [可选] 非static定位的父元素节点,如果有的话
 * @param {number}  delay  [可选] 懒加载延迟时间,默认0.1s
 * @see 需要给元素添加lazyEle类名
 * 如果对各种高度不清楚请先看下面的链接
 * @link https://i.jakeyu.top/2016/09/04/scrollTop-offsetTop-scrollLeft-offsetLeft/
 */
export const lazyAnimation = (fn, offset = 0, parent, delay = 100) => {
    const num = document.getElementsByClassName("lazyEle").length,
        eleArr = document.getElementsByClassName("lazyEle");

    function lazyLoad() {
        const seeHeight = document.documentElement.clientHeight; //可见区域高度
        const scrollTop =
            document.documentElement.scrollTop || document.body.scrollTop; //滚动条距离顶部高度

        Array.from(eleArr).forEach(ele => {
            let offsetTop;
            !!parent
                ?
                (offsetTop = $(ele).parents(parent)[0].offsetTop) :
                (offsetTop = ele.offsetTop); //[!!!图片距离document顶部的距离,注意此处的offsetTop]

            if (offsetTop < seeHeight + scrollTop - offset) {
                fn && fn();
                addAnimated($(ele)[0]);
            }
        });
    }

    window.addEventListener("scroll", throttle(lazyLoad, delay));
};

/**
 * @example groupByNum([1,2,3,4,5,6,7],3) return [[1,2,3],[4,5,6],[7]]
 * @param {array} array 操作的数组
 * @param {number} num  按多少个一组重组数组
 * @returns [array]
 */
export const groupByNum = (array, num) => {
    let newArr = [];

    (function a() {
        if (array.length > num) {
            newArr.push(array.splice(0, num));
            a();
        } else {
            newArr = [...newArr, [...array]];
        }
    })();

    return newArr;
};

/**
 * 字符串填充函数
 * @example padStr('13155556666',[3,7],'-',inputEle) return '131-5555-6666'
 * @param {string} value         目标字符串
 * @param {array}  position      需要填充的位置
 * @param {string} padstr        填充字符串
 * @param {string} inputElement  节点
 * @returns {string}
 */
export const padStr = (value, position, padstr, inputElement) => {
    position.forEach((item, index) => {
        if (value.length > item + index) {
            value =
                value.substring(0, item + index) +
                padstr +
                value.substring(item + index);
        }
    });
    value = value.trim();
    // 解决安卓部分浏览器插入空格后光标错位问题
    requestAnimationFrame(() => {
        inputElement.setSelectionRange(value.length, value.length);
    });
    return value;
};

/**
 * 检测邮箱格式
 * @param {string} email 邮箱
 * @returns {boolean}
 */
export const isEmail = email => {
    return /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g.test(
        email
    );
};

/**
 * 检测手机号码
 * @param {string} str 手机号码
 * @returns {boolean}
 */
export const isCellPhone = str => {
    return /^1[34578]\d{9}$/.test(str);
};

/**
 * 检测座机号码
 * @param {string} str 座机号码
 * @returns {boolean}
 */
export const isTelephone = str => {
    return /^(\(0\d{2,3}\)\s*|0\d{2,3}\s*-\s*|0\d{2,3}\s+)\d{7,14}$/.test(str);
};

/**
 * 联合检测检测座机号码和手机号码
 * @param {string} str 号码
 * @returns {boolean}
 */
export const isContact = str => {
    return isCellPhone(str) || isTelephone(str);
};

/**
 * 检测密码强度
 * @param {string} str     传入检测的文本
 * @returns {number} nowLv 返回一个数值
 */
export const checkPwd = str => {
    let nowLv = 0;

    if (str.length < 6) {
        return nowLv;
    }
    if (/[0-9]/.test(str)) {
        nowLv++;
    }
    if (/[a-z]/.test(str)) {
        nowLv++;
    }
    if (/[A-Z]/.test(str)) {
        nowLv++;
    }
    if (/[\.|-|_]/.test(str)) {
        nowLv++;
    }
    return nowLv;
};

/**
 * 手机类型判断
 * @param {string} type       手机类型
 * @returns {boolean} boolean 返回true||false
 */
export const browserInfo = type => {
    switch (type) {
        case "android":
            return navigator.userAgent.toLowerCase().indexOf("android") !== -1;
        case "iphone":
            return navigator.userAgent.toLowerCase().indexOf("iphone") !== -1;
        case "ipad":
            return navigator.userAgent.toLowerCase().indexOf("ipad") !== -1;
        case "weixin":
            return navigator.userAgent.toLowerCase().indexOf("micromessenger") !== -1;
        default:
            return navigator.userAgent.toLowerCase();
    }
};

/**
 * 节流函数，resize,scroll情况下不需要频繁调用函数,使用节流定时执行一次
 * 场景：图片懒加载以及一些更屏幕缩放相关的插件处理等等
 * @example throttle(fn, [interval])
 * @param {func}   fun      [必选] 需要处理的函数
 * @param {number} interval [可选] 时间间隔，预设为.3s
 * @returns {func} function 返回一个处理函数
 */
export const throttle = (fn, interval = 300) => {
    let _self = fn,
        timer,
        firstTime = true;

    return () => {
        if (firstTime) {
            _self.apply(this, arguments);
            return (firstTime = false);
        }

        if (timer) {
            return false;
        }

        timer = setTimeout(() => {
            clearTimeout(timer);
            timer = null;
            _self.apply(this, arguments);
        }, interval);
    };
};

/**
 * 防抖函数，延迟函数执行，跟节流不一样，这个只执行一次
 * 场景：鼠标滑过弹框会直接显示出来，很突兀...等等
 * @example debounce(fn,500,true)
 * @param {func}   func      [必选] 需要处理的函数
 * @param {number} threshold [可选] 时间间隔，默认.3s
 * @param {boolean} execAsap [可选] 选择是该时间段的开始还是结束执行，默认结束执行
 * @returns
 */
export const debounce = (func, threshold = 300, execAsap = false) => {
    let timeout;
    return () => {
        const args = arguments;

        function delayed() {
            if (!execAsap) func.apply(this, args);
            timeout = null;
        }

        if (timeout) clearTimeout(timeout);
        else if (execAsap) func.apply(this, args);

        timeout = setTimeout(delayed, threshold);
    };
};


/**
 * logo改变，当到了对比节点的某一位置时改变logo
 * @example 
 * @param {target}    ele    logo节点
 * @param {heightEle} ele    对比的节点
 */
export const changeLogo = (target, heightEle) => {
    const change = () => {
        const bannerHeight = $(heightEle).height();
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

        if (scrollTop > bannerHeight - 100) {
            $(target)[0].src = "./assets/image/common/logo_black1.png"
        } else {
            $(target)[0].src = "./assets/image/common/logo.png"
        }
    }

    window.addEventListener('scroll', throttle(change))
}