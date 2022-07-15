import React,{memo,FC} from 'react';
import Image from 'next/image'
import s from "./arena-field.module.scss"

interface Props{
    children: React.ReactNode,
    bgImage: string
}

const Battlefield = ({children,bgImage}:Props) =>{
    return (
        <div className={`${s.arena_field} container`}>
                <Image className={s.arena_field__bg} src={bgImage} layout='fill' />
                <div className={`${s.arena_field__content}`}>
                    {children}
                </div>
        </div>
    );
}

export const ArenaField = memo(Battlefield);