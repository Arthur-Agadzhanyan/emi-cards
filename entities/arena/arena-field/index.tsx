import React,{memo,FC} from 'react';

interface Props{
    children: React.ReactNode
}

const Battlefield = ({children}:Props) =>{
    return (
        <div>
            {children}
        </div>
    );
}

export const ArenaField = memo(Battlefield);