import {PageLoader} from "@/shared/loaders";
import Unauthorized from "@/components/Unauthorized";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { initalizeTemplate } from "@/store/templateSlice";
import { autoLoginReducer, loginReducer, wax } from "@/store/userSlice";
import { AnyAction, AsyncThunkAction } from "@reduxjs/toolkit";
import { useRouter } from "next/router";
import React, { FC, useContext, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

export const withAuth = (WrappedComponent: any) => {
    return (props: any) => {
        const user = useTypedSelector(state=>state.user)
        const dispatch = useDispatch()

        useEffect(()=>{
            dispatch(autoLoginReducer() as any)
            dispatch(initalizeTemplate() as any)
        },[])

        if (!user.loaded) {
            return <PageLoader />
        }

        if(user.loaded && user.userData.account){
            return <WrappedComponent {...props} />
        }

        return <Unauthorized/>
    };
};

export const notWithAuth = (WrappedComponent: any) => {
    return (props: any) => {
        const dispatch = useDispatch()

        useEffect(()=>{
            dispatch(autoLoginReducer() as any)
        },[])

        return <WrappedComponent {...props} />
    };
};
