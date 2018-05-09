import React from 'react'
import { Menu,Layout,Tooltip,Dropdown ,Message} from 'element-react';
import './Top.css'
import {Link} from 'react-router-dom'
import {Icon} from 'antd'
import screenfull from 'screenfull'
export default class Top extends React.Component {
  state={
    current:'0',
    screenMsg:'全屏'
  }
  HandleSelect(index){
    this.setState({
      current:index
    })
    this.props.getCurrent(index)
  }
  handleScreenfull(){
    if (screenfull.enabled) {
      Message({
        message: '您的浏览器不支持全屏显示',
        type: 'warning'
      })
      return false
    }
    if (this.state.screenMsg === '全屏') {
      this.setState({
        screenMsg:'恢复'
      })
    } else {
      this.setState({
        screenMsg:'全屏'
      })
    }
    screenfull.toggle()
  }
  render(){
    return (
    <div className="panel-top">
        <Layout.Row>
            <Layout.Col span="4"><div >中糖在线询价订购系统</div></Layout.Col>
            <Layout.Col span="12">
              <Menu mode="horizontal" defaultActive={this.state.current} onSelect={this.HandleSelect.bind(this)}>
                {
                  this.props.menus.map((item,index)=>{
                    return (<Menu.Item  key={index} index={index.toString()}>
                          <Link to={item.child[0].url} >
                          {item.title}
                          </Link> 
                    </Menu.Item>)

                  })
                }
               
              </Menu>
              
            </Layout.Col>
            <Layout.Col span="8">
              <div className="account-option">
                <Dropdown className="dropdown" menu={(
                  <Dropdown.Menu>
                    <Dropdown.Item>修改密码</Dropdown.Item>
                    <Dropdown.Item divided>退出登录</Dropdown.Item>
                  </Dropdown.Menu>
                  )}
                >
                  <div className="el-dropdown-link">
                  <Icon type="user-add" />13121554252
                  </div>
                </Dropdown>
                <Tooltip className="tip"  effect="dark" content={this.state.screenMsg} placement="bottom">
                  <Icon type="global" onClick={this.handleScreenfull.bind(this)}/>
                </Tooltip>
                <Tooltip className="tip" effect="dark" content="退出" placement="bottom">
                  <Icon type="poweroff" />
                </Tooltip>
              </div>
              </Layout.Col>
        </Layout.Row>
    </div>)
  }
}