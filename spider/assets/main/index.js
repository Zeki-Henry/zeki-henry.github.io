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
  AccountModel: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "79d9cIGqjFG/orc4yfW5bP3", "AccountModel");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.AccountModel = void 0;
    var GManager_1 = require("../GManager");
    var routeName = "authen.";
    var NAMESPACE_UUID = "AccountModel";
    var AccountModel;
    (function(AccountModel) {
      AccountModel.guid = "";
      AccountModel.nickname = "";
      AccountModel.ticket = "";
      AccountModel.sex = 0;
      AccountModel.face = "";
      AccountModel.money = 0;
      AccountModel.account = "";
      function LoginReq() {
        GManager_1.GManager.socket.notfiy(routeName + "loginreq", "LoginReq", {
          type: 1,
          account: AccountModel.account,
          password: "a009e5692b8d403d570532a4024ae22c"
        });
      }
      AccountModel.LoginReq = LoginReq;
      function loginRes(msg) {
        GManager_1.GManager.log(msg);
        !msg.code && GManager_1.GManager.dispatchEvent("VERITY_TICKET_SUCC", {
          ret: 0
        });
      }
      function regModel() {
        return AccountModel;
      }
      AccountModel.regModel = regModel;
      function unregModel() {
        GManager_1.GManager.removeEvtListenerByUuid(NAMESPACE_UUID);
      }
      AccountModel.unregModel = unregModel;
    })(AccountModel = exports.AccountModel || (exports.AccountModel = {}));
    cc._RF.pop();
  }, {
    "../GManager": "GManager"
  } ],
  AudioMgr: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "4c529HeLqRJ2rswnUdb1KWv", "AudioMgr");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var BaseFunc_1 = require("./BaseFunc");
    var GManager_1 = require("../GManager");
    var AudioMgr = function() {
      function AudioMgr() {}
      AudioMgr.bgmVolume = 1;
      AudioMgr.sfxVolume = 1;
      AudioMgr.bgmSwitch = true;
      AudioMgr.sfxSwitch = true;
      AudioMgr.bgmAudioID = null;
      AudioMgr.init = function() {
        this.bgmVolume = BaseFunc_1.BaseFunc.load("bgmVolume", 1);
        this.sfxVolume = BaseFunc_1.BaseFunc.load("sfxVolume", 1);
        cc.audioEngine.setMusicVolume(this.bgmVolume);
        cc.audioEngine.setEffectsVolume(this.sfxVolume);
        cc.game.on(cc.game.EVENT_HIDE, function() {
          cc.audioEngine.pauseAll();
          cc.audioEngine.setVolume(this.bgmAudioID, 0);
        }.bind(this));
        cc.game.on(cc.game.EVENT_SHOW, function() {
          cc.audioEngine.resumeAll();
          cc.audioEngine.setVolume(this.bgmAudioID, this.bgmVolume);
        }.bind(this));
      };
      AudioMgr.playBGM = function(url, loop) {
        void 0 === loop && (loop = true);
        null != this.bgmAudioID && cc.audioEngine.stop(this.bgmAudioID);
        GManager_1.GManager.loadAudio(url, function(clip) {
          this.bgmAudioID = cc.audioEngine.playMusic(clip, loop);
        }.bind(this));
      };
      AudioMgr.stopBGM = function() {
        null != this.bgmAudioID && cc.audioEngine.stop(this.bgmAudioID);
        this.bgmAudioID = null;
      };
      AudioMgr.playSFX = function(url) {
        this.sfxVolume > 0 && GManager_1.GManager.loadAudio(url, function(clip) {
          var effectId = cc.audioEngine.playEffect(clip, false);
        }.bind(this));
      };
      AudioMgr.getSFXVolume = function() {
        return this.sfxVolume;
      };
      AudioMgr.setSFXVolume = function(v) {
        if (this.sfxSwitch) {
          BaseFunc_1.BaseFunc.save("sfxVolume", v);
          this.sfxVolume = v;
          cc.audioEngine.setEffectsVolume(this.sfxVolume);
        } else cc.audioEngine.setEffectsVolume(0);
      };
      AudioMgr.getBGMVolume = function() {
        return this.bgmVolume;
      };
      AudioMgr.setBGMVolume = function(v) {
        cc.log("setBGMVolume v", v);
        cc.log("setBGMVolume AudioMgr.bgmSwitch", this.bgmSwitch);
        null != this.bgmAudioID && (v > 0 ? cc.audioEngine.resumeMusic() : cc.audioEngine.pauseMusic());
        if (this.bgmSwitch) {
          BaseFunc_1.BaseFunc.save("bgmVolume", v);
          this.bgmVolume = v;
          cc.audioEngine.setMusicVolume(v);
        } else cc.audioEngine.setMusicVolume(0);
      };
      AudioMgr.pauseAll = function() {
        cc.audioEngine.pauseAll();
      };
      AudioMgr.resumeAll = function() {
        cc.audioEngine.resumeAll();
      };
      AudioMgr = __decorate([ ccclass ], AudioMgr);
      return AudioMgr;
    }();
    exports.default = AudioMgr;
    cc._RF.pop();
  }, {
    "../GManager": "GManager",
    "./BaseFunc": "BaseFunc"
  } ],
  BaseFunc: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "19661Db7glD3bF0+amCNftI", "BaseFunc");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.BaseFunc = exports.NODE_TYPE = void 0;
    var GManager_1 = require("../GManager");
    var SERVER_TIME_DIFF = 0;
    var _canvas = null;
    var _nodeNames = [ "BackgroundNode", "MainNode", "MenuNode", "PopNode", "FlushNode" ];
    var NODE_TYPE;
    (function(NODE_TYPE) {
      NODE_TYPE[NODE_TYPE["BACKGROUND_NODE"] = 0] = "BACKGROUND_NODE";
      NODE_TYPE[NODE_TYPE["MAIN_NODE"] = 1] = "MAIN_NODE";
      NODE_TYPE[NODE_TYPE["MENU_NODE"] = 2] = "MENU_NODE";
      NODE_TYPE[NODE_TYPE["POP_NODE"] = 3] = "POP_NODE";
      NODE_TYPE[NODE_TYPE["FLUSH_NODE"] = 4] = "FLUSH_NODE";
    })(NODE_TYPE = exports.NODE_TYPE || (exports.NODE_TYPE = {}));
    var BaseFunc;
    (function(BaseFunc) {
      function checkNetwork(handler, must) {
        void 0 === must && (must = false);
        console.log("[checkNetwork]");
        if (!must && cc.sys.getNetworkType() != cc.sys.NetworkType.NONE) {
          console.log("[checkNetwork] handler");
          handler && handler();
          return;
        }
      }
      BaseFunc.checkNetwork = checkNetwork;
      function serverDate() {
        return new Date(Date.now() + 1e3 * SERVER_TIME_DIFF);
      }
      BaseFunc.serverDate = serverDate;
      function serverUnixTime() {
        return Math.round(Date.now() / 1e3) + SERVER_TIME_DIFF;
      }
      BaseFunc.serverUnixTime = serverUnixTime;
      function parseSearch() {
        var search = window.location.search;
        var args = {};
        if (-1 != search.indexOf("?")) {
          var query = search.substr(1);
          var pairs = query.split("&");
          for (var i = 0; i < pairs.length; i++) {
            var sp = pairs[i].split("=");
            args[sp[0]] = decodeURIComponent(sp[1]);
          }
        }
        return args;
      }
      BaseFunc.parseSearch = parseSearch;
      function parseSearchByName(key) {
        var args = parseSearch();
        return args[key] || false;
      }
      BaseFunc.parseSearchByName = parseSearchByName;
      function encrypt(code) {
        if (null == code) return;
        var c = String.fromCharCode(code.charCodeAt(0) + code.length);
        for (var i = 1; i < code.length; i++) c += String.fromCharCode(code.charCodeAt(i) + code.charCodeAt(i - 1));
        return escape(c);
      }
      BaseFunc.encrypt = encrypt;
      function decrypt(code) {
        code = unescape(code);
        var c = String.fromCharCode(code.charCodeAt(0) - code.length);
        for (var i = 1; i < code.length; i++) c += String.fromCharCode(code.charCodeAt(i) - c.charCodeAt(i - 1));
        return c;
      }
      BaseFunc.decrypt = decrypt;
      function versionCompare(versionA, versionB) {
        var vA = versionA.split(".");
        var vB = versionB.split(".");
        for (var i = 0; i < vA.length; ++i) {
          var a = parseInt(vA[i]);
          var b = parseInt(vB[i] || "0");
          if (a === b) continue;
          return a - b;
        }
        return vB.length > vA.length ? -1 : 0;
      }
      BaseFunc.versionCompare = versionCompare;
      function callStaticMethod(clsName, methodName, methodSig, params) {
        void 0 === params && (params = []);
        true;
        return;
      }
      BaseFunc.callStaticMethod = callStaticMethod;
      function IsJSON(str) {
        if ("string" === typeof str) try {
          var obj = JSON.parse(str);
          return !("object" != typeof obj || !obj);
        } catch (e) {
          return false;
        }
        return false;
      }
      BaseFunc.IsJSON = IsJSON;
      function checkUpdate() {
        var versionupdate = GManager_1.GManager.commonData["versionupdate"];
        var version = GManager_1.GManager.pluginMgr.getVersionCode();
        false;
        if (version >= versionupdate.vn) return false;
        return true;
      }
      BaseFunc.checkUpdate = checkUpdate;
      function save(name, data) {
        var str = JSON.stringify(data);
        str = BaseFunc.encrypt(str);
        cc.sys.localStorage.setItem(name, str);
      }
      BaseFunc.save = save;
      function load(name, def) {
        void 0 === def && (def = null);
        var str = cc.sys.localStorage.getItem(name);
        if (null != str && 0 < str.length && " " != str) {
          str = BaseFunc.decrypt(str);
          return JSON.parse(str);
        }
        return void 0 === def ? null : def;
      }
      BaseFunc.load = load;
      function saveKeyWithDate(key) {
        var time = new Date();
        var curDay = "" + time.getFullYear() + time.getMonth() + time.getDate();
        this.save(key, curDay);
      }
      BaseFunc.saveKeyWithDate = saveKeyWithDate;
      function loadKeyWithDate(key) {
        var time = new Date();
        var curDay = "" + time.getFullYear() + time.getMonth() + time.getDate();
        var saveTime = this.load(key);
        return saveTime == curDay;
      }
      BaseFunc.loadKeyWithDate = loadKeyWithDate;
      function mainCanvas() {
        return cc.director.getScene().getChildByName("Canvas");
      }
      BaseFunc.mainCanvas = mainCanvas;
      function createNode(name, parent) {
        void 0 === name && (name = null);
        void 0 === parent && (parent = null);
        var node = new cc.Node();
        node.name = name || "";
        parent || (parent = cc.director.getScene().getChildByName("Canvas"));
        parent.addChild(node);
        return node;
      }
      BaseFunc.createNode = createNode;
      function getWorkNode(type) {
        null == _canvas && (_canvas = cc.Canvas.instance.node);
        var node = _canvas.getChildByName(_nodeNames[type]);
        if (null === node) {
          node = BaseFunc.createNode(_nodeNames[type]);
          node.zIndex = 10 + type;
          node.setContentSize(_canvas.getContentSize());
        }
        return node;
      }
      BaseFunc.getWorkNode = getWorkNode;
      function regEventHandler(obj) {
        var prototype = Reflect.getPrototypeOf(obj);
        for (var _i = 0, _a = Object.keys(prototype); _i < _a.length; _i++) {
          var key = _a[_i];
          if (-1 !== key.indexOf("_handler") && "function" === typeof prototype[key]) {
            var eventName = key.substring(0, key.length - 8);
            GManager_1.GManager.addEvtListener(eventName, prototype[key], obj.uuid);
          }
        }
      }
      BaseFunc.regEventHandler = regEventHandler;
      function removeEventHandler(obj) {
        GManager_1.GManager.removeEvtListenerByUuid(obj.uuid);
      }
      BaseFunc.removeEventHandler = removeEventHandler;
      function SetSpriteImage(sprite, src, isFixSize) {
        void 0 === isFixSize && (isFixSize = false);
        var setImage = function(res) {
          if (null === res) {
            GManager_1.GManager.log2("SetSpriteImage image is null!");
            return;
          }
          var dst = null;
          if (sprite instanceof cc.Sprite && null !== sprite.node) dst = sprite; else if (sprite instanceof cc.Node) {
            dst = sprite.getComponent(cc.Sprite);
            null == dst && (dst = sprite.addComponent(cc.Sprite));
          }
          if (!dst && !dst.node && !dst.node.isValid) {
            GManager_1.GManager.log2("SetSpriteImage sprite is null!");
            return;
          }
          var size = null;
          size = isFixSize ? dst.node.getContentSize() : res.getOriginalSize();
          dst.spriteFrame = res;
          var newSize = dst.node.getContentSize();
          dst.node.setScale(size.width / newSize.width, size.height / newSize.height);
        };
        src instanceof cc.SpriteFrame ? setImage(src) : GManager_1.GManager.loadImage(src, function(res) {
          setImage(res);
        });
      }
      BaseFunc.SetSpriteImage = SetSpriteImage;
      function AddButtonEvent(btn, target, component, clickEvent) {
        if (btn instanceof cc.Node) {
          btn = btn.getComponent(cc.Button) || btn.getComponent(cc.Toggle);
          if (null === btn) {
            GManager_1.GManager.log("AddButtonEvent btn component is null!");
            return;
          }
        }
        btn.clickEvents = btn.clickEvents || [];
        var clickEventHandler = new cc.Component.EventHandler();
        clickEventHandler.target = target;
        clickEventHandler.component = component;
        clickEventHandler.handler = clickEvent;
        btn.clickEvents.push(clickEventHandler);
      }
      BaseFunc.AddButtonEvent = AddButtonEvent;
      function IsHttpSrc(path) {
        return -1 !== path.indexOf("http://") || -1 !== path.indexOf("https://");
      }
      BaseFunc.IsHttpSrc = IsHttpSrc;
      function InstantiatePrefab(szPath, callback) {
        cc.loader.loadRes(szPath, function(err, prefab) {
          var newNode = cc.instantiate(prefab);
          null != newNode.getComponent("BaseScene") && BaseFunc.BindChild(newNode, newNode.getComponent("BaseScene").rootNode);
          callback(newNode);
        });
      }
      BaseFunc.InstantiatePrefab = InstantiatePrefab;
      function BindChild(rootNode, container) {
        if (null == rootNode) return;
        var prefix = "";
        for (var comkey in rootNode._components) {
          var regex1 = /(.)+?(?=\<)/g;
          var regex2 = /[^\<\)]+(?=\>)/g;
          var first = regex1.exec(rootNode._components[comkey].name);
          var second = regex2.exec(rootNode._components[comkey].name);
          if (null != first && null != second) {
            "undefined" == typeof container[prefix + first[0]] && (container[prefix + first[0]] = {});
            container[prefix + first[0]]["$" + second[0]] = rootNode._components[comkey];
          } else container[prefix + rootNode._components[comkey].name] = rootNode._components[comkey];
        }
        for (var key in rootNode.children) {
          container[prefix + rootNode.children[key].name] = rootNode.children[key];
          this.BindChild(rootNode.children[key], container, prefix);
        }
      }
      BaseFunc.BindChild = BindChild;
      function getExitBoxString(editbox) {
        editbox instanceof cc.Node && (editbox = editbox.getComponent(cc.EditBox));
        if (null === editbox) return "";
        return editbox.string;
      }
      BaseFunc.getExitBoxString = getExitBoxString;
      function setExitBoxString(editbox, str) {
        editbox instanceof cc.Node && (editbox = editbox.getComponent(cc.EditBox));
        if (null === editbox) return;
        editbox.string = str;
      }
      BaseFunc.setExitBoxString = setExitBoxString;
      function getLabelString(label) {
        label instanceof cc.Node && (label = label.getComponent(cc.Label));
        if (null === label) return "";
        return label.string;
      }
      BaseFunc.getLabelString = getLabelString;
      function setLabelString(label, str) {
        label instanceof cc.Node && (label = label.getComponent(cc.Label));
        if (null === label) return;
        label.string = str;
      }
      BaseFunc.setLabelString = setLabelString;
      function Random(min, max) {
        if ("undefined" == typeof min) return 0;
        if ("undefined" == typeof max) {
          max = min;
          min = 0;
        }
        return Math.floor(Math.random() * (max - min) + min);
      }
      BaseFunc.Random = Random;
      function CleanCopy(objectOrArray) {
        if ("undefined" == typeof objectOrArray || "object" != typeof objectOrArray) return [];
        return Array.isArray(objectOrArray) ? objectOrArray.slice(0) : JSON.parse(JSON.stringify(objectOrArray));
      }
      BaseFunc.CleanCopy = CleanCopy;
      function IsWindows() {
        if (cc.sys.os == cc.sys.OS_WINDOWS) return true;
        return false;
      }
      BaseFunc.IsWindows = IsWindows;
      function IsAndroid() {
        if (cc.sys.os == cc.sys.OS_ANDROID) return true;
        return false;
      }
      BaseFunc.IsAndroid = IsAndroid;
      function IsIos() {
        if (cc.sys.os == cc.sys.OS_IOS) return true;
        return false;
      }
      BaseFunc.IsIos = IsIos;
      function IsLongScreen() {
        var windowSize = cc.winSize;
        if (windowSize.width / windowSize.height > 1.875) return true;
        return false;
      }
      BaseFunc.IsLongScreen = IsLongScreen;
      function IsShortScreen() {
        var windowSize = cc.winSize;
        if (windowSize.width / windowSize.height < 1.334) return true;
        return false;
      }
      BaseFunc.IsShortScreen = IsShortScreen;
      function toUpperCaseEachWord(str) {
        return str.toLowerCase().replace(/( |^)[a-z]/g, function(L) {
          return L.toUpperCase();
        });
      }
      BaseFunc.toUpperCaseEachWord = toUpperCaseEachWord;
      function playAD(index, callback) {
        void 0 === index && (index = 0);
        void 0 === callback && (callback = null);
        true;
        callback && callback();
        return;
      }
      BaseFunc.playAD = playAD;
    })(BaseFunc = exports.BaseFunc || (exports.BaseFunc = {}));
    cc._RF.pop();
  }, {
    "../GManager": "GManager"
  } ],
  BaseScene: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "0660e8T1ThJeYis2cAoiOFU", "BaseScene");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var BaseFunc_1 = require("../base/BaseFunc");
    var SceneManager_1 = require("./SceneManager");
    var GManager_1 = require("../GManager");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var BaseScene = function(_super) {
      __extends(BaseScene, _super);
      function BaseScene() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.sceneName = "";
        _this.initParams = null;
        _this.maskClose = true;
        _this._boundingBoxSize = cc.rect(0, 0, 0, 0);
        _this.rootNode = {};
        return _this;
      }
      BaseScene.prototype.__preload = function() {
        BaseFunc_1.BaseFunc.BindChild(this.node, this.rootNode);
        BaseFunc_1.BaseFunc.IsLongScreen() ? this.onFixLongScreen() : BaseFunc_1.BaseFunc.IsShortScreen() && this.onFixShortScreen();
        this.bindButton();
        this.preloadAfter();
      };
      BaseScene.prototype.preloadAfter = function() {};
      BaseScene.prototype.bindButton = function() {};
      BaseScene.prototype.onLoad = function() {};
      BaseScene.prototype.start = function() {
        var node = this.node.getChildByName("nodePop");
        if (null !== node) {
          var size = node.getContentSize();
          var point = this.node.convertToWorldSpaceAR(node.getPosition());
          this._boundingBoxSize = cc.rect(point.x - size.width * node.anchorX, point.y - size.height * node.anchorY, size.width, size.height);
        }
      };
      BaseScene.prototype.onOpenScene = function() {};
      BaseScene.prototype.onCloseScene = function() {};
      BaseScene.prototype.closeCallBack = function() {
        this.initParams && "function" == typeof this.initParams["closeCallback"] && this.initParams["closeCallback"]();
      };
      BaseScene.prototype.onFixLongScreen = function() {};
      BaseScene.prototype.onFixShortScreen = function() {};
      BaseScene.prototype.closeSelf = function() {
        SceneManager_1.SceneManager.closeScene(this);
      };
      BaseScene.prototype.addEvtListener = function(name, callback) {
        GManager_1.GManager.addEvtListener(name, callback, this.uuid);
      };
      BaseScene.prototype.bindButtonEvent = function(btn, clickEvent) {
        var moreEvents = [];
        for (var _i = 2; _i < arguments.length; _i++) moreEvents[_i - 2] = arguments[_i];
        "string" === typeof btn && (btn = cc.find(btn, this.node));
        var name = this.name;
        var aname = name.substring(0, name.indexOf("<"));
        var bname = name.substring(name.indexOf("<") + 1, name.length - 1);
        name = aname + "." + bname;
        var funcs = [];
        var strs = [];
        if (moreEvents && moreEvents.length > 0) {
          funcs = moreEvents.filter(function(item) {
            return "function" === typeof item;
          });
          strs = moreEvents.filter(function(item) {
            return "string" === typeof item;
          });
        }
        "function" === typeof clickEvent ? funcs.push(clickEvent) : "string" === typeof clickEvent && strs.push(clickEvent);
        if (funcs.length > 0) {
          this["onClick" + btn.uuid] = function(sender, data) {
            for (var _i = 0, funcs_1 = funcs; _i < funcs_1.length; _i++) {
              var func = funcs_1[_i];
              func(sender, data);
            }
          };
          BaseFunc_1.BaseFunc.AddButtonEvent(btn, this.node, name, "onClick" + btn.uuid);
        }
        if (strs.length > 0) for (var _a = 0, strs_1 = strs; _a < strs_1.length; _a++) {
          var str = strs_1[_a];
          BaseFunc_1.BaseFunc.AddButtonEvent(btn, this.node, name, str);
        }
      };
      BaseScene.prototype.getProgress = function(progress) {
        "string" === typeof progress && (progress = cc.find(progress, this.node));
        progress instanceof cc.Node && (progress = progress.getComponent(cc.ProgressBar));
        if (null === progress) return;
        return progress.progress;
      };
      BaseScene.prototype.setProgress = function(progress, value) {
        "string" === typeof progress && (progress = cc.find(progress, this.node));
        progress instanceof cc.Node && (progress = progress.getComponent(cc.ProgressBar));
        if (null === progress) return;
        progress.progress = value;
      };
      BaseScene.prototype.setActive = function(target, active) {
        "string" === typeof target && (target = cc.find(target, this.node));
        if (null === target) return;
        target.active = active;
      };
      BaseScene.prototype.SetSpriteImage = function(sprite, src, isFixSize) {
        void 0 === isFixSize && (isFixSize = false);
        "string" === typeof sprite && (sprite = cc.find(sprite, this.node));
        BaseFunc_1.BaseFunc.SetSpriteImage(sprite, src, isFixSize);
      };
      BaseScene.prototype.getEditBoxString = function(editbox) {
        "string" === typeof editbox && (editbox = cc.find(editbox, this.node));
        return BaseFunc_1.BaseFunc.getExitBoxString(editbox);
      };
      BaseScene.prototype.setEditBoxString = function(editbox, str) {
        "string" === typeof editbox && (editbox = cc.find(editbox, this.node));
        BaseFunc_1.BaseFunc.setExitBoxString(editbox, str);
      };
      BaseScene.prototype.getLabelString = function(label) {
        "string" === typeof label && (label = cc.find(label, this.node));
        return BaseFunc_1.BaseFunc.getLabelString(label);
      };
      BaseScene.prototype.setLabelString = function(label, str) {
        "string" === typeof label && (label = cc.find(label, this.node));
        BaseFunc_1.BaseFunc.setLabelString(label, str);
      };
      BaseScene.prototype.checkPopCollision = function(point) {
        return point.x > this._boundingBoxSize.x && point.x < this._boundingBoxSize.x + this._boundingBoxSize.width && point.y > this._boundingBoxSize.y && point.y < this._boundingBoxSize.y + this._boundingBoxSize.height;
      };
      BaseScene = __decorate([ ccclass ], BaseScene);
      return BaseScene;
    }(cc.Component);
    exports.default = BaseScene;
    cc._RF.pop();
  }, {
    "../GManager": "GManager",
    "../base/BaseFunc": "BaseFunc",
    "./SceneManager": "SceneManager"
  } ],
  1: [ function(require, module, exports) {
    var process = module.exports = {};
    var cachedSetTimeout;
    var cachedClearTimeout;
    function defaultSetTimout() {
      throw new Error("setTimeout has not been defined");
    }
    function defaultClearTimeout() {
      throw new Error("clearTimeout has not been defined");
    }
    (function() {
      try {
        cachedSetTimeout = "function" === typeof setTimeout ? setTimeout : defaultSetTimout;
      } catch (e) {
        cachedSetTimeout = defaultSetTimout;
      }
      try {
        cachedClearTimeout = "function" === typeof clearTimeout ? clearTimeout : defaultClearTimeout;
      } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
      }
    })();
    function runTimeout(fun) {
      if (cachedSetTimeout === setTimeout) return setTimeout(fun, 0);
      if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
      }
      try {
        return cachedSetTimeout(fun, 0);
      } catch (e) {
        try {
          return cachedSetTimeout.call(null, fun, 0);
        } catch (e) {
          return cachedSetTimeout.call(this, fun, 0);
        }
      }
    }
    function runClearTimeout(marker) {
      if (cachedClearTimeout === clearTimeout) return clearTimeout(marker);
      if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
      }
      try {
        return cachedClearTimeout(marker);
      } catch (e) {
        try {
          return cachedClearTimeout.call(null, marker);
        } catch (e) {
          return cachedClearTimeout.call(this, marker);
        }
      }
    }
    var queue = [];
    var draining = false;
    var currentQueue;
    var queueIndex = -1;
    function cleanUpNextTick() {
      if (!draining || !currentQueue) return;
      draining = false;
      currentQueue.length ? queue = currentQueue.concat(queue) : queueIndex = -1;
      queue.length && drainQueue();
    }
    function drainQueue() {
      if (draining) return;
      var timeout = runTimeout(cleanUpNextTick);
      draining = true;
      var len = queue.length;
      while (len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) currentQueue && currentQueue[queueIndex].run();
        queueIndex = -1;
        len = queue.length;
      }
      currentQueue = null;
      draining = false;
      runClearTimeout(timeout);
    }
    process.nextTick = function(fun) {
      var args = new Array(arguments.length - 1);
      if (arguments.length > 1) for (var i = 1; i < arguments.length; i++) args[i - 1] = arguments[i];
      queue.push(new Item(fun, args));
      1 !== queue.length || draining || runTimeout(drainQueue);
    };
    function Item(fun, array) {
      this.fun = fun;
      this.array = array;
    }
    Item.prototype.run = function() {
      this.fun.apply(null, this.array);
    };
    process.title = "browser";
    process.browser = true;
    process.env = {};
    process.argv = [];
    process.version = "";
    process.versions = {};
    function noop() {}
    process.on = noop;
    process.addListener = noop;
    process.once = noop;
    process.off = noop;
    process.removeListener = noop;
    process.removeAllListeners = noop;
    process.emit = noop;
    process.prependListener = noop;
    process.prependOnceListener = noop;
    process.listeners = function(name) {
      return [];
    };
    process.binding = function(name) {
      throw new Error("process.binding is not supported");
    };
    process.cwd = function() {
      return "/";
    };
    process.chdir = function(dir) {
      throw new Error("process.chdir is not supported");
    };
    process.umask = function() {
      return 0;
    };
  }, {} ],
  DebugNetwork: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b4d1eGi1v5Ev5HnohKnwW3f", "DebugNetwork");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var BaseScene_1 = require("../framework/scene/BaseScene");
    var GManager_1 = require("../framework/GManager");
    var DeepRogueServer_1 = require("../../protos/DeepRogueServer");
    var md5 = require("../framework/extensions/md5.min");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var NAMESPACE_UUID = "GameScene";
    var ROUTE_PREFIX = "DeepRogueServer.";
    var DebugNetwork = function(_super) {
      __extends(DebugNetwork, _super);
      function DebugNetwork() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      DebugNetwork.prototype.start = function() {
        this.regModel();
        GManager_1.GManager.addEvtListener("SOCKET_CONNECT", this.LoginSender.bind(this));
        GManager_1.GManager.socket.login("192.168.11.225", 13201);
      };
      DebugNetwork.prototype.regModel = function() {
        GManager_1.GManager.socket.setProto("DeepRogueServer", DeepRogueServer_1.DeepRogueServer);
        GManager_1.GManager.addEvtListener("GCLogin", this.GCLoginHandler.bind(this), NAMESPACE_UUID);
        GManager_1.GManager.addEvtListener("GCLogin", this.GCLoginHandler.bind(this), NAMESPACE_UUID);
        GManager_1.GManager.addEvtListener("GCChat", this.GCChatHandler.bind(this), NAMESPACE_UUID);
        GManager_1.GManager.addEvtListener("GCCommonData", this.GCCommonDataHandler.bind(this), NAMESPACE_UUID);
        GManager_1.GManager.addEvtListener("GCPlyCmd", this.GCPlyCmdHandler.bind(this), NAMESPACE_UUID);
        GManager_1.GManager.addEvtListener("GCPlyGameData", this.GCPlyGameDataHandler.bind(this), NAMESPACE_UUID);
      };
      DebugNetwork.prototype.GCLoginHandler = function(msg) {
        cc.log(msg);
      };
      DebugNetwork.prototype.CGLoginSender = function() {};
      DebugNetwork.prototype.CGChatSender = function() {};
      DebugNetwork.prototype.CGPlyCmdSender = function() {};
      DebugNetwork.prototype.GCChatHandler = function(msg) {
        cc.log("GCChatHandler", msg);
      };
      DebugNetwork.prototype.GCCommonDataHandler = function(msg) {
        cc.log("GCCommonDataHandler", msg);
      };
      DebugNetwork.prototype.GCPlyCmdHandler = function(msg) {
        cc.log("GCPlyCmdHandler", msg);
      };
      DebugNetwork.prototype.GCPlyGameDataHandler = function(msg) {
        cc.log("GCPlyGameDataHandler", msg);
      };
      DebugNetwork.prototype.LoginSender = function() {
        cc.log("DebugNetwork SOCKET_CONNECT LoginSender", this.node.uuid);
        var uniqueId = md5(this.node.uuid + Date.now());
        cc.log(uniqueId, this.node.uuid + Date.now(), this.node);
        GManager_1.GManager.socket.notfiy(ROUTE_PREFIX + "CGLogin", "CGLogin", {
          uniqueId: uniqueId,
          pn: GManager_1.GManager.gameConfig.pn,
          version: GManager_1.GManager.gameConfig.version
        });
      };
      DebugNetwork = __decorate([ ccclass ], DebugNetwork);
      return DebugNetwork;
    }(BaseScene_1.default);
    exports.default = DebugNetwork;
    cc._RF.pop();
  }, {
    "../../protos/DeepRogueServer": "DeepRogueServer",
    "../framework/GManager": "GManager",
    "../framework/extensions/md5.min": "md5.min",
    "../framework/scene/BaseScene": "BaseScene"
  } ],
  DeepRogueServer: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "cfb0dP06pVGKbtma+NEu/6t", "DeepRogueServer");
    "use strict";
    var $protobuf = protobuf;
    var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;
    var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});
    $root.DeepRogueServer = function() {
      var DeepRogueServer = {};
      DeepRogueServer.CGLogin = function() {
        function CGLogin(properties) {
          if (properties) for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i) null != properties[keys[i]] && (this[keys[i]] = properties[keys[i]]);
        }
        CGLogin.prototype.uniqueId = "";
        CGLogin.prototype.pn = "";
        CGLogin.prototype.version = "";
        CGLogin.create = function create(properties) {
          return new CGLogin(properties);
        };
        CGLogin.encode = function encode(message, writer) {
          writer || (writer = $Writer.create());
          null != message.uniqueId && message.hasOwnProperty("uniqueId") && writer.uint32(10).string(message.uniqueId);
          null != message.pn && message.hasOwnProperty("pn") && writer.uint32(18).string(message.pn);
          null != message.version && message.hasOwnProperty("version") && writer.uint32(26).string(message.version);
          return writer;
        };
        CGLogin.encodeDelimited = function encodeDelimited(message, writer) {
          return this.encode(message, writer).ldelim();
        };
        CGLogin.decode = function decode(reader, length) {
          reader instanceof $Reader || (reader = $Reader.create(reader));
          var end = void 0 === length ? reader.len : reader.pos + length, message = new $root.DeepRogueServer.CGLogin();
          while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
             case 1:
              message.uniqueId = reader.string();
              break;

             case 2:
              message.pn = reader.string();
              break;

             case 3:
              message.version = reader.string();
              break;

             default:
              reader.skipType(7 & tag);
            }
          }
          return message;
        };
        CGLogin.decodeDelimited = function decodeDelimited(reader) {
          reader instanceof $Reader || (reader = new $Reader(reader));
          return this.decode(reader, reader.uint32());
        };
        CGLogin.verify = function verify(message) {
          if ("object" !== typeof message || null === message) return "object expected";
          if (null != message.uniqueId && message.hasOwnProperty("uniqueId") && !$util.isString(message.uniqueId)) return "uniqueId: string expected";
          if (null != message.pn && message.hasOwnProperty("pn") && !$util.isString(message.pn)) return "pn: string expected";
          if (null != message.version && message.hasOwnProperty("version") && !$util.isString(message.version)) return "version: string expected";
          return null;
        };
        CGLogin.fromObject = function fromObject(object) {
          if (object instanceof $root.DeepRogueServer.CGLogin) return object;
          var message = new $root.DeepRogueServer.CGLogin();
          null != object.uniqueId && (message.uniqueId = String(object.uniqueId));
          null != object.pn && (message.pn = String(object.pn));
          null != object.version && (message.version = String(object.version));
          return message;
        };
        CGLogin.toObject = function toObject(message, options) {
          options || (options = {});
          var object = {};
          if (options.defaults) {
            object.uniqueId = "";
            object.pn = "";
            object.version = "";
          }
          null != message.uniqueId && message.hasOwnProperty("uniqueId") && (object.uniqueId = message.uniqueId);
          null != message.pn && message.hasOwnProperty("pn") && (object.pn = message.pn);
          null != message.version && message.hasOwnProperty("version") && (object.version = message.version);
          return object;
        };
        CGLogin.prototype.toJSON = function toJSON() {
          return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        return CGLogin;
      }();
      DeepRogueServer.GCLogin = function() {
        function GCLogin(properties) {
          if (properties) for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i) null != properties[keys[i]] && (this[keys[i]] = properties[keys[i]]);
        }
        GCLogin.prototype.ret = 0;
        GCLogin.prototype.errMsg = "";
        GCLogin.prototype.plyAttr = null;
        GCLogin.create = function create(properties) {
          return new GCLogin(properties);
        };
        GCLogin.encode = function encode(message, writer) {
          writer || (writer = $Writer.create());
          null != message.ret && message.hasOwnProperty("ret") && writer.uint32(8).int32(message.ret);
          null != message.errMsg && message.hasOwnProperty("errMsg") && writer.uint32(18).string(message.errMsg);
          null != message.plyAttr && message.hasOwnProperty("plyAttr") && $root.DeepRogueServer.IPlyAttr.encode(message.plyAttr, writer.uint32(26).fork()).ldelim();
          return writer;
        };
        GCLogin.encodeDelimited = function encodeDelimited(message, writer) {
          return this.encode(message, writer).ldelim();
        };
        GCLogin.decode = function decode(reader, length) {
          reader instanceof $Reader || (reader = $Reader.create(reader));
          var end = void 0 === length ? reader.len : reader.pos + length, message = new $root.DeepRogueServer.GCLogin();
          while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
             case 1:
              message.ret = reader.int32();
              break;

             case 2:
              message.errMsg = reader.string();
              break;

             case 3:
              message.plyAttr = $root.DeepRogueServer.IPlyAttr.decode(reader, reader.uint32());
              break;

             default:
              reader.skipType(7 & tag);
            }
          }
          return message;
        };
        GCLogin.decodeDelimited = function decodeDelimited(reader) {
          reader instanceof $Reader || (reader = new $Reader(reader));
          return this.decode(reader, reader.uint32());
        };
        GCLogin.verify = function verify(message) {
          if ("object" !== typeof message || null === message) return "object expected";
          if (null != message.ret && message.hasOwnProperty("ret") && !$util.isInteger(message.ret)) return "ret: integer expected";
          if (null != message.errMsg && message.hasOwnProperty("errMsg") && !$util.isString(message.errMsg)) return "errMsg: string expected";
          if (null != message.plyAttr && message.hasOwnProperty("plyAttr")) {
            var error = $root.DeepRogueServer.IPlyAttr.verify(message.plyAttr);
            if (error) return "plyAttr." + error;
          }
          return null;
        };
        GCLogin.fromObject = function fromObject(object) {
          if (object instanceof $root.DeepRogueServer.GCLogin) return object;
          var message = new $root.DeepRogueServer.GCLogin();
          null != object.ret && (message.ret = 0 | object.ret);
          null != object.errMsg && (message.errMsg = String(object.errMsg));
          if (null != object.plyAttr) {
            if ("object" !== typeof object.plyAttr) throw TypeError(".DeepRogueServer.GCLogin.plyAttr: object expected");
            message.plyAttr = $root.DeepRogueServer.IPlyAttr.fromObject(object.plyAttr);
          }
          return message;
        };
        GCLogin.toObject = function toObject(message, options) {
          options || (options = {});
          var object = {};
          if (options.defaults) {
            object.ret = 0;
            object.errMsg = "";
            object.plyAttr = null;
          }
          null != message.ret && message.hasOwnProperty("ret") && (object.ret = message.ret);
          null != message.errMsg && message.hasOwnProperty("errMsg") && (object.errMsg = message.errMsg);
          null != message.plyAttr && message.hasOwnProperty("plyAttr") && (object.plyAttr = $root.DeepRogueServer.IPlyAttr.toObject(message.plyAttr, options));
          return object;
        };
        GCLogin.prototype.toJSON = function toJSON() {
          return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        return GCLogin;
      }();
      DeepRogueServer.CGChat = function() {
        function CGChat(properties) {
          if (properties) for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i) null != properties[keys[i]] && (this[keys[i]] = properties[keys[i]]);
        }
        CGChat.prototype.toPlyGuid = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
        CGChat.prototype.chatType = 0;
        CGChat.prototype.chatData = "";
        CGChat.create = function create(properties) {
          return new CGChat(properties);
        };
        CGChat.encode = function encode(message, writer) {
          writer || (writer = $Writer.create());
          null != message.toPlyGuid && message.hasOwnProperty("toPlyGuid") && writer.uint32(8).int64(message.toPlyGuid);
          null != message.chatType && message.hasOwnProperty("chatType") && writer.uint32(16).int32(message.chatType);
          null != message.chatData && message.hasOwnProperty("chatData") && writer.uint32(26).string(message.chatData);
          return writer;
        };
        CGChat.encodeDelimited = function encodeDelimited(message, writer) {
          return this.encode(message, writer).ldelim();
        };
        CGChat.decode = function decode(reader, length) {
          reader instanceof $Reader || (reader = $Reader.create(reader));
          var end = void 0 === length ? reader.len : reader.pos + length, message = new $root.DeepRogueServer.CGChat();
          while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
             case 1:
              message.toPlyGuid = reader.int64();
              break;

             case 2:
              message.chatType = reader.int32();
              break;

             case 3:
              message.chatData = reader.string();
              break;

             default:
              reader.skipType(7 & tag);
            }
          }
          return message;
        };
        CGChat.decodeDelimited = function decodeDelimited(reader) {
          reader instanceof $Reader || (reader = new $Reader(reader));
          return this.decode(reader, reader.uint32());
        };
        CGChat.verify = function verify(message) {
          if ("object" !== typeof message || null === message) return "object expected";
          if (null != message.toPlyGuid && message.hasOwnProperty("toPlyGuid") && !$util.isInteger(message.toPlyGuid) && !(message.toPlyGuid && $util.isInteger(message.toPlyGuid.low) && $util.isInteger(message.toPlyGuid.high))) return "toPlyGuid: integer|Long expected";
          if (null != message.chatType && message.hasOwnProperty("chatType") && !$util.isInteger(message.chatType)) return "chatType: integer expected";
          if (null != message.chatData && message.hasOwnProperty("chatData") && !$util.isString(message.chatData)) return "chatData: string expected";
          return null;
        };
        CGChat.fromObject = function fromObject(object) {
          if (object instanceof $root.DeepRogueServer.CGChat) return object;
          var message = new $root.DeepRogueServer.CGChat();
          null != object.toPlyGuid && ($util.Long ? (message.toPlyGuid = $util.Long.fromValue(object.toPlyGuid)).unsigned = false : "string" === typeof object.toPlyGuid ? message.toPlyGuid = parseInt(object.toPlyGuid, 10) : "number" === typeof object.toPlyGuid ? message.toPlyGuid = object.toPlyGuid : "object" === typeof object.toPlyGuid && (message.toPlyGuid = new $util.LongBits(object.toPlyGuid.low >>> 0, object.toPlyGuid.high >>> 0).toNumber()));
          null != object.chatType && (message.chatType = 0 | object.chatType);
          null != object.chatData && (message.chatData = String(object.chatData));
          return message;
        };
        CGChat.toObject = function toObject(message, options) {
          options || (options = {});
          var object = {};
          if (options.defaults) {
            if ($util.Long) {
              var _long = new $util.Long(0, 0, false);
              object.toPlyGuid = options.longs === String ? _long.toString() : options.longs === Number ? _long.toNumber() : _long;
            } else object.toPlyGuid = options.longs === String ? "0" : 0;
            object.chatType = 0;
            object.chatData = "";
          }
          null != message.toPlyGuid && message.hasOwnProperty("toPlyGuid") && ("number" === typeof message.toPlyGuid ? object.toPlyGuid = options.longs === String ? String(message.toPlyGuid) : message.toPlyGuid : object.toPlyGuid = options.longs === String ? $util.Long.prototype.toString.call(message.toPlyGuid) : options.longs === Number ? new $util.LongBits(message.toPlyGuid.low >>> 0, message.toPlyGuid.high >>> 0).toNumber() : message.toPlyGuid);
          null != message.chatType && message.hasOwnProperty("chatType") && (object.chatType = message.chatType);
          null != message.chatData && message.hasOwnProperty("chatData") && (object.chatData = message.chatData);
          return object;
        };
        CGChat.prototype.toJSON = function toJSON() {
          return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        return CGChat;
      }();
      DeepRogueServer.GCChat = function() {
        function GCChat(properties) {
          if (properties) for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i) null != properties[keys[i]] && (this[keys[i]] = properties[keys[i]]);
        }
        GCChat.prototype.fromPlyGuid = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
        GCChat.prototype.chatType = 0;
        GCChat.prototype.chatData = "";
        GCChat.create = function create(properties) {
          return new GCChat(properties);
        };
        GCChat.encode = function encode(message, writer) {
          writer || (writer = $Writer.create());
          null != message.fromPlyGuid && message.hasOwnProperty("fromPlyGuid") && writer.uint32(8).int64(message.fromPlyGuid);
          null != message.chatType && message.hasOwnProperty("chatType") && writer.uint32(16).int32(message.chatType);
          null != message.chatData && message.hasOwnProperty("chatData") && writer.uint32(26).string(message.chatData);
          return writer;
        };
        GCChat.encodeDelimited = function encodeDelimited(message, writer) {
          return this.encode(message, writer).ldelim();
        };
        GCChat.decode = function decode(reader, length) {
          reader instanceof $Reader || (reader = $Reader.create(reader));
          var end = void 0 === length ? reader.len : reader.pos + length, message = new $root.DeepRogueServer.GCChat();
          while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
             case 1:
              message.fromPlyGuid = reader.int64();
              break;

             case 2:
              message.chatType = reader.int32();
              break;

             case 3:
              message.chatData = reader.string();
              break;

             default:
              reader.skipType(7 & tag);
            }
          }
          return message;
        };
        GCChat.decodeDelimited = function decodeDelimited(reader) {
          reader instanceof $Reader || (reader = new $Reader(reader));
          return this.decode(reader, reader.uint32());
        };
        GCChat.verify = function verify(message) {
          if ("object" !== typeof message || null === message) return "object expected";
          if (null != message.fromPlyGuid && message.hasOwnProperty("fromPlyGuid") && !$util.isInteger(message.fromPlyGuid) && !(message.fromPlyGuid && $util.isInteger(message.fromPlyGuid.low) && $util.isInteger(message.fromPlyGuid.high))) return "fromPlyGuid: integer|Long expected";
          if (null != message.chatType && message.hasOwnProperty("chatType") && !$util.isInteger(message.chatType)) return "chatType: integer expected";
          if (null != message.chatData && message.hasOwnProperty("chatData") && !$util.isString(message.chatData)) return "chatData: string expected";
          return null;
        };
        GCChat.fromObject = function fromObject(object) {
          if (object instanceof $root.DeepRogueServer.GCChat) return object;
          var message = new $root.DeepRogueServer.GCChat();
          null != object.fromPlyGuid && ($util.Long ? (message.fromPlyGuid = $util.Long.fromValue(object.fromPlyGuid)).unsigned = false : "string" === typeof object.fromPlyGuid ? message.fromPlyGuid = parseInt(object.fromPlyGuid, 10) : "number" === typeof object.fromPlyGuid ? message.fromPlyGuid = object.fromPlyGuid : "object" === typeof object.fromPlyGuid && (message.fromPlyGuid = new $util.LongBits(object.fromPlyGuid.low >>> 0, object.fromPlyGuid.high >>> 0).toNumber()));
          null != object.chatType && (message.chatType = 0 | object.chatType);
          null != object.chatData && (message.chatData = String(object.chatData));
          return message;
        };
        GCChat.toObject = function toObject(message, options) {
          options || (options = {});
          var object = {};
          if (options.defaults) {
            if ($util.Long) {
              var _long2 = new $util.Long(0, 0, false);
              object.fromPlyGuid = options.longs === String ? _long2.toString() : options.longs === Number ? _long2.toNumber() : _long2;
            } else object.fromPlyGuid = options.longs === String ? "0" : 0;
            object.chatType = 0;
            object.chatData = "";
          }
          null != message.fromPlyGuid && message.hasOwnProperty("fromPlyGuid") && ("number" === typeof message.fromPlyGuid ? object.fromPlyGuid = options.longs === String ? String(message.fromPlyGuid) : message.fromPlyGuid : object.fromPlyGuid = options.longs === String ? $util.Long.prototype.toString.call(message.fromPlyGuid) : options.longs === Number ? new $util.LongBits(message.fromPlyGuid.low >>> 0, message.fromPlyGuid.high >>> 0).toNumber() : message.fromPlyGuid);
          null != message.chatType && message.hasOwnProperty("chatType") && (object.chatType = message.chatType);
          null != message.chatData && message.hasOwnProperty("chatData") && (object.chatData = message.chatData);
          return object;
        };
        GCChat.prototype.toJSON = function toJSON() {
          return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        return GCChat;
      }();
      DeepRogueServer.IPlyAttr = function() {
        function IPlyAttr(properties) {
          if (properties) for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i) null != properties[keys[i]] && (this[keys[i]] = properties[keys[i]]);
        }
        IPlyAttr.prototype.plyGuid = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
        IPlyAttr.prototype.nickname = "";
        IPlyAttr.prototype.sex = 0;
        IPlyAttr.prototype.money = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
        IPlyAttr.prototype.serverId = 0;
        IPlyAttr.prototype.tableId = 0;
        IPlyAttr.prototype.chairId = 0;
        IPlyAttr.create = function create(properties) {
          return new IPlyAttr(properties);
        };
        IPlyAttr.encode = function encode(message, writer) {
          writer || (writer = $Writer.create());
          null != message.plyGuid && message.hasOwnProperty("plyGuid") && writer.uint32(8).int64(message.plyGuid);
          null != message.nickname && message.hasOwnProperty("nickname") && writer.uint32(18).string(message.nickname);
          null != message.sex && message.hasOwnProperty("sex") && writer.uint32(24).int32(message.sex);
          null != message.money && message.hasOwnProperty("money") && writer.uint32(32).int64(message.money);
          null != message.serverId && message.hasOwnProperty("serverId") && writer.uint32(40).int32(message.serverId);
          null != message.tableId && message.hasOwnProperty("tableId") && writer.uint32(48).int32(message.tableId);
          null != message.chairId && message.hasOwnProperty("chairId") && writer.uint32(56).int32(message.chairId);
          return writer;
        };
        IPlyAttr.encodeDelimited = function encodeDelimited(message, writer) {
          return this.encode(message, writer).ldelim();
        };
        IPlyAttr.decode = function decode(reader, length) {
          reader instanceof $Reader || (reader = $Reader.create(reader));
          var end = void 0 === length ? reader.len : reader.pos + length, message = new $root.DeepRogueServer.IPlyAttr();
          while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
             case 1:
              message.plyGuid = reader.int64();
              break;

             case 2:
              message.nickname = reader.string();
              break;

             case 3:
              message.sex = reader.int32();
              break;

             case 4:
              message.money = reader.int64();
              break;

             case 5:
              message.serverId = reader.int32();
              break;

             case 6:
              message.tableId = reader.int32();
              break;

             case 7:
              message.chairId = reader.int32();
              break;

             default:
              reader.skipType(7 & tag);
            }
          }
          return message;
        };
        IPlyAttr.decodeDelimited = function decodeDelimited(reader) {
          reader instanceof $Reader || (reader = new $Reader(reader));
          return this.decode(reader, reader.uint32());
        };
        IPlyAttr.verify = function verify(message) {
          if ("object" !== typeof message || null === message) return "object expected";
          if (null != message.plyGuid && message.hasOwnProperty("plyGuid") && !$util.isInteger(message.plyGuid) && !(message.plyGuid && $util.isInteger(message.plyGuid.low) && $util.isInteger(message.plyGuid.high))) return "plyGuid: integer|Long expected";
          if (null != message.nickname && message.hasOwnProperty("nickname") && !$util.isString(message.nickname)) return "nickname: string expected";
          if (null != message.sex && message.hasOwnProperty("sex") && !$util.isInteger(message.sex)) return "sex: integer expected";
          if (null != message.money && message.hasOwnProperty("money") && !$util.isInteger(message.money) && !(message.money && $util.isInteger(message.money.low) && $util.isInteger(message.money.high))) return "money: integer|Long expected";
          if (null != message.serverId && message.hasOwnProperty("serverId") && !$util.isInteger(message.serverId)) return "serverId: integer expected";
          if (null != message.tableId && message.hasOwnProperty("tableId") && !$util.isInteger(message.tableId)) return "tableId: integer expected";
          if (null != message.chairId && message.hasOwnProperty("chairId") && !$util.isInteger(message.chairId)) return "chairId: integer expected";
          return null;
        };
        IPlyAttr.fromObject = function fromObject(object) {
          if (object instanceof $root.DeepRogueServer.IPlyAttr) return object;
          var message = new $root.DeepRogueServer.IPlyAttr();
          null != object.plyGuid && ($util.Long ? (message.plyGuid = $util.Long.fromValue(object.plyGuid)).unsigned = false : "string" === typeof object.plyGuid ? message.plyGuid = parseInt(object.plyGuid, 10) : "number" === typeof object.plyGuid ? message.plyGuid = object.plyGuid : "object" === typeof object.plyGuid && (message.plyGuid = new $util.LongBits(object.plyGuid.low >>> 0, object.plyGuid.high >>> 0).toNumber()));
          null != object.nickname && (message.nickname = String(object.nickname));
          null != object.sex && (message.sex = 0 | object.sex);
          null != object.money && ($util.Long ? (message.money = $util.Long.fromValue(object.money)).unsigned = false : "string" === typeof object.money ? message.money = parseInt(object.money, 10) : "number" === typeof object.money ? message.money = object.money : "object" === typeof object.money && (message.money = new $util.LongBits(object.money.low >>> 0, object.money.high >>> 0).toNumber()));
          null != object.serverId && (message.serverId = 0 | object.serverId);
          null != object.tableId && (message.tableId = 0 | object.tableId);
          null != object.chairId && (message.chairId = 0 | object.chairId);
          return message;
        };
        IPlyAttr.toObject = function toObject(message, options) {
          options || (options = {});
          var object = {};
          if (options.defaults) {
            if ($util.Long) {
              var _long3 = new $util.Long(0, 0, false);
              object.plyGuid = options.longs === String ? _long3.toString() : options.longs === Number ? _long3.toNumber() : _long3;
            } else object.plyGuid = options.longs === String ? "0" : 0;
            object.nickname = "";
            object.sex = 0;
            if ($util.Long) {
              var _long3 = new $util.Long(0, 0, false);
              object.money = options.longs === String ? _long3.toString() : options.longs === Number ? _long3.toNumber() : _long3;
            } else object.money = options.longs === String ? "0" : 0;
            object.serverId = 0;
            object.tableId = 0;
            object.chairId = 0;
          }
          null != message.plyGuid && message.hasOwnProperty("plyGuid") && ("number" === typeof message.plyGuid ? object.plyGuid = options.longs === String ? String(message.plyGuid) : message.plyGuid : object.plyGuid = options.longs === String ? $util.Long.prototype.toString.call(message.plyGuid) : options.longs === Number ? new $util.LongBits(message.plyGuid.low >>> 0, message.plyGuid.high >>> 0).toNumber() : message.plyGuid);
          null != message.nickname && message.hasOwnProperty("nickname") && (object.nickname = message.nickname);
          null != message.sex && message.hasOwnProperty("sex") && (object.sex = message.sex);
          null != message.money && message.hasOwnProperty("money") && ("number" === typeof message.money ? object.money = options.longs === String ? String(message.money) : message.money : object.money = options.longs === String ? $util.Long.prototype.toString.call(message.money) : options.longs === Number ? new $util.LongBits(message.money.low >>> 0, message.money.high >>> 0).toNumber() : message.money);
          null != message.serverId && message.hasOwnProperty("serverId") && (object.serverId = message.serverId);
          null != message.tableId && message.hasOwnProperty("tableId") && (object.tableId = message.tableId);
          null != message.chairId && message.hasOwnProperty("chairId") && (object.chairId = message.chairId);
          return object;
        };
        IPlyAttr.prototype.toJSON = function toJSON() {
          return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        return IPlyAttr;
      }();
      DeepRogueServer.GCCommonData = function() {
        function GCCommonData(properties) {
          if (properties) for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i) null != properties[keys[i]] && (this[keys[i]] = properties[keys[i]]);
        }
        GCCommonData.prototype.plyGuid = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
        GCCommonData.prototype.opCode = 0;
        GCCommonData.prototype.opValue = 0;
        GCCommonData.create = function create(properties) {
          return new GCCommonData(properties);
        };
        GCCommonData.encode = function encode(message, writer) {
          writer || (writer = $Writer.create());
          null != message.plyGuid && message.hasOwnProperty("plyGuid") && writer.uint32(8).int64(message.plyGuid);
          null != message.opCode && message.hasOwnProperty("opCode") && writer.uint32(16).int32(message.opCode);
          null != message.opValue && message.hasOwnProperty("opValue") && writer.uint32(24).int32(message.opValue);
          return writer;
        };
        GCCommonData.encodeDelimited = function encodeDelimited(message, writer) {
          return this.encode(message, writer).ldelim();
        };
        GCCommonData.decode = function decode(reader, length) {
          reader instanceof $Reader || (reader = $Reader.create(reader));
          var end = void 0 === length ? reader.len : reader.pos + length, message = new $root.DeepRogueServer.GCCommonData();
          while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
             case 1:
              message.plyGuid = reader.int64();
              break;

             case 2:
              message.opCode = reader.int32();
              break;

             case 3:
              message.opValue = reader.int32();
              break;

             default:
              reader.skipType(7 & tag);
            }
          }
          return message;
        };
        GCCommonData.decodeDelimited = function decodeDelimited(reader) {
          reader instanceof $Reader || (reader = new $Reader(reader));
          return this.decode(reader, reader.uint32());
        };
        GCCommonData.verify = function verify(message) {
          if ("object" !== typeof message || null === message) return "object expected";
          if (null != message.plyGuid && message.hasOwnProperty("plyGuid") && !$util.isInteger(message.plyGuid) && !(message.plyGuid && $util.isInteger(message.plyGuid.low) && $util.isInteger(message.plyGuid.high))) return "plyGuid: integer|Long expected";
          if (null != message.opCode && message.hasOwnProperty("opCode") && !$util.isInteger(message.opCode)) return "opCode: integer expected";
          if (null != message.opValue && message.hasOwnProperty("opValue") && !$util.isInteger(message.opValue)) return "opValue: integer expected";
          return null;
        };
        GCCommonData.fromObject = function fromObject(object) {
          if (object instanceof $root.DeepRogueServer.GCCommonData) return object;
          var message = new $root.DeepRogueServer.GCCommonData();
          null != object.plyGuid && ($util.Long ? (message.plyGuid = $util.Long.fromValue(object.plyGuid)).unsigned = false : "string" === typeof object.plyGuid ? message.plyGuid = parseInt(object.plyGuid, 10) : "number" === typeof object.plyGuid ? message.plyGuid = object.plyGuid : "object" === typeof object.plyGuid && (message.plyGuid = new $util.LongBits(object.plyGuid.low >>> 0, object.plyGuid.high >>> 0).toNumber()));
          null != object.opCode && (message.opCode = 0 | object.opCode);
          null != object.opValue && (message.opValue = 0 | object.opValue);
          return message;
        };
        GCCommonData.toObject = function toObject(message, options) {
          options || (options = {});
          var object = {};
          if (options.defaults) {
            if ($util.Long) {
              var _long4 = new $util.Long(0, 0, false);
              object.plyGuid = options.longs === String ? _long4.toString() : options.longs === Number ? _long4.toNumber() : _long4;
            } else object.plyGuid = options.longs === String ? "0" : 0;
            object.opCode = 0;
            object.opValue = 0;
          }
          null != message.plyGuid && message.hasOwnProperty("plyGuid") && ("number" === typeof message.plyGuid ? object.plyGuid = options.longs === String ? String(message.plyGuid) : message.plyGuid : object.plyGuid = options.longs === String ? $util.Long.prototype.toString.call(message.plyGuid) : options.longs === Number ? new $util.LongBits(message.plyGuid.low >>> 0, message.plyGuid.high >>> 0).toNumber() : message.plyGuid);
          null != message.opCode && message.hasOwnProperty("opCode") && (object.opCode = message.opCode);
          null != message.opValue && message.hasOwnProperty("opValue") && (object.opValue = message.opValue);
          return object;
        };
        GCCommonData.prototype.toJSON = function toJSON() {
          return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        return GCCommonData;
      }();
      DeepRogueServer.CGPlyCmd = function() {
        function CGPlyCmd(properties) {
          if (properties) for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i) null != properties[keys[i]] && (this[keys[i]] = properties[keys[i]]);
        }
        CGPlyCmd.prototype.opCode = 0;
        CGPlyCmd.prototype.opValue = 0;
        CGPlyCmd.create = function create(properties) {
          return new CGPlyCmd(properties);
        };
        CGPlyCmd.encode = function encode(message, writer) {
          writer || (writer = $Writer.create());
          null != message.opCode && message.hasOwnProperty("opCode") && writer.uint32(8).int32(message.opCode);
          null != message.opValue && message.hasOwnProperty("opValue") && writer.uint32(16).int32(message.opValue);
          return writer;
        };
        CGPlyCmd.encodeDelimited = function encodeDelimited(message, writer) {
          return this.encode(message, writer).ldelim();
        };
        CGPlyCmd.decode = function decode(reader, length) {
          reader instanceof $Reader || (reader = $Reader.create(reader));
          var end = void 0 === length ? reader.len : reader.pos + length, message = new $root.DeepRogueServer.CGPlyCmd();
          while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
             case 1:
              message.opCode = reader.int32();
              break;

             case 2:
              message.opValue = reader.int32();
              break;

             default:
              reader.skipType(7 & tag);
            }
          }
          return message;
        };
        CGPlyCmd.decodeDelimited = function decodeDelimited(reader) {
          reader instanceof $Reader || (reader = new $Reader(reader));
          return this.decode(reader, reader.uint32());
        };
        CGPlyCmd.verify = function verify(message) {
          if ("object" !== typeof message || null === message) return "object expected";
          if (null != message.opCode && message.hasOwnProperty("opCode") && !$util.isInteger(message.opCode)) return "opCode: integer expected";
          if (null != message.opValue && message.hasOwnProperty("opValue") && !$util.isInteger(message.opValue)) return "opValue: integer expected";
          return null;
        };
        CGPlyCmd.fromObject = function fromObject(object) {
          if (object instanceof $root.DeepRogueServer.CGPlyCmd) return object;
          var message = new $root.DeepRogueServer.CGPlyCmd();
          null != object.opCode && (message.opCode = 0 | object.opCode);
          null != object.opValue && (message.opValue = 0 | object.opValue);
          return message;
        };
        CGPlyCmd.toObject = function toObject(message, options) {
          options || (options = {});
          var object = {};
          if (options.defaults) {
            object.opCode = 0;
            object.opValue = 0;
          }
          null != message.opCode && message.hasOwnProperty("opCode") && (object.opCode = message.opCode);
          null != message.opValue && message.hasOwnProperty("opValue") && (object.opValue = message.opValue);
          return object;
        };
        CGPlyCmd.prototype.toJSON = function toJSON() {
          return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        return CGPlyCmd;
      }();
      DeepRogueServer.GCPlyCmd = function() {
        function GCPlyCmd(properties) {
          if (properties) for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i) null != properties[keys[i]] && (this[keys[i]] = properties[keys[i]]);
        }
        GCPlyCmd.prototype.plyGuid = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
        GCPlyCmd.prototype.opCode = 0;
        GCPlyCmd.prototype.opValue = 0;
        GCPlyCmd.create = function create(properties) {
          return new GCPlyCmd(properties);
        };
        GCPlyCmd.encode = function encode(message, writer) {
          writer || (writer = $Writer.create());
          null != message.plyGuid && message.hasOwnProperty("plyGuid") && writer.uint32(8).int64(message.plyGuid);
          null != message.opCode && message.hasOwnProperty("opCode") && writer.uint32(16).int32(message.opCode);
          null != message.opValue && message.hasOwnProperty("opValue") && writer.uint32(24).int32(message.opValue);
          return writer;
        };
        GCPlyCmd.encodeDelimited = function encodeDelimited(message, writer) {
          return this.encode(message, writer).ldelim();
        };
        GCPlyCmd.decode = function decode(reader, length) {
          reader instanceof $Reader || (reader = $Reader.create(reader));
          var end = void 0 === length ? reader.len : reader.pos + length, message = new $root.DeepRogueServer.GCPlyCmd();
          while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
             case 1:
              message.plyGuid = reader.int64();
              break;

             case 2:
              message.opCode = reader.int32();
              break;

             case 3:
              message.opValue = reader.int32();
              break;

             default:
              reader.skipType(7 & tag);
            }
          }
          return message;
        };
        GCPlyCmd.decodeDelimited = function decodeDelimited(reader) {
          reader instanceof $Reader || (reader = new $Reader(reader));
          return this.decode(reader, reader.uint32());
        };
        GCPlyCmd.verify = function verify(message) {
          if ("object" !== typeof message || null === message) return "object expected";
          if (null != message.plyGuid && message.hasOwnProperty("plyGuid") && !$util.isInteger(message.plyGuid) && !(message.plyGuid && $util.isInteger(message.plyGuid.low) && $util.isInteger(message.plyGuid.high))) return "plyGuid: integer|Long expected";
          if (null != message.opCode && message.hasOwnProperty("opCode") && !$util.isInteger(message.opCode)) return "opCode: integer expected";
          if (null != message.opValue && message.hasOwnProperty("opValue") && !$util.isInteger(message.opValue)) return "opValue: integer expected";
          return null;
        };
        GCPlyCmd.fromObject = function fromObject(object) {
          if (object instanceof $root.DeepRogueServer.GCPlyCmd) return object;
          var message = new $root.DeepRogueServer.GCPlyCmd();
          null != object.plyGuid && ($util.Long ? (message.plyGuid = $util.Long.fromValue(object.plyGuid)).unsigned = false : "string" === typeof object.plyGuid ? message.plyGuid = parseInt(object.plyGuid, 10) : "number" === typeof object.plyGuid ? message.plyGuid = object.plyGuid : "object" === typeof object.plyGuid && (message.plyGuid = new $util.LongBits(object.plyGuid.low >>> 0, object.plyGuid.high >>> 0).toNumber()));
          null != object.opCode && (message.opCode = 0 | object.opCode);
          null != object.opValue && (message.opValue = 0 | object.opValue);
          return message;
        };
        GCPlyCmd.toObject = function toObject(message, options) {
          options || (options = {});
          var object = {};
          if (options.defaults) {
            if ($util.Long) {
              var _long5 = new $util.Long(0, 0, false);
              object.plyGuid = options.longs === String ? _long5.toString() : options.longs === Number ? _long5.toNumber() : _long5;
            } else object.plyGuid = options.longs === String ? "0" : 0;
            object.opCode = 0;
            object.opValue = 0;
          }
          null != message.plyGuid && message.hasOwnProperty("plyGuid") && ("number" === typeof message.plyGuid ? object.plyGuid = options.longs === String ? String(message.plyGuid) : message.plyGuid : object.plyGuid = options.longs === String ? $util.Long.prototype.toString.call(message.plyGuid) : options.longs === Number ? new $util.LongBits(message.plyGuid.low >>> 0, message.plyGuid.high >>> 0).toNumber() : message.plyGuid);
          null != message.opCode && message.hasOwnProperty("opCode") && (object.opCode = message.opCode);
          null != message.opValue && message.hasOwnProperty("opValue") && (object.opValue = message.opValue);
          return object;
        };
        GCPlyCmd.prototype.toJSON = function toJSON() {
          return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        return GCPlyCmd;
      }();
      DeepRogueServer.GCPlyGameData = function() {
        function GCPlyGameData(properties) {
          if (properties) for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i) null != properties[keys[i]] && (this[keys[i]] = properties[keys[i]]);
        }
        GCPlyGameData.prototype.plyGuid = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
        GCPlyGameData.prototype.plyGameData = null;
        GCPlyGameData.create = function create(properties) {
          return new GCPlyGameData(properties);
        };
        GCPlyGameData.encode = function encode(message, writer) {
          writer || (writer = $Writer.create());
          null != message.plyGuid && message.hasOwnProperty("plyGuid") && writer.uint32(8).int64(message.plyGuid);
          null != message.plyGameData && message.hasOwnProperty("plyGameData") && $root.DeepRogueServer.IPlyGameData.encode(message.plyGameData, writer.uint32(18).fork()).ldelim();
          return writer;
        };
        GCPlyGameData.encodeDelimited = function encodeDelimited(message, writer) {
          return this.encode(message, writer).ldelim();
        };
        GCPlyGameData.decode = function decode(reader, length) {
          reader instanceof $Reader || (reader = $Reader.create(reader));
          var end = void 0 === length ? reader.len : reader.pos + length, message = new $root.DeepRogueServer.GCPlyGameData();
          while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
             case 1:
              message.plyGuid = reader.int64();
              break;

             case 2:
              message.plyGameData = $root.DeepRogueServer.IPlyGameData.decode(reader, reader.uint32());
              break;

             default:
              reader.skipType(7 & tag);
            }
          }
          return message;
        };
        GCPlyGameData.decodeDelimited = function decodeDelimited(reader) {
          reader instanceof $Reader || (reader = new $Reader(reader));
          return this.decode(reader, reader.uint32());
        };
        GCPlyGameData.verify = function verify(message) {
          if ("object" !== typeof message || null === message) return "object expected";
          if (null != message.plyGuid && message.hasOwnProperty("plyGuid") && !$util.isInteger(message.plyGuid) && !(message.plyGuid && $util.isInteger(message.plyGuid.low) && $util.isInteger(message.plyGuid.high))) return "plyGuid: integer|Long expected";
          if (null != message.plyGameData && message.hasOwnProperty("plyGameData")) {
            var error = $root.DeepRogueServer.IPlyGameData.verify(message.plyGameData);
            if (error) return "plyGameData." + error;
          }
          return null;
        };
        GCPlyGameData.fromObject = function fromObject(object) {
          if (object instanceof $root.DeepRogueServer.GCPlyGameData) return object;
          var message = new $root.DeepRogueServer.GCPlyGameData();
          null != object.plyGuid && ($util.Long ? (message.plyGuid = $util.Long.fromValue(object.plyGuid)).unsigned = false : "string" === typeof object.plyGuid ? message.plyGuid = parseInt(object.plyGuid, 10) : "number" === typeof object.plyGuid ? message.plyGuid = object.plyGuid : "object" === typeof object.plyGuid && (message.plyGuid = new $util.LongBits(object.plyGuid.low >>> 0, object.plyGuid.high >>> 0).toNumber()));
          if (null != object.plyGameData) {
            if ("object" !== typeof object.plyGameData) throw TypeError(".DeepRogueServer.GCPlyGameData.plyGameData: object expected");
            message.plyGameData = $root.DeepRogueServer.IPlyGameData.fromObject(object.plyGameData);
          }
          return message;
        };
        GCPlyGameData.toObject = function toObject(message, options) {
          options || (options = {});
          var object = {};
          if (options.defaults) {
            if ($util.Long) {
              var _long6 = new $util.Long(0, 0, false);
              object.plyGuid = options.longs === String ? _long6.toString() : options.longs === Number ? _long6.toNumber() : _long6;
            } else object.plyGuid = options.longs === String ? "0" : 0;
            object.plyGameData = null;
          }
          null != message.plyGuid && message.hasOwnProperty("plyGuid") && ("number" === typeof message.plyGuid ? object.plyGuid = options.longs === String ? String(message.plyGuid) : message.plyGuid : object.plyGuid = options.longs === String ? $util.Long.prototype.toString.call(message.plyGuid) : options.longs === Number ? new $util.LongBits(message.plyGuid.low >>> 0, message.plyGuid.high >>> 0).toNumber() : message.plyGuid);
          null != message.plyGameData && message.hasOwnProperty("plyGameData") && (object.plyGameData = $root.DeepRogueServer.IPlyGameData.toObject(message.plyGameData, options));
          return object;
        };
        GCPlyGameData.prototype.toJSON = function toJSON() {
          return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        return GCPlyGameData;
      }();
      DeepRogueServer.IPlyGameData = function() {
        function IPlyGameData(properties) {
          if (properties) for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i) null != properties[keys[i]] && (this[keys[i]] = properties[keys[i]]);
        }
        IPlyGameData.prototype.x = 0;
        IPlyGameData.prototype.y = 0;
        IPlyGameData.prototype.dir = 0;
        IPlyGameData.prototype.status = 0;
        IPlyGameData.create = function create(properties) {
          return new IPlyGameData(properties);
        };
        IPlyGameData.encode = function encode(message, writer) {
          writer || (writer = $Writer.create());
          null != message.x && message.hasOwnProperty("x") && writer.uint32(8).int32(message.x);
          null != message.y && message.hasOwnProperty("y") && writer.uint32(16).int32(message.y);
          null != message.dir && message.hasOwnProperty("dir") && writer.uint32(24).int32(message.dir);
          null != message.status && message.hasOwnProperty("status") && writer.uint32(32).int32(message.status);
          return writer;
        };
        IPlyGameData.encodeDelimited = function encodeDelimited(message, writer) {
          return this.encode(message, writer).ldelim();
        };
        IPlyGameData.decode = function decode(reader, length) {
          reader instanceof $Reader || (reader = $Reader.create(reader));
          var end = void 0 === length ? reader.len : reader.pos + length, message = new $root.DeepRogueServer.IPlyGameData();
          while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
             case 1:
              message.x = reader.int32();
              break;

             case 2:
              message.y = reader.int32();
              break;

             case 3:
              message.dir = reader.int32();
              break;

             case 4:
              message.status = reader.int32();
              break;

             default:
              reader.skipType(7 & tag);
            }
          }
          return message;
        };
        IPlyGameData.decodeDelimited = function decodeDelimited(reader) {
          reader instanceof $Reader || (reader = new $Reader(reader));
          return this.decode(reader, reader.uint32());
        };
        IPlyGameData.verify = function verify(message) {
          if ("object" !== typeof message || null === message) return "object expected";
          if (null != message.x && message.hasOwnProperty("x") && !$util.isInteger(message.x)) return "x: integer expected";
          if (null != message.y && message.hasOwnProperty("y") && !$util.isInteger(message.y)) return "y: integer expected";
          if (null != message.dir && message.hasOwnProperty("dir") && !$util.isInteger(message.dir)) return "dir: integer expected";
          if (null != message.status && message.hasOwnProperty("status") && !$util.isInteger(message.status)) return "status: integer expected";
          return null;
        };
        IPlyGameData.fromObject = function fromObject(object) {
          if (object instanceof $root.DeepRogueServer.IPlyGameData) return object;
          var message = new $root.DeepRogueServer.IPlyGameData();
          null != object.x && (message.x = 0 | object.x);
          null != object.y && (message.y = 0 | object.y);
          null != object.dir && (message.dir = 0 | object.dir);
          null != object.status && (message.status = 0 | object.status);
          return message;
        };
        IPlyGameData.toObject = function toObject(message, options) {
          options || (options = {});
          var object = {};
          if (options.defaults) {
            object.x = 0;
            object.y = 0;
            object.dir = 0;
            object.status = 0;
          }
          null != message.x && message.hasOwnProperty("x") && (object.x = message.x);
          null != message.y && message.hasOwnProperty("y") && (object.y = message.y);
          null != message.dir && message.hasOwnProperty("dir") && (object.dir = message.dir);
          null != message.status && message.hasOwnProperty("status") && (object.status = message.status);
          return object;
        };
        IPlyGameData.prototype.toJSON = function toJSON() {
          return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        return IPlyGameData;
      }();
      return DeepRogueServer;
    }();
    module.exports = $root;
    cc._RF.pop();
  }, {} ],
  EmptyScene: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "1c651J3ELxNj5KZFh1MYyt0", "EmptyScene");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var BaseScene_1 = require("../framework/scene/BaseScene");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var EmptyScene = function(_super) {
      __extends(EmptyScene, _super);
      function EmptyScene() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      EmptyScene.prototype.start = function() {};
      EmptyScene = __decorate([ ccclass ], EmptyScene);
      return EmptyScene;
    }(BaseScene_1.default);
    exports.default = EmptyScene;
    cc._RF.pop();
  }, {
    "../framework/scene/BaseScene": "BaseScene"
  } ],
  EventManager: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f04d8CkM/pK06uifMnNAaR9", "EventManager");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.handler = exports.EventManager = void 0;
    var GManager_1 = require("../GManager");
    var EventManager;
    (function(EventManager) {
      var _events = {};
      var _eventsByUuid = {};
      function addEventListener(name, callback, uuid) {
        void 0 === uuid && (uuid = "");
        if (!name || !callback) return;
        var event = {};
        event.callback = callback;
        event.uuid = uuid;
        void 0 !== _events[name] && null !== _events[name] || (_events[name] = []);
        _events[name].push(event);
        if (uuid.length > 0) {
          null !== _eventsByUuid[uuid] && void 0 !== _eventsByUuid[uuid] || (_eventsByUuid[uuid] = []);
          _eventsByUuid[uuid].push(name);
        }
      }
      EventManager.addEventListener = addEventListener;
      function removeEventListener(name, param1) {
        void 0 === param1 && (param1 = null);
        if (!name || !param1 || !_events[name]) return;
        "function" == typeof param1 ? _events[name] = _events[name].filter(function(item) {
          return item.callback !== param1;
        }) : "string" == typeof param1 && (_events[name] = _events[name].filter(function(item) {
          return item.uuid !== param1;
        }));
      }
      EventManager.removeEventListener = removeEventListener;
      function removeEventListenerByUUID(uuid) {
        void 0 === uuid && (uuid = "");
        if (0 == uuid.length || null === _eventsByUuid[uuid] || void 0 === _eventsByUuid[uuid]) return;
        _eventsByUuid[uuid].map(function(item) {
          return removeEventListener(item, uuid);
        });
        delete _eventsByUuid[uuid];
      }
      EventManager.removeEventListenerByUUID = removeEventListenerByUUID;
      function dispatchEvent(name, msg) {
        void 0 === msg && (msg = null);
        if (!name) return;
        var eventName = "";
        if ("string" === typeof name) eventName = name; else if (name.opcode && "string" === typeof name.opcode) {
          eventName = name.opcode;
          msg = name.data;
        }
        _events[eventName] && _events[eventName].map(function(item) {
          return item.callback(msg);
        });
      }
      EventManager.dispatchEvent = dispatchEvent;
    })(EventManager = exports.EventManager || (exports.EventManager = {}));
    function handler(name) {
      void 0 === name && (name = null);
      return function(target, propertyKey, descriptor) {
        return GManager_1.GManager.addEvtListener(name || propertyKey, descriptor.value, target.uuid);
      };
    }
    exports.handler = handler;
    cc._RF.pop();
  }, {
    "../GManager": "GManager"
  } ],
  GManager: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "094bdi7yEZGQbAb7D7BTktW", "GManager");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.GManager = void 0;
    var LogManager_1 = require("./base/LogManager");
    var EventManager_1 = require("./base/EventManager");
    var ResManager_1 = require("./base/ResManager");
    var PluginManager_1 = require("./plugin/PluginManager");
    var SceneManager_1 = require("./scene/SceneManager");
    var BaseFunc_1 = require("./base/BaseFunc");
    var NetManager_1 = require("./net/NetManager");
    var GateManager_1 = require("./net/GateManager");
    var AccountModel_1 = require("./model/AccountModel");
    var GManager;
    (function(GManager) {
      GManager.isTesting = BaseFunc_1.BaseFunc.parseSearchByName("isTesting");
      GManager.pluginWrapper = null;
      false;
      GManager.pluginMgr = PluginManager_1.default;
      GManager.isLog = true;
      GManager.log = LogManager_1.LogManager.log.bind(LogManager_1.LogManager);
      GManager.log2 = LogManager_1.LogManager.log2.bind(LogManager_1.LogManager);
      GManager.info = LogManager_1.LogManager.info.bind(LogManager_1.LogManager);
      GManager.info2 = LogManager_1.LogManager.info2.bind(LogManager_1.LogManager);
      GManager.info3 = LogManager_1.LogManager.info3.bind(LogManager_1.LogManager);
      GManager.warn = LogManager_1.LogManager.warn.bind(LogManager_1.LogManager);
      GManager.error = LogManager_1.LogManager.error.bind(LogManager_1.LogManager);
      GManager.addEvtListener = EventManager_1.EventManager.addEventListener;
      GManager.removeEvtListener = EventManager_1.EventManager.removeEventListener;
      GManager.removeEvtListenerByUuid = EventManager_1.EventManager.removeEventListenerByUUID;
      GManager.dispatchEvent = EventManager_1.EventManager.dispatchEvent;
      GManager.loadPrefab = ResManager_1.ResManager.loadPrefab;
      GManager.loadImage = ResManager_1.ResManager.loadImage;
      GManager.loadImages = ResManager_1.ResManager.loadImages;
      GManager.loadAudio = ResManager_1.ResManager.loadAudio;
      GManager.loadAudios = ResManager_1.ResManager.loadAudios;
      GManager.commonData = [];
      GManager.gameConfig = {};
      GManager.BACKGROUND_NODE = BaseFunc_1.NODE_TYPE.BACKGROUND_NODE;
      GManager.MAIN_NODE = BaseFunc_1.NODE_TYPE.MAIN_NODE;
      GManager.MENU_NODE = BaseFunc_1.NODE_TYPE.MENU_NODE;
      GManager.POP_NODE = BaseFunc_1.NODE_TYPE.POP_NODE;
      GManager.FLUSH_NODE = BaseFunc_1.NODE_TYPE.FLUSH_NODE;
      GManager.popScene = SceneManager_1.SceneManager.popScene;
      GManager.closeScene = SceneManager_1.SceneManager.closeScene;
      GManager.socket = {
        login: GateManager_1.GateManager.login,
        close: NetManager_1.NetManager.close,
        reconn: NetManager_1.NetManager.reconnect,
        send: NetManager_1.NetManager.send,
        setProto: GateManager_1.GateManager.setProto,
        unsetProto: GateManager_1.GateManager.unsetProto,
        request: GateManager_1.GateManager.request,
        notfiy: GateManager_1.GateManager.notify
      };
      GManager.Account = AccountModel_1.AccountModel.regModel();
      GManager.model = [];
    })(GManager = exports.GManager || (exports.GManager = {}));
    cc._RF.pop();
  }, {
    "./base/BaseFunc": "BaseFunc",
    "./base/EventManager": "EventManager",
    "./base/LogManager": "LogManager",
    "./base/ResManager": "ResManager",
    "./model/AccountModel": "AccountModel",
    "./net/GateManager": "GateManager",
    "./net/NetManager": "NetManager",
    "./plugin/PluginManager": "PluginManager",
    "./scene/SceneManager": "SceneManager"
  } ],
  GameConfig: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "2af96fcVyNGVolPU5TlN5B8", "GameConfig");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var GManager_1 = require("./framework/GManager");
    var GameConfig;
    (function(GameConfig) {
      GameConfig.pn = "com.flyhihi.deeprogue";
      GameConfig.version = "1.0.0.1";
    })(GameConfig || (GameConfig = {}));
    GManager_1.GManager.gameConfig = GameConfig;
    cc._RF.pop();
  }, {
    "./framework/GManager": "GManager"
  } ],
  GameMain: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "e6a037LD31C5avRrs/oZtFy", "GameMain");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var GManager_1 = require("./framework/GManager");
    var BaseFunc_1 = require("./framework/base/BaseFunc");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var GameMain = function(_super) {
      __extends(GameMain, _super);
      function GameMain() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      GameMain.prototype.start = function() {
        this.initConfig();
      };
      GameMain.prototype.initConfig = function() {
        this.showUpdateScene(null);
      };
      GameMain.prototype.showUpdateScene = function(msg) {
        GManager_1.GManager.popScene("moduleLobby", "LobbyScene3d", GManager_1.GManager.MAIN_NODE, function() {
          BaseFunc_1.BaseFunc.getWorkNode(GManager_1.GManager.FLUSH_NODE).removeAllChildren(true);
        });
      };
      GameMain = __decorate([ ccclass ], GameMain);
      return GameMain;
    }(cc.Component);
    exports.default = GameMain;
    cc._RF.pop();
  }, {
    "./framework/GManager": "GManager",
    "./framework/base/BaseFunc": "BaseFunc"
  } ],
  GateManager: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "5c7550DXOlI+LpW90LKJoni", "GateManager");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.GateManager = void 0;
    var GManager_1 = require("../GManager");
    var GateManager;
    (function(GateManager) {
      var dittoWSWrapper = window["dittoWSWrapper"];
      var _proto = {};
      function registe() {
        dittoWSWrapper.on("io-error", function(event) {
          GManager_1.GManager.error("#########io-error#########", event);
        }.bind(this));
        dittoWSWrapper.on("reconnect", function() {
          GManager_1.GManager.log("#########reconnect#########");
        }.bind(this));
        dittoWSWrapper.on("close", function(event) {
          GManager_1.GManager.log("#########close#########", event);
        }.bind(this));
        dittoWSWrapper.on("disconnect", function(event) {
          GManager_1.GManager.log("#########disconnect#########", event);
        }.bind(this));
        dittoWSWrapper.on("heartbeat timeout", function() {
          GManager_1.GManager.log("#########heartbeat timeout#########");
        }.bind(this));
        dittoWSWrapper.on("error", function(msg) {
          GManager_1.GManager.log("#########error#########", msg);
        }.bind(this));
        dittoWSWrapper.on("onKick", function(data) {
          GManager_1.GManager.log("#########error#########", data);
        }.bind(this));
        dittoWSWrapper.on("onopen", function(data) {
          GManager_1.GManager.log("#########onopen#########", data);
        }.bind(this));
        dittoWSWrapper.on("onData", function(data) {
          data && GManager_1.GManager.dispatchEvent(data.route, decodePacket(data.route, data.body));
        }.bind(this));
      }
      function login(host, port) {
        registe();
        var sockPromise = new Promise(function(resolve, reject) {
          dittoWSWrapper.init({
            host: host,
            port: port
          }, function(socket) {
            GManager_1.GManager.log("connected", socket);
            if (null === socket) reject("failed"); else {
              resolve("success");
              GManager_1.GManager.dispatchEvent("SOCKET_CONNECT");
            }
          });
        });
        sockPromise.then(function(msg) {}).catch(function(msg) {});
      }
      GateManager.login = login;
      function setProto(name, proto) {
        _proto[name] && delete _proto[name];
        _proto[name] = proto;
      }
      GateManager.setProto = setProto;
      function unsetProto(name) {
        _proto[name] && delete _proto[name];
      }
      GateManager.unsetProto = unsetProto;
      function findProto(name) {
        for (var key in _proto) if (_proto[key][name]) return _proto[key][name];
        return null;
      }
      function encodePacket(name, packet) {
        var p = findProto(name);
        p || GManager_1.GManager.log("encode Packet : Unknown Packet = " + name);
        var buf = p.create(packet);
        buf = p.encode(buf).finish();
        return buf;
      }
      function decodePacket(name, data) {
        var p = findProto(name);
        p || GManager_1.GManager.log("Decode Packet : Unknown Proto = " + name);
        var packet = p.decode(data);
        var propertys = Reflect.getPrototypeOf(packet);
        for (var key in propertys) {
          if ("function" === typeof propertys[key]) continue;
          false === propertys.hasOwnProperty.call(packet, key) && (packet[key] = propertys[key]);
        }
        return packet;
      }
      function request(route, reqName, reqBody, resName, cb) {
        try {
          dittoWSWrapper.request(route, encodePacket(reqName, reqBody), function(data) {
            var msg = decodePacket(resName, data);
            cb = cb || function() {};
            cb(msg);
          });
        } catch (e) {
          GManager_1.GManager.info.log(e);
        }
      }
      GateManager.request = request;
      function notify(route, reqName, reqBody) {
        GManager_1.GManager.info2(route, reqName);
        GManager_1.GManager.log(reqBody);
        dittoWSWrapper.notify(route + "Handler", encodePacket(reqName, reqBody));
      }
      GateManager.notify = notify;
    })(GateManager = exports.GateManager || (exports.GateManager = {}));
    cc._RF.pop();
  }, {
    "../GManager": "GManager"
  } ],
  GuestPlugin: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "ee527QvH1ZJqoEzw+36ahUJ", "GuestPlugin");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.GuestPlugin = void 0;
    var GManager_1 = require("../GManager");
    var HttpManager_1 = require("../net/HttpManager");
    var BaseFunc_1 = require("../base/BaseFunc");
    var CREATE_ACCOUNT = "user/register";
    var LOGIN_ACCOUNT = "user/login";
    var GuestPlugin = function() {
      function GuestPlugin() {
        this.pluginTypes = [];
        this._loginHead = "";
      }
      GuestPlugin.prototype.setParam = function(data) {
        this._loginHead = data.loginHead;
      };
      GuestPlugin.prototype.login = function(data) {
        var account = BaseFunc_1.BaseFunc.parseSearchByName("imei");
        account ? this.loginAccount(account) : this.createAccount();
      };
      GuestPlugin.prototype.loginAccount = function(account) {
        var url = this._loginHead + LOGIN_ACCOUNT;
        var params = {
          type: 1,
          uid: "",
          account: account,
          password: ""
        };
        var self = this;
        HttpManager_1.HttpManager.post(url, null, params, function(msg) {
          if (null == msg || "" == msg) {
            GManager_1.GManager.dispatchEvent("GUEST_LOGIN_ERROR");
            return;
          }
          if (!msg.code) {
            var data = {
              account: account,
              uid: msg.uid,
              token: msg.token,
              nickname: msg.userName,
              face: msg.faceUri
            };
            GManager_1.GManager.dispatchEvent("GUEST_LOGIN", data);
          } else self.createAccount();
        });
      };
      GuestPlugin.prototype.createAccount = function() {
        var url = this._loginHead + CREATE_ACCOUNT;
        "" == GManager_1.GManager.gameConfig.imei && (GManager_1.GManager.gameConfig.imei = BaseFunc_1.BaseFunc.parseSearchByName("imei"));
        var params = {
          type: 1,
          account: GManager_1.GManager.gameConfig.imei,
          password: ""
        };
        var self = this;
        HttpManager_1.HttpManager.post(url, null, params, function(msg) {
          if (null == msg || "" == msg) {
            GManager_1.GManager.dispatchEvent("GUEST_LOGIN_ERROR");
            return;
          }
          if (msg) {
            BaseFunc_1.BaseFunc.save("guest_account", GManager_1.GManager.gameConfig.imei);
            self.loginAccount(GManager_1.GManager.gameConfig.imei);
          }
        });
      };
      GuestPlugin.prototype.pay = function(data) {};
      GuestPlugin.prototype.share = function(data) {};
      GuestPlugin.prototype.showAd = function(type) {};
      GuestPlugin.prototype.hideAd = function(type) {};
      return GuestPlugin;
    }();
    exports.GuestPlugin = GuestPlugin;
    cc._RF.pop();
  }, {
    "../GManager": "GManager",
    "../base/BaseFunc": "BaseFunc",
    "../net/HttpManager": "HttpManager"
  } ],
  H5PluginProxyWrapper: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "6f5f6DFDzVM17pV1aUG5mYU", "H5PluginProxyWrapper");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var GManager_1 = require("../../framework/GManager");
    var IPluginProxy_1 = require("./IPluginProxy");
    var GuestPlugin_1 = require("./GuestPlugin");
    var BaseFunc_1 = require("../base/BaseFunc");
    var ccclass = cc._decorator.ccclass;
    var PLUGIN_PROXY;
    (function(PLUGIN_PROXY) {
      PLUGIN_PROXY[PLUGIN_PROXY["PLUGIN_GUEST"] = 0] = "PLUGIN_GUEST";
      PLUGIN_PROXY[PLUGIN_PROXY["PLUGIN_PHONE"] = 1] = "PLUGIN_PHONE";
      PLUGIN_PROXY[PLUGIN_PROXY["PLUGIN_QTT"] = 2] = "PLUGIN_QTT";
    })(PLUGIN_PROXY || (PLUGIN_PROXY = {}));
    var H5PluginProxyWrapper = function() {
      function H5PluginProxyWrapper() {
        this._imei = "";
        this._plugins = [];
        this._curPlugins = [];
        null == H5PluginProxyWrapper_1._instance && (H5PluginProxyWrapper_1._instance = this);
      }
      H5PluginProxyWrapper_1 = H5PluginProxyWrapper;
      H5PluginProxyWrapper.prototype.getInstance = function() {
        null == H5PluginProxyWrapper_1._instance && (H5PluginProxyWrapper_1._instance = new H5PluginProxyWrapper_1());
        return H5PluginProxyWrapper_1._instance;
      };
      H5PluginProxyWrapper.prototype.pushPlugin = function(PluginType) {
        if (null == this._plugins[PluginType]) {
          var plugin = null;
          PluginType === PLUGIN_PROXY.PLUGIN_GUEST && (plugin = new GuestPlugin_1.GuestPlugin());
          this._plugins[PluginType] = plugin;
        }
        return this._plugins[PluginType];
      };
      H5PluginProxyWrapper.prototype.getPlugin = function(PluginType) {
        if (this._plugins[PluginType]) return this._plugins[PluginType];
        return null;
      };
      H5PluginProxyWrapper.prototype.getDefaultPlugin = function(type) {
        if (this._curPlugins[type]) return this._curPlugins[type];
        for (var key in this._plugins) if (this._plugins[key].pluginTypes[type]) return this._plugins[key];
        return null;
      };
      H5PluginProxyWrapper.prototype.setPluginConfig = function(data) {
        var configs = JSON.parse(data).plugins;
        for (var _i = 0, configs_1 = configs; _i < configs_1.length; _i++) {
          var val = configs_1[_i];
          var plugin = null;
          if ("SessionGuest" == val.name) {
            plugin = this.pushPlugin(PLUGIN_PROXY.PLUGIN_GUEST);
            plugin.setParam({
              loginHead: GManager_1.GManager.gameConfig.getEvnConfig().loginURL
            });
          } else if ("SessionQtt" == val.name) {
            plugin = this.pushPlugin(PLUGIN_PROXY.PLUGIN_QTT);
            plugin.setParam({
              appId: val.appId,
              appKey: val.appKey
            });
          } else "QttPay" == val.name ? plugin = this.pushPlugin(PLUGIN_PROXY.PLUGIN_QTT) : "QttAd" == val.name && (plugin = this.pushPlugin(PLUGIN_PROXY.PLUGIN_QTT));
          plugin.pluginTypes[val.type] = true;
          val.default && 1 === val.default && (this._curPlugins[val.type] = plugin);
        }
      };
      H5PluginProxyWrapper.prototype.setPackageName = function(packetName) {
        GManager_1.GManager.gameConfig.packetName = packetName;
      };
      H5PluginProxyWrapper.prototype.switchPluginXRunEnv = function(env) {
        GManager_1.GManager.gameConfig.CurENV = env;
      };
      H5PluginProxyWrapper.prototype.setSessionCallBack = function(data) {};
      H5PluginProxyWrapper.prototype.setIapCallBack = function(data) {};
      H5PluginProxyWrapper.prototype.setSocialCallBack = function(data) {};
      H5PluginProxyWrapper.prototype.setPlatformCallBack = function(data) {};
      H5PluginProxyWrapper.prototype.setAdsCallBack = function(data) {};
      H5PluginProxyWrapper.prototype.startUpdatingLocation = function() {};
      H5PluginProxyWrapper.prototype.getPluginVersion = function() {
        return GManager_1.GManager.gameConfig.vision;
      };
      H5PluginProxyWrapper.prototype.getDeviceIMEI = function() {
        return BaseFunc_1.BaseFunc.parseSearchByName("imei");
      };
      H5PluginProxyWrapper.prototype.getMacAddress = function() {
        return "";
      };
      H5PluginProxyWrapper.prototype.getVersionCode = function() {
        return GManager_1.GManager.gameConfig.visionCode;
      };
      H5PluginProxyWrapper.prototype.getDeviceName = function() {
        return "h5";
      };
      H5PluginProxyWrapper.prototype.loadPlugin = function(name, idx, type) {
        var pluginType = -1;
        "SessionGuest" === name ? pluginType = PLUGIN_PROXY.PLUGIN_GUEST : "SessionPhone" === name ? pluginType = PLUGIN_PROXY.PLUGIN_PHONE : -1 !== name.indexOf("Qtt") && (pluginType = PLUGIN_PROXY.PLUGIN_QTT);
        var plugin = this.getPlugin(pluginType);
        null !== plugin && plugin.pluginTypes[type] && (this._curPlugins[type] = plugin);
      };
      H5PluginProxyWrapper.prototype.copyToClipboard = function(text) {
        var textArea = document.getElementById("clipBoard");
        if (null === textArea) {
          textArea = document.createElement("textarea");
          textArea.id = "clipBoard";
          textArea.textContent = text;
          document.body.appendChild(textArea);
        }
        textArea["select"]();
        try {
          document.body.removeChild(textArea);
        } catch (err) {}
      };
      H5PluginProxyWrapper.prototype.getClipBoardContent = function() {};
      H5PluginProxyWrapper.prototype.initHeadFace = function(url) {};
      H5PluginProxyWrapper.prototype.payForProduct = function(data) {};
      H5PluginProxyWrapper.prototype.shareWithItems = function(data) {};
      H5PluginProxyWrapper.prototype.jump2ExtendMethod = function(tag) {};
      H5PluginProxyWrapper.prototype.StartPushSDKItem = function(data) {};
      H5PluginProxyWrapper.prototype.userItemsLogin = function(data) {
        var params = JSON.parse(data);
        var plugin = this._curPlugins[IPluginProxy_1.EPluginType.kPluginSession];
        plugin.login(params);
      };
      H5PluginProxyWrapper.prototype.logout = function() {};
      H5PluginProxyWrapper.prototype.logEvent = function(name, param) {};
      H5PluginProxyWrapper.prototype.showAds = function(type) {
        var plugin = this._curPlugins[IPluginProxy_1.EPluginType.kPluginSession];
        plugin && plugin.showAd(type);
      };
      H5PluginProxyWrapper.prototype.hideAds = function(type) {
        var plugin = this._curPlugins[IPluginProxy_1.EPluginType.kPluginSession];
        plugin && plugin.hideAd(type);
      };
      var H5PluginProxyWrapper_1;
      H5PluginProxyWrapper._instance = null;
      H5PluginProxyWrapper = H5PluginProxyWrapper_1 = __decorate([ ccclass ], H5PluginProxyWrapper);
      return H5PluginProxyWrapper;
    }();
    exports.default = H5PluginProxyWrapper;
    cc.sys.isBrowser && (GManager_1.GManager.pluginWrapper = new H5PluginProxyWrapper());
    cc._RF.pop();
  }, {
    "../../framework/GManager": "GManager",
    "../base/BaseFunc": "BaseFunc",
    "./GuestPlugin": "GuestPlugin",
    "./IPluginProxy": "IPluginProxy"
  } ],
  HttpManager: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "fef69iMoBdBJJXqUZ/I+Mcp", "HttpManager");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.HttpManager = void 0;
    var GManager_1 = require("../GManager");
    var BaseFunc_1 = require("../base/BaseFunc");
    var HttpManager;
    (function(HttpManager) {
      function formatUrl(url) {
        var ret = /^https?:\/\/(.*)/.exec(url);
        ret && (url = ret[1]);
        return (GManager_1.GManager.gameConfig.isHttps ? "https://" : "http://") + url;
      }
      function linkParam(url, params) {
        if (-1 == url.indexOf("?")) {
          url += "?";
          for (var key_1 in params) url = url + key_1 + "=" + encodeURIComponent(params[key_1]) + "&";
          url = url.substr(0, url.length - 1);
        } else for (var key in params || {}) url = url.replace("{" + key + "}", encodeURIComponent(params[key]));
        url = formatUrl(url);
        cc.sys.platform != cc.sys.WECHAT_GAME && GManager_1.GManager.gameConfig.agencyAddress && (url = GManager_1.GManager.gameConfig.agencyAddress + encodeURI(url));
        return url;
      }
      function get(url, params, callback) {
        var xhr = cc.loader.getXMLHttpRequest();
        xhr.timeout = 5e3;
        var request = linkParam(url, params);
        xhr.open("GET", request, true);
        if (cc.sys.isNative) {
          xhr.setRequestHeader("Accept", "text/html");
          xhr.setRequestHeader("Accept-Charset", "utf-8");
          xhr.setRequestHeader("Accept-Encoding", "gzip,deflate");
        }
        xhr.onload = function() {
          var res = null;
          200 == xhr.status && (res = params && params.response ? xhr.response : BaseFunc_1.BaseFunc.IsJSON(xhr.responseText) ? JSON.parse(xhr.responseText) : xhr.responseText);
          callback && callback(res);
        };
        xhr.onabort = function() {
          callback(null, "the request has been aborted");
        };
        xhr.onerror = function(event) {
          callback(null, event);
        };
        xhr.ontimeout = function(event) {
          callback(null, "timeout");
        };
        xhr.send();
        return xhr;
      }
      HttpManager.get = get;
      function post(url, params, body, callback) {
        var xhr = cc.loader.getXMLHttpRequest();
        xhr.timeout = 5e3;
        var request = linkParam(url, params);
        xhr.open("POST", request, true);
        if (cc.sys.isNative) {
          xhr.setRequestHeader("Accept", "text/html");
          xhr.setRequestHeader("Accept-Charset", "utf-8");
          xhr.setRequestHeader("Accept-Encoding", "gzip,deflate");
        }
        if (body) {
          "object" === typeof body && (body = JSON.stringify(body));
          xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        }
        xhr.onload = function() {
          var res = null;
          if (200 == xhr.status) res = BaseFunc_1.BaseFunc.IsJSON(xhr.responseText) ? JSON.parse(xhr.responseText) : xhr.responseText; else if (307 == xhr.status) {
            res = BaseFunc_1.BaseFunc.IsJSON(xhr.responseText) ? JSON.parse(xhr.responseText) : xhr.responseText;
            if (res.Location) {
              this.HTTPPostRequest(res.Location, params, callback, xhr.timeout);
              return;
            }
          }
          callback && callback(res);
        }.bind(this);
        xhr.onabort = function() {
          callback(null, "the request has been aborted");
        };
        xhr.onerror = function(event) {
          callback(null, event);
        };
        body && xhr.send(body);
        return xhr;
      }
      HttpManager.post = post;
      function download(url, params, callback) {
        var xhr = cc.loader.getXMLHttpRequest();
        xhr.timeout = 5e3;
        var request = linkParam(url, params);
        xhr.responseType = "arraybuffer";
        xhr.open("GET", request, true);
        if (cc.sys.isNative) {
          xhr.setRequestHeader("Accept", "text/html");
          xhr.setRequestHeader("Accept-Charset", "utf-8");
          xhr.setRequestHeader("Accept-Encoding", "gzip,deflate");
        }
        xhr.onreadystatechange = function() {
          if (4 === xhr.readyState && xhr.status >= 200 && xhr.status < 300) {
            var buffer = xhr.response;
            var dataview = new DataView(buffer);
            var ints = new Uint8Array(buffer.byteLength);
            for (var i = 0; i < ints.length; i++) ints[i] = dataview.getUint8(i);
            callback(ints, null);
          } else callback(null, xhr.readyState + ":" + xhr.status);
        };
        xhr.send();
        return xhr;
      }
      HttpManager.download = download;
    })(HttpManager = exports.HttpManager || (exports.HttpManager = {}));
    cc._RF.pop();
  }, {
    "../GManager": "GManager",
    "../base/BaseFunc": "BaseFunc"
  } ],
  IPluginProxyWrapper: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "c5c48dWK6xOvbQeon3W0xPv", "IPluginProxyWrapper");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    cc._RF.pop();
  }, {} ],
  IPluginProxy: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "93715r5kBNNjqV96r5pHJSs", "IPluginProxy");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.EPluginType = void 0;
    var EPluginType;
    (function(EPluginType) {
      EPluginType[EPluginType["kPluginAds"] = 1] = "kPluginAds";
      EPluginType[EPluginType["kPluginIAP"] = 3] = "kPluginIAP";
      EPluginType[EPluginType["kPluginSession"] = 5] = "kPluginSession";
      EPluginType[EPluginType["kPluginExend"] = 6] = "kPluginExend";
    })(EPluginType = exports.EPluginType || (exports.EPluginType = {}));
    cc._RF.pop();
  }, {} ],
  JoystickCommon: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "4429cHQeVZFSKUxRn1YDgMn", "JoystickCommon");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.SpeedType = exports.DirectionType = exports.JoystickType = void 0;
    exports.JoystickType = cc.Enum({
      FIXED: 0,
      FOLLOW: 1
    });
    exports.DirectionType = cc.Enum({
      FOUR: 4,
      EIGHT: 8,
      ALL: 0
    });
    exports.SpeedType = cc.Enum({
      STOP: 0,
      NORMAL: 1,
      FAST: 2
    });
    cc._RF.pop();
  }, {} ],
  Joystick: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "debeerwJ81Cd4k6hzWU8jAm", "Joystick");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var JoystickCommon_1 = require("./JoystickCommon");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var Joystick = function(_super) {
      __extends(Joystick, _super);
      function Joystick() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.dot = null;
        _this.ring = null;
        _this.playernode = null;
        _this.joystickType = JoystickCommon_1.JoystickType.FIXED;
        _this.directionType = JoystickCommon_1.DirectionType.ALL;
        _this._stickPos = null;
        _this._touchLocation = null;
        _this._radius = 50;
        _this.inputParam = {
          speed: 0,
          dir: cc.v2(0, 0)
        };
        return _this;
      }
      Joystick.prototype.onLoad = function() {
        this._radius = this.ring.width / 2;
        this._initTouchEvent();
        this.joystickType == JoystickCommon_1.JoystickType.FOLLOW && (this.node.opacity = 0);
      };
      Joystick.prototype.bindPlayer = function(player) {
        this.playernode = player;
        this.player = this.playernode.getComponent("Spider");
      };
      Joystick.prototype._initTouchEvent = function() {
        this.node.on(cc.Node.EventType.TOUCH_START, this._touchStartEvent, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this._touchMoveEvent, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this._touchEndEvent, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this._touchEndEvent, this);
      };
      Joystick.prototype._touchStartEvent = function(event) {
        var touchPos = this.node.parent.convertToNodeSpaceAR(event.getLocation());
        if (this.joystickType === JoystickCommon_1.JoystickType.FIXED) {
          this._stickPos = this.ring.getPosition();
          var distance = touchPos.sub(this.ring.getPosition()).mag();
          this._radius > distance && this.dot.setPosition(touchPos);
        } else if (this.joystickType === JoystickCommon_1.JoystickType.FOLLOW) {
          this._stickPos = touchPos;
          this.node.opacity = 255;
          this._touchLocation = event.getLocation();
          this.ring.setPosition(touchPos);
          this.dot.setPosition(touchPos);
        }
      };
      Joystick.prototype._touchMoveEvent = function(event) {
        if (!this.player) return;
        if (this.joystickType === JoystickCommon_1.JoystickType.FOLLOW && this._touchLocation === event.getLocation()) return false;
        var touchPos = this.ring.convertToNodeSpaceAR(event.getLocation());
        var distance = touchPos.mag();
        var posX = this._stickPos.x + touchPos.x;
        var posY = this._stickPos.y + touchPos.y;
        var p = cc.v2(posX, posY).sub(this.ring.getPosition()).normalize();
        var param = {
          _speedType: 0,
          moveDir: p
        };
        this.inputParam.dir = p;
        if (this._radius > distance) {
          this.dot.setPosition(cc.v2(posX, posY));
          this.inputParam.speed = JoystickCommon_1.SpeedType.NORMAL;
        } else {
          var x = this._stickPos.x + p.x * this._radius;
          var y = this._stickPos.y + p.y * this._radius;
          this.dot.setPosition(cc.v2(x, y));
          this.inputParam.speed = JoystickCommon_1.SpeedType.FAST;
        }
        this.setPlayerSpeed(this.inputParam);
      };
      Joystick.prototype._touchEndEvent = function() {
        this.dot.setPosition(this.ring.getPosition());
        this.joystickType == JoystickCommon_1.JoystickType.FOLLOW && (this.node.opacity = 0);
        this.inputParam.speed = JoystickCommon_1.SpeedType.STOP;
        this.setPlayerSpeed(this.inputParam);
      };
      Joystick.prototype.toServerData = function() {
        return this.inputParam;
      };
      Joystick.prototype.setPlayerSpeed = function(param) {
        this.player._speedType = this.inputParam.speed;
        this.player.moveDir = this.inputParam.dir;
        this.player.node.rotationX += 2 * this.inputParam.dir.x;
        this.player.node.rotationY += 2 * this.inputParam.dir.y;
      };
      __decorate([ property({
        type: cc.Node,
        displayName: "Dot",
        tooltip: "\u6447\u6746\u64cd\u7eb5\u70b9"
      }) ], Joystick.prototype, "dot", void 0);
      __decorate([ property({
        type: cc.Node,
        displayName: "Ring",
        tooltip: "\u6447\u6746\u80cc\u666f\u8282\u70b9"
      }) ], Joystick.prototype, "ring", void 0);
      __decorate([ property({
        type: cc.Node,
        displayName: "Player",
        tooltip: "\u64cd\u63a7\u89d2\u8272"
      }) ], Joystick.prototype, "playernode", void 0);
      __decorate([ property({
        type: JoystickCommon_1.JoystickType,
        displayName: "Touch Type",
        tooltip: "\u89e6\u6478\u7c7b\u578b"
      }) ], Joystick.prototype, "joystickType", void 0);
      __decorate([ property({
        type: JoystickCommon_1.DirectionType,
        displayName: "Direction Type",
        tooltip: "\u65b9\u5411\u7c7b\u578b"
      }) ], Joystick.prototype, "directionType", void 0);
      __decorate([ property({
        type: cc.Node,
        tooltip: "\u6447\u6746\u6240\u5728\u4f4d\u7f6e"
      }) ], Joystick.prototype, "_stickPos", void 0);
      __decorate([ property({
        type: cc.Node,
        tooltip: "\u89e6\u6478\u4f4d\u7f6e"
      }) ], Joystick.prototype, "_touchLocation", void 0);
      __decorate([ property() ], Joystick.prototype, "_radius", void 0);
      Joystick = __decorate([ ccclass ], Joystick);
      return Joystick;
    }(cc.Component);
    exports.default = Joystick;
    cc._RF.pop();
  }, {
    "./JoystickCommon": "JoystickCommon"
  } ],
  LanguageData: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "61de062n4dJ7ZM9/Xdumozn", "LanguageData");
    "use strict";
    var Polyglot = require("polyglot.min");
    var polyInst = null;
    window.i18n || (window.i18n = {
      languages: {},
      curLang: ""
    });
    false;
    function loadLanguageData(language) {
      return window.i18n.languages[language];
    }
    function initPolyglot(data) {
      data && (polyInst ? polyInst.replace(data) : polyInst = new Polyglot({
        phrases: data,
        allowMissing: true
      }));
    }
    module.exports = {
      init: function init(language) {
        if (language === window.i18n.curLang) return;
        var data = loadLanguageData(language) || {};
        window.i18n.curLang = language;
        initPolyglot(data);
        this.inst = polyInst;
      },
      t: function t(key, opt) {
        if (polyInst) return polyInst.t(key, opt);
      },
      inst: polyInst,
      updateSceneRenderers: function updateSceneRenderers() {
        var rootNodes = cc.director.getScene().children;
        var allLocalizedLabels = [];
        for (var i = 0; i < rootNodes.length; ++i) {
          var labels = rootNodes[i].getComponentsInChildren("LocalizedLabel");
          Array.prototype.push.apply(allLocalizedLabels, labels);
        }
        for (var _i = 0; _i < allLocalizedLabels.length; ++_i) {
          var label = allLocalizedLabels[_i];
          if (!label.node.active) continue;
          label.updateLabel();
        }
        var allLocalizedSprites = [];
        for (var _i2 = 0; _i2 < rootNodes.length; ++_i2) {
          var sprites = rootNodes[_i2].getComponentsInChildren("LocalizedSprite");
          Array.prototype.push.apply(allLocalizedSprites, sprites);
        }
        for (var _i3 = 0; _i3 < allLocalizedSprites.length; ++_i3) {
          var sprite = allLocalizedSprites[_i3];
          if (!sprite.node.active) continue;
          sprite.updateSprite(window.i18n.curLang);
        }
      }
    };
    cc._RF.pop();
  }, {
    "polyglot.min": "polyglot.min"
  } ],
  LobbyScene: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "7deea2Bk/hM47e/cibCh1ix", "LobbyScene");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var BaseScene_1 = require("../framework/scene/BaseScene");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var LobbyScene = function(_super) {
      __extends(LobbyScene, _super);
      function LobbyScene() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      LobbyScene.prototype.start = function() {
        this.addPlayer();
      };
      LobbyScene.prototype.addPlayer = function(playerInfo) {
        var node_ani = this.rootNode["Player"];
        node_ani["handler"] = node_ani.getComponent("Player");
        this.myPlayer = this.rootNode["Player"];
        this.onAddLocalPlayer();
      };
      LobbyScene.prototype.initCamera = function() {
        cc.Camera.main.backgroundColor = cc.Color.GRAY;
        this.mainCamera = this.mainCamera.getComponent("MainCamera");
        this.mainCamera.init(this.myPlayer);
      };
      LobbyScene.prototype.onAddLocalPlayer = function() {
        this.initCamera();
        this.initJoyStick();
      };
      LobbyScene.prototype.initJoyStick = function() {
        this.rootNode["Joystick"].getComponent("Joystick").bindPlayer(this.myPlayer);
      };
      __decorate([ property(cc.Camera) ], LobbyScene.prototype, "mainCamera", void 0);
      LobbyScene = __decorate([ ccclass ], LobbyScene);
      return LobbyScene;
    }(BaseScene_1.default);
    exports.default = LobbyScene;
    cc._RF.pop();
  }, {
    "../framework/scene/BaseScene": "BaseScene"
  } ],
  LocalizedLabel: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "744dcs4DCdNprNhG0xwq6FK", "LocalizedLabel");
    "use strict";
    var i18n = require("LanguageData");
    function debounce(func, wait, immediate) {
      var timeout;
      return function() {
        var context = this, args = arguments;
        var later = function later() {
          timeout = null;
          immediate || func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        callNow && func.apply(context, args);
      };
    }
    cc.Class({
      extends: cc.Component,
      editor: {
        executeInEditMode: true,
        menu: "i18n/LocalizedLabel"
      },
      properties: {
        dataID: {
          get: function get() {
            return this._dataID;
          },
          set: function set(val) {
            if (this._dataID !== val) {
              this._dataID = val;
              false;
              this.updateLabel();
            }
          }
        },
        _dataID: ""
      },
      onLoad: function onLoad() {
        false;
        i18n.inst || i18n.init();
        this.fetchRender();
      },
      fetchRender: function fetchRender() {
        var label = this.getComponent(cc.Label);
        if (label) {
          this.label = label;
          this.updateLabel();
          return;
        }
      },
      updateLabel: function updateLabel() {
        if (!this.label) {
          cc.error("Failed to update localized label, label component is invalid!");
          return;
        }
        var localizedString = i18n.t(this.dataID);
        localizedString && (this.label.string = i18n.t(this.dataID));
      }
    });
    cc._RF.pop();
  }, {
    LanguageData: "LanguageData"
  } ],
  LocalizedSprite: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f34ac2GGiVOBbG6XlfvgYP4", "LocalizedSprite");
    "use strict";
    var SpriteFrameSet = require("SpriteFrameSet");
    cc.Class({
      extends: cc.Component,
      editor: {
        executeInEditMode: true,
        inspector: "packages://i18n/inspector/localized-sprite.js",
        menu: "i18n/LocalizedSprite"
      },
      properties: {
        spriteFrameSet: {
          default: [],
          type: SpriteFrameSet
        }
      },
      onLoad: function onLoad() {
        this.fetchRender();
      },
      fetchRender: function fetchRender() {
        var sprite = this.getComponent(cc.Sprite);
        if (sprite) {
          this.sprite = sprite;
          this.updateSprite(window.i18n.curLang);
          return;
        }
      },
      getSpriteFrameByLang: function getSpriteFrameByLang(lang) {
        for (var i = 0; i < this.spriteFrameSet.length; ++i) if (this.spriteFrameSet[i].language === lang) return this.spriteFrameSet[i].spriteFrame;
      },
      updateSprite: function updateSprite(language) {
        if (!this.sprite) {
          cc.error("Failed to update localized sprite, sprite component is invalid!");
          return;
        }
        var spriteFrame = this.getSpriteFrameByLang(language);
        !spriteFrame && this.spriteFrameSet[0] && (spriteFrame = this.spriteFrameSet[0].spriteFrame);
        this.sprite.spriteFrame = spriteFrame;
      }
    });
    cc._RF.pop();
  }, {
    SpriteFrameSet: "SpriteFrameSet"
  } ],
  LogManager: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "01b80/eV+5JZb1VcyfHc/D6", "LogManager");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.LogManager = void 0;
    var GManager_1 = require("../GManager");
    var LogManager;
    (function(LogManager) {
      function log() {
        if (!GManager_1.GManager.isLog) return;
        var log = cc.log || console.log || window["log"];
        1 == arguments.length && "object" == typeof arguments[0] ? log.call(LogManager, "%s", _getDateString(), arguments[0], _stack(1)) : log.call(LogManager, "%s %s", _getDateString(), cc.js.formatStr.apply(cc, arguments), _stack(1));
      }
      LogManager.log = log;
      function log2() {
        if (!GManager_1.GManager.isLog) return;
        var log = cc.log || console.log || window["log"];
        1 == arguments.length && "object" == typeof arguments[0] ? log.call(LogManager, "%c%s", "color:#EED2EE;", _getDateString(), arguments[0], _stack(1)) : log.call(LogManager, "%c%s %s %s", "color:#EED2EE;", _getDateString(), cc.js.formatStr.apply(cc, arguments), _stack(1));
      }
      LogManager.log2 = log2;
      function info() {
        if (!GManager_1.GManager.isLog) return;
        var log = cc.log || console.log || window["log"];
        log.call(LogManager, "%c%s %s %s", "color:#00CD00;", _getDateString(), cc.js.formatStr.apply(cc, arguments), _stack());
      }
      LogManager.info = info;
      function info2() {
        if (!GManager_1.GManager.isLog) return;
        var log = cc.log || console.log || window["log"];
        log.call(LogManager, "%c%s %s %s", "color:#F08080;", _getDateString(), cc.js.formatStr.apply(cc, arguments), _stack());
      }
      LogManager.info2 = info2;
      function info3() {
        if (!GManager_1.GManager.isLog) return;
        var log = cc.log || console.log || window["log"];
        log.call(LogManager, "%c%s %s %s", "color:#9B30FF;", _getDateString(), cc.js.formatStr.apply(cc, arguments), _stack());
      }
      LogManager.info3 = info3;
      function warn() {
        if (!GManager_1.GManager.isLog) return;
        var log = cc.log || console.log || window["log"];
        log.call(LogManager, "%c%s %s %s", "color:#ee7700;", _getDateString(), cc.js.formatStr.apply(cc, arguments), _stack());
      }
      LogManager.warn = warn;
      function error() {
        if (!GManager_1.GManager.isLog) return;
        var log = cc.log || console.log || window["log"];
        log.call(LogManager, "%c%s %s %s", "color:red", _getDateString(), cc.js.formatStr.apply(cc, arguments), _stack(5));
      }
      LogManager.error = error;
      function _stack(deep) {
        void 0 === deep && (deep = 3);
        var e = new Error();
        var lines = e.stack.split("\n");
        lines.shift();
        var result = [];
        lines.forEach(function(line) {
          line = line.substring(7);
          result.push(line);
        });
        var str = "";
        for (var i = 0; 0 < deep && i < result.length; i++) {
          var l = result[i].split(" ");
          if ("_stack" !== l[0] && "eval" !== l[0] && "Array.map" !== l[0] && "Object.log" !== l[0] && "Object.info" !== l[0] && "Object.warn" !== l[0] && "Object.error" !== l[0]) {
            str += "\n at " + result[i].replace("Object.", "");
            deep--;
          }
        }
        return str;
      }
      function _getDateString() {
        var d = new Date();
        var str = d.getHours() + "";
        var timeStr = "";
        timeStr += (1 === str.length ? "0" + str : str) + ":";
        str = d.getMinutes() + "";
        timeStr += (1 === str.length ? "0" + str : str) + ":";
        str = d.getSeconds() + "";
        timeStr += (1 === str.length ? "0" + str : str) + ".";
        str = d.getMilliseconds() + "";
        1 === str.length && (str = "00" + str);
        2 === str.length && (str = "0" + str);
        timeStr += str;
        timeStr = "[" + timeStr + "]";
        return timeStr;
      }
      function _getArguments(args) {
        return args[0];
      }
    })(LogManager = exports.LogManager || (exports.LogManager = {}));
    cc._RF.pop();
  }, {
    "../GManager": "GManager"
  } ],
  MainCamera: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "4dde4PSI21KZ4soRE/ESjzX", "MainCamera");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        camera: cc.Camera
      },
      init: function init(target) {
        this.target = target;
      },
      lateUpdate: function lateUpdate(dt) {
        if (this.target) {
          this.camera.x = this.target.x;
          this.camera.y = this.target.y;
          var targetPos = this.target.parent.convertToWorldSpaceAR(this.target.position);
          this.node.position = this.node.parent.convertToNodeSpaceAR(targetPos);
        }
      }
    });
    cc._RF.pop();
  }, {} ],
  NetManager: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "bbb7b4+8mdL+aDda/B5/4zu", "NetManager");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.NetManager = void 0;
    var WebSocketWrapper_1 = require("./WebSocketWrapper");
    var GManager_1 = require("../GManager");
    var BaseFunc_1 = require("../base/BaseFunc");
    var _socketWrapper = {};
    var NetManager;
    (function(NetManager) {
      function login(linkName, url) {
        if (null === _socketWrapper[linkName] || void 0 === _socketWrapper[linkName]) {
          _socketWrapper[linkName] = new WebSocketWrapper_1.default();
          _socketWrapper[linkName].url = url;
          _socketWrapper[linkName].linkName = linkName;
          _socketWrapper[linkName].onMessage = onMessage;
          _socketWrapper[linkName].connect();
        }
      }
      NetManager.login = login;
      function getSocketState(linkName) {
        if (null === _socketWrapper[linkName] || void 0 === _socketWrapper[linkName]) return null;
        return _socketWrapper[linkName].getReadyState();
      }
      function onMessage(message) {
        if (null == message) return;
        var opcode = message.opcode;
        var packet = message.packet;
        GManager_1.GManager.dispatchEvent(opcode, packet);
      }
      function close(linkName, deleteSocket) {
        void 0 === deleteSocket && (deleteSocket = true);
        if (null === _socketWrapper[linkName] || void 0 === _socketWrapper[linkName]) return null;
        var socket = _socketWrapper[linkName];
        if (null != socket) {
          socket.close();
          deleteSocket && delete _socketWrapper[linkName];
        }
      }
      NetManager.close = close;
      function reconnect(linkName) {
        if (null === _socketWrapper[linkName] || void 0 === _socketWrapper[linkName]) return null;
        var socket = _socketWrapper[linkName];
        socket.reconnect();
      }
      NetManager.reconnect = reconnect;
      function send(linkName, message) {
        if (null === _socketWrapper[linkName] || void 0 === _socketWrapper[linkName]) return null;
        var socket = _socketWrapper[linkName];
        if (socket.getReadyState()) socket.send(message); else {
          if (socket.getBeOnClose()) return;
          if (socket.getCloseState()) {
            var delaySend = function() {
              socket && socket.send(message);
            };
            socket.reconnect();
            cc.director.getScheduler().schedule(delaySend, BaseFunc_1.BaseFunc.mainCanvas(), 1);
          } else if (socket) {
            var delaySend = function() {
              socket && socket.send(message);
            };
            cc.director.getScheduler().schedule(delaySend, BaseFunc_1.BaseFunc.mainCanvas(), .5);
          }
        }
      }
      NetManager.send = send;
      function setProto(linkName, protoName, proto, opcodeConfig) {
        if (null === _socketWrapper || null === _socketWrapper[linkName]) return null;
        var socket = _socketWrapper[linkName];
        socket.setProto(protoName, proto, opcodeConfig);
      }
      NetManager.setProto = setProto;
      function unsetProto(linkName, protoName, proto, opcodeConfig) {
        if (null === _socketWrapper || null === _socketWrapper[linkName]) return null;
        var socket = _socketWrapper[linkName];
        socket.unsetProto(protoName);
      }
      NetManager.unsetProto = unsetProto;
    })(NetManager = exports.NetManager || (exports.NetManager = {}));
    cc._RF.pop();
  }, {
    "../GManager": "GManager",
    "../base/BaseFunc": "BaseFunc",
    "./WebSocketWrapper": "WebSocketWrapper"
  } ],
  Player: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b70a0M3IGREBp3BkH5umwQa", "Player");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var JoystickCommon_1 = require("../module3rd/JoystickCommon");
    var BaseScene_1 = require("../framework/scene/BaseScene");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var PLAYER_STATUS;
    (function(PLAYER_STATUS) {
      PLAYER_STATUS[PLAYER_STATUS["idle"] = 0] = "idle";
      PLAYER_STATUS[PLAYER_STATUS["run"] = 1] = "run";
      PLAYER_STATUS[PLAYER_STATUS["attack"] = 2] = "attack";
    })(PLAYER_STATUS || (PLAYER_STATUS = {}));
    var Player = function(_super) {
      __extends(Player, _super);
      function Player() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.moveDir = cc.v2(0, 0);
        _this._speedType = JoystickCommon_1.SpeedType.STOP;
        _this._moveSpeed = 0;
        _this.stopSpeed = 0;
        _this.normalSpeed = 200;
        _this.fastSpeed = 600;
        _this.curStatus = PLAYER_STATUS.idle;
        _this.playingLock = false;
        _this.playingLockRun = false;
        return _this;
      }
      Player.prototype.onLoad = function() {
        this.curStatus = PLAYER_STATUS.idle;
        this.playAni();
      };
      Player.prototype.playAni = function() {
        var animation = this.rootNode["heroAni"].getComponent(cc.Animation);
        var actionName = "hero_run";
        var actionCount = 1;
        var actionTime = .5;
        actionCount = Infinity;
        var animState = animation.play(actionName);
        animState.repeatCount = actionCount;
        animState.speed = actionTime;
      };
      Player.prototype.playAni2 = function() {
        var _this = this;
        true;
        return;
        var onFinished;
        var animation;
        var actionName;
        var actionCount;
        var actionTime;
        var animState;
      };
      Player.prototype.onBeginContact = function(contact, selfCollider, otherCollider) {};
      Player.prototype.move = function() {
        this.moveDir.x < 0 ? this.node.scaleX = -1 : this.moveDir.x > 0 && (this.node.scaleX = 1);
        var movePos = this.moveDir.mul(this._moveSpeed / 60);
        var newPos = this.node.position.add(cc.v3(movePos.x, movePos.y, 0));
        this.node.setPosition(newPos);
      };
      Player.prototype.updateInput = function(cmd) {
        this._speedType = cmd.speed;
        this.moveDir = cc.v2(cmd.dir.x, cmd.dir.y);
        this.playAni();
        for (var i in cmd.fire) {
          this.curStatus = PLAYER_STATUS.attack;
          this.playAni();
        }
      };
      Player.prototype.update = function(dt) {
        switch (this._speedType) {
         case JoystickCommon_1.SpeedType.STOP:
          this._moveSpeed = this.stopSpeed;
          this.curStatus = PLAYER_STATUS.idle;
          break;

         case JoystickCommon_1.SpeedType.NORMAL:
          this._moveSpeed = this.normalSpeed;
          this.curStatus = PLAYER_STATUS.run;
          break;

         case JoystickCommon_1.SpeedType.FAST:
          this._moveSpeed = this.fastSpeed;
          this.curStatus = PLAYER_STATUS.run;
        }
        this.move();
      };
      __decorate([ property({
        type: cc.Vec2,
        displayName: "Move Dir",
        tooltip: "\u79fb\u52a8\u65b9\u5411"
      }) ], Player.prototype, "moveDir", void 0);
      __decorate([ property({
        type: JoystickCommon_1.SpeedType.STOP,
        displayName: "Speed Type",
        tooltip: "\u901f\u5ea6\u7ea7\u522b"
      }) ], Player.prototype, "_speedType", void 0);
      __decorate([ property({
        type: cc.Integer,
        displayName: "Move Speed",
        tooltip: "\u79fb\u52a8\u901f\u5ea6"
      }) ], Player.prototype, "_moveSpeed", void 0);
      __decorate([ property({
        type: cc.Integer,
        tooltip: "\u505c\u6b62\u65f6\u901f\u5ea6"
      }) ], Player.prototype, "stopSpeed", void 0);
      Player = __decorate([ ccclass ], Player);
      return Player;
    }(BaseScene_1.default);
    exports.default = Player;
    cc._RF.pop();
  }, {
    "../framework/scene/BaseScene": "BaseScene",
    "../module3rd/JoystickCommon": "JoystickCommon"
  } ],
  PluginManager: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "bbff441Av1GxJVgE89imBni", "PluginManager");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.EAdsResult = exports.EAdsType = exports.EPlatformEvent = void 0;
    var GManager_1 = require("../GManager");
    var BaseFunc_1 = require("../base/BaseFunc");
    var IPluginProxy_1 = require("./IPluginProxy");
    var EPlatformEvent;
    (function(EPlatformEvent) {
      EPlatformEvent[EPlatformEvent["GET_CLIPBOARD_SUCCESS"] = 21] = "GET_CLIPBOARD_SUCCESS";
      EPlatformEvent[EPlatformEvent["GET_OPENINSTALL_PARAMS"] = 50] = "GET_OPENINSTALL_PARAMS";
    })(EPlatformEvent = exports.EPlatformEvent || (exports.EPlatformEvent = {}));
    var EAdsType;
    (function(EAdsType) {
      EAdsType[EAdsType["ADS_TYPE_BANNER"] = 0] = "ADS_TYPE_BANNER";
      EAdsType[EAdsType["ADS_TYPE_INTER"] = 3] = "ADS_TYPE_INTER";
      EAdsType[EAdsType["ADS_TYPE_REWARTVIDEO"] = 4] = "ADS_TYPE_REWARTVIDEO";
    })(EAdsType = exports.EAdsType || (exports.EAdsType = {}));
    var EAdsResult;
    (function(EAdsResult) {
      EAdsResult[EAdsResult["RESULT_CODE_REWARTVIDEO_SUCCEES"] = 12] = "RESULT_CODE_REWARTVIDEO_SUCCEES";
      EAdsResult[EAdsResult["RESULT_CODE_REWARTVIDEO_FAIL"] = 13] = "RESULT_CODE_REWARTVIDEO_FAIL";
    })(EAdsResult = exports.EAdsResult || (exports.EAdsResult = {}));
    var native_class_name = "com/skyhighgame/utils/PluginWrapper";
    var cbs = {
      login: void 0,
      showVideoAd: void 0,
      hideSplashAd: void 0
    };
    function callStaticNativeMethod(method, sign) {
      var params = [];
      for (var _i = 2; _i < arguments.length; _i++) params[_i - 2] = arguments[_i];
      true;
      return;
    }
    function onNativeCallback(method, data) {
      console.log("JSCallback", method, data);
      cbs[method] && cbs[method](data);
      cbs[method] = void 0;
    }
    window.onNativeCallback = onNativeCallback;
    var PluginManager;
    (function(PluginManager) {
      var _pluginProxy;
      var _iapPluginList;
      var _config = {};
      function onInit() {
        cc.log("[PluginManager.onInit]");
        setPluginEnv();
        if (null != GManager_1.GManager.pluginWrapper) {
          _pluginProxy = GManager_1.GManager.pluginWrapper.getInstance();
          _pluginProxy.setSessionCallBack(onSessionCallBack);
          _pluginProxy.setIapCallBack(onIapCallBack);
          _pluginProxy.setSocialCallBack(onSocialCallBack);
          _pluginProxy.setPlatformCallBack(onPlatformCallBack);
          _pluginProxy.setAdsCallBack && _pluginProxy.setAdsCallBack(onAdsCallBack);
          window["JavascriptJavaCallBack"] = onJavascriptJavaCallBack;
          if (cc.sys.isNative) {
            setPluginConfig(jsb.fileUtils.getValueMapFromFile("thirdparty/plugins.plist"));
            return;
          }
        }
        cc.loader.loadRes("thirdparty/plugins", function(err, file) {
          if (err) return;
          setPluginConfig(file._nativeAsset);
        });
      }
      PluginManager.onInit = onInit;
      function showVideoAd(index, callback) {
        cbs.showVideoAd = callback;
        jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AdManage", "showRewardedVideo", "()V");
      }
      PluginManager.showVideoAd = showVideoAd;
      function setPluginEnv() {
        var config;
        false;
        var env = BaseFunc_1.BaseFunc.load("LAST_PLUGIN_ENV");
        null != env && (GManager_1.GManager.gameConfig.CurENV = env);
        cc.log("[PluginManager.setPluginEnv] CurENV", GManager_1.GManager.gameConfig.CurENV);
        var cn = BaseFunc_1.BaseFunc.load("TEST_CN");
        null != cn && (GManager_1.GManager.gameConfig.packetName = cn);
      }
      function getConfig(name) {
        return _config[name];
      }
      PluginManager.getConfig = getConfig;
      function setPluginConfig(config) {
        cc.log("[PluginManager.pluginConfig]", JSON.stringify(config));
        PluginManager.pluginConfig = config;
        BaseFunc_1.BaseFunc.load("TEST_CN") || (GManager_1.GManager.gameConfig.packetName = PluginManager.pluginConfig.game[0].PacketName);
        if (_pluginProxy) {
          cc.sys.os == cc.sys.OS_ANDROID && (GManager_1.GManager.gameConfig.packetName = BaseFunc_1.BaseFunc.callStaticMethod("com/izhangxin/utils/luaj", "getChannelName", "()Ljava/lang/String;"));
          _pluginProxy.setPluginConfig(JSON.stringify(PluginManager.pluginConfig));
          cc.log("[PluginManager.pluginConfig] packetName", GManager_1.GManager.gameConfig.packetName);
          _pluginProxy.setPackageName(GManager_1.GManager.gameConfig.packetName);
          cc.log("[PluginManager.pluginConfig] CurENV", GManager_1.GManager.gameConfig.CurENV);
          _pluginProxy.switchPluginXRunEnv(GManager_1.GManager.gameConfig.CurENV);
          for (var _i = 0, _a = PluginManager.pluginConfig.plugins; _i < _a.length; _i++) {
            var plugin = _a[_i];
            loadPlugin(plugin.name, parseInt(plugin.type));
          }
        }
        loadPayModeList();
        GManager_1.GManager.commonData["noAD"] = !hasPluginByType(IPluginProxy_1.EPluginType.kPluginAds);
        GManager_1.GManager.commonData["pluginFinish"] = true;
        GManager_1.GManager.dispatchEvent("PLUGIN_LOAD_FINISH");
      }
      function loadPlugin(name, type) {
        _pluginProxy.loadPlugin(name, 0, type);
      }
      function loadPluginByTag(tag, type) {
        for (var _i = 0, _a = PluginManager.pluginConfig.plugins; _i < _a.length; _i++) {
          var plugin = _a[_i];
          if (parseInt(plugin.tag) == tag && parseInt(plugin.type) == type) {
            loadPlugin(plugin.name, parseInt(plugin.type));
            break;
          }
        }
      }
      function loadPayModeList() {
        _iapPluginList = [];
        for (var _i = 0, _a = PluginManager.pluginConfig.plugins; _i < _a.length; _i++) {
          var plugin = _a[_i];
          plugin.type == IPluginProxy_1.EPluginType.kPluginIAP.toString() && _iapPluginList.push(plugin);
        }
      }
      function onSessionCallBack(data) {
        cc.log("[PluginManager.onSessionCallBack] data:", data);
        GManager_1.GManager.dispatchEvent("PluginSessionCallBack", data);
      }
      function onIapCallBack(data) {
        cc.log("[PluginManager.onIapCallBack] data:", data);
        GManager_1.GManager.dispatchEvent("PluginIapCallBack", data);
      }
      function onSocialCallBack(data) {
        cc.log("[PluginManager.onSocialCallBack] data:", data);
        GManager_1.GManager.dispatchEvent("PluginSocialCallBack", data);
      }
      function onPlatformCallBack(data) {
        cc.log("[PluginManager.onPlatformCallBack] data:", data);
        GManager_1.GManager.dispatchEvent("PluginPlatformCallBack", data);
      }
      function onAdsCallBack(data) {
        cc.log("[PluginManager.onAdsCallBack] data:", data);
        GManager_1.GManager.dispatchEvent("PluginAdsCallBack", data);
      }
      function onJavascriptJavaCallBack(message) {
        cc.log("[PluginManager.onJavascriptJavaCallBack] data:", JSON.stringify(message));
        GManager_1.GManager.dispatchEvent(message);
      }
      function getPluginVersion() {
        return _pluginProxy ? _pluginProxy.getPluginVersion("PlatformWP", 1, 9) : "5.0.0";
      }
      PluginManager.getPluginVersion = getPluginVersion;
      function getDeviceIMEI() {
        return _pluginProxy ? _pluginProxy.getDeviceIMEI() : "";
      }
      PluginManager.getDeviceIMEI = getDeviceIMEI;
      function getMacAddress() {
        return _pluginProxy ? _pluginProxy.getMacAddress() : "fa64d01eb8cfbdb9";
      }
      PluginManager.getMacAddress = getMacAddress;
      function getVersionCode() {
        return _pluginProxy ? parseInt(_pluginProxy.getVersionCode()) : 0;
      }
      PluginManager.getVersionCode = getVersionCode;
      function getDeviceName() {
        return _pluginProxy ? _pluginProxy.getDeviceName() : "Device";
      }
      PluginManager.getDeviceName = getDeviceName;
      function startUpdatingLocation() {
        if (_pluginProxy) return _pluginProxy.startUpdatingLocation();
      }
      PluginManager.startUpdatingLocation = startUpdatingLocation;
      function copyToClipboard(text) {
        _pluginProxy && _pluginProxy.copyToClipboard(text);
      }
      PluginManager.copyToClipboard = copyToClipboard;
      function getClipBoardContent() {
        _pluginProxy ? _pluginProxy.getClipBoardContent() : onPlatformCallBack(JSON.stringify({
          PlatformResultCode: EPlatformEvent.GET_CLIPBOARD_SUCCESS,
          msg: "\u83b7\u53d6\u526a\u5207\u677f\u5185\u5bb9\u6210\u529f",
          url: ""
        }));
      }
      PluginManager.getClipBoardContent = getClipBoardContent;
      function initHeadFace(url) {
        cc.log("[PluginManager.initHeadFace] url:", url);
        _pluginProxy.initHeadFace(JSON.stringify({
          UpLoadURL: url
        }));
      }
      PluginManager.initHeadFace = initHeadFace;
      function getPayTypeByMid(mid) {
        if (!PluginManager.pluginConfig) return;
        _iapPluginList || loadPayModeList();
        for (var _i = 0, _iapPluginList_1 = _iapPluginList; _i < _iapPluginList_1.length; _i++) {
          var plugin = _iapPluginList_1[_i];
          if (plugin.mid == mid.toString()) return plugin.name;
        }
        var h5List = {
          111: "IAPWeiXinH5"
        };
        return h5List[mid];
      }
      PluginManager.getPayTypeByMid = getPayTypeByMid;
      function getOnlyPayType() {
        if (!PluginManager.pluginConfig) return false;
        _iapPluginList || loadPayModeList();
        if (1 == _iapPluginList.length) return _iapPluginList[0].name;
        return false;
      }
      PluginManager.getOnlyPayType = getOnlyPayType;
      function hasPluginByName(name) {
        if (PluginManager.pluginConfig) for (var _i = 0, _a = PluginManager.pluginConfig.plugins; _i < _a.length; _i++) {
          var plugin = _a[_i];
          if (plugin.name == name) return true;
        }
        return false;
      }
      PluginManager.hasPluginByName = hasPluginByName;
      function hasPluginByType(eType) {
        if (PluginManager.pluginConfig) for (var _i = 0, _a = PluginManager.pluginConfig.plugins; _i < _a.length; _i++) {
          var plugin = _a[_i];
          if (plugin.type == eType.toString()) return true;
        }
        return false;
      }
      PluginManager.hasPluginByType = hasPluginByType;
      function login(loginInfo) {
        GManager_1.GManager.info("[PluginManager.login] sessionType:", JSON.stringify(loginInfo));
        if (_pluginProxy) {
          loginInfo.LoginHost = GManager_1.GManager.gameConfig.getEvnConfig().loginURL;
          loginInfo.PlatformHost = GManager_1.GManager.gameConfig.getEvnConfig().webURL;
          loadPlugin(loginInfo.sessionType, IPluginProxy_1.EPluginType.kPluginSession);
          _pluginProxy.userItemsLogin(JSON.stringify(loginInfo));
        }
      }
      PluginManager.login = login;
      function logout() {
        cc.log("[PluginManager.logout]");
        _pluginProxy && _pluginProxy.logout();
      }
      PluginManager.logout = logout;
      function pay(payType, payInfo) {
        if (_pluginProxy) {
          loadPlugin(payType, IPluginProxy_1.EPluginType.kPluginIAP);
          payInfo.IapHost = GManager_1.GManager.gameConfig.getEvnConfig().payURL;
          cc.log("[PluginManager.share]", JSON.stringify(payInfo));
          _pluginProxy.payForProduct(JSON.stringify(payInfo));
        } else delayCallBack(onIapCallBack, JSON.stringify({
          PayResultCode: 0,
          msg: "\u652f\u4ed8\u5b8c\u6210",
          payInfo: {}
        }));
      }
      PluginManager.pay = pay;
      function share(shareInfo) {
        if (_pluginProxy) {
          cc.log("[PluginManager.share]", JSON.stringify(shareInfo));
          _pluginProxy.shareWithItems(JSON.stringify(shareInfo));
        } else delayCallBack(onSocialCallBack, JSON.stringify({
          ShareResultCode: 0,
          msg: "\u5206\u4eab\u6210\u529f",
          shareResultInfo: {}
        }));
      }
      PluginManager.share = share;
      function openKeFu() {
        jump2ExtendMethod(3);
      }
      PluginManager.openKeFu = openKeFu;
      function jump2ExtendMethod(tag) {
        cc.log("[PluginManager.jump2ExtendMethod]", tag);
        if (_pluginProxy) {
          loadPluginByTag(tag, IPluginProxy_1.EPluginType.kPluginExend);
          _pluginProxy.jump2ExtendMethod(tag, JSON.stringify({}));
        }
      }
      function StartPushSDK() {
        cc.log("[PluginManager.StartPushSDK]");
        _pluginProxy && _pluginProxy.StartPushSDKItem(JSON.stringify({
          PushHost: GManager_1.GManager.gameConfig.getEvnConfig().webURL
        }));
      }
      PluginManager.StartPushSDK = StartPushSDK;
      function logEvent(name, param) {
        if (_pluginProxy) {
          cc.log("[PluginManager.logEvent]", name, JSON.stringify(param));
          _pluginProxy.logEvent(1, name, JSON.stringify(param) || "");
        }
      }
      PluginManager.logEvent = logEvent;
      function getOpenInstallParms() {
        cc.log("[PluginManager.getOpenInstallParms]");
        cc.sys.os == cc.sys.OS_ANDROID ? BaseFunc_1.BaseFunc.callStaticMethod("com/izhangxin/utils/luaj", "getOpenInstallParms", "()V") : cc.sys.os == cc.sys.OS_IOS && BaseFunc_1.BaseFunc.callStaticMethod("LuaObjc", "getOpenInstallParms");
      }
      PluginManager.getOpenInstallParms = getOpenInstallParms;
      function showAds(adsType) {
        cc.log("[PluginManager.showAds]", adsType);
        _pluginProxy ? _pluginProxy.showAds(adsType, 0, 0) : delayCallBack(onAdsCallBack, JSON.stringify({
          AdsResultCode: adsType == EAdsType.ADS_TYPE_REWARTVIDEO ? EAdsResult.RESULT_CODE_REWARTVIDEO_SUCCEES : 0,
          msg: ""
        }), 3);
      }
      PluginManager.showAds = showAds;
      function hideAds(adsType) {
        cc.log("[PluginManager.hideAds]", adsType);
        _pluginProxy && _pluginProxy.hideAds(adsType);
      }
      PluginManager.hideAds = hideAds;
      function delayCallBack(callback, data, time) {
        void 0 === time && (time = .5);
        if (_pluginProxy) return;
        cc.Canvas.instance.node.runAction(cc.sequence(cc.delayTime(time), cc.callFunc(function() {
          callback(data);
        })));
      }
      function getNotchHeight() {
        if (cc.sys.isNative && cc.sys.os == cc.sys.OS_ANDROID) {
          var version = BaseFunc_1.BaseFunc.callStaticMethod("com/izhangxin/utils/luaj", "getVersion", "()Ljava/lang/String;");
          if (BaseFunc_1.BaseFunc.versionCompare(version, "1.0.1") >= 0) return BaseFunc_1.BaseFunc.callStaticMethod("com/izhangxin/utils/luaj", "getNotchHeight", "()I");
        }
        return 0;
      }
      PluginManager.getNotchHeight = getNotchHeight;
      function getPrivateRoomCode() {
        if (cc.sys.isNative && cc.sys.os == cc.sys.OS_ANDROID) {
          var version = BaseFunc_1.BaseFunc.callStaticMethod("com/izhangxin/utils/luaj", "getVersion", "()Ljava/lang/String;");
          if (BaseFunc_1.BaseFunc.versionCompare(version, "1.0.2") >= 0) return BaseFunc_1.BaseFunc.callStaticMethod("com/izhangxin/utils/luaj", "getPrivateRoomCode", "()Ljava/lang/String;");
        }
        return "";
      }
      PluginManager.getPrivateRoomCode = getPrivateRoomCode;
    })(PluginManager || (PluginManager = {}));
    exports.default = PluginManager;
    cc._RF.pop();
  }, {
    "../GManager": "GManager",
    "../base/BaseFunc": "BaseFunc",
    "./IPluginProxy": "IPluginProxy"
  } ],
  PreLoad: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "4d770hvKhFC4aCAmYkgt9pd", "PreLoad");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var BaseScene_1 = require("./BaseScene");
    var GManager_1 = require("../GManager");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var PreLoad = function(_super) {
      __extends(PreLoad, _super);
      function PreLoad() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this._images = [];
        _this._audios = [];
        _this._count = 0;
        _this._value = 0;
        return _this;
      }
      PreLoad.prototype.onOpenScene = function() {
        GManager_1.GManager.popScene("moduleBase", "LoadingScene", GManager_1.GManager.FLUSH_NODE, this.preload.bind(this));
        GManager_1.GManager.addEvtListener("UPDATE_LOADING_FINISH", this.onLoadFinish.bind(this), this.uuid);
      };
      PreLoad.prototype.preload = function() {
        this._count = this._images.length + this._audios.length;
        this._count > 0 ? this.scheduleOnce(this.loadRes.bind(this), .1) : this.scheduleOnce(GManager_1.GManager.dispatchEvent.bind(this, "UPDATE_LOADING_PROGRESS", {
          value: 1
        }), .1);
      };
      PreLoad.prototype.loadRes = function() {
        var self = this;
        var item = null;
        var func = null;
        if (this._images.length > 0) {
          item = this._images.shift();
          func = GManager_1.GManager.loadImages;
        } else if (this._audios.length > 0) {
          item = this._audios.shift();
          func = GManager_1.GManager.loadAudios;
        }
        null !== item && func(item, function(res) {
          if (null === res) return;
          var value = self._value;
          if (null !== res.progress && void 0 !== res.progress) value += 1 * res.progress / self._count; else {
            value = 1 / self._count;
            self._value += value;
            self.scheduleOnce(self.loadRes.bind(self), .1);
          }
          GManager_1.GManager.dispatchEvent("UPDATE_LOADING_PROGRESS", {
            value: self._value
          });
        });
      };
      PreLoad.prototype.onLoadFinish = function() {};
      PreLoad.prototype.closeLoadingScene = function() {
        GManager_1.GManager.closeScene("LoadingScene");
      };
      PreLoad = __decorate([ ccclass ], PreLoad);
      return PreLoad;
    }(BaseScene_1.default);
    exports.default = PreLoad;
    cc._RF.pop();
  }, {
    "../GManager": "GManager",
    "./BaseScene": "BaseScene"
  } ],
  ResManager: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "a54afk7qm1P8LjSZlrPMHAB", "ResManager");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.ResManager = void 0;
    var GManager_1 = require("../GManager");
    var BaseFunc_1 = require("./BaseFunc");
    var _imageCaches = {};
    var _audioCaches = {};
    var ResManager;
    (function(ResManager) {
      function loadRes(path, type, callback) {
        void 0 === callback && (callback = null);
        if (null == path) {
          GManager_1.GManager.warn("UILoader loadRes path is null");
          return;
        }
        cc.loader.loadRes(path, type, function(err, res) {
          if (err) {
            GManager_1.GManager.error("Load asset err: ", err);
            return;
          }
          var obj = null;
          if (type == cc.Prefab) obj = cc.instantiate(res); else if (type === cc.SpriteFrame) {
            var src = path.substring(0, path.lastIndexOf("/"));
            var file = path.substring(path.lastIndexOf("/") + 1, path.length);
            cacheImages(src, file, res);
            obj = res;
          } else if (type === cc.AudioClip) {
            _audioCaches[path] = res;
            obj = res;
          } else obj = res;
          callback && "function" === typeof callback && callback(obj);
        });
      }
      function loadResHttp(path, callback) {
        void 0 === callback && (callback = null);
        if (null == path) {
          GManager_1.GManager.warn("UILoader loadRes path is null");
          return;
        }
        var type = path.substring(path.lastIndexOf(".") + 1, path.length);
        cc.loader.load({
          url: path,
          type: type
        }, function(err, res) {
          if (err) {
            GManager_1.GManager.error("Load asset err: ", err);
            return;
          }
          var obj = null;
          if ("png" === type || "jpg" === type) {
            var src = path.substring(0, path.lastIndexOf("/"));
            var file = path.substring(path.lastIndexOf("/") + 1, path.length);
            res = new cc.SpriteFrame(res);
            cacheImages(src, file, res);
            obj = res;
          } else if ("mp3" === type) {
            _audioCaches[path] = res;
            obj = res;
          } else obj = res;
          callback && "function" === typeof callback && callback(obj);
        });
      }
      function loadResDir(path, type, callback) {
        void 0 === callback && (callback = null);
        if (null == path) {
          GManager_1.GManager.warn("UILoader loadRes path is null");
          return;
        }
        cc.loader.loadResDir(path, type, function(count, total, item) {
          callback && "function" === typeof callback && callback({
            progress: count / total
          });
        }, function(err, res) {
          if (err) {
            GManager_1.GManager.error("Load asset err: ", err);
            return;
          }
          var obj = null;
          if (type == cc.Prefab) obj = res.map(function(item) {
            return cc.instantiate(item);
          }); else if (type === cc.SpriteFrame) {
            res.map(function(item) {
              return cacheImages(path, item.name, item);
            });
            obj = res;
          } else if (type === cc.AudioClip) {
            res.map(function(item) {
              return _audioCaches[item.name] = item;
            });
            obj = res;
          } else obj = res;
          callback && "function" === typeof callback && callback(obj);
        });
      }
      function loadResArray(path, type, callback) {
        void 0 === callback && (callback = null);
        if (null == path || "object" != typeof path || 0 == path.length) {
          GManager_1.GManager.warn("UILoader loadResArray path is null or path length is 0");
          return;
        }
        cc.loader.loadResArray(path, type, function(count, total, item) {
          callback && "function" === typeof callback && callback({
            progress: count / total
          });
        }, function(err, res) {
          if (err) {
            GManager_1.GManager.error("Load asset err: ", err);
            return;
          }
          var obj = null;
          if (type == cc.Prefab) obj = res.map(function(item) {
            return cc.instantiate(item);
          }); else if (type === cc.SpriteFrame) {
            res.map(function(item) {
              return cacheImages(path, item.name, item);
            });
            obj = res;
          } else if (type === cc.AudioClip) {
            res.map(function(item) {
              return _audioCaches[item.name] = item;
            });
            obj = res;
          } else obj = res;
          callback && "function" === typeof callback && callback(obj);
        });
      }
      function retainRes(obj) {
        void 0 === cc.loader["_cache"][obj.name] ? cc.loader["_cache"][obj.name] = {
          refCount: 0
        } : cc.loader["_cache"][obj.name].refCount += 1;
      }
      function releaseRes(obj) {
        cc.loader["_cache"][obj.name].refCount -= 1;
      }
      function cacheImages(path, name, res) {
        null !== _imageCaches[path] && void 0 !== _imageCaches[path] || (_imageCaches[path] = {});
        null !== _imageCaches[path][name] && void 0 !== _imageCaches[path][name] || (_imageCaches[path][name] = res);
      }
      function loadPrefab(path, callback) {
        loadRes(path, cc.Prefab, callback);
      }
      ResManager.loadPrefab = loadPrefab;
      function loadImage(path, callback) {
        var src = path.substring(0, path.lastIndexOf("/"));
        var file = path.substring(path.lastIndexOf("/") + 1, path.length);
        if (_imageCaches[src] && _imageCaches[src][file]) {
          callback && "function" === typeof callback && callback(_imageCaches[src][file]);
          return;
        }
        BaseFunc_1.BaseFunc.IsHttpSrc(path) ? loadResHttp(path, callback) : loadRes(path, cc.SpriteFrame, callback);
      }
      ResManager.loadImage = loadImage;
      function loadImages(path, callback) {
        "string" === typeof path ? loadResDir(path, cc.SpriteFrame, callback) : loadResArray(path, cc.SpriteFrame, callback);
      }
      ResManager.loadImages = loadImages;
      function loadAudio(path, callback) {
        if (_audioCaches[path]) {
          callback && "function" === typeof callback && callback(_audioCaches[path]);
          return;
        }
        BaseFunc_1.BaseFunc.IsHttpSrc(path) ? loadResHttp(path, callback) : loadRes(path, cc.AudioClip, callback);
      }
      ResManager.loadAudio = loadAudio;
      function loadAudios(path, callback) {
        "string" === typeof path ? loadResDir(path, cc.AudioClip, callback) : loadResArray(path, cc.AudioClip, callback);
      }
      ResManager.loadAudios = loadAudios;
    })(ResManager = exports.ResManager || (exports.ResManager = {}));
    cc._RF.pop();
  }, {
    "../GManager": "GManager",
    "./BaseFunc": "BaseFunc"
  } ],
  SceneManager: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "25445gBDhJOpavSXgCOdJnT", "SceneManager");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.SceneManager = void 0;
    var BaseScene_1 = require("./BaseScene");
    var GManager_1 = require("../GManager");
    var BaseFunc_1 = require("../base/BaseFunc");
    var _scenes = {};
    var SceneManager;
    (function(SceneManager) {
      function destroyScene(baseScene) {
        baseScene.node.removeFromParent(true);
        baseScene.node.destroy();
      }
      function popScene(moduleName, name, type, initParams, callback) {
        void 0 === type && (type = BaseFunc_1.NODE_TYPE.POP_NODE);
        void 0 === callback && (callback = null);
        GManager_1.GManager.loadPrefab(moduleName + "/prefab/" + name, function(res) {
          res.position = cc.Vec3.ZERO;
          if (type === BaseFunc_1.NODE_TYPE.POP_NODE) {
            var parent_1 = BaseFunc_1.BaseFunc.getWorkNode(type);
            if (null === parent_1.getChildByName("MaskNode")) {
              var maskNode_1 = new cc.Node("MaskNode");
              maskNode_1.setContentSize(cc.winSize);
              var sprite = maskNode_1.addComponent(cc.Sprite);
              sprite.spriteFrame = new cc.SpriteFrame();
              var texture = new cc.Texture2D();
              texture.initWithData(new Uint8Array([ 0, 0, 0, 150 ]), cc.Texture2D.PixelFormat.RGBA8888, 1, 1);
              sprite.spriteFrame.setTexture(texture);
              sprite.spriteFrame.setRect(cc.rect(0, 0, 20 * cc.winSize.width, 20 * cc.winSize.width));
              var button = maskNode_1.addComponent(cc.Button);
              button.transition = cc.Button.Transition.NONE;
              var baseScene_1 = maskNode_1.addComponent(BaseScene_1.default);
              baseScene_1["onMaskClose"] = function(sender, data) {
                var pop = parent_1.children[parent_1.childrenCount - 1].getComponent(BaseScene_1.default);
                pop.maskClose && !pop.checkPopCollision(sender.touch._point) && pop.closeSelf();
              };
              baseScene_1.addEvtListener("CLOSE_SCENE", function() {
                1 === parent_1.childrenCount ? maskNode_1.removeFromParent(true) : maskNode_1.setSiblingIndex(parent_1.childrenCount - 2);
              });
              baseScene_1.addEvtListener("POP_SCENE", function() {
                maskNode_1.setSiblingIndex(parent_1.childrenCount - 2);
              });
              BaseFunc_1.BaseFunc.AddButtonEvent(button, maskNode_1, "BaseScene", "onMaskClose");
              parent_1.addChild(maskNode_1);
            }
          }
          BaseFunc_1.BaseFunc.getWorkNode(type).addChild(res);
          if ("function" === typeof initParams) {
            callback = initParams;
            initParams = null;
          }
          var baseScene = res.getComponent(BaseScene_1.default);
          baseScene || (baseScene = res.addComponent(BaseScene_1.default));
          baseScene.sceneName = res.name;
          baseScene.initParams = initParams;
          baseScene.scheduleOnce(baseScene.onOpenScene.bind(baseScene), 0);
          BaseFunc_1.BaseFunc.regEventHandler(baseScene);
          _scenes[res.name] = baseScene;
          callback && "function" === typeof callback && callback(baseScene);
          GManager_1.GManager.dispatchEvent("POP_SCENE", {
            scene: baseScene
          });
        });
      }
      SceneManager.popScene = popScene;
      function closeScene(scene, callback) {
        void 0 === callback && (callback = null);
        "string" === typeof scene && (scene = _scenes[scene]);
        scene.onCloseScene();
        scene.closeCallBack();
        BaseFunc_1.BaseFunc.removeEventHandler(scene);
        callback && "function" === typeof callback && callback();
        delete _scenes[scene.sceneName];
        scene.node.removeFromParent(true);
        scene.node.destroy();
        GManager_1.GManager.dispatchEvent("CLOSE_SCENE", {
          scene: scene
        });
      }
      SceneManager.closeScene = closeScene;
    })(SceneManager = exports.SceneManager || (exports.SceneManager = {}));
    cc._RF.pop();
  }, {
    "../GManager": "GManager",
    "../base/BaseFunc": "BaseFunc",
    "./BaseScene": "BaseScene"
  } ],
  Spider: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "13023KeOqFFv7ry5jtt455b", "Spider");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var JoystickCommon_1 = require("../module3rd/JoystickCommon");
    var BaseScene_1 = require("../framework/scene/BaseScene");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var PLAYER_STATUS;
    (function(PLAYER_STATUS) {
      PLAYER_STATUS[PLAYER_STATUS["idle"] = 0] = "idle";
      PLAYER_STATUS[PLAYER_STATUS["run"] = 1] = "run";
      PLAYER_STATUS[PLAYER_STATUS["attack"] = 2] = "attack";
    })(PLAYER_STATUS || (PLAYER_STATUS = {}));
    var Player = function(_super) {
      __extends(Player, _super);
      function Player() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.moveDir = cc.v2(0, 0);
        _this._speedType = JoystickCommon_1.SpeedType.STOP;
        _this._moveSpeed = 0;
        _this.stopSpeed = 0;
        _this.normalSpeed = 200;
        _this.fastSpeed = 600;
        _this.curStatus = PLAYER_STATUS.idle;
        _this.playingLock = false;
        _this.playingLockRun = false;
        return _this;
      }
      Player.prototype.onLoad = function() {};
      Player.prototype.playAni = function() {};
      Player.prototype.updateInput = function(cmd) {
        this._speedType = cmd.speed;
        this.moveDir = cc.v2(cmd.dir.x, cmd.dir.y);
        this.playAni();
        for (var i in cmd.fire) {
          this.curStatus = PLAYER_STATUS.attack;
          this.playAni();
        }
      };
      Player.prototype.update = function(dt) {};
      __decorate([ property({
        type: cc.Vec2,
        displayName: "Move Dir",
        tooltip: "\u79fb\u52a8\u65b9\u5411"
      }) ], Player.prototype, "moveDir", void 0);
      __decorate([ property({
        type: JoystickCommon_1.SpeedType.STOP,
        displayName: "Speed Type",
        tooltip: "\u901f\u5ea6\u7ea7\u522b"
      }) ], Player.prototype, "_speedType", void 0);
      __decorate([ property({
        type: cc.Integer,
        displayName: "Move Speed",
        tooltip: "\u79fb\u52a8\u901f\u5ea6"
      }) ], Player.prototype, "_moveSpeed", void 0);
      __decorate([ property({
        type: cc.Integer,
        tooltip: "\u505c\u6b62\u65f6\u901f\u5ea6"
      }) ], Player.prototype, "stopSpeed", void 0);
      Player = __decorate([ ccclass ], Player);
      return Player;
    }(BaseScene_1.default);
    exports.default = Player;
    cc._RF.pop();
  }, {
    "../framework/scene/BaseScene": "BaseScene",
    "../module3rd/JoystickCommon": "JoystickCommon"
  } ],
  SpriteFrameSet: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "97019Q80jpE2Yfz4zbuCZBq", "SpriteFrameSet");
    "use strict";
    var SpriteFrameSet = cc.Class({
      name: "SpriteFrameSet",
      properties: {
        language: "",
        spriteFrame: cc.SpriteFrame
      }
    });
    module.exports = SpriteFrameSet;
    cc._RF.pop();
  }, {} ],
  UpdateScene: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "9b2d158vIhN16G2fDsSTId4", "UpdateScene");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var NewClass = function(_super) {
      __extends(NewClass, _super);
      function NewClass() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.label = null;
        _this.text = "hello";
        return _this;
      }
      NewClass.prototype.start = function() {};
      __decorate([ property(cc.Label) ], NewClass.prototype, "label", void 0);
      __decorate([ property ], NewClass.prototype, "text", void 0);
      NewClass = __decorate([ ccclass ], NewClass);
      return NewClass;
    }(cc.Component);
    exports.default = NewClass;
    cc._RF.pop();
  }, {} ],
  WebSocketWrapper: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "0a446ip8IZAb5R9ONchSTtt", "WebSocketWrapper");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var BaseFunc_1 = require("../base/BaseFunc");
    var GManager_1 = require("../GManager");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var Socket = window.WebSocket || window["MozWebSocket"];
    var reverse = {};
    var define = {};
    function opcode(opcode) {
      if ("number" === typeof opcode) return reverse[opcode];
      if ("string" === typeof opcode) return define[opcode];
      return null;
    }
    var WebSocketWrapper = function() {
      function WebSocketWrapper() {
        this.url = "";
        this.linkName = "";
        this.websocket = null;
        this.MAX_RECONNECT = 5;
        this._reconnectTimes = 0;
        this._pingConut = 0;
        this._socketClose = false;
        this.Protocol = window["Protocol"];
        this._packets = {};
      }
      WebSocketWrapper.prototype.setProto = function(name, proto, opcode) {
        this._packets[name] = {
          proto: proto,
          opcode: opcode
        };
      };
      WebSocketWrapper.prototype.unsetProto = function(name) {
        this._packets[name] && delete this._packets[name];
      };
      WebSocketWrapper.prototype.getPacketCode = function(opcode) {
        for (var key in this._packets) {
          var code = this._packets[key].opcode(opcode);
          if (null !== code && void 0 !== code) return code;
        }
        return null;
      };
      WebSocketWrapper.prototype.getPacketProto = function(opcode) {
        for (var key in this._packets) {
          var packetName = opcode;
          "number" === typeof opcode && (packetName = this._packets[key].opcode(opcode));
          if (null !== packetName && void 0 !== packetName) return this._packets[key].proto[packetName];
        }
        return null;
      };
      WebSocketWrapper.prototype.connect = function() {
        var _this = this;
        this.websocket && this.websocket.close();
        this._socketClose = false;
        this.websocket = null;
        var requestHead = "wss://";
        this.websocket = new WebSocket(requestHead + this.url);
        this.websocket.binaryType = "arraybuffer";
        this.websocket.onopen = function(event) {
          _this.sendProtoReq();
          _this.startPing();
          GManager_1.GManager.dispatchEvent("SOCKET_OPEN", {
            url: requestHead + _this.url
          });
        };
        this.websocket.onmessage = function(msgEvnt) {
          var message = _this.decodePacket(msgEvnt.data);
          if (null == message) return;
          if ("proto_pong" == message.opcode) {
            _this._pingConut--;
            return;
          }
          _this.onMessage(message);
        };
        this.websocket.onerror = function(err) {
          var errmsg = BaseFunc_1.BaseFunc.IsJSON(err) ? JSON.stringify(err) : err;
          var data = {
            linkName: _this.linkName,
            mes: errmsg
          };
          GManager_1.GManager.dispatchEvent("SOCKET_ERROR", data);
        };
        this.websocket.onclose = function(event) {
          if (true == _this._socketClose) return;
          GManager_1.GManager.info("onclose", event.target["url"], _this.url);
          if (event.target["url"] != requestHead + _this.url + "/") return;
          if (1066 === event.code) {
            _this.connectFail();
            return;
          }
          if (_this._reconnectTimes <= _this.MAX_RECONNECT) {
            cc.director.getScheduler().schedule(_this.reconnect.bind(_this), BaseFunc_1.BaseFunc.mainCanvas(), 15, 1, 0, false);
            _this._reconnectTimes++;
            return;
          }
          _this.stopPing();
          _this.websocket.close();
          GManager_1.GManager.dispatchEvent("SOCKET_CLOSE", {
            url: _this.url
          });
        };
      };
      WebSocketWrapper.prototype.close = function() {
        this.send({
          opcode: "proto_cb_send_disconnect_req"
        });
        this.stopPing();
        this._socketClose = true;
        this.websocket && this.websocket.close();
      };
      WebSocketWrapper.prototype.getReadyState = function() {
        return this.websocket.readyState == WebSocket.OPEN;
      };
      WebSocketWrapper.prototype.getCloseState = function() {
        return this.websocket.readyState == WebSocket.CLOSED;
      };
      WebSocketWrapper.prototype.getBeOnClose = function() {
        return this._socketClose;
      };
      WebSocketWrapper.prototype.sendProtoReq = function() {
        var message = {
          opcode: "proto_cl_use_protocol_proto_req"
        };
        this.send(message);
      };
      WebSocketWrapper.prototype.sendPing = function() {
        if (this._pingConut > 12) if (this._reconnectTimes < this.MAX_RECONNECT) {
          this._reconnectTimes++;
          this.reconnect();
        } else this.connectFail();
        var ping = {
          opcode: "proto_ping",
          now: new Date().getTime()
        };
        this._pingConut++;
        this.send(ping);
      };
      WebSocketWrapper.prototype.startPing = function() {
        cc.director.getScheduler().schedule(this.sendPing.bind(this), BaseFunc_1.BaseFunc.mainCanvas(), 15, cc.macro.REPEAT_FOREVER, 0, false);
      };
      WebSocketWrapper.prototype.stopPing = function() {
        cc.director.getScheduler().unschedule(this.sendPing.bind(this), BaseFunc_1.BaseFunc.mainCanvas());
      };
      WebSocketWrapper.prototype.reconnect = function() {
        this._pingConut = 0;
        this.connect();
      };
      WebSocketWrapper.prototype.connectFail = function() {
        GManager_1.GManager.dispatchEvent("SOCKET_FAIL", {
          linkName: this.linkName
        });
      };
      WebSocketWrapper.prototype.send = function(msg) {
        this.getReadyState() && this.websocket.send(this.encodePacket(msg));
      };
      WebSocketWrapper.prototype.getOpcode = function(buf) {
        var value = 0;
        if (buf.length > 1) {
          value = buf[0] << 8;
          value |= buf[1];
          32768 === (32768 & value) && (value = -(65535 - value + 1));
        }
        return value;
      };
      WebSocketWrapper.prototype.setOpcode = function(buf, code) {
        var aBuf = new ArrayBuffer(buf.byteLength + 2);
        var uBuf = new Uint8Array(aBuf);
        uBuf[0] = (65280 & code) >>> 8;
        uBuf[1] = 255 & code;
        uBuf.set(new Uint8Array(buf), 2);
        return aBuf;
      };
      WebSocketWrapper.prototype.encodePacket = function(packet) {
        var opcode = packet.opcode;
        if (!opcode) {
          console.log("Encode Packet : Need Opcode");
          return null;
        }
        var code = this.getPacketCode(opcode);
        if (!code) {
          console.log("Encode Packet : Unknown Opcode = " + opcode);
          return null;
        }
        var proto = this.getPacketProto(opcode);
        if (!proto) {
          console.log("Decode Packet : Unknown Packet = " + packet.opcode);
          return null;
        }
        var message = {};
        for (var key in packet) "opcode" != key && (message[key] = packet[key]);
        var buf = proto.create(message);
        buf = proto.encode(buf).finish();
        buf = this.setOpcode(buf, code);
        return buf;
      };
      WebSocketWrapper.prototype.decodePacket = function(data) {
        var opcode = "unknow";
        var buf = new Uint8Array(data);
        opcode = this.getOpcode(buf);
        if (!opcode) {
          console.log("Decode Packet : Need Opcode");
          return null;
        }
        var pname = this.getPacketCode(opcode);
        if (!pname) {
          console.log("Decode Packet : Unknown Opcode = " + opcode);
          return null;
        }
        var protos = this.getPacketProto(pname);
        if (!protos) {
          console.log("Decode Packet : Unknown Proto = " + opcode);
          return null;
        }
        var packet = protos.decode(buf.subarray(2, buf.length));
        var message = {
          opcode: protos.name,
          packet: packet
        };
        return message;
      };
      WebSocketWrapper = __decorate([ ccclass ], WebSocketWrapper);
      return WebSocketWrapper;
    }();
    exports.default = WebSocketWrapper;
    cc._RF.pop();
  }, {
    "../GManager": "GManager",
    "../base/BaseFunc": "BaseFunc"
  } ],
  "clipboard.min": [ function(require, module, exports) {
    (function(global) {
      "use strict";
      cc._RF.push(module, "a9206e/Rh1GXYNCxgWh2psH", "clipboard.min");
      "use strict";
      !function(t) {
        if ("object" == typeof exports && "undefined" != typeof module) module.exports = t(); else if ("function" == typeof define && define.amd) define([], t); else {
          var e;
          e = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this, 
          e.Clipboard = t();
        }
      }(function() {
        var t, e, n;
        return function t(e, n, o) {
          function i(a, c) {
            if (!n[a]) {
              if (!e[a]) {
                var l = "function" == typeof require && require;
                if (!c && l) return l(a, !0);
                if (r) return r(a, !0);
                var s = new Error("Cannot find module '" + a + "'");
                throw s.code = "MODULE_NOT_FOUND", s;
              }
              var u = n[a] = {
                exports: {}
              };
              e[a][0].call(u.exports, function(t) {
                var n = e[a][1][t];
                return i(n || t);
              }, u, u.exports, t, e, n, o);
            }
            return n[a].exports;
          }
          for (var r = "function" == typeof require && require, a = 0; a < o.length; a++) i(o[a]);
          return i;
        }({
          1: [ function(t, e, n) {
            function o(t, e) {
              for (;t && t.nodeType !== i; ) {
                if ("function" == typeof t.matches && t.matches(e)) return t;
                t = t.parentNode;
              }
            }
            var i = 9;
            if ("undefined" != typeof Element && !Element.prototype.matches) {
              var r = Element.prototype;
              r.matches = r.matchesSelector || r.mozMatchesSelector || r.msMatchesSelector || r.oMatchesSelector || r.webkitMatchesSelector;
            }
            e.exports = o;
          }, {} ],
          2: [ function(t, e, n) {
            function o(t, e, n, o, r) {
              var a = i.apply(this, arguments);
              return t.addEventListener(n, a, r), {
                destroy: function destroy() {
                  t.removeEventListener(n, a, r);
                }
              };
            }
            function i(t, e, n, o) {
              return function(n) {
                n.delegateTarget = r(n.target, e), n.delegateTarget && o.call(t, n);
              };
            }
            var r = t("./closest");
            e.exports = o;
          }, {
            "./closest": 1
          } ],
          3: [ function(t, e, n) {
            n.node = function(t) {
              return void 0 !== t && t instanceof HTMLElement && 1 === t.nodeType;
            }, n.nodeList = function(t) {
              var e = Object.prototype.toString.call(t);
              return void 0 !== t && ("[object NodeList]" === e || "[object HTMLCollection]" === e) && "length" in t && (0 === t.length || n.node(t[0]));
            }, n.string = function(t) {
              return "string" == typeof t || t instanceof String;
            }, n.fn = function(t) {
              return "[object Function]" === Object.prototype.toString.call(t);
            };
          }, {} ],
          4: [ function(t, e, n) {
            function o(t, e, n) {
              if (!t && !e && !n) throw new Error("Missing required arguments");
              if (!c.string(e)) throw new TypeError("Second argument must be a String");
              if (!c.fn(n)) throw new TypeError("Third argument must be a Function");
              if (c.node(t)) return i(t, e, n);
              if (c.nodeList(t)) return r(t, e, n);
              if (c.string(t)) return a(t, e, n);
              throw new TypeError("First argument must be a String, HTMLElement, HTMLCollection, or NodeList");
            }
            function i(t, e, n) {
              return t.addEventListener(e, n), {
                destroy: function destroy() {
                  t.removeEventListener(e, n);
                }
              };
            }
            function r(t, e, n) {
              return Array.prototype.forEach.call(t, function(t) {
                t.addEventListener(e, n);
              }), {
                destroy: function destroy() {
                  Array.prototype.forEach.call(t, function(t) {
                    t.removeEventListener(e, n);
                  });
                }
              };
            }
            function a(t, e, n) {
              return l(document.body, t, e, n);
            }
            var c = t("./is"), l = t("delegate");
            e.exports = o;
          }, {
            "./is": 3,
            delegate: 2
          } ],
          5: [ function(t, e, n) {
            function o(t) {
              var e;
              if ("SELECT" === t.nodeName) t.focus(), e = t.value; else if ("INPUT" === t.nodeName || "TEXTAREA" === t.nodeName) {
                var n = t.hasAttribute("readonly");
                n || t.setAttribute("readonly", ""), t.select(), t.setSelectionRange(0, t.value.length), 
                n || t.removeAttribute("readonly"), e = t.value;
              } else {
                t.hasAttribute("contenteditable") && t.focus();
                var o = window.getSelection(), i = document.createRange();
                i.selectNodeContents(t), o.removeAllRanges(), o.addRange(i), e = o.toString();
              }
              return e;
            }
            e.exports = o;
          }, {} ],
          6: [ function(t, e, n) {
            function o() {}
            o.prototype = {
              on: function on(t, e, n) {
                var o = this.e || (this.e = {});
                return (o[t] || (o[t] = [])).push({
                  fn: e,
                  ctx: n
                }), this;
              },
              once: function once(t, e, n) {
                function o() {
                  i.off(t, o), e.apply(n, arguments);
                }
                var i = this;
                return o._ = e, this.on(t, o, n);
              },
              emit: function emit(t) {
                var e = [].slice.call(arguments, 1), n = ((this.e || (this.e = {}))[t] || []).slice(), o = 0, i = n.length;
                for (o; o < i; o++) n[o].fn.apply(n[o].ctx, e);
                return this;
              },
              off: function off(t, e) {
                var n = this.e || (this.e = {}), o = n[t], i = [];
                if (o && e) for (var r = 0, a = o.length; r < a; r++) o[r].fn !== e && o[r].fn._ !== e && i.push(o[r]);
                return i.length ? n[t] = i : delete n[t], this;
              }
            }, e.exports = o;
          }, {} ],
          7: [ function(e, n, o) {
            !function(i, r) {
              if ("function" == typeof t && t.amd) t([ "module", "select" ], r); else if (void 0 !== o) r(n, e("select")); else {
                var a = {
                  exports: {}
                };
                r(a, i.select), i.clipboardAction = a.exports;
              }
            }(this, function(t, e) {
              function n(t) {
                return t && t.__esModule ? t : {
                  default: t
                };
              }
              function o(t, e) {
                if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
              }
              var i = n(e), r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
                return typeof t;
              } : function(t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
              }, a = function() {
                function t(t, e) {
                  for (var n = 0; n < e.length; n++) {
                    var o = e[n];
                    o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), 
                    Object.defineProperty(t, o.key, o);
                  }
                }
                return function(e, n, o) {
                  return n && t(e.prototype, n), o && t(e, o), e;
                };
              }(), c = function() {
                function t(e) {
                  o(this, t), this.resolveOptions(e), this.initSelection();
                }
                return a(t, [ {
                  key: "resolveOptions",
                  value: function t() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    this.action = e.action, this.container = e.container, this.emitter = e.emitter, 
                    this.target = e.target, this.text = e.text, this.trigger = e.trigger, this.selectedText = "";
                  }
                }, {
                  key: "initSelection",
                  value: function t() {
                    this.text ? this.selectFake() : this.target && this.selectTarget();
                  }
                }, {
                  key: "selectFake",
                  value: function t() {
                    var e = this, n = "rtl" == document.documentElement.getAttribute("dir");
                    this.removeFake(), this.fakeHandlerCallback = function() {
                      return e.removeFake();
                    }, this.fakeHandler = this.container.addEventListener("click", this.fakeHandlerCallback) || !0, 
                    this.fakeElem = document.createElement("textarea"), this.fakeElem.style.fontSize = "12pt", 
                    this.fakeElem.style.border = "0", this.fakeElem.style.padding = "0", this.fakeElem.style.margin = "0", 
                    this.fakeElem.style.position = "absolute", this.fakeElem.style[n ? "right" : "left"] = "-9999px";
                    var o = window.pageYOffset || document.documentElement.scrollTop;
                    this.fakeElem.style.top = o + "px", this.fakeElem.setAttribute("readonly", ""), 
                    this.fakeElem.value = this.text, this.container.appendChild(this.fakeElem), this.selectedText = (0, 
                    i["default"])(this.fakeElem), this.copyText();
                  }
                }, {
                  key: "removeFake",
                  value: function t() {
                    this.fakeHandler && (this.container.removeEventListener("click", this.fakeHandlerCallback), 
                    this.fakeHandler = null, this.fakeHandlerCallback = null), this.fakeElem && (this.container.removeChild(this.fakeElem), 
                    this.fakeElem = null);
                  }
                }, {
                  key: "selectTarget",
                  value: function t() {
                    this.selectedText = (0, i["default"])(this.target), this.copyText();
                  }
                }, {
                  key: "copyText",
                  value: function t() {
                    var e = void 0;
                    try {
                      e = document.execCommand(this.action);
                    } catch (t) {
                      e = !1;
                    }
                    this.handleResult(e);
                  }
                }, {
                  key: "handleResult",
                  value: function t(e) {
                    this.emitter.emit(e ? "success" : "error", {
                      action: this.action,
                      text: this.selectedText,
                      trigger: this.trigger,
                      clearSelection: this.clearSelection.bind(this)
                    });
                  }
                }, {
                  key: "clearSelection",
                  value: function t() {
                    this.trigger && this.trigger.focus(), window.getSelection().removeAllRanges();
                  }
                }, {
                  key: "destroy",
                  value: function t() {
                    this.removeFake();
                  }
                }, {
                  key: "action",
                  set: function t() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "copy";
                    if (this._action = e, "copy" !== this._action && "cut" !== this._action) throw new Error('Invalid "action" value, use either "copy" or "cut"');
                  },
                  get: function t() {
                    return this._action;
                  }
                }, {
                  key: "target",
                  set: function t(e) {
                    if (void 0 !== e) {
                      if (!e || "object" !== (void 0 === e ? "undefined" : r(e)) || 1 !== e.nodeType) throw new Error('Invalid "target" value, use a valid Element');
                      if ("copy" === this.action && e.hasAttribute("disabled")) throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute');
                      if ("cut" === this.action && (e.hasAttribute("readonly") || e.hasAttribute("disabled"))) throw new Error('Invalid "target" attribute. You can\'t cut text from elements with "readonly" or "disabled" attributes');
                      this._target = e;
                    }
                  },
                  get: function t() {
                    return this._target;
                  }
                } ]), t;
              }();
              t.exports = c;
            });
          }, {
            select: 5
          } ],
          8: [ function(e, n, o) {
            !function(i, r) {
              if ("function" == typeof t && t.amd) t([ "module", "./clipboard-action", "tiny-emitter", "good-listener" ], r); else if (void 0 !== o) r(n, e("./clipboard-action"), e("tiny-emitter"), e("good-listener")); else {
                var a = {
                  exports: {}
                };
                r(a, i.clipboardAction, i.tinyEmitter, i.goodListener), i.clipboard = a.exports;
              }
            }(this, function(t, e, n, o) {
              function i(t) {
                return t && t.__esModule ? t : {
                  default: t
                };
              }
              function r(t, e) {
                if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
              }
              function a(t, e) {
                if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !e || "object" != typeof e && "function" != typeof e ? t : e;
              }
              function c(t, e) {
                if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                t.prototype = Object.create(e && e.prototype, {
                  constructor: {
                    value: t,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                  }
                }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e);
              }
              function l(t, e) {
                var n = "data-clipboard-" + t;
                if (e.hasAttribute(n)) return e.getAttribute(n);
              }
              var s = i(e), u = i(n), f = i(o), d = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
                return typeof t;
              } : function(t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
              }, h = function() {
                function t(t, e) {
                  for (var n = 0; n < e.length; n++) {
                    var o = e[n];
                    o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), 
                    Object.defineProperty(t, o.key, o);
                  }
                }
                return function(e, n, o) {
                  return n && t(e.prototype, n), o && t(e, o), e;
                };
              }(), p = function(t) {
                function e(t, n) {
                  r(this, e);
                  var o = a(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this));
                  return o.resolveOptions(n), o.listenClick(t), o;
                }
                return c(e, t), h(e, [ {
                  key: "resolveOptions",
                  value: function t() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    this.action = "function" == typeof e.action ? e.action : this.defaultAction, this.target = "function" == typeof e.target ? e.target : this.defaultTarget, 
                    this.text = "function" == typeof e.text ? e.text : this.defaultText, this.container = "object" === d(e.container) ? e.container : document.body;
                  }
                }, {
                  key: "listenClick",
                  value: function t(e) {
                    var n = this;
                    this.listener = (0, f["default"])(e, "click", function(t) {
                      return n.onClick(t);
                    });
                  }
                }, {
                  key: "onClick",
                  value: function t(e) {
                    var n = e.delegateTarget || e.currentTarget;
                    this.clipboardAction && (this.clipboardAction = null), this.clipboardAction = new s["default"]({
                      action: this.action(n),
                      target: this.target(n),
                      text: this.text(n),
                      container: this.container,
                      trigger: n,
                      emitter: this
                    });
                  }
                }, {
                  key: "defaultAction",
                  value: function t(e) {
                    return l("action", e);
                  }
                }, {
                  key: "defaultTarget",
                  value: function t(e) {
                    var n = l("target", e);
                    if (n) return document.querySelector(n);
                  }
                }, {
                  key: "defaultText",
                  value: function t(e) {
                    return l("text", e);
                  }
                }, {
                  key: "destroy",
                  value: function t() {
                    this.listener.destroy(), this.clipboardAction && (this.clipboardAction.destroy(), 
                    this.clipboardAction = null);
                  }
                } ], [ {
                  key: "isSupported",
                  value: function t() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [ "copy", "cut" ], n = "string" == typeof e ? [ e ] : e, o = !!document.queryCommandSupported;
                    return n.forEach(function(t) {
                      o = o && !!document.queryCommandSupported(t);
                    }), o;
                  }
                } ]), e;
              }(u["default"]);
              t.exports = p;
            });
          }, {
            "./clipboard-action": 7,
            "good-listener": 4,
            "tiny-emitter": 6
          } ]
        }, {}, [ 8 ])(8);
      });
      cc._RF.pop();
    }).call(this, "undefined" !== typeof global ? global : "undefined" !== typeof self ? self : "undefined" !== typeof window ? window : {});
  }, {} ],
  colyseus: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "5f522PlkbpGypgwMibPKkDN", "colyseus");
    "use strict";
    !function(e, t) {
      "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.Colyseus = t() : e.Colyseus = t();
    }("undefined" != typeof self ? self : void 0, function() {
      return function(e) {
        function t(r) {
          if (n[r]) return n[r].exports;
          var i = n[r] = {
            i: r,
            l: !1,
            exports: {}
          };
          return e[r].call(i.exports, i, i.exports, t), i.l = !0, i.exports;
        }
        var n = {};
        return t.m = e, t.c = n, t.d = function(e, n, r) {
          t.o(e, n) || Object.defineProperty(e, n, {
            configurable: !1,
            enumerable: !0,
            get: r
          });
        }, t.n = function(e) {
          var n = e && e.__esModule ? function() {
            return e["default"];
          } : function() {
            return e;
          };
          return t.d(n, "a", n), n;
        }, t.o = function(e, t) {
          return Object.prototype.hasOwnProperty.call(e, t);
        }, t.p = "", t(t.s = 13);
      }([ function(e, t, n) {
        function r(e, t, n, r) {
          var i, o = !1;
          switch (t) {
           case "number":
           case "int8":
           case "uint8":
           case "int16":
           case "uint16":
           case "int32":
           case "uint32":
           case "int64":
           case "uint64":
           case "float32":
           case "float64":
            i = "number", isNaN(e) && console.log('trying to encode "NaN" in ' + n.constructor.name + "#" + r);
            break;

           case "string":
            i = "string", o = !0;
            break;

           case "boolean":
            return;
          }
          if (typeof e !== i && (!o || o && null !== e)) {
            var s = "'" + JSON.stringify(e) + "'" + (e && e.constructor && " (" + e.constructor.name + ")");
            throw new v("a '" + i + "' was expected, but " + s + " was provided in " + n.constructor.name + "#" + r);
          }
        }
        function i(e, t, n, r) {
          if (!(e instanceof t)) throw new v("a '" + t.name + "' was expected, but '" + e.constructor.name + "' was provided in " + n.constructor.name + "#" + r);
        }
        function o(e, t, n, i, o) {
          r(n, e, i, o);
          var s = h[e];
          if (!s) throw new v("a '" + e + "' was expected, but " + n + " was provided in " + i.constructor.name + "#" + o);
          s(t, n);
        }
        function s(e, t, n) {
          return f[e](t, n);
        }
        var a = this && this.__extends || function() {
          var _e = function e(t, n) {
            return (_e = Object.setPrototypeOf || {
              __proto__: []
            } instanceof Array && function(e, t) {
              e.__proto__ = t;
            } || function(e, t) {
              for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
            })(t, n);
          };
          return function(t, n) {
            function r() {
              this.constructor = t;
            }
            _e(t, n), t.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, 
            new r());
          };
        }(), c = this && this.__spreadArrays || function() {
          for (var e = 0, t = 0, n = arguments.length; t < n; t++) e += arguments[t].length;
          for (var r = Array(e), i = 0, t = 0; t < n; t++) for (var o = arguments[t], s = 0, a = o.length; s < a; s++, 
          i++) r[i] = o[s];
          return r;
        };
        Object.defineProperty(t, "__esModule", {
          value: !0
        });
        var u = n(10), h = n(31), f = n(32), l = n(1), p = n(2), d = n(11), v = function(e) {
          function t() {
            return null !== e && e.apply(this, arguments) || this;
          }
          return a(t, e), t;
        }(Error), y = function() {
          function e() {
            for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
            Object.defineProperties(this, {
              $changes: {
                value: new d.ChangeTree(),
                enumerable: !1,
                writable: !0
              }
            });
            var n = this._descriptors;
            n && Object.defineProperties(this, n);
          }
          return e.onError = function(e) {
            console.error(e);
          }, Object.defineProperty(e.prototype, "_schema", {
            get: function get() {
              return this.constructor._schema;
            },
            enumerable: !0,
            configurable: !0
          }), Object.defineProperty(e.prototype, "_descriptors", {
            get: function get() {
              return this.constructor._descriptors;
            },
            enumerable: !0,
            configurable: !0
          }), Object.defineProperty(e.prototype, "_indexes", {
            get: function get() {
              return this.constructor._indexes;
            },
            enumerable: !0,
            configurable: !0
          }), Object.defineProperty(e.prototype, "_filters", {
            get: function get() {
              return this.constructor._filters;
            },
            enumerable: !0,
            configurable: !0
          }), Object.defineProperty(e.prototype, "_deprecated", {
            get: function get() {
              return this.constructor._deprecated;
            },
            enumerable: !0,
            configurable: !0
          }), Object.defineProperty(e.prototype, "$changed", {
            get: function get() {
              return this.$changes.changed;
            },
            enumerable: !0,
            configurable: !0
          }), e.prototype.decode = function(t, n) {
            void 0 === n && (n = {
              offset: 0
            });
            var r = [], i = this._schema, o = this._indexes, a = {};
            Object.keys(o).forEach(function(e) {
              var t = o[e];
              a[t] = e;
            });
            var c = t.length;
            t[n.offset] === u.TYPE_ID && (n.offset += 2);
            for (var h = this; n.offset < c; ) if ("break" === function() {
              var o = f.nilCheck(t, n) && ++n.offset, c = t[n.offset++];
              if (c === u.END_OF_STRUCTURE) return "break";
              var d = a[c], v = i[d], y = void 0, g = void 0, _ = !1;
              if (!d) return "continue";
              if (o) y = null, _ = !0; else if (v._schema) y = h["_" + d] || h.createTypeInstance(t, n, v), 
              y.decode(t, n), _ = !0; else if (Array.isArray(v)) {
                v = v[0], g = [];
                var b = h["_" + d] || new l.ArraySchema();
                y = b.clone(!0);
                var w = f.number(t, n), m = Math.min(f.number(t, n), w);
                _ = m > 0;
                var C = !1;
                y.length > w && Array.prototype.splice.call(y, w).forEach(function(t, n) {
                  if (t && t.onRemove) try {
                    t.onRemove();
                  } catch (t) {
                    e.onError(t);
                  }
                  if (b.onRemove) try {
                    b.onRemove(t, w + n);
                  } catch (t) {
                    e.onError(t);
                  }
                });
                for (var O = 0; O < m; O++) {
                  var S = f.number(t, n), A = void 0;
                  f.indexChangeCheck(t, n) && (f.uint8(t, n), A = f.number(t, n), C = !0);
                  var k = !C && void 0 === y[S] || C && void 0 === A;
                  if (v.prototype instanceof e) {
                    var I = void 0;
                    I = k ? h.createTypeInstance(t, n, v) : void 0 !== A ? b[A] : b[S], I || (I = h.createTypeInstance(t, n, v), 
                    k = !0), I.decode(t, n), y[S] = I;
                  } else y[S] = s(v, t, n);
                  if (k) {
                    if (b.onAdd) try {
                      b.onAdd(y[S], S);
                    } catch (t) {
                      e.onError(t);
                    }
                  } else if (b.onChange) try {
                    b.onChange(y[S], S);
                  } catch (t) {
                    e.onError(t);
                  }
                  g.push(y[S]);
                }
              } else if (v.map) {
                v = v.map;
                var E = h["_" + d] || new p.MapSchema();
                y = E.clone(!0);
                var P = f.number(t, n);
                _ = P > 0;
                for (var C = !1, x = Object.keys(E), O = 0; O < P && void 0 !== t[n.offset] && t[n.offset] !== u.END_OF_STRUCTURE; O++) {
                  var M = f.nilCheck(t, n) && ++n.offset, j = void 0;
                  f.indexChangeCheck(t, n) && (f.uint8(t, n), j = x[f.number(t, n)], C = !0);
                  var R = f.numberCheck(t, n), T = "string" != typeof v, $ = R ? x[f.number(t, n)] : f.string(t, n), I = void 0, k = !C && void 0 === E[$] || C && void 0 === j && R;
                  if (I = k && T ? h.createTypeInstance(t, n, v) : void 0 !== j ? E[j] : E[$], M) {
                    if (I && I.onRemove) try {
                      I.onRemove();
                    } catch (t) {
                      e.onError(t);
                    }
                    if (E.onRemove) try {
                      E.onRemove(I, $);
                    } catch (t) {
                      e.onError(t);
                    }
                    delete y[$];
                  } else if (T ? (I.decode(t, n), y[$] = I) : y[$] = s(v, t, n), k) {
                    if (E.onAdd) try {
                      E.onAdd(y[$], $);
                    } catch (t) {
                      e.onError(t);
                    }
                  } else if (E.onChange) try {
                    E.onChange(y[$], $);
                  } catch (t) {
                    e.onError(t);
                  }
                }
              } else y = s(v, t, n), _ = !0;
              _ && h.onChange && r.push({
                field: d,
                value: g || y,
                previousValue: h["_" + d]
              }), h["_" + d] = y;
            }()) break;
            if (this.onChange && r.length > 0) try {
              this.onChange(r);
            } catch (t) {
              e.onError(t);
            }
            return this;
          }, e.prototype.encode = function(e, t, n) {
            var r = this;
            void 0 === e && (e = this), void 0 === t && (t = !1);
            var s = [];
            if (!this.$changes.changed && !t) return this._encodeEndOfStructure(this, e, s), 
            s;
            for (var a = this._schema, f = this._indexes, d = this._filters, v = t || n ? this.$changes.allChanges : this.$changes.changes, y = this, g = 0, _ = v.length; g < _; g++) !function(g, _) {
              var b = v[g], w = a[b], m = d && d[b], C = y["_" + b], O = f[b], S = [];
              if (void 0 === C) h.uint8(S, u.NIL), h.number(S, O); else if (w._schema) {
                if (n && m && !m.call(y, n, C, e)) return "continue";
                C ? (h.number(S, O), i(C, w, y, b), y.tryEncodeTypeId(S, w, C.constructor), S.push.apply(S, C.encode(e, t, n))) : (h.uint8(S, u.NIL), 
                h.number(S, O));
              } else if (Array.isArray(w)) {
                h.number(S, O), h.number(S, C.length);
                var A = (t || n ? C.$changes.allChanges : C.$changes.changes).filter(function(e) {
                  return void 0 !== r["_" + b][e];
                }).sort(function(e, t) {
                  return e - t;
                }), k = A.length;
                h.number(S, k);
                var I = "string" != typeof w[0];
                i(y["_" + b], l.ArraySchema, y, b);
                for (var E = 0; E < k; E++) {
                  var P = A[E], x = y["_" + b][P];
                  if (!n || !m || m.call(y, n, x, e)) if (I) {
                    if (h.number(S, P), !t) {
                      var M = C.$changes.getIndexChange(x);
                      void 0 !== M && (h.uint8(S, u.INDEX_CHANGE), h.number(S, M));
                    }
                    i(x, w[0], y, b), y.tryEncodeTypeId(S, w[0], x.constructor), S.push.apply(S, x.encode(e, t, n));
                  } else void 0 !== x && (h.number(S, P), o(w[0], S, x, y, b));
                }
                t || C.$changes.discard();
              } else if (w.map) {
                h.number(S, O);
                var j = t || n ? C.$changes.allChanges : C.$changes.changes;
                h.number(S, j.length);
                var R = C.$changes.allChanges, I = "string" != typeof w.map, k = j.length;
                i(y["_" + b], p.MapSchema, y, b);
                for (var T = 0; T < k; T++) {
                  var $ = "number" == typeof j[T] && R[j[T]] || j[T], x = y["_" + b][$], N = void 0;
                  if (!n || !m || m.call(y, n, x, e)) {
                    if (t) {
                      if (void 0 === x) continue;
                    } else {
                      var M = C.$changes.getIndexChange(x);
                      x && void 0 !== M && (h.uint8(S, u.INDEX_CHANGE), h.number(S, y["_" + b]._indexes.get(M))), 
                      N = C.$changes.isDeleted($) && x ? void 0 : y["_" + b]._indexes.get($);
                    }
                    var U = void 0 === x;
                    U && h.uint8(S, u.NIL), void 0 !== N ? h.number(S, N) : h.string(S, $), x && I ? (i(x, w.map, y, b), 
                    y.tryEncodeTypeId(S, w.map, x.constructor), S.push.apply(S, x.encode(e, t, n))) : U || o(w.map, S, x, y, b);
                  }
                }
                t || (C.$changes.discard(), n || y["_" + b]._updateIndexes(C.$changes.allChanges));
              } else {
                if (n && m && !m.call(y, n, C, e)) return "continue";
                h.number(S, O), o(w, S, C, y, b);
              }
              s = c(s, S);
            }(g);
            return this._encodeEndOfStructure(this, e, s), t || n || this.$changes.discard(), 
            s;
          }, e.prototype.encodeFiltered = function(e) {
            return this.encode(this, !1, e);
          }, e.prototype.encodeAll = function() {
            return this.encode(this, !0);
          }, e.prototype.encodeAllFiltered = function(e) {
            return this.encode(this, !0, e);
          }, e.prototype.clone = function() {
            var e = new this.constructor(), t = this._schema;
            for (var n in t) "object" == typeof this[n] && "function" == typeof this[n].clone ? e[n] = this[n].clone() : e[n] = this[n];
            return e;
          }, e.prototype.triggerAll = function() {
            if (this.onChange) {
              var t = [], n = this._schema;
              for (var r in n) void 0 !== this[r] && t.push({
                field: r,
                value: this[r],
                previousValue: void 0
              });
              try {
                this.onChange(t);
              } catch (t) {
                e.onError(t);
              }
            }
          }, e.prototype.toJSON = function() {
            var e = this._schema, t = this._deprecated, n = {};
            for (var r in e) t[r] || null === this[r] || void 0 === this[r] || (n[r] = "function" == typeof this[r].toJSON ? this[r].toJSON() : this["_" + r]);
            return n;
          }, e.prototype._encodeEndOfStructure = function(e, t, n) {
            e !== t && n.push(u.END_OF_STRUCTURE);
          }, e.prototype.tryEncodeTypeId = function(e, t, n) {
            t._typeid !== n._typeid && (h.uint8(e, u.TYPE_ID), h.uint8(e, n._typeid));
          }, e.prototype.createTypeInstance = function(e, t, n) {
            if (e[t.offset] === u.TYPE_ID) {
              t.offset++;
              return new (this.constructor._context.get(f.uint8(e, t)))();
            }
            return new n();
          }, e;
        }();
        t.Schema = y;
      }, function(e, t, n) {
        var r = this && this.__extends || function() {
          var _e2 = function e(t, n) {
            return (_e2 = Object.setPrototypeOf || {
              __proto__: []
            } instanceof Array && function(e, t) {
              e.__proto__ = t;
            } || function(e, t) {
              for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
            })(t, n);
          };
          return function(t, n) {
            function r() {
              this.constructor = t;
            }
            _e2(t, n), t.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, 
            new r());
          };
        }(), i = this && this.__spreadArrays || function() {
          for (var e = 0, t = 0, n = arguments.length; t < n; t++) e += arguments[t].length;
          for (var r = Array(e), i = 0, t = 0; t < n; t++) for (var o = arguments[t], s = 0, a = o.length; s < a; s++, 
          i++) r[i] = o[s];
          return r;
        };
        Object.defineProperty(t, "__esModule", {
          value: !0
        });
        var o = function(e) {
          function t() {
            for (var n = [], r = 0; r < arguments.length; r++) n[r] = arguments[r];
            var o = e.apply(this, n) || this;
            return Object.setPrototypeOf(o, Object.create(t.prototype)), Object.defineProperties(o, {
              $sorting: {
                value: void 0,
                enumerable: !1,
                writable: !0
              },
              $changes: {
                value: void 0,
                enumerable: !1,
                writable: !0
              },
              onAdd: {
                value: void 0,
                enumerable: !1,
                writable: !0
              },
              onRemove: {
                value: void 0,
                enumerable: !1,
                writable: !0
              },
              onChange: {
                value: void 0,
                enumerable: !1,
                writable: !0
              },
              triggerAll: {
                value: function value() {
                  if (o.onAdd) for (var e = 0; e < o.length; e++) o.onAdd(o[e], e);
                }
              },
              toJSON: {
                value: function value() {
                  for (var e = [], t = 0; t < o.length; t++) {
                    var n = o[t];
                    e.push("function" == typeof n.toJSON ? n.toJSON() : n);
                  }
                  return e;
                }
              },
              clone: {
                value: function value(e) {
                  var n;
                  return e ? (n = t.of.apply(t, o), n.onAdd = o.onAdd, n.onRemove = o.onRemove, n.onChange = o.onChange) : n = new (t.bind.apply(t, i([ void 0 ], o.map(function(e) {
                    return "object" == typeof e ? e.clone() : e;
                  }))))(), n;
                }
              }
            }), o;
          }
          return r(t, e), Object.defineProperty(t, Symbol.species, {
            get: function get() {
              return t;
            },
            enumerable: !0,
            configurable: !0
          }), t.prototype.sort = function(t) {
            this.$sorting = !0, e.prototype.sort.call(this, t);
            for (var n = this.$changes.changes, r = 0, i = n; r < i.length; r++) {
              var o = i[r], s = this.$changes.getIndex(this[o]);
              void 0 !== s && this.$changes.mapIndexChange(this[o], s), this.$changes.mapIndex(this[o], o);
            }
            return this.$sorting = !1, this;
          }, t.prototype.filter = function(t, n) {
            var r = e.prototype.filter.call(this, t);
            return r.$changes = this.$changes, r;
          }, t.prototype.splice = function(e, t) {
            for (var n = [], r = 2; r < arguments.length; r++) n[r - 2] = arguments[r];
            var i = Array.prototype.splice.apply(this, arguments), o = Array.prototype.filter.call(this, function(n, r) {
              return r >= e + t - 1;
            });
            return i.map(function(e) {
              e && e.$changes && (e.$changes.parent.deleteIndex(e), e.$changes.parent.deleteIndexChange(e), 
              delete e.$changes.parent);
            }), o.forEach(function(e) {
              e && e.$changes && e.$changes.parentField--;
            }), i;
          }, t;
        }(Array);
        t.ArraySchema = o;
      }, function(e, t, n) {
        Object.defineProperty(t, "__esModule", {
          value: !0
        });
        var r = function() {
          function e(t) {
            var n = this;
            void 0 === t && (t = {});
            for (var r in t) this[r] = t[r];
            Object.defineProperties(this, {
              $changes: {
                value: void 0,
                enumerable: !1,
                writable: !0
              },
              onAdd: {
                value: void 0,
                enumerable: !1,
                writable: !0
              },
              onRemove: {
                value: void 0,
                enumerable: !1,
                writable: !0
              },
              onChange: {
                value: void 0,
                enumerable: !1,
                writable: !0
              },
              clone: {
                value: function value(t) {
                  var r;
                  if (t) r = Object.assign(new e(), n), r.onAdd = n.onAdd, r.onRemove = n.onRemove, 
                  r.onChange = n.onChange; else {
                    var i = new e();
                    for (var o in n) "object" == typeof n[o] ? i[o] = n[o].clone() : i[o] = n[o];
                  }
                  return r;
                }
              },
              triggerAll: {
                value: function value() {
                  if (n.onAdd) for (var e in n) n.onAdd(n[e], e);
                }
              },
              toJSON: {
                value: function value() {
                  var e = {};
                  for (var t in n) e[t] = "function" == typeof n[t].toJSON ? n[t].toJSON() : n[t];
                  return e;
                }
              },
              _indexes: {
                value: new Map(),
                enumerable: !1,
                writable: !0
              },
              _updateIndexes: {
                value: function value(e) {
                  for (var t = 0, r = new Map(), i = 0, o = e; i < o.length; i++) {
                    var s = o[i];
                    r.set(s, t++);
                  }
                  n._indexes = r;
                }
              }
            });
          }
          return e;
        }();
        t.MapSchema = r;
      }, function(e, t, n) {
        var r = this && this.__importDefault || function(e) {
          return e && e.__esModule ? e : {
            default: e
          };
        };
        Object.defineProperty(t, "__esModule", {
          value: !0
        });
        var i = r(n(16)), o = r(n(17));
        t.decode = i["default"], t.encode = o["default"];
      }, function(e, t, n) {
        function r(e, t) {
          t.headers = e.headers || {}, t.statusMessage = e.statusText, t.statusCode = e.status, 
          t.data = e.response;
        }
        function i(e, t, n) {
          return new Promise(function(i, o) {
            n = n || {};
            var s, a, c, u, h = new XMLHttpRequest(), f = n.headers || {};
            h.timeout = n.timeout, h.ontimeout = h.onerror = function(e) {
              e.timeout = "timeout" == e.type, o(e);
            }, h.open(e, t), h.onload = function() {
              for (u = h.getAllResponseHeaders().trim().split(/[\r\n]+/), r(h, h); c = u.shift(); ) c = c.split(": "), 
              h.headers[c.shift().toLowerCase()] = c.join(": ");
              if ((c = h.headers["content-type"]) && ~c.indexOf("application/json")) try {
                h.data = JSON.parse(h.data, n.reviver);
              } catch (e) {
                return r(h, e), o(e);
              }
              (h.status >= 400 ? o : i)(h);
            }, (a = n.body) && /Array|Object/.test(a.constructor) && (f["content-type"] = "application/json", 
            a = JSON.stringify(a));
            for (s in f) h.setRequestHeader(s, f[s]);
            h.send(a);
          });
        }
        Object.defineProperty(t, "__esModule", {
          value: !0
        }), t.send = i, n.d(t, "get", function() {
          return o;
        }), n.d(t, "post", function() {
          return s;
        }), n.d(t, "patch", function() {
          return a;
        }), n.d(t, "del", function() {
          return c;
        }), n.d(t, "put", function() {
          return u;
        });
        var o = i.bind(i, "GET"), s = i.bind(i, "POST"), a = i.bind(i, "PATCH"), c = i.bind(i, "DELETE"), u = i.bind(i, "PUT");
      }, function(e, t, n) {
        var r = this && this.__importStar || function(e) {
          if (e && e.__esModule) return e;
          var t = {};
          if (null != e) for (var n in e) Object.hasOwnProperty.call(e, n) && (t[n] = e[n]);
          return t["default"] = e, t;
        };
        Object.defineProperty(t, "__esModule", {
          value: !0
        });
        var i = r(n(3)), o = n(18), s = n(19), a = n(6), c = n(7), u = function() {
          function e(e, t) {
            var n = this;
            this.onJoin = o.createSignal(), this.onStateChange = o.createSignal(), this.onMessage = o.createSignal(), 
            this.onError = o.createSignal(), this.onLeave = o.createSignal(), this.hasJoined = !1, 
            this.id = null, this.name = e, t ? (this.serializer = new (a.getSerializer("schema"))(), 
            this.rootSchema = t, this.serializer.state = new t()) : this.serializer = new (a.getSerializer("fossil-delta"))(), 
            this.onError(function(e) {
              return console.error(e);
            }), this.onLeave(function() {
              return n.removeAllListeners();
            });
          }
          return e.prototype.connect = function(e) {
            var t = this;
            this.connection = new s.Connection(e, !1), this.connection.reconnectEnabled = !1, 
            this.connection.onmessage = this.onMessageCallback.bind(this), this.connection.onclose = function(e) {
              if (!t.hasJoined) return console.error("Room connection was closed unexpectedly (" + e.code + "): " + e.reason), 
              void t.onError.invoke(e.reason);
              t.onLeave.invoke(e.code);
            }, this.connection.onerror = function(e) {
              console.warn("Room, onError (" + e.code + "): " + e.reason), t.onError.invoke(e.reason);
            }, this.connection.open();
          }, e.prototype.leave = function(e) {
            void 0 === e && (e = !0), this.connection ? e ? this.connection.send([ c.Protocol.LEAVE_ROOM ]) : this.connection.close() : this.onLeave.invoke(4e3);
          }, e.prototype.send = function(e) {
            this.connection.send([ c.Protocol.ROOM_DATA, e ]);
          }, Object.defineProperty(e.prototype, "state", {
            get: function get() {
              return this.serializer.getState();
            },
            enumerable: !0,
            configurable: !0
          }), e.prototype.listen = function(e, t, n) {
            return "schema" === this.serializerId ? void console.error("'" + this.serializerId + "' serializer doesn't support .listen() method.") : (this.serializerId || console.warn("room.Listen() should be called after room.onJoin has been called (DEPRECATION WARNING)"), 
            this.serializer.api.listen(e, t, n));
          }, e.prototype.removeListener = function(e) {
            return this.serializer.api.removeListener(e);
          }, e.prototype.removeAllListeners = function() {
            this.serializer && this.serializer.teardown(), this.onJoin.clear(), this.onStateChange.clear(), 
            this.onMessage.clear(), this.onError.clear(), this.onLeave.clear();
          }, e.prototype.onMessageCallback = function(e) {
            if (this.previousCode) this.previousCode === c.Protocol.ROOM_STATE ? this.setState(Array.from(new Uint8Array(e.data))) : this.previousCode === c.Protocol.ROOM_STATE_PATCH ? this.patch(Array.from(new Uint8Array(e.data))) : this.previousCode === c.Protocol.ROOM_DATA && this.onMessage.invoke(i.decode(e.data)), 
            this.previousCode = void 0; else {
              var t = new DataView(e.data), n = t.getUint8(0);
              if (n === c.Protocol.JOIN_ROOM) {
                var r = 1;
                this.serializerId = c.utf8Read(t, r), r += c.utf8Length(this.serializerId);
                var o = a.getSerializer(this.serializerId);
                if (!o) throw new Error("missing serializer: " + this.serializerId);
                if ("fossil-delta" === this.serializerId || this.rootSchema || (this.serializer = new o()), 
                t.buffer.byteLength > r && this.serializer.handshake) {
                  var s = Array.from(new Uint8Array(t.buffer.slice(r)));
                  this.serializer.handshake(s);
                }
                this.hasJoined = !0, this.onJoin.invoke();
              } else n === c.Protocol.JOIN_ERROR ? this.onError.invoke(c.utf8Read(t, 1)) : n === c.Protocol.LEAVE_ROOM ? this.leave() : this.previousCode = n;
            }
          }, e.prototype.setState = function(e) {
            this.serializer.setState(e), this.onStateChange.invoke(this.serializer.getState());
          }, e.prototype.patch = function(e) {
            this.serializer.patch(e), this.onStateChange.invoke(this.serializer.getState());
          }, e;
        }();
        t.Room = u;
      }, function(e, t, n) {
        function r(e, t) {
          o[e] = t;
        }
        function i(e) {
          return o[e];
        }
        Object.defineProperty(t, "__esModule", {
          value: !0
        });
        var o = {};
        t.registerSerializer = r, t.getSerializer = i;
      }, function(e, t, n) {
        function r(e, t) {
          for (var n = e.getUint8(t++), r = "", i = 0, o = t, s = t + n; o < s; o++) {
            var a = e.getUint8(o);
            if (0 != (128 & a)) if (192 != (224 & a)) if (224 != (240 & a)) {
              if (240 != (248 & a)) throw new Error("Invalid byte " + a.toString(16));
              i = (7 & a) << 18 | (63 & e.getUint8(++o)) << 12 | (63 & e.getUint8(++o)) << 6 | (63 & e.getUint8(++o)) << 0, 
              i >= 65536 ? (i -= 65536, r += String.fromCharCode(55296 + (i >>> 10), 56320 + (1023 & i))) : r += String.fromCharCode(i);
            } else r += String.fromCharCode((15 & a) << 12 | (63 & e.getUint8(++o)) << 6 | (63 & e.getUint8(++o)) << 0); else r += String.fromCharCode((31 & a) << 6 | 63 & e.getUint8(++o)); else r += String.fromCharCode(a);
          }
          return r;
        }
        function i(e) {
          void 0 === e && (e = "");
          for (var t = 0, n = 0, r = 0, i = e.length; r < i; r++) t = e.charCodeAt(r), t < 128 ? n += 1 : t < 2048 ? n += 2 : t < 55296 || t >= 57344 ? n += 3 : (r++, 
          n += 4);
          return n + 1;
        }
        Object.defineProperty(t, "__esModule", {
          value: !0
        });
        !function(e) {
          e[e.JOIN_ROOM = 10] = "JOIN_ROOM", e[e.JOIN_ERROR = 11] = "JOIN_ERROR", e[e.LEAVE_ROOM = 12] = "LEAVE_ROOM", 
          e[e.ROOM_DATA = 13] = "ROOM_DATA", e[e.ROOM_STATE = 14] = "ROOM_STATE", e[e.ROOM_STATE_PATCH = 15] = "ROOM_STATE_PATCH";
        }(t.Protocol || (t.Protocol = {})), t.utf8Read = r, t.utf8Length = i;
      }, function(e, t, n) {
        var r = this && this.__awaiter || function(e, t, n, r) {
          function i(e) {
            return e instanceof n ? e : new n(function(t) {
              t(e);
            });
          }
          return new (n || (n = Promise))(function(n, o) {
            function s(e) {
              try {
                c(r.next(e));
              } catch (e) {
                o(e);
              }
            }
            function a(e) {
              try {
                c(r["throw"](e));
              } catch (e) {
                o(e);
              }
            }
            function c(e) {
              e.done ? n(e.value) : i(e.value).then(s, a);
            }
            c((r = r.apply(e, t || [])).next());
          });
        }, i = this && this.__generator || function(e, t) {
          function n(e) {
            return function(t) {
              return r([ e, t ]);
            };
          }
          function r(n) {
            if (i) throw new TypeError("Generator is already executing.");
            for (;c; ) try {
              if (i = 1, o && (s = 2 & n[0] ? o["return"] : n[0] ? o["throw"] || ((s = o["return"]) && s.call(o), 
              0) : o.next) && !(s = s.call(o, n[1])).done) return s;
              switch (o = 0, s && (n = [ 2 & n[0], s.value ]), n[0]) {
               case 0:
               case 1:
                s = n;
                break;

               case 4:
                return c.label++, {
                  value: n[1],
                  done: !1
                };

               case 5:
                c.label++, o = n[1], n = [ 0 ];
                continue;

               case 7:
                n = c.ops.pop(), c.trys.pop();
                continue;

               default:
                if (s = c.trys, !(s = s.length > 0 && s[s.length - 1]) && (6 === n[0] || 2 === n[0])) {
                  c = 0;
                  continue;
                }
                if (3 === n[0] && (!s || n[1] > s[0] && n[1] < s[3])) {
                  c.label = n[1];
                  break;
                }
                if (6 === n[0] && c.label < s[1]) {
                  c.label = s[1], s = n;
                  break;
                }
                if (s && c.label < s[2]) {
                  c.label = s[2], c.ops.push(n);
                  break;
                }
                s[2] && c.ops.pop(), c.trys.pop();
                continue;
              }
              n = t.call(e, c);
            } catch (e) {
              n = [ 6, e ], o = 0;
            } finally {
              i = s = 0;
            }
            if (5 & n[0]) throw n[1];
            return {
              value: n[0] ? n[1] : void 0,
              done: !0
            };
          }
          var i, o, s, a, c = {
            label: 0,
            sent: function sent() {
              if (1 & s[0]) throw s[1];
              return s[1];
            },
            trys: [],
            ops: []
          };
          return a = {
            next: n(0),
            throw: n(1),
            return: n(2)
          }, "function" == typeof Symbol && (a[Symbol.iterator] = function() {
            return this;
          }), a;
        }, o = this && this.__importStar || function(e) {
          if (e && e.__esModule) return e;
          var t = {};
          if (null != e) for (var n in e) Object.hasOwnProperty.call(e, n) && (t[n] = e[n]);
          return t["default"] = e, t;
        };
        Object.defineProperty(t, "__esModule", {
          value: !0
        });
        var s = o(n(4)), a = n(23), c = "colyseus-auth-token";
        !function(e) {
          e.ios = "ios", e.android = "android";
        }(t.Platform || (t.Platform = {}));
        var u = function() {
          function e(e) {
            var t = this;
            this._id = void 0, this.username = void 0, this.displayName = void 0, this.avatarUrl = void 0, 
            this.isAnonymous = void 0, this.email = void 0, this.lang = void 0, this.location = void 0, 
            this.timezone = void 0, this.metadata = void 0, this.devices = void 0, this.facebookId = void 0, 
            this.twitterId = void 0, this.googleId = void 0, this.gameCenterId = void 0, this.steamId = void 0, 
            this.friendIds = void 0, this.blockedUserIds = void 0, this.createdAt = void 0, 
            this.updatedAt = void 0, this.token = void 0, this.endpoint = e.replace("ws", "http"), 
            a.getItem(c, function(e) {
              return t.token = e;
            });
          }
          return Object.defineProperty(e.prototype, "hasToken", {
            get: function get() {
              return !!this.token;
            },
            enumerable: !0,
            configurable: !0
          }), e.prototype.login = function(e) {
            return void 0 === e && (e = {}), r(this, void 0, void 0, function() {
              var t, n, r;
              return i(this, function(i) {
                switch (i.label) {
                 case 0:
                  return t = Object.assign({}, e), this.hasToken && (t.token = this.token), [ 4, this.request("post", "/auth", t) ];

                 case 1:
                  n = i.sent(), this.token = n.token, a.setItem(c, this.token);
                  for (r in n) this.hasOwnProperty(r) && (this[r] = n[r]);
                  return this.registerPingService(), [ 2, this ];
                }
              });
            });
          }, e.prototype.save = function() {
            return r(this, void 0, void 0, function() {
              return i(this, function(e) {
                switch (e.label) {
                 case 0:
                  return [ 4, this.request("put", "/auth", {}, {
                    username: this.username,
                    displayName: this.displayName,
                    avatarUrl: this.avatarUrl,
                    lang: this.lang,
                    location: this.location,
                    timezone: this.timezone
                  }) ];

                 case 1:
                  return e.sent(), [ 2, this ];
                }
              });
            });
          }, e.prototype.getFriends = function() {
            return r(this, void 0, void 0, function() {
              return i(this, function(e) {
                switch (e.label) {
                 case 0:
                  return [ 4, this.request("get", "/friends/all") ];

                 case 1:
                  return [ 2, e.sent() ];
                }
              });
            });
          }, e.prototype.getOnlineFriends = function() {
            return r(this, void 0, void 0, function() {
              return i(this, function(e) {
                switch (e.label) {
                 case 0:
                  return [ 4, this.request("get", "/friends/online") ];

                 case 1:
                  return [ 2, e.sent() ];
                }
              });
            });
          }, e.prototype.getFriendRequests = function() {
            return r(this, void 0, void 0, function() {
              return i(this, function(e) {
                switch (e.label) {
                 case 0:
                  return [ 4, this.request("get", "/friends/requests") ];

                 case 1:
                  return [ 2, e.sent() ];
                }
              });
            });
          }, e.prototype.sendFriendRequest = function(e) {
            return r(this, void 0, void 0, function() {
              return i(this, function(t) {
                switch (t.label) {
                 case 0:
                  return [ 4, this.request("post", "/friends/requests", {
                    userId: e
                  }) ];

                 case 1:
                  return [ 2, t.sent() ];
                }
              });
            });
          }, e.prototype.acceptFriendRequest = function(e) {
            return r(this, void 0, void 0, function() {
              return i(this, function(t) {
                switch (t.label) {
                 case 0:
                  return [ 4, this.request("put", "/friends/requests", {
                    userId: e
                  }) ];

                 case 1:
                  return [ 2, t.sent() ];
                }
              });
            });
          }, e.prototype.declineFriendRequest = function(e) {
            return r(this, void 0, void 0, function() {
              return i(this, function(t) {
                switch (t.label) {
                 case 0:
                  return [ 4, this.request("del", "/friends/requests", {
                    userId: e
                  }) ];

                 case 1:
                  return [ 2, t.sent() ];
                }
              });
            });
          }, e.prototype.blockUser = function(e) {
            return r(this, void 0, void 0, function() {
              return i(this, function(t) {
                switch (t.label) {
                 case 0:
                  return [ 4, this.request("post", "/friends/block", {
                    userId: e
                  }) ];

                 case 1:
                  return [ 2, t.sent() ];
                }
              });
            });
          }, e.prototype.unblockUser = function(e) {
            return r(this, void 0, void 0, function() {
              return i(this, function(t) {
                switch (t.label) {
                 case 0:
                  return [ 4, this.request("put", "/friends/block", {
                    userId: e
                  }) ];

                 case 1:
                  return [ 2, t.sent() ];
                }
              });
            });
          }, e.prototype.request = function(e, t, n, o, a) {
            return void 0 === n && (n = {}), void 0 === a && (a = {}), r(this, void 0, void 0, function() {
              var r, c, u, h;
              return i(this, function(i) {
                switch (i.label) {
                 case 0:
                  a.Accept = "application/json", this.hasToken && (a.Authorization = "Bearer " + this.token), 
                  r = [];
                  for (c in n) r.push(c + "=" + n[c]);
                  return u = r.length > 0 ? "?" + r.join("&") : "", h = {
                    headers: a
                  }, o && (h.body = o), [ 4, s[e]("" + this.endpoint + t + u, h) ];

                 case 1:
                  return [ 2, i.sent().data ];
                }
              });
            });
          }, e.prototype.logout = function() {
            this.token = void 0, a.removeItem(c), this.unregisterPingService();
          }, e.prototype.registerPingService = function(e) {
            var t = this;
            void 0 === e && (e = 15e3), this.unregisterPingService(), this.keepOnlineInterval = setInterval(function() {
              return t.request("get", "/auth");
            }, e);
          }, e.prototype.unregisterPingService = function() {
            clearInterval(this.keepOnlineInterval);
          }, e;
        }();
        t.Auth = u;
      }, function(e, t, n) {
        Object.defineProperty(t, "__esModule", {
          value: !0
        });
        var r = n(0);
        t.Schema = r.Schema;
        var i = n(2);
        t.MapSchema = i.MapSchema;
        var o = n(1);
        t.ArraySchema = o.ArraySchema;
        var s = n(33);
        t.Reflection = s.Reflection, t.ReflectionType = s.ReflectionType, t.ReflectionField = s.ReflectionField;
        var a = n(12);
        t.type = a.type, t.deprecated = a.deprecated, t.filter = a.filter, t.defineTypes = a.defineTypes, 
        t.Context = a.Context;
      }, function(e, t, n) {
        Object.defineProperty(t, "__esModule", {
          value: !0
        }), t.END_OF_STRUCTURE = 193, t.NIL = 192, t.INDEX_CHANGE = 212, t.TYPE_ID = 213;
      }, function(e, t, n) {
        Object.defineProperty(t, "__esModule", {
          value: !0
        });
        var r = n(0), i = n(1), o = n(2), s = function() {
          function e(e, t) {
            void 0 === e && (e = null), this.changed = !1, this.changes = [], this.allChanges = [], 
            this.deletedKeys = {}, this.parent = t, this.parentField = e;
          }
          return e.prototype.change = function(e, t) {
            void 0 === t && (t = !1), this.changed = !0, -1 === this.changes.indexOf(e) && this.changes.push(e);
            var n = this.allChanges.indexOf(e);
            t || -1 !== n ? t && n >= 0 && this.allChanges.splice(n, 1) : this.allChanges.push(e), 
            this.parent && this.parent.change(this.parentField);
          }, e.prototype.mapIndex = function(e, t) {
            "object" == typeof e && (this.indexMap || (this.indexMap = new Map(), this.indexChange = new Map()), 
            this.indexMap.set(e, t));
          }, e.prototype.getIndex = function(e) {
            return this.indexMap && this.indexMap.get(e);
          }, e.prototype.deleteIndex = function(e) {
            "object" == typeof e && (this.deletedKeys[this.indexMap.get(e)] = !0, this.indexMap["delete"](e));
          }, e.prototype.isDeleted = function(e) {
            return void 0 !== this.deletedKeys[e];
          }, e.prototype.mapIndexChange = function(e, t) {
            "object" == typeof e && this.indexChange.set(e, t);
          }, e.prototype.getIndexChange = function(e) {
            return this.indexChange && this.indexChange.get(e);
          }, e.prototype.deleteIndexChange = function(e) {
            "object" == typeof e && this.indexChange["delete"](e);
          }, e.prototype.changeAll = function(e) {
            if (e instanceof r.Schema) {
              var t = e._schema;
              for (var n in t) (e[n] instanceof r.Schema || e[n] instanceof i.ArraySchema || e[n] instanceof o.MapSchema) && !e[n].$changes.parent.parent && (e[n].$changes.parent = this), 
              void 0 !== e[n] && this.change(n);
            } else for (var s = Object.keys(e), a = 0, c = s; a < c.length; a++) {
              var u = c[a];
              void 0 !== e[u] && this.change(u);
            }
          }, e.prototype.discard = function() {
            this.changed = !1, this.changes = [], this.deletedKeys = {}, this.indexChange && this.indexChange.clear();
          }, e;
        }();
        t.ChangeTree = s;
      }, function(e, t, n) {
        function r(e, n) {
          return void 0 === n && (n = t.globalContext), function(t, r) {
            var i = t.constructor;
            if (i._context = n, n.has(i) || (n.add(i), i._schema = Object.assign({}, i._schema || {}), 
            i._indexes = Object.assign({}, i._indexes || {}), i._descriptors = Object.assign({}, i._descriptors || {}), 
            i._deprecated = Object.assign({}, i._deprecated || {})), i._indexes[r] = Object.keys(i._schema).length, 
            i._schema[r] = e, !i._descriptors[r]) {
              var o = Array.isArray(e), s = !o && e.map, u = "function" == typeof i._schema[r], h = "_" + r;
              i._descriptors[h] = {
                enumerable: !1,
                configurable: !1,
                writable: !0
              }, i._descriptors[r] = {
                get: function get() {
                  return this[h];
                },
                set: function set(e) {
                  if ((o || s) && (e = new Proxy(e, {
                    get: function get(e, t) {
                      return e[t];
                    },
                    set: function set(e, t, n) {
                      if ("length" !== t && 0 !== t.indexOf("$")) {
                        var r = o ? Number(t) : String(t);
                        if (!e.$sorting) {
                          var i = e.$changes.getIndex(n);
                          void 0 !== i && e.$changes.mapIndexChange(n, i), e.$changes.mapIndex(n, r);
                        }
                        n instanceof c.Schema ? n.$changes.parent || (n.$changes = new a.ChangeTree(r, e.$changes), 
                        n.$changes.changeAll(n)) : e[t] = n, e.$changes.change(r);
                      } else e[t];
                      return e[t] = n, !0;
                    },
                    deleteProperty: function deleteProperty(e, t) {
                      var n = e[t];
                      s && void 0 !== n && (e.$changes.deleteIndex(n), e.$changes.deleteIndexChange(n), 
                      n.$changes && delete n.$changes.parent), delete e[t];
                      var r = o ? Number(t) : String(t);
                      return e.$changes.change(r, !0), !0;
                    }
                  })), e !== this[h]) if (this[h] = e, o) {
                    this.$changes.change(r), e.$changes = new a.ChangeTree(r, this.$changes);
                    for (var t = 0; t < e.length; t++) e[t] instanceof c.Schema && (e[t].$changes = new a.ChangeTree(t, e.$changes), 
                    e[t].$changes.changeAll(e[t])), e.$changes.mapIndex(e[t], t), e.$changes.change(t);
                  } else if (s) {
                    e.$changes = new a.ChangeTree(r, this.$changes), this.$changes.change(r);
                    for (var n in e) e[n] instanceof c.Schema && (e[n].$changes = new a.ChangeTree(n, e.$changes), 
                    e[n].$changes.changeAll(e[n])), e.$changes.mapIndex(e[n], n), e.$changes.change(n);
                  } else u ? (this.$changes.change(r), e && (e.$changes = new a.ChangeTree(r, this.$changes), 
                  e.$changes.changeAll(e))) : this.$changes.change(r);
                },
                enumerable: !0,
                configurable: !0
              };
            }
          };
        }
        function i(e) {
          return function(t, n) {
            var r = t.constructor;
            r._filters || (r._filters = {}), r._filters[n] = e;
          };
        }
        function o(e, n) {
          return void 0 === e && (e = !0), void 0 === n && (n = t.globalContext), function(t, n) {
            var r = t.constructor;
            r._deprecated[n] = !0, e && (r._descriptors[n] = {
              get: function get() {
                throw new Error(n + " is deprecated.");
              },
              set: function set(e) {},
              enumerable: !1,
              configurable: !0
            });
          };
        }
        function s(e, n, i) {
          void 0 === i && (i = t.globalContext);
          for (var o in n) r(n[o], i)(e.prototype, o);
          return e;
        }
        Object.defineProperty(t, "__esModule", {
          value: !0
        });
        var a = n(11), c = n(0), u = function() {
          function e() {
            this.types = {}, this.schemas = new Map();
          }
          return e.prototype.has = function(e) {
            return this.schemas.has(e);
          }, e.prototype.get = function(e) {
            return this.types[e];
          }, e.prototype.add = function(e) {
            e._typeid = this.schemas.size, this.types[e._typeid] = e, this.schemas.set(e, e._typeid);
          }, e;
        }();
        t.Context = u, t.globalContext = new u(), t.type = r, t.filter = i, t.deprecated = o, 
        t.defineTypes = s;
      }, function(e, t, n) {
        Object.defineProperty(t, "__esModule", {
          value: !0
        }), n(14);
        var r = n(15);
        t.Client = r.Client;
        var i = n(7);
        t.Protocol = i.Protocol;
        var o = n(5);
        t.Room = o.Room;
        var s = n(8);
        t.Auth = s.Auth, t.Platform = s.Platform;
        var a = n(25);
        t.FossilDeltaSerializer = a.FossilDeltaSerializer;
        var c = n(30);
        t.SchemaSerializer = c.SchemaSerializer;
        var u = n(6);
        t.registerSerializer = u.registerSerializer;
        var h = n(9);
        t.Schema = h.Schema, t.type = h.type, u.registerSerializer("fossil-delta", a.FossilDeltaSerializer), 
        u.registerSerializer("schema", c.SchemaSerializer);
      }, function(e, t) {
        ArrayBuffer.isView || (ArrayBuffer.isView = function(e) {
          return null !== e && "object" == typeof e && e.buffer instanceof ArrayBuffer;
        });
      }, function(e, t, n) {
        var r = this && this.__extends || function() {
          var _e3 = function e(t, n) {
            return (_e3 = Object.setPrototypeOf || {
              __proto__: []
            } instanceof Array && function(e, t) {
              e.__proto__ = t;
            } || function(e, t) {
              for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
            })(t, n);
          };
          return function(t, n) {
            function r() {
              this.constructor = t;
            }
            _e3(t, n), t.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, 
            new r());
          };
        }(), i = this && this.__awaiter || function(e, t, n, r) {
          function i(e) {
            return e instanceof n ? e : new n(function(t) {
              t(e);
            });
          }
          return new (n || (n = Promise))(function(n, o) {
            function s(e) {
              try {
                c(r.next(e));
              } catch (e) {
                o(e);
              }
            }
            function a(e) {
              try {
                c(r["throw"](e));
              } catch (e) {
                o(e);
              }
            }
            function c(e) {
              e.done ? n(e.value) : i(e.value).then(s, a);
            }
            c((r = r.apply(e, t || [])).next());
          });
        }, o = this && this.__generator || function(e, t) {
          function n(e) {
            return function(t) {
              return r([ e, t ]);
            };
          }
          function r(n) {
            if (i) throw new TypeError("Generator is already executing.");
            for (;c; ) try {
              if (i = 1, o && (s = 2 & n[0] ? o["return"] : n[0] ? o["throw"] || ((s = o["return"]) && s.call(o), 
              0) : o.next) && !(s = s.call(o, n[1])).done) return s;
              switch (o = 0, s && (n = [ 2 & n[0], s.value ]), n[0]) {
               case 0:
               case 1:
                s = n;
                break;

               case 4:
                return c.label++, {
                  value: n[1],
                  done: !1
                };

               case 5:
                c.label++, o = n[1], n = [ 0 ];
                continue;

               case 7:
                n = c.ops.pop(), c.trys.pop();
                continue;

               default:
                if (s = c.trys, !(s = s.length > 0 && s[s.length - 1]) && (6 === n[0] || 2 === n[0])) {
                  c = 0;
                  continue;
                }
                if (3 === n[0] && (!s || n[1] > s[0] && n[1] < s[3])) {
                  c.label = n[1];
                  break;
                }
                if (6 === n[0] && c.label < s[1]) {
                  c.label = s[1], s = n;
                  break;
                }
                if (s && c.label < s[2]) {
                  c.label = s[2], c.ops.push(n);
                  break;
                }
                s[2] && c.ops.pop(), c.trys.pop();
                continue;
              }
              n = t.call(e, c);
            } catch (e) {
              n = [ 6, e ], o = 0;
            } finally {
              i = s = 0;
            }
            if (5 & n[0]) throw n[1];
            return {
              value: n[0] ? n[1] : void 0,
              done: !0
            };
          }
          var i, o, s, a, c = {
            label: 0,
            sent: function sent() {
              if (1 & s[0]) throw s[1];
              return s[1];
            },
            trys: [],
            ops: []
          };
          return a = {
            next: n(0),
            throw: n(1),
            return: n(2)
          }, "function" == typeof Symbol && (a[Symbol.iterator] = function() {
            return this;
          }), a;
        };
        Object.defineProperty(t, "__esModule", {
          value: !0
        });
        var s = n(4), a = n(5), c = n(8), u = n(24), h = function(e) {
          function t(n, r) {
            var i = e.call(this, n) || this;
            return i.code = r, Object.setPrototypeOf(i, t.prototype), i;
          }
          return r(t, e), t;
        }(Error);
        t.MatchMakeError = h;
        var f = function() {
          function e(e) {
            void 0 === e && (e = location.protocol.replace("http", "ws") + "//" + location.hostname + (location.port && ":" + location.port)), 
            this.endpoint = e, this.auth = new c.Auth(this.endpoint), this.push = new u.Push(this.endpoint);
          }
          return e.prototype.joinOrCreate = function(e, t, n) {
            return void 0 === t && (t = {}), i(this, void 0, void 0, function() {
              return o(this, function(r) {
                switch (r.label) {
                 case 0:
                  return [ 4, this.createMatchMakeRequest("joinOrCreate", e, t, n) ];

                 case 1:
                  return [ 2, r.sent() ];
                }
              });
            });
          }, e.prototype.create = function(e, t, n) {
            return void 0 === t && (t = {}), i(this, void 0, void 0, function() {
              return o(this, function(r) {
                switch (r.label) {
                 case 0:
                  return [ 4, this.createMatchMakeRequest("create", e, t, n) ];

                 case 1:
                  return [ 2, r.sent() ];
                }
              });
            });
          }, e.prototype.join = function(e, t, n) {
            return void 0 === t && (t = {}), i(this, void 0, void 0, function() {
              return o(this, function(r) {
                switch (r.label) {
                 case 0:
                  return [ 4, this.createMatchMakeRequest("join", e, t, n) ];

                 case 1:
                  return [ 2, r.sent() ];
                }
              });
            });
          }, e.prototype.joinById = function(e, t, n) {
            return void 0 === t && (t = {}), i(this, void 0, void 0, function() {
              return o(this, function(r) {
                switch (r.label) {
                 case 0:
                  return [ 4, this.createMatchMakeRequest("joinById", e, t, n) ];

                 case 1:
                  return [ 2, r.sent() ];
                }
              });
            });
          }, e.prototype.reconnect = function(e, t, n) {
            return i(this, void 0, void 0, function() {
              return o(this, function(r) {
                switch (r.label) {
                 case 0:
                  return [ 4, this.createMatchMakeRequest("joinById", e, {
                    sessionId: t
                  }, n) ];

                 case 1:
                  return [ 2, r.sent() ];
                }
              });
            });
          }, e.prototype.getAvailableRooms = function(e) {
            return void 0 === e && (e = ""), i(this, void 0, void 0, function() {
              var t;
              return o(this, function(n) {
                switch (n.label) {
                 case 0:
                  return t = this.endpoint.replace("ws", "http") + "/matchmake/" + e, [ 4, s.get(t, {
                    headers: {
                      Accept: "application/json"
                    }
                  }) ];

                 case 1:
                  return [ 2, n.sent().data ];
                }
              });
            });
          }, e.prototype.consumeSeatReservation = function(e, t) {
            return i(this, void 0, void 0, function() {
              var n;
              return o(this, function(r) {
                return n = this.createRoom(e.room.name, t), n.id = e.room.roomId, n.sessionId = e.sessionId, 
                n.connect(this.buildEndpoint(e.room, {
                  sessionId: n.sessionId
                })), [ 2, new Promise(function(e, t) {
                  var r = function r(e) {
                    return t(e);
                  };
                  n.onError.once(r), n.onJoin.once(function() {
                    n.onError.remove(r), e(n);
                  });
                }) ];
              });
            });
          }, e.prototype.createMatchMakeRequest = function(e, t, n, r) {
            return void 0 === n && (n = {}), i(this, void 0, void 0, function() {
              var i, a;
              return o(this, function(o) {
                switch (o.label) {
                 case 0:
                  return i = this.endpoint.replace("ws", "http") + "/matchmake/" + e + "/" + t, this.auth.hasToken && (n.token = this.auth.token), 
                  [ 4, s.post(i, {
                    headers: {
                      Accept: "application/json",
                      "Content-Type": "application/json"
                    },
                    body: JSON.stringify(n)
                  }) ];

                 case 1:
                  if (a = o.sent().data, a.error) throw new h(a.error, a.code);
                  return [ 2, this.consumeSeatReservation(a, r) ];
                }
              });
            });
          }, e.prototype.createRoom = function(e, t) {
            return new a.Room(e, t);
          }, e.prototype.buildEndpoint = function(e, t) {
            void 0 === t && (t = {});
            var n = [];
            for (var r in t) t.hasOwnProperty(r) && n.push(r + "=" + t[r]);
            return this.endpoint + "/" + e.processId + "/" + e.roomId + "?" + n.join("&");
          }, e;
        }();
        t.Client = f;
      }, function(e, t, n) {
        function r(e) {
          if (this._offset = 0, e instanceof ArrayBuffer) this._buffer = e, this._view = new DataView(this._buffer); else {
            if (!ArrayBuffer.isView(e)) throw new Error("Invalid argument");
            this._buffer = e.buffer, this._view = new DataView(this._buffer, e.byteOffset, e.byteLength);
          }
        }
        function i(e, t, n) {
          for (var r = "", i = 0, o = t, s = t + n; o < s; o++) {
            var a = e.getUint8(o);
            if (0 != (128 & a)) if (192 != (224 & a)) if (224 != (240 & a)) {
              if (240 != (248 & a)) throw new Error("Invalid byte " + a.toString(16));
              i = (7 & a) << 18 | (63 & e.getUint8(++o)) << 12 | (63 & e.getUint8(++o)) << 6 | (63 & e.getUint8(++o)) << 0, 
              i >= 65536 ? (i -= 65536, r += String.fromCharCode(55296 + (i >>> 10), 56320 + (1023 & i))) : r += String.fromCharCode(i);
            } else r += String.fromCharCode((15 & a) << 12 | (63 & e.getUint8(++o)) << 6 | (63 & e.getUint8(++o)) << 0); else r += String.fromCharCode((31 & a) << 6 | 63 & e.getUint8(++o)); else r += String.fromCharCode(a);
          }
          return r;
        }
        function o(e) {
          var t = new r(e), n = t._parse();
          if (t._offset !== e.byteLength) throw new Error(e.byteLength - t._offset + " trailing bytes");
          return n;
        }
        r.prototype._array = function(e) {
          for (var t = new Array(e), n = 0; n < e; n++) t[n] = this._parse();
          return t;
        }, r.prototype._map = function(e) {
          for (var t = "", n = {}, r = 0; r < e; r++) t = this._parse(), n[t] = this._parse();
          return n;
        }, r.prototype._str = function(e) {
          var t = i(this._view, this._offset, e);
          return this._offset += e, t;
        }, r.prototype._bin = function(e) {
          var t = this._buffer.slice(this._offset, this._offset + e);
          return this._offset += e, t;
        }, r.prototype._parse = function() {
          var e, t = this._view.getUint8(this._offset++), n = 0, r = 0, i = 0, o = 0;
          if (t < 192) return t < 128 ? t : t < 144 ? this._map(15 & t) : t < 160 ? this._array(15 & t) : this._str(31 & t);
          if (t > 223) return -1 * (255 - t + 1);
          switch (t) {
           case 192:
            return null;

           case 194:
            return !1;

           case 195:
            return !0;

           case 196:
            return n = this._view.getUint8(this._offset), this._offset += 1, this._bin(n);

           case 197:
            return n = this._view.getUint16(this._offset), this._offset += 2, this._bin(n);

           case 198:
            return n = this._view.getUint32(this._offset), this._offset += 4, this._bin(n);

           case 199:
            return n = this._view.getUint8(this._offset), r = this._view.getInt8(this._offset + 1), 
            this._offset += 2, [ r, this._bin(n) ];

           case 200:
            return n = this._view.getUint16(this._offset), r = this._view.getInt8(this._offset + 2), 
            this._offset += 3, [ r, this._bin(n) ];

           case 201:
            return n = this._view.getUint32(this._offset), r = this._view.getInt8(this._offset + 4), 
            this._offset += 5, [ r, this._bin(n) ];

           case 202:
            return e = this._view.getFloat32(this._offset), this._offset += 4, e;

           case 203:
            return e = this._view.getFloat64(this._offset), this._offset += 8, e;

           case 204:
            return e = this._view.getUint8(this._offset), this._offset += 1, e;

           case 205:
            return e = this._view.getUint16(this._offset), this._offset += 2, e;

           case 206:
            return e = this._view.getUint32(this._offset), this._offset += 4, e;

           case 207:
            return i = this._view.getUint32(this._offset) * Math.pow(2, 32), o = this._view.getUint32(this._offset + 4), 
            this._offset += 8, i + o;

           case 208:
            return e = this._view.getInt8(this._offset), this._offset += 1, e;

           case 209:
            return e = this._view.getInt16(this._offset), this._offset += 2, e;

           case 210:
            return e = this._view.getInt32(this._offset), this._offset += 4, e;

           case 211:
            return i = this._view.getInt32(this._offset) * Math.pow(2, 32), o = this._view.getUint32(this._offset + 4), 
            this._offset += 8, i + o;

           case 212:
            return r = this._view.getInt8(this._offset), this._offset += 1, 0 === r ? void (this._offset += 1) : [ r, this._bin(1) ];

           case 213:
            return r = this._view.getInt8(this._offset), this._offset += 1, [ r, this._bin(2) ];

           case 214:
            return r = this._view.getInt8(this._offset), this._offset += 1, [ r, this._bin(4) ];

           case 215:
            return r = this._view.getInt8(this._offset), this._offset += 1, 0 === r ? (i = this._view.getInt32(this._offset) * Math.pow(2, 32), 
            o = this._view.getUint32(this._offset + 4), this._offset += 8, new Date(i + o)) : [ r, this._bin(8) ];

           case 216:
            return r = this._view.getInt8(this._offset), this._offset += 1, [ r, this._bin(16) ];

           case 217:
            return n = this._view.getUint8(this._offset), this._offset += 1, this._str(n);

           case 218:
            return n = this._view.getUint16(this._offset), this._offset += 2, this._str(n);

           case 219:
            return n = this._view.getUint32(this._offset), this._offset += 4, this._str(n);

           case 220:
            return n = this._view.getUint16(this._offset), this._offset += 2, this._array(n);

           case 221:
            return n = this._view.getUint32(this._offset), this._offset += 4, this._array(n);

           case 222:
            return n = this._view.getUint16(this._offset), this._offset += 2, this._map(n);

           case 223:
            return n = this._view.getUint32(this._offset), this._offset += 4, this._map(n);
          }
          throw new Error("Could not parse");
        }, e.exports = o;
      }, function(e, t, n) {
        function r(e, t, n) {
          for (var r = 0, i = 0, o = n.length; i < o; i++) r = n.charCodeAt(i), r < 128 ? e.setUint8(t++, r) : r < 2048 ? (e.setUint8(t++, 192 | r >> 6), 
          e.setUint8(t++, 128 | 63 & r)) : r < 55296 || r >= 57344 ? (e.setUint8(t++, 224 | r >> 12), 
          e.setUint8(t++, 128 | r >> 6 & 63), e.setUint8(t++, 128 | 63 & r)) : (i++, r = 65536 + ((1023 & r) << 10 | 1023 & n.charCodeAt(i)), 
          e.setUint8(t++, 240 | r >> 18), e.setUint8(t++, 128 | r >> 12 & 63), e.setUint8(t++, 128 | r >> 6 & 63), 
          e.setUint8(t++, 128 | 63 & r));
        }
        function i(e) {
          for (var t = 0, n = 0, r = 0, i = e.length; r < i; r++) t = e.charCodeAt(r), t < 128 ? n += 1 : t < 2048 ? n += 2 : t < 55296 || t >= 57344 ? n += 3 : (r++, 
          n += 4);
          return n;
        }
        function o(e, t, n) {
          var r = typeof n, s = 0, a = 0, c = 0, u = 0, h = 0, f = 0;
          if ("string" === r) {
            if ((h = i(n)) < 32) e.push(160 | h), f = 1; else if (h < 256) e.push(217, h), f = 2; else if (h < 65536) e.push(218, h >> 8, h), 
            f = 3; else {
              if (!(h < 4294967296)) throw new Error("String too long");
              e.push(219, h >> 24, h >> 16, h >> 8, h), f = 5;
            }
            return t.push({
              _str: n,
              _length: h,
              _offset: e.length
            }), f + h;
          }
          if ("number" === r) return Math.floor(n) === n && isFinite(n) ? n >= 0 ? n < 128 ? (e.push(n), 
          1) : n < 256 ? (e.push(204, n), 2) : n < 65536 ? (e.push(205, n >> 8, n), 3) : n < 4294967296 ? (e.push(206, n >> 24, n >> 16, n >> 8, n), 
          5) : (c = n / Math.pow(2, 32) >> 0, u = n >>> 0, e.push(207, c >> 24, c >> 16, c >> 8, c, u >> 24, u >> 16, u >> 8, u), 
          9) : n >= -32 ? (e.push(n), 1) : n >= -128 ? (e.push(208, n), 2) : n >= -32768 ? (e.push(209, n >> 8, n), 
          3) : n >= -2147483648 ? (e.push(210, n >> 24, n >> 16, n >> 8, n), 5) : (c = Math.floor(n / Math.pow(2, 32)), 
          u = n >>> 0, e.push(211, c >> 24, c >> 16, c >> 8, c, u >> 24, u >> 16, u >> 8, u), 
          9) : (e.push(203), t.push({
            _float: n,
            _length: 8,
            _offset: e.length
          }), 9);
          if ("object" === r) {
            if (null === n) return e.push(192), 1;
            if (Array.isArray(n)) {
              if ((h = n.length) < 16) e.push(144 | h), f = 1; else if (h < 65536) e.push(220, h >> 8, h), 
              f = 3; else {
                if (!(h < 4294967296)) throw new Error("Array too large");
                e.push(221, h >> 24, h >> 16, h >> 8, h), f = 5;
              }
              for (s = 0; s < h; s++) f += o(e, t, n[s]);
              return f;
            }
            if (n instanceof Date) {
              var l = n.getTime();
              return c = Math.floor(l / Math.pow(2, 32)), u = l >>> 0, e.push(215, 0, c >> 24, c >> 16, c >> 8, c, u >> 24, u >> 16, u >> 8, u), 
              10;
            }
            if (n instanceof ArrayBuffer) {
              if ((h = n.byteLength) < 256) e.push(196, h), f = 2; else if (h < 65536) e.push(197, h >> 8, h), 
              f = 3; else {
                if (!(h < 4294967296)) throw new Error("Buffer too large");
                e.push(198, h >> 24, h >> 16, h >> 8, h), f = 5;
              }
              return t.push({
                _bin: n,
                _length: h,
                _offset: e.length
              }), f + h;
            }
            if ("function" == typeof n.toJSON) return o(e, t, n.toJSON());
            var p = [], d = "", v = Object.keys(n);
            for (s = 0, a = v.length; s < a; s++) d = v[s], "function" != typeof n[d] && p.push(d);
            if ((h = p.length) < 16) e.push(128 | h), f = 1; else if (h < 65536) e.push(222, h >> 8, h), 
            f = 3; else {
              if (!(h < 4294967296)) throw new Error("Object too large");
              e.push(223, h >> 24, h >> 16, h >> 8, h), f = 5;
            }
            for (s = 0; s < h; s++) d = p[s], f += o(e, t, d), f += o(e, t, n[d]);
            return f;
          }
          if ("boolean" === r) return e.push(n ? 195 : 194), 1;
          if ("undefined" === r) return e.push(212, 0, 0), 3;
          throw new Error("Could not encode");
        }
        function s(e) {
          var t = [], n = [], i = o(t, n, e), s = new ArrayBuffer(i), a = new DataView(s), c = 0, u = 0, h = -1;
          n.length > 0 && (h = n[0]._offset);
          for (var f, l = 0, p = 0, d = 0, v = t.length; d < v; d++) if (a.setUint8(u + d, t[d]), 
          d + 1 === h) {
            if (f = n[c], l = f._length, p = u + h, f._bin) for (var y = new Uint8Array(f._bin), g = 0; g < l; g++) a.setUint8(p + g, y[g]); else f._str ? r(a, p, f._str) : void 0 !== f._float && a.setFloat64(p, f._float);
            c++, u += l, n[c] && (h = n[c]._offset);
          }
          return s;
        }
        e.exports = s;
      }, function(e, t, n) {
        function r() {
          function e(e) {
            return t.register(e, null === this);
          }
          var t = new i();
          return e.once = function(e) {
            var n = function n() {
              for (var r = [], i = 0; i < arguments.length; i++) r[i] = arguments[i];
              e.apply(void 0, r), t.remove(n);
            };
            t.register(n);
          }, e.remove = function(e) {
            return t.remove(e);
          }, e.invoke = function() {
            for (var e = [], n = 0; n < arguments.length; n++) e[n] = arguments[n];
            return t.invoke.apply(t, e);
          }, e.invokeAsync = function() {
            for (var e = [], n = 0; n < arguments.length; n++) e[n] = arguments[n];
            return t.invokeAsync.apply(t, e);
          }, e.clear = function() {
            return t.clear();
          }, e;
        }
        Object.defineProperty(t, "__esModule", {
          value: !0
        });
        var i = function() {
          function e() {
            this.handlers = [];
          }
          return e.prototype.register = function(e, t) {
            return void 0 === t && (t = !1), this.handlers.push(e), this;
          }, e.prototype.invoke = function() {
            for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
            this.handlers.forEach(function(t) {
              return t.apply(void 0, e);
            });
          }, e.prototype.invokeAsync = function() {
            for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
            return Promise.all(this.handlers.map(function(t) {
              return t.apply(void 0, e);
            }));
          }, e.prototype.remove = function(e) {
            var t = this.handlers.indexOf(e);
            this.handlers[t] = this.handlers[this.handlers.length - 1], this.handlers.pop();
          }, e.prototype.clear = function() {
            this.handlers = [];
          }, e;
        }();
        t.EventEmitter = i, t.createSignal = r;
      }, function(e, t, n) {
        var r = this && this.__extends || function() {
          var _e4 = function e(t, n) {
            return (_e4 = Object.setPrototypeOf || {
              __proto__: []
            } instanceof Array && function(e, t) {
              e.__proto__ = t;
            } || function(e, t) {
              for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
            })(t, n);
          };
          return function(t, n) {
            function r() {
              this.constructor = t;
            }
            _e4(t, n), t.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, 
            new r());
          };
        }(), i = this && this.__importDefault || function(e) {
          return e && e.__esModule ? e : {
            default: e
          };
        }, o = this && this.__importStar || function(e) {
          if (e && e.__esModule) return e;
          var t = {};
          if (null != e) for (var n in e) Object.hasOwnProperty.call(e, n) && (t[n] = e[n]);
          return t["default"] = e, t;
        };
        Object.defineProperty(t, "__esModule", {
          value: !0
        });
        var s = i(n(20)), a = o(n(3)), c = function(e) {
          function t(t, n) {
            void 0 === n && (n = !0);
            var r = e.call(this, t, void 0, {
              connect: n
            }) || this;
            return r._enqueuedCalls = [], r;
          }
          return r(t, e), t.prototype.onOpenCallback = function(t) {
            if (e.prototype.onOpenCallback.call(this), this.binaryType = "arraybuffer", this._enqueuedCalls.length > 0) {
              for (var n = 0, r = this._enqueuedCalls; n < r.length; n++) {
                var i = r[n], o = i[0], s = i[1];
                this[o].apply(this, s);
              }
              this._enqueuedCalls = [];
            }
          }, t.prototype.send = function(t) {
            if (this.ws.readyState === s["default"].OPEN) return e.prototype.send.call(this, a.encode(t));
            this._enqueuedCalls.push([ "send", [ t ] ]);
          }, t;
        }(s["default"]);
        t.Connection = c;
      }, function(e, t, n) {
        function r(e, t) {
          if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
        }
        Object.defineProperty(t, "__esModule", {
          value: !0
        });
        var i = function() {
          function e(e, t) {
            for (var n = 0; n < t.length; n++) {
              var r = t[n];
              r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
              Object.defineProperty(e, r.key, r);
            }
          }
          return function(t, n, r) {
            return n && e(t.prototype, n), r && e(t, r), t;
          };
        }(), o = n(21).createBackoff, s = "undefined" != typeof WebSocket ? WebSocket : n(22), a = function() {
          function e(t, n) {
            var i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
            r(this, e), this.url = t, this.protocols = n, this.reconnectEnabled = !0, this.listeners = {}, 
            this.backoff = o(i.backoff || "exponential", i), this.backoff.onReady = this.onBackoffReady.bind(this), 
            (void 0 === i.connect || i.connect) && this.open();
          }
          return i(e, [ {
            key: "open",
            value: function value() {
              var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
              this.isReconnect = e;
              var t = this.ws && this.ws.binaryType;
              this.ws = new s(this.url, this.protocols), this.ws.onclose = this.onCloseCallback.bind(this), 
              this.ws.onerror = this.onErrorCallback.bind(this), this.ws.onmessage = this.onMessageCallback.bind(this), 
              this.ws.onopen = this.onOpenCallback.bind(this), t && (this.ws.binaryType = t);
            }
          }, {
            key: "onBackoffReady",
            value: function value(e, t) {
              this.open(!0);
            }
          }, {
            key: "onCloseCallback",
            value: function value(e) {
              !this.isReconnect && this.listeners.onclose && this.listeners.onclose.apply(null, arguments), 
              this.reconnectEnabled && e.code < 3e3 && this.backoff.backoff();
            }
          }, {
            key: "onErrorCallback",
            value: function value() {
              this.listeners.onerror && this.listeners.onerror.apply(null, arguments);
            }
          }, {
            key: "onMessageCallback",
            value: function value() {
              this.listeners.onmessage && this.listeners.onmessage.apply(null, arguments);
            }
          }, {
            key: "onOpenCallback",
            value: function value() {
              this.listeners.onopen && this.listeners.onopen.apply(null, arguments), this.isReconnect && this.listeners.onreconnect && this.listeners.onreconnect.apply(null, arguments), 
              this.isReconnect = !1;
            }
          }, {
            key: "close",
            value: function value(e, t) {
              void 0 === e && (e = 1e3), this.reconnectEnabled = !1, this.ws.close(e, t);
            }
          }, {
            key: "send",
            value: function value(e) {
              this.ws.send(e);
            }
          }, {
            key: "bufferedAmount",
            get: function get() {
              return this.ws.bufferedAmount;
            }
          }, {
            key: "readyState",
            get: function get() {
              return this.ws.readyState;
            }
          }, {
            key: "binaryType",
            get: function get() {
              return this.ws.binaryType;
            },
            set: function set(e) {
              this.ws.binaryType = e;
            }
          }, {
            key: "extensions",
            get: function get() {
              return this.ws.extensions;
            },
            set: function set(e) {
              this.ws.extensions = e;
            }
          }, {
            key: "protocol",
            get: function get() {
              return this.ws.protocol;
            },
            set: function set(e) {
              this.ws.protocol = e;
            }
          }, {
            key: "onclose",
            set: function set(e) {
              this.listeners.onclose = e;
            },
            get: function get() {
              return this.listeners.onclose;
            }
          }, {
            key: "onerror",
            set: function set(e) {
              this.listeners.onerror = e;
            },
            get: function get() {
              return this.listeners.onerror;
            }
          }, {
            key: "onmessage",
            set: function set(e) {
              this.listeners.onmessage = e;
            },
            get: function get() {
              return this.listeners.onmessage;
            }
          }, {
            key: "onopen",
            set: function set(e) {
              this.listeners.onopen = e;
            },
            get: function get() {
              return this.listeners.onopen;
            }
          }, {
            key: "onreconnect",
            set: function set(e) {
              this.listeners.onreconnect = e;
            },
            get: function get() {
              return this.listeners.onreconnect;
            }
          } ]), e;
        }();
        a.CONNECTING = s.CONNECTING, a.OPEN = s.OPEN, a.CLOSING = s.CLOSING, a.CLOSED = s.CLOSED, 
        t["default"] = a;
      }, function(e, t, n) {
        function r(e, t) {
          return new i(o[e], t);
        }
        function i(e, t) {
          this.func = e, this.attempts = 0, this.delay = void 0 !== t.initialDelay ? t.initialDelay : 100;
        }
        Object.defineProperty(t, "__esModule", {
          value: !0
        }), t.createBackoff = r;
        var o = {
          exponential: function exponential(e, t) {
            return Math.floor(Math.random() * Math.pow(2, e) * t);
          },
          fibonacci: function fibonacci(e, t) {
            var n = 1;
            if (e > n) for (var r = 1, n = 2, i = 2; i < e; i++) {
              var o = r + n;
              r = n, n = o;
            }
            return Math.floor(Math.random() * n * t);
          }
        };
        i.prototype.backoff = function() {
          setTimeout(this.onReady, this.func(++this.attempts, this.delay));
        };
      }, function(e, t) {}, function(e, t, n) {
        function r() {
          return a || (a = "undefined" != typeof cc && cc.sys && cc.sys.localStorage ? cc.sys.localStorage : "undefined" != typeof window && window.localStorage ? window.localStorage : {
            cache: {},
            setItem: function setItem(e, t) {
              this.cache[e] = t;
            },
            getItem: function getItem(e) {
              this.cache[e];
            },
            removeItem: function removeItem(e) {
              delete this.cache[e];
            }
          }), a;
        }
        function i(e, t) {
          r().setItem(e, t);
        }
        function o(e) {
          r().removeItem(e);
        }
        function s(e, t) {
          var n = r().getItem(e);
          "undefined" != typeof Promise && n instanceof Promise ? n.then(function(e) {
            return t(e);
          }) : t(n);
        }
        Object.defineProperty(t, "__esModule", {
          value: !0
        });
        var a;
        t.setItem = i, t.removeItem = o, t.getItem = s;
      }, function(e, t, n) {
        var r = this && this.__awaiter || function(e, t, n, r) {
          function i(e) {
            return e instanceof n ? e : new n(function(t) {
              t(e);
            });
          }
          return new (n || (n = Promise))(function(n, o) {
            function s(e) {
              try {
                c(r.next(e));
              } catch (e) {
                o(e);
              }
            }
            function a(e) {
              try {
                c(r["throw"](e));
              } catch (e) {
                o(e);
              }
            }
            function c(e) {
              e.done ? n(e.value) : i(e.value).then(s, a);
            }
            c((r = r.apply(e, t || [])).next());
          });
        }, i = this && this.__generator || function(e, t) {
          function n(e) {
            return function(t) {
              return r([ e, t ]);
            };
          }
          function r(n) {
            if (i) throw new TypeError("Generator is already executing.");
            for (;c; ) try {
              if (i = 1, o && (s = 2 & n[0] ? o["return"] : n[0] ? o["throw"] || ((s = o["return"]) && s.call(o), 
              0) : o.next) && !(s = s.call(o, n[1])).done) return s;
              switch (o = 0, s && (n = [ 2 & n[0], s.value ]), n[0]) {
               case 0:
               case 1:
                s = n;
                break;

               case 4:
                return c.label++, {
                  value: n[1],
                  done: !1
                };

               case 5:
                c.label++, o = n[1], n = [ 0 ];
                continue;

               case 7:
                n = c.ops.pop(), c.trys.pop();
                continue;

               default:
                if (s = c.trys, !(s = s.length > 0 && s[s.length - 1]) && (6 === n[0] || 2 === n[0])) {
                  c = 0;
                  continue;
                }
                if (3 === n[0] && (!s || n[1] > s[0] && n[1] < s[3])) {
                  c.label = n[1];
                  break;
                }
                if (6 === n[0] && c.label < s[1]) {
                  c.label = s[1], s = n;
                  break;
                }
                if (s && c.label < s[2]) {
                  c.label = s[2], c.ops.push(n);
                  break;
                }
                s[2] && c.ops.pop(), c.trys.pop();
                continue;
              }
              n = t.call(e, c);
            } catch (e) {
              n = [ 6, e ], o = 0;
            } finally {
              i = s = 0;
            }
            if (5 & n[0]) throw n[1];
            return {
              value: n[0] ? n[1] : void 0,
              done: !0
            };
          }
          var i, o, s, a, c = {
            label: 0,
            sent: function sent() {
              if (1 & s[0]) throw s[1];
              return s[1];
            },
            trys: [],
            ops: []
          };
          return a = {
            next: n(0),
            throw: n(1),
            return: n(2)
          }, "function" == typeof Symbol && (a[Symbol.iterator] = function() {
            return this;
          }), a;
        };
        Object.defineProperty(t, "__esModule", {
          value: !0
        });
        var o = function() {
          function e(e) {
            this.endpoint = e.replace("ws", "http");
          }
          return e.prototype.register = function() {
            return r(this, void 0, void 0, function() {
              return i(this, function(e) {
                switch (e.label) {
                 case 0:
                  return this.check(), [ 4, this.registerServiceWorker() ];

                 case 1:
                  return e.sent(), [ 4, this.requestNotificationPermission() ];

                 case 2:
                  return e.sent(), [ 2 ];
                }
              });
            });
          }, e.prototype.registerServiceWorker = function() {
            return r(this, void 0, void 0, function() {
              return i(this, function(e) {
                switch (e.label) {
                 case 0:
                  return [ 4, navigator.serviceWorker.register(this.endpoint + "/push") ];

                 case 1:
                  return [ 2, e.sent() ];
                }
              });
            });
          }, e.prototype.requestNotificationPermission = function() {
            return r(this, void 0, void 0, function() {
              var e;
              return i(this, function(t) {
                switch (t.label) {
                 case 0:
                  return [ 4, window.Notification.requestPermission() ];

                 case 1:
                  if ("granted" !== (e = t.sent())) throw new Error("Permission not granted for Notification");
                  return [ 2 ];
                }
              });
            });
          }, e.prototype.check = function() {
            if (!("serviceWorker" in navigator)) throw new Error("No Service Worker support!");
            if (!("PushManager" in window)) throw new Error("No Push API Support!");
          }, e;
        }();
        t.Push = o;
      }, function(e, t, n) {
        var r = this && this.__importStar || function(e) {
          if (e && e.__esModule) return e;
          var t = {};
          if (null != e) for (var n in e) Object.hasOwnProperty.call(e, n) && (t[n] = e[n]);
          return t["default"] = e, t;
        };
        Object.defineProperty(t, "__esModule", {
          value: !0
        });
        var i = n(26), o = r(n(29)), s = r(n(3)), a = function() {
          function e() {
            this.api = new i.StateContainer({});
          }
          return e.prototype.getState = function() {
            return this.api.state;
          }, e.prototype.setState = function(e) {
            this.previousState = new Uint8Array(e), this.api.set(s.decode(this.previousState));
          }, e.prototype.patch = function(e) {
            this.previousState = new Uint8Array(o.apply(this.previousState, e)), this.api.set(s.decode(this.previousState));
          }, e.prototype.teardown = function() {
            this.api.removeAllListeners();
          }, e;
        }();
        t.FossilDeltaSerializer = a;
      }, function(e, t, n) {
        Object.defineProperty(t, "__esModule", {
          value: !0
        });
        var r = n(27);
        t.StateContainer = r.StateContainer;
      }, function(e, t, n) {
        Object.defineProperty(t, "__esModule", {
          value: !0
        });
        var r = n(28), i = function() {
          function e(e) {
            this.listeners = [], this.matcherPlaceholders = {
              ":id": /^([a-zA-Z0-9\-_]+)$/,
              ":number": /^([0-9]+)$/,
              ":string": /^(\w+)$/,
              ":axis": /^([xyz])$/,
              ":*": /(.*)/
            }, this.state = e, this.reset();
          }
          return e.prototype.set = function(e) {
            var t = r.compare(this.state, e);
            return this.state = e, this.checkPatches(t, this.listeners, this.defaultListener), 
            t;
          }, e.prototype.registerPlaceholder = function(e, t) {
            this.matcherPlaceholders[e] = t;
          }, e.prototype.listen = function(e, t, n) {
            var i, o = this;
            "function" == typeof e ? (i = [], t = e) : i = e.split("/"), t.length > 1 && console.warn(".listen() accepts only one parameter.");
            var s = {
              callback: t,
              rawRules: i,
              rules: i.map(function(e) {
                return "string" == typeof e ? 0 === e.indexOf(":") ? o.matcherPlaceholders[e] || o.matcherPlaceholders[":*"] : new RegExp("^" + e + "$") : e;
              })
            };
            return 0 === i.length ? this.defaultListener = s : this.listeners.push(s), n && this.checkPatches(r.compare({}, this.state), [ s ]), 
            s;
          }, e.prototype.removeListener = function(e) {
            for (var t = this.listeners.length - 1; t >= 0; t--) this.listeners[t] === e && this.listeners.splice(t, 1);
          }, e.prototype.removeAllListeners = function() {
            this.reset();
          }, e.prototype.checkPatches = function(e, t, n) {
            for (var r = 0, i = t.length; r < i; r++) for (var o = t[r], s = e.length - 1; s >= 0; s--) {
              var a = o && this.getPathVariables(e[s], o);
              a && (o.callback({
                path: a,
                rawPath: e[s].path,
                operation: e[s].operation,
                value: e[s].value
              }), e[s].matched = !0);
            }
            if (n) for (var s = e.length - 1; s >= 0; s--) e[s].matched || n.callback(e[s]);
          }, e.prototype.getPathVariables = function(e, t) {
            if (e.path.length !== t.rules.length) return !1;
            for (var n = {}, r = 0, i = t.rules.length; r < i; r++) {
              var o = e.path[r].match(t.rules[r]);
              if (!o || 0 === o.length || o.length > 2) return !1;
              ":" === t.rawRules[r].substr(0, 1) && (n[t.rawRules[r].substr(1)] = o[1]);
            }
            return n;
          }, e.prototype.reset = function() {
            this.listeners = [];
          }, e;
        }();
        t.StateContainer = i;
      }, function(e, t, n) {
        function r(e, t) {
          var n = [];
          return s(e, t, n, []), n;
        }
        function i(e, t) {
          var n = e.slice();
          return n.push(t), n;
        }
        function o(e) {
          if (Array.isArray(e)) {
            for (var t = new Array(e.length), n = 0; n < t.length; n++) t[n] = "" + n;
            return t;
          }
          if (Object.keys) return Object.keys(e);
          var r = [];
          for (var i in e) e.hasOwnProperty(i) && r.push(i);
          return r;
        }
        function s(e, t, n, r) {
          for (var a = o(t), c = o(e), u = !1, h = c.length - 1; h >= 0; h--) {
            var f = c[h], l = e[f];
            if (!t.hasOwnProperty(f) || void 0 === t[f] && void 0 !== l && !1 === Array.isArray(t)) n.push({
              operation: "remove",
              path: i(r, f)
            }), u = !0; else {
              var p = t[f];
              "object" == typeof l && null != l && "object" == typeof p && null != p ? s(l, p, n, i(r, f)) : l !== p && n.push({
                operation: "replace",
                path: i(r, f),
                value: p,
                previousValue: l
              });
            }
          }
          if (u || a.length != c.length) for (var h = a.length - 1; h >= 0; h--) {
            var f = a[h];
            if (!e.hasOwnProperty(f) && void 0 !== t[f]) {
              var p = t[f], d = i(r, f);
              "object" == typeof p && null != p && s({}, p, n, d), n.push({
                operation: "add",
                path: d,
                value: p
              });
            }
          }
        }
        Object.defineProperty(t, "__esModule", {
          value: !0
        }), t.compare = r;
      }, function(e, t) {
        !function(t, n) {
          void 0 !== e && e.exports ? e.exports = n() : t.fossilDelta = n();
        }(this, function() {
          function e() {
            this.a = 0, this.b = 0, this.i = 0, this.z = new Array(s);
          }
          function t(e) {
            this.a = e, this.pos = 0;
          }
          function n() {
            this.a = [];
          }
          function r(e) {
            var t, n;
            for (t = 1, n = 64; e >= n; t++, n <<= 6) ;
            return t;
          }
          function i(e) {
            for (var t = 0, n = 0, r = 0, i = 0, o = 0, s = e.length; s >= 16; ) t = t + e[o + 0] | 0, 
            n = n + e[o + 1] | 0, r = r + e[o + 2] | 0, i = i + e[o + 3] | 0, t = t + e[o + 4] | 0, 
            n = n + e[o + 5] | 0, r = r + e[o + 6] | 0, i = i + e[o + 7] | 0, t = t + e[o + 8] | 0, 
            n = n + e[o + 9] | 0, r = r + e[o + 10] | 0, i = i + e[o + 11] | 0, t = t + e[o + 12] | 0, 
            n = n + e[o + 13] | 0, r = r + e[o + 14] | 0, i = i + e[o + 15] | 0, o += 16, s -= 16;
            for (;s >= 4; ) t = t + e[o + 0] | 0, n = n + e[o + 1] | 0, r = r + e[o + 2] | 0, 
            i = i + e[o + 3] | 0, o += 4, s -= 4;
            switch (i = ((i + (r << 8) | 0) + (n << 16) | 0) + (t << 24) | 0, s) {
             case 3:
              i = i + (e[o + 2] << 8) | 0;

             case 2:
              i = i + (e[o + 1] << 16) | 0;

             case 1:
              i = i + (e[o + 0] << 24) | 0;
            }
            return i >>> 0;
          }
          var o = {}, s = 16;
          e.prototype.init = function(e, t) {
            var n, r, i = 0, o = 0;
            for (n = 0; n < s; n++) r = e[t + n], i = i + r & 65535, o = o + (s - n) * r & 65535, 
            this.z[n] = r;
            this.a = 65535 & i, this.b = 65535 & o, this.i = 0;
          }, e.prototype.next = function(e) {
            var t = this.z[this.i];
            this.z[this.i] = e, this.i = this.i + 1 & s - 1, this.a = this.a - t + e & 65535, 
            this.b = this.b - s * t + this.a & 65535;
          }, e.prototype.value = function() {
            return (65535 & this.a | (65535 & this.b) << 16) >>> 0;
          };
          var a = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz~".split("").map(function(e) {
            return e.charCodeAt(0);
          }), c = [ -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, -1, -1, -1, -1, -1, -1, -1, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, -1, -1, -1, -1, 36, -1, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, -1, -1, -1, 63, -1 ];
          return t.prototype.haveBytes = function() {
            return this.pos < this.a.length;
          }, t.prototype.getByte = function() {
            var e = this.a[this.pos];
            if (++this.pos > this.a.length) throw new RangeError("out of bounds");
            return e;
          }, t.prototype.getChar = function() {
            return String.fromCharCode(this.getByte());
          }, t.prototype.getInt = function() {
            for (var e, t = 0; this.haveBytes() && (e = c[127 & this.getByte()]) >= 0; ) t = (t << 6) + e;
            return this.pos--, t >>> 0;
          }, n.prototype.toArray = function() {
            return this.a;
          }, n.prototype.putByte = function(e) {
            this.a.push(255 & e);
          }, n.prototype.putChar = function(e) {
            this.putByte(e.charCodeAt(0));
          }, n.prototype.putInt = function(e) {
            var t, n, r = [];
            if (0 === e) return void this.putChar("0");
            for (t = 0; e > 0; t++, e >>>= 6) r.push(a[63 & e]);
            for (n = t - 1; n >= 0; n--) this.putByte(r[n]);
          }, n.prototype.putArray = function(e, t, n) {
            for (var r = t; r < n; r++) this.a.push(e[r]);
          }, o.create = function(t, o) {
            var a, c = new n(), u = o.length, h = t.length, f = -1;
            if (c.putInt(u), c.putChar("\n"), h <= s) return c.putInt(u), c.putChar(":"), c.putArray(o, 0, u), 
            c.putInt(i(o)), c.putChar(";"), c.toArray();
            var l = Math.ceil(h / s), p = new Array(l), d = new Array(l);
            for (a = 0; a < p.length; a++) p[a] = -1;
            for (a = 0; a < d.length; a++) d[a] = -1;
            var v, y = new e();
            for (a = 0; a < h - s; a += s) y.init(t, a), v = y.value() % l, p[a / s] = d[v], 
            d[v] = a / s;
            for (var g, _, b, w, m, C = 0; C + s < u; ) for (w = 0, m = 0, y.init(o, C), a = 0, 
            b = 0; ;) {
              var O = 250;
              for (v = y.value() % l, _ = d[v]; _ >= 0 && O-- > 0; ) {
                var S, A, k, I, E, P, x, M;
                for (g = _ * s, I = 0, P = g, x = C + a; P < h && x < u && t[P] === o[x]; I++, P++, 
                x++) ;
                for (I--, E = 1; E < g && E <= a && t[g - E] === o[C + a - E]; E++) ;
                E--, A = g - E, S = I + E + 1, k = a - E, M = r(a - E) + r(S) + r(A) + 3, S >= M && S > b && (b = S, 
                w = g - E, m = k), _ = p[_];
              }
              if (b > 0) {
                m > 0 && (c.putInt(m), c.putChar(":"), c.putArray(o, C, C + m), C += m), C += b, 
                c.putInt(b), c.putChar("@"), c.putInt(w), c.putChar(","), w + b - 1 > f && (f = w + b - 1), 
                b = 0;
                break;
              }
              if (C + a + s >= u) {
                c.putInt(u - C), c.putChar(":"), c.putArray(o, C, C + u - C), C = u;
                break;
              }
              y.next(o[C + a + s]), a++;
            }
            return C < u && (c.putInt(u - C), c.putChar(":"), c.putArray(o, C, C + u - C)), 
            c.putInt(i(o)), c.putChar(";"), c.toArray();
          }, o.outputSize = function(e) {
            var n = new t(e), r = n.getInt();
            if ("\n" !== n.getChar()) throw new Error("size integer not terminated by '\\n'");
            return r;
          }, o.apply = function(e, r, o) {
            var s, a = 0, c = new t(r), u = e.length, h = r.length;
            if (s = c.getInt(), "\n" !== c.getChar()) throw new Error("size integer not terminated by '\\n'");
            for (var f = new n(); c.haveBytes(); ) {
              var l, p;
              switch (l = c.getInt(), c.getChar()) {
               case "@":
                if (p = c.getInt(), c.haveBytes() && "," !== c.getChar()) throw new Error("copy command not terminated by ','");
                if ((a += l) > s) throw new Error("copy exceeds output file size");
                if (p + l > u) throw new Error("copy extends past end of input");
                f.putArray(e, p, p + l);
                break;

               case ":":
                if ((a += l) > s) throw new Error("insert command gives an output larger than predicted");
                if (l > h) throw new Error("insert count exceeds size of delta");
                f.putArray(c.a, c.pos, c.pos + l), c.pos += l;
                break;

               case ";":
                var d = f.toArray();
                if ((!o || !1 !== o.verifyChecksum) && l !== i(d)) throw new Error("bad checksum");
                if (a !== s) throw new Error("generated size does not match predicted size");
                return d;

               default:
                throw new Error("unknown delta operator");
              }
            }
            throw new Error("unterminated delta");
          }, o;
        });
      }, function(e, t, n) {
        Object.defineProperty(t, "__esModule", {
          value: !0
        });
        var r = n(9), i = function() {
          function e() {}
          return e.prototype.setState = function(e) {
            this.state.decode(e);
          }, e.prototype.getState = function() {
            return this.state;
          }, e.prototype.patch = function(e) {
            this.state.decode(e);
          }, e.prototype.teardown = function() {}, e.prototype.handshake = function(e) {
            this.state ? new r.Reflection().decode(e) : this.state = r.Reflection.decode(e);
          }, e;
        }();
        t.SchemaSerializer = i;
      }, function(e, t, n) {
        function r(e) {
          for (var t = 0, n = 0, r = 0, i = e.length; r < i; r++) t = e.charCodeAt(r), t < 128 ? n += 1 : t < 2048 ? n += 2 : t < 55296 || t >= 57344 ? n += 3 : (r++, 
          n += 4);
          return n;
        }
        function i(e, t, n) {
          for (var r = 0, i = 0, o = n.length; i < o; i++) r = n.charCodeAt(i), r < 128 ? e[t++] = r : r < 2048 ? (e[t++] = 192 | r >> 6, 
          e[t++] = 128 | 63 & r) : r < 55296 || r >= 57344 ? (e[t++] = 224 | r >> 12, e[t++] = 128 | r >> 6 & 63, 
          e[t++] = 128 | 63 & r) : (i++, r = 65536 + ((1023 & r) << 10 | 1023 & n.charCodeAt(i)), 
          e[t++] = 240 | r >> 18, e[t++] = 128 | r >> 12 & 63, e[t++] = 128 | r >> 6 & 63, 
          e[t++] = 128 | 63 & r);
        }
        function o(e, t) {
          e.push(255 & t);
        }
        function s(e, t) {
          e.push(255 & t);
        }
        function a(e, t) {
          e.push(255 & t), e.push(t >> 8 & 255);
        }
        function c(e, t) {
          e.push(255 & t), e.push(t >> 8 & 255);
        }
        function u(e, t) {
          e.push(255 & t), e.push(t >> 8 & 255), e.push(t >> 16 & 255), e.push(t >> 24 & 255);
        }
        function h(e, t) {
          var n = t >> 24, r = t >> 16, i = t >> 8, o = t;
          e.push(255 & o), e.push(255 & i), e.push(255 & r), e.push(255 & n);
        }
        function f(e, t) {
          var n = Math.floor(t / Math.pow(2, 32));
          h(e, t >>> 0), h(e, n);
        }
        function l(e, t) {
          var n = t / Math.pow(2, 32) >> 0;
          h(e, t >>> 0), h(e, n);
        }
        function p(e, t) {
          v(e, t);
        }
        function d(e, t) {
          y(e, t);
        }
        function v(e, t) {
          C[0] = t, u(e, m[0]);
        }
        function y(e, t) {
          O[0] = t, u(e, m[w ? 0 : 1]), u(e, m[w ? 1 : 0]);
        }
        function g(e, t) {
          return s(e, t ? 1 : 0);
        }
        function _(e, t) {
          t || (t = "");
          var n = r(t), o = 0;
          if (n < 32) e.push(160 | n), o = 1; else if (n < 256) e.push(217), s(e, n), o = 2; else if (n < 65536) e.push(218), 
          c(e, n), o = 3; else {
            if (!(n < 4294967296)) throw new Error("String too long");
            e.push(219), h(e, n), o = 5;
          }
          return i(e, e.length, t), o + n;
        }
        function b(e, t) {
          return isNaN(t) ? b(e, 0) : isFinite(t) ? t !== (0 | t) ? (e.push(203), y(e, t), 
          9) : t >= 0 ? t < 128 ? (s(e, t), 1) : t < 256 ? (e.push(204), s(e, t), 2) : t < 65536 ? (e.push(205), 
          c(e, t), 3) : t < 4294967296 ? (e.push(206), h(e, t), 5) : (e.push(207), l(e, t), 
          9) : t >= -32 ? (e.push(t), 1) : t >= -128 ? (e.push(208), o(e, t), 2) : t >= -32768 ? (e.push(209), 
          a(e, t), 3) : t >= -2147483648 ? (e.push(210), u(e, t), 5) : (e.push(211), f(e, t), 
          9) : b(e, t > 0 ? Number.MAX_SAFE_INTEGER : -Number.MAX_SAFE_INTEGER);
        }
        Object.defineProperty(t, "__esModule", {
          value: !0
        }), t.utf8Write = i, t.int8 = o, t.uint8 = s, t.int16 = a, t.uint16 = c, t.int32 = u, 
        t.uint32 = h, t.int64 = f, t.uint64 = l, t.float32 = p, t.float64 = d;
        var w = !0, m = new Int32Array(2), C = new Float32Array(m.buffer), O = new Float64Array(m.buffer);
        t.writeFloat32 = v, t.writeFloat64 = y, t["boolean"] = g, t.string = _, t.number = b;
      }, function(e, t, n) {
        function r(e, t, n) {
          for (var r = "", i = 0, o = t, s = t + n; o < s; o++) {
            var a = e[o];
            if (0 != (128 & a)) if (192 != (224 & a)) if (224 != (240 & a)) {
              if (240 != (248 & a)) throw new Error("Invalid byte " + a.toString(16));
              i = (7 & a) << 18 | (63 & e[++o]) << 12 | (63 & e[++o]) << 6 | (63 & e[++o]) << 0, 
              i >= 65536 ? (i -= 65536, r += String.fromCharCode(55296 + (i >>> 10), 56320 + (1023 & i))) : r += String.fromCharCode(i);
            } else r += String.fromCharCode((15 & a) << 12 | (63 & e[++o]) << 6 | (63 & e[++o]) << 0); else r += String.fromCharCode((31 & a) << 6 | 63 & e[++o]); else r += String.fromCharCode(a);
          }
          return r;
        }
        function i(e, t) {
          return o(e, t) << 24 >> 24;
        }
        function o(e, t) {
          return e[t.offset++];
        }
        function s(e, t) {
          return a(e, t) << 16 >> 16;
        }
        function a(e, t) {
          return e[t.offset++] | e[t.offset++] << 8;
        }
        function c(e, t) {
          return e[t.offset++] | e[t.offset++] << 8 | e[t.offset++] << 16 | e[t.offset++] << 24;
        }
        function u(e, t) {
          return c(e, t) >>> 0;
        }
        function h(e, t) {
          return d(e, t);
        }
        function f(e, t) {
          return v(e, t);
        }
        function l(e, t) {
          var n = u(e, t);
          return c(e, t) * Math.pow(2, 32) + n;
        }
        function p(e, t) {
          var n = u(e, t);
          return u(e, t) * Math.pow(2, 32) + n;
        }
        function d(e, t) {
          return k[0] = c(e, t), I[0];
        }
        function v(e, t) {
          return k[A ? 0 : 1] = c(e, t), k[A ? 1 : 0] = c(e, t), E[0];
        }
        function y(e, t) {
          return o(e, t) > 0;
        }
        function g(e, t) {
          var n, i = e[t.offset++];
          i < 192 ? n = 31 & i : 217 === i ? n = o(e, t) : 218 === i ? n = a(e, t) : 219 === i && (n = u(e, t));
          var s = r(e, t.offset, n);
          return t.offset += n, s;
        }
        function _(e, t) {
          var n = e[t.offset];
          return n < 192 && n > 160 || 217 === n || 218 === n || 219 === n;
        }
        function b(e, t) {
          var n = e[t.offset++];
          return n < 128 ? n : 202 === n ? d(e, t) : 203 === n ? v(e, t) : 204 === n ? o(e, t) : 205 === n ? a(e, t) : 206 === n ? u(e, t) : 207 === n ? p(e, t) : 208 === n ? i(e, t) : 209 === n ? s(e, t) : 210 === n ? c(e, t) : 211 === n ? l(e, t) : n > 223 ? -1 * (255 - n + 1) : void 0;
        }
        function w(e, t) {
          var n = e[t.offset];
          return n < 128 || n >= 202 && n <= 211;
        }
        function m(e, t) {
          return e[t.offset] < 160;
        }
        function C(e, t) {
          return e[t.offset] === S.NIL;
        }
        function O(e, t) {
          return e[t.offset] === S.INDEX_CHANGE;
        }
        Object.defineProperty(t, "__esModule", {
          value: !0
        });
        var S = n(10);
        t.int8 = i, t.uint8 = o, t.int16 = s, t.uint16 = a, t.int32 = c, t.uint32 = u, t.float32 = h, 
        t.float64 = f, t.int64 = l, t.uint64 = p;
        var A = !0, k = new Int32Array(2), I = new Float32Array(k.buffer), E = new Float64Array(k.buffer);
        t.readFloat32 = d, t.readFloat64 = v, t["boolean"] = y, t.string = g, t.stringCheck = _, 
        t.number = b, t.numberCheck = w, t.arrayCheck = m, t.nilCheck = C, t.indexChangeCheck = O;
      }, function(e, t, n) {
        var r = this && this.__extends || function() {
          var _e5 = function e(t, n) {
            return (_e5 = Object.setPrototypeOf || {
              __proto__: []
            } instanceof Array && function(e, t) {
              e.__proto__ = t;
            } || function(e, t) {
              for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
            })(t, n);
          };
          return function(t, n) {
            function r() {
              this.constructor = t;
            }
            _e5(t, n), t.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, 
            new r());
          };
        }(), i = this && this.__decorate || function(e, t, n, r) {
          var i, o = arguments.length, s = o < 3 ? t : null === r ? r = Object.getOwnPropertyDescriptor(t, n) : r;
          if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, n, r); else for (var a = e.length - 1; a >= 0; a--) (i = e[a]) && (s = (o < 3 ? i(s) : o > 3 ? i(t, n, s) : i(t, n)) || s);
          return o > 3 && s && Object.defineProperty(t, n, s), s;
        };
        Object.defineProperty(t, "__esModule", {
          value: !0
        });
        var o = n(12), s = n(0), a = n(1), c = n(2), u = new o.Context(), h = function(e) {
          function t() {
            return null !== e && e.apply(this, arguments) || this;
          }
          return r(t, e), i([ o.type("string", u) ], t.prototype, "name", void 0), i([ o.type("string", u) ], t.prototype, "type", void 0), 
          i([ o.type("uint8", u) ], t.prototype, "referencedType", void 0), t;
        }(s.Schema);
        t.ReflectionField = h;
        var f = function(e) {
          function t() {
            var t = null !== e && e.apply(this, arguments) || this;
            return t.fields = new a.ArraySchema(), t;
          }
          return r(t, e), i([ o.type("uint8", u) ], t.prototype, "id", void 0), i([ o.type([ h ], u) ], t.prototype, "fields", void 0), 
          t;
        }(s.Schema);
        t.ReflectionType = f;
        var l = function(e) {
          function t() {
            var t = null !== e && e.apply(this, arguments) || this;
            return t.types = new a.ArraySchema(), t;
          }
          return r(t, e), t.encode = function(e) {
            var n = e.constructor, r = new t();
            r.rootType = n._typeid;
            var i = n._context.types;
            for (var o in i) {
              var s = new f();
              s.id = Number(o), function(e, t) {
                for (var n in t) {
                  var i = new h();
                  i.name = n;
                  var o = void 0;
                  if ("string" == typeof t[n]) o = t[n]; else {
                    var s = "function" == typeof t[n], a = Array.isArray(t[n]), c = !a && t[n].map, u = void 0;
                    s ? (o = "ref", u = t[n]) : a ? (o = "array", "string" == typeof t[n][0] ? o += ":" + t[n][0] : u = t[n][0]) : c && (o = "map", 
                    "string" == typeof t[n].map ? o += ":" + t[n].map : u = t[n].map), i.referencedType = u ? u._typeid : 255;
                  }
                  i.type = o, e.fields.push(i);
                }
                r.types.push(e);
              }(s, i[o]._schema);
            }
            return r.encodeAll();
          }, t.decode = function(e) {
            var n = new o.Context(), i = new t();
            i.decode(e);
            var u = i.types.reduce(function(e, t) {
              return e[t.id] = function(e) {
                function t() {
                  return null !== e && e.apply(this, arguments) || this;
                }
                return r(t, e), t;
              }(s.Schema), e;
            }, {});
            i.types.forEach(function(e, t) {
              e.fields.forEach(function(t) {
                var r = u[e.id];
                if (void 0 !== t.referencedType) {
                  var i = u[t.referencedType];
                  i || (i = t.type.split(":")[1]), 0 === t.type.indexOf("array") ? o.type([ i ], n)(r.prototype, t.name) : 0 === t.type.indexOf("map") ? o.type({
                    map: i
                  }, n)(r.prototype, t.name) : "ref" === t.type && o.type(i, n)(r.prototype, t.name);
                } else o.type(t.type, n)(r.prototype, t.name);
              });
            });
            var h = u[i.rootType], f = new h();
            for (var l in h._schema) {
              var p = h._schema[l];
              if ("string" != typeof p) {
                var d = "function" == typeof p, v = Array.isArray(p), y = !v && p.map;
                f[l] = v ? new a.ArraySchema() : y ? new c.MapSchema() : d ? new p() : void 0;
              }
            }
            return f;
          }, i([ o.type([ f ], u) ], t.prototype, "types", void 0), i([ o.type("uint8", u) ], t.prototype, "rootType", void 0), 
          t;
        }(s.Schema);
        t.Reflection = l;
      } ]);
    });
    cc._RF.pop();
  }, {} ],
  i18nManager: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "3d5afdFOMxCJKAsNoHIJeOV", "i18nManager");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.i18nManager = void 0;
    var _i18n = require("LanguageData");
    var i18nManager;
    (function(i18nManager) {
      function updateSceneRenderers() {
        _i18n.updateSceneRenderers();
      }
      i18nManager.updateSceneRenderers = updateSceneRenderers;
      function init(str) {
        _i18n.init(str);
      }
      i18nManager.init = init;
      function t(str) {
        return _i18n.t(str);
      }
      i18nManager.t = t;
    })(i18nManager = exports.i18nManager || (exports.i18nManager = {}));
    cc._RF.pop();
  }, {
    LanguageData: "LanguageData"
  } ],
  "md5.min": [ function(require, module, exports) {
    (function(process, global) {
      "use strict";
      cc._RF.push(module, "99933XF1l5GPLn6c6GCHXWM", "md5.min");
      "use strict";
      !function() {
        function t(t) {
          if (t) d[0] = d[16] = d[1] = d[2] = d[3] = d[4] = d[5] = d[6] = d[7] = d[8] = d[9] = d[10] = d[11] = d[12] = d[13] = d[14] = d[15] = 0, 
          this.blocks = d, this.buffer8 = l; else if (a) {
            var r = new ArrayBuffer(68);
            this.buffer8 = new Uint8Array(r), this.blocks = new Uint32Array(r);
          } else this.blocks = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ];
          this.h0 = this.h1 = this.h2 = this.h3 = this.start = this.bytes = this.hBytes = 0, 
          this.finalized = this.hashed = !1, this.first = !0;
        }
        var r = "input is invalid type", e = "object" == typeof window, i = e ? window : {};
        i.JS_MD5_NO_WINDOW && (e = !1);
        var s = !e && "object" == typeof self, h = !i.JS_MD5_NO_NODE_JS && "object" == typeof process && process.versions && process.versions.node;
        h ? i = global : s && (i = self);
        var f = !i.JS_MD5_NO_COMMON_JS && "object" == typeof module && module.exports, o = "function" == typeof define && define.amd, a = !i.JS_MD5_NO_ARRAY_BUFFER && "undefined" != typeof ArrayBuffer, n = "0123456789abcdef".split(""), u = [ 128, 32768, 8388608, -2147483648 ], y = [ 0, 8, 16, 24 ], c = [ "hex", "array", "digest", "buffer", "arrayBuffer", "base64" ], p = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split(""), d = [], l;
        if (a) {
          var A = new ArrayBuffer(68);
          l = new Uint8Array(A), d = new Uint32Array(A);
        }
        !i.JS_MD5_NO_NODE_JS && Array.isArray || (Array.isArray = function(t) {
          return "[object Array]" === Object.prototype.toString.call(t);
        }), !a || !i.JS_MD5_NO_ARRAY_BUFFER_IS_VIEW && ArrayBuffer.isView || (ArrayBuffer.isView = function(t) {
          return "object" == typeof t && t.buffer && t.buffer.constructor === ArrayBuffer;
        });
        var b = function b(r) {
          return function(e) {
            return new t(!0).update(e)[r]();
          };
        }, v = function v() {
          var r = b("hex");
          h && (r = w(r)), r.create = function() {
            return new t();
          }, r.update = function(t) {
            return r.create().update(t);
          };
          for (var e = 0; e < c.length; ++e) {
            var i = c[e];
            r[i] = b(i);
          }
          return r;
        }, w = function w(t) {
          var e = eval("require('crypto')"), i = eval("require('buffer').Buffer"), s = function s(_s) {
            if ("string" == typeof _s) return e.createHash("md5").update(_s, "utf8").digest("hex");
            if (null === _s || void 0 === _s) throw r;
            return _s.constructor === ArrayBuffer && (_s = new Uint8Array(_s)), Array.isArray(_s) || ArrayBuffer.isView(_s) || _s.constructor === i ? e.createHash("md5").update(new i(_s)).digest("hex") : t(_s);
          };
          return s;
        };
        t.prototype.update = function(t) {
          if (!this.finalized) {
            var e, i = typeof t;
            if ("string" !== i) {
              if ("object" !== i) throw r;
              if (null === t) throw r;
              if (a && t.constructor === ArrayBuffer) t = new Uint8Array(t); else if (!(Array.isArray(t) || a && ArrayBuffer.isView(t))) throw r;
              e = !0;
            }
            for (var s, h, f = 0, o = t.length, n = this.blocks, u = this.buffer8; f < o; ) {
              if (this.hashed && (this.hashed = !1, n[0] = n[16], n[16] = n[1] = n[2] = n[3] = n[4] = n[5] = n[6] = n[7] = n[8] = n[9] = n[10] = n[11] = n[12] = n[13] = n[14] = n[15] = 0), 
              e) if (a) for (h = this.start; f < o && h < 64; ++f) u[h++] = t[f]; else for (h = this.start; f < o && h < 64; ++f) n[h >> 2] |= t[f] << y[3 & h++]; else if (a) for (h = this.start; f < o && h < 64; ++f) (s = t.charCodeAt(f)) < 128 ? u[h++] = s : s < 2048 ? (u[h++] = 192 | s >> 6, 
              u[h++] = 128 | 63 & s) : s < 55296 || s >= 57344 ? (u[h++] = 224 | s >> 12, u[h++] = 128 | s >> 6 & 63, 
              u[h++] = 128 | 63 & s) : (s = 65536 + ((1023 & s) << 10 | 1023 & t.charCodeAt(++f)), 
              u[h++] = 240 | s >> 18, u[h++] = 128 | s >> 12 & 63, u[h++] = 128 | s >> 6 & 63, 
              u[h++] = 128 | 63 & s); else for (h = this.start; f < o && h < 64; ++f) (s = t.charCodeAt(f)) < 128 ? n[h >> 2] |= s << y[3 & h++] : s < 2048 ? (n[h >> 2] |= (192 | s >> 6) << y[3 & h++], 
              n[h >> 2] |= (128 | 63 & s) << y[3 & h++]) : s < 55296 || s >= 57344 ? (n[h >> 2] |= (224 | s >> 12) << y[3 & h++], 
              n[h >> 2] |= (128 | s >> 6 & 63) << y[3 & h++], n[h >> 2] |= (128 | 63 & s) << y[3 & h++]) : (s = 65536 + ((1023 & s) << 10 | 1023 & t.charCodeAt(++f)), 
              n[h >> 2] |= (240 | s >> 18) << y[3 & h++], n[h >> 2] |= (128 | s >> 12 & 63) << y[3 & h++], 
              n[h >> 2] |= (128 | s >> 6 & 63) << y[3 & h++], n[h >> 2] |= (128 | 63 & s) << y[3 & h++]);
              this.lastByteIndex = h, this.bytes += h - this.start, h >= 64 ? (this.start = h - 64, 
              this.hash(), this.hashed = !0) : this.start = h;
            }
            return this.bytes > 4294967295 && (this.hBytes += this.bytes / 4294967296 << 0, 
            this.bytes = this.bytes % 4294967296), this;
          }
        }, t.prototype.finalize = function() {
          if (!this.finalized) {
            this.finalized = !0;
            var t = this.blocks, r = this.lastByteIndex;
            t[r >> 2] |= u[3 & r], r >= 56 && (this.hashed || this.hash(), t[0] = t[16], t[16] = t[1] = t[2] = t[3] = t[4] = t[5] = t[6] = t[7] = t[8] = t[9] = t[10] = t[11] = t[12] = t[13] = t[14] = t[15] = 0), 
            t[14] = this.bytes << 3, t[15] = this.hBytes << 3 | this.bytes >>> 29, this.hash();
          }
        }, t.prototype.hash = function() {
          var t, r, e, i, s, h, f = this.blocks;
          this.first ? r = ((r = ((t = ((t = f[0] - 680876937) << 7 | t >>> 25) - 271733879 << 0) ^ (e = ((e = (-271733879 ^ (i = ((i = (-1732584194 ^ 2004318071 & t) + f[1] - 117830708) << 12 | i >>> 20) + t << 0) & (-271733879 ^ t)) + f[2] - 1126478375) << 17 | e >>> 15) + i << 0) & (i ^ t)) + f[3] - 1316259209) << 22 | r >>> 10) + e << 0 : (t = this.h0, 
          r = this.h1, e = this.h2, r = ((r += ((t = ((t += ((i = this.h3) ^ r & (e ^ i)) + f[0] - 680876936) << 7 | t >>> 25) + r << 0) ^ (e = ((e += (r ^ (i = ((i += (e ^ t & (r ^ e)) + f[1] - 389564586) << 12 | i >>> 20) + t << 0) & (t ^ r)) + f[2] + 606105819) << 17 | e >>> 15) + i << 0) & (i ^ t)) + f[3] - 1044525330) << 22 | r >>> 10) + e << 0), 
          r = ((r += ((t = ((t += (i ^ r & (e ^ i)) + f[4] - 176418897) << 7 | t >>> 25) + r << 0) ^ (e = ((e += (r ^ (i = ((i += (e ^ t & (r ^ e)) + f[5] + 1200080426) << 12 | i >>> 20) + t << 0) & (t ^ r)) + f[6] - 1473231341) << 17 | e >>> 15) + i << 0) & (i ^ t)) + f[7] - 45705983) << 22 | r >>> 10) + e << 0, 
          r = ((r += ((t = ((t += (i ^ r & (e ^ i)) + f[8] + 1770035416) << 7 | t >>> 25) + r << 0) ^ (e = ((e += (r ^ (i = ((i += (e ^ t & (r ^ e)) + f[9] - 1958414417) << 12 | i >>> 20) + t << 0) & (t ^ r)) + f[10] - 42063) << 17 | e >>> 15) + i << 0) & (i ^ t)) + f[11] - 1990404162) << 22 | r >>> 10) + e << 0, 
          r = ((r += ((t = ((t += (i ^ r & (e ^ i)) + f[12] + 1804603682) << 7 | t >>> 25) + r << 0) ^ (e = ((e += (r ^ (i = ((i += (e ^ t & (r ^ e)) + f[13] - 40341101) << 12 | i >>> 20) + t << 0) & (t ^ r)) + f[14] - 1502002290) << 17 | e >>> 15) + i << 0) & (i ^ t)) + f[15] + 1236535329) << 22 | r >>> 10) + e << 0, 
          r = ((r += ((i = ((i += (r ^ e & ((t = ((t += (e ^ i & (r ^ e)) + f[1] - 165796510) << 5 | t >>> 27) + r << 0) ^ r)) + f[6] - 1069501632) << 9 | i >>> 23) + t << 0) ^ t & ((e = ((e += (t ^ r & (i ^ t)) + f[11] + 643717713) << 14 | e >>> 18) + i << 0) ^ i)) + f[0] - 373897302) << 20 | r >>> 12) + e << 0, 
          r = ((r += ((i = ((i += (r ^ e & ((t = ((t += (e ^ i & (r ^ e)) + f[5] - 701558691) << 5 | t >>> 27) + r << 0) ^ r)) + f[10] + 38016083) << 9 | i >>> 23) + t << 0) ^ t & ((e = ((e += (t ^ r & (i ^ t)) + f[15] - 660478335) << 14 | e >>> 18) + i << 0) ^ i)) + f[4] - 405537848) << 20 | r >>> 12) + e << 0, 
          r = ((r += ((i = ((i += (r ^ e & ((t = ((t += (e ^ i & (r ^ e)) + f[9] + 568446438) << 5 | t >>> 27) + r << 0) ^ r)) + f[14] - 1019803690) << 9 | i >>> 23) + t << 0) ^ t & ((e = ((e += (t ^ r & (i ^ t)) + f[3] - 187363961) << 14 | e >>> 18) + i << 0) ^ i)) + f[8] + 1163531501) << 20 | r >>> 12) + e << 0, 
          r = ((r += ((i = ((i += (r ^ e & ((t = ((t += (e ^ i & (r ^ e)) + f[13] - 1444681467) << 5 | t >>> 27) + r << 0) ^ r)) + f[2] - 51403784) << 9 | i >>> 23) + t << 0) ^ t & ((e = ((e += (t ^ r & (i ^ t)) + f[7] + 1735328473) << 14 | e >>> 18) + i << 0) ^ i)) + f[12] - 1926607734) << 20 | r >>> 12) + e << 0, 
          r = ((r += ((h = (i = ((i += ((s = r ^ e) ^ (t = ((t += (s ^ i) + f[5] - 378558) << 4 | t >>> 28) + r << 0)) + f[8] - 2022574463) << 11 | i >>> 21) + t << 0) ^ t) ^ (e = ((e += (h ^ r) + f[11] + 1839030562) << 16 | e >>> 16) + i << 0)) + f[14] - 35309556) << 23 | r >>> 9) + e << 0, 
          r = ((r += ((h = (i = ((i += ((s = r ^ e) ^ (t = ((t += (s ^ i) + f[1] - 1530992060) << 4 | t >>> 28) + r << 0)) + f[4] + 1272893353) << 11 | i >>> 21) + t << 0) ^ t) ^ (e = ((e += (h ^ r) + f[7] - 155497632) << 16 | e >>> 16) + i << 0)) + f[10] - 1094730640) << 23 | r >>> 9) + e << 0, 
          r = ((r += ((h = (i = ((i += ((s = r ^ e) ^ (t = ((t += (s ^ i) + f[13] + 681279174) << 4 | t >>> 28) + r << 0)) + f[0] - 358537222) << 11 | i >>> 21) + t << 0) ^ t) ^ (e = ((e += (h ^ r) + f[3] - 722521979) << 16 | e >>> 16) + i << 0)) + f[6] + 76029189) << 23 | r >>> 9) + e << 0, 
          r = ((r += ((h = (i = ((i += ((s = r ^ e) ^ (t = ((t += (s ^ i) + f[9] - 640364487) << 4 | t >>> 28) + r << 0)) + f[12] - 421815835) << 11 | i >>> 21) + t << 0) ^ t) ^ (e = ((e += (h ^ r) + f[15] + 530742520) << 16 | e >>> 16) + i << 0)) + f[2] - 995338651) << 23 | r >>> 9) + e << 0, 
          r = ((r += ((i = ((i += (r ^ ((t = ((t += (e ^ (r | ~i)) + f[0] - 198630844) << 6 | t >>> 26) + r << 0) | ~e)) + f[7] + 1126891415) << 10 | i >>> 22) + t << 0) ^ ((e = ((e += (t ^ (i | ~r)) + f[14] - 1416354905) << 15 | e >>> 17) + i << 0) | ~t)) + f[5] - 57434055) << 21 | r >>> 11) + e << 0, 
          r = ((r += ((i = ((i += (r ^ ((t = ((t += (e ^ (r | ~i)) + f[12] + 1700485571) << 6 | t >>> 26) + r << 0) | ~e)) + f[3] - 1894986606) << 10 | i >>> 22) + t << 0) ^ ((e = ((e += (t ^ (i | ~r)) + f[10] - 1051523) << 15 | e >>> 17) + i << 0) | ~t)) + f[1] - 2054922799) << 21 | r >>> 11) + e << 0, 
          r = ((r += ((i = ((i += (r ^ ((t = ((t += (e ^ (r | ~i)) + f[8] + 1873313359) << 6 | t >>> 26) + r << 0) | ~e)) + f[15] - 30611744) << 10 | i >>> 22) + t << 0) ^ ((e = ((e += (t ^ (i | ~r)) + f[6] - 1560198380) << 15 | e >>> 17) + i << 0) | ~t)) + f[13] + 1309151649) << 21 | r >>> 11) + e << 0, 
          r = ((r += ((i = ((i += (r ^ ((t = ((t += (e ^ (r | ~i)) + f[4] - 145523070) << 6 | t >>> 26) + r << 0) | ~e)) + f[11] - 1120210379) << 10 | i >>> 22) + t << 0) ^ ((e = ((e += (t ^ (i | ~r)) + f[2] + 718787259) << 15 | e >>> 17) + i << 0) | ~t)) + f[9] - 343485551) << 21 | r >>> 11) + e << 0, 
          this.first ? (this.h0 = t + 1732584193 << 0, this.h1 = r - 271733879 << 0, this.h2 = e - 1732584194 << 0, 
          this.h3 = i + 271733878 << 0, this.first = !1) : (this.h0 = this.h0 + t << 0, this.h1 = this.h1 + r << 0, 
          this.h2 = this.h2 + e << 0, this.h3 = this.h3 + i << 0);
        }, t.prototype.hex = function() {
          this.finalize();
          var t = this.h0, r = this.h1, e = this.h2, i = this.h3;
          return n[t >> 4 & 15] + n[15 & t] + n[t >> 12 & 15] + n[t >> 8 & 15] + n[t >> 20 & 15] + n[t >> 16 & 15] + n[t >> 28 & 15] + n[t >> 24 & 15] + n[r >> 4 & 15] + n[15 & r] + n[r >> 12 & 15] + n[r >> 8 & 15] + n[r >> 20 & 15] + n[r >> 16 & 15] + n[r >> 28 & 15] + n[r >> 24 & 15] + n[e >> 4 & 15] + n[15 & e] + n[e >> 12 & 15] + n[e >> 8 & 15] + n[e >> 20 & 15] + n[e >> 16 & 15] + n[e >> 28 & 15] + n[e >> 24 & 15] + n[i >> 4 & 15] + n[15 & i] + n[i >> 12 & 15] + n[i >> 8 & 15] + n[i >> 20 & 15] + n[i >> 16 & 15] + n[i >> 28 & 15] + n[i >> 24 & 15];
        }, t.prototype.toString = t.prototype.hex, t.prototype.digest = function() {
          this.finalize();
          var t = this.h0, r = this.h1, e = this.h2, i = this.h3;
          return [ 255 & t, t >> 8 & 255, t >> 16 & 255, t >> 24 & 255, 255 & r, r >> 8 & 255, r >> 16 & 255, r >> 24 & 255, 255 & e, e >> 8 & 255, e >> 16 & 255, e >> 24 & 255, 255 & i, i >> 8 & 255, i >> 16 & 255, i >> 24 & 255 ];
        }, t.prototype.array = t.prototype.digest, t.prototype.arrayBuffer = function() {
          this.finalize();
          var t = new ArrayBuffer(16), r = new Uint32Array(t);
          return r[0] = this.h0, r[1] = this.h1, r[2] = this.h2, r[3] = this.h3, t;
        }, t.prototype.buffer = t.prototype.arrayBuffer, t.prototype.base64 = function() {
          for (var t, r, e, i = "", s = this.array(), h = 0; h < 15; ) t = s[h++], r = s[h++], 
          e = s[h++], i += p[t >>> 2] + p[63 & (t << 4 | r >>> 4)] + p[63 & (r << 2 | e >>> 6)] + p[63 & e];
          return t = s[h], i + (p[t >>> 2] + p[t << 4 & 63] + "==");
        };
        var _ = v();
        f ? module.exports = _ : (i.md5 = _, o && define(function() {
          return _;
        }));
      }();
      cc._RF.pop();
    }).call(this, require("_process"), "undefined" !== typeof global ? global : "undefined" !== typeof self ? self : "undefined" !== typeof window ? window : {});
  }, {
    _process: 1
  } ],
  "polyglot.min": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "e26fd9yy65A4q3/JkpVnFYg", "polyglot.min");
    "use strict";
    (function(e, t) {
      "function" == typeof define && define.amd ? define([], function() {
        return t(e);
      }) : "object" == typeof exports ? module.exports = t(e) : e.Polyglot = t(e);
    })(void 0, function(e) {
      function t(e) {
        e = e || {}, this.phrases = {}, this.extend(e.phrases || {}), this.currentLocale = e.locale || "en", 
        this.allowMissing = !!e.allowMissing, this.warn = e.warn || c;
      }
      function s(e) {
        var t, n, r, i = {};
        for (t in e) if (e.hasOwnProperty(t)) {
          n = e[t];
          for (r in n) i[n[r]] = t;
        }
        return i;
      }
      function o(e) {
        var t = /^\s+|\s+$/g;
        return e.replace(t, "");
      }
      function u(e, t, r) {
        var i, s, u;
        return null != r && e ? (s = e.split(n), u = s[f(t, r)] || s[0], i = o(u)) : i = e, 
        i;
      }
      function a(e) {
        var t = s(i);
        return t[e] || t.en;
      }
      function f(e, t) {
        return r[a(e)](t);
      }
      function l(e, t) {
        for (var n in t) "_" !== n && t.hasOwnProperty(n) && (e = e.replace(new RegExp("%\\{" + n + "\\}", "g"), t[n]));
        return e;
      }
      function c(t) {
        e.console && e.console.warn && e.console.warn("WARNING: " + t);
      }
      function h(e) {
        var t = {};
        for (var n in e) t[n] = e[n];
        return t;
      }
      t.VERSION = "0.4.3", t.prototype.locale = function(e) {
        return e && (this.currentLocale = e), this.currentLocale;
      }, t.prototype.extend = function(e, t) {
        var n;
        for (var r in e) e.hasOwnProperty(r) && (n = e[r], t && (r = t + "." + r), "object" == typeof n ? this.extend(n, r) : this.phrases[r] = n);
      }, t.prototype.clear = function() {
        this.phrases = {};
      }, t.prototype.replace = function(e) {
        this.clear(), this.extend(e);
      }, t.prototype.t = function(e, t) {
        var n, r;
        return t = null == t ? {} : t, "number" == typeof t && (t = {
          smart_count: t
        }), "string" == typeof this.phrases[e] ? n = this.phrases[e] : "string" == typeof t._ ? n = t._ : this.allowMissing ? n = e : (this.warn('Missing translation for key: "' + e + '"'), 
        r = e), "string" == typeof n && (t = h(t), r = u(n, this.currentLocale, t.smart_count), 
        r = l(r, t)), r;
      }, t.prototype.has = function(e) {
        return e in this.phrases;
      };
      var n = "||||", r = {
        chinese: function chinese(e) {
          return 0;
        },
        german: function german(e) {
          return 1 !== e ? 1 : 0;
        },
        french: function french(e) {
          return e > 1 ? 1 : 0;
        },
        russian: function russian(e) {
          return e % 10 === 1 && e % 100 !== 11 ? 0 : e % 10 >= 2 && e % 10 <= 4 && (e % 100 < 10 || e % 100 >= 20) ? 1 : 2;
        },
        czech: function czech(e) {
          return 1 === e ? 0 : e >= 2 && e <= 4 ? 1 : 2;
        },
        polish: function polish(e) {
          return 1 === e ? 0 : e % 10 >= 2 && e % 10 <= 4 && (e % 100 < 10 || e % 100 >= 20) ? 1 : 2;
        },
        icelandic: function icelandic(e) {
          return e % 10 !== 1 || e % 100 === 11 ? 1 : 0;
        }
      }, i = {
        chinese: [ "fa", "id", "ja", "ko", "lo", "ms", "th", "tr", "zh" ],
        german: [ "da", "de", "en", "es", "fi", "el", "he", "hu", "it", "nl", "no", "pt", "sv" ],
        french: [ "fr", "tl", "pt-br" ],
        russian: [ "hr", "ru" ],
        czech: [ "cs" ],
        polish: [ "pl" ],
        icelandic: [ "is" ]
      };
      return t;
    });
    cc._RF.pop();
  }, {} ]
}, {}, [ "DeepRogueServer", "GameConfig", "GameMain", "GManager", "AudioMgr", "BaseFunc", "EventManager", "LogManager", "ResManager", "i18nManager", "clipboard.min", "md5.min", "AccountModel", "GateManager", "HttpManager", "NetManager", "WebSocketWrapper", "GuestPlugin", "H5PluginProxyWrapper", "IPluginProxy", "IPluginProxyWrapper", "PluginManager", "BaseScene", "PreLoad", "SceneManager", "Joystick", "JoystickCommon", "colyseus", "MainCamera", "DebugNetwork", "EmptyScene", "LobbyScene", "UpdateScene", "Player", "Spider", "LanguageData", "LocalizedLabel", "LocalizedSprite", "SpriteFrameSet", "polyglot.min" ]);