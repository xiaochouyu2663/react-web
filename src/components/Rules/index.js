import React,{Component} from 'react'
import {Table,Icon,Spin ,Divider ,Button } from 'antd'
import http from '../../until/js/http'
export default class Rules extends Component {
    state={
        loading:true,
        dataSource:[]
    }
    componentDidMount(){
       this.tableInit()
    }
    render(){
          const columns = [{
            title: '节点结构',
            dataIndex: 'p_title',
            key: 'p_title',
          }, {
            title: '显示名',
            dataIndex: 'title',
            key: 'title',
          }, {
            title: '名称',
            dataIndex: 'name',
            key: 'name',
          },{
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            render: text => (
                <span>
                    {
                        text?'启用':'禁用'
                    }
                </span>
            ),
          },{
            title: '日志',
            dataIndex: 'isLog',
            key: 'isLog',
            render: text => (
                <span>
                    {
                        text?'启用':'禁用'
                    }
                </span>
            )
          },{
            title: '操作',
            key: 'option',
            render:(record)=>(
                <span>
                    <Icon style={{cursor:'pointer'}} type="edit" title="编辑"/>
                    <Divider type="vertical" />
                    <Icon style={{cursor:'pointer'}}  type="delete" title="删除" onClick={this.delData.bind(this,record.key)}/>
                </span>
            )
          }];
          const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
              console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            },
           
          };
       
        return (
            <div>
                <Spin tip="Loading..." spinning={this.state.loading}>
                <Table rowSelection={rowSelection} dataSource={this.state.dataSource} columns={columns} 
                 scroll={{ y: 470 }} bordered>
                </Table>
                </Spin>
                
            </div>
        )
    }
    tableInit(){
        http.apiGet('admin/rules')
        .then(res=>{
            console.log(res)
            var arr = []
            if(res.code===200){
                res.data.map(item=>{
                    return arr.push({
                        key:item.id,
                        'p_title':item.p_title,
                        title:item.title,
                        name:item.name,
                        status:item.status,
                        isLog:item.isLog
                    })
                })
                
                this.setState({
                    dataSource:arr,
                    loading:false
                })
            }else{
                this.setState({
                    loading:false
                })
            }
        })
        .catch(err=>{
            this.setState({
                loading:false
            })
        })
    }
    delData(val){
        console.log(val)
    }
}