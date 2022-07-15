import React,{useState} from 'react';
import { ArenaField, ArenaName,ArenaDropCard, ArenaHelpMessage } from '@/features/arena';
import {ArenaSettings} from '@/interfaces/arena'

import s from './arena-battle.module.scss'
import { Asset } from '@/interfaces/assets';

interface Props{
    settings: ArenaSettings
}

function ArenaBattle({settings}:Props) {
    const [choosedCard,setChoosedCard] = useState<Asset | null>(null)

    return (
        <ArenaField bgImage={settings.bgImage}>
            <ArenaName pageName={settings.arenaName} rarity={settings.cardsRarity}/>

            <div className={s.battle_content}>
                <ArenaDropCard choosedCard={choosedCard} setChoosedCard={setChoosedCard}/>
                <ArenaHelpMessage text={'Select the character you want to send into battle'} direction={'left'}/>
            </div>
        </ArenaField>
    );
}

export default ArenaBattle;