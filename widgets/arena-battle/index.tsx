import React,{useState,useEffect} from 'react';
import { ArenaField, ArenaName,ArenaDropCard, ArenaHelpMessage } from '@/features/arena';
import {ArenaSettings} from '@/interfaces/arena'

import Image from 'next/image'

import s from './arena-battle.module.scss'
import { Asset } from '@/interfaces/assets';
import Button from '@/shared/button';

import loading from '@/public/img/current_arena_page/loading.svg'

interface Props{
    settings: ArenaSettings
}

interface helpMsg{
    text: string,
    direction: 'left' | 'right' | null
}

function ArenaBattle({settings}:Props) {
    const [choosedCard,setChoosedCard] = useState<Asset | null>(null)

    const [searchingOpponent, setSearchingOpponent] = useState(false)

    const [helpMsgState, setHelpMsgState] = useState<helpMsg>({
        text: 'Select the character you want to send into battle',
        direction:'left'
    })

    const queueOpponent = ()=>{
        setSearchingOpponent(prev=>!prev)
    }

    const renderControlls = ()=>{
        if(!searchingOpponent || !choosedCard){
            return <Button className={s.controls__queue_btn} withImg onClick={queueOpponent}>Queue</Button>
        }else{
            return <Button className={s.controls__queue_btn} onClick={queueOpponent}>Cancel</Button>
        }
    }

    useEffect(()=>{
        if(!choosedCard){
            setHelpMsgState({
                text: 'Select the character you want to send into battle',
                direction:'left'
            })
        }else if (choosedCard && !searchingOpponent){
            setHelpMsgState({
                text: 'Press QUEUE button to begin',
                direction:'right'
            })
        }else if (choosedCard && searchingOpponent){
            setHelpMsgState({
                text: 'Looking for opponent...',
                direction:'right'
            })
        }
    },[choosedCard,searchingOpponent])

    const dropCardClickHandler = (card: Asset)=>{
        setSearchingOpponent(false)
        setChoosedCard(card)
    }

    return (
        <ArenaField bgImage={settings.bgImage}>
            <ArenaName pageName={settings.arenaName} rarity={settings.cardsRarity}/>

            <div className={s.battle_content}>
                <ArenaDropCard choosedCard={choosedCard} setChoosedCard={dropCardClickHandler}/>
                <ArenaHelpMessage text={helpMsgState.text} direction={helpMsgState.direction}/>

                <div className={s.opponent}>
                    <div className={s.opponent__content}>
                        {searchingOpponent && choosedCard &&(
                            <div className={s.content__loading_container}>
                                <Image src={loading} className={s.content__loading}/>
                            </div>
                        )}
                    </div>
                    <div className={s.opponent__controls}>
                        {renderControlls()}
                    </div>
                </div>
            </div>
        </ArenaField>
    );
}

export default ArenaBattle;