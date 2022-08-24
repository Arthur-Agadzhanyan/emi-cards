import React,{useState,useEffect} from 'react';
import Image from 'next/image'
//INTERFACES
import {ArenaSettings} from '@/interfaces/arena'
import { Asset } from '@/interfaces/assets';
//SHARED COMPONENTS
import Button from '@/shared/button';
//ENTITIES COMPONENT
import { NftCard } from '@/entities/cards';
import { ArenaField, ArenaName,ArenaDropCard, ArenaHelpMessage } from '@/features/arena';
//STYLES
import s from './arena-battle.module.scss'
//IMAGES
import loading from '@/public/img/current_arena_page/loading.svg'
import { createTransaction } from '@/lib/createTransaction';
import { useTypedSelector } from '@/hooks/useTypedSelector';

interface HelpMsg{
    text: string,
    direction: 'left' | 'right' | null
}

const helpMessages = {
    cardNotChoosed: 'Select the character you want to send into battle',
    pressQueue:'Press QUEUE button to begin',
    opponentSearches: 'Looking for opponent...',
    opponentFound: "Your opponent has been found!"
}

const initialBattle = {
    found: false,
    searching: false,
    finished: false,
    starts: false
}

interface Props{
    settings: ArenaSettings,
    setResponseMessage: any
}

function ArenaBattle({settings,setResponseMessage}:Props) {
    const user = useTypedSelector(state => state.user)
    const [choosedCard,setChoosedCard] = useState<Asset | null>(null)

    const [opponentCard,setOpponentCard] = useState<Asset | null>(null)

    const [opponentFound, setOpponentFound] = useState(false)

    const [battle, setBattle] = useState(initialBattle)

    const [helpMsgState, setHelpMsgState] = useState<HelpMsg>({
        text: 'Select the character you want to send into battle',
        direction:'left'
    })

    useEffect(()=>{
        if(!choosedCard){
            changeHelpMessage(helpMessages.cardNotChoosed,'left')
        }else if(choosedCard && battle.found){
            changeHelpMessage(helpMessages.opponentFound,'right')
        }
        else if (choosedCard && !battle.searching){
            changeHelpMessage(helpMessages.pressQueue,'right')
        }
        else if (choosedCard && battle.searching){
            changeHelpMessage(helpMessages.opponentSearches,'right')
        }
    },[choosedCard,battle])

    useEffect(()=>{
        if(!choosedCard){
            setBattle(prev=>(initialBattle))
        }
    },[choosedCard])

    const dropCardClickHandler = (card: Asset | null)=>{
        setBattle(prev=>({...prev, founded:false, searching: false}))
        setChoosedCard(card)
    }

    const changeHelpMessage = (text:string, direction: 'left' | 'right' | null)=>{
        setHelpMsgState({
            text,
            direction
        })
    }

    const queueOpponent = ()=>{
        changeSearching()

        sendToBattle()
            .then(()=>{

            })
        // setTimeout(()=>{
        //     setBattle(prev=>({...prev, found: true, searching: false}))
        //     setTimeout(()=>{
        //         setBattle(prev=>({...prev, found: true, starts: true}))
        //     },2000)
        // },2000)
    }

    const sendToBattle = async () => {
        try {
            if (!choosedCard?.asset_id || !user.userData.account) {
                return console.log("Error: it is impossible to make a transaction")
            }

            const result = createTransaction("battle",user.userData.account, [choosedCard?.asset_id])
                .then((data) => {
                    setResponseMessage('Emic successfully tamed!')
                    // setChoosedCard({} as Asset);
                    console.log(data)
                    // getEmicsAfterMint()
                })
                .catch((err)=>{
                    setResponseMessage(err.message)
                })

        } catch (error:any) {
            setResponseMessage(error.message)
        }
    }

    const changeSearching = ()=>{
        setBattle(prev=>({...prev,searching: !prev.searching}))
    }

    const renderControlls = ()=>{
        if((!battle.searching || !choosedCard) && !battle.found){
            return <Button className={s.controls__queue_btn} withImg onClick={queueOpponent}>Queue</Button>
        }else if(battle.searching && !battle.found){
            return <Button className={s.controls__queue_btn} onClick={changeSearching}>Cancel</Button>
        }

        return ""
    }

    return (
        <ArenaField bgImage={settings.bgImage} battleStarts={battle.starts}>
            <ArenaName pageName={settings.arenaName} rarity={settings.cardsRarity}/>

            <div className={s.battle_content}>
                <ArenaDropCard choosedCard={choosedCard} setChoosedCard={dropCardClickHandler}/>
                <ArenaHelpMessage text={helpMsgState.text} direction={helpMsgState.direction}/>

                <div className={s.opponent}>
                    <div className={s.opponent__content}>
                        {battle.searching && choosedCard && !battle.found && (
                            <div className={s.content__loading_container}>
                                <Image src={loading} className={s.content__loading}/>
                            </div>
                        )}

                        { !battle.searching && battle.found &&  opponentCard  &&(
                            <NftCard
                                className={s.opponent__card}
                                rarity={choosedCard!.data.rarity}
                                card={choosedCard as Asset}
                                isEmic={true}
                            />)
                        }
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