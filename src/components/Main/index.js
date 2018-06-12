import React,{Component} from 'react'
import {Route,Switch } from 'react-router-dom'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import Rules from '../Rules';
import NoFound from '../NoFound';
import VisibleTodoList from '../../container/VisibleTodoList'
import AddTodo from '../../container/AddTodo'
const Topics = (props) => {      //函数式组件 函数式组件，不能用this.props，需要通过参数获得
    return (
        <div>
          <h3>参数</h3>
        </div>
    )
  }
  const Home = ({ match,location }) => (
    <div>
    <AddTodo></AddTodo>
      <VisibleTodoList></VisibleTodoList>
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
    render(){
        return (
            <ReactCSSTransitionGroup style={{backgroundColor:'#fff',minHeight:'580px',marginTop:'20px'}}
                  component="div"
                  className="react-container"
                  transitionName="fade"
                  transitionEnterTimeout={500}
                  transitionLeaveTimeout={300}>
                <Switch className={`section-main ${this.props.location.pathname}`} key={this.props.location.pathname} >
                <Route exact path="/" component={Home}/>
                <Route exact path="/cms/home/dashboard/list" component={Home}/>
                <Route exact path="/cms/pudu/configs" component={Topics}/>
                <Route exact path="/cms/pudu/city" component={Account}/>
                <Route exact path="/cms/home/rule/list" component={Rules}/>
                <Route exact path="/cms/app/orders" render={() => <h1>订单组件</h1>} />
                <Route component={NoFound}/>
                </Switch>
                </ReactCSSTransitionGroup>
        )
    }
    
}