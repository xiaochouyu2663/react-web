import React, { Component } from 'react';
import './App.css';
import 'element-theme-default';
import Top from './components/Top';
import Left from './components/Left';
import Main from './components/Main';
// import Login from './components/Login';
// import NoFound from './components/NoFound';

import Lockr from 'lockr'
import 'antd/dist/antd.css';  // or 'antd/dist/antd.less'
import { Breadcrumb } from 'antd';
import {Link} from 'react-router-dom'
import {Route } from 'react-router-dom'

import http from './until/js/http'


class App extends Component {
  
  constructor(props){
    super(props)
    var menus = JSON.parse(window.localStorage.getItem('menus'));
    this.state={
      menus:menus,
      subMenus:menus[0].child,
      breadcrumb:[]
    }
    
    this.leftMenus=menus[0].child
  }
  componentDidMount(){
    console.log(this.props)
    var userInfo = Lockr.get('userInfo')
    if(!userInfo){
      
      console.log(window)
      window.$message.warn('您还没登录！',2,()=>this.props.history.replace('./login'));
    }
    var menus = JSON.parse(window.localStorage.getItem('menus'));
    this.setState({
      menus:menus,
      subMenus:menus[0].child,
      breadcrumb:[menus[0],menus[0].child[0]
      ]
    })

  }
  shouldComponentUpdate(nextProps,nextState){
    
    var differentSubMenus = this.state.subMenus !== nextState.subMenus;
    var differentBreadcrumb = this.state.breadcrumb !== nextState.breadcrumb;
    
    if(differentSubMenus){
      
      return false
    }else{
      return true;
    }
      
  }
  getCurrentMenu(val){
    this.setState({
      subMenus:this.state.menus[val].child,
      // breadcrumb:[this.state.menus[val],this.state.menus[val].child[0]]
    })
  }
  _getLeftMenu(val){
    var index,second,breadcrumb=this.state.breadcrumb;
    
    if(val.indexOf('-')===-1){
      index = val;
      breadcrumb[1]=this.state.subMenus[index];
    }else{
      index = val.slice(0,val.indexOf('-'))
      second = val.slice(val.indexOf('-')+1)
      breadcrumb[1]=this.state.subMenus[index];
      breadcrumb[2]=this.state.subMenus[index].child[second];
      
    }
    this.setState({
      breadcrumb:breadcrumb
    })
  }
  render() {
      console.log('组件App渲染')
      return (
          <div className="panel-box">
            <Top menus={this.state.menus} getCurrent={this.getCurrentMenu.bind(this)}/>
            <div className="panel-main">
              <Left left-menu={this.state.subMenus} getLeftMenu={this._getLeftMenu.bind(this)}/>
              <div className="section">
                <Breadcrumb separator="/">
                  {
                    this.state.breadcrumb.map((_,i)=>{
                      return (
                        <Breadcrumb.Item key={i}>
                        <Link to={_.url}>{_.title}</Link>
                        </Breadcrumb.Item>
                      )
                    })
                  }
                </Breadcrumb>
                <Main location={this.props.location}/>
              </div>
            </div>
          </div>
      )
    
  }
}

export default App;
