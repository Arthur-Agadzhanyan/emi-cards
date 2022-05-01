import React, { memo } from 'react'
import s from './nft-cards-list.module.scss'

interface Props {
    children: React.ReactNode
}

function NftCardsList(props: Props) {
    const {children} = props

    return (
        <div className={s.cards__list}>
            <div className={s.list__container}>
                {children}
            </div>
        </div>
    )
}

export default memo(NftCardsList)
