import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {Rarity} from '@/interfaces/assets'
import * as waxjs from "@waxio/waxjs/dist";

export const wax = new waxjs.WaxJS({
    rpcEndpoint: 'https://wax.greymass.com',
    tryAutoLogin: false,
})

export interface template{
    collection: string,
    enabled: number,
    rarity: Rarity,
    template_id: number,
    template_name: string
}

interface State {
    rows: template[]
} 

let initialState: State = {
    rows: []
}

const templatesObj = {
    code: "zombiemainac",
    index_position: 1,
    json: true,
    key_type: "",
    limit: "100",
    lower_bound: null,
    reverse: false,
    scope: "zombiemainac",
    show_payer: false,
    table: "templates",
    upper_bound: null
}

export const initalizeTemplate = createAsyncThunk('template/initalizeTemplate', async ()=>{
    try { 
        return wax.rpc.get_table_rows(templatesObj)
    } catch(e) { 
        console.log(e)
    }
})

const templateSlice = createSlice({
    name: 'template',
    initialState,
    reducers:{},
    extraReducers: {
        [`${initalizeTemplate.pending}`]: (state)=>{

        },
        [`${initalizeTemplate.fulfilled}`]: (state,action)=>{
            console.log(action.payload)
            state.rows = action.payload.rows
        },
        [`${initalizeTemplate.rejected}`]: (state,action)=>{

        }
    }
})

// export const {addTodo,removeTodo,doneTodo,clearTodos} = todoSlice.actions

export default templateSlice.reducer