English | [简体中文](./README_CN.md)

# react-loading-transition

[![npm](https://img.shields.io/npm/v/react-loading-transition.svg)](https://www.npmjs.com/package/react-loading-transition) [![Downloads per month](https://img.shields.io/npm/dm/react-loading-transition.svg)](https://www.npmjs.com/package/react-loading-transition) [![dependencies](https://david-dm.org/HelloAny/react-loading-transition.svg)](https://david-dm.org/HelloAny/react-loading-transition)[![min](https://img.shields.io/bundlephobia/min/react-loading-transition.svg)](https://www.npmjs.com/package/react-loading-transition)[![minzip](https://img.shields.io/bundlephobia/minzip/react-loading-transition.svg)](https://www.npmjs.com/package/react-loading-transition)

> 🎉  A page loading animation plugin for React 🤟


Demo:

 https://codesandbox.io/s/vibrant-galileo-6byby



Install：

 `npm install react-loading-transition`



### 1.LoadTransition

This component is to provide a global loading animation, including the component in all `route` and ensure that the loading animation and `route` are in the same subtree.

#### loadNode 

> Type: elementType

A loading animation component is provided from the outside. In the component, `isload` is provided as a hook to judge whether the animation is loaded or not. There is no default value.

#### appear

> Type: bool

Whether the animation is loaded when the page is loaded for the first time. The default value is ` false `.

#### mintime

> Type: number

The shortest time for animation loading to prevent animation flashing caused by clicking on the same route or loading too fast. The default value is ` 1000`.



### 2.LoadMotion

It is included in the `route` page where you want to set the animation effect

#### in

> Type: bool

This value refers to the principle that `react-transition-group` is compatible with `react route`. At present, we can't think of a better solution by passing the` props.match `To determine whether it is a matching route

Example

```javascript
<Route path="/">
  {
    (props)=>(
      <LoadMotion in={props.match !== null}> //control
        <Component />
      </LoadMotion>
    )
  }  
</Route>
```

#### timeout

> Type: number

Controls the delayed jump of the page. It is manually set by the user. The default value is ` 0`.



### 3.domotion

> Param: bool

Trigger the animation function and provide a parameter to execute the animation when it is' true 'and exit the animation when it is `false`.

### 4.react-router

In the project, there are many plug-ins for route jump animation of `react router`, such as ` react-transition-group `, `react-motion `,  etc., but there is no similar cover animation because `react loading transition  `came into being.

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



### 5.Iteration

This plug-in is still in the initial iteration state and will be released in the official version.

- [ ] 
- [ ] React Hooks
- [ ] Integrated animation
- [ ] Error test
- [ ] state asynchronous rendering optimization