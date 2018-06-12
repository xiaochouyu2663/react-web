import React, { Component } from 'react';
import './App.css';
import 'element-theme-default';
import Top from './components/Top';
import Left from './components/Left';
import Main from './components/Main';
// import Login from './components/Login';
// import NoFound from './components/NoFound';

import {Provider} from 'react-redux'

import Lockr from 'lockr'
import 'antd/dist/antd.css';  // or 'antd/dist/antd.less'
import { Breadcrumb } from 'antd';

import { createStore } from 'redux'
import todoReducer from './reducer'
import {
  addTodo,
  toggleTodo,
  setVisibilityFilter,
  VisibilityFilters
} from './action'
let store = createStore(todoReducer)

console.log(store.getState())
const unsubscribe = store.subscribe(() =>
  console.log(store.getState())
)

store.dispatch(addTodo('Learn about actions'))
store.dispatch(addTodo('Learn about reducers'))
// store.dispatch(setVisibilityFilter(VisibilityFilters.SHOW_COMPLETED))
// store.dispatch(toggleTodo(1))
class App extends Component {
  
  constructor(props){
    super(props)
    let menus = Lockr.get('menusList');
    this.menus=menus
    this.subMenus=menus[0].child
    this.breadcrumb=[menus[0],menus[0].child[0]]
  }
  componentDidMount(){
    var userInfo = Lockr.get('userInfo')
    if(!userInfo){
      window.$message.warn('您还没登录！',2,()=>this.props.history.replace('/login'));
    }
  }
  shouldComponentUpdate(nextProps,nextState){
      return true;
  }
  getCurrentMenu(val){
    this.subMenus=this.menus[val].child
    this.breadcrumb=[this.menus[val],this.menus[val].child[0]]
  }
  _getLeftMenu(val){
    var index,second,breadcrumb=this.breadcrumb;
    
    if(val.indexOf('-')===-1){
      index = val;
      breadcrumb[1]=this.subMenus[index];
    }else{
      index = val.slice(0,val.indexOf('-'))
      second = val.slice(val.indexOf('-')+1)
      breadcrumb[1]=this.subMenus[index];
      breadcrumb[2]=this.subMenus[index].child[second];
      
    }
   
    this.breadcrumb=breadcrumb
  }
  render() {
      return (
        <Provider store={store}>
          <div className="panel-box">
            <Top menus={this.menus} getCurrent={this.getCurrentMenu.bind(this)}/>
            <div className="panel-main">
              <Left left-menu={this.subMenus} getLeftMenu={this._getLeftMenu.bind(this)}/>
              <div className="section">
                <Breadcrumb separator="/">
                  {
                    this.breadcrumb.map((_,i)=>{
                      return (
                        <Breadcrumb.Item key={i}>
                        {_.title}
                        </Breadcrumb.Item>
                      )
                    })
                  }
                </Breadcrumb>
                <Main location={this.props.location}/>
              </div>
            </div>
          </div>
          </Provider>
      )
    
  }
}

export default App;
