import React from 'react'
import s from './page-container.module.scss'

interface Props {
    children: React.ReactNode,
    className?: string
}

export function PageContainer({className,children}: Props) {
    return (
        <div className={`${s.container} ${className && className}`}>
            {children}
        </div>
    )
}
