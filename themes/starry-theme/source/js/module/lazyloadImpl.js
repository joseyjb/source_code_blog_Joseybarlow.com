//在jquery的lazyload基础上修改了部分内容，调整了图片没有指定大小时候的小bug
//此处在2.1版本之后已经弃用，改用大佬开源的插件
/*
!function (t) {
    "function" == typeof define && define.amd ? define(["jquery"], t) : t(window.jQuery || window.Zepto)
}(function (t, e) {
    var a, r, n = window, o = t(n), l = {
        threshold: 0,
        failure_limit: 0,
        event: "scroll",
        effect: "show",
        effect_params: null,
        container: n,
        data_attribute: "original",
        data_srcset_attribute: "original-srcset",
        skip_invisible: !0,
        appear: i,
        load: i,
        vertical_only: !1,
        check_appear_throttle_time: 300,
        url_rewriter_fn: i,
        no_fake_img_loader: !1,
        placeholder_data_img: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC",
        placeholder_real_img: "http://ditu.baidu.cn/yyfm/lazyload/0.0.1/img/placeholder.png"
    };

    function i() {
    }

    function c(t, e) {
        return (e._$container == o ? ("innerHeight" in n ? n.innerHeight : o.height()) + o.scrollTop() : e._$container.offset().top + e._$container.height()) <= t.offset().top - e.threshold
    }

    function f(t, e) {
        return (e._$container == o ? o.scrollTop() : e._$container.offset().top) >= t.offset().top + e.threshold + t.height()
    }

    function _(e, a) {
        var r = 0;
        e.each(function (l, i) {
            var _ = e.eq(l);
            if (!(_.width() <= 0 && _.height() <= 0 || "none" === _.css("display"))) if (a.vertical_only) if (f(_, a)) ; else if (c(_, a)) {
                if (++r > a.failure_limit) return !1
            } else d(); else if (f(_, a) || function (e, a) {
                return (a._$container == o ? t.fn.scrollLeft ? o.scrollLeft() : n.pageXOffset : a._$container.offset().left) >= e.offset().left + a.threshold + e.width()
            }(_, a)) ; else if (c(_, a) || function (e, a) {
                return (a._$container == o ? o.width() + (t.fn.scrollLeft ? o.scrollLeft() : n.pageXOffset) : a._$container.offset().left + a._$container.width()) <= e.offset().left - a.threshold
            }(_, a)) {
                if (++r > a.failure_limit) return !1
            } else d();

            function d() {
                _.trigger("_lazyload_appear"), r = 0
            }
        })
    }

    function d(t) {
        return t.filter(function (e) {
            return !t.eq(e).data("_lazyload_loadStarted")
        })
    }

    r = Object.prototype.toString, a = function (t) {
        return r.call(t).replace("[object ", "").replace("]", "")
    }, t.fn.hasOwnProperty("lazyload") || (t.fn.lazyload = function (e) {
        var r, c, f, s = this;
        return t.isPlainObject(e) || (e = {}), t.each(l, function (r, i) {
            var c = a(e[r]);
            -1 != t.inArray(r, ["threshold", "failure_limit", "check_appear_throttle_time"]) ? "String" == c ? e[r] = parseInt(e[r], 10) : "Number" != c && (e[r] = i) : "container" == r ? (e.hasOwnProperty(r) ? e[r] == n || e[r] == document ? e._$container = o : e._$container = t(e[r]) : e._$container = o, delete e.container) : !l.hasOwnProperty(r) || e.hasOwnProperty(r) && c == a(l[r]) || (e[r] = i)
        }), r = "scroll" == e.event, f = 0 == e.check_appear_throttle_time ? _ : function (t, e) {
            var a, r, n, o, l = 0;
            return function () {
                a = this, r = arguments;
                var t = new Date - l;
                return o || (t >= e ? i() : o = setTimeout(i, e - t)), n
            };

            function i() {
                o = 0, l = +new Date, n = t.apply(a, r), a = null, r = null
            }
        }(_, e.check_appear_throttle_time), c = r || "scrollstart" == e.event || "scrollstop" == e.event, s.each(function (a, r) {
            var n = this, o = s.eq(a), l = o.attr("src"), f = o.attr("data-" + e.data_attribute),
                _ = e.url_rewriter_fn == i ? f : e.url_rewriter_fn.call(n, o, f),
                u = o.attr("data-" + e.data_srcset_attribute), h = o.is("img");
            if (o.data("_lazyload_loadStarted") || l == _) return o.data("_lazyload_loadStarted", !0), void (s = d(s));
            o.data("_lazyload_loadStarted", !1), h && !l && o.one("error", function () {
                o.attr("src", e.placeholder_real_img)
            }).attr("src", e.placeholder_data_img), o.one("_lazyload_appear", function () {
                var a, r = t.isArray(e.effect_params);

                function l() {
                    a && o.hide(), h ? (u && o.attr("srcset", u), _ && o.attr("src", _) && o.removeAttr("style")) : o.css("background-image", 'url("' + _ + '")'), a && o[e.effect].apply(o, r ? e.effect_params : []), s = d(s)
                }

                o.data("_lazyload_loadStarted") || (a = "show" != e.effect && t.fn[e.effect] && (!e.effect_params || r && 0 == e.effect_params.length), e.appear != i && e.appear.call(n, o, s.length, e), o.data("_lazyload_loadStarted", !0), e.no_fake_img_loader || u ? (e.load != i && o.one("load", function () {
                    e.load.call(n, o, s.length, e)
                }), l()) : t("<img />").one("load", function () {
                    l(), e.load != i && e.load.call(n, o, s.length, e)
                }).attr("src", _))
            }), c || o.on(e.event, function () {
                o.data("_lazyload_loadStarted") || o.trigger("_lazyload_appear")
            })
        }), c && e._$container.on(e.event, function () {
            f(s, e)
        }), o.on("resize load", function () {
            f(s, e)
        }), t(function () {
            f(s, e)
        }), this
    })
});
let imgs = $(".post-content.blog-markdown img");
imgs.css("width", "100%");
if (imgs.length > 0) {
    imgs.each(function (i, ele) {
        let src = $(ele).attr("src");
        $(ele).attr("data-original", src).removeAttr("src")
    });
    imgs.lazyload({effect: "fadeIn"})
}*/
