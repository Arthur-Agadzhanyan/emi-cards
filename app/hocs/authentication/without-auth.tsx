import React, {useEffect} from "react";
import { useDispatch } from "react-redux";
//STORE
import { autoLoginReducer } from "@/store/userSlice";

export const withoutAuth = (WrappedComponent: any) => {
    return (props: any) => {
        const dispatch = useDispatch()

        useEffect(()=>{
            dispatch(autoLoginReducer() as any)
        },[])

        return <WrappedComponent {...props} />
    };
};