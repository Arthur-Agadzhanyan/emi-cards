import React from 'react'
import Button from "@/shared/button"
import { loginReducer } from '@/store/userSlice';
import {useDispatch} from 'react-redux';
import s from "./unauthorized.module.scss"

interface Props {}

function Unauthorized(props: Props) {
    const dispatch = useDispatch()
    const login = async ()=>{
        dispatch(loginReducer() as any).then(res=>console.log(res))
    }
    return (
        <div className={s.unauthorized}>
            <div className={s.unauthorized__info}>
                <h1 className={s.info__title}>You must be logged in to use the game features</h1>
                <Button className={s.info__btn} onClick={login}>Play</Button>
            </div>

        </div>
    )
}

export default Unauthorized
