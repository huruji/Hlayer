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

[以中文查看](./README_zh-CN.md)

## Install

install with npm

```sh
npm install hlayer
```

install width yarn

```sh
yarn add hlayer
```

## Import

```js
// ES6
import hlayer from 'hlayer',
import 'hlayer/dist/hlayer.css'
```

or link as a `script` and `link` in an html file.

```js
<link href="dist/hlayer.css"></link>
<script src="dist/hlayer.js"></script>
```

## How to use

Hlayer include a global variable 'hlayer', and this variable include all APIS.

Just like this, you can use function 'msg'

```js
hlayer.msg({text: 'message'})
```

Every function include many params, you can see API

## API

### 1.msg

The simplest alert.

The params:

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

The alert with title and buttons.

The params:

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

The loading alert.

The params:

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

The params:

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

The params:

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

use like slider alert

The params:

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

tips alert

The params:

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

music alert

The params:

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

music alert

The params:

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

use this like

```js
hlayer.open({type: 'msg', //other msg params})
```

### 11.remove

remove the layer

you can use to remove a layer

```js
var layer1 = hlayer.msg();
hlayer.remove(layer1)
```

you can use to remove many layers

```js
var layer1 = hlayer.msg();
var layer2 = hlayer.msg();
hlayer.remove(layer1, layer2)
```

you can use to close all layers

```js
halyer.remove();
```