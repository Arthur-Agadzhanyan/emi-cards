import React, { useState } from 'react'
import s from './cards-sort-select.module.scss'

import selectArrowIcon from '@/public/img/icons/select-arrow.svg'
import {Asset} from "@/interfaces/assets";

interface sortParam{ 
    id: number, 
    name: string,
    sortFunction: ()=>void
}

interface Props {
    className?: string,
    setUserCards: React.Dispatch<React.SetStateAction<any>>
}

export function CardsSortSelect({ className,setUserCards }: Props) {
    const sortParams: sortParam[] = [
        { id: 1, name: "Listing (Newest)", sortFunction: () => setUserCards((prev: Asset[]) => [...prev.sort((a, b) => +b.asset_id - +a.asset_id)]) },
        { id: 2, name: "Listing (Oldest)", sortFunction: () => setUserCards((prev: Asset[]) => [...prev.sort((a, b) => +a.asset_id - +b.asset_id)]) },

        { id: 3, name: "Price (Highest)", sortFunction: () => setUserCards((prev: Asset[]) => [...prev.sort((a, b) => +a.asset_id - +b.asset_id)]) },
        { id: 4, name: "Price (Lowest)", sortFunction: () => setUserCards((prev: Asset[]) => [...prev.sort((a, b) => +a.asset_id - +b.asset_id)]) },

        { id: 5, name: "Mint (Highest)", sortFunction: () => setUserCards((prev: Asset[]) => [...prev.sort((a, b) => +b.template_mint - +a.template_mint)])  },
        { id: 6, name: "Mint (Lowest)",  sortFunction: () => setUserCards((prev: Asset[]) => [...prev.sort((a, b) => +a.template_mint - +b.template_mint)])},
    ]

    const [currentSortParam, setCurrentSortParam] = useState(sortParams[0])
    const [showSortPanel, setShowSortPanel] = useState(false)

    const toggleSortPanel = ()=>{
        setShowSortPanel(!showSortPanel)
    }

    const changeSortParam = (id:number)=>{
        const selectedParam = sortParams.find(el=>el.id === id);
        selectedParam && setCurrentSortParam(selectedParam);
        setShowSortPanel(!showSortPanel)
    }

    const clickHandler = (id:number, sortFunction: ()=>void)=>{
        changeSortParam(id)
        console.log(222)
        sortFunction()
    }

    return (
        <div className={`${s.header__select} ${className} ${showSortPanel ? s['is-active'] : ""}`}>
            <div onClick={toggleSortPanel} className={`${s.select__header}`}>
                <span className={s.select__current}>{currentSortParam.name}</span>
                <div className={s.select__icon}>
                    <img src={selectArrowIcon.src} alt="" />
                </div>
            </div>

            <div className={s.select__body}>
                {sortParams.map(({ id, name, sortFunction }, i) => (
                    <div key={`${id}_${i}`} onClick={() => clickHandler(id,sortFunction)} className={s.select__item}>{name}</div>
                ))}
            </div>
        </div>
    )
}
