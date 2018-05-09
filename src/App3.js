import React, { Component } from 'react';
import './App.css';
// import Top from './components/Top';
// import Left from './components/Left';
import { Layout, Menu,Row, Col } from 'antd';
// const { SubMenu } = Menu;

import 'antd/dist/antd.css';  // or 'antd/dist/antd.less'
// 由于 antd 组件的默认文案是英文，所以需要修改为中文
// import zhCN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
const { Header, Content, Sider ,Footer} = Layout;
moment.locale('zh-cn');
class App extends Component{
  
  state = {
    menus:[],
    subMenus:[],
    current: '0',
  }

  handleClick = (e) => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  }
  render(){
    return(
      <Layout>
      <Header>
        <div style={{width:'1200px',margin:'0 auto'}}>
        <Row>
        <Col span={4}>中糖在线询价订购系统</Col>
        <Col span={12}>
        <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal" >
          {
            this.state.menus.map((item,index)=>{
              return (<Menu.Item  key={index} >
                    {item.title}
              </Menu.Item>)
            })
          }
        </Menu>
        </Col>
        <Col span={8}>13121554252  退出</Col>
      </Row>
        </div>
        
      </Header>
      <Layout>
        <Sider>Sider</Sider>
        <Content>Content</Content>
      </Layout>
      <Footer>Footer</Footer>
    </Layout>
    )
  }
  componentDidMount(){
    var menus = JSON.parse(window.localStorage.getItem('menus'));
    this.setState({
      menus:menus,
      subMenus:menus[0].child
    })
  }
}
export default App;
