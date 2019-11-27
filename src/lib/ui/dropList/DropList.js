/**
     * 绝对定位元素的定位效果
     * 针对所有浏览器
     * 自动含边界判断
     * 可用在DropDown, Tips等组件上
     * 支持链式调用和模块化调用
     * @example
     * $().follow(trigger, options);
     * new Follow(trigger, target, options);

     * 文档见：http://www.zhangxinxu.com/wordpress/?p=1328 position()方法
    **/
$.fn.follow = function(trigger, options) {
  var defaults = {
    offsets: {
      x: 0,
      y: 0
    },
    // trigger-target
    position: "4-1",
    // 边缘位置自动调整
    edgeAdjust: true
  };

  var params = $.extend({}, defaults, options || {});

  return $(this).each(function() {
    var target = $(this);

    if (trigger.length == 0) {
      return;
    }
    var pos, triL, triT, tarL, tarT;
    var triH = 0;
    var triW = 0;
    var tarH = target.data("height");
    var tarW = target.data("width");
    var st = $(window).scrollTop();
    var sl = $(window).scrollLeft();

    var offX = parseInt(params.offsets.x, 10) || 0;
    var offY = parseInt(params.offsets.y, 10) || 0;

    //缓存目标对象高度，宽度，提高鼠标跟随时显示性能，元素隐藏时缓存清除
    if (!tarH) {
      tarH = target.outerHeight();
    }
    if (!tarW) {
      tarW = target.outerWidth();
    }

    pos = trigger.offset();
    triH = trigger.outerHeight();
    triW = trigger.outerWidth();
    triL = pos.left;
    triT = pos.top;

    // 合法的位置关系数据
    var arrLegalPos = [
      "4-1",
      "1-4",
      "5-7",
      "2-3",
      "2-1",
      "6-8",
      "3-4",
      "4-3",
      "8-6",
      "1-2",
      "7-5",
      "3-2"
    ];
    // 设定的对齐关系
    var align = params.position;
    // 是否对齐匹配的标志量
    var alignMatch = false;
    // 确定定位的方向
    var strDirect;

    // 遍历，以确定设定的对齐是否有匹配
    $.each(arrLegalPos, function(i, n) {
      if (n === align) {
        alignMatch = true;

        return false;
      }
    });

    // 如果没有匹配的对齐方式，使用默认的对齐方式
    if (!alignMatch) {
      align = defaults.position;
    }

    // 确定定位方位，是上下左右的哪个
    var funDirect = function(a) {
      var dir = "bottom";
      //确定方向
      switch (a) {
        case "1-4":
        case "5-7":
        case "2-3": {
          dir = "top";
          break;
        }
        case "2-1":
        case "6-8":
        case "3-4": {
          dir = "right";
          break;
        }
        case "1-2":
        case "8-6":
        case "4-3": {
          dir = "left";
          break;
        }
        case "4-1":
        case "7-5":
        case "3-2": {
          dir = "bottom";
          break;
        }
      }

      return dir;
    };

    // 居中判断
    var funCenterJudge = function(a) {
      if (a === "5-7" || a === "6-8" || a === "8-6" || a === "7-5") {
        return true;
      }

      return false;
    };

    // 是否超出边界的判断
    var funJudge = function(dir) {
      var totalHeight = 0;
      var totalWidth = 0;

      // 4个方位分别判断
      if (dir === "right") {
        totalWidth = triL + triW + tarW + offX;
        if (totalWidth > $(window).width()) {
          return false;
        }
      } else if (dir === "bottom") {
        totalHeight = triT + triH + tarH + offY;
        if (totalHeight > st + $(window).height()) {
          return false;
        }
      } else if (dir === "top") {
        totalHeight = tarH + offY;
        if (totalHeight > triT - st) {
          return false;
        }
      } else if (dir === "left") {
        totalWidth = tarW + offX;
        if (totalWidth > triL) {
          return false;
        }
      }

      return true;
    };

    //此时的方向
    strDirect = funDirect(align);

    //边缘过界判断
    if (params.edgeAdjust) {
      //根据位置是否溢出显示界面重新判定定位
      if (funJudge(strDirect)) {
        //该方向不溢出
        (function() {
          if (funCenterJudge(align)) {
            return;
          }
          var obj = {
            top: {
              right: "2-3",
              left: "1-4"
            },
            right: {
              top: "2-1",
              bottom: "3-4"
            },
            bottom: {
              right: "3-2",
              left: "4-1"
            },
            left: {
              top: "1-2",
              bottom: "4-3"
            }
          };
          var o = obj[strDirect];
          var name;
          if (o) {
            for (name in o) {
              if (!funJudge(name)) {
                align = o[name];
              }
            }
          }
        })();
      } else {
        //该方向溢出
        (function() {
          if (funCenterJudge(align)) {
            var center = {
              "5-7": "7-5",
              "7-5": "5-7",
              "6-8": "8-6",
              "8-6": "6-8"
            };
            align = center[align];
          } else {
            var obj = {
              top: {
                left: "3-2",
                right: "4-1"
              },
              right: {
                bottom: "1-2",
                top: "4-3"
              },
              bottom: {
                left: "2-3",
                right: "1-4"
              },
              left: {
                bottom: "2-1",
                top: "3-4"
              }
            };
            var o = obj[strDirect];
            var arr = [];
            for (var name in o) {
              arr.push(name);
            }
            if (funJudge(arr[0]) || !funJudge(arr[1])) {
              align = o[arr[0]];
            } else {
              align = o[arr[1]];
            }
          }
        })();
      }
    }

    // 是否变换了方向
    var strNewDirect = funDirect(align);
    var strFirst = align.split("-")[0];

    //确定left, top值
    switch (strNewDirect) {
      case "top": {
        tarT = triT - tarH;
        if (strFirst == "1") {
          tarL = triL;
        } else if (strFirst === "5") {
          tarL = triL - (tarW - triW) / 2;
        } else {
          tarL = triL - (tarW - triW);
        }
        break;
      }
      case "right": {
        tarL = triL + triW;
        if (strFirst == "2") {
          tarT = triT;
        } else if (strFirst === "6") {
          tarT = triT - (tarH - triH) / 2;
        } else {
          tarT = triT - (tarH - triH);
        }
        break;
      }
      case "bottom": {
        tarT = triT + triH;
        if (strFirst == "4") {
          tarL = triL;
        } else if (strFirst === "7") {
          tarL = triL - (tarW - triW) / 2;
        } else {
          tarL = triL - (tarW - triW);
        }
        break;
      }
      case "left": {
        tarL = triL - tarW;
        if (strFirst == "2") {
          tarT = triT;
        } else if (strFirst === "6") {
          tarT = triT - (tarW - triW) / 2;
        } else {
          tarT = triT - (tarH - triH);
        }
        break;
      }
    }

    if (params.edgeAdjust && funCenterJudge(align)) {
      var winWidth = $(window).width();
      var winHeight = $(window).height();
      // 是居中定位
      // 变更的不是方向，而是offset大小
      // 偏移处理
      if (align == "7-5" || align == "5-7") {
        // 左右是否超出
        if (tarL - sl < 0.5 * winWidth) {
          // 左半边，判断左边缘
          if (tarL - sl < 0) {
            tarL = sl;
          }
        } else if (tarL - sl + tarW > winWidth) {
          tarL = winWidth + sl - tarW;
        }
        // 下面两个else if 判断上下是否超出
      } else if (tarT - st < 0.5 * winHeight) {
        // 左半边，判断左边缘
        if (tarT - st < 0) {
          tarT = st;
        }
      } else if (tarT - st + tarH > winHeight) {
        tarT = winHeight + st - tarH;
      }
    }

    if (strNewDirect == "top" || strNewDirect == "left") {
      tarL = tarL - offX;
      tarT = tarT - offY;
    } else {
      tarL = tarL + offX;
      tarT = tarT + offY;
    }

    //浮动框显示
    target
      .css({
        position: "absolute",
        left: Math.round(tarL),
        top: Math.round(tarT)
      })
      .attr("data-align", align);

    // z-index自动最高
    if (target.zIndex) {
      target.zIndex();
    }
  });
};

var Follow = function(trigger, target, options) {
  target.follow(trigger, options);
};

// Follow.prototype.hide = function() {
//  target.remove();
// };

/*
* 元素的下拉显示
*/

/*
* 支持jQuery API调用和模块化调用两种
* @example
* $('trigger').drop(target, options);
* or
* new Drop(trigger, target, options);
*/
$.fn.drop = function(target, options) {
  return $(this).each(function() {
    var drop = $(this).data("drop");
    if (!drop) {
      $(this).data("drop", new Drop($(this), target, options));
    }
  });
};

/**
 * 实例方法
 * @param {Object} trigger 触发元素，$()包装器元素类型
 * @param {Object} target  显示的浮动定位元素，$()包装器元素类型
 * @param {Object} options 可选参数
 */
var Drop = function(trigger, target, options) {
  var defaults = {
    // 触发元素显示的事件，'null'直接显示；'hover'是hover方法；'click'是点击显示,
    eventType: "null",
    // 实现点击或hover事件的委托实现
    selector: "",
    offsets: {
      x: 0,
      y: 0
    },
    edgeAdjust: true,
    position: "7-5",
    onShow: $.noop,
    onHide: $.noop
  };

  var params = $.extend({}, defaults, options || {});

  var id = target.attr("id");

  if (!id) {
    id = ("id_" + Math.random()).replace("0.", "");
    target.attr("id", id);
  }

  if (params.selector == "") {
    trigger.attr({
      "data-target": id,
      "aria-expanded": "false"
    });
  }

  // 元素暴露给实例
  this.el = {
    trigger: trigger,
    target: target
  };

  // 偏移
  this.offsets = params.offsets;

  // 回调
  this.callback = {
    show: params.onShow,
    hide: params.onHide
  };

  // 位置
  this.position = params.position;
  // 边缘调整
  this.edgeAdjust = params.edgeAdjust;

  // 实例的显示状态
  this.display = false;

  var drop = this;

  switch (params.eventType) {
    case "null": {
      this.show();
      break;
    }
    case "hover": {
      // hover处理需要增加延时
      var timerHover;
      // 同时，从trigger移动到target也需要延时，因为两者可能有间隙，不能单纯移出就隐藏
      var timerHold;

      trigger.delegate(params.selector, "mouseenter", function() {
        if (params.selector) {
          drop.el.trigger = $(this).attr({
            "data-target": id,
            "aria-expanded": "false"
          });
        }

        // 显示的定时器
        timerHover = setTimeout(function() {
          drop.show();
        }, 150);
        // 去除隐藏的定时器
        clearTimeout(timerHold);
      });

      trigger.delegate(params.selector, "mouseleave", function() {
        // 清除显示的定时器
        clearTimeout(timerHover);
        // 隐藏的定时器
        timerHold = setTimeout(function() {
          drop.hide();
        }, 200);
      });

      if (!target.data("dropHover")) {
        target.hover(
          function() {
            // 去除隐藏的定时器
            clearTimeout(timerHold);
          },
          function() {
            // 隐藏
            timerHold = setTimeout(function() {
              drop.hide();
            }, 100);
          }
        );
        target.data("dropHover", true);
      }

      // 键盘支持，原本使用focus事件，但并不利于键盘交互
      trigger.delegate(params.selector, "click", function(event) {
        // window.isKeyEvent表示是否键盘触发，来自Enhance.js
        if (window.isKeyEvent) {
          if (params.selector) {
            drop.el.trigger = $(this).attr({
              "data-target": id,
              "aria-expanded": "false"
            });
          }
          // 点击即显示
          if (drop.display == false) {
            drop.show();
          } else {
            drop.hide();
          }
          event.preventDefault();
        }
      });

      break;
    }
    case "click": {
      trigger.delegate(params.selector, "click", function(event) {
        if (params.selector) {
          drop.el.trigger = $(this).attr({
            "data-target": id,
            "aria-expanded": "false"
          });
        }
        // 点击即显示
        if (drop.display == false) {
          drop.show();
        } else {
          drop.hide();
        }
        event.preventDefault();
      });
      break;
    }
  }

  // 点击页面空白区域隐藏
  $(document).click(function(event) {
    var clicked = event && event.target;

    if (!clicked || !drop || drop.display != true) return;

    var tri = drop.el.trigger.get(0);
    var tar = drop.el.target.get(0);
    if (
      tri &&
      tar &&
      clicked != tri &&
      clicked != tar &&
      tri.contains(clicked) == false &&
      tar.contains(clicked) == false
    ) {
      drop.hide();
    }
  });

  // 窗体尺寸改变生活的重定位
  $(window).resize(function() {
    drop.follow();
  });

  return drop;
};

/**
 * 下拉定位处理
 * @return {Object} 返回当前实例对象
 */
Drop.prototype.follow = function() {
  var target = this.el.target;
  var trigger = this.el.trigger;

  // 下拉必须是显示状态才执行定位处理
  if (this.display == true && trigger.css("display") != "none") {
    target.follow(trigger, {
      offsets: this.offsets,
      position: this.position,
      edgeAdjust: this.edgeAdjust
    });
  }

  return this;
};

/**
 * 下拉的显示处理
 * @return {Object} 返回当前实例对象
 */
Drop.prototype.show = function() {
  // target需要在页面中
  var target = this.el.target;
  var trigger = this.el.trigger;
  // 如果target在内存中，append到页面上
  if (target && $.contains(document.body, target.get(0)) == false) {
    $("body").append(target);
  }
  // 改变显示标志量
  this.display = true;
  // 进行定位
  target
    .css({
      position: "absolute",
      display: "inline"
    })
    .addClass("ESC");

  // aria
  trigger.attr({
    "aria-expanded": "true"
  });

  // 定位
  this.follow();

  // 显示回调处理
  if ($.isFunction(this.callback.show)) {
    this.callback.show.call(this, trigger, target);
  }

  return this;
};

/**
 * 下拉的隐藏处理
 * @return {Object} 返回当前实例对象
 */
Drop.prototype.hide = function() {
  var target = this.el.target;
  var trigger = this.el.trigger;
  // 隐藏下拉面板
  target.hide().removeClass("ESC");
  // aria
  trigger.attr({
    "aria-expanded": "false"
  });

  if (window.isKeyEvent) {
    trigger.focus();
  }

  // 更改显示标志量
  this.display = false;
  // 隐藏回调处理
  if ($.isFunction(this.callback.hide)) {
    this.callback.hide.call(this, trigger, target);
  }

  return this;
};

// 一些变量
var prefixDropList = "ui-droplist-";
var SELECTED = "selected";
var DISABLED = "disabled";

// 支持jQuery调用的语法处理
$.fn.dropList = function(data, options) {
  return $(this).each(function() {
    var dropList = $(this).data("dropList");
    if (!dropList) {
      $(this).data("dropList", new DropList($(this), data, options));
    }
  });
};

/**
 * 下拉列表
* @trigger 触发下拉的按钮元素
* @data

* 也可以是Function函数，表示数据是动态呈现的
* @param {Object} trigger         jQuery包装器元素
* @param {Array|Function} data
*     下拉列表数据，数组，例如：
        [{
            id: 1,
            value: '所有评论',
            selected: true
        }, {
            id: 2,
            value: '未审核评论',
            disabled: true
        }, {
            id: 3,
            value: '通过评论'
        }]
也可以是Function函数，表示数据是动态呈现的。
* @param {Object} options          可选参数
*/
var DropList = function(trigger, data, options) {
  var defaults = {
    // 触发元素显示的事件，‘null’直接显示；‘hover’是hover方法；‘click’是点击显示；其他为手动显示与隐藏。
    eventType: "click",
    offsets: {
      x: 0,
      y: 0
    },
    position: "4-1",
    selector: "",
    width: "",
    onShow: $.noop,
    onHide: $.noop,
    // this为当前点击的列表元素，支持两个参数，第一个参数为列表元素对应的数据(纯对象)，第二个是当前实例对象
    onSelect: $.noop
  };

  var params = $.extend({}, defaults, options || {});

  // 列表元素
  var target = $("<div></div>")
    .addClass(prefixDropList + "x")
    .css("width", params.width)
    .attr({
      role: "listbox"
    });

  if (trigger.length == 0) {
    return;
  }

  // 下拉三角
  var arrow = trigger.find("." + prefixDropList + "arrow");

  // 下拉三角元素的HTML代码
  var htmlArrow = arrow.length ? arrow.get(0).outerHTML : "";

  //  trigger除去三角以外的HTML代码
  var htmlLeft = $.trim(trigger.html().replace(htmlArrow, ""));

  // 创建列表
  // 不管怎样，data需要是个有数据的数组
  // 如果不符合条件，我们只能反馈没有数据
  if ($.isArray(data) && data.length == 0) {
    data = [
      {
        value: "没有数据",
        disabled: true
      }
    ];
  } else if ($.isArray(data) && params.selector == "") {
    // 1. 如果列表数据含有selected: true, 则自动重置trigger里面的内容
    // 2. 如果列表数据没有selected: true, 则根据trigger的内容信息确定哪个数据是selected
    var hasSelected = false;
    var matchIndex = -1;
    // 遍历数据
    $.each(data, function(index, obj) {
      if (obj.selected) {
        trigger.html(obj.value + htmlArrow);
        hasSelected = true;
      }
      if ($.trim(obj.value) == htmlLeft) {
        matchIndex = index;
      }
    });

    // 选中项标示
    if (hasSelected == false && matchIndex != -1) {
      data[matchIndex].selected = true;
    }
  }

  // 根据data组装列表
  var _get = function(arr) {
    var html = "";
    $.each(arr, function(index, obj) {
      // 选中列表的类名
      var clSelected = "";
      if (obj[SELECTED]) {
        clSelected = " " + SELECTED;
      }

      // 禁用态和非禁用使用标签区分
      if (obj[DISABLED] != true) {
        html =
          html +
          '<a href="' +
          (obj.href || "javascript:") +
          '" class="' +
          prefixDropList +
          "li" +
          clSelected +
          '" data-index="' +
          index +
          '" role="option" aria-selected="' +
          (obj[SELECTED] || "false") +
          '" data-target="' +
          target.attr("id") +
          '">' +
          obj.value +
          "</a>";
      } else {
        html =
          html +
          '<span class="' +
          prefixDropList +
          'li">' +
          obj.value +
          "</span>";
      }
    });

    return html;
  };

  // 下拉面板
  trigger.drop(target, {
    eventType: params.eventType,
    offsets: params.offsets,
    selector: params.selector,
    position: params.position,
    onShow: function() {
      var _data = this.data;
      if ($.isFunction(data)) {
        _data = data();
        // 更新
        drop.data = _data;
      }
      target.html(_get(_data));
      params.onShow.apply(this, [trigger, target]);
    },
    onHide: params.onHide
  });

  var drop = trigger.data("drop");

  drop.data = data;

  // 列表元素内容，事件
  target.delegate("a", "click", function() {
    var index = $(this).attr("data-index") * 1;
    if ($(this).hasClass(SELECTED) == false) {
      // 除去所有的selected
      if ($.isArray(data) && /^javas/.test($(this).attr("href"))) {
        $.each(data, function(i, obj) {
          if (obj[SELECTED]) {
            obj[SELECTED] = null;
          }
          if (i == index) {
            obj[SELECTED] = true;
          }
        });
        // 缓存新的数据
        drop.data = data;

        trigger.html($(this).html() + htmlArrow);
      }

      params.onSelect.call(this, drop.data[index], drop);
    }

    drop.hide();
  });

  return drop;
};

export default DropList;
