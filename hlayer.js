var hlayer = {
    mainBg:'#51B1D9',
    mainColor: '#fff',
    data:{},
    setData: function(key,value) {
        this.data[key] = value;
    },
    addStyle: function() {
        var scripts = document.getElementsByTagName('script');
        var hlayerSrc = '';
        for(var i = 0, max = scripts.length; i < max; i++) {
            if(scripts[i].getAttribute('src') !== null && scripts[i].getAttribute('src').toString().indexOf('hlayer.js') > -1){
                hlayerSrc = scripts[i].getAttribute('src');
            }
            console.log(scripts[i]);
        }
        console.log(hlayerSrc);
        var styleSrc = hlayerSrc.replace('hlayer.js', 'hlayer.css');
        var link = this.creEle('link');
        link.setAttribute('href', styleSrc);
        link.setAttribute('rel','stylesheet');
        console.log(styleSrc);
        document.getElementsByTagName('head')[0].appendChild(link);
        return link;
    },
    css: function(ele, cssJson) {
        for(var key in cssJson){
            ele.style[key] = cssJson[key];
        }
    },
    creEle: function(ele) {
        return document.createElement(ele);
    },
    rmEle: function(eleArr, parArr) {
        for(var i = 0, max = eleArr.length; i < max; i++) {
            parArr[i].removeChild(eleArr[i]);
        }
    },
    rmHlayer: function() {
        var hlayerEle = document.getElementsByClassName('hlayer');
        var body = document.getElementsByTagName('body');
        for(var i = 0, max = halyerEle.length; i < max; i++) {
            body.removeChild(halyerEle[i]);
        }
    },
    getStyle: function(ele, attr) {
        if(ele.currentStyle) {
            return ele.currentStyle[attr];
        }
        return getComputedStyle(ele, false)[attr];
    },
    posCenter: function(child, parent) {
        var childWid = parseInt(this.getStyle(child, 'width'));
        console.log(childWid);
        var childHei = parseInt(this.getStyle(child, 'height'));
        console.log(childHei);
        var parentWid = parseInt(this.getStyle(parent, 'width'));
        console.log(parentWid);
        var parentHei = parseInt(this.getStyle(parent, 'height'));
        console.log(parentHei);
        var setTop = (parentHei - childHei) / 2 + 'px';
        var setLeft = (parentWid - childWid) / 2 + 'px';
        this.css(child, {position:'fixed',top:setTop,left:setLeft});
    },
    addEvent: function(ele, event, fn){
        if(ele.attachEvent) {
            return ele.attachEvent('on' + event, fn);
        }
        return ele.addEventListener(event, fn, false);
    },
    timingCancer: function(eleArr, parArr, time) {
        var time = 1000;
        var that = this;
        setTimeout(function() {
            eleArr.forEach(function(ele) {
                ele.style.display = 'none';
            });
            that.rmEle(eleArr, parArr);
        }, time);
    },
    appendNodes: function(par, childArr) {
      for(var i = 0, max = childArr.length; i < max; i++) {
          par.appendChild(childArr[i]);
      }
    },
    creShadow: function() {
        var shadow = this.creEle('div');
        shadow.className = 'hlayer-shadow';
        this.css(shadow, {position: 'fixed',top:0,left:0,width: '100%',height:'100%',backgroundColor:'#000',opacity:'0.3',zIndex: 10000});
        document.getElementsByTagName('body')[0].appendChild(shadow);
        return shadow;
    },
    creMsg: function(msg) {
        var msgCon = this.creEle('div');
        msgCon.className = 'hlayer hlayer-msg';
        var msg = msg || '我是信息';
        msgCon.textContent = msg;
        this.css(msgCon, {minWidth:'60px',height: '30px',lineHeight:'30px',fontSize:'14px',padding: '5px',borderRadius:'3px',display:'inline-block',background:'#fff',zIndex:10010});
        document.getElementsByTagName('body')[0].appendChild(msgCon);
        return msgCon;
    },
    creBtn: function(options) {
        var options = options || {};
      var right = options.right || '10px';
      var bottom = options.bottom || '10px';
      var text = options.text || '确定';
      var btn = this.creEle('span');
      this.css(btn, {width:'44px',height:'30px',lineHeight:'30px', cursor:'pointer',textAlign:'center',backgroundColor:this.mainBg, color: this.mainColor, borderRadius:'3px', padding:'0 8px',position:'absolute',right:right,bottom: bottom});
      if(options.css) {
          this.css(btn, options.css);
      }
      btn.textContent = text;
      return btn;
    },
    creAlert: function(cfg) {
      var title = cfg.title || '信息';
      var content = cfg.text || '我是信息';
      var shadow = cfg.disNone[0];
      var style =  cfg.disNone[1];
      var confirmCallback = cfg.confirmCb;
      var cancelCallback = cfg.cancelCb;
      var alertCon = this.creEle('div');
      alertCon.className = 'hlayer';
        if(cfg.animateType && typeof cfg.animateType === "number") {
            alertCon.className += ' animate' + cfg.animateType;
        }
      var alertTitle = this.creEle('div');
      var alertContent = this.creEle('div');
      this.css(alertCon, {width:'260px',height:'148px',borderRadius: '5px',backgroundColor:'#fff',zIndex:10010});
      this.css(alertTitle, {height:'42px', padding: '0 10px', borderRadius:'5px 5px 0px 0px',lineHeight: '42px',fontSize: '16px',backgroundColor:this.mainBg,color:this.mainColor});
      alertTitle.textContent = title;
      this.css(alertContent, {height:'70px',padding: '18px 10px',fontSize: '14px',lineHeight: '20px'});
      alertContent.textContent = content;
      this.appendNodes(alertCon, [alertTitle, alertContent]);
      if(cfg.confirmBtn !== false) {
          var btn  = this.creBtn();
          alertCon.appendChild(btn);
          var that = this;
          var body = document.getElementsByTagName('body')[0];
          this.addEvent(btn,'click',function() {
              var body = document.getElementsByTagName('body')[0];
              that.rmEle([alertCon,shadow,style],[body,body,body]);
              confirmCallback && confirmCallback();
          })
      }
      if(cfg.cancelBtn === true) {
          var btn = this.creBtn({text:'取消',css:{left:'10px'}});
          alertCon.appendChild(btn);
          var that = this;
          var body = document.getElementsByTagName('body')[0];
          this.addEvent(btn,'click',function() {
              var body = document.getElementsByTagName('body')[0];
              that.rmEle([alertCon,shadow],[body,body]);
              cancelCallback && cancelCallback();
          })
      }
      document.getElementsByTagName('body')[0].appendChild(alertCon);
      return alertCon;
    },
    creLoad: function() {
        var loadCon = this.creEle('div');
        loadCon.className = 'load hlayer';
        for(var i = 0; i < 8; i++) {
            var div = this.creEle('div');
            loadCon.appendChild(div);
        }
        this.css(loadCon,{width:'100px',height:'100px',zIndex:10010});
        document.getElementsByTagName('body')[0].appendChild(loadCon);
        return loadCon;
    },
    /*cfg:{
        text: '内容'，
        css: {msg盒子的css样式组成的json},
        time: msg消失的时间，毫秒计，默认为1s,
      }
    */
    msg: function(cfg) {
        var cfg = cfg || {};
        var shadow = this.creShadow();
        var msgCon = this.creMsg(cfg.text);
        this.posCenter(msgCon, shadow);
        if(cfg.css) {
          this.css(msgCon, cfg.css);
        }
        var body = document.getElementsByTagName('body')[0];
        this.timingCancer([shadow, msgCon],[body, body], cfg.time);
    },
    /*
    cfg:{
        mainBg: 主要的背景颜色,
        mainColor: 主要的字体颜色,
        title: alert框的标题,
        text: alert框的内容,
        confirmBtn: 是否需要确认按钮，默认为true,
        confirmCb: 点击确认按钮时触发的事件函数,
        cancelBtn: 是否需要取消按钮，默认为false,
        cancelCb: 点击取消按钮时触发的事件函数,
        animateType:动画类型1,2，3中的一种
     }
    */
    alert: function(cfg) {
        var cfg = cfg || {};
        this.mainBg = cfg.mainBg || this.mainBg;
        this.mainColor = cfg.mainColor || this.mainColor;
        var shadow = this.creShadow();
        cfg.disNone = [shadow];
        var alertCon = this.creAlert(cfg);
        this.posCenter(alertCon, shadow);
    },
    /*
    cfg:{
        
    }
    */
    loading: function(cfg) {
        var cfg = cfg || {};
        var shadow = this.creShadow();
        cfg.disNone = [shadow];
        var loadCon = this.creLoad();
        this.posCenter(loadCon, shadow);
    }
};