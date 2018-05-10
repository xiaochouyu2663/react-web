import React,{Component} from 'react'
import {Form,Input,Button,Checkbox} from 'element-react'
import './Login.css'
import http from '../../until/js/http'
import Lockr from 'lockr'
export default class Login extends Component{
    constructor(props) {
        super(props);
      
        this.state = {
            title:'',
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
    }
    login(e){
        e.preventDefault();
        this.refs.form.validate((valid) => {
            if (valid) {
                var data = this.state.form
                http.apiPost('admin/base/login',data)
                .then(res=>{
                    this.setState({
                        loading:false
                    })
                    if(res.code==200){
                        window.$message.success('登录成功')
                        Lockr.set('authKey',res.data.authKey)
                        Lockr.set('authList',res.data.authList)
                        Lockr.set('menusList',res.data.menusList)
                        Lockr.set('sessionId',res.data.sessionId)
                        Lockr.set('userInfo',res.data.userInfo)
                        this.props.history.push('/')  
                    }else {
                        window.$message.error(res.error)
                    }
                })
            } else {
                return false;
            }
        });
    }
    render (){
        return (
            
            <div className="login-box">
                <h2 className="title">{this.state.title}</h2>
                <Form ref="form" model={this.state.form} labelWidth="50" rules={this.state.rules} >
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
    componentDidMount(){
        this.getConfigs()
    }
    getConfigs(){
        http.apiPost('admin/base/getConfigs')
        .then(res=>{
            console.log(res)
            if(res.code===200){
                this.setState({
                    title:res.data.SYSTEM_NAME
                })
            }
        })
    }
} 