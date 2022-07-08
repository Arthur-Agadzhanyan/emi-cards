import React, { memo,useEffect,createRef,MouseEvent } from 'react'
import s from './nft-cards-list.module.scss'



interface Props {
    children: React.ReactNode,
    className?: string,
    containerClassName?: string,
    scrollHandler?: (e: MouseEvent<HTMLDivElement>) => void
}

function NftCardsList(props: Props,) {
    const {children,className,containerClassName,scrollHandler} = props

    return (
        <div  className={`${s.cards__list} ${className}`}>
            <div className={`${s.list__container} ${containerClassName}`} onScroll={scrollHandler}>
                {children}
            </div>
        </div>
    )
}

export default memo(NftCardsList)
