import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter,Switch,Route,HashRouter} from 'react-router-dom'
//import ReactCSSTransitionGroup from 'react-addons-css-transition-group'    //router过度动画插价
import Login from './components/Login';
import Register from './components/Register';
import { message } from 'antd';
import registerServiceWorker from './registerServiceWorker';
window.$message=message;
message.config({
    top: 100,
    duration: 3,
    maxCount: 3,
    getContainer:()=>document.getElementById('root')
});
ReactDOM.render(
    // <BrowserRouter>只能有一个子节点
    <BrowserRouter>    
        <Switch>   
            <Route exact path="/login" component={Login}/>
            <Route exact path="/register" component={Register}/>
            <Route  component={App}/>
             
        </Switch>   
    </BrowserRouter>
    ,
     document.getElementById('root'));
registerServiceWorker();
 