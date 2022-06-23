import { Asset } from '@/interfaces/assets'
import Image from 'next/image'
import React, { memo } from 'react'
import s from './nft-card.module.scss'
import collectionEmiAttrHealth from "@/public/img/collection/card_attr/1.svg";
import collectionEmiAttrAttack from "@/public/img/collection/card_attr/2.svg";
import collectionEmiAttrSpeed from "@/public/img/collection/card_attr/3.svg";
import collectionEmiAttrLuck from "@/public/img/collection/card_attr/4.svg";

interface Props {
    card: Asset,
    onClick?: ()=>void,
    className?: string,
    rarity: 'common' | 'legendary' | 'epic',
    isEmic?: boolean
}

export function NftCard({card,className='',rarity,onClick,isEmic = false}: Props) {
    return (
        <div className={`${s.list__item} ${className}`} onClick={onClick}>
            <div className={`${s.slide__info} ${s[`slide__info-${rarity.toLowerCase()}`]}`}>
                <div className={s.info__bg}>
                    <div className={s.info__hash}>#{card.asset_id}</div>
                    <div className={s.info__img}>
                        {card.data.img && (
                            <div className={s.img__content}>
                                <Image src={`https://ipfs.atomichub.io/ipfs/${card.data.img}`} layout='fill' placeholder='blur' objectFit='contain' blurDataURL={`https://ipfs.atomichub.io/ipfs/${card.data.img}`}/></div>
                        )}
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
                    { isEmic
                        ? (

                            <h1>228 </h1>
                        )
                        : (
                            <div className={s.info__collections}>
                                <div className={s.collections__item}>{card.collection.collection_name}</div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}
// <div className={s.info__attributes}>
{/*    <div className={s.attributes__item}>*/}
//         <div className={s.item__image}>
//             <Image src={collectionEmiAttrHealth} layout={'fill'}
//                    alt=""/>
//         </div>
//
{/*        <span className={s.item__count}>{data}</span>*/}
{/*    </div>*/}

//     <div className={s.attributes__item}>
//         <div className={s.item__image}>
//             <Image src={collectionEmiAttrAttack} layout={'fill'}
//                    alt=""/>
//         </div>
//         <span className={s.item__count}>{el.attributes.attack}</span>
{/*    </div>*/}

//     <div className={s.attributes__item}>
//         <div className={s.item__image}>
//             <Image src={collectionEmiAttrSpeed} layout={'fill'}
//                    alt=""/>
//         </div>
//         <span className={s.item__count}>{el.attributes.speed}</span>
//     </div>
//
//     <div className={s.attributes__item}>
{/*        <div className={s.item__image}>*/}
{/*            <Image src={collectionEmiAttrLuck} layout={'fill'}*/}
{/*                   alt=""/>*/}
{/*        </div>*/}
{/*        <span className={s.item__count}>{el.attributes.luck}</span>*/}
{/*    </div>*/}
{/*</div>*/}
