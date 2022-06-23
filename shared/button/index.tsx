import React from 'react'
import s from './button.module.scss'
import playArrow from '@/public/img/navigation/btn.svg'

interface Props {
    children: React.ReactNode,
    className?: string,
    onClick?: ()=>void,
    withImg?: boolean
}

const noop = ()=>{}

function Button({children,className,onClick=noop,withImg=false}: Props) {
    return (
        <button className={`${s.button} ${className}`} onClick={onClick}>
            <span>{children}</span>
            {withImg && <img src={playArrow.src} alt=""/>}
        </button>
    )
}

export default Button
