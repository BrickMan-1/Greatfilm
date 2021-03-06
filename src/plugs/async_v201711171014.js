!
function (e) {
    function t(r) {
        if (n[r]) return n[r].exports;
        var o = n[r] = {
            i: r,
            l: !1,
            exports: {}
        };
        return e[r].call(o.exports, o, o.exports, t),
            o.l = !0,
            o.exports
    }
    var n = {};
    t.m = e,
        t.c = n,
        t.d = function (e, n, r) {
            t.o(e, n) || Object.defineProperty(e, n, {
                configurable: !1,
                enumerable: !0,
                get: r
            })
        },
        t.n = function (e) {
            var n = e && e.__esModule ?
                function () {
                    return e.
                    default
                } :
                function () {
                    return e
                };
            return t.d(n, "a", n),
                n
        },
        t.o = function (e, t) {
            return Object.prototype.hasOwnProperty.call(e, t)
        },
        t.p = "",
        t(t.s = 1)
}([function (e, t) {
        var n;
        n = function () {
            return this
        }();
        try {
            n = n || Function("return this")() || (0, eval)("this")
        } catch (e) {
            "object" == typeof window && (n = window)
        }
        e.exports = n
    },
    function (e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var r = function () {
                function e(e, t) {
                    for (var n = 0; n < t.length; n++) {
                        var r = t[n];
                        r.enumerable = r.enumerable || !1,
                            r.configurable = !0,
                            "value" in r && (r.writable = !0),
                            Object.defineProperty(e, r.key, r)
                    }
                }
                return function (t, n, r) {
                    return n && e(t.prototype, n),
                        r && e(t, r),
                        t
                }
            }(),
            o = n(2).Promise;
        window.Promise = window.Promise || o;
        var i = function () {
            function e(t) {
                !
                function (e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, e);
                this.setting = e.extend({
                        rootDir: "http://demo.yfd.com.cn/case/",
                        dataBase: "access"
                    },
                    t)
            }
            return r(e, [{
                        key: "getRequestUrl",
                        value: function (t) {
                            return [this.setting.rootDir.replace(/\/$/, "") + "/tools/", "sql" === this.setting.dataBase.toLowerCase() ? "yufei_Yf.ashx" : "yufei.ashx", e.getAction(t)].join("")
                        }
                    },
                    {
                        key: "getRecordById",
                        value: function (t) {
                            return e.post(this.getRequestUrl("getRecordById"), {
                                id: t
                            })
                        }
                    },
                    {
                        key: "getRecordByName",
                        value: function (t) {
                            return e.post(this.getRequestUrl("getRecordByName"), {
                                call_index: t
                            })
                        }
                    },
                    {
                        key: "getRecord",
                        value: function (t) {
                            return e.post(this.getRequestUrl("getRecord"), t)
                        }
                    },
                    {
                        key: "getRecords",
                        value: function (t) {
                            return e.post(this.getRequestUrl("getRecords"), t)
                        }
                    },
                    {
                        key: "getMultiRecords",
                        value: function (t) {
                            return e.post(this.getRequestUrl("getMultiRecords"), t)
                        }
                    },
                    {
                        key: "getSubCategories",
                        value: function (t) {
                            return e.post(this.getRequestUrl("getSubCategories"), {
                                categoryId: t
                            })
                        }
                    },
                    {
                        key: "getProvinces",
                        value: function () {
                            return e.post(this.getRequestUrl("getProvinces"))
                        }
                    },
                    {
                        key: "getProvincesOnly",
                        value: function () {
                            return e.post(this.getRequestUrl("getProvincesOnly"))
                        }
                    },
                    {
                        key: "getCities",
                        value: function (t) {
                            return e.post(this.getRequestUrl("getCities"), {
                                parentId: t
                            })
                        }
                    },
                    {
                        key: "getAddresses",
                        value: function () {
                            return e.post(this.getRequestUrl("getAddresses"))
                        }
                    },
                    {
                        key: "getAddressesByCityId",
                        value: function (t) {
                            return e.post(this.getRequestUrl("getAddressesByCityId"), {
                                city_id: t
                            })
                        }
                    },
                    {
                        key: "getAlbumById",
                        value: function (t) {
                            return e.post(this.getRequestUrl("getAlbumById"), {
                                id: t
                            })
                        }
                    },
                    {
                        key: "getSeo",
                        value: function () {
                            return e.post(this.getRequestUrl("getSeo"))
                        }
                    },
                    {
                        key: "postMsg",
                        value: function (t) {
                            return e.post(this.getRequestUrl("postMsg"), t || {})
                        }
                    },
                    {
                        key: "searchByKeyword",
                        value: function (t) {
                            return e.post(this.getRequestUrl("searchByKeyword"), {
                                keyword: t
                            })
                        }
                    },
                    {
                        key: "emailSubscription",
                        value: function (t) {
                            return e.post(this.getRequestUrl("emailSubscription"), t || {})
                        }
                    }
                ], [{
                        key: "isObject",
                        value: function (e) {
                            return "[object Object]" === Object.prototype.toString.call(e)
                        }
                    },
                    {
                        key: "extend",
                        value: function (t) {
                            var n = arguments;
                            if (n.length <= 1) return e.isObject(n[0]) ? n[0] : {};
                            var r = {};
                            return [].slice.call(n).forEach(function (t) {
                                    for (var n in t) t.hasOwnProperty(n) && e.isObject(t) && (r[n] = t[n])
                                }),
                                r
                        }
                    },
                    {
                        key: "toQueryStr",
                        value: function (e) {
                            var t = [],
                                n = void 0,
                                r = e || {};
                            for (n in r) r.hasOwnProperty(n) && t.push(encodeURIComponent(n) + "=" + encodeURIComponent(r[n]));
                            return t.join("&")
                        }
                    },
                    {
                        key: "getAction",
                        value: function (e) {
                            return "?action=" + {
                                getRecordById: "get_model_id",
                                getRecordByName: "get_model_call_index",
                                getRecord: "get_model_parms",
                                getRecords: "get_list_parms",
                                getMultiRecords: "get_product_page",
                                getSubCategories: "get_category_list",
                                getProvinces: "get_province_city",
                                getProvincesOnly: "get_provice_list",
                                getCities: "get_city",
                                getAddressesByCityId: "get_address",
                                getSeo: "get_seo_list",
                                searchByKeyword: "get_list_search",
                                getAlbumById: "get_album_list",
                                getAddresses: "get_address_channelid",
                                postMsg: "submit_feedback",
                                emailSubscription: "submit_Email"
                            }[e]
                        }
                    },
                    {
                        key: "get",
                        value: function (t, n, r) {
                            return new o(function (o, i) {
                                var u = e.toQueryStr(n || {}),
                                    s = r || "json",
                                    c = new XMLHttpRequest;
                                c.onreadystatechange = function () {
                                        var e = c.status;
                                        4 == c.readyState && (e >= 200 && e < 300 || 304 === e ? o("json" === s ? JSON.parse(c.responseText) : c.responseText) : i({
                                            statusCode: e,
                                            statusText: c.statusText
                                        }))
                                    },
                                    c.open("GET", t + "&" + u, !0),
                                    c.send(null)
                            })
                        }
                    },
                    {
                        key: "post",
                        value: function (t, n, r) {
                            return new o(function (o, i) {
                                var u = e.toQueryStr(n || {}),
                                    s = r || "json",
                                    c = new XMLHttpRequest;
                                c.onreadystatechange = function () {
                                        var e = c.status;
                                        4 == c.readyState && (e >= 200 && e < 300 || 304 === e ? o("json" === s ? JSON.parse(c.responseText) : c.responseText, c) : i(c))
                                    },
                                    c.open("POST", t, !0),
                                    c.setRequestHeader("Content-type", "application/x-www-form-urlencoded;charset=uft-8;"),
                                    c.send(u)
                            })
                        }
                    }
                ]),
                e
        }();
        t.
        default = i,
            window.Async = i
    },
    function (e, t, n) {
        (function (r, o) {
            var i;
            !
            function (r) {
                function u(e) {
                    return "[object Array]" === Object.prototype.toString.call(e)
                }

                function s(e, t) {
                    k.push([e, t]),
                        m || (m = !0, b(function () {
                                for (var e = 0; e < k.length; e++) k[e][0](k[e][1]);
                                k = [],
                                    m = !1
                            },
                            0))
                }

                function c(e) {
                    var t = e.owner,
                        n = t.state_,
                        r = t.data_,
                        o = e[n],
                        i = e.then;
                    if ("function" == typeof o) {
                        n = _;
                        try {
                            r = o(r)
                        } catch (e) {
                            d(i, e)
                        }
                    }
                    a(i, r) || (n === _ && l(i, r), n === T && d(i, r))
                }

                function a(e, t) {
                    var n;
                    try {
                        if (e === t) throw new TypeError("A promises callback cannot return that same promise.");
                        if (t && ("function" == typeof t || "object" == typeof t)) {
                            var r = t.then;
                            if ("function" == typeof r) return r.call(t,
                                function (r) {
                                    n || (n = !0, t !== r ? l(e, r) : f(e, r))
                                },
                                function (t) {
                                    n || (n = !0, d(e, t))
                                }), !0
                        }
                    } catch (t) {
                        return n || d(e, t), !0
                    }
                    return !1
                }

                function l(e, t) {
                    e !== t && a(e, t) || f(e, t)
                }

                function f(e, t) {
                    e.state_ === v && (e.state_ = w, e.data_ = t, s(function (e) {
                            e.state_ = _,
                                p(e)
                        },
                        e))
                }

                function d(e, t) {
                    e.state_ === v && (e.state_ = w, e.data_ = t, s(function (e) {
                            e.state_ = T,
                                p(e)
                        },
                        e))
                }

                function p(e) {
                    var t = e.then_;
                    e.then_ = void 0;
                    for (var n = 0; n < t.length; n++) c(t[n])
                }

                function h(e) {
                    if ("function" != typeof e) throw new TypeError("Promise constructor takes a function argument");
                    if (this instanceof h == !1) throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
                    this.then_ = [],
                        function (e, t) {
                            function n(e) {
                                d(t, e)
                            }
                            try {
                                e(function (e) {
                                        l(t, e)
                                    },
                                    n)
                            } catch (e) {
                                n(e)
                            }
                        }(e, this)
                }
                var g = r.Promise,
                    y = g && "resolve" in g && "reject" in g && "all" in g && "race" in g &&
                    function () {
                        var e;
                        return new g(function (t) {
                                e = t
                            }),
                            "function" == typeof e
                    }();
                void 0 !== t && t ? (t.Promise = y ? g : h, t.Polyfill = h) : void 0 !== (i = function () {
                    return y ? g : h
                }.call(t, n, t, e)) && (e.exports = i);
                var m, v = "pending",
                    w = "sealed",
                    _ = "fulfilled",
                    T = "rejected",
                    b = void 0 !== o ? o : setTimeout,
                    k = [];
                h.prototype = {
                        constructor: h,
                        state_: v,
                        then_: null,
                        data_: void 0,
                        then: function (e, t) {
                            var n = {
                                owner: this,
                                then: new this.constructor(function () {}),
                                fulfilled: e,
                                rejected: t
                            };
                            return this.state_ === _ || this.state_ === T ? s(c, n) : this.then_.push(n),
                                n.then
                        },
                        catch: function (e) {
                            return this.then(null, e)
                        }
                    },
                    h.all = function (e) {
                        if (!u(e)) throw new TypeError("You must pass an array to Promise.all().");
                        return new this(function (t, n) {
                            for (var r, o = [], i = 0, u = 0; u < e.length; u++)(r = e[u]) && "function" == typeof r.then ? r.then(function (e) {
                                return i++,
                                    function (n) {
                                        o[e] = n,
                                            --i || t(o)
                                    }
                            }(u), n) : o[u] = r;
                            i || t(o)
                        })
                    },
                    h.race = function (e) {
                        if (!u(e)) throw new TypeError("You must pass an array to Promise.race().");
                        return new this(function (t, n) {
                            for (var r, o = 0; o < e.length; o++)(r = e[o]) && "function" == typeof r.then ? r.then(t, n) : t(r)
                        })
                    },
                    h.resolve = function (e) {
                        return e && "object" == typeof e && e.constructor === this ? e : new this(function (t) {
                            t(e)
                        })
                    },
                    h.reject = function (e) {
                        return new this(function (t, n) {
                            n(e)
                        })
                    }
            }("undefined" != typeof window ? window : void 0 !== r ? r : "undefined" != typeof self ? self : this)
        }).call(t, n(0), n(3).setImmediate)
    },
    function (e, t, n) {
        function r(e, t) {
            this._id = e,
                this._clearFn = t
        }
        var o = Function.prototype.apply;
        t.setTimeout = function () {
                return new r(o.call(setTimeout, window, arguments), clearTimeout)
            },
            t.setInterval = function () {
                return new r(o.call(setInterval, window, arguments), clearInterval)
            },
            t.clearTimeout = t.clearInterval = function (e) {
                e && e.close()
            },
            r.prototype.unref = r.prototype.ref = function () {},
            r.prototype.close = function () {
                this._clearFn.call(window, this._id)
            },
            t.enroll = function (e, t) {
                clearTimeout(e._idleTimeoutId),
                    e._idleTimeout = t
            },
            t.unenroll = function (e) {
                clearTimeout(e._idleTimeoutId),
                    e._idleTimeout = -1
            },
            t._unrefActive = t.active = function (e) {
                clearTimeout(e._idleTimeoutId);
                var t = e._idleTimeout;
                t >= 0 && (e._idleTimeoutId = setTimeout(function () {
                        e._onTimeout && e._onTimeout()
                    },
                    t))
            },
            n(4),
            t.setImmediate = setImmediate,
            t.clearImmediate = clearImmediate
    },
    function (e, t, n) {
        (function (e, t) {
            !
            function (e, n) {
                "use strict";

                function r(e) {
                    delete s[e]
                }

                function o(e) {
                    if (c) setTimeout(o, 0, e);
                    else {
                        var t = s[e];
                        if (t) {
                            c = !0;
                            try {
                                !
                                function (e) {
                                    var t = e.callback,
                                        r = e.args;
                                    switch (r.length) {
                                        case 0:
                                            t();
                                            break;
                                        case 1:
                                            t(r[0]);
                                            break;
                                        case 2:
                                            t(r[0], r[1]);
                                            break;
                                        case 3:
                                            t(r[0], r[1], r[2]);
                                            break;
                                        default:
                                            t.apply(n, r)
                                    }
                                }(t)
                            } finally {
                                r(e),
                                    c = !1
                            }
                        }
                    }
                }
                if (!e.setImmediate) {
                    var i, u = 1,
                        s = {},
                        c = !1,
                        a = e.document,
                        l = Object.getPrototypeOf && Object.getPrototypeOf(e);
                    l = l && l.setTimeout ? l : e,
                        "[object process]" === {}.toString.call(e.process) ? i = function (e) {
                            t.nextTick(function () {
                                o(e)
                            })
                        } : function () {
                            if (e.postMessage && !e.importScripts) {
                                var t = !0,
                                    n = e.onmessage;
                                return e.onmessage = function () {
                                        t = !1
                                    },
                                    e.postMessage("", "*"),
                                    e.onmessage = n,
                                    t
                            }
                        }() ?
                        function () {
                            var t = "setImmediate$" + Math.random() + "$",
                                n = function (n) {
                                    n.source === e && "string" == typeof n.data && 0 === n.data.indexOf(t) && o(+n.data.slice(t.length))
                                };
                            e.addEventListener ? e.addEventListener("message", n, !1) : e.attachEvent("onmessage", n),
                                i = function (n) {
                                    e.postMessage(t + n, "*")
                                }
                        }() : e.MessageChannel ?
                        function () {
                            var e = new MessageChannel;
                            e.port1.onmessage = function (e) {
                                    o(e.data)
                                },
                                i = function (t) {
                                    e.port2.postMessage(t)
                                }
                        }() : a && "onreadystatechange" in a.createElement("script") ?
                        function () {
                            var e = a.documentElement;
                            i = function (t) {
                                var n = a.createElement("script");
                                n.onreadystatechange = function () {
                                        o(t),
                                            n.onreadystatechange = null,
                                            e.removeChild(n),
                                            n = null
                                    },
                                    e.appendChild(n)
                            }
                        }() : i = function (e) {
                            setTimeout(o, 0, e)
                        },
                        l.setImmediate = function (e) {
                            "function" != typeof e && (e = new Function("" + e));
                            for (var t = new Array(arguments.length - 1), n = 0; n < t.length; n++) t[n] = arguments[n + 1];
                            var r = {
                                callback: e,
                                args: t
                            };
                            return s[u] = r,
                                i(u),
                                u++
                        },
                        l.clearImmediate = r
                }
            }("undefined" == typeof self ? void 0 === e ? this : e : self)
        }).call(t, n(0), n(5))
    },
    function (e, t) {
        function n() {
            throw new Error("setTimeout has not been defined")
        }

        function r() {
            throw new Error("clearTimeout has not been defined")
        }

        function o(e) {
            if (c === setTimeout) return setTimeout(e, 0);
            if ((c === n || !c) && setTimeout) return c = setTimeout,
                setTimeout(e, 0);
            try {
                return c(e, 0)
            } catch (t) {
                try {
                    return c.call(null, e, 0)
                } catch (t) {
                    return c.call(this, e, 0)
                }
            }
        }

        function i() {
            if (!p) {
                var e = o(function () {
                    p && f && (p = !1, f.length ? d = f.concat(d) : h = -1, d.length && i())
                });
                p = !0;
                for (var t = d.length; t;) {
                    for (f = d, d = []; ++h < t;) f && f[h].run();
                    h = -1,
                        t = d.length
                }
                f = null,
                    p = !1,
                    function (e) {
                        if (a === clearTimeout) return clearTimeout(e);
                        if ((a === r || !a) && clearTimeout) return a = clearTimeout,
                            clearTimeout(e);
                        try {
                            a(e)
                        } catch (t) {
                            try {
                                return a.call(null, e)
                            } catch (t) {
                                return a.call(this, e)
                            }
                        }
                    }(e)
            }
        }

        function u(e, t) {
            this.fun = e,
                this.array = t
        }

        function s() {}
        var c, a, l = e.exports = {};
        !
        function () {
            try {
                c = "function" == typeof setTimeout ? setTimeout : n
            } catch (e) {
                c = n
            }
            try {
                a = "function" == typeof clearTimeout ? clearTimeout : r
            } catch (e) {
                a = r
            }
        }();
        var f, d = [],
            p = !1,
            h = -1;
        l.nextTick = function (e) {
                var t = new Array(arguments.length - 1);
                if (arguments.length > 1)
                    for (var n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
                d.push(new u(e, t)),
                    1 !== d.length || p || o(i)
            },
            u.prototype.run = function () {
                this.fun.apply(null, this.array)
            },
            l.title = "browser",
            l.browser = !0,
            l.env = {},
            l.argv = [],
            l.version = "",
            l.versions = {},
            l.on = s,
            l.addListener = s,
            l.once = s,
            l.off = s,
            l.removeListener = s,
            l.removeAllListeners = s,
            l.emit = s,
            l.prependListener = s,
            l.prependOnceListener = s,
            l.listeners = function (e) {
                return []
            },
            l.binding = function (e) {
                throw new Error("process.binding is not supported")
            },
            l.cwd = function () {
                return "/"
            },
            l.chdir = function (e) {
                throw new Error("process.chdir is not supported")
            },
            l.umask = function () {
                return 0
            }
    }
]);