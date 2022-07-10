// редюсеры в toolkit называют слайсами

import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import * as waxjs from "@waxio/waxjs/dist";

export const wax = new waxjs.WaxJS({
    rpcEndpoint: 'https://wax.greymass.com',
    tryAutoLogin: false,
})

export interface userData {
    account: string,
    keys: string[]
}

interface StateInter {
    loaded: boolean,
    userData: userData
} 

let initialState:StateInter = {
    loaded: false,
    userData: {} as userData
}

export const autoLoginReducer = createAsyncThunk('user/autoLogin', async ()=>{
    try { 
        let isAutoLoginAvailable = await wax.isAutoLoginAvailable();
        
        console.log("isAutoLoginAvailable: ",isAutoLoginAvailable)

        if(isAutoLoginAvailable){
            const loginUser = await wax.login()
            return wax.user
        }
        
        else{
            return {
                account: wax.user?.account,
                keys: wax.user?.keys
            }
        }
    } catch(e) { 
        console.log(e)
    }
})

export const loginReducer = createAsyncThunk('user/login', async ()=>{
    try { 
        if(!wax.api){
            const loginUser = await wax.login()
            return wax.user
        }else{
            // console.log(wax.userAccount)
            alert(`already logged in as ${wax.userAccount}`)
            return {
                account: wax.user?.account,
                keys: wax.user?.keys
            }
        }
    } catch(e) { 
        throw new Error(e)
    }
})

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{},
    extraReducers: {
        [`${loginReducer.pending}`]: (state)=>{},
        [`${loginReducer.fulfilled}`]: (state,action)=>{
            state.loaded = true
            state.userData = action.payload
        },
        [`${loginReducer.rejected}`]: (state,action)=>{},

        [`${autoLoginReducer.pending}`]: (state)=>{},
        [`${autoLoginReducer.fulfilled}`]: (state,action)=>{
            state.loaded = true
            state.userData = action.payload
        },
        [`${autoLoginReducer.rejected}`]: (state,action)=>{}
    }
})

// export const {addTodo,removeTodo,doneTodo,clearTodos} = todoSlice.actions

export default userSlice.reducer