import React, { useCallback, useEffect,MouseEvent,createRef,SyntheticEvent } from 'react'
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

import {TradeCardsArea} from '@/features/trade-cards'
import { Collection } from '@/interfaces/collections'
import { setCardsRarity } from '@/lib/setCardsRarity'
import { validateUserCards } from '@/lib/validateUserCards'
import {MessageModal} from "@/entities/modals"
import {NftCard} from "@/entities/cards"
import NftCardsList from "@/widgets/nft-cards-list"
import {CardsSortSelect} from "@/entities/selects";

SwiperCore.use([Pagination, Navigation])

function Tame() {
    const user = useTypedSelector(state => state.user)
    const templates = useTypedSelector(state => state.template)

    const [userCollections, setUserCollections] = useState<Collection[]>([])

    const [userCards, setUserCards] = useState<Asset[]>([])
    const [choosedCard, setChoosedCard] = useState<Asset>({} as Asset)

    const [cardsLoaded,setCardsLoaded] = useState(false)
    const [currentPage,setCurrentPage] = useState(1)
    const [totalCount,setTotalCount] = useState(0)

    const [responseMessage, setResponseMessage] = useState('')

    const listRef = createRef<HTMLDivElement>()

    useEffect(() => {
        console.log(templates.rows)
        if (user.loaded && user.userData.account) {
            console.log('loaded')
            const atomicData = axios.post(`https://wax.api.atomicassets.io/atomicassets/v1/assets`, { owner: user.userData.account, limit: `${20}`, page: `${currentPage}` })
                .then(assets => {
                    const filteredCards = validateUserCards(assets.data.data, templates)

                    setCardsRarity(filteredCards, templates)
                    console.log(filteredCards)

                    return filteredCards
                })
                .then((filteredCards) => {
                    const validCollections: Collection[] = []

                    filteredCards.forEach((card: Asset) => {
                        validCollections.push(card.collection as Collection)
                    })

                    const settedCollections = new Set(validCollections.map((el) => JSON.stringify(el)))
                    const uniqueCollections = [...Array.from(settedCollections)].map((el) => JSON.parse(el))

                    setUserCards(prev=>[...prev,...filteredCards])
                    setCurrentPage((prev)=>prev+1)

                    if(uniqueCollections.length){
                        setUserCollections(uniqueCollections)
                    }

                    const unioqueCollections = new Set(templates.rows.map((el)=>el.collection))
                    const requestCollections = Array.from(unioqueCollections).join(',')
                    const getTotalNfts = axios.post('https://wax.api.atomicassets.io/atomicassets/v1/accounts/s3r1.wam', {collection_whitelist: requestCollections})
                        .then((res) => {
                            setTotalCount(+res.data.data.assets)
                        })
                })

                .catch(e => console.log(e))

                .finally(()=>{
                    setCardsLoaded(true)
                })
        }
    }, [!cardsLoaded])

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
            return await axios.post(`https://wax.api.atomicassets.io/atomicassets/v1/assets`, { owner: user.userData.account })
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

    const renderCards = function(){
        if(userCards.length){
            return userCards.map((item, i) => (
                <NftCard rarity={item!.rarity} key={`${item}_${i}`} className={s.list__item} card={item} onClick={() => chooseCard(item.asset_id)} />
            ))
        }else if (!cardsLoaded && !userCards.length){
            return <h1>Loading...</h1>
        }else{
            return <h1>No cards found</h1>
        }
    }

    const scrollHandler = (e: SyntheticEvent<HTMLDivElement>)=>{
        // console.log('1',(e.target.scrollHeight - (e.target.scrollTop + e.target.clientHeight) < 20))
        // console.log('2',userCards.length < totalCount)
        // console.log('userCards',userCards.length)
        // console.log('totalCount',totalCount)

        if ((e.currentTarget.scrollHeight - (e.currentTarget.scrollTop + e.currentTarget.clientHeight) < 20) && userCards.length < totalCount) {
            console.log(userCards.length, totalCount)
            setCardsLoaded(false)
        }
    }

    console.log(currentPage)
    return (
        <>
            <MessageModal isOpen={!!responseMessage} message={responseMessage} closeModal={()=> setResponseMessage('')} />

            <main className={s['tame-page']}>
                <div className={`${s.wrapper} wrapper`}>
                    {/*Мобильная версия*/}
                    <div className={`${s['tame-mb']} container`}>
                        <div className={s['tame-page__content']}>
                            <MobileCardsFilter collections={userCollections} onFilter={filterByCollection}>
                                <CardsSortSelect setUserCards={setUserCards} />

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
                                {/*TODO: почистить код*/}
                                {userCards.length
                                    ? (
                                        <>
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
                                                autoHeight={true}>

                                                {userCards.length && userCards.map((item, i) => (

                                                    <SwiperSlide key={`${item}_${i}`}>
                                                        <NftCard rarity={item!.rarity} className={s.list__item} card={item} onClick={() => chooseCard(item.asset_id)}/>
                                                    </SwiperSlide>

                                                ))}
                                            </Swiper>
                                            <Button className={`${s.list__btn}`} onClick={mintEmi}>choose</Button>
                                        </>
                                    )
                                    : <h1>No cards found</h1>}


                            </div>
                        </div>
                    </div>

                    {/*Десктопная версия*/}
                    <div className={s['tame-md']}>
                        <h3 className={s.md__title}>Choose one of your cards and exchange it for a card with Emic</h3>

                        <TradeCardsArea>
                            {choosedCard?.asset_id && <div className={s.content__container}>
                                <NftCard rarity={choosedCard!.rarity} className={s.list__item} card={choosedCard} onClick={() => setChoosedCard({} as Asset)} />

                                <Button className={`${s.play_btn}`} onClick={mintEmi}>Приручить</Button>
                            </div>}
                        </TradeCardsArea>

                        <div className={s.md__cards}>
                            <div className={s.cards__header}>
                                <CardsCollectionFilter className={s.header__filter} collections={userCollections} onFilter={filterByCollection} />

                                <img className={s.header__img} src={exchangePinkArrows.src} alt="" />

                                <CardsSortSelect setUserCards={setUserCards} />
                            </div>

                            <NftCardsList scrollHandler={scrollHandler}>
                                {renderCards()}
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