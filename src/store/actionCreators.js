import {CHANGE_INPUT , ADD_ITEM,DELETE_ITEM,GET_LIST}  from './actionTypes'


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

export const getListAciton = (data)=>({
  type:GET_LIST,
  data  
})
