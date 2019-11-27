(function(d, m, g) {
	function t(a, c, d, b) {
		if (a > d || c > b) {
			var f = a / d,
				e = c / b;
			f > e ? (a = d, c /= f) : (a /= e, c = b)
		}
		return {
			width: a,
			height: c
		}
	}
	function p(a, c) {
		var d = ["-webkit-", "-moz-", "-o-", "-ms-", ""],
			b = {},
			f, e = d.length;
		for (f = 0; f < e; f++) b[d[f] + a] = c;
		return b
	}
	function u(a) {
		return css3 ? p("transform", "translate(" + a + "px, 0)") : {
			left: a
		}
	}
	var h = 0,
		v = function(a, c, d) {
			function b(b, a) {
				for (var c in b) if (g[b[c]] !== d) return "pfx" == a ? b[c] : !0;
				return !1
			}
			function f(a, c, f) {
				var e = a.charAt(0).toUpperCase() + a.substr(1),
					g = (a + " " + m.join(e + " ") + e).split(" ");
				if ("string" === typeof c || "undefined" === typeof c) c = b(g, c);
				else a: {
					g = (a + " " + l.join(e + " ") + e).split(" "), a = g;
					for (var n in a) if (e = c[a[n]], e !== d) {
						c = !1 === f ? a[n] : "function" === typeof e ? e.bind(f || c) : e;
						break a
					}
					c = !1
				}
				return c
			}
			a = {};
			var e = c.createElement("modernizr"),
				g = e.style,
				m = ["Webkit", "Moz", "O", "ms"],
				l = ["webkit", "moz", "o", "ms"],
				e = {},
				n = [],
				r = n.slice,
				q, h = {}.hasOwnProperty,
				k;
			"undefined" === typeof h || "undefined" === typeof h.call ? k = function(b, a) {
				return a in b && "undefined" === typeof b.constructor.prototype[a]
			} : k = function(b, a) {
				return h.call(b, a)
			};
			Function.prototype.bind || (Function.prototype.bind = function(b) {
				var a = this;
				if ("function" != typeof a) throw new TypeError;
				var c = r.call(arguments, 1),
					d = function() {
						if (this instanceof d) {
							var l = function() {};
							l.prototype = a.prototype;
							var l = new l,
								e = a.apply(l, c.concat(r.call(arguments)));
							return Object(e) === e ? e : l
						}
						return a.apply(b, c.concat(r.call(arguments)))
					};
				return d
			});
			e.canvas = function() {
				var b = c.createElement("canvas");
				return !!b.getContext && !! b.getContext("2d")
			};
			e.csstransforms = function() {
				return !!f("transform")
			};
			e.csstransitions = function() {
				return f("transition")
			};
			for (var s in e) k(e, s) && (q = s.toLowerCase(), a[q] = e[s](), n.push((a[q] ? "" : "no-") + q));
			g.cssText = "";
			return e = null, a._version = "2.5.3", a._domPrefixes = l, a._cssomPrefixes = m, a.testProp = function(a) {
				return b([a])
			}, a.testAllProps = f, a
		}(this, this.document);
	css3 = v.csstransforms && v.csstransitions;
	touch = "ontouchstart" in m;
	mobile = navigator.userAgent.toLowerCase().match(/(android|iphone|ipod|ipad|iemobile|windows ce|netfront|playstation|midp|up\.browser|symbian|nintendo|wii)/);
	var k = function(a, c) {
			this.e = d(a);
			this.o = d.extend({}, d.fn.fsgallery.defaults, c);
			this.i = 0;
			this.w = g.innerWidth || d(g).innerWidth();
			this.h = g.innerHeight || d(g).innerHeight();
			this.createArray();
			this.createHtml();
			this.createImages();
			this.events()
		};
		
	
	k.prototype = {
		
		
		constructor: k,
		createArray: function() {
			var a = this;
				//alert($(this));
			a.images = [];
			a.e.parent("a").length ? a.e.parent("a").each(function() {
				a.images.push({
					src: this.href,
					alt: d(this).find("img")[0].alt,
					title: this.fstitle,   //定义的title值 ，考虑到ie11以下无法识别自己定义的值，所以只能用图片固有的属性alt和title
					article: this.fsarticle  // 定义的article值 也就是图片描述的文字
				})
			}) : a.e.each(function() {
				a.images.push({
					src: this.src,
					alt: this.alt,
					title: this.fstitle,  //同上
					article: this.fsarticle //同上
				})
			})
		},
		createHtml: function() {
			d("body").append(this.gallery = d('<div class="fs_gallery">').hide().append(mobile ? "" : this.prev = d('<div class="fs_gallery_prev">'), mobile ? "" : this.next = d('<div class="fs_gallery_next">'), this.close = d('<div class="fs_gallery_close">'), this.shuft = d('<div class="fs_gallery_shuft">'), d('<div class="fs_gallery_thumbs">').append(this.fs_thumbs_list = d('<div class="fs_gallery_thumbs_list">'))))
		},
		createImages: function() {
			var a, c = this.images.length;
			for (a = 0; a < c; a++)
			{ 
			 this.shuft.append(  
			  // 这里说一下大致思路，"this"里面的值为本插件的核心，实际上是k，使用审查元素，断点看清里面的值
			  // this.e[a].attributes[0].value 断点查出这个值为title的值
			  // this.e[a].attributes[1].value 断点查出这个值为article的值
			  //this.shuft链式写法 添加所需要的预备好的div结构
			   d('<div class="fs_gallery_shuft_item">').append(
				this.fs_content=d('<div class="fs_gallery_content">').append(
				this.fs_gallery_left = d('<div class="fs_gallery_left">') ,
				this.right_title = d('<h3 class="right_title">'+this.e[a].attributes[0].value+'</h3>'),
				this.fs_gallery_right = d('<div class="fs_gallery_right">').append(
				this.right_text = d('<p class="right_text">'+this.e[a].attributes[1].value+'</p>')))).css({
				width: this.w,
				height: this.h
			 }))
			 
			}
		},
		loadImg: function(a, c) {
			
			d("<img>", {
				src: this.images[a].src,
				alt: this.images[a].alt
			}).on("load", function() {
				c(a, d(this))
			})
			
		},
		events: function() {
			function a(a) {
				a.preventDefault();
				f = (a.pageX || a.targetTouches[0].pageX) - b.pos;
				touch ? b.shuft[0].addEventListener("touchmove", c, !1).addEventListener("touchend", h, !1) : d(m).mousemove(c).mouseup(h)
			}
			function c(a) {
				a.preventDefault();
				e = !0;
				b.pos = (a.pageX || a.targetTouches[0].pageX) - f;
				clearInterval(k);
				b.animate(b.pos, 0);
				b.pos - -(b.i * b.w) > b.w / 4 && (b.goTo(-1), d(this).unbind("mousemove touchmove"));
				b.pos - -(b.i * b.w) < -b.w / 4 && (b.goTo(1), d(this).unbind("mousemove touchmove"))
			}
			function h(a) {
				e || b.goTo(1);
				b.pos - -(b.i * b.w) > -b.w / 4 && b.animate(-b.i * b.w, p);
				d(this).unbind("mousemove mouseup touchend");
				e = !1
			}
			var b = this,
				f = 0,
				e = !1,
				k, p = b.o.duration;
			b.pos = 0;
			touch ? b.shuft[0].addEventListener("touchstart", a, !1) : d(b.shuft).delegate("img", "mousedown", a);
			mobile || (b.prev.click(function() {
				b.goTo(-1)
			}), b.next.click(function() {
				b.goTo(1)
			}));
			d(g).resize(function() {
				b.w = g.innerWidth || d(g).innerWidth();
				b.h = g.innerHeight || d(g).innerHeight();
				var a = b.images[b.i],
					a = t(a.width, a.height, b.w, b.h);
				b.shuft.find(".fs_gallery_shuft_item").css({  //将添加图片的路径改为自己需要的div层，这里是我添加的类fs_gallery_shuft_item层
					width: b.w,
					height: b.h
				}).find("fs_gallery_content").css({  //设置为固定宽高，然后居中
					width: 853,
					height: 580,
					marginLeft: -853 / 2,
					marginTop: -580 / 2
				});
				b.animate(-b.i * b.w, 0)
			});
			(b.e.parent("a").length ? b.e.parent("a") : b.e).click(function(a) {
				a.preventDefault();
				a = b;
				var c;
				a: {
					var d = this.src || this.href;
					for (c in b.images) if (b.images[c].src == d) {
						c = parseInt(c);
						break a
					}
					c = void 0
				}
				a.i = c;
				b.checkLoad();
				b.animate(-b.i * b.w, 0);
				b.show()
			});
			b.close.click(function() {
				b.hide()
				d("body").removeClass("bodyso")
			});
			b.gallery.click(function(a) {
				d(a.target).hasClass("fs_gallery_shuft_item") && b.hide()
			});
			d(m).keydown(function(a) {
				27 == a.keyCode ? b.hide() : 37 == a.keyCode && b.gallery.is(":visible") ? b.goTo(-1) : 39 == a.keyCode && b.gallery.is(":visible") && b.goTo(1)
			})
		},
		checkLoad: function() {
			var a = this.images.length - 1,
				c;
			for (c = this.i - this.o.preload; c <= this.i + this.o.preload; c++) 0 > c ? this.o.loop && this.preload(a + c + 1) : c > a ? this.o.loop && this.preload(c - a) : this.preload(c)
		},
		preload: function(a) {
			var c = this,
				d = c.shuft.children("div").find(".fs_gallery_left").eq(a);
			d.data().loaded || (d.data({
				loaded: !0
			}), c.loadImg(a, function(a, f) {
				size = t(f[0].width, f[0].height, c.w, c.h);
				
				c.images[a].width = f[0].width;
				c.images[a].height = f[0].height;
				d.append(f.fadeIn(c.o.fadeTime))

			}))
		},
		show: function() {
			this.gallery.fadeIn(500)
		},
		hide: function() {
			this.gallery.fadeOut(500)
		},
		animate: function(a, c) {
			css3 ? this.shuft.css(p("transition-duration", c + "ms")).css(u(a)) : this.shuft.animate(u(a), c);
			this.pos = a
		},
		getIndex: function(a) {
			0 > a && (a = this.o.loop ? this.images.length - 1 : 0);
			a > this.images.length - 1 && (a = this.o.loop ? 0 : this.images.length - 1);
			return a
		},
		goTo: function(a) {
			this.i = this.getIndex(this.i + a);
			this.animate(-this.i * this.w, this.o.duration);
			this.checkLoad()
		}
	};
	d.fn.fsgallery = function(a) {
		h++;
		var c = d(m.body);
		c.data("fsgallery_" + h) || c.data("fsgallery_" + h, new k(this, a));
		return this
	};
	d.fn.fsgallery.defaults = {
		duration: 500,
		loop: !1,
		preload: 2,
		fadeTime: 1E3
	}
})(jQuery, document, window);


