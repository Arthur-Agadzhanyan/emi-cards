import React, { useCallback, useEffect } from 'react'
import s from '@/styles/tame-page.module.scss'
import { useState } from 'react'
// import { useRouter } from 'next/router'
import { withAuth } from '@/app/hocs/authentication'

// import filterCategoryIcon from '@/public/img/filter/1.png'
import tameRightYellow from '@/public/img/tame/mb/right-yellow.svg'
import tameLeftYellow from '@/public/img/tame/mb/left-yellow.svg'

import mobileBigStar from "@/public/img/tame/mb/big-star.svg"
import mobileSmallStar from '@/public/img/tame/mb/small-star.svg'

import exchangeArrow from '@/public/img/icons/exchange-arrows.svg'

import exchangePinkArrows from '@/public/img/icons/exchange-pink-arrows.svg'
import yellowArea from "@/public/img/tame/yellow.svg"
import yellowBigStar from "@/public/img/tame/yellow-big-star.svg"
import yellowSmallStar from "@/public/img/tame/yellow-small-star.svg"
import axios from 'axios'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import { wax } from '@/store/userSlice'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Pagination, Navigation } from 'swiper'
//SWIPER STYLES
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
//COMPONENTS
import Button from '@/shared/button'
import { Asset } from '@/interfaces/assets'

import {CardsCollectionFilter, MobileCardsFilter} from '@/entities/filters'

import TradingField from '@/widgets/trading-field'
import { Collection } from '@/interfaces/collections'
import { setCardsRarity } from '@/lib/setCardsRarity'
import { validateUserCards } from '@/lib/validateUserCards'
import {MessageModal} from "@/entities/modals"
import {NftCard} from "@/entities/cards"
import NftCardsList from "@/widgets/nft-cards-list"
import {CardsSortSelect} from "@/entities/selects";

interface SortingParam {
    id: number,
    name: string,
    sortFunction: () => void
}

SwiperCore.use([Pagination, Navigation])

function Tame() {
    const user = useTypedSelector(state => state.user)
    const templates = useTypedSelector(state => state.template)

    const [userCollections, setUserCollections] = useState<Asset[]>([])

    const [userCards, setUserCards] = useState<Asset[]>([])
    const [choosedCard, setChoosedCard] = useState<Asset>({} as Asset)

    const [responseMessage, setResponseMessage] = useState('')

    const sortParams: SortingParam[] = [
        { id: 1, name: "Listing (Newest)", sortFunction: () => setUserCards(prev => [...prev.sort((a, b) => +b.asset_id - +a.asset_id)]) },
        { id: 2, name: "Listing (Oldest)", sortFunction: () => setUserCards(prev => [...prev.sort((a, b) => +a.asset_id - +b.asset_id)]) },
        { id: 3, name: "Price (Highest)", sortFunction: () => setUserCards(prev => [...prev.sort((a, b) => +a.asset_id - +b.asset_id)]) },
        { id: 4, name: "Price (Lowest)", sortFunction: () => setUserCards(prev => [...prev.sort((a, b) => +a.asset_id - +b.asset_id)]) },
        { id: 5, name: "Mint (Highest)", sortFunction: () => setUserCards(prev => [...prev.sort((a, b) => +a.template_mint - +b.template_mint)]) },
        { id: 6, name: "Mint (Lowest)", sortFunction: () => setUserCards(prev => [...prev.sort((a, b) => +b.template_mint - +a.template_mint)]) },
    ]

    useEffect(() => {
        console.log(templates.rows)
        if (user.loaded && user.userData.account) {
            console.log('loaded')

            const atomicData = axios.post(`https://wax.api.atomicassets.io/atomicassets/v1/assets`, { owner: user.userData.account })
                .then(assets => {
                    const filteredCards = validateUserCards(assets.data.data, templates)

                    setCardsRarity(filteredCards, templates)
                    console.log(filteredCards)
                    setUserCards(filteredCards)
                    return filteredCards
                })
                .then((filteredCards) => {
                    const validCollections: Collection[] = []

                    filteredCards.forEach((card: Asset) => {
                        validCollections.push(card.collection as Collection)
                    })

                    const settedCollections = new Set(validCollections.map((el) => JSON.stringify(el)))
                    const uniqueCollections = [...Array.from(settedCollections)].map((el) => JSON.parse(el))

                    setUserCollections(uniqueCollections)
                    console.log("validCollections: ", uniqueCollections);
                })

                .catch(e => console.log(e))
        }
    }, [templates.rows])

    const chooseCard = (id: string) => {
        const currentCard: Asset | undefined = userCards.find(el => el.asset_id === id);
        setChoosedCard(currentCard as Asset)
    }

    const mintEmi = async () => {
        try {
            if (!choosedCard.asset_id || !user.userData.account) {
                return console.log('nope')
            }

            const result = await wax.api.transact({
                actions: [{
                    account: 'atomicassets',
                    name: 'transfer',
                    authorization: [{
                        actor: user.userData.account,
                        permission: 'active',
                    }],

                    data: {
                        from: user.userData.account,
                        to: 'zombiemainac',
                        asset_ids: [choosedCard?.asset_id],
                        memo: 'mint',
                    },
                }]
            }, {
                blocksBehind: 3,
                expireSeconds: 1200,
            }).then((data) => {
                let requestCount = 0

                setResponseMessage('Emic successfully tamed!')
                setChoosedCard({} as Asset);
                
                const interval = setInterval(() => {
                    const atomicData = axios.post(`https://wax.api.atomicassets.io/atomicassets/v1/assets`, { owner: user.userData.account })
                        .then(assets => {
                            const filteredCards = validateUserCards(assets.data.data, templates)

                            setCardsRarity(filteredCards, templates)

                            setUserCards(filteredCards)
                            console.log(assets)
                            //.filter(el=> +el.asset_id !== +choosedCard!.asset_id)
                        })

                    if (requestCount <= 2) {
                        setChoosedCard({} as Asset);
                        requestCount++;
                        return console.log('loading...')
                    }

                    clearInterval(interval)

                    console.log('responsed!')
                }, 5000)
            })
               
        } catch (error:any) {
            setResponseMessage(error.message)
        }
    }

    const filterByCollection = useCallback(async (collectionName: string, setFilterPoppupOpened: (arg: boolean) => void) => {
        if (collectionName === 'all_collections') {
            return axios.post(`https://wax.api.atomicassets.io/atomicassets/v1/assets`, { owner: user.userData.account })
                .then(assets => {
                    const filteredCards = validateUserCards(assets.data.data, templates)

                    setChoosedCard({} as Asset)
                    setCardsRarity(filteredCards, templates)
                    console.log(filteredCards)
                    setUserCards(filteredCards)

                    setFilterPoppupOpened(false)

                    return filteredCards
                })
                .catch(e => console.log(e))
        }

        const atomicData = await axios.post(`https://wax.api.atomicassets.io/atomicassets/v1/assets`, { owner: user.userData.account })
            .then(assets => {
                const filteredCards = validateUserCards(assets.data.data, templates)

                setChoosedCard({} as Asset)
                setCardsRarity(filteredCards, templates)

                setFilterPoppupOpened(false)

                setUserCards(filteredCards.filter((el: Asset) => el.collection.collection_name === collectionName))

                return filteredCards
            })
            .catch(e => console.log(e))
    }, [])

    return (
        <>
            <MessageModal isOpen={!!responseMessage} message={responseMessage} closeModal={()=> setResponseMessage('')} />

            <main className={s['tame-page']}>
                <div className={`${s.wrapper} wrapper`}>
                    
                    <div className={`${s['tame-mb']} container`}>
                        <div className={s['tame-page__content']}>
                            <MobileCardsFilter collections={userCollections} onFilter={filterByCollection}>
                                <CardsSortSelect sortParams={sortParams} />

                                <img className={`${s['mb-stars']} ${s.right_yellow_area}`} src={tameRightYellow.src} alt="" />
                                <img className={`${s['mb-stars']} ${s.left_yellow_area}`} src={tameLeftYellow.src} alt="" />

                                <img className={`${s['mb-stars']} ${s.mb_big_star}`} src={mobileBigStar.src} alt="" />
                                <img className={`${s['mb-stars']} ${s.mb_small_star}`} src={mobileSmallStar.src} alt="" />
                            </MobileCardsFilter>

                            <div className={s.content__exchange}>
                                <h3 className={s.exchange__mb_title}>Выберите одну из своих карточек и обменяйте её на карточку с Эмиком</h3>

                                <div className={s.exchange__arrows}>
                                    <img src={exchangeArrow.src} alt="" />
                                </div>

                                <div className={s.exchange__card}>
                                    <div className={s.card__info}>
                                        <div className={s.info__content}>
                                            {choosedCard?.asset_id &&
                                                <div className={s.content__container}>
                                                    <NftCard rarity={choosedCard.rarity} className={s.list__item} card={choosedCard} onClick={() => setChoosedCard({} as Asset)} />
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className={`${s.cards__list} ${s['cards__list-mb']}`}>
                                <Swiper
                                    modules={[Navigation]}
                                    className={`${s['content__slider']}`}

                                    speed={1000}
                                    spaceBetween={24}

                                    onSlideChange={() => console.log('slide change')}

                                    breakpoints={{
                                        320: {
                                            slidesPerView: 1.3,
                                        },
                                        400: {
                                            slidesPerView: 1.5,
                                        },
                                        450: {
                                            slidesPerView: 1.8,
                                        },
                                        500: {
                                            slidesPerView: 2.3,
                                        },
                                        600: {
                                            slidesPerView: 2.6,
                                        },
                                        800: {
                                            slidesPerView: 3.4,
                                        },
                                        900: {
                                            slidesPerView: 4,
                                        }
                                    }}
                                    autoHeight={true}
                                >
                                    {userCards.length && userCards.map((item, i) => (

                                        <SwiperSlide key={`${item}_${i}`}>
                                            <NftCard rarity={item!.rarity} className={s.list__item} card={item} onClick={() => chooseCard(item.asset_id)} />
                                        </SwiperSlide>

                                    ))}
                                </Swiper>

                                <Button className={`${s.list__btn}`} onClick={mintEmi}>choose</Button>
                            </div>
                        </div>
                    </div>

                    <div className={s['tame-md']}>
                        <h3 className={s.md__title}>Выберите одну из своих карточек и обменяйте её на карточку с Эмиком </h3>

                        <TradingField>
                            {choosedCard?.asset_id && <div className={s.content__container}>
                                <NftCard rarity={choosedCard!.rarity} className={s.list__item} card={choosedCard} onClick={() => setChoosedCard({} as Asset)} />

                                <Button className={`${s.play_btn}`} onClick={mintEmi}>Приручить</Button>
                            </div>}
                        </TradingField>

                        <div className={s.md__cards}>
                            <div className={s.cards__header}>
                                <CardsCollectionFilter className={s.header__filter} collections={userCollections} onFilter={filterByCollection} />

                                <img className={s.header__img} src={exchangePinkArrows.src} alt="" />

                                <CardsSortSelect sortParams={sortParams} />
                            </div>

                            <NftCardsList>
                                {userCards.length
                                    ? userCards.map((item, i) => (
                                        <NftCard rarity={item!.rarity} key={`${item}_${i}`} className={s.list__item} card={item} onClick={() => chooseCard(item.asset_id)} />
                                    ))

                                    : <h1>Загрузка...</h1>
                                }
                            </NftCardsList>
                        </div>

                    </div>

                    <img className={`${s['md-stars']} ${s.yellow_area}`} src={yellowArea.src} alt="" />

                    <img className={`${s['md-stars']} ${s.yellow_big_star}`} src={yellowBigStar.src} alt="" />
                    <img className={`${s['md-stars']} ${s.yellow_little_star}`} src={yellowSmallStar.src} alt="" />
                </div>
            </main>
        </>
    )
}

export default withAuth(Tame)