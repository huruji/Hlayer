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
            return new Cla(setting);
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
            return new Cla(setting);
        },
        loading: function(cfg) {
            var config = cfg || {};
            var noChangeCfg = {type:'loading',icon:false,title:false,btn:false,text:false};
            var changeCfg = {height:'100px',width:'100px',time:2000,shadow:false,loadingColor:'#169fe6'};
            var setting = utils.mergeJson(changeCfg,config,noChangeCfg);
            return new Cla(setting);
        },
        iframe: function(cfg) {
            var config = cfg || {};
            var noChangeCfg = {type:'iframe',icon:false,btn:false,text:false};
            var changeCfg = {height:'500px',width:'700px',time:false,shadow:false,closeBtn:true,url:'http://ce.sysu.edu.cn/hope/'};
            var setting = utils.mergeJson(changeCfg,config,noChangeCfg);
            return new Cla(setting);
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
            return new Cla(setting);
        },
        photo:function(cfg) {
            var config = cfg || {};
            var noChangeCfg = {type:'photo',icon:false,move:false,title:false,closeBtn:true,text:false,closeType:2};
            var changeCfg = {time:false,shadow:true,animateType:3};
            var setting = utils.mergeJson(changeCfg,config,noChangeCfg);
            return new Cla(setting);
        },
        tips: function(cfg) {
            var config = cfg || {};
            var noChangeCfg = {type:'tips',move:false,title:false,closeBtn:false,shadow:false};
            var changeCfg = {time:1000,shadow:true,animateType:3,icon:false,height:'40px',position:'right'};
            var setting = utils.mergeJson(changeCfg,config,noChangeCfg);
            return new Cla(setting);
        },
        music:function(cfg) {
            var config = cfg || {};
            var noChangeCfg = {type:'music',icon:false};
            var changeCfg = {time:false,shadow:false,closeBtn:1,animateType:3,height:'142px',width:'320px',text:false,autoPlay:true};
            var setting = utils.mergeJson(changeCfg,config,noChangeCfg);
            return new Cla(setting);
        },
        open: function(cfg) {
            var config = cfg || {};
            return hlayer[config.type](config);
        },
        remove: function(dom) {
            if(arguments.length > 0){
             [].slice.call(arguments).forEach(function(ele){
                 ele.parentNode.removeChild(ele);
             })
            }
            var eles = document.getElementsByClassName('hlayer');
            // 因为每次删除元素的时候，其实这个eles都会随着更新，
            while(eles[0]){
              eles[0].parentNode.removeChild(eles[0]);
            }
        }
    };
    function Cla(setting) {
        this.index = ++hlayer.index;
        this.config = utils.mergeJson(this.defaultConfig, setting, this.index);
        return this.init();
    }
    Cla.prototype = {
        setConfig:function(){
            var that = this;
            if(that.config.animateType.toString().indexOf('random') > -1){
                that.config.animateType = utils.random(1,9) + 'random';
            }
            if(that.config.type===type[2]){
                that.config.contentBg = 'transparent';
            }
        },
        init:function(){
            var that = this;
            that.setConfig();
            that.times = ++hlayer.times;
            that.layer = utils.creEle('div', 'hlayer hlayer' + that.times, 'hlayer' + that.times);
            that.start(function(){
                dom.body.appendChild(that.layer);
                that.layerCon = utils.creEle('div', 'hlayer-content hlayer-' + that.config.type + ' hlayer-animate' + parseInt(that.config.animateType));
                that.layer.appendChild(that.layerCon);
                that.layer.style.zIndex = ++hlayer.index;
                that.layout();
                that.setStyle();
                that.eventHandle();
            });
            return that.layer;
        },
        start:function(cb){
            var that = this;
            that.complete = true;
            if(that.config.type == type[5]) {
                var imgs = [];
                that.complete = false;
                for(var i = 0 ,max = that.config.photos.length; i < max; i++) {
                    var  img = utils.creEle('img');
                    img.src = that.config.photos[i].img;
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
            var that = this;
            that.layerTitle = '';
            that.layerMain = '';
            that.layerIcon = '';
            that.layerBtnCON = '';
            that.closeBtn = '';
            that.layerBtns = [];
            that.layerShadow = '';
            that.prompt = [];
            if(that.config.title!==false){
                that.layerTitle = utils.creEle('div', 'hlayer-content-title hlayer-' + that.config.type);
                that.layerTitle.textContent = that.config.title;
                utils.css(that.layerTitle,{backgroundColor:that.config.mainBg,color:that.config.mainColor});
                that.layerCon.appendChild(that.layerTitle);
            }
            if(that.config.shadow) {
                that.layerShadow = utils.creEle('div', 'hlayer-shadow');
                that.layer.insertBefore(that.layerShadow,that.layerCon);
            }
            that.layerMain = utils.creEle('div', 'hlayer-content-main hlayer-' + that.config.type + '-content');
            that.layerCon.appendChild(that.layerMain);
            if(that.config.text){
                that.layerMain.innerHTML = that.config.text;
            }
            if(that.config.icon!== false){
                that.layerMain.style.paddingLeft = '48px';
                that.layerIcon = utils.creEle('div','hlayer-icon hlayer-icon' + that.config.icon);
                var iconHelp = utils.creEle('i');
                that.layerIcon.appendChild(iconHelp);
                that.layerMain.appendChild(that.layerIcon);
            }
            if(that.config.btn) {
                that.layerBtnCON = utils.creEle('div', 'hlayer-content-btns hlayer-' + that.config.type + '-content-btns');
                utils.css(that.layerBtnCON,{background:that.config.contentBg});
                that.layerCon.appendChild(that.layerBtnCON);
                for(var i = 0, max = that.config.btn.length; i < max; i++) {
                    var btn = utils.creEle('span','hlayer-content-btns-item hlayer-content-btns-item' + i);
                    btn.textContent = that.config.btn[i];
                    utils.css(btn,{backgroundColor:that.config.mainBg,color:that.config.mainColor});
                    that.layerBtnCON.appendChild(btn);
                    that.layerBtns.push(btn);
                }
            }
            if(that.config.closeBtn){
                that.closeBtn = utils.creEle('div', 'hlayer-close hlayer-' + that.config.type + 'close hlayer-close' + that.config.closeType);
                that.layerCon.appendChild(that.closeBtn);
            }
            if(that.config.loadingType && that.config.type == type[2]){
                that.loading = utils.creEle('div','hlayer-content-load hlayer-content-load' + that.config.loadingType);
                if(that.config.loadingType === 1){
                    for (var i = 0; i < 8; i++) {
                        var div = utils.creEle('div');
                        utils.css(div,{backgroundColor:that.config.loadingColor});
                        that.loading.appendChild(div);
                    }
                } else if(that.config.loadingType === 2) {
                    for(var i =0; i < 2; i++) {
                        var div = utils.creEle('div');
                        utils.css(div,{backgroundColor:that.config.loadingColor});
                        that.loading.appendChild(div);
                    }
                } else if(that.config.loadingType === 3) {
                    for(var i =0; i < 5; i++) {
                        var div = utils.creEle('div','div'+(i+1));
                        if(i < 2){
                          utils.css(div,{borderColor: this.config.loadingColor});
                        } else if( i >= 2){
                          utils.css(div,{backgroundColor:that.config.loadingColor});
                        }
                        that.loading.appendChild(div);
                    }
                } else if(that.config.loadingType === 4) {
                    for(var i =0; i < 5; i++) {
                        var div = utils.creEle('div','div'+(i+1));
                        utils.css(div,{backgroundColor:that.config.loadingColor});
                        that.loading.appendChild(div);
                    }
                }
                that.layerMain.appendChild(that.loading);
                utils.css(that.layerCon,{boxShadow:'none',background:'transparent'});
            }
            if(that.config.type == type[3]){
                var iframe = utils.creEle('iframe','hlayer-content-iframe');
                utils.css(iframe,{height:parseInt(that.config.height) - 52 + 'px'});
                iframe.src = that.config.url;
                that.layerMain.appendChild(iframe);
            }
            if(that.config.type == type[4]){
                if(that.config.formType === 1 || that.config.formType === 2) {
                    var input = utils.creEle('input', 'hlayer-content-prompt hlayer-form-group hlayer-form-input');
                    if (that.config.formType === 2) {
                        input.type = 'password';
                    }
                    that.prompt.push(input);
                    that.layerMain.appendChild(input);
                }else if(that.config.formType === 3) {
                    var input = utils.creEle('textarea', 'hlayer-content-prompt hlayer-form-group hlayer-form-textarea');
                    that.prompt.push(input);
                    utils.css(input,{height:parseInt(that.config.height) - 125 + 'px'});
                    that.layerMain.appendChild(input);
                }else if(that.config.formType===4){
                    for(var i = 0, max = that.config.options.inputs.length; i < max; i++){
                        var label  = utils.creEle('label', 'hlayer-prompt-content-label');
                        var input = utils.creEle('input');
                        input.type = 'radio';
                        input.name = that.config.options.name;
                        label.appendChild(input);
                        that.prompt.push(input);
                        var textNode = document.createTextNode(that.config.options.inputs[i]);
                        label.appendChild(textNode);
                        that.layerMain.appendChild(label);
                    }
                } else if(that.config.formType === 5) {
                    for(var i = 0, max = that.config.options.inputs.length; i < max; i++){
                        var label  = utils.creEle('label', 'hlayer-prompt-content-label');
                        var input = utils.creEle('input');
                        input.type = 'checkbox';
                        input.name = that.config.options.name;
                        label.appendChild(input);
                        that.prompt.push(input);
                        var textNode = document.createTextNode(that.config.options.inputs[i]);
                        label.appendChild(textNode);
                        that.layerMain.appendChild(label);
                    }
                }
            }
            if(that.config.type === type[6]) {
                that.tipsArrow = utils.creEle('i',that.config.tipsPosition);
                that.layerMain.appendChild(that.tipsArrow);
            }
            if(that.config.type == type[5]) {
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
            if(that.config.type == type[7]){
                that.musicImgCon = utils.creEle('div','hlayer-content-music-img');
                var img = utils.creEle('img');
                img.src = that.config.photos;
                utils.css(img, {height:'100%'});
                that.musicImgCon.appendChild(img);
                that.layerMain.appendChild(that.musicImgCon);
                utils.css(that.musicImgCon,{height: '80px',position: 'absolute',top: '10px'});
                var audio = utils.creEle('audio');
                audio.controls = 'controls';
                if(that.config.autoPlay){
                    audio.autoplay = true;
                }
                var source = utils.creEle('source');
                if(typeof that.config.url === 'string'){
                    source.src=that.config.url;
                    audio.appendChild(source);
                } else if(that.config.url instanceof Array){
                    that.config.url.forEach(function(ele){
                        source.src=ele;
                        audio.appendChild(source);
                    });
                }
                utils.css(audio,{marginLeft: '100px',width: '200px', top: '30px', position: 'relative'});
                that.layerMain.appendChild(audio);
            }
        },
        setStyle:function(){
            var that = this;
            utils.css(that.layerMain,{background:that.config.contentBg,color:that.config.contentColor});
            that.setHeight();
            if(that.config.type === type[0]){
                utils.css(that.layerMain,{textAlign:'center'});
            }
            if(that.tipsArrow){
                utils.css(that.tipsArrow,{borderRightColor:that.config.contentBg});
            }
          that.position();
        },
        eventHandle: function(){
            var that = this;
            if(that.config.time) {
                setTimeout(function(){
                    that.close();
                },that.config.time);
            }
            if(that.closeBtn){
                that.closeBtnHandle();
            }
            that.btnsHandle();
            that.resize();
            that.move();
        },
        photoEventHandle:function(){
            var that = this;
            that.photoHover();
            that.photoChange();
            that.autoPlay();
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
            if(that.config.autoPlay){
                that.photoTimer = setTimeout(function(){
                    that.photoImgNext.click();
                },that.config.playTime);
            }
        },
        resize:function() {
            var that = this;
            if(that.config.resize) {
                utils.addEvent(window,'resize',function() {
                    that.position.apply(that);
                });
            }
        },
        move:function(){
            var that = this;
            if(that.layerTitle && that.config.move){
                that.layerTitle.onmousedown = function(ev){
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
            var that = this;
            if(that.config.width){
                that.layerCon.style.width = that.config.width;
            }
            if(that.config.height) {
                that.layerCon.style.height = that.config.height;
            }
            var setHeight = parseInt(that.config.height);
            if(that.layerTitle){
                setHeight -= 42;
            }
            if(that.layerBtnCON){
                setHeight -= 40;
            }
            utils.css(that.layerMain, {height: setHeight + 'px',lineHeight:'30px'});
            if(that.config.type === type[0] || that.config.type === type[1] || that.config.type === type[6]) {
                if(setHeight){
                    utils.css(that.layerMain, {height: setHeight + 'px'});
                    utils.css(that.layerMain, {lineHeight: setHeight + 'px'});
                }
            }
        },
        close: function() {
            var that = this;
            that.layer.style.display = 'none';
            that.layer.parentNode.removeChild(that.layer);
        },
        closeBtnHandle:function() {
            var that = this;
            utils.addEvent(that.closeBtn,'click',function(){
                that.layer.style.display = 'none';
                that.layer.parentNode.removeChild(that.layer);
            });
        },
        btnsHandle:function(){
            var that = this;
            if(that.layerBtns && that.config.btnCb) {
                for(var i = 0, max = that.layerBtns.length; i<max; i++){
                    if(that.layerBtns[i] && that.config.btnCb[i]){
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
            var that = this;
            var setTop = '';
            var setLeft = '';
            if(that.config.type === type[6]) {
                var parent = document.getElementById(this.config.tipsCon);
                var parentTop = parent.offsetTop;
                var parentLeft = parent.offsetLeft;
                var parentHeight = parent.offsetHeight;
                var parentWidth = parent.offsetWidth;
                var layerConHeight = that.layerCon.offsetHeight;
                var layerConWidth = that.layerCon.offsetWidth;
                var scrollLeft = document.body.scrollLeft || document.documentElement.scrollLeft;
                var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
                if(that.config.tipsPosition === 'left'){
                    setLeft = parentLeft - layerConWidth - 10 - scrollLeft+ 'px';
                    setTop = parentTop + (parentHeight-layerConHeight)/2 - scrollTop + 'px';
                    utils.css(that.layerCon, {left:setLeft,top:setTop});
                } else if(that.config.tipsPosition === 'top'){
                    setLeft = parentLeft + (parentWidth-layerConWidth)/2 -scrollLeft+ 'px';
                    setTop = parentTop - layerConHeight - 10 - scrollTop + 'px';
                    utils.css(that.layerCon, {left:setLeft,top:setTop});
                } else if(that.config.tipsPosition === 'right'){
                    setLeft =parentLeft + parentWidth + 10 -scrollLeft+ 'px';
                    setTop = parentTop + (parentHeight-layerConHeight)/2 - scrollTop + 'px';
                    utils.css(that.layerCon, {left:setLeft,top:setTop});
                }else if(that.config.tipsPosition === 'bottom'){
                    setLeft = parentLeft + (parentWidth-layerConWidth)/2 -scrollLeft+ 'px';
                    setTop = parentTop + parentHeight + 10- scrollTop + 'px';
                    utils.css(that.layerCon, {left:setLeft,top:setTop});
                }
                return;
            }
            var positionType = that.config.position;
            var layerHeight = that.layerCon.offsetHeight;
            var layerWidth = that.layerCon.offsetWidth;
            var winHeight = window.innerHeight;
            var winWidth = window.innerWidth;
            if(positionType === 'random'){
                setTop = utils.random(0,winHeight-layerHeight) + 'px';
                setLeft = utils.random(0,winWidth - layerWidth) + 'px';
                utils.css(that.layerCon, {left:setLeft,top:setTop});
            }
            if(positionType === 0) {
                setTop = (winHeight - layerHeight) / 2 + 'px';
                setLeft = (winWidth - layerWidth) / 2 + 'px';
                utils.css(that.layerCon, {left:setLeft,top:setTop});
            } else if(positionType === 1){
                utils.css(that.layerCon,{top:'0px',left:'0px'});
            } else if(positionType === 2) {
                setLeft = (winWidth - layerWidth) / 2 + 'px';
                utils.css(that.layerCon,{top:'0px',left:setLeft});
            } else if(positionType === 3) {
                utils.css(that.layerCon,{top:'0px',right:'0px'});
            } else if(positionType === 4) {
                utils.css(that.layerCon,{bottom:'0px',left:'0px'});
            } else if(positionType === 5) {
                setLeft = (winWidth - layerWidth) / 2 + 'px';
                utils.css(that.layerCon,{bottom:'0px',left:setLeft});
            } else if(positionType === 6) {
                utils.css(that.layerCon,{bottom:'0px',right:'0px'});
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