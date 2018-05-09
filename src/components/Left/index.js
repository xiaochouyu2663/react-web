import React from 'react'
import {Menu,Icon} from 'element-react'
import {Link} from 'react-router-dom'
export default class Left extends React.Component {
    state={
        current:'0'
      }
    HandleSelect(index){
        this.setState({
          current:index
        })
        this.props.getLeftMenu(index)
      }
    render(){
        return (
            <div className="aside">
            <Menu  uniqueOpened defaultActive={this.state.current} onSelect={this.HandleSelect.bind(this)}>
                {
                    this.props['left-menu'].map((item,index)=>{
                        if(item.menu_type!==1){
                            return( <Menu.Item key={index} index={index.toString()}>
                                <Link to={item.url}><Icon name='document' />{item.title}</Link> 
                            </Menu.Item>)
                        }else{
                            return (
                                <Menu.SubMenu key={index} index={index.toString()} title={<span><i className="el-icon-message"></i>{item.title}</span>}>
                                    {
                                        item.child.map((val,i)=>{
                                            return <Menu.Item key={i} index={`${index.toString()}-${i.toString()}`}>
                                                <Link to={val.url}>{val.title}</Link>
                                            </Menu.Item>
                                        })
                                    }
                                </Menu.SubMenu>
                            )
                           
                        }
                    })
                }
            </Menu>
          </div>
        )
    }
    
}