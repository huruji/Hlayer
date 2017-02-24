(function(){
    var type = ['msg','alert','loading','iframe','tips'],
        utils = {
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
                    ele['on' + event] = null
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
        };
    var dom = {
        body: document.body
    };
    var hlayer = {
        index: 100000,
        times:0,
        msg: function(config) {
            var noChangeCfg = {type:'msg',title:false,btn:false};
            var changeCfg = {icon:false,height:'40px',time:2000};
            var setting = utils.mergeJson(changeCfg, config, noChangeCfg);
            new Cla(setting);
        },
        alert: function(config) {
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
        loading: function(config){
            var noChangeCfg = {type:'loading',icon:false,title:false,btn:false,text:false};
            var changeCfg = {height:'100px',width:'100px',time:2000,shadow:false};
            var setting = utils.mergeJson(changeCfg,config,noChangeCfg);
            new Cla(setting);
        }
    };
         function Cla(setting) {
            this.index = ++hlayer.index;
            this.config = utils.mergeJson(this.defaultConfig, setting, this.index);
            this.init();
        };
        Cla.prototype = {
            init:function(){
                this.times = ++hlayer.times;
                this.layer = utils.creEle('div', 'hlayer hlayer' + this.times, 'hlayer' + this.times);
                dom.body.appendChild(this.layer);
                this.layerCon = utils.creEle('div', 'hlayer-content hlayer-' + this.config.type + ' hlayer-animate' + this.config.animateType);
                this.layer.appendChild(this.layerCon);
                this.layer.style.zIndex = ++hlayer.index;
                console.dir(this.config);
                this.layout();
                this.setStyle();
                this.eventHandle();
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
            position: function() {
                var positionType = this.config.position;
                var layerHeight = this.layerCon.offsetHeight;
                var layerWidth = this.layerCon.offsetWidth;
                var winHeight = window.innerHeight;
                var winWidth = window.innerWidth;
                var setTop = '';
                var setLeft = '';
                if(positionType === 0) {
                    setTop = (winHeight - layerHeight) / 2 + 'px';
                    setLeft = (winWidth - layerWidth) / 2 + 'px';
                    console.log(setTop);
                    utils.css(this.layerCon, {left:setLeft,top:setTop})
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
            setStyle:function(){
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
                console.log(setHeight);
                utils.css(this.layerMain,{height:setHeight + 'px',lineHeight:setHeight + 'px'});
                if(this.config.type === type[0]){
                    utils.css(this.layerMain,{textAlign:'center'});
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
            },
            btnsHandle:function(){
                var that = this;
                if(this.layerBtns && this.config.btnCb) {
                    for(var i = 0, max = this.layerBtns.length; i<max; i++){
                        if(this.layerBtns[i] && this.config.btnCb[i]){
                            (function(i){
                                utils.addEvent(that.layerBtns[i],'click',function(){
                                    that.close();
                                    that.config.btnCb[i]();
                                });
                            })(i)
                        }
                    }
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
                    this.layerMain.textContent = this.config.text;
                }
                if(this.config.icon!== false){
                    this.layerMain.style.paddingLeft = '48px';
                    this.layerIcon = utils.creEle('div','hlayer-icon hlayer-icon' + this.config.icon);
                    this.layerMain.appendChild(this.layerIcon);
                }
                if(this.config.btn) {
                    this.layerBtnCON = utils.creEle('div', 'hlayer-content-btns hlayer-' + this.config.type + '-content-btns');
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
                    this.closeBtn = utils.creEle('div', 'hlayer-close hlayer-' + this.config.type + 'close');
                    this.layerCon.appendChild(this.closeBtn);
                }
                if(this.config.loadingType && this.config.type == type[2]){
                    this.loading = utils.creEle('div','hlayer-content-load hlayer-content-load' + this.config.loadingType);
                    if(this.config.loadingType === 1){
                        for (var i = 0; i < 8; i++) {
                            var div = utils.creEle('div');
                            this.loading.appendChild(div);
                        }
                        this.layerMain.appendChild(this.loading);
                    }
                }
            },
            defaultConfig: {
                mainBg: '#51B1D9',
                mainColor: '#fff',
                title: '信息',
                text: '提示信息',
                width: '',
                height: '',
                confirmBtn: true,
                confirmCb: false,
                cancelBtn: false,
                cancelCb: false,
                animateType: 1,
                position: 0,
                shadow:true,
                time: false,
                loadingType:1
            },
        }
    window.hlayer = hlayer
})(window);