import React from 'react';
import s from "./arena-help-message.module.scss"

interface Props{
    text: string,
    direction?: "right" | "left" | null
}

export function ArenaHelpMessage({text,direction = null}: Props) {
    return (
        <div className={`${s.help_message} ${s[`help_message-${direction}`]}`}>
            <div className={s.message__text}>{text}</div>
        </div>
    );
}

