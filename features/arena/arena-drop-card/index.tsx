import { NftCard } from '@/entities/cards';
import {Asset} from '@/interfaces/assets';
import React, {memo, useCallback} from 'react';
import {useDrop} from 'react-dnd'

import s from "./arena-drop-card.module.scss"

interface Props {
    choosedCard: Asset | null,
    setChoosedCard: (card: Asset | null) => void,
    disabled: boolean
}

function DropCard({choosedCard,setChoosedCard, disabled}:Props) {
    const [{isOver}, drop] = useDrop(() => ({
        accept: 'div',
        drop: (item: { cardInfo: Asset }) => chooseCard(item.cardInfo),
        collect: (monitor)=>({
            isOver: !disabled && !!monitor.isOver()
        })
    }))

    const chooseCard = (cardInfo: Asset) => {
        if(!disabled){
            console.log(cardInfo)
            setChoosedCard(cardInfo)
        }
    }

    const clearCard = ()=>{
        if(!disabled){
            setChoosedCard(null)
        }
    }

    const renderCard = ()=>{
        if(choosedCard){
            return <NftCard
                className={s.choosed__card}
                rarity={choosedCard!.data.rarity}
                card={choosedCard}
                isEmic={true}
                onClick={clearCard}
            />
        }else{
            return <div className={s.card__empty}>drag here</div>
        }
    }

    return (
        <div ref={!disabled ? drop : undefined} className={`${s.drop_card} ${isOver ? s[`drop_card-over`] :""}`}>
            {renderCard()}
        </div>
    );
}

export const ArenaDropCard = memo(DropCard)