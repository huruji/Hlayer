var hlayer = {
    mainBg:'#51B1D9',
    mainColor: '#fff',
    data:{},
    setData: function(key,value) {
        this.data[key] = value;
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
        this.css(child, {position:'absolute',top:setTop,left:setLeft});
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
      var content = cfg.title || '我是信息';
      var shadow = cfg.shadow;
      var confirmCallback = cfg.confirmCb;
      var cancelCallback = cfg.cancelCb;
      var alertCon = this.creEle('div');
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
              that.rmEle([alertCon,shadow],[body,body]);
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
    alert: function(cfg) {
        var cfg = cfg || {};
        this.mainBg = cfg.mainBg || this.mainBg;
        this.mainColor = cfg.mainColor || this.mainColor;
        var shadow = this.creShadow();
        cfg.shadow = shadow;
        var alertCon = this.creAlert(cfg);
        this.posCenter(alertCon, shadow);
    }
};