import React, { Component } from 'react';
import 'antd/dist/antd.css'
import { Input, Button, List } from 'antd'
import store from './store'



class TodoList extends Component {
    constructor(props) {
        super(props)
        //关键代码-----------start
        this.state = store.getState();
        //关键代码-----------end
        this.changeInputValue = this.changeInputValue.bind(this)
        //订阅redux状态
        this.storeChange = this.storeChange.bind(this)
        store.subscribe(this.storeChange)

        this.clickBtn = this.clickBtn.bind(this)
    }
    
    render() {
        return (
            <div style={{ margin: '10px' }}>
                <div>

                    <Input onChange={this.changeInputValue} placeholder={this.state.inputValue} style={{ width: '250px', marginRight: '10px' }} />
                    <Button onClick={this.clickBtn} type="primary">增加</Button>
                </div>
                <div style={{ margin: '10px', width: '300px' }}>
                    <List
                        bordered
                        //关键代码-----------start
                        dataSource={this.state.list}
                        //关键代码-----------end
                        renderItem={(item,index) => (<List.Item onClick={this.deleteItem.bind(this,index)} >{item}</List.Item>)}
                    />
                </div>
            </div>
        );
    }
    deleteItem(index){
        const action ={type:'deleteItem',index}
        store.dispatch(action)
    }
    //添加操作的过程是：当input改变的时候，会实时向 store.inputValue 里存储当前的值
    //点击添加按钮的时候，从 store.inputValue 里获取这个值，把值添加到 store.list 里
    //input框和按钮在同一个组件里，可省略第一步，添加的时候直接取值
    clickBtn(){
        const action = { type:'addItem' }
        store.dispatch(action)
    }
    storeChange(){
        this.setState(store.getState())
    }
    changeInputValue(e){
        const action = { 
            type:'changeinput',
            value:e.target.value
        }
        store.dispatch(action)
    }
}
export default TodoList;