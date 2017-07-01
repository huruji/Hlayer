<p align="center">
    <img src="./hlayer.png">
</p>
<p align="center">
    <a href="https://github.com/huruji/Hlayer/network">
        <img src="https://img.shields.io/github/forks/huruji/Hlayer.svg"
             alt="forks">
    </a>
    <a href="https://github.com/huruji/Hlayer/stargazers">
        <img src="https://img.shields.io/github/stars/huruji/Hlayer.svg"
             alt="stars">
    </a>
    <a href="https://github.com/huruji/Hlayer/issues">
            <img src="https://img.shields.io/github/issues/huruji/Hlayer.svg"
                 alt="issues">
        </a>
    <a href="#">
        <img src="https://img.shields.io/badge/CSS-module-green.svg"
             alt="css">
    </a>
    <a href="#">
        <img src="https://img.shields.io/badge/HTML-module-brightgreen.svg"
             alt="HTML">
    </a>
    <a href="#">
            <img src="https://img.shields.io/badge/Size-mini-yellow.svg"
                 alt="HTML">
        </a>
    <a href="#">
            <img src="https://img.shields.io/badge/gulp-workflow-blue.svg"
                         alt="gulp">
    </a>
    <a href="#">
                <img src="https://img.shields.io/badge/Eslint-standard-green.svg">
    </a>
    <a href="#">
                <img src="https://img.shields.io/badge/Author-huruji-ff69b4.svg">
    </a>
    <a href="#">
                    <img src="https://img.shields.io/badge/Version-0.0.1-blue.svg">
        </a>

</p>

# Hlayer

[In English](./README.md)

## 安装

使用Npm

```sh
npm install hlayer
```

使用Yarn

```sh
yarn add hlayer
```

## 导入

```js
// ES6
import hlayer from 'hlayer',
import 'hlayer/dist/hlayer.css'
```

或者在html文件中使用

```js
<link href="dist/hlayer.css"></link>
<script src="dist/hlayer.js"></script>
```

## 使用

Hlayer中含有一个全局变量hlayer，所有的方法都在这个变量里

```js
hlayer.msg({text: 'message'})
```

所有的方法都可以传入一个含有很多字段的json对象

## API

### 1.msg

json字段：

```js
contentBg: String  // the background color of content, default #fff
contentColor: strgin   // the font color of content, defulat #000
animateType: Number  // the animation type, include 1-9, default 1
position: Number or 'random' // the position type, include 0-6, default 0
shadow: Bollean   // shadow or not, default true
icon: Number    // the icon type, include 1-8, default false
text: String   // the content
width: String   // layer width, default auto
height: String   // layer height, default '50px'
time: Number     // time of show, default 2000, if 'false', the layer can't close auto
```

### 2.alert

json字段：

```js
contentBg: String  // the background color of content, default #fff
contentColor: strgin   // the font color of content, defulat #000
animateType: Number  // the animation type, include 1-9, default 1
position: Number or 'random' // the position type, include 0-6, default 0
resize: Bollean   // resize position with window resized, default true
shadow: Bollean   // shadow or not, default true
icon: Number    // the icon type, include 1-8, default false
text: String   // the content
width: String   // layer width, default '260px'
height: String   // layer height, default '148px'
time: Number     // time of show, default 2000, if 'false', the layer can't close auto
mainBg: String    // background color of title
mainColor: String   // font color of title
title: String   // title Content
closeBtn: Bollean  // need close button or not, default true
move: Bollean   // can drag layer or not, default true
confirmBtn: Bollean  // need confirm button or not, default true
confirmCb: Function   // the callback of confirm button
cancelBtn: Function   // need cancel buttton or not, default false
btn: Array    // the Btns you need
btnCb: Array   // the callbacks of btns
```

### 3.loading

json字段：

```js
animateType: Number  // the animation type, include 1-9, default 1
position: Number or 'random' // the position type, include 0-6, default 0
resize: Bollean   // resize position with window resized, default true
shadow: Bollean   // shadow or not, default true
time: Number     // time of show, default 2000,
loadingType: Number    // include 1-4, default 1
loadingColor: String  //  the color, default #169FE6
```

### 4.iframe

json字段：

```js
animateType: Number  // the animation type, include 1-9, default 1
position: Number or 'random' // the position type, include 0-6, default 0
resize: Bollean   // resize position with window resized, default true
shadow: Bollean   // shadow or not, default true
width: String   // layer width, default '700px'
height: String   // layer height, default '500px'
time: Number     // time of show, default false,
mainBg: String    // background color of title， default #169FE6
mainColor: String   // font color of title， default #fff
title: String   // title Content
closeBtn: Bollean  // need close button or not, default true
move: Bollean   // can drag layer or not, default true
url: String     // website url
```

### 5.form

json字段：

```js
contentBg: String  // the background color of content, default #fff
contentColor: strgin   // the font color of content, defulat #000
animateType: Number  // the animation type, include 1-9, default 1
position: Number or 'random' // the position type, include 0-6, default 0
resize: Bollean   // resize position with window resized, default true
shadow: Bollean   // shadow or not, default true
text: String   // the content
width: String   // layer width, default '260px'
height: String   // layer height, default '148px'
time: Number     // time of show, default false
mainBg: String    // background color of title
mainColor: String   // font color of title
title: String   // title Content
closeBtn: Bollean  // need close button or not, default true
move: Bollean   // can drag layer or not, default true
confirmBtn: Bollean  // need confirm button or not, default true
confirmCb: Function   // the callback of confirm button
cancelBtn: Function   // need cancel buttton or not, default false
btn: Array    // the Btns you need
btnCb: Array   // the callbacks of btns
formType: Number     // include 1-5 default 1
options: Object  // only use when formType is 4 or 5, like {name:'sex', inputs: ['male', 'female']}
allowEmpty: Bollean  // can be empty, defult true

```

### 6.photo

json字段：

```js
animateType: Number  // the animation type, include 1-9, default 1
position: Number or 'random' // the position type, include 0-6, default 0
resize: Bollean   // resize position with window resized, default true
shadow: Bollean   // shadow or not, default true
autoPlay: Bollean  // play auto, default false
playTime: Number  // default 5000
photos: Array    // like [{img: '1.jpg', text: 'hello'}, {img: '2.jpg', text: 'world'}]
```

### 7.tips

json字段：

```js
contentBg: String  // the background color of content, default #fff
contentColor: strgin   // the font color of content, defulat #000
animateType: Number  // the animation type, include 1-9, default 1
position: String // only use 'left', 'top', 'right', 'left'
icon: Number    // the icon type, include 1-8, default false
text: String   // the content
width: String   // layer width, default auto
height: String   // layer height, default '40px'
time: Number     // time of show, default 2000, if 'false', the layer can't close auto
```

### 8.music

json字段：

```js
contentBg: String  // the background color of content, default #fff
contentColor: strgin   // the font color of content, defulat #000
animateType: Number  // the animation type, include 1-9, default 1
position: Number or 'random' // the position type, include 0-6, default 0
shadow: Bollean   // shadow or not, default true
resize: Bollean   // resize position with window resized, default true
time: Number     // time of show, default false
mainBg: String    // background color of title
mainColor: String   // font color of title
title: String   // title Content
closeBtn: Bollean  // need close button or not, default true
move: Bollean   // can drag layer or not, default true
photos: String   // img of music
url: String   // music url
autoPlay: Bollean // default true
```

### 9.music

json字段：

```js
contentBg: String  // the background color of content, default #fff
contentColor: strgin   // the font color of content, defulat #000
animateType: Number  // the animation type, include 1-9, default 1
position: Number or 'random' // the position type, include 0-6, default 0
shadow: Bollean   // shadow or not, default true
resize: Bollean   // resize position with window resized, default true
time: Number     // time of show, default false
mainBg: String    // background color of title
mainColor: String   // font color of title
title: String   // title Content
closeBtn: Bollean  // need close button or not, default true
move: Bollean   // can drag layer or not, default true
photos: String   // img of music
url: String   // music url
autoPlay: Bollean // default true
```

### 10.open

使用open方法调用以上任意一种弹出框

```js
hlayer.open({type: 'msg', //other msg params})
```

### 11.remove

移除弹出框

可以移除一个指定的弹出框

```js
var layer1 = hlayer.msg();
hlayer.remove(layer1)
```

移除几个指定的弹出框

```js
var layer1 = hlayer.msg();
var layer2 = hlayer.msg();
hlayer.remove(layer1, layer2)
```

移除全部弹出框

```js
halyer.remove();
```