import React,{Component} from 'react'
import {Route } from 'react-router-dom'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import http from '../../until/js/http'
import Rules from '../Rules';
const Topics = (props) => {      //函数式组件 函数式组件，不能用this.props，需要通过参数获得
    return (
        <div>
          <h3>参数</h3>
        </div>
    )
  }
  const Home = ({ match,location }) => (
    <div>
      {console.log('home组件的match',match,location)}
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

export default class Main extends Component {
   constructor(props){
       super(props)
   }
   shouldComponentUpdate(nextProps,nextState){
       console.log(nextProps)
       return true;
   }
    render(){
        return (
            <ReactCSSTransitionGroup style={{backgroundColor:'#fff',minHeight:'480px'}}
                  component="div"
                  className="react-container"
                  transitionName="fade"
                  transitionEnterTimeout={500}
                  transitionLeaveTimeout={300}>
                <div className={`section-main ${this.props.location.pathname}`} key={this.props.location.pathname} >
                <Route exact path="/:id" component={Home}/>
                <Route exact path="/cms/home/dashboard/list" component={Home}/>
                <Route exact path="/cms/pudu/configs" component={Topics}/>
                <Route exact path="/cms/pudu/city" component={Account}/>
                <Route exact path="/cms/home/rule/list" component={Rules}/>
                {/* <Route path="*" component={NoFound}/> */}
                </div>
                </ReactCSSTransitionGroup>
        )
    }
    
}