import React, { memo } from 'react'
import s from './mobile-cards-filter.module.scss'
import {Collection} from '@/interfaces/collections'

interface Props {
    children?: React.ReactNode,
    collections: Collection[],
    className?: string,
    onFilter: (collectionName: string, setFilterPoppupOpened: React.Dispatch<React.SetStateAction<boolean>>) => void,
}
//filterCategoryIcon.src

function FilterCards({ children, collections, className, onFilter }: Props) {

    const clickHandler = (collectionName: string) => {
        onFilter(collectionName, ()=>{})
    }

    return (
        <div className={`${s.content__filter} ${className}`}>
            <h3 className={s.filter__title}>Фильтр</h3>

            <div className={s.filter__block}>
                <div className={s.block__search}>
                    <input type="text" className={s.search__input} placeholder="Поиск коллекции" />
                    <button className={s.search__btn}>
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M14.5165 4.48885C16.4419 4.48709 18.3247 5.05644 19.9265 6.12489C21.5283 7.19333 22.7772 8.71285 23.5153 10.4912C24.2533 12.2696 24.4473 14.2269 24.0728 16.1156C23.6982 18.0043 22.7719 19.7394 21.411 21.1015C20.0502 22.4637 18.3159 23.3915 16.4275 23.7678C14.5392 24.1441 12.5817 23.9519 10.8027 23.2155C9.02361 22.479 7.50294 21.2315 6.43304 19.6306C5.36313 18.0298 4.79205 16.1476 4.79205 14.2222C4.80373 11.6459 5.83173 9.17828 7.65264 7.35571C9.47355 5.53313 11.9402 4.50287 14.5165 4.48885ZM14.5165 2.66663C12.231 2.66663 9.99688 3.34435 8.09658 4.61409C6.19627 5.88383 4.71517 7.68856 3.84056 9.80006C2.96594 11.9116 2.73711 14.235 3.18298 16.4766C3.62885 18.7181 4.72941 20.7771 6.34549 22.3932C7.96156 24.0093 10.0206 25.1098 12.2621 25.5557C14.5037 26.0016 16.8271 25.7727 18.9386 24.8981C21.0501 24.0235 22.8549 22.5424 24.1246 20.6421C25.3943 18.7418 26.0721 16.5077 26.0721 14.2222C26.0721 11.1575 24.8546 8.21826 22.6875 6.05117C20.5204 3.88408 17.5812 2.66663 14.5165 2.66663Z"
                                fill="white" />
                            <path
                                d="M31.1102 29.5912L24.5591 22.9956L23.2969 24.2489L29.848 30.8445C29.9303 30.9274 30.0281 30.9932 30.1358 31.0383C30.2436 31.0834 30.3592 31.1068 30.476 31.1072C30.5927 31.1076 30.7085 31.085 30.8165 31.0407C30.9246 30.9964 31.0229 30.9312 31.1058 30.8489C31.1886 30.7666 31.2545 30.6688 31.2996 30.5611C31.3447 30.4533 31.3681 30.3378 31.3685 30.221C31.3689 30.1042 31.3463 29.9884 31.302 29.8804C31.2577 29.7723 31.1925 29.674 31.1102 29.5912Z"
                                fill="white" />
                        </svg>
                    </button>
                </div>

                <div className={s.block__list}>
                    <div className={s.list__accordion}>
                        <input className={s.accordion__input} name="poppup_filter" type="radio" id={`poppup_farmesworld_filter`} />
                        <label className={`${s.poppup_tame_trigger} ${s.accordion__trigger}`} htmlFor={`poppup_farmesworld_filter`} onClick={() => clickHandler('all_collections')}>
                            All collections
                        </label>
                    </div>

                    {collections.map((collection, i) => (
                        <div key={`${collection}_${i}`} className={s.list__accordion}>
                            <input className={s.accordion__input} name="poppup_filter" type="radio" id={`poppup_farmesworld_filter_${i}`} />
                            <label className={`${s.poppup_tame_trigger} ${s.accordion__trigger}`} htmlFor={`poppup_farmesworld_filter_${i}`} onClick={() => clickHandler(collection.collection_name)}>
                            {collection.img && <img className={s.trigger__img} src={`https://ipfs.atomichub.io/ipfs/${collection.img}`} alt="" />}
                                {collection.collection_name}
                            </label>
                        </div>
                    ))}
                </div>
            </div>


            {children}
        </div>
    )
}

export const MobileCardsFilter = memo(FilterCards);
