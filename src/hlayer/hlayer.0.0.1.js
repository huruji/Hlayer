(function(){
  var type = ['msg','alert','loading','iframe','prompt','photo','tips','music'];
  var utils = {
    css: function(ele, cssJson) {
      for(var key in cssJson){
        ele.style[key] = cssJson[key];
      }
    },
    getStyle: function(ele, attr) {
      if(ele.currentStyle) {
        return ele.currentStyle[attr];
      }
      return getComputedStyle(ele, false)[attr];
    },
    move:function (ele,json,fn){
      clearInterval(ele.timer);
      ele.timer=setInterval(function(){
        var btnstop=true;//用以解决多个属性变化不能到达目标值的问题
        for(var attr in json){
          var cur;
          if(attr=='opacity'){
            cur=parseInt(parseFloat(utils.getStyle(ele,attr))*100);
          } else{
            cur=parseInt(utils.getStyle(ele,attr));//parseInt将getstyle的东西转换为整数，并将单位忽略
          }
          var ispeed=(json[attr]-cur)/7;
          if(ispeed>0){
            ispeed=Math.ceil(ispeed);
          }else{
            ispeed=Math.floor(ispeed);//解决当cur大于itarget时的问题
          }
          if(attr=='opacity'){
            ele.style[attr]=(cur+ispeed)/100;
            ele.style.filter='alpha(opacity:'+cur+ispeed+')';
          }else{
            ele.style[attr]=cur+ispeed+'px';
          }
          if(cur!=json[attr]){
            btnstop = false;
          }
        }
        if(btnstop){
          clearInterval(ele.timer);
          if(fn){
            fn();
          }
        }
      }, 16);
    },
    addEvent: function(ele, event, fn) {
      if(ele.addEventListener) {
        return ele.addEventListener(event, fn, false);
      } else if(ele.attachEvent) {
        return ele.attachEvent('on' + event, fn);
      } else {
        return ele['on' + event] = fn;
      }
    },
    removeEvent: function(ele, event, fn) {
      if(ele.removeEventListener){
        ele.removeEventListener(event, fn);
      } else if(ele.detachEvent){
        ele.detachEvent('on' + event, fn);
      } else {
        ele['on' + event] = null;
      }
    },
    mergeJson: function() {
      var json = {};
      for(var i = 0, max = arguments.length; i < max; i++) {
        for(var j in arguments[i]){
          json[j] = arguments[i][j];
        }
      }
      return json;
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
    addChild: function(ele,childArr) {
      if(childArr instanceof Array){
        for(var i = 0, max =childArr.length; i < max; i++) {
          ele.appendChild(childArr[i]);
        }
      }else {
        ele.appendChild(childArr);
      }
    },
    random: function(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    }
  };
  var dom = {
    body: document.body
  };
  var hlayer = {
    index: 100000,
    times:0,
    msg: function(cfg) {
      var config = cfg || {};
      var noChangeCfg = {type:'msg',title:false,btn:false};
      var changeCfg = {icon:false,time:2000,height:'50px'};
      var setting = utils.mergeJson(changeCfg, config, noChangeCfg);
      new Cla(setting);
    },
    alert: function(cfg) {
      var config = cfg || {};
      var noChangeCfg = {type:'alert'};
      var changeCfg = {icon:false,height:'148px',width:'260px',closeBtn:true};
      changeCfg.btn = [];
      changeCfg.btnCb = [];
      if(config.confirmBtn !== false){
        changeCfg.btn.push('确定');
      }
      if(config.cancelBtn) {
        changeCfg.btn.push('取消');
      }
      if(config.confirmCb){
        changeCfg.btnCb.push(config.confirmCb);
      }
      if(config.cancelCb) {
        changeCfg.btnCb.push(config.cancelCb);
      }
      var setting = utils.mergeJson(changeCfg,config,noChangeCfg);
      new Cla(setting);
    },
    loading: function(cfg) {
      var config = cfg || {};
      var noChangeCfg = {type:'loading',icon:false,title:false,btn:false,text:false};
      var changeCfg = {height:'100px',width:'100px',time:2000,shadow:false,loadingColor:'#169fe6'};
      var setting = utils.mergeJson(changeCfg,config,noChangeCfg);
      new Cla(setting);
    },
    iframe: function(cfg) {
      var config = cfg || {};
      var noChangeCfg = {type:'iframe',icon:false,btn:false,text:false};
      var changeCfg = {height:'500px',width:'700px',time:false,shadow:false,closeBtn:true,url:'http://ce.sysu.edu.cn/hope/'};
      var setting = utils.mergeJson(changeCfg,config,noChangeCfg);
      new Cla(setting);
    },
    prompt:function(cfg) {
      var config = cfg || {};
      var noChangeCfg = {type:'prompt',icon:false};
      var changeCfg = {height:'160px',width:'270px',time:false,shadow:false,closeBtn:true,confirmCb:false};
      changeCfg.btn = [];
      changeCfg.btnCb = [];
      if(config.confirmBtn !== false){
        changeCfg.btn.push('确定');
      }
      if(config.cancelBtn) {
        changeCfg.btn.push('取消');
      }
      if(config.confirmCb){
        changeCfg.btnCb.push(config.confirmCb);
      }
      if(config.cancelCb) {
        changeCfg.btnCb.push(config.cancelCb);
      }
      var setting = utils.mergeJson(changeCfg,config,noChangeCfg);
      new Cla(setting);
    },
    photo:function(cfg) {
      var config = cfg || {};
      var noChangeCfg = {type:'photo',icon:false,move:false,title:false,closeBtn:true,text:false,closeType:2};
      var changeCfg = {time:false,shadow:true,animateType:3};
      var setting = utils.mergeJson(changeCfg,config,noChangeCfg);
      new Cla(setting);
    },
    tips: function(cfg) {
      var config = cfg || {};
      var noChangeCfg = {type:'tips',move:false,title:false,closeBtn:false,shadow:false};
      var changeCfg = {time:1000,shadow:true,animateType:3,icon:false,height:'40px',position:'right'};
      var setting = utils.mergeJson(changeCfg,config,noChangeCfg);
      new Cla(setting);
    },
    music:function(cfg) {
      var config = cfg || {};
      var noChangeCfg = {type:'music',icon:false};
      var changeCfg = {time:false,shadow:false,closeBtn:1,animateType:3,height:'142px',width:'320px',text:false,autoPlay:true};
      var setting = utils.mergeJson(changeCfg,config,noChangeCfg);
      new Cla(setting);
    },
    open: function(cfg) {
      var config = cfg || {};
      hlayer[config.type](config);
    }
  };
  function Cla(setting) {
    this.index = ++hlayer.index;
    this.config = utils.mergeJson(this.defaultConfig, setting, this.index);
    this.init();
  }
  Cla.prototype = {
    setConfig:function(){
      if(this.config.animateType.toString().indexOf('random') > -1){
        this.config.animateType = utils.random(1,9) + 'random';
      }
      if(this.config.type===type[2]){
        this.config.contentBg = 'transparent';
      }
    },
    init:function(){
      var that = this;
      this.setConfig();
      this.times = ++hlayer.times;
      this.start(function(){
        that.layer = utils.creEle('div', 'hlayer hlayer' + that.times, 'hlayer' + that.times);
        dom.body.appendChild(that.layer);
        that.layerCon = utils.creEle('div', 'hlayer-content hlayer-' + that.config.type + ' hlayer-animate' + parseInt(that.config.animateType));
        that.layer.appendChild(that.layerCon);
        that.layer.style.zIndex = ++hlayer.index;
        that.layout();
        that.setStyle();
        that.eventHandle();
      });
    },
    start:function(cb){
      this.complete = true;
      var that = this;
      if(this.config.type == type[5]) {
        var imgs = [];
        that.complete = false;
        for(var i = 0 ,max = this.config.photos.length; i < max; i++) {
          var  img = utils.creEle('img');
          img.src = this.config.photos[i].img;
          imgs.push(img);
        }
        var timer = setInterval(function() {
          that.complete = true;
          for (var i = 0, max = imgs.length; i < max; i++) {
            if (!imgs[i].complete) {
              that.complete = false;
              break;
            }
          }
          if (that.complete) {
            clearInterval(timer);
            cb();
          }
        },50);
      }
      if (that.complete) {
        cb();
      }
    },
    layout:function(){
      this.layerTitle = '';
      this.layerMain = '';
      this.layerIcon = '';
      this.layerBtnCON = '';
      this.closeBtn = '';
      this.layerBtns = [];
      this.layerShadow = '';
      this.prompt = [];
      if(this.config.title!==false){
        this.layerTitle = utils.creEle('div', 'hlayer-content-title hlayer-' + this.config.type);
        this.layerTitle.textContent = this.config.title;
        utils.css(this.layerTitle,{backgroundColor:this.config.mainBg,color:this.config.mainColor});
        this.layerCon.appendChild(this.layerTitle);
      }
      if(this.config.shadow) {
        this.layerShadow = utils.creEle('div', 'hlayer-shadow');
        this.layer.insertBefore(this.layerShadow,this.layerCon);
      }
      this.layerMain = utils.creEle('div', 'hlayer-content-main hlayer-' + this.config.type + '-content');
      this.layerCon.appendChild(this.layerMain);
      if(this.config.text){
        this.layerMain.innerHTML = this.config.text;
      }
      if(this.config.icon!== false){
        this.layerMain.style.paddingLeft = '48px';
        this.layerIcon = utils.creEle('div','hlayer-icon hlayer-icon' + this.config.icon);
        var iconHelp = utils.creEle('i');
        this.layerIcon.appendChild(iconHelp);
        this.layerMain.appendChild(this.layerIcon);
      }
      if(this.config.btn) {
        this.layerBtnCON = utils.creEle('div', 'hlayer-content-btns hlayer-' + this.config.type + '-content-btns');
        utils.css(this.layerBtnCON,{background:this.config.contentBg});
        this.layerCon.appendChild(this.layerBtnCON);
        for(var i = 0, max = this.config.btn.length; i < max; i++) {
          var btn = utils.creEle('span','hlayer-content-btns-item hlayer-content-btns-item' + i);
          btn.textContent = this.config.btn[i];
          utils.css(btn,{backgroundColor:this.config.mainBg,color:this.config.mainColor});
          this.layerBtnCON.appendChild(btn);
          this.layerBtns.push(btn);
        }
      }
      if(this.config.closeBtn){
        this.closeBtn = utils.creEle('div', 'hlayer-close hlayer-' + this.config.type + 'close hlayer-close' + this.config.closeType);
        this.layerCon.appendChild(this.closeBtn);
      }
      if(this.config.loadingType && this.config.type == type[2]){
        this.loading = utils.creEle('div','hlayer-content-load hlayer-content-load' + this.config.loadingType);
        if(this.config.loadingType === 1){
          for (var i = 0; i < 8; i++) {
            var div = utils.creEle('div');
            utils.css(div,{backgroundColor:this.config.loadingColor});
            this.loading.appendChild(div);
          }
        } else if(this.config.loadingType === 2) {
          for(var i =0; i < 2; i++) {
            var div = utils.creEle('div');
            utils.css(div,{backgroundColor:this.config.loadingColor});
            this.loading.appendChild(div);
          }
        } else if(this.config.loadingType === 3) {
          for(var i =0; i < 5; i++) {
            var div = utils.creEle('div','div'+(i+1));
            utils.css(div,{backgroundColor:this.config.loadingColor});
            this.loading.appendChild(div);
          }
        } else if(this.config.loadingType === 4) {
          for(var i =0; i < 5; i++) {
            var div = utils.creEle('div','div'+(i+1));
            utils.css(div,{backgroundColor:this.config.loadingColor});
            this.loading.appendChild(div);
          }
        }
        this.layerMain.appendChild(this.loading);
        utils.css(this.layerCon,{boxShadow:'none',background:'transparent'});
      }
      if(this.config.type == type[3]){
        var iframe = utils.creEle('iframe','hlayer-content-iframe');
        utils.css(iframe,{height:parseInt(this.config.height) - 52 + 'px'});
        iframe.src = this.config.url;
        this.layerMain.appendChild(iframe);
      }
      if(this.config.type == type[4]){
        if(this.config.formType === 1 || this.config.formType === 2) {
          var input = utils.creEle('input', 'hlayer-content-prompt hlayer-form-group hlayer-form-input');
          if (this.config.formType === 2) {
            input.type = 'password';
          }
          this.prompt.push(input);
          this.layerMain.appendChild(input);
        }else if(this.config.formType === 3) {
          var input = utils.creEle('textarea', 'hlayer-content-prompt hlayer-form-group hlayer-form-textarea');
          this.prompt.push(input);
          utils.css(input,{height:parseInt(this.config.height) - 125 + 'px'});
          this.layerMain.appendChild(input);
        }else if(this.config.formType===4){
          for(var i = 0, max = this.config.options.inputs.length; i < max; i++){
            var label  = utils.creEle('label', 'hlayer-prompt-content-label');
            var input = utils.creEle('input');
            input.type = 'radio';
            input.name = this.config.options.name;
            label.appendChild(input);
            this.prompt.push(input);
            var textNode = document.createTextNode(this.config.options.inputs[i]);
            label.appendChild(textNode);
            this.layerMain.appendChild(label);
          }
        } else if(this.config.formType === 5) {
          for(var i = 0, max = this.config.options.inputs.length; i < max; i++){
            var label  = utils.creEle('label', 'hlayer-prompt-content-label');
            var input = utils.creEle('input');
            input.type = 'checkbox';
            input.name = this.config.options.name;
            label.appendChild(input);
            this.prompt.push(input);
            var textNode = document.createTextNode(this.config.options.inputs[i]);
            label.appendChild(textNode);
            this.layerMain.appendChild(label);
          }
        }
      }
      if(this.config.type === type[6]) {
        this.tipsArrow = utils.creEle('i',this.config.tipsPosition);
        this.layerMain.appendChild(this.tipsArrow);
      }
      if(this.config.type == type[5]) {
        var that = this;
        that.photosIndex = that.photosIndex || 0;
        that.photoImg = utils.creEle('img','hlayer-content-photo');
        utils.photoImg = utils.css(that.photoImg,{display:'block'});
        that.photoImgNext = utils.creEle('div', 'hlayer-content-photo-next');
        that.photoImgPre = utils.creEle('div', 'hlayer-content-photo-pre');
        utils.css(that.layerMain,{padding:'0px'});
        utils.css(that.layerCon,{padding:'10px'});
        that.photoText = utils.creEle('div', 'hlayer-content-photo-text');
        that.photoImg.src = that.config.photos[that.photosIndex].img;
        that.photoText.textContent = that.config.photos[that.photosIndex].text;
        that.layerMain.appendChild(that.photoImg);
        that.layerMain.appendChild(that.photoText);
        that.layerMain.appendChild(that.photoImgNext);
        that.layerMain.appendChild(that.photoImgPre);
        that.setStyle();
        that.photoEventHandle();
      }
      if(this.config.type == type[7]){
        this.musicImgCon = utils.creEle('div','hlayer-content-music-img');
        var img = utils.creEle('img');
        img.src = this.config.photos;
        utils.css(img, {height:'100%'});
        this.musicImgCon.appendChild(img);
        this.layerMain.appendChild(this.musicImgCon);
        utils.css(this.musicImgCon,{height: '80px',position: 'absolute',top: '10px'});
        var audio = utils.creEle('audio');
        audio.controls = 'controls';
        if(this.config.autoPlay){
          audio.autoplay = true;
        }
        var source = utils.creEle('source');
        if(typeof this.config.url === 'string'){
          source.src=this.config.url;
          audio.appendChild(source);
        } else if(this.config.url instanceof Array){
          this.config.url.forEach(function(ele){
            source.src=ele;
            audio.appendChild(source);
          });
        }
        utils.css(audio,{marginLeft: '100px',width: '200px', top: '30px', position: 'relative'});
        this.layerMain.appendChild(audio);
      }
    },
    setStyle:function(){
      utils.css(this.layerMain,{background:this.config.contentBg,color:this.config.contentColor});
      this.setHeight();
      if(this.config.type === type[0]){
        utils.css(this.layerMain,{textAlign:'center'});
      }
      if(this.tipsArrow){
        utils.css(this.tipsArrow,{borderRightColor:this.config.contentBg});
      }
      this.position();
    },
    eventHandle: function(){
      var that = this;
      if(this.config.time) {
        setTimeout(function(){
          that.close();
        },this.config.time);
      }
      if(this.closeBtn){
        this.closeBtnHandle();
      }
      this.btnsHandle();
      this.resize();
      this.move();
    },
    photoEventHandle:function(){
      this.photoHover();
      this.photoChange();
      this.autoPlay();
    },
    photoHover:function(){
      var that = this;
      if(that.photoImg) {
        utils.addEvent(that.layerCon, 'mouseover', function(){
          that.photoImgNext.style.display = 'block';
          that.photoImgPre.style.display = 'block';
          that.photoText.style.display = 'block';
        });
        utils.addEvent(that.layerCon, 'mouseleave', function(){
          that.photoImgNext.style.display = 'none';
          that.photoImgPre.style.display = 'none';
          that.photoText.style.display = 'none';
        });
      }
    },
    photoChange: function(){
      var that = this;
      if(that.photoImg) {
        utils.addEvent(that.photoImgNext,'click',function(){
          if(that.photosIndex == that.config.photos.length - 1) {
            that.photosIndex = 0;
          } else {
            that.photosIndex += 1;
          }
          if(this.photoTimer){
            clearTimeout(this.photoTimer);
          }
          that.close();
          that.init();
        });
        utils.addEvent(that.photoImgPre,'click',function(){
          if(that.photosIndex == 0) {
            that.photosIndex = that.config.photos.length - 1;
          } else {
            that.photosIndex -= 1;
          }
          if(this.photoTimer){
            clearTimeout(this.photoTimer);
          }
          that.close();
          that.init();
        });
      }
    },
    autoPlay: function(){
      var that = this;
      if(this.config.autoPlay){
        this.photoTimer = setTimeout(function(){
          
          that.photoImgNext.click();
        },this.config.playTime);
      }
    },
    resize:function() {
      var that = this;
      if(this.config.resize) {
        utils.addEvent(window,'resize',function() {
          that.position.apply(that);
        });
      }
    },
    move:function(){
      var that = this;
      if(this.layerTitle && this.config.move){
        this.layerTitle.onmousedown = function(ev){
          var event = ev || window.event;
          var disx = event.clientX -  that.layerCon.offsetLeft;
          var disy = event.clientY - that.layerCon.offsetTop;
          document.onmousemove = function(ev) {
            var event = ev || window.event;
            var left = event.clientX - disx + 'px';
            var top = event.clientY - disy + 'px';
            utils.css(that.layerCon,{left:left,top:top});
            document.onmouseup = function(){
              document.onmousemove = null;
            };
          };
        };
      }
    },
    setHeight:function(){
      if(this.config.width){
        this.layerCon.style.width = this.config.width;
      }
      if(this.config.height) {
        this.layerCon.style.height = this.config.height;
      }
      var setHeight = parseInt(this.config.height);
      if(this.layerTitle){
        setHeight -= 42;
      }
      if(this.layerBtnCON){
        setHeight -= 40;
      }
      utils.css(this.layerMain, {height: setHeight + 'px',lineHeight:'30px'});
      if(this.config.type === type[0] || this.config.type === type[1] || this.config.type === type[6]) {
        if(setHeight){
          utils.css(this.layerMain, {height: setHeight + 'px'});
          utils.css(this.layerMain, {lineHeight: setHeight + 'px'});
        }
      }
    },
    close: function() {
      var that = this;
      that.layer.style.display = 'none';
      dom.body.removeChild(that.layer);
    },
    closeBtnHandle:function() {
      var that = this;
      utils.addEvent(this.closeBtn,'click',function(){
        that.layer.style.display = 'none';
        dom.body.removeChild(that.layer);
      });
    },
    btnsHandle:function(){
      var that = this;
      if(this.layerBtns && this.config.btnCb) {
        for(var i = 0, max = this.layerBtns.length; i<max; i++){
          if(this.layerBtns[i] && this.config.btnCb[i]){
            (function(i){
              utils.addEvent(that.layerBtns[i],'click',function(){
                if(typeof that.config.btnCb[i] !== 'function' && that.config.btnCb[i]=='close'){
                  that.close();
                  return;
                } else if(that.config.btnCb[i] === false){
                  return;
                }
                if(that.config.type === type[4] && i===0){
                  var data = [];
                  if(that.config.formType === 1 || that.config.formType === 2 || that.config.formType === 3){
                    var close = true;
                    if(!that.config.allowEmpty){
                      var close = that.prompt.some(function(ele){
                        return ele.value;
                      });
                    }
                    if(!close){
                      return;
                    }
                    that.close();
                    that.prompt.forEach(function (ele) {
                      data.push(ele.value);
                    });
                  } else if(that.config.formType === 4 || that.config.formType === 5){
                    var close = true;
                    if(!that.config.allowEmpty){
                      var close = that.prompt.some(function(ele){
                        return ele.checked;
                      });
                    }
                    if(!close){
                      return;
                    }
                    that.close();
                    that.prompt.forEach(function(ele,i){
                      if(ele.checked){
                        data.push({index:i,value:that.config.options.inputs[i]});
                      }
                    });
                  }
                  data.length === 1 ? that.config.btnCb[0](data[0]) : that.config.btnCb[0](data);
                }else{
                  that.close();
                  that.config.btnCb[i]();
                }
              });
            })(i);
          }
        }
      }
    },
    position: function() {
      var setTop = '';
      var setLeft = '';
      if(this.config.type === type[6]) {
        var parent = document.getElementById(this.config.tipsCon);
        var parentTop = parent.offsetTop;
        var parentLeft = parent.offsetLeft;
        var parentHeight = parent.offsetHeight;
        var parentWidth = parent.offsetWidth;
        var layerConHeight = this.layerCon.offsetHeight;
        var layerConWidth = this.layerCon.offsetWidth;
        var scrollLeft = document.body.scrollLeft || document.documentElement.scrollLeft;
        var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
        if(this.config.tipsPosition === 'left'){
          setLeft = parentLeft - layerConWidth - 10 - scrollLeft+ 'px';
          setTop = parentTop + (parentHeight-layerConHeight)/2 - scrollTop + 'px';
          utils.css(this.layerCon, {left:setLeft,top:setTop});
        } else if(this.config.tipsPosition === 'top'){
          setLeft = parentLeft + (parentWidth-layerConWidth)/2 -scrollLeft+ 'px';
          setTop = parentTop - layerConHeight - 10 - scrollTop + 'px';
          utils.css(this.layerCon, {left:setLeft,top:setTop});
        } else if(this.config.tipsPosition === 'right'){
          setLeft =parentLeft + parentWidth + 10 -scrollLeft+ 'px';
          setTop = parentTop + (parentHeight-layerConHeight)/2 - scrollTop + 'px';
          utils.css(this.layerCon, {left:setLeft,top:setTop});
        }else if(this.config.tipsPosition === 'bottom'){
          setLeft = parentLeft + (parentWidth-layerConWidth)/2 -scrollLeft+ 'px';
          setTop = parentTop + parentHeight + 10- scrollTop + 'px';
          utils.css(this.layerCon, {left:setLeft,top:setTop});
        }
        return;
      }
      var positionType = this.config.position;
      var layerHeight = this.layerCon.offsetHeight;
      var layerWidth = this.layerCon.offsetWidth;
      var winHeight = window.innerHeight;
      var winWidth = window.innerWidth;
      if(positionType === 'random'){
        setTop = utils.random(0,winHeight-layerHeight) + 'px';
        setLeft = utils.random(0,winWidth - layerWidth) + 'px';
        utils.css(this.layerCon, {left:setLeft,top:setTop});
      }
      if(positionType === 0) {
        setTop = (winHeight - layerHeight) / 2 + 'px';
        setLeft = (winWidth - layerWidth) / 2 + 'px';
        utils.css(this.layerCon, {left:setLeft,top:setTop});
      } else if(positionType === 1){
        utils.css(this.layerCon,{top:'0px',left:'0px'});
      } else if(positionType === 2) {
        setLeft = (winWidth - layerWidth) / 2 + 'px';
        utils.css(this.layerCon,{top:'0px',left:setLeft});
      } else if(positionType === 3) {
        utils.css(this.layerCon,{top:'0px',right:'0px'});
      } else if(positionType === 4) {
        utils.css(this.layerCon,{bottom:'0px',left:'0px'});
      } else if(positionType === 5) {
        setLeft = (winWidth - layerWidth) / 2 + 'px';
        utils.css(this.layerCon,{bottom:'0px',left:setLeft});
      } else if(positionType === 6) {
        utils.css(this.layerCon,{bottom:'0px',right:'0px'});
      }
    },
    defaultConfig: {
      // mainBg: '#51B1D9',
      mainBg:'#169FE6',
      mainColor: '#fff',
      contentBg:'#fff',
      contentColor:'#000',
      title: '信息',
      text: '提示信息',
      width: '',
      height: '',
      btns:'',
      confirmBtn: true,
      confirmCb: false,
      cancelBtn: false,
      cancelCb: false,
      animateType: 1,
      resize:true,
      position: 0,
      shadow:true,
      time: false,
      loadingType:1,
      closeBtn:false,
      url:false,
      formType:1,
      move:true,
      photos:false,
      closeType:1,
      tipsPosition:'right',
      tipsCon:'',
      autoPlay:false,
      playTime:5000,
      allowEmpty:true
    },
  };
  window.hlayer = hlayer;
})(window);