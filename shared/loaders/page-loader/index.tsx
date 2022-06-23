import React from 'react'
import s from './loader.module.scss'

interface Props {}

export function PageLoader(props: Props) {

    return (
        <div className={s.loader}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}
