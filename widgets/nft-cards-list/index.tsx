import React, { memo } from 'react'
import s from './nft-cards-list.module.scss'

interface Props {
    children: React.ReactNode,
    className?: string,
    containerClassName?: string
}

function NftCardsList(props: Props) {
    const {children,className,containerClassName} = props

    return (
        <div className={`${s.cards__list} ${className}`}>
            <div className={`${s.list__container} ${containerClassName}`}>
                {children}
            </div>
        </div>
    )
}

export default memo(NftCardsList)
