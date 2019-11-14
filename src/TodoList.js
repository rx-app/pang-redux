import React, { Component } from 'react';
import 'antd/dist/antd.css'
import { Input, Button, List } from 'antd'
import store from './store'
import { CHANGE_INPUT , ADD_ITEM , DELETE_ITEM } from './store/actionTypes'
import {changeInputAction , addItemAction ,deleteItemAction,getListAciton} from './store/actionCreators'
import TodoListUI from './TodoListUI'
import axios from 'axios'

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
        this.deleteItem = this.deleteItem.bind(this)
    }
    componentDidMount(){
        
        axios.get('https://www.easy-mock.com/mock/5cfcce489dc7c36bd6da2c99/xiaojiejie/getList').then((res)=>{
            const data = res.data
            const action = getListAciton(data)
            store.dispatch(action)
        },(res)=>{
            // const data = res.data
            // const action = getListAciton(data)
            // store.dispatch(action)
        })
    }
    
    render() {
        return (
            <TodoListUI
                inputValue={this.state.inputValue}
                list={this.state.list}
                changeInputValue={this.changeInputValue}
                clickBtn={this.clickBtn}
                deleteItem={this.deleteItem}
            />
        );
    }
    deleteItem(index){
        const action = deleteItemAction(index)
        store.dispatch(action)
    }
    //添加操作的过程是：当input改变的时候，会实时向 store.inputValue 里存储当前的值
    //点击添加按钮的时候，从 store.inputValue 里获取这个值，把值添加到 store.list 里
    //input框和按钮在同一个组件里，可省略第一步，添加的时候直接取值
    clickBtn(){
        const action = addItemAction()
        store.dispatch(action)
    }
    storeChange(){
        this.setState(store.getState())
    }
    changeInputValue(e){
        const action = changeInputAction(e.target.value)
        store.dispatch(action)
    }
}
export default TodoList;