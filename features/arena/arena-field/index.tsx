import React,{memo,FC} from 'react';
import Image from 'next/image'
import s from "./arena-field.module.scss"

interface Props{
    children: React.ReactNode,
    bgImage: string,
    battleStarts?: boolean,
    className?: string
}

const Battlefield = ({children,bgImage,battleStarts=false, className}:Props) =>{
    return (
        <div className={`${s.arena_field} container ${className ? " " + className : ""}`}>
                <Image className={`${s.arena_field__bg} ${battleStarts && s['arena_field__bg-blured']}`} src={bgImage} layout='fill' />
                <aside className={`${s.arena_field__content}`}>
                    {children}
                </aside>
        </div>
    );
}

export const ArenaField = memo(Battlefield);