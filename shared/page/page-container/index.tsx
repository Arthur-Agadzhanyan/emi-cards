import React,{memo} from 'react'
import s from './page-container.module.scss'

interface Props {
    children: React.ReactNode,
    className?: string
}

function Container({className,children}: Props) {
    return (
        <div className={`${s.container} ${className && className}`}>
            {children}
        </div>
    )
}

export const PageContainer = memo(Container)
