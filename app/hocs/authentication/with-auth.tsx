import React, {useEffect} from "react";
import { useDispatch } from "react-redux";
//HOOKS
import { useTypedSelector } from "@/hooks/useTypedSelector";
//STORE
import { initalizeTemplate } from "@/store/templateSlice";
import { autoLoginReducer} from "@/store/userSlice";
//COMPONENTS
import {PageLoader} from "@/shared/loaders";
import Unauthorized from "@/widgets/unauthorized";

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


