import { Rarity } from '@/interfaces/assets';
import React,{memo} from 'react';
import s from "./area-name.module.scss"

interface Props{
    pageName: string,
    rarity: Rarity
}

export const ArenaName = memo(({pageName,rarity}:Props)=> {
    return (
        <div>
            <h2>{pageName}</h2>
            <p>{rarity}</p>
        </div>
    );
})