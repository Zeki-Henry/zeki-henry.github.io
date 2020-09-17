window.__require = function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var b = o.split("/");
        b = b[b.length - 1];
        if (!t[b]) {
          var a = "function" == typeof __require && __require;
          if (!u && a) return a(b, !0);
          if (i) return i(b, !0);
          throw new Error("Cannot find module '" + o + "'");
        }
        o = b;
      }
      var f = n[o] = {
        exports: {}
      };
      t[o][0].call(f.exports, function(e) {
        var n = t[o][1][e];
        return s(n || e);
      }, f, f.exports, e, t, n, r);
    }
    return n[o].exports;
  }
  var i = "function" == typeof __require && __require;
  for (var o = 0; o < r.length; o++) s(r[o]);
  return s;
}({
  en: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "7de64Ca5mpOW7sNTR1mg/Vy", "en");
    "use strict";
    window.i18n || (window.i18n = {});
    window.i18n.languages || (window.i18n.languages = {});
    window.i18n.languages.en = {
      label_text: {
        hello: "Hello!",
        bye: "Good Bye!",
        zh: "Chinese",
        en: "English",
        forestAnimal: "Forest Animal",
        close: "Close",
        topScore: "High score:",
        level: "Stage: ",
        target: "  Target: ",
        targetScore: "Target score is:",
        lianxiaoTip: "{0} Blocks {1} points",
        rewardEndGame1: "Bonus {0}",
        rewardEndGame2: "{0} Stars Remaining",
        itemBombTip: "Bomb 3X3 stars",
        itemChangeColorTip: "Draw any color you want on a star",
        itemRefreshTip: "It costs 5 diamonds to spin"
      }
    };
    cc._RF.pop();
  }, {} ],
  zh: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "696a2A3R+pB5afC7IfqxV54", "zh");
    "use strict";
    window.i18n || (window.i18n = {});
    window.i18n.languages || (window.i18n.languages = {});
    window.i18n.languages.zh = {
      label_text: {
        hello: "\u4f60\u597d\uff01",
        bye: "\u518d\u89c1\uff01",
        zh: "\u4e2d\u6587",
        en: "\u82f1\u6587",
        forestAnimal: "\u52a8\u68ee",
        close: "\u5173\u95ed",
        topScore: "\u5386\u53f2\u6700\u9ad8\u5206:",
        level: "\u5173\u5361: ",
        target: "  \u76ee\u6807: ",
        targetScore: "\u76ee\u6807\u5206\u6570:",
        lianxiaoTip: "{0}\u8fde\u6d88{1}\u5206",
        rewardEndGame1: "\u5956\u52b1{0}\u5206",
        rewardEndGame2: "\u5269\u4f59{0}\u9897\u661f\u661f",
        itemBombTip: "\u70b8\u63893X3\u661f\u661f",
        itemChangeColorTip: "\u9009\u62e9\u9700\u8981\u53d8\u8272\u7684\u661f\u661f",
        itemRefreshTip: "\u65cb\u8f6c\u82b1\u8d395\u9897\u94bb\u77f3"
      }
    };
    cc._RF.pop();
  }, {} ]
}, {}, [ "en", "zh" ]);