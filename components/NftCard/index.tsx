import { Asset } from '@/interfaces/assets'
import React, { memo } from 'react'
import s from './nft-card.module.scss'


interface Props {
    card: Asset,
    onClick?: ()=>void,
    className?: string,
    rarity: 'common' | 'legendary' | 'epic'
}

function NftCard({card,className='',rarity,onClick}: Props) {
    return (
        <div className={`${s.list__item} ${className}`} onClick={onClick}>
            <div className={`${s.slide__info} ${s[`slide__info-${rarity.toLowerCase()}`]}`}>
                <div className={s.info__bg}>
                    <div className={s.info__hash}>#{card.asset_id}</div>
                    <div className={s.info__img}>
                        {card.data.img && <img src={`https://ipfs.atomichub.io/ipfs/${card.data.img}`} />}
                        {card.data.video &&
                            <video width="100" height={'100'} autoPlay loop>
                                <source src={`https://resizer.atomichub.io/videos/v1/preview?ipfs=${card.data.video}&size=370`} type="video/mp4" />
                            </video>
                        }
                    </div>

                    <div className={s.info__rarity}>
                        {rarity}
                        <hr />
                    </div>

                    <p className={s.info__name}>{card.name}</p>

                    <div className={s.info__collections}>
                        <div className={s.collections__item}>{card.collection.collection_name}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NftCard;
