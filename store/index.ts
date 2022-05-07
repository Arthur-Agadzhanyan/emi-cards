import {configureStore} from "@reduxjs/toolkit";
import user from './userSlice'
import template from './templateSlice'

export const store = configureStore({
    reducer:{
        user,
        template
    }
});

export type RootState = ReturnType<typeof store.getState>