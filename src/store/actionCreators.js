import {CHANGE_INPUT , ADD_ITEM,DELETE_ITEM,GET_LIST}  from './actionTypes'
import axios from 'axios'

//actionCreate 里存放的是函数，用于构建action对象
export const changeInputAction = (value)=>({
    type:CHANGE_INPUT,
    value
})

export const addItemAction = ()=>({
    type:ADD_ITEM
})

export const deleteItemAction = (index)=>({
    type:DELETE_ITEM,
    index
})

export const getListAction = (data)=>({
  type:GET_LIST,
  data  
})

export const getTodoList = ()=>{
    return (dispatch)=>{
        axios.get('https://www.easy-mock.com/mock/5cfcce489dc7c36bd6da2c99/xiaojiejie/getList').then((res)=>{
            const data = res.data
            const action = getListAction(data)
            dispatch(action)
        },(res)=>{
            const data = {data:{
                inputValue : 'Write Something',
                list:[
                    'a',
                    'aaa'
                ]
            }}
            const action = getListAction(data)
            dispatch(action)
            // const data = res.data
            // const action = getListAction(data)
            // dispatch(action)
        })
    }
}
