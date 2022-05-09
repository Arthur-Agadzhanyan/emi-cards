import React from 'react'
import s from './loader.module.scss'

interface Props {}

function Loader(props: Props) {

    return (
        <div className={s.loader}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}

export default Loader
