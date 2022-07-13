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
                <Image className={s.field__bg} src={bgImage} layout='fill' />
                {children}
        </div>
    );
}

export const ArenaField = memo(Battlefield);