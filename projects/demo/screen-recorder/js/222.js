!(function () {
    function t(t) {
        return t && t.__esModule ? t.default : t;
    }
    function e(t, e, r, n, o, i, a) {
        try {
            var s = t[i](a),
                c = s.value;
        } catch (t) {
            return void r(t);
        }
        s.done ? e(c) : Promise.resolve(c).then(n, o);
    }
    function r(t) {
        return function () {
            var r = this,
                n = arguments;
            return new Promise(function (o, i) {
                var a = t.apply(r, n);
                function s(t) {
                    e(a, o, i, s, c, "next", t);
                }
                function c(t) {
                    e(a, o, i, s, c, "throw", t);
                }
                s(void 0);
            });
        };
    }
    function n(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
    }
    function o(t, e) {
        for (var r = 0; r < e.length; r++) {
            var n = e[r];
            (n.enumerable = n.enumerable || !1), (n.configurable = !0), "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n);
        }
    }
    function i(t, e, r) {
        return e && o(t.prototype, e), r && o(t, r), t;
    }
    var a = {},
        s = (function (t) {
            var e,
                r = Object.prototype,
                n = r.hasOwnProperty,
                o = "function" == typeof Symbol ? Symbol : {},
                i = o.iterator || "@@iterator",
                a = o.asyncIterator || "@@asyncIterator",
                s = o.toStringTag || "@@toStringTag";
            function c(t, e, r) {
                return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e];
            }
            try {
                c({}, "");
            } catch (t) {
                c = function (t, e, r) {
                    return (t[e] = r);
                };
            }
            function u(t, e, r, n) {
                var o = e && e.prototype instanceof m ? e : m,
                    i = Object.create(o.prototype),
                    a = new R(n || []);
                return (
                    (i._invoke = (function (t, e, r) {
                        var n = h;
                        return function (o, i) {
                            if (n === f) throw new Error("Generator is already running");
                            if (n === p) {
                                if ("throw" === o) throw i;
                                return j();
                            }
                            for (r.method = o, r.arg = i; ; ) {
                                var a = r.delegate;
                                if (a) {
                                    var s = x(a, r);
                                    if (s) {
                                        if (s === v) continue;
                                        return s;
                                    }
                                }
                                if ("next" === r.method) r.sent = r._sent = r.arg;
                                else if ("throw" === r.method) {
                                    if (n === h) throw ((n = p), r.arg);
                                    r.dispatchException(r.arg);
                                } else "return" === r.method && r.abrupt("return", r.arg);
                                n = f;
                                var c = d(t, e, r);
                                if ("normal" === c.type) {
                                    if (((n = r.done ? p : l), c.arg === v)) continue;
                                    return { value: c.arg, done: r.done };
                                }
                                "throw" === c.type && ((n = p), (r.method = "throw"), (r.arg = c.arg));
                            }
                        };
                    })(t, r, a)),
                    i
                );
            }
            function d(t, e, r) {
                try {
                    return { type: "normal", arg: t.call(e, r) };
                } catch (t) {
                    return { type: "throw", arg: t };
                }
            }
            t.wrap = u;
            var h = "suspendedStart",
                l = "suspendedYield",
                f = "executing",
                p = "completed",
                v = {};
            function m() {}
            function g() {}
            function y() {}
            var w = {};
            c(w, i, function () {
                return this;
            });
            var L = Object.getPrototypeOf,
                _ = L && L(L(T([])));
            _ && _ !== r && n.call(_, i) && (w = _);
            var b = (y.prototype = m.prototype = Object.create(w));
            function k(t) {
                ["next", "throw", "return"].forEach(function (e) {
                    c(t, e, function (t) {
                        return this._invoke(e, t);
                    });
                });
            }
            function S(t, e) {
                function r(o, i, a, s) {
                    var c = d(t[o], t, i);
                    if ("throw" !== c.type) {
                        var u = c.arg,
                            h = u.value;
                        return h && "object" == typeof h && n.call(h, "__await")
                            ? e.resolve(h.__await).then(
                                  function (t) {
                                      r("next", t, a, s);
                                  },
                                  function (t) {
                                      r("throw", t, a, s);
                                  }
                              )
                            : e.resolve(h).then(
                                  function (t) {
                                      (u.value = t), a(u);
                                  },
                                  function (t) {
                                      return r("throw", t, a, s);
                                  }
                              );
                    }
                    s(c.arg);
                }
                var o;
                this._invoke = function (t, n) {
                    function i() {
                        return new e(function (e, o) {
                            r(t, n, e, o);
                        });
                    }
                    return (o = o ? o.then(i, i) : i());
                };
            }
            function x(t, r) {
                var n = t.iterator[r.method];
                if (n === e) {
                    if (((r.delegate = null), "throw" === r.method)) {
                        if (t.iterator.return && ((r.method = "return"), (r.arg = e), x(t, r), "throw" === r.method)) return v;
                        (r.method = "throw"), (r.arg = new TypeError("The iterator does not provide a 'throw' method"));
                    }
                    return v;
                }
                var o = d(n, t.iterator, r.arg);
                if ("throw" === o.type) return (r.method = "throw"), (r.arg = o.arg), (r.delegate = null), v;
                var i = o.arg;
                return i
                    ? i.done
                        ? ((r[t.resultName] = i.value), (r.next = t.nextLoc), "return" !== r.method && ((r.method = "next"), (r.arg = e)), (r.delegate = null), v)
                        : i
                    : ((r.method = "throw"), (r.arg = new TypeError("iterator result is not an object")), (r.delegate = null), v);
            }
            function E(t) {
                var e = { tryLoc: t[0] };
                1 in t && (e.catchLoc = t[1]), 2 in t && ((e.finallyLoc = t[2]), (e.afterLoc = t[3])), this.tryEntries.push(e);
            }
            function O(t) {
                var e = t.completion || {};
                (e.type = "normal"), delete e.arg, (t.completion = e);
            }
            function R(t) {
                (this.tryEntries = [{ tryLoc: "root" }]), t.forEach(E, this), this.reset(!0);
            }
            function T(t) {
                if (t) {
                    var r = t[i];
                    if (r) return r.call(t);
                    if ("function" == typeof t.next) return t;
                    if (!isNaN(t.length)) {
                        var o = -1,
                            a = function r() {
                                for (; ++o < t.length; ) if (n.call(t, o)) return (r.value = t[o]), (r.done = !1), r;
                                return (r.value = e), (r.done = !0), r;
                            };
                        return (a.next = a);
                    }
                }
                return { next: j };
            }
            function j() {
                return { value: e, done: !0 };
            }
            return (
                (g.prototype = y),
                c(b, "constructor", y),
                c(y, "constructor", g),
                (g.displayName = c(y, s, "GeneratorFunction")),
                (t.isGeneratorFunction = function (t) {
                    var e = "function" == typeof t && t.constructor;
                    return !!e && (e === g || "GeneratorFunction" === (e.displayName || e.name));
                }),
                (t.mark = function (t) {
                    return Object.setPrototypeOf ? Object.setPrototypeOf(t, y) : ((t.__proto__ = y), c(t, s, "GeneratorFunction")), (t.prototype = Object.create(b)), t;
                }),
                (t.awrap = function (t) {
                    return { __await: t };
                }),
                k(S.prototype),
                c(S.prototype, a, function () {
                    return this;
                }),
                (t.AsyncIterator = S),
                (t.async = function (e, r, n, o, i) {
                    void 0 === i && (i = Promise);
                    var a = new S(u(e, r, n, o), i);
                    return t.isGeneratorFunction(r)
                        ? a
                        : a.next().then(function (t) {
                              return t.done ? t.value : a.next();
                          });
                }),
                k(b),
                c(b, s, "Generator"),
                c(b, i, function () {
                    return this;
                }),
                c(b, "toString", function () {
                    return "[object Generator]";
                }),
                (t.keys = function (t) {
                    var e = [];
                    for (var r in t) e.push(r);
                    return (
                        e.reverse(),
                        function r() {
                            for (; e.length; ) {
                                var n = e.pop();
                                if (n in t) return (r.value = n), (r.done = !1), r;
                            }
                            return (r.done = !0), r;
                        }
                    );
                }),
                (t.values = T),
                (R.prototype = {
                    constructor: R,
                    reset: function (t) {
                        if (((this.prev = 0), (this.next = 0), (this.sent = this._sent = e), (this.done = !1), (this.delegate = null), (this.method = "next"), (this.arg = e), this.tryEntries.forEach(O), !t))
                            for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = e);
                    },
                    stop: function () {
                        this.done = !0;
                        var t = this.tryEntries[0].completion;
                        if ("throw" === t.type) throw t.arg;
                        return this.rval;
                    },
                    dispatchException: function (t) {
                        if (this.done) throw t;
                        var r = this;
                        function o(n, o) {
                            return (s.type = "throw"), (s.arg = t), (r.next = n), o && ((r.method = "next"), (r.arg = e)), !!o;
                        }
                        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                            var a = this.tryEntries[i],
                                s = a.completion;
                            if ("root" === a.tryLoc) return o("end");
                            if (a.tryLoc <= this.prev) {
                                var c = n.call(a, "catchLoc"),
                                    u = n.call(a, "finallyLoc");
                                if (c && u) {
                                    if (this.prev < a.catchLoc) return o(a.catchLoc, !0);
                                    if (this.prev < a.finallyLoc) return o(a.finallyLoc);
                                } else if (c) {
                                    if (this.prev < a.catchLoc) return o(a.catchLoc, !0);
                                } else {
                                    if (!u) throw new Error("try statement without catch or finally");
                                    if (this.prev < a.finallyLoc) return o(a.finallyLoc);
                                }
                            }
                        }
                    },
                    abrupt: function (t, e) {
                        for (var r = this.tryEntries.length - 1; r >= 0; --r) {
                            var o = this.tryEntries[r];
                            if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) {
                                var i = o;
                                break;
                            }
                        }
                        i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null);
                        var a = i ? i.completion : {};
                        return (a.type = t), (a.arg = e), i ? ((this.method = "next"), (this.next = i.finallyLoc), v) : this.complete(a);
                    },
                    complete: function (t, e) {
                        if ("throw" === t.type) throw t.arg;
                        return (
                            "break" === t.type || "continue" === t.type
                                ? (this.next = t.arg)
                                : "return" === t.type
                                ? ((this.rval = this.arg = t.arg), (this.method = "return"), (this.next = "end"))
                                : "normal" === t.type && e && (this.next = e),
                            v
                        );
                    },
                    finish: function (t) {
                        for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                            var r = this.tryEntries[e];
                            if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), O(r), v;
                        }
                    },
                    catch: function (t) {
                        for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                            var r = this.tryEntries[e];
                            if (r.tryLoc === t) {
                                var n = r.completion;
                                if ("throw" === n.type) {
                                    var o = n.arg;
                                    O(r);
                                }
                                return o;
                            }
                        }
                        throw new Error("illegal catch attempt");
                    },
                    delegateYield: function (t, r, n) {
                        return (this.delegate = { iterator: T(t), resultName: r, nextLoc: n }), "next" === this.method && (this.arg = e), v;
                    },
                }),
                t
            );
        })(a);
    try {
        regeneratorRuntime = s;
    } catch (t) {
        "object" == typeof globalThis ? (globalThis.regeneratorRuntime = s) : Function("r", "regeneratorRuntime = r")(s);
    }
    var c = (function () {
            "use strict";
            function e() {
                return (
                    n(this, e),
                    e.instance ||
                        ((this.set = {
                            start: document.getElementById("start"),
                            stop: document.getElementById("stop"),
                            preview: document.querySelector("#preview"),
                            download: document.querySelector("#download"),
                            mimeChoiceWrapper: document.querySelector(".sh__choice"),
                            videoWrapper: document.querySelector(".sh__video--wrp"),
                            videoOpacitySheet: document.querySelector(".sh__video--sheet"),
                            dropdownToggle: document.querySelector(".sh__dropdown--btn"),
                            dropdownList: document.querySelector(".sh__dropdown__list"),
                            dropdownDefaultOption: document.querySelector(".sh__dropdown--defaultOption"),
                            dropdownOptions: document.querySelectorAll(".sh__dropdown__list--item"),
                            dropdownChevron: document.querySelector(".sh__dropdown--icon.chevron"),
                            headerText: document.querySelector(".sh__header"),
                            toast: document.querySelector(".sh__toast"),
                            mime: null,
                            mediaRecorder: null,
                        }),
                        (e.instance = this)),
                    e.instance
                );
            }
            return (
                i(e, [
                    {
                        key: "toggleDropdown",
                        value: function () {
                            this.set.dropdownToggle.classList.toggle("toggled"), this.set.dropdownChevron.classList.toggle("toggled"), this.set.dropdownList.classList.toggle("open");
                        },
                    },
                    {
                        key: "getSelectedValue",
                        value: function (t) {
                            var e = t,
                                r = e.getAttribute("data-value");
                            "" !== r ? this.set.start.classList.add("visible") : this.set.start.classList.remove("visible"), (this.set.dropdownDefaultOption.textContent = e.innerText), (this.set.mime = r);
                        },
                    },
                    {
                        key: "getRandomString",
                        value: function (t) {
                            for (var e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", r = "", n = 0; n < t; n++) r += e.charAt(Math.floor(Math.random() * e.length));
                            return r;
                        },
                    },
                    {
                        key: "appendStatusNotification",
                        value: function (t) {
                            var e = this,
                                r = "start" === t ? "Started recording" : "stop" === t ? "Stopped recording" : "";
                            (this.set.toast.textContent = r),
                                this.set.toast.classList.add("active"),
                                setTimeout(function () {
                                    e.set.toast.classList.remove("active");
                                }, 2e3);
                        },
                    },
                    {
                        key: "createRecorder",
                        value: function (t) {
                            var e = this,
                                r = [];
                            return (
                                (this.set.mediaRecorder = new MediaRecorder(t)),
                                (this.set.mediaRecorder.ondataavailable = function (t) {
                                    t.data.size > 0 && r.push(t.data);
                                }),
                                (this.set.mediaRecorder.onstop = function () {
                                    e.bakeVideo(r), (r = []);
                                }),
                                this.set.mediaRecorder.start(15),
                                this.set.mediaRecorder
                            );
                        },
                    },
                    {
                        key: "recordScreen",
                        value: function () {
                            return r(
                                t(a).mark(function e() {
                                    return t(a).wrap(function (t) {
                                        for (;;)
                                            switch ((t.prev = t.next)) {
                                                case 0:
                                                    return (t.next = 2), navigator.mediaDevices.getDisplayMedia({ audio: !0, video: { mediaSource: "screen" } });
                                                case 2:
                                                    return t.abrupt("return", t.sent);
                                                case 3:
                                                case "end":
                                                    return t.stop();
                                            }
                                    }, e);
                                })
                            )();
                        },
                    },
                    {
                        key: "bakeVideo",
                        value: function (t) {
                            var e = new Blob(t, { type: "video/" + this.set.mime }),
                                r = this.getRandomString(15);
                            (this.set.download.href = URL.createObjectURL(e)),
                                (this.set.download.download = "".concat(r, ".").concat(this.set.mime)),
                                this.set.videoOpacitySheet.remove(),
                                (this.set.preview.autoplay = !1),
                                (this.set.preview.controls = !0),
                                (this.set.preview.src = URL.createObjectURL(e)),
                                URL.revokeObjectURL(e);
                        },
                    },
                    {
                        key: "init",
                        value: function () {
                            var e,
                                n = this,
                                o = this,
                                i = this,
                                s = this;
                            this.set.dropdownToggle.addEventListener("click", function () {
                                n.toggleDropdown();
                            }),
                                document.addEventListener("click", function (t) {
                                    o.set.dropdownToggle.classList.contains("toggled") && (t.target.closest(".sh__dropdown--btn") || o.toggleDropdown());
                                }),
                                this.set.dropdownOptions.forEach(function (t) {
                                    var e = i;
                                    t.addEventListener("click", function () {
                                        e.getSelectedValue(t), e.toggleDropdown();
                                    });
                                }),
                                this.set.start.addEventListener(
                                    "click",
                                    ((e = r(
                                        t(a).mark(function e() {
                                            var r, n;
                                            return t(a).wrap(function (t) {
                                                for (;;)
                                                    switch ((t.prev = t.next)) {
                                                        case 0:
                                                            return (t.next = 2), _this.recordScreen();
                                                        case 2:
                                                            (r = t.sent),
                                                                (n = "video/" + _this.set.mime),
                                                                (_this.set.mediaRecorder = _this.createRecorder(r, n)),
                                                                (_this.set.preview.srcObject = r),
                                                                (_this.set.preview.captureStream = _this.set.preview.captureStream || _this.set.preview.mozCaptureStream),
                                                                _this.set.mimeChoiceWrapper.classList.add("hide"),
                                                                _this.set.headerText.classList.add("is-recording"),
                                                                _this.set.preview.classList.add("visible"),
                                                                _this.set.stop.classList.add("visible"),
                                                                _this.appendStatusNotification("start");
                                                        case 12:
                                                        case "end":
                                                            return t.stop();
                                                    }
                                            }, e);
                                        })
                                    )),
                                    function () {
                                        return e.apply(this, arguments);
                                    })
                                ),
                                this.set.stop.addEventListener("click", function () {
                                    s.set.mediaRecorder.stop(),
                                        (s.set.preview.srcObject = null),
                                        s.set.headerText.classList.remove("is-recording"),
                                        s.set.headerText.classList.add("is-reviewing"),
                                        s.set.stop.classList.remove("visible"),
                                        s.set.download.classList.add("visible"),
                                        s.appendStatusNotification("stop");
                                });
                        },
                    },
                ]),
                e
            );
        })(),
        u = (function () {
            "use strict";
            function t() {
                return (
                    n(this, t),
                    t.instance ||
                        ((this.set = {
                            toggler: document.querySelector(".sh__toggler"),
                            icons: document.querySelectorAll(".sh__toggler--icon"),
                            moon: document.querySelector(".sh__toggler-btn--moon"),
                            sun: document.querySelector(".sh__toggler-btn--sun"),
                        }),
                        (t.instance = this)),
                    t.instance
                );
            }
            return (
                i(t, [
                    {
                        key: "activateDarkMode",
                        value: function () {
                            (document.body.dataset.theme = "dark"), this.set.moon.classList.remove("active"), this.set.sun.classList.add("active");
                        },
                    },
                    {
                        key: "activateLightMode",
                        value: function () {
                            (document.body.dataset.theme = "light"), this.set.sun.classList.remove("active"), this.set.moon.classList.add("active");
                        },
                    },
                    {
                        key: "getPreferredTheme",
                        value: function () {
                            window.matchMedia("(prefers-color-scheme: dark)").matches ? this.activateDarkMode() : this.activateLightMode();
                        },
                    },
                    {
                        key: "init",
                        value: function () {
                            var t = this,
                                e = this;
                            this.getPreferredTheme(),
                                this.set.toggler.addEventListener("click", function () {
                                    document.body.dataset.theme && ("light" === document.body.dataset.theme ? t.activateDarkMode() : t.activateLightMode());
                                }),
                                window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function (t) {
                                    t.matches ? e.activateDarkMode() : e.activateLightMode();
                                });
                        },
                    },
                ]),
                t
            );
        })(),
        d = {};
    (d.recorder = new c()), (d.theme = new u()), d.recorder.init(), d.theme.init();
})();
//# sourceMappingURL=index.e45233d7.js.map
