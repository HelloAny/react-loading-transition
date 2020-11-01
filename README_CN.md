# react-loading-transition

[![npm](https://img.shields.io/npm/v/react-loading-transition.svg)](https://www.npmjs.com/package/react-loading-transition) [![Downloads per month](https://img.shields.io/npm/dm/react-loading-transition.svg)](https://www.npmjs.com/package/react-loading-transition) [![dependencies](https://david-dm.org/HelloAny/react-loading-transition.svg)](https://david-dm.org/HelloAny/react-loading-transition)[![min](https://img.shields.io/bundlephobia/min/react-loading-transition.svg)](https://www.npmjs.com/package/react-loading-transition)[![minzip](https://img.shields.io/bundlephobia/minzip/react-loading-transition.svg)](https://www.npmjs.com/package/react-loading-transition)

> 🎉 基于react-router的页面动画切换插件 🤟


Demo:

 https://codesandbox.io/s/vibrant-galileo-6byby



安装：

 `npm install react-loading-transition`



### 1.LoadTransition

此组件是提供一个全局的Loading动画，将该组件包含在全部的`Route`外来保证Loading Animation与`Route`在同一子树下。

#### loadNode 

> Type: elementType

从外部提供一个Loading动画组件，组件内将提供了`isload`作为判断动画是否加载的钩子，无默认值。

#### appear

> Type: bool

动画是否在首次加载页面时加载，默认值为`false`

#### mintime

> Type: number

动画加载的最短时间，防止同路由点击或者加载速度过快导致的动画闪动，默认值为`1000`



### 2.LoadMotion

包含在你想设置动画效果的页面`Route`外

#### in

> Type: bool

这个值参考了`react-transition-group`兼容`react-route`的原理，目前想不到更优秀的解决方案，通过传递`Route`内的`props.match`来判断是否为匹配路由，

Example

```javascript
<Route path="/">
  {
    (props)=>(
      <LoadMotion in={props.match !== null}> //传参控制
        <Component />
      </LoadMotion>
    )
  }  
</Route>
```

#### timeout

> Type: number

控制页面的延迟跳转，由用户手动设置，默认值`0`。



### 3.domotion

> Param: bool

触发动画函数，提供一个参数，当为`true`时执行动画，为`false`时退出动画

### 4.配合react-router

在项目中，`react-router`的路由跳转动画有着许多插件，例如`react-transition-group`、`react-motion`等，但是却没有类似的cover动画，因为`react-loading-transition`应运而生。

```javascript
import {BrowserRouter, Route} from "react-router-dom"
import {LoadTransition, LoadMotion} from "react-loading-transition"
import Loading from "loading.js"
<BrowserRouter>
  <LoadTransition loadNode={Loading}>
    <Route path="/" exact>
      {
       ({match}=>(
         <LoadMotion in={match!==null} timeout={1000}>
           <Component />
         </LoadMotion>
       ))
      }
    </Route>
  </LoadTransiton>
</BrowserRouter>
```



### 5.版本迭代

本插件目前还在初步迭代状态，在正式版本中将会推出

- [ ] 
- [ ] React Hooks
- [ ] 集成动画
- [ ] 错误测试
- [ ] state异步渲染优化