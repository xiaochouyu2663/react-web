import React,{Component} from 'react'
import {Form,Input,Button,Checkbox,Message} from 'element-react'
import {BrowserRouter as Router,Route,Redirect,Switch } from 'react-router-dom'
import './Login.css'
import http from '../../until/js/http'
import App from '../../App';
export default class Login extends Component{
    constructor(props) {
        super(props);
      
        this.state = {
            logined:true,
            loading:false,
            form: {
                username: null,
                password: null
            },
            rules:{
                username: [
                    { required: true, message: '请输入账号', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'change' }
                ],
            }
        };
      }
    onChange(key, value) {
    this.setState({
        form: Object.assign(this.state.form, { [key]: value })
        });
        console.log(this.state.form)
    }
    login(e){
        e.preventDefault();
        console.log(this.refs)
        this.refs.form.validate((valid) => {
            if (valid) {
            this.setState({
                loading:true
            })
            var data = this.state.form
            http.apiPost('admin/base/login',data)
            .then(res=>{
                this.setState({
                    loading:false
                })
                console.log(res)
                if(res.code==200){
                    Message({
                        message:'登录成功',
                        type:'success'
                    })
                    this.setState({
                        logined:true
                    })
                }else {
                    Message({
                        message:res.error,
                        type:'error'
                    })
                }
            })
            } else {
                return false;
            }
        });
        
    }
    render (){
        if(this.state.logined){
            return (
                <Router>
                  <Switch>
                  
                  <Route exact path="/" component={App}/>
                    <Redirect to="/"/>
                  </Switch>
                  
               </Router>
              )
        }
        return (
            <div className="login-box">
                <h3 className="title">xxxxxxxx</h3>
                <Form ref="form" model={this.state.form} labelWidth="50" rules={this.state.rules}>
                <Form.Item label="账号" prop="username">
                    <Input onChange={this.onChange.bind(this,'username')} value={this.state.form.username} placeholder="请输入用户名" ></Input>
                </Form.Item>
                <Form.Item label="密码" prop="password">
                    <Input onChange={this.onChange.bind(this,'password')} value={this.state.form.password} placeholder="请输入密码"></Input>
                </Form.Item>
                <Form.Item labelWidth="10">
                <Checkbox checked>记住密码</Checkbox>
                </Form.Item>
                <Form.Item labelWidth="0">
                <Button loading={this.state.loading} className="login" onClick={this.login.bind(this)} type="primary">登 录</Button>
                </Form.Item>
                </Form>
            </div>
        )
    }
} 