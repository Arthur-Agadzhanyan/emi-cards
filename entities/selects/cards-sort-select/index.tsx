import React, { useState } from 'react'
import s from './cards-sort-select.module.scss'

import selectArrowIcon from '@/public/img/icons/select-arrow.svg'

interface sortParam{ 
    id: number, 
    name: string,
    sortFunction: ()=>void
}

interface Props {
    className?: string,
    sortParams: sortParam[],
}

export function CardsSortSelect({ className, sortParams }: Props) {
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
