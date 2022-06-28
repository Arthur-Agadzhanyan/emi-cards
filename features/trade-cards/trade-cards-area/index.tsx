import React, { memo } from 'react'
import s from './trading-field.module.scss'

interface Props { 
    children?: React.ReactNode
    centered?: boolean
}

function TradingComponent({children,centered=true}: Props) {
    return (
        <div className={s.md__card}>
            <div className={s.card__info}>
                <div className={`${s.info__content} ${centered ? s["info__content-centered"] : s['info__content-start']}`}>
                    {children}
                </div>
            </div>
        </div>
    )
}

export const TradeCardsArea = memo(TradingComponent)
