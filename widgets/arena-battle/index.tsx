import { ArenaField, ArenaName } from '@/entities/arena';
import React from 'react';
import {ArenaSettings} from '@/interfaces/arena'

interface Props{
    settings: ArenaSettings
}

function ArenaBattle({settings}:Props) {
    return (
        <ArenaField bgImage={settings.bgImage}>
            <ArenaName pageName={settings.arenaName} rarity={settings.cardsRarity}/>
        </ArenaField>
    );
}

export default ArenaBattle;