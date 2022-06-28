import React, {memo} from 'react';
import s from './trade-cards-count.module.scss'

interface Props{
    className?: string,
    currentRarity: string,
    cardsCount: number
}

export interface TradeCardsCount {
    fromRarity: string,
    toRarity: string,
    maxCards: number,
}

function TradingComponent({className, cardsCount,currentRarity}:Props) {

    const countRarities: TradeCardsCount[] = [
        {
            fromRarity: "Common",
            toRarity: "Uncommon",
            maxCards: 14
        },
        {
            fromRarity: "Uncommon",
            toRarity: "Rare",
            maxCards: 12
        },
        {
            fromRarity: "Rare",
            toRarity: "Epic",
            maxCards: 10
        },
        {
            fromRarity: "Epic",
            toRarity: "Legendary",
            maxCards: 8
        },
        {
            fromRarity: "Legendary",
            toRarity: "Mythic",
            maxCards: 6
        }
    ]

    return (
        <div className={`${s.count} {${className}`}>
            {countRarities.map((count,i)=>(
                <div key={`${count.fromRarity}_${i}`} className={s.count__item}>
                    <div className={s.item__top}>
                        <strong className={`${s.item__text} ${s.item__count}`}>{currentRarity === count.fromRarity ? cardsCount : 0}/{count.maxCards}</strong>
                        <span className={`${s.item__text} ${s[count.fromRarity.toLowerCase()]}`}>{count.fromRarity}</span>
                    </div>
                <span className={`${s.item__text} ${s[count.toRarity.toLowerCase()]}`}>{count.toRarity}</span>
            </div>
            ))}

        </div>
    );
}

export const TradeCardsCount = memo(TradingComponent);