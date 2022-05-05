import React, { memo, useCallback, useContext, useEffect } from 'react'
import s from '@/styles/tame-page.module.scss'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { withAuth } from '@/HOC/auth'
import TameSelect from '@/components/Tame/TameSelect'
import TameFilter from '@/components/Tame/TameFilter'

import filterCategoryIcon from '@/public/img/filter/1.png'

import tameRightYellow from '@/public/img/tame/mb/right-yellow.svg'
import tameLeftYellow from '@/public/img/tame/mb/left-yellow.svg'

import mobileBigStar from "@/public/img/tame/mb/big-star.svg"
import mobileSmallStar from '@/public/img/tame/mb/small-star.svg'

import exchangeArrow from '@/public/img/icons/exchange-arrows.svg'

import cardImage from '@/public/img/tame/1.png'
import exchangePinkArrows from '@/public/img/icons/exchange-pink-arrows.svg'
import yellowArea from "@/public/img/tame/yellow.svg"
import yellowBigStar from "@/public/img/tame/yellow-big-star.svg"
import yellowSmallStar from "@/public/img/tame/yellow-small-star.svg"
import axios from 'axios'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import { wax } from '@/store/userSlice'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Pagination, Navigation } from 'swiper'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import Button from '@/components/Button'
import { Asset } from '@/interfaces/assets'
import NftCard from '@/components/NftCard'
import FilterCards from '@/components/FilterCards'
import TradingField from '@/components/TradingField'
import NftCardsList from '@/components/NftCardsList'
import { Collection } from '@/interfaces/collections'
interface Props { }

interface SortingParam {
    id: number,
    name: string
}

SwiperCore.use([Pagination, Navigation])

function Tame(props: Props) {
    const user = useTypedSelector(state => state.user)

    const [userCollections, setUserCollections] = useState<Asset[]>([])


    const [userCards, setUserCards] = useState<Asset[]>([])
    const [choosedCard, setChoosedCard] = useState<Asset>({} as Asset)

    const sortParams: SortingParam[] = [
        { id: 1, name: "Listing (Newest)" },
        { id: 2, name: "Listing (Oldest)" },
        { id: 3, name: "Price (Highest)" },
        { id: 4, name: "Price (Lowest)" },
        { id: 5, name: "Mint (Highest)" },
        { id: 6, name: "Mint (Lowest)" },
    ]

    const [currentCollection, setCurrentCollection] = useState(sortParams[0])
    
    useEffect(() => {
        if (user.loaded && user.userData.account) {
            console.log('loaded')
            const fetched = wax.rpc.get_table_rows(
                {
                    code: "zombiemainac",
                    index_position: 1,
                    json: true,
                    key_type: "",
                    limit: "100",
                    lower_bound: null,
                    reverse: false,
                    scope: "zombiemainac",
                    show_payer: false,
                    table: "templates",
                    upper_bound: null
                }).then(templates=>{
                    console.log('templates: ', templates)
                    const atomicData = axios.post(`https://wax.api.atomicassets.io/atomicassets/v1/assets`, { owner: user.userData.account })
                    .then(assets => {

                        const filteredCards = assets.data.data.filter(card=>{
                            let isCardValid = false

                            templates.rows.forEach((template)=>{
                                if(card.template && +card.template.template_id === template.template_id){
                                    isCardValid = true
                                }
                            })

                            return isCardValid
                        })

                        setUserCards(filteredCards)
                        console.log(filteredCards);
                        return filteredCards
                    })
                    .then((filteredCards)=>{
                        const validCollections: Collection[] = []

                        filteredCards.forEach((card: Asset)=>{
                            validCollections.push(card.collection as Collection)
                        })
                        const settedCollections = new Set(validCollections.map((el)=>JSON.stringify(el)))
                        const uniqueCollections = [...Array.from(settedCollections)].map((el)=>JSON.parse(el))

                        setUserCollections(uniqueCollections)
                        console.log("validCollections: ", uniqueCollections);
                    })
                    
                    .catch(e => console.log(e))
                })
            // const accountCollections = axios.get(`https://wax.api.atomicassets.io/atomicassets/v1/accounts/${user.userData.account}/`).then(data => {
            //     setUserCollections(data.data.data.collections)
            //     // console.log(data)
            // }).catch(e => console.log(e))
        }
    }, [])

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

                    const interval = setInterval(()=>{
                        const atomicData = axios.post(`https://wax.api.atomicassets.io/atomicassets/v1/assets`, { owner: user.userData.account }).then(data => {
                            setUserCards(data.data.data)
                            console.log(data)
                            //.filter(el=> +el.asset_id !== +choosedCard!.asset_id)
                        })

                        if(requestCount <=2){
                            requestCount++;
                            return console.log('loading...')
                        }
                        
                        setChoosedCard({} as Asset);
                        clearInterval(interval)

                        console.log('responsed!')
                    },5000)
                })
                .catch(e => console.log(e))
        } catch (error) {
            console.log(error)
        }
    }

    const filterByCollection = useCallback(async (collectionName:string, setFilterPoppupOpened:(arg:boolean)=>void )=>{
        if(collectionName === 'all_collections'){
            const fetched = wax.rpc.get_table_rows(
                {
                    code: "zombiemainac",
                    index_position: 1,
                    json: true,
                    key_type: "",
                    limit: "100",
                    lower_bound: null,
                    reverse: false,
                    scope: "zombiemainac",
                    show_payer: false,
                    table: "templates",
                    upper_bound: null
                }).then(templates=>{
                    console.log('templates: ', templates)
                    const atomicData = axios.post(`https://wax.api.atomicassets.io/atomicassets/v1/assets`, { owner: user.userData.account })
                    .then(assets => {

                        const filteredCards = assets.data.data.filter(card=>{
                            let isCardValid = false

                            templates.rows.forEach((template)=>{
                                if(card.template && +card.template.template_id === template.template_id){
                                    isCardValid = true
                                }
                            })

                            return isCardValid
                        })

                        setUserCards(filteredCards)
                    })
                    .catch(e => console.log(e))
                })
        }

        setFilterPoppupOpened(false)

        const atomicData = await axios.post(`https://wax.api.atomicassets.io/atomicassets/v1/assets`, { owner: user.userData.account }).then(data => {
                setUserCards(data.data.data.filter((el:Asset)=>el.collection.collection_name === collectionName))
                console.log(data.data.data.filter((el:Asset)=>el.collection.collection_name === collectionName))
        }).catch(e => console.log(e))
    },[])
    
    return (
        <main className={s['tame-page']}>
            <div className={`${s.wrapper} wrapper`}>
                <div className={`${s['tame-mb']} container`}>
                    <div className={s['tame-page__content']}>
                        <FilterCards collections={userCollections} onFilter={filterByCollection}>
                            <TameSelect sortParams={sortParams} />

                            <img className={`${s['mb-stars']} ${s.right_yellow_area}`} src={tameRightYellow.src} alt="" />
                            <img className={`${s['mb-stars']} ${s.left_yellow_area}`} src={tameLeftYellow.src} alt="" />

                            <img className={`${s['mb-stars']} ${s.mb_big_star}`} src={mobileBigStar.src} alt="" />
                            <img className={`${s['mb-stars']} ${s.mb_small_star}`} src={mobileSmallStar.src} alt="" />
                        </FilterCards>

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
                                            <NftCard className={s.list__item} card={choosedCard} onClick={() => setChoosedCard({} as Asset)} />
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
                                        <NftCard className={s.list__item} card={item} onClick={() => chooseCard(item.asset_id)} />
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
                            <NftCard className={s.list__item} card={choosedCard} onClick={() => setChoosedCard({} as Asset)} />

                            <Button className={`${s.play_btn}`} onClick={mintEmi}>Приручить</Button>
                        </div>}
                    </TradingField>

                    <div className={s.md__cards}>
                        <div className={s.cards__header}>
                            <TameFilter className={s.header__filter} collections={userCollections} onFilter={filterByCollection} />

                                <img className={s.header__img} src={exchangePinkArrows.src} alt="" />

                            <TameSelect sortParams={sortParams} />
                        </div>

                        <NftCardsList>
                                {userCards.length
                                    ? userCards.map((item, i) => (
                                        <NftCard key={`${item}_${i}`} className={s.list__item} card={item} onClick={() => chooseCard(item.asset_id)} />
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
    )
}

export default withAuth(Tame)