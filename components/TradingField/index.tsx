import React, { memo } from 'react'
import s from './trading-field.module.scss'

interface Props { 
    children?: React.ReactNode
}

function TradingField({children}: Props) {

    return (
        <div className={s.md__card}>
            <div className={s.card__info}>
                <div className={s.info__content}>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default memo(TradingField)
