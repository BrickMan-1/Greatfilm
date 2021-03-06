/**
 * gallery.js
 * @author rmchen
 * @version 1.0
 * Created: 18-06-25
 */

/**
 * gallery插件，预设可配置参数
 * @param {prevBtn} [DOM] 上一个按钮绑定
 * @param {nextBtn} [DOM] 下一个按钮绑定
 * @param {closeBtn} [DOM] 关闭按钮绑定
 * @param {closeCb} [func] 关闭窗口后回调
 * @param {nextCb} [func] 点击下一页回调，
 * 带（index, slideshowCount）当前下标和总元素数量两个参数
 * @param {prevCb} [func] 点击上一页回调，
 * 带（ index, slideshowCount） 当前下标和总元素数量两个参数
 * @param {initCb} [func] 初始化插件触发回调，
 * 带（ index, slideshowCount） 当前下标和总元素数量两个参数
 * @param {gutter} [Number] 相邻两项之间的间距
 * @class Gallery
 */
export default class Gallery {
  constructor(el, options) {
    this.el = el;
    this.options = extend(
      {
        prevBtn: this.el.querySelector(
          "section.slideshow > nav > span.nav-prev"
        ),
        nextBtn: this.el.querySelector(
          "section.slideshow > nav > span.nav-next"
        ),
        closeBtn: this.el.querySelector(
          "section.slideshow > nav > span.nav-close"
        ),
        closeCb: null,
        nextCb: null,
        prevCb: null,
        initCb: null,
        gutter: 2
      },
      this.options
    );
    extend(this.options, options);
    this._init();
  }

  _init() {
    // slideshow绑定的根元素
    this.slideshow = this.el.querySelector("section.slideshow > ul");
    // slideshow绑定的元素
    this.slideshowItems = [].slice.call(this.slideshow.children);
    // slideshow绑定的元素个数
    this.slideshowCount = this.slideshowItems.length;
    // 标记slideshow
    this.current = -1;
    //标记当前位置下标
    this.index = 1;
    // 前后控制按钮绑定
    this.ctrlPrev = this.options.prevBtn;
    this.ctrlNext = this.options.nextBtn;
    this.ctrlClose = this.options.closeBtn;
    //初始化所有绑定事件
    this._initEvents();
  }

  _initEvents() {
    //进入页面时打开第一项
    this._openSlideshow(0);

    // 导航控制
    this.ctrlPrev.addEventListener("click", () => {
      this._navigate("prev");
    });
    this.ctrlNext.addEventListener("click", () => {
      this._navigate("next");
    });
    this.ctrlClose.addEventListener("click", () => {
      this.closeSlideshow();
    });

    // 窗口resize，执行resize方法
    window.addEventListener("resize", () => {
      this._resizeHandler();
    });

    // 按键导航
    document.addEventListener("keydown", ev => {
      if (this.isSlideshowVisible) {
        var keyCode = ev.keyCode || ev.which;

        switch (keyCode) {
          case 37:
            this._navigate("prev");
            break;
          case 39:
            this._navigate("next");
            break;
          case 27:
            this.closeSlideshow();
            break;
        }
      }
    });

    this.options.initCb && this.options.initCb(this.index, this.slideshowCount);
  }

  _openSlideshow(pos) {
    this.isSlideshowVisible = true;
    this.current = pos;

    addClass(this.el, "slideshow-open");

    /* slideshow子类设置 */

    // 设置slideshow的当前项，前一项和后一项
    this._setViewportItems();

    // 添加相应的类名到当前项目
    addClass(this.currentItem, "current");
    addClass(this.currentItem, "show");

    //前一项添加类名，并设置transform:translate3d(translateVal,0,-150px)
    if (this.prevItem) {
      addClass(this.prevItem, "show");
      var translateVal = Number(
        -1 * (getViewportW() / 2 + this.prevItem.offsetWidth / 2)
      );
      setTransform(
        this.prevItem,
        "translate3d(" + translateVal + "px, 0, -150px)"
      );
    }
    //后一项添加类名，并设置transform:translate3d(translateVal,0,-150px)，和前一项的translateVal值相反
    if (this.nextItem) {
      addClass(this.nextItem, "show");
      var translateVal = Number(
        getViewportW() / this.options.gutter + this.nextItem.offsetWidth / 2
      );
      setTransform(
        this.nextItem,
        "translate3d(" + translateVal + "px, 0, -150px)"
      );
    }
  }

  _navigate(dir) {
    //滑动到下一项的过渡过程中无法继续点击下一页，防止跳过多项
    if (this.isAnimating) return;
    //判断最后一页或开始第一页，是的话关闭slideshow
    if (
      (dir === "next" && this.current === this.slideshowCount - 1) ||
      (dir === "prev" && this.current === 0)
    ) {
      // this._closeSlideshow();
      return;
    }

    //设置一个锁，动画没执行完时无法继续导航
    this.isAnimating = true;

    // 重置当前项和前后项
    this._setViewportItems();

    var self = this,
      itemWidth = this.currentItem.offsetWidth,
      transformLeftStr =
        "translate3d(-" +
        Number(getViewportW() / this.options.gutter + itemWidth / 2) +
        "px, 0, -150px)",
      transformRightStr =
        "translate3d(" +
        Number(getViewportW() / this.options.gutter + itemWidth / 2) +
        "px, 0, -150px)",
      transformCenterStr = "",
      transformOutStr,
      transformIncomingStr,
      // incoming item
      incomingItem;

    if (dir === "next") {
      transformOutStr =
        "translate3d( -" +
        Number((getViewportW() * 2) / this.options.gutter + itemWidth / 2) +
        "px, 0, -150px )";

      transformIncomingStr =
        "translate3d( " +
        Number((getViewportW() * 2) / this.options.gutter + itemWidth / 2) +
        "px, 0, -150px )";

      ++this.index;
      this.options.nextCb &&
        this.options.nextCb(this.index, this.slideshowCount);
    } else {
      transformOutStr =
        "translate3d( " +
        Number((getViewportW() * 2) / this.options.gutter + itemWidth / 2) +
        "px, 0, -150px )";

      transformIncomingStr =
        "translate3d( -" +
        Number((getViewportW() * 2) / this.options.gutter + itemWidth / 2) +
        "px, 0, -150px )";

      --this.index;
      this.options.prevCb &&
        this.options.prevCb(this.index, this.slideshowCount);
    }

    // 执行完一次效果后移除animatable类
    removeClass(self.slideshow, "animatable");

    if (
      (dir === "next" && this.current < this.slideshowCount - 2) ||
      (dir === "prev" && this.current > 1)
    ) {
      // 在这个范围内还有元素会显示，给他们设置相应的css
      incomingItem = this.slideshowItems[
        dir === "next" ? this.current + 2 : this.current - 2
      ];
      setTransform(incomingItem, transformIncomingStr);
      addClass(incomingItem, "show");
    }

    //slide过渡函数
    var slide = function() {
      // 给slideshow添加animatable类名
      addClass(self.slideshow, "animatable");

      // 当前项移除current，进入的项添加current
      removeClass(self.currentItem, "current");
      var nextCurrent = dir === "next" ? self.nextItem : self.prevItem;
      addClass(nextCurrent, "current");

      //各种项添加类名
      setTransform(
        self.currentItem,
        dir === "next" ? transformLeftStr : transformRightStr
      );

      if (self.nextItem) {
        setTransform(
          self.nextItem,
          dir === "next" ? transformCenterStr : transformOutStr
        );
      }

      if (self.prevItem) {
        setTransform(
          self.prevItem,
          dir === "next" ? transformOutStr : transformCenterStr
        );
      }

      if (incomingItem) {
        setTransform(
          incomingItem,
          dir === "next" ? transformRightStr : transformLeftStr
        );
      }

      //过渡结束后设置当前项和前后项，相应类名，下标等值
      var onEndTransitionFn = function(ev) {
        if (ev.propertyName.indexOf("transform") === -1) return false;
        this.removeEventListener("transitionend", onEndTransitionFn);

        if (self.prevItem && dir === "next") {
          removeClass(self.prevItem, "show");
        } else if (self.nextItem && dir === "prev") {
          removeClass(self.nextItem, "show");
        }

        if (dir === "next") {
          self.prevItem = self.currentItem;
          self.currentItem = self.nextItem;
          if (incomingItem) {
            self.nextItem = incomingItem;
          }
        } else {
          self.nextItem = self.currentItem;
          self.currentItem = self.prevItem;
          if (incomingItem) {
            self.prevItem = incomingItem;
          }
        }

        self.current = dir === "next" ? self.current + 1 : self.current - 1;
        self.isAnimating = false;
      };

      self.currentItem.addEventListener("transitionend", onEndTransitionFn);
    };

    setTimeout(slide, 25);
  }

  closeSlideshow() {
    // 移除对于类名
    removeClass(this.el, "slideshow-open");
    removeClass(this.slideshow, "animatable");

    var self = this,
      onEndTransitionFn = function(ev) {
        if (ev.target.tagName.toLowerCase() !== "ul") return;
        this.removeEventListener("transitionend", onEndTransitionFn);

        // remove classes show and current from the slideshow items
        removeClass(self.currentItem, "current");
        removeClass(self.currentItem, "show");

        if (self.prevItem) {
          removeClass(self.prevItem, "show");
        }
        if (self.nextItem) {
          removeClass(self.nextItem, "show");
        }

        // also reset any transforms for all the items
        self.slideshowItems.forEach(function(item) {
          setTransform(item, "");
        });

        self.isSlideshowVisible = false;

        self.options.closeCb && self.options.closeCb();
      };

    this.el.addEventListener("transitionend", onEndTransitionFn);
  }

  //设置slideshow的前一项和后一项
  _setViewportItems() {
    this.currentItem = null;
    this.prevItem = null;
    this.nextItem = null;

    if (this.current > 0) {
      this.prevItem = this.slideshowItems[this.current - 1];
    }
    if (this.current < this.slideshowCount - 1) {
      this.nextItem = this.slideshowItems[this.current + 1];
    }
    this.currentItem = this.slideshowItems[this.current];
  }

  //窗口resize时执行去抖函数
  _resizeHandler() {
    var self = this;

    function delayed() {
      self._resize();
      self._resizeTimeout = null;
    }
    if (this._resizeTimeout) {
      clearTimeout(this._resizeTimeout);
    }
    this._resizeTimeout = setTimeout(delayed, 50);
  }

  //resize结束后更新一下宽度
  _resize() {
    if (this.isSlideshowVisible) {
      if (this.prevItem) {
        var translateVal = Number(
          -1 * (getViewportW() / 2 + this.prevItem.offsetWidth / 2)
        );
        setTransform(
          this.prevItem,

          "translate3d(" + translateVal + "px, 0, -150px)"
        );
      }
      if (this.nextItem) {
        var translateVal = Number(
          getViewportW() / 2 + this.nextItem.offsetWidth / 2
        );
        setTransform(
          this.nextItem,

          "translate3d(" + translateVal + "px, 0, -150px)"
        );
      }
    }
  }
}

//一些辅助函数
/**
 * 给节点设置rtansform属性
 * @param {DOM} el              需要绑定的节点
 * @param {STRING} transformStr transform内容
 */
function setTransform(el, transformStr) {
  el.style.WebkitTransform = transformStr;
  el.style.msTransform = transformStr;
  el.style.transform = transformStr;
}

/**
 * 设置内容宽度
 * @returns 返回视图宽度
 */
const docElem = window.document.documentElement;

function getViewportW() {
  var client = docElem["clientWidth"],
    inner = window["innerWidth"];

  if (client < inner) return inner;
  else return client;
}

/**
 * 对象扩展属性
 * @param {Object} a 扩展对象
 * @param {object} b 属性对象
 * @returns
 */
function extend(a, b) {
  for (var key in b) {
    if (b.hasOwnProperty(key)) {
      a[key] = b[key];
    }
  }
  return a;
}

function classReg(className) {
  return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
}

function hasClass(elem, c) {
  return classReg(c).test(elem.className);
}

function addClass(elem, c) {
  if (!hasClass(elem, c)) {
    elem.className = elem.className + " " + c;
  }
}

function removeClass(elem, c) {
  elem.className = elem.className.replace(classReg(c), " ");
}
