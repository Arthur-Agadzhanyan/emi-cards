import React, { useState } from 'react'
import s from './tame-select.module.scss'

interface sortParam{ 
    id: number, 
    name: string 
}

interface Props {
    className?: string,
    sortParams: sortParam[],
    currentSortParam: sortParam,
    setCurrentSortParam: (value: sortParam | ((prevVar: sortParam) => sortParam)) => void;
}

function TameSelect({ className, sortParams, currentSortParam,setCurrentSortParam }: Props) {
    
    const [showSortPanel, setShowSortPanel] = useState(false)

    const toggleSortPanel = ()=>{
        setShowSortPanel(!showSortPanel)
    }

    const changeSortParam = (id:number)=>{
        const selectedParam = sortParams.find(el=>el.id === id);
        selectedParam && setCurrentSortParam(selectedParam);
        setShowSortPanel(!showSortPanel)
    }

    return (
        <div className={`${s.header__select} ${className} ${showSortPanel ? s['is-active'] : ""}`}>
            <div onClick={toggleSortPanel} className={`${s.select__header}`}>
                <span className={s.select__current}>{currentSortParam.name}</span>
                <div className={s.select__icon}>
                    <img src="img/icons/select-arrow.svg" alt="" />
                </div>
            </div>

            <div className={s.select__body}>
                {sortParams.map(({ id, name }, i) => (
                    <div key={`${id}_${i}`} onClick={() => changeSortParam(id)} className={s.select__item}>{name}</div>
                ))}
            </div>
        </div>
    )
}

export default TameSelect
