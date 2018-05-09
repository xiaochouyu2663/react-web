import React, { Component } from 'react';
import './App.css';
import 'element-theme-default';
import Top from './components/Top';
import Left from './components/Left';
import Login from './components/Login';
// import { Breadcrumb } from 'element-react';
import 'antd/dist/antd.css';  // or 'antd/dist/antd.less'
import { Breadcrumb } from 'antd';
import {Link} from 'react-router-dom'
import {BrowserRouter as Router,Route,Redirect,Switch } from 'react-router-dom'

import http from './until/js/http'
const Topics = ({ match }) => (
  <div>
    <h3>参数</h3>
  </div>
)
const Home = ({ match }) => (
  <div>
    <h3>后台首页</h3>
  </div>
)

class Account extends Component{
  
  render(){
    return ( 
      <div> 
        <h3>账户</h3>
      </div>
    )
  }
}
class App extends Component {
  
  constructor(props){
    super(props)

    this.state={
      current:'0',
      menus:[],
      subMenus:[],
      breadcrumb:[],
      logined:true
    }
    var menus = JSON.parse(window.localStorage.getItem('menus'));
    this.leftMenus=menus[0].child
  }
  componentDidMount(){
    var menus = JSON.parse(window.localStorage.getItem('menus'));
    console.log(menus)
    this.setState({
      menus:menus,
      subMenus:menus[0].child,
      breadcrumb:[menus[0],menus[0].child[0]
      ]
    })
    http.apiPost('admin/base/getConfigs')
    .then(res=>console.log(res))


  }
  getCurrentMenu(val){
    this.setState({
      subMenus:this.state.menus[val].child,
      breadcrumb:[this.state.menus[val],this.state.menus[val].child[0]]
    })
  }
  _getLeftMenu(val){
    console.log(this.state.subMenus)
    var index,second,breadcrumb=this.state.breadcrumb;
    
    if(val.indexOf('-')===-1){
      index = val;
      console.log(index);
      breadcrumb[1]=this.state.subMenus[index];
    }else{
      index = val.slice(0,val.indexOf('-'))
      console.log(index);
      second = val.slice(val.indexOf('-')+1)
      console.log(second);
      breadcrumb[1]=this.state.subMenus[index];
      breadcrumb[2]=this.state.subMenus[index].child[second];
      
    }
    console.log()
    this.setState({
      breadcrumb:breadcrumb
    })
  }
  render() {
    if(this.state.logined) {
      return (
        <Router>
          <Switch>
          
          <Route exact path="/login" component={Login}/>
          <Redirect to="/login"/>
          </Switch>
          
       </Router>
      )
     }
    return (
    <Router>
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
            <div className="section-main">
            <Route exact path="/" component={Home}/>
            <Route exact path="/cms/home/dashboard/list" component={Home}/>
            <Route exact path="/cms/pudu/configs" component={Topics}/>
            <Route exact path="/cms/pudu/city" component={Account}/>
            </div>
          </div>
        </div>
      </div>
    </Router>
      
    );
  }
}

export default App;
