import React from 'react'
import { connect } from 'react-redux'
import { addTodo } from '../action'
import { Form, Icon, Input, Button,Select  } from 'antd';
const FormItem = Form.Item;
const filterTodo =(
  <Select defaultValue="SHOW_ALL" style={{ width: 160 }}>
     <Select.Option value="SHOW_ALL">SHOW_ALL</Select.Option> 
     <Select.Option value="SHOW_COMPLETED">SHOW_COMPLETED</Select.Option> 
     <Select.Option value="SHOW_ACTIVE">SHOW_ACTIVE</Select.Option>  
  </Select>
)
class AddTodo extends React.Component {
  handleSubmit(e){
    e.preventDefault();
    console.log(this.props)
  }
 
  render() {
    let input;
    return (
      <div style={style.form}>
      {/* <Form style={style.form} onSubmit={this.handleSubmit}> */}
      <div style={{ marginBottom: 16 }}>
      <Input addonBefore={filterTodo} addonAfter=".com" defaultValue="mysite" />
    </div>
        <button type="submit" >ADD</button>
      {/* </Form> */}
      </div>
    )
  }
}

const style = {
  form:{
    width: '560px',
    margin: '0px auto'
  }
}
export default connect()(AddTodo)
