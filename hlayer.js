var hlayer = {
  css: function(ele, cssJson) {
      for(var key in cssJson){
          ele.style[key] = cssJson[key];
      }
  },
  creEle: function(ele) {
      return document.createElement(ele);
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
    creShadow: function() {
      var shadow = this.creEle('div');
      shadow.className = 'hlayer-shadow';
      this.css(shadow, {position: 'fixed',top:0,left:0,width: '100%',height:'100%',backgroundColor:'rgba(0,0,0,0.3)',zIndex: 10000});
      document.getElementsByTagName('body')[0].appendChild(shadow);
      return shadow;
  },
    creMsg: function(msg) {
      var msgCon = this.creEle('div');
      msgCon.className = 'hlayer-msg';
      var msg = msg || '弹出信息';
      msgCon.textContent = msg;
      this.css(msgCon, {minWidth:'60px',height: '30px',lineHeight:'30px',fontSize:'14px',padding: '5px',borderRadius:'3px',display:'inline-block',background:'#fff',zIndex:10010});
      document.getElementsByTagName('body')[0].appendChild(msgCon);
      return msgCon;
    },
    msg: function(cfg) {
      var shadow = this.creShadow();
      var msgCon = this.creMsg(cfg.text);
      this.posCenter(msgCon, shadow);
      if(cfg.css) {
          this.css(msgCon, cfg.css);
      }
    }
};