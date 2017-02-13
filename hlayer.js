var hlayer = {
    docBody: document.getElementsByTagName('body')[0],
    mainBg:'#51B1D9',
    mainColor: '#fff',
    data:{},
    setData: function(key,value) {
        this.data[key] = value;
    },
    addStyle: function() {
        var _this = this;
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
    creEle: function(ele,cl,id) {
        var e = document.createElement(ele);
        if(cl) {
            e.className = cl;
        }
        if(id) {
            e.id = id;
        }
        return e;
    },
    rmEle: function(eleArr, parArr) {
        for(var i = 0, max = eleArr.length; i < max; i++) {
            parArr[i].removeChild(eleArr[i]);
        }
    },
    creHlayer: function(){
        var ele = this.creEle('div','hlayer','hlayer');
        this.css(ele, {display:'block'});
        return ele;
    },
    rmHlayer: function() {
        var layer = document.getElementById('hlayer');
        this.docBody.removeChild(layer);
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
    timingCancel: function(time) {
        time = 1000;
        var _this = this;
        setTimeout(function() {
            _this.rmHlayer();
        }, time);
    },
    center: function(ele) {
        var childWid = parseInt(this.getStyle(ele, 'width'));
        console.log(childWid);
        var childHei = parseInt(this.getStyle(ele, 'height'));
        var winWidth = window.innerWidth;
        var winHeight = window.innerHeight;
        var setTop = (winHeight - childHei) / 2 + 'px';
        var setLeft = (winWidth - childWid) / 2 + 'px';
        this.css(ele, {position:'fixed',top:setTop,left:setLeft});
    },
    appendNodes: function(par, childArr) {
        if(Array.isArray(childArr)) {
            for (var i = 0, max = childArr.length; i < max; i++) {
                par.appendChild(childArr[i]);
            }
        }else{
            par.appendChild(childArr);
        }
    },
    creShadow: function() {
        var shadow = this.creEle('div');
        shadow.className = 'hlayer-shadow';
        this.css(shadow, {position: 'fixed',top:0,left:0,width: '100%',height:'100%',backgroundColor:'#000',opacity:'0.3',zIndex: 10000});
        return shadow;
    },
    creMsg: function(cfg) {
        var msgCon = this.creEle('div');
        msgCon.className = 'hlayer hlayer-msg';
        msgCon.textContent = cfg.text;
        this.css(msgCon, {height:cfg.height,lineHeight:cfg.height});
        if(cfg.width) {
            this.css(msgCon, {width: cfg.width});
        }
        this.css(msgCon, {minWidth:'60px',fontSize:'14px',padding: '5px',borderRadius:'3px',display:'inline-block',background:'#fff',zIndex:10010});
        if(cfg.css) {
            this.css(msgCon,css);
        }
        return msgCon;
    },
    creBtn: function(options) {
        var options = options || {};
      var right = options.right || '10px';
      var bottom = options.bottom || '10px';
      var text = options.text || '确定';
      var btn = this.creEle('span');
      this.css(btn, {width:'44px',height:'30px',lineHeight:'30px', cursor:'pointer',textAlign:'center',backgroundColor:options.mainBg, color: options.mainColor, borderRadius:'3px', padding:'0 8px',position:'absolute',right:right,bottom: bottom});
      if(options.css) {
          this.css(btn, options.css);
      }
      btn.textContent = text;
      return btn;
    },
    creAlert: function(cfg) {
        var _this = this;
      var alertCon = this.creEle('div','hlayer-alert');
      if(cfg.animateType && typeof cfg.animateType === "number") {
          alertCon.className += ' hlayer-animate' + cfg.animateType;
      }
      var alertTitle = this.creEle('div','hlayer-alert-title');
      var alertContent = this.creEle('div', 'hlayer-alert-content');
      this.css(alertCon,{width:cfg.width,height:cfg.height});
      this.css(alertCon, {borderRadius: '5px',backgroundColor:'#fff',zIndex:10010});
      this.css(alertTitle, {height:'42px', padding: '0 10px', borderRadius:'5px 5px 0px 0px',lineHeight: '42px',fontSize: '16px',backgroundColor:cfg.mainBg,color:cfg.mainColor});
      alertTitle.textContent = cfg.title;
      this.css(alertContent, {height:'70px',padding: '18px 10px',fontSize: '14px',lineHeight: '20px'});
      alertContent.textContent = cfg.text;
      this.appendNodes(alertCon, [alertTitle, alertContent]);
      if(cfg.confirmBtn !== false) {
          var btn  = this.creBtn({mainBg:cfg.mainBg,mainColor:cfg.mainColor});
          alertCon.appendChild(btn);
          this.addEvent(btn,'click',function() {
              _this.rmHlayer();
              cfg.confirmCb && cfg.confirmCb();
          })
      }
      if(cfg.cancelBtn === true) {
          var btn = this.creBtn({text:'取消',mainBg:cfg.mainBg,mainColor:cfg.mainColor,css:{left:'10px'}});
          alertCon.appendChild(btn);
          this.addEvent(btn,'click',function() {
              _this.rmHlayer();
              cfg.cancelCb && cfg.cancelCb();
          })
      }
      return alertCon;
    },
    creLoad: function(cfg) {
        var loadCon = this.creEle('div');
        if(typeof cfg.type === 'number') {
            loadCon.className = 'hlayer' + ' hlayer-load' + cfg.type;
            for (var i = 0; i < 8; i++) {
                var div = this.creEle('div');
                loadCon.appendChild(div);
            }
            this.css(loadCon, {width: cfg.width, height: cfg.height});
            this.css(loadCon, {zIndex: 10010});
        }
        return loadCon;
    },
    creIframe: function(cfg) {
        var title = cfg.title || '信息';
        var width = cfg.width;
        var height = cfg.height;
        var iframeCon = this.creEle('div');
        this.css(iframeCon,{padding: '10px', width: width, height: height,zIndex:10010,position:'fixed',backgroundColor:'#eee',borderRadius:'5px'});
        var iframeTitle = this.creEle('div');
        iframeTitle.textContent = title;
        this.css(iframeTitle, {height:'32px',lineHeight:'32px',fontSize:'14px',borderBottom:'1px solid #333'});
        var iframeContent = this.creEle('div');
        var iframe = this.creEle('iframe');
        this.css(iframe, {display: 'block', width:'100%', height: parseInt(height)- 33 + 'px', borderWidth: 0});
        iframe.src = cfg.url;
        this.appendNodes(iframeContent,[iframe]);
        this.appendNodes(iframeCon, [iframeTitle, iframeContent]);
        var closeBtn = this.creCloseBtn();
        this.appendNodes(iframeCon,[closeBtn]);
        console.log(closeBtn);
        document.getElementsByTagName('body')[0].appendChild(iframeCon);
        var _this = this;
        this.addEvent(closeBtn, 'click', function () {
            _this.timingCancel(cfg.disNone.concat(iframeCon),[_this.docBody,_this.docBody],0);
        });
        return iframeCon;
    },
    creCloseBtn:function() {
        var closeCon = this.creEle('div');
        var icon1 = this.creEle('span');
        var icon2 = this.creEle('span');
        this.css(closeCon,{position:'absolute', right: '10px',top:'10px',height:'20px',width:'20px', cursor:'pointer',border:'1px solid #000'});
        this.appendNodes(closeCon, [icon1,icon2]);
        this.css(icon1,{width:'2px',height:'28px',transform:'rotate(45deg)',position:'absolute',left:'9px',top:'-4px',background:'#000'});
        this.css(icon2,{width:'2px',height:'28px',transform:'rotate(-45deg)',position:'absolute',left:'9px',top:'-4px',background:'#000'});
        return closeCon;
    },
    /*cfg:{
        text: '内容'，
        css: {msg盒子的css样式组成的json},
        width: 宽度,
        height: 高度,
        time: msg消失的时间，毫秒计，默认为1s,
      }
    */
    msg: function(cfg) {
        var cfg = cfg || {};
        cfg.width = cfg.width || '';
        cfg.height =  cfg.height || '30px';
        cfg.text = cfg.text || '提示信息';
        cfg.time = cfg.time || 1000;
        cfg.css = cfg.css || '';
        var layer = this.creHlayer();
        var shadow = this.creShadow();
        var msgCon = this.creMsg(cfg);
        this.appendNodes(layer,[shadow, msgCon]);
        this.appendNodes(this.docBody,layer);
        this.center(msgCon);
        if(cfg.css) {
            this.css(msgCon, cfg.css);
        }
        this.timingCancel(cfg.time);
    },
    /*
    cfg:{
        mainBg: 主要的背景颜色,
        mainColor: 主要的字体颜色,
        title: alert框的标题,
        text: alert框的内容,
        width: 宽度,
        height: 高度,
        confirmBtn: 是否需要确认按钮，默认为true,
        confirmCb: 点击确认按钮时触发的事件函数,
        cancelBtn: 是否需要取消按钮，默认为false,
        cancelCb: 点击取消按钮时触发的事件函数,
        animateType:动画类型1,2，3中的一种
     }
    */
    alert: function(cfg) {
        var cfg = cfg || {};
        cfg.mainBg = cfg.mainBg || this.mainBg;
        cfg.mainColor = cfg.mainColor || this.mainColor;
        cfg.title = cfg.title || '信息';
        cfg.text = cfg.text || '提示信息';
        cfg.width = cfg.width || '260px';
        cfg.height = cfg.height || '148px';
        cfg.confirmBtn = cfg.confirmBtn || true;
        cfg.cancelBtn = cfg.cancelBtn || false;
        cfg.animateType = cfg.animateType || 1;
        var layer = this.creHlayer();
        var shadow = this.creShadow();
        var alertCon = this.creAlert(cfg);
        this.appendNodes(layer,[shadow, alertCon]);
        this.appendNodes(this.docBody,layer);
        this.center(alertCon);
    },
    /*
    cfg:{
        type:类型，
        width:宽度,
        height:高度,
        time:时间,
    }
    */
    loading: function(cfg) {
        var cfg = cfg || {};
        cfg.type = cfg.type || 1;
        cfg.width = cfg.width || '100px';
        cfg.height = cfg.height || '100px';
        var layer = this.creHlayer();
        var shadow = this.creShadow();
        var loadCon = this.creLoad(cfg);
        this.appendNodes(layer,[shadow, loadCon]);
        this.appendNodes(this.docBody,layer);
        this.posCenter(loadCon, shadow);
        if(cfg.time) {
            this.timingCancel(cfg.time);
        }
    },
    /*cfg:{
        title:'标题',
        width:宽度,
        height:高度,
    }
    */
    iframe: function(cfg) {
        var cfg = cfg || {};
        cfg.width = cfg.width || '700px';
        cfg.height = cfg.height || '486px';
        /*if(cfg.shadow !== false || cfg.shadow !== undefined) {
            var shadow = this.creShadow();
        }*/
        cfg.disNone = [shadow];
        var shadow = this.creShadow();
        var iframeCon = this.creIframe(cfg);
        this.posCenter(iframeCon, shadow);
    }
};