import React from 'react'
import s from './page-wrapper.module.scss'

import yellowArea from "@/public/img/tame/yellow.svg"
import yellowBigStar from "@/public/img/tame/yellow-big-star.svg"
import yellowSmallStar from "@/public/img/tame/yellow-small-star.svg"

interface Props {
    children: React.ReactNode,
    className?: string
}

export function PageWrapper({children,className}: Props) {
    return (
        <div className={`${s.wrapper} wrapper ${className}`}>
            {children}


            <img className={`${s['md-stars']} ${s.yellow_big_star}`} src={yellowBigStar.src} alt="" />
            <img className={`${s['md-stars']} ${s.yellow_little_star}`} src={yellowSmallStar.src} alt="" />
            <img className={`${s['md-stars']} ${s.yellow_area}`} src={yellowArea.src} alt="" />

        </div>
    )
}
